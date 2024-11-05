#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// sw.js 파일
const sourceFile = path.resolve(__dirname, "../src/service-worker.js");

// 사용자 지정 public 디렉토리
const targetDir = process.argv[3] || "public";
const targetPath = path.resolve(process.cwd(), targetDir, "service-worker.js");

console.log("[현재 경로]:", process.cwd());
console.log("[sourceFile]:", sourceFile);
console.log("[targetDir]:", targetDir);
console.log("[targetPath]:", targetPath);

// 디렉터리 존재 확인 후 생성
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// 파일 복사
fs.copyFileSync(sourceFile, targetPath);
console.log(`[결과]: 'sw.js' 파일이 ${targetDir}에 성공적으로 복사되었습니다.`);
