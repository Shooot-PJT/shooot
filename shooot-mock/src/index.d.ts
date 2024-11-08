import { AxiosRequestConfig, AxiosStatic, AxiosResponse } from "axios";

export interface Configs {
    projectName: string;
    delay?: number;
}

export interface Shooot extends Configs {
    axios: Omit<AxiosStatic, "get" | "post" | "put" | "patch" | "delete"> & {
        get<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            config?: AxiosRequestConfig<D>,
            pathVariables?: object
        ): Promise<R>;
        post<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<D>,
            pathVariables?: object
        ): Promise<R>;
        put<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<D>,
            pathVariables?: object
        ): Promise<R>;
        patch<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<D>,
            pathVariables?: object
        ): Promise<R>;
        delete<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            config?: AxiosRequestConfig<D>,
            pathVariables?: object
        ): Promise<R>;
    };
    setConfigs: (projectName: string, delay?: number) => Promise<void>;
    controller: (mode?: string) => Promise<void>;
    register: () => Promise<void>;
    unregister: () => Promise<void>;
}

declare const sw: Shooot;
export default sw;
