export const checkProjectName = async (projectName) => {
    try {
        const response = await fetch(`https://shooot.co.kr/express/projects/search?projectName=${projectName}`);
        const data = await response.json();
        return data.canUse;
    } catch (error) {
        console.error("[Set-Config]:", error);
        return "ERROR";
    }
};

export const checkServiceWorker = async (keyword) => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration.active.state === "activated") {
                return registration;
            } else {
                console.error(`[${keyword}]: service worker controller 가 확인되지 않습니다`);
                return false;
            }
        } catch (error) {
            console.error(`[${keyword}]: service worker 확인에 실패했습니다`);
            return false;
        }
    } else {
        console.warn(`[${keyword}]: service worker 지원하지 않는 브라우저입니다`);
        return false;
    }
};

export const checkDomain = (to, domain) => {
    const url = new URL(to);
    if (url.origin.split(/[/.]/).includes(domain)) return true;
    else return false;
};

export const getAxiosConfigs = (pathVariables, config) => {
    let axiosConfigs = { ...config, params: {} };
    if (config) {
        if (config.params) {
            const rps = {};
            Object.keys(config.params).forEach((v) => (rps[v] = config.params[v]));
            axiosConfigs.params["requestParameters"] = JSON.stringify(rps);
        }
        if (pathVariables) {
            const pvs = {};
            Object.keys(pathVariables).forEach((v) => (pvs[v] = pathVariables[v]));
            axiosConfigs.params["pathVariables"] = JSON.stringify(pvs);
        }
    } else {
        axiosConfigs = {};
        if (pathVariables) {
            const pvs = {};
            Object.keys(pathVariables).forEach((v) => (pvs[v] = pathVariables[v]));
            axiosConfigs.params["pathVariables"] = JSON.stringify(pvs);
        }
    }
    return axiosConfigs;
};
