import axios from "axios";
import { checkDomain, checkProjectName, checkServiceWorker, getAxiosConfigs } from "./utils";

const methods = ["get", "post", "put", "patch", "delete"];
const shooot = {};

shooot.projectName = "";
shooot.delay = 0;
shooot.axios = {};

Object.keys(axios).forEach((v) => {
    if (!methods.includes(v)) {
        shooot.axios[v] = axios[v];
    }
});

/**
 * Custom GET request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.get = async function (url, config = {}, pathVariables = {}) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }

    const swState = await checkServiceWorker("Axios-Get");
    const domainState = checkDomain(to, shooot.projectName);
    const newConfig =
        swState && domainState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    // console.log("[Axios-Get]==========");
    // console.log("[Axios-Get]: url", to);
    // console.log("[Axios-Get]: newConfig", newConfig);
    return axios.get(to, newConfig);
};

/**
 * Custom POST request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any | undefined} data - 담아 보낼 data
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.post = async function (url, data = {}, config = {}, pathVariables = {}) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }

    const swState = await checkServiceWorker("Axios-Post");
    const domainState = checkDomain(to, shooot.projectName);
    const newConfig =
        swState && domainState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    // console.log("[Axios-Post]==========");
    // console.log("[Axios-Post]: url", to);
    // console.log("[Axios-Post]: newConfig", newConfig);
    // console.log("[Axios-Post]: data");
    Object.keys(data).forEach((v) => console.log(`(${v} : ${data[v]})`));
    return axios.post(to, data, newConfig);
};

/**
 * Custom PUT request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any | undefined} data - 담아 보낼 data
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.put = async function (url, data = {}, config = {}, pathVariables = {}) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }

    const swState = await checkServiceWorker("Axios-Put");
    const domainState = checkDomain(to, shooot.projectName);
    const newConfig =
        swState && domainState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    // console.log("[Axios-Put]==========");
    // console.log("[Axios-Put]: url", to);
    // console.log("[Axios-Put]: newConfig", newConfig);
    // console.log("[Axios-Put]: data");
    Object.keys(data).forEach((v) => console.log(`(${v} : ${data[v]})`));
    return axios.put(to, data, newConfig);
};
/**
 * Custom PATCH request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any | undefined} data - 담아 보낼 data
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.patch = async function (url, data = {}, config = {}, pathVariables = {}) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }

    const swState = await checkServiceWorker("Axios-Patch");
    const domainState = checkDomain(to, shooot.projectName);
    const newConfig =
        swState && domainState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    // console.log("[Axios-Patch]==========");
    // console.log("[Axios-Patch]: url", to);
    // console.log("[Axios-Patch]: newConfig", newConfig);
    // console.log("[Axios-Patch]: data");
    Object.keys(data).forEach((v) => console.log(`(${v} : ${data[v]})`));
    return axios.patch(to, data, newConfig);
};

/**
 * Custom DELETE request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.delete = async function (url, config = {}, pathVariables = {}) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }

    const swState = await checkServiceWorker("Axios-Delete");
    const domainState = checkDomain(to, shooot.projectName);
    const newConfig =
        swState && domainState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    // console.log("[Axios-Delete]==========");
    // console.log("[Axios-Delete]: url", to);
    // console.log("[Axios-Delete]: newConfig", newConfig);
    return axios.delete(to, newConfig);
};

shooot.register = async function () {
    console.log("[Register]==========");
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("/service-worker.js");
            console.log(`[Register]: service worker 등록 완료`);
        } catch (error) {
            console.error("[Register]: service worker 등록에 실패하였습니다");
        }
    } else {
        console.warn("[Register]: service worker 지원하지 않는 브라우저입니다");
    }
};

shooot.unregister = async function () {
    console.log("[UnRegister]==========");
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                await registration.unregister();
                console.log("[UnRegister]: service worker 등록 해제하였습니다");
            } else {
                console.warn("[UnRegister]: 등록 해제할 service worker 가 없습니다");
            }
        } catch (error) {
            console.error("[UnRegister]: service worker 등록 해제를 실패하였습니다");
        }
    } else {
        console.warn("[UnRegister]: service worker 지원하지 않는 브라우저입니다");
    }
};

shooot.controller = async function (mode) {
    if (process.env.NODE_ENV === (mode ? mode : "development")) {
        await this.register();
    } else {
        await this.unregister();
    }
};

shooot.setConfigs = async function (projectName, delay) {
    const projectNameRegex = /^[a-z0-9-]{1,20}$/;

    console.log("[Set-Config]==========");
    if (!projectName) {
        console.error("[Set-Config]: projectName 을 입력해주세요");
    } else if (!projectName.trim().length || !projectNameRegex.test(projectName.trim())) {
        console.error("[Set-Config]: projectName 은 1자 이상 20자 이하 소문자, 숫자, '-' 로 구성되어야 합니다");
    } else {
        // 등록된 프로젝트인지 확인
        const pn = projectName.trim();
        const canUse = await checkProjectName(pn);

        // 등록된 프로젝트
        if (canUse === "AVAILABLE") {
            const checkServiceWorkerResult = await checkServiceWorker("Set-Config");
            if (checkServiceWorkerResult) {
                shooot.projectName = projectName;
                shooot.delay = delay;

                const message = {
                    type: "SET_CONFIGS",
                    projectName: shooot.projectName,
                    delay: shooot.delay,
                };

                checkServiceWorkerResult.active.postMessage(message);
                console.log(`[Set-Config]: message 를 전달했습니다`);
            }
        } else if (canUse === "UNAVAILABLE") {
            // 등록되지 않은 프로젝트
            console.error(`[Set-Config]: 존재하지 않는 프로젝트입니다`);
        }
    }
};

export default shooot;
