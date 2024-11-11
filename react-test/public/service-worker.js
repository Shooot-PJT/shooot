let projectName;
let delay = 0;

self.addEventListener("message", async function (event) {
    console.log("[프로젝트 설정]==========");
    if (event.data && event.data.type === "SET_CONFIGS") {
        projectName = event.data.projectName;
        delay = event.data.delay;

        console.log(`[프로젝트 설정]: 정보 설정 완료 (${projectName}, ${delay}ms)`);
    }
});

self.addEventListener("fetch", async function (event) {
    console.log("[Fetch Event]==========");

    if (projectName === undefined || !projectName.length) {
        console.error("[Fetch Event]: projectName 을 등록해주세요");
    } else {
        const { request } = event;
        const url = new URL(request.url);

        if (!url.origin.split(/[/.]/).includes(projectName)) {
            console.error("[Fetch Event]: 서비스에서 제공되는 도메인으로의 요청만 mocking 됩니다");
        } else {
            event.respondWith(
                (async () => {
                    const origin = url.origin;
                    const method = request.method;
                    const headers = [...request.headers.entries()];
                    const params = Object.fromEntries(url.searchParams.entries());
                    const requestParameters = {};
                    const pathVariables = {};
                    Object.keys(params).forEach((key) => {
                        const val = JSON.parse(params[key]);
                        Object.keys(val).forEach((v) => {
                            if (key === "requestParameters") requestParameters[v] = val[v];
                            else pathVariables[v] = val[v];
                        });
                    });
                    let body = {};
                    if (["POST", "PUT", "PATCH"].includes(method)) {
                        try {
                            body = await request.clone().text();
                        } catch (error) {
                            console.log("[Fetch Event]: Body 가 비어있거나 파싱할 수 없습니다");
                        }
                    }

                    console.log(`[Fetch Event]: url ${url}`);
                    console.log(`[Fetch Event]: origin ${origin}`);
                    console.log(`[Fetch Event]: method ${method}`);
                    console.log(`[Fetch Event]: headers ${headers}`);
                    console.log("[Fetch Event]: request parameter {\n");
                    Object.keys(requestParameters).forEach((v) => {
                        console.log(`\t${v} : ${requestParameters[v]}`);
                    });
                    console.log("}");
                    console.log("[Fetch Event]: path variables {\n");
                    Object.keys(pathVariables).forEach((v) => {
                        console.log(`\t${v} : ${pathVariables[v]}`);
                    });
                    console.log("}");
                    console.log(`[Fetch Event]: body ${body}`);
                    console.log("[Fetch Event]: mocking 성공");

                    const postData = {
                        projectName: projectName,
                        url: url,
                        origin: origin,
                        method: method,
                        headers: headers,
                        requestParameters: requestParameters,
                        pathVariables: pathVariables,
                        body: body,
                    };

                    let result;
                    try {
                        const response = await fetch("http://localhost:16783/mock/data", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(postData),
                        });
                        console.log(`[Fetch Event]: from express ${result}`);
                        return new Response(JSON.stringify(await response.json()), { status: 200 });
                    } catch (error) {
                        console.error(`[Fetch Event]: from express error`, error);
                        return new Response(JSON.stringify({ error: "[Fetch Event]: server internal error" }), {
                            status: 500,
                        });
                    }
                })()
            );
        }
    }
});
