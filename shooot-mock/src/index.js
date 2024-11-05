import { checkProjectName } from "./utils";

const sw = {};

// 설정 변수 등록
sw.projectName = "";
sw.delay = 0;

// 변수 설정 함수
sw.setConfigs = async function setConfigs(projectName, delay) {
    const projectNameRegex = /^[a-z0-9-]{1,20}$/;

    if (!projectName.trim().length || !projectNameRegex.test(projectName)) {
        console.error("사용 불가능한 projectName 입니다");
    } else {
        const canUse = await checkProjectName(projectName);
        if (canUse === "AVAILABLE") {
            this.projectName = projectName;
            this.delay = delay;
            console.log("[프로젝트 설정]: 정보 설정 완료");
        } else if (canUse === "UNAVAILABLE") {
            console.error("중복된 projectName 입니다");
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
