let projectName;
let delay = 0;

self.addEventListener("message", function (event) {
    if (event.data && event.data.type === "SET_CONFIGS") {
        projectName = event.data.projectName;
        delay = event.data.delay;
        console.log(`[프로젝트 설정]: 정보 설정 완료\n\n{\n\tprojectName: ${projectName}\n\tdelay: ${delay}\n}`);
    }
});

self.addEventListener("fetch", function (event) {
    if (!projectName || projectName.length === "") {
        console.error(
            "[프로젝트 설정]: projectName 이 반드시 설정되어야 합니다. setConfigs 를 이용해 정보를 설정해주세요."
        );
    } else {
        const { request } = event;
        const url = new URL(request.url);

        // 요청 정보 추출
        const endpoint = url.pathname;
        const method = request.method;
        const headers = [...request.headers.entries()];
        const queryParams = Object.fromEntries(url.searchParams.entries());
        const pathVariables = endpoint.split("/").filter((segment) => segment !== "");

        // 요청 정보 로깅
        console.log("[Service Worker] Intercepted request");
        console.log("[EndPoint]:", endpoint);
        console.log("[Method]:", method);
        console.log("[Headers]:", headers);
        console.log("[Request Parameters]:", queryParams);
        console.log("[Path Variables]:", pathVariables);

        // Body 읽기 - POST, PUT, PATCH 요청에 대해서만
        if (["POST", "PUT", "PATCH"].includes(method)) {
            const clonedRequest = request.clone();
            clonedRequest
                .text()
                .then((body) => console.log("[Body]:", body))
                .catch(() => console.log("[Body]: 비어있거나 파싱할 수 없습니다"));
        }

        event.respondWith(
            new Response(
                JSON.stringify({
                    message: "임시 응답",
                })
            )
        );

        /*const { url } = event.request;
        if (url === "https://jsonplaceholder.typicode.com/users/1") {
            event.respondWith(
                new Response(
                    JSON.stringify({
                        message: "새로운 응답",
                    })
                )
            );
        }*/
    }
});
