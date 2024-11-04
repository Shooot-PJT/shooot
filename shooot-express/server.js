require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3001;

app.use(cors());

// MySQL 연결 설정
const db = mysql.createConnection({
    host: "k11d109.p.ssafy.io",
    port: 44132,
    user: "root",
    password: "ssafyrnal1qks",
    database: "shooot",
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

// 서버 시작
app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});
