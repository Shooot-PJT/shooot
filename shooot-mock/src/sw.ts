// Service Worker에 설정할 기본 이벤트 리스너
self.addEventListener("install", (event) => {
    console.log("[Service Worker] 설치됨");
});

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] 활성화됨");
});

self.addEventListener("fetch", (event: FetchEvent) => {
    const { request } = event;
    const url = new URL(request.url);

    // 요청 정보 추출
    const endpoint = url.pathname; // 엔드포인트 (URL 경로)
    const method = request.method; // 요청 메서드
    const headers = [...request.headers.entries()]; // 헤더 목록
    const queryParams = Object.fromEntries(url.searchParams.entries()); // 쿼리 파라미터
    const pathVariables = endpoint.split("/").filter((segment) => segment !== "");

    // 가로챈 요청 정보 로그
    console.log("[Service Worker] Intercepted request:");
    console.log("Endpoint:", endpoint);
    console.log("Method:", method);
    console.log("Headers:", headers);
    console.log("Request Parameters:", queryParams);
    console.log("Path Variables:", pathVariables);

    // Body 읽기 - POST, PUT, PATCH 요청에 대해서만
    if (["POST", "PUT", "PATCH"].includes(method)) {
        const clonedRequest = request.clone();
        clonedRequest
            .text()
            .then((body) => {
                console.log("Request Body:", body);
            })
            .catch(() => {
                console.log("No request body or unable to parse.");
            });
    }

    // Express 서버로 endpoint와 method를 전달
    event.respondWith(
        (async () => {
            try {
                const response = await fetch("http://localhost:3001/mock/data/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ endpoint, method }),
                });

                const responseData = await response.json();
                console.log("Response from Express:", responseData);

                // Express 서버의 응답을 반환
                return new Response(JSON.stringify(responseData), {
                    headers: { "Content-Type": "application/json" },
                });
            } catch (error) {
                console.error("Error sending data to Express server:", error);
                return new Response("Failed to connect to Express server", { status: 500 });
            }
        })()
    );
});
