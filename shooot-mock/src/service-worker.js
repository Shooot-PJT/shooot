let projectName;
let delay = 0;

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("message", async function (event) {
    if (event.data && event.data.type === "SET_CONFIGS") {
        projectName = event.data.projectName;
        delay = event.data.delay;

        console.log(`[프로젝트 설정]: 정보 설정 완료 (${projectName}, ${delay}ms)`);
    }
});

self.addEventListener("fetch", async function (event) {
    if (projectName !== undefined && projectName.length) {
        const { request } = event;
        const url = new URL(request.url);

        if (url.origin.split(/[/.]/).includes(projectName)) {
            event.respondWith(
                (async () => {
                    const contentType = request.headers.get("content-type");
                    let endpoint = url.pathname;
                    const method = request.method;
                    const headers = Object.fromEntries(request.headers.entries());
                    const params = Object.fromEntries(url.searchParams.entries());
                    const requestParameters = {};
                    const pathVariables = {};
                    Object.keys(params).forEach((key) => {
                        const val = JSON.parse(params[key]);
                        Object.keys(val).forEach((v) => {
                            if (key === "requestParameters") requestParameters[v] = val[v];
                            else {
                                pathVariables[v] = val[v];
                                endpoint += `/{${v}}`;
                            }
                        });
                    });
                    const body = {
                        formData: {
                            datas: null,
                            files: null,
                        },
                        raw: {
                            datas: null,
                            files: null,
                        },
                    };
                    if (["POST", "PUT", "PATCH"].includes(method)) {
                        if (contentType.includes("application/json")) {
                            try {
                                const datas = await request.clone().json();
                                body["raw"].datas = datas;
                            } catch (error) {
                                console.log("[Fetch Event]: body 없음");
                            }
                        } else if (contentType.includes("text/plain")) {
                            try {
                                const datas = await request.clone().text();
                                body["raw"].datas = datas;
                            } catch (error) {
                                console.log("[Fetch Event]: body 없음");
                            }
                        } else if (contentType.includes("multipart/form-data")) {
                            try {
                                const formData = await request.clone().formData();
                                formData.forEach((val, key) => {
                                    if (val instanceof File) {
                                        if (!body["formData"].files) body["formData"].files = {};
                                        body["formData"].files[key] = val;
                                    } else {
                                        if (!body["formData"].datas) body["formData"].datas = {};
                                        body["formData"].datas[key] = val;
                                    }
                                });
                            } catch (error) {
                                console.log("[Fetch Event]: body 없음");
                            }
                        }

                        if (!body["formData"].datas && !body["formData"].files) body["formData"] = null;
                        if (!body["raw"].datas && !body["raw"].files) body["raw"] = null;
                    }

                    console.log("[Fetch Event]: mocking 성공");

                    const postData = {
                        endpoint: endpoint,
                        method: method,
                        headers: headers,
                        requestParameters: requestParameters,
                        pathVariables: pathVariables,
                        body: body,
                    };

                    try {
                        const response = await fetch("https://shooot.co.kr/express/mock/data", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(postData),
                        });
                        const result = await response.json();
                        return new Response(JSON.stringify(result), { status: 200 });
                    } catch (error) {
                        return new Response(JSON.stringify({ result: "[Fetch Event]: express error" + error }), {
                            status: 500,
                        });
                    }
                })()
            );
        }
    }
});
