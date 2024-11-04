#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// CLI 인자에서 <PUBLIC_DIR> 값을 가져옴
const args = process.argv.slice(2);
const targetDir = args[0]; // 사용자 지정 public 디렉토리

// 기본 파일 경로
const swFileName = "sw.js"; // 빌드 후 생성된 Service Worker 파일명
const sourcePath = path.join(__dirname, "dist", swFileName); // 라이브러리 내부 파일 경로
const targetPath = path.join(process.cwd(), targetDir, swFileName); // 사용자 프로젝트의 public 경로

// 파일 복사 함수
function copyServiceWorker() {
    if (!fs.existsSync(sourcePath)) {
        console.error(`Error: ${swFileName} file not found in the library.`);
        process.exit(1);
    }

    if (!fs.existsSync(targetDir)) {
        console.error(`Error: Target directory "${targetDir}" does not exist.`);
        process.exit(1);
    }

    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ ${swFileName} has been copied to ${targetPath}`);
}

// 실행
copyServiceWorker();
