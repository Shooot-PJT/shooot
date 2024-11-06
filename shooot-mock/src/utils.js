export const checkProjectName = async (projectName) => {
    try {
        const response = await fetch(`https://shooot.co.kr/express/projects/search?projectName=${projectName}`);
        const data = await response.json();
        return data.canUse;
    } catch (error) {
        console.error("[checkProjectName Error]:", error);
        return "ERROR";
    }
};

export const checkServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                console.log("Service Worker 가 확인되었습니다");
                return true;
            } else {
                console.error("등록된 Service Worker 가 존재하지 않습니다");
                return false;
            }
        } catch (error) {
            console.error("Service Worker 확인 실패");
            return false;
        }
    } else {
        console.warn("Service Worker 를 지원하지 않는 브라우저입니다");
        return false;
    }
};

export const getAxiosConfigs = (pathVariables, config) => {
    let axiosConfigs = {};
    if (config) {
        axiosConfigs = { ...config, params: {} };
        if (config.params) axiosConfigs.params["requestParameters"] = { ...config.params };
        if (pathVariables) axiosConfigs.params["pathVariables"] = { ...pathVariables };
    } else {
        axiosConfigs = {};
        if (pathVariables) axiosConfigs.params["pathVariables"] = { ...pathVariables };
    }
    return axiosConfigs;
};
