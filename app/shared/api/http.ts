import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "./api.types";

import apiClient from "./apiClient";

//GetRequest 
export const getRequest = async <T = any>(
    url: string,
    config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> =
        await apiClient.get(url, config);

    return response.data.data;
};


// PostRequest
export const postRequest = async <T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> =
        await apiClient.post(url, data, config);

    return response.data.data;
};


//PutRequest
export const putRequest = async <T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> =
        await apiClient.put(url, data, config);

    return response.data.data;
};


// PatchRequest
export const patchRequest = async <T = any>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> =
        await apiClient.patch(url, data, config);

    return response.data.data;
};



// deleteRequest 
export const deleteRequest = async <T = any>(
    url: string,
    config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
    const response: AxiosResponse<ApiResponse<T>> =
        await apiClient.delete(url, config);

    return response.data.data;
};