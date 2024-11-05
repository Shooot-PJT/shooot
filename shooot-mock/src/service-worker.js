let projectName;
let delay = 0;

self.addEventListener("fetch", function (event) {
    const { url } = event.request;
    if (url === "https://jsonplaceholder.typicode.com/users/1") {
        event.respondWith(
            new Response(
                JSON.stringify({
                    message: "새로운 응답",
                })
            )
        );
    }
});
