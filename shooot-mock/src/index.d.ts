import { AxiosRequestConfig, AxiosStatic, AxiosResponse } from "axios";

export interface Configs {
    projectName: string;
    delay?: number;
}

export interface Shooot extends Configs {
    axios: Omit<AxiosStatic, "get" | "post" | "put" | "patch" | "delete"> & {
        get<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            pathVariables?: object,
            config?: AxiosRequestConfig<D>
        ): Promise<R>;
        post<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            pathVariables?: object,
            config?: AxiosRequestConfig<D>
        ): Promise<R>;
        put<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            pathVariables?: object,
            config?: AxiosRequestConfig<D>
        ): Promise<R>;
        patch<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            pathVariables?: object,
            config?: AxiosRequestConfig<D>
        ): Promise<R>;
        delete<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            pathVariables?: object,
            config?: AxiosRequestConfig<D>
        ): Promise<R>;
    };
    setConfigs: (projectName: string, delay?: number) => Promise<void>;
    register: () => Promise<void>;
    unregister: () => Promise<void>;
}

declare const sw: Shooot;
export default sw;
