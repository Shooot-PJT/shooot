import { checkProjectName } from "./utils";

const sw = {};

// 설정 변수 등록
sw.projectName = "";
sw.delay = 0;

// 변수 설정 함수
sw.setConfigs = async function setConfigs(projectName, delay) {
    const projectNameRegex = /^[a-z0-9-]{1,20}$/;

    // 비어있거나 정규식에 맞지 않는 project name
    if (!projectName.trim().length || !projectNameRegex.test(projectName)) {
        console.error("사용 불가능한 projectName 입니다");
    } else {
        const canUse = await checkProjectName(projectName); // 사용 가능한지 확인
        if (canUse === "AVAILABLE") {
            // 사용 가능
            this.projectName = projectName;
            if (delay) this.delay = delay;

            // service worker 에게 정보 전달
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: "SET_CONFIGS",
                    projectName: this.projectName,
                    delay: this.delay,
                });
            } else {
                // 전달 실패
                console.warn("활성화된 Service Worker 가 없습니다");
            }
        } else if (canUse === "UNAVAILABLE") {
            console.error(`${projectName} 프로젝트가 존재하지 않습니다`);
        }
    }
};

// service worker 등록 함수
sw.register = async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/service-worker.js");
            console.log("Service Worker 등록 범위:", registration.scope);
        } catch (error) {
            console.error("Service Worker 등록 실패:", error);
        }
    } else {
        console.warn("Service Workers 를 지원하지 않는 브라우저입니다");
    }
};

// service worker 등록 해제 함수
sw.unregister = async function unregisterServiceWorker() {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                await registration.unregister();
                console.log("Service Worker 등록 해제");
            } else {
                console.warn("등록 해제할 Service Worker 가 없습니다");
            }
        } catch (error) {
            console.error("Service Worker 등록 해제 실패:", error);
        }
    } else {
        console.warn("Service Workers 를 지원하지 않는 브라우저입니다");
    }
};

export default sw;
