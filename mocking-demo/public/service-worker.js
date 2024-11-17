let projectName;
let apis;

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("message", async function (event) {
    if (event.data && event.data.type === "SET_CONFIGS") {
        projectName = event.data.projectName;
        apis = event.data.apis;
        console.log(`[프로젝트 설정]: 정보 설정 완료 ${projectName} ${apis}`);
    }
});

self.addEventListener("fetch", async function (event) {
    if (projectName !== undefined && projectName.length) {
        const { request } = event;
        const url = new URL(request.url);

        if (url.origin === "http://localhost" || url.hostname === "localhost") {
            event.respondWith(
                (async () => {
                    const endpoint = url.pathname;
                    const method = request.method;

                    // api 찾기
                    let targetApi = undefined;
                    apis.forEach((api) => {
                        const match = endpoint.match(api.url);
                        if (match && api.method === method) {
                            targetApi = api.apiId;
                        }
                    });

                    if (targetApi) {
                        // test case 들 가져오기
                        const params = Object.fromEntries(url.searchParams.entries());
                        try {
                            const response = await fetch(
                                `https://shooot.co.kr/express/projects/domains/apis/testcases?apiId=${targetApi}&testcase=${
                                    params["testcase"] ? params["testcase"] : 0
                                }`
                            );
                            const result = await response.json();
                            return new Response(JSON.stringify(result), { status: 200 });
                        } catch (error) {
                            return new Response(JSON.stringify({ result: "[Fetch Event]: express error" + error }), {
                                status: 500,
                            });
                        }
                    } else {
                        return fetch(event.request);
                    }
                })()
            );
        } else {
            console.warn("[Fetch Event]: mocking 은 localhost 로 보내는 요청에 대해서만 가능합니다");
        }
    } else {
        return fetch(event.request);
    }
});
