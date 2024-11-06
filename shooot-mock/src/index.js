import { checkProjectName, checkServiceWorker, getAxiosConfigs } from "./utils";
import axios from "axios";

const sw = {};

// 설정 변수 등록
sw.projectName = "";
sw.delay = 0;
sw.axios = {};

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
            const swState = await checkServiceWorker();
            if (swState) {
                console.log("[SW]:", navigator.serviceWorker);
                await navigator.serviceWorker.ready.then((registration) => {
                    registration.active.postMessage({
                        type: "SET_CONFIGS",
                        projectName: this.projectName,
                        delay: this.delay,
                    });
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

// service worker 가 실행시키는 custom axios

const methods = ["get", "post", "put", "patch", "delete"];
Object.keys(axios).forEach((v) => {
    if (!methods.includes(v)) {
        sw.axios[v] = axios[v];
    }
});

/**
 * Custom GET request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
sw.axios.get = async function (url, pathVariables, config) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }
    console.log("[To]:", to);

    const swState = await checkServiceWorker();
    console.log("[SW-State]:", swState);
    const newConfig = swState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    console.log(swState ? "[Mock Config]:" : "[Real Config]:", newConfig);

    return axios.get(to, newConfig);
};

/**
 * Custom POST request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any} data - 담아 보낼 data
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
sw.axios.post = async function (url, data, pathVariables, config) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }
    console.log("[To]:", to);

    const swState = await checkServiceWorker();
    const newConfig = swState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    console.log(swState ? "[Mock Config]:" : "[Real Config]:", newConfig);

    return axios.post(to, data, newConfig);
};

/**
 * Custom PUT request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any} data - 담아 보낼 data
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
sw.axios.put = async function (url, data, pathVariables, config) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }
    console.log("[To]:", to);

    const swState = await checkServiceWorker();
    const newConfig = swState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    console.log(swState ? "[Mock Config]:" : "[Real Config]:", newConfig);

    return axios.put(to, data, newConfig);
};

/**
 * Custom PATCH request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any} data - 담아 보낼 data
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
sw.axios.patch = async function (url, data, pathVariables, config) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }
    console.log("[To]:", to);

    const swState = await checkServiceWorker();
    const newConfig = swState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    console.log(swState ? "[Mock Config]:" : "[Real Config]:", newConfig);

    return axios.patch(to, data, newConfig);
};

/**
 * Custom DELETE request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {object | undefined} pathVariables - path variable, url 에 적용될 순서대로 입력해야 함
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
sw.axios.delete = async function (url, pathVariables, config) {
    let to = url;
    if (pathVariables) {
        Object.keys(pathVariables).forEach((k) => (to += `/${pathVariables[k]}`));
    }
    console.log("[To]:", to);

    const swState = await checkServiceWorker();
    const newConfig = swState ? getAxiosConfigs(pathVariables, config) : { ...config, params: { ...config.params } };
    console.log(swState ? "[Mock Config]:" : "[Real Config]:", newConfig);

    return axios.delete(to, newConfig);
};

export default sw;
