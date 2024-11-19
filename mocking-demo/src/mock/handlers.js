import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/auth/login", async ({ request }) => {
        const result = await request.json();
        if (result["id"] && result["password"]) {
            return new HttpResponse(
                JSON.stringify({ tel: "010-1234-5678", email: "ssafy@ssafy.com", nickname: "배고픈 고래" })
            );
        } else {
            return new HttpResponse(JSON.stringify({ statusCode: 400, msg: "아이디 또는 비밀번호가 없습니다" }), {
                status: 400,
            });
        }
    }),
];
