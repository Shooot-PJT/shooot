import react, { useEffect, useRef, useState } from "react";
import "./App.css";
import Prism from "prismjs";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-javascript";
import axios from "axios";
import shooot from "shooot";
import { UserIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

function App() {
    const [result, setResult] = useState(undefined);
    const [code, setCode] = useState("");
    const [resCode, setResCode] = useState("");
    const [mock, setMock] = useState(undefined);
    const getResCode = () => {
        return;
    };
    const getCode = (id, password, type, testcase) => {
        return `await ${type === "shooot" ? "shooot." : ""}axios\n\t.post("/auth/login", \n\t\t{\n\t\t${
            id ? `\tid: ${id}` : ""
        }${password ? `,\n\t\t\tpassword: ${password}\n` : "\n"}\t\t}${
            testcase ? ",\n\t\t{\n\t\t\tparams: {\n\t\t\t\ttestcase: " + testcase + "\n\t\t\t}\n\t\t}" : ""
        })\n\t.then((res) => {...})\n\t.catch((error) => {...})`;
    };
    const getMockCode = () => {
        if (!mock) return "";

        if (mock === "shooot") {
            return "Mocking 코드를 왜 짜...? testcase 만 정하면 shooot 이 자동으로 해주는데?ㅎ";
        } else {
            return `http.post("/auth/login", async ({ request }) => {\n
        // body 확인
        const result = await request.json();\n
        if (result["id"] && result["password"]) {\n
            // id 와 password 가 모두 있다면
            return new HttpResponse(JSON.stringify({ tel: "010-1234-5678", email: "ssafy@ssafy.com", nickname: "배고픈 고래" }));
        } else {\n
            // id 또는 password 가 없음
            return new HttpResponse(JSON.stringify({ statusCode: 400, msg: "아이디 또는 비밀번호가 없습니다" }));
        }
    })`;
        }
    };

    const swHandler = async (type) => {
        const { worker } = await import("./mock/browser");
        if (type === "msw") {
            await shooot.unregister();
            worker.start();
        } else {
            worker.stop();
            await shooot.register();
        }
    };
    const mswHandler = async (id, password) => {
        setCode(getCode(id, password, "msw"));
        setMock("msw");
        const data = {};
        if (id) data["id"] = id;
        if (password) data["password"] = password;

        await axios
            .post("/auth/login", data)
            .then((res) =>
                setResult(() => ({
                    isSuccess: true,
                    data: res.data,
                }))
            )
            .catch((err) =>
                setResult(() => ({
                    isSuccess: false,
                    data: err.response.data,
                }))
            );
    };
    const shoootHandler = async (id, password, testcase) => {
        await shooot.setConfigs("demo").then(async () => {
            setCode(getCode(id, password, "shooot", testcase));
            setMock("shooot");
            const data = {};
            if (id) data["id"] = id;
            if (password) data["password"] = password;

            await shooot.axios
                .post("/auth/login", data, {
                    params: {
                        testcase: testcase,
                    },
                })
                .then((res) =>
                    setResult({
                        isSuccess: true,
                        data: res.data,
                    })
                )
                .catch((err) =>
                    setResult({
                        isSuccess: false,
                        data: err.response.data,
                    })
                );
        });
    };

    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    useEffect(() => {
        console.log("result:", result);
        setResCode(
            result
                ? result.isSuccess
                    ? `{\n\tnickname:\t${result.data.nickname},\n\temail:\t${result.data.email},\n\ttel:\t${result.data.tel}\n}`
                    : `{\n\tstatus-code:\t${result.data.statusCode},\n\tmessage:\t${result.data.msg}\n}`
                : ""
        );
    }, [result]);

    return (
        <div className="container">
            <div className="box column">
                <div className="title">로그인 Mocking</div>
                <div className="button-group">
                    <button className="button" onClick={async () => await swHandler("msw")}>
                        msw 활성화
                    </button>
                    <button className="button" onClick={async () => await mswHandler("id", "pwd")}>
                        msw 로그인 200
                    </button>
                    <button className="button" onClick={async () => await mswHandler("id")}>
                        msw 로그인 400
                    </button>
                    <button className="button" onClick={async () => await swHandler("shooot")}>
                        shooot 활성화
                    </button>
                    <button className="button" onClick={async () => await shoootHandler("id", "pwd", 1)}>
                        shooot 로그인 200
                    </button>
                    <button className="button" onClick={async () => await shoootHandler("id", "pwd", 2)}>
                        shooot 로그인 400
                    </button>
                </div>
            </div>
            <div className="box">
                <div>
                    <div style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>요청</div>
                    <pre style={{ fontSize: "1" }}>
                        <code className="language-js">{code}</code>
                    </pre>
                </div>
                <div>
                    <div style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>결과</div>
                    <pre style={{ fontSize: "1" }}>
                        <code className="language-json">{resCode}</code>
                    </pre>
                </div>
                <div>
                    {result && result.isSuccess && (
                        <>
                            <div style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>프로필 카드</div>
                            <div className="profile-card">
                                <div className="profile-info">
                                    <UserIcon className="profile-icon" />
                                    <div className="profile-text">{result.data.nickname}</div>
                                </div>
                                <div className="profile-info">
                                    <EnvelopeIcon className="profile-icon" />
                                    <div className="profile-text">{result.data.email}</div>
                                </div>
                                <div className="profile-info">
                                    <PhoneIcon className="profile-icon" />
                                    <div className="profile-text">{result.data.tel}</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
                <div style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>Mocking을 위한 코드</div>
                <pre style={{ fontSize: "1" }}>
                    <code className="language-js">{getMockCode()}</code>
                </pre>
            </div>
        </div>
    );
}

export default App;
