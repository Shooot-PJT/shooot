interface ShoootConfigs {
    projectName: string; // 프로젝트 이름
    delay: number; // 요청 딜레이(ms)
}

class Shooot {
    private projectName: string = "";
    private delay: number = 0;

    constructor() {}

    // 사용자가 projectName과 delay 값을 설정
    public setConfigs(configs: ShoootConfigs): void {
        this.projectName = configs.projectName;
        this.delay = configs.delay;
        console.log(`Configs 설정 - Project Name: ${this.projectName}, Delay: ${this.delay}ms`);
    }

    // service worker 등록 함수
    public async registerServiceWorker() {
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.register("/sw.js");
                console.log("Service Worker 등록 범위:", registration.scope);
            } catch (error) {
                console.error("Service Worker 등록 실패:", error);
            }
        } else {
            console.warn("Service Workers 를 지원하지 않는 브라우저입니다");
        }
    }

    // service worker 등록 해제 함수
    public async unregisterServiceWorker() {
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
    }
}

const shooot = new Shooot();
export default shooot;
