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

app.post("/mock/data", (req, res) => {
    const { endpoint, method } = req.body;

    console.log("Received from Service Worker:");
    console.log("Endpoint:", endpoint);
    console.log("Method:", method);

    res.json({ message: "Data received", endpoint, method });
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

// 서버 시작
app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});
