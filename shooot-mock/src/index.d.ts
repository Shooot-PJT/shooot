import { AxiosRequestConfig, AxiosStatic, AxiosResponse } from "axios";

export interface Configs {
    projectName: string;
}

export interface Shooot extends Configs {
    axios: Omit<AxiosStatic, "get" | "post" | "put" | "patch" | "delete"> & {
        get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
        post<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<D>
        ): Promise<R>;
        put<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<D>
        ): Promise<R>;
        patch<T = any, R = AxiosResponse<T>, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<D>
        ): Promise<R>;
        delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    };
    setConfigs: (projectName: string, delay?: number) => Promise<void>;
    register: () => Promise<void>;
    unregister: () => Promise<void>;
}

declare const shooot: Shooot;
export default shooot;
