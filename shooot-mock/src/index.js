import axios from "axios";
import { checkProjectName, checkServiceWorker, getApis } from "./utils";

const methods = ["get", "post", "put", "patch", "delete"];
let apis;

const shooot = {};

shooot.projectName = "";
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
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.get = async function (url, config = {}) {
    const sw = await checkServiceWorker("Get");

    if (!sw) {
        if (config.params.testcase) {
            delete config.params["testcase"];
        }
    }
    return axios.get(url, config);
};

/**
 * Custom POST request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any | undefined} data - 담아 보낼 data
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.post = async function (url, data = {}, config = {}) {
    const sw = await checkServiceWorker("Post");

    if (!sw) {
        if (config.params.testcase) {
            delete config.params["testcase"];
        }
    }
    return axios.post(url, data, config);
};

/**
 * Custom PUT request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any | undefined} data - 담아 보낼 data
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.put = async function (url, data = {}, config = {}) {
    const sw = await checkServiceWorker("Put");

    if (!sw) {
        if (config.params.testcase) {
            delete config.params["testcase"];
        }
    }
    return axios.put(url, data, config);
};

/**
 * Custom PATCH request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {any | undefined} data - 담아 보낼 data
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.patch = async function (url, data = {}, config = {}) {
    const sw = await checkServiceWorker("Patch");

    if (!sw) {
        if (config.params.testcase) {
            delete config.params["testcase"];
        }
    }
    return axios.patch(url, data, config);
};

/**
 * Custom DELETE request
 * @template T - 응답 데이터 타입
 * @template R - AxiosResponse 타입
 * @template D - AxiosRequestConfig 데이터 타입
 * @param {string} url - 요청 url
 * @param {import('axios').AxiosRequestConfig<D>} [config] - 기존 axios 에서 사용하던 config
 * @returns {Promise<R>} - 요청 결과를 포함한 AxiosResponse
 */
shooot.axios.delete = async function (url, config = {}) {
    const sw = await checkServiceWorker("Delete");

    if (!sw) {
        if (config.params.testcase) {
            delete config.params["testcase"];
        }
    }
    return axios.delete(url, config);
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

shooot.setConfigs = async function (projectName) {
    const projectNameRegex = /^[a-z0-9-]{1,20}$/;

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
                shooot.projectName = pn;
                apis = await getApis(pn);
                console.log("[Set-Config]: apis", apis);

                const message = {
                    type: "SET_CONFIGS",
                    projectName: pn,
                    apis: apis,
                };

                checkServiceWorkerResult.active.postMessage(message);
            }
        } else if (canUse === "UNAVAILABLE") {
            // 등록되지 않은 프로젝트
            console.error(`[Set-Config]: 존재하지 않는 프로젝트입니다`);
        }
    }
};

export default shooot;
