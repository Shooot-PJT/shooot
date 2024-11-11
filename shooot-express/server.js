require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = process.env.EXPRESS_PORT;

app.use(cors());

// MySQL 연결 설정
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// MySQL 연결 확인
db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL database");
});

// 요청 본문 파싱 설정
app.use(express.json());

// 엔드포인트 예시: 특정 엔드포인트와 메서드로 데이터 조회
app.get("/api/data", (req, res) => {
    const query = "SELECT * FROM user WHERE user_id = 1";
    db.execute(query, (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Database query error" });
        }

        res.json(results);
    });
});

// projectName 사용 가능 여부 검사
app.get("/projects/search", (req, res) => {
    const { projectName } = req.query;
    const query = `SELECT * FROM project WHERE english_name = "${projectName}"`;
    db.execute(query, (err, results) => {
        if (err) {
            console.error("[get, /projects/search]:", err);
            return res.status(500).json({ error: "Database query error" });
        }

        if (results.length) {
            return res.status(200).json({ canUse: "AVAILABLE" });
        } else {
            return res.status(401).json({ canUse: "UNAVAILABLE" });
        }
    });
});

// service worker 로부터 받은 정보
app.post("/mock/data", async (req, res) => {
    const { projectName, url, origin, endpoint, method, headers, contentType, requestParameters, pathVariables, body } =
        req.body;

    console.log("[Received data from Service Worker]");
    console.log("projectName:", projectName);
    console.log("url:", url);
    console.log("origin:", origin);
    console.log("endpoint:", endpoint);
    console.log("method:", method);
    console.log("headers:", headers);
    console.log("contentType:", contentType);
    console.log("requestParameters:", requestParameters);
    console.log("pathVariables:", pathVariables);
    console.log("body:", body);

    const apiQuery = `SELECT api_id FROM api WHERE method = "${method}" and url = "${endpoint}"`;
    db.execute(apiQuery, (err, results) => {
        if (err) {
            console.error("[post, /mock/data, query1]:", err);
            return res.status(500).json({ error: "Database query error" });
        }

        if (results.length) {
            const testcaseQuery = `SELECT api_test_case_id FROM api_test_case WHERE api_id = "${results[0].api_id}"`;
            db.execute(testcaseQuery, (err, results) => {
                if (err) {
                    console.error("[post, /mock/data, query2]:", err);
                    return res.status(500).json({ error: "Database query error" });
                }

                if (results.length) {
                    let newResults = [];
                    results.forEach((result) => {
                        const requestQuery = `SELECT * FROM api_test_case_request WHERE api_test_case_id = "${result.api_test_case_id}" ORDER BY api_test_request_id DESC LIMIT 1`;
                        db.execute(requestQuery, (err, results) => {
                            if (err) {
                                console.error("[post, /mock/data, query2]:", err);
                                return res.status(500).json({ error: "Database query error" });
                            }

                            console.log(results[0]);
                            newResults.push(results[0]);
                        });
                    });
                    return res.status(200).json(newResults);
                } else {
                    return res.status(404).json({ message: "등록된 api test case 가 없습니다" });
                }
            });
        } else {
            return res.status(404).json({ message: "등록된 api 가 없습니다" });
        }
    });

    // const query = `SELECT api_test_case_id FROM api_test_case WHERE api_id = (SELECT api_id FROM api WHERE method = "${method}" and url = "${endpoint}")`;
    // const query3 = `SELECT content FROM api_test_case_request WHERE api_test_case_id in (SELECT api_test_case_id FROM api_test_case WHERE api_id = (SELECT api_id FROM api WHERE method = "${method}" and url = "${endpoint}"))`;
    // db.execute(query, (err, results) => {
    //     if (err) {
    //         console.error("[post, /mock/data]:", err);
    //         return res.status(500).json({ error: "Database query error" });
    //     }

    //     if (results.length) {
    //         return res.status(200).json(results[0]);
    //     } else {
    //         return res.status(404).json({ message: "NO API" });
    //     }
    // });

    // return res.status(200).json(null);
});

// 서버 시작
app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});
