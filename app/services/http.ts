import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

// get request
export const getRequest = async <T = any>(
  url: string,
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.get(url, config);
  return response.data;
};

// post request
export const postRequest = async <T = any>(
  url: string,
  data: any = {},
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.post(url, data, config);
  return response.data;
};

// put request
export const putRequest = async <T = any>(
  url: string,
  data: any = {},
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.put(url, data, config);
  return response.data;
};

// patch request
export const patchRequest = async <T = any>(
  url: string,
  data: any = {},
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.patch(url, data, config);
  return response.data;
};

// delete request
export const deleteRequest = async <T = any>(
  url: string,
  config: AxiosRequestConfig & { skipAuth?: boolean } = {}
): Promise<T> => {
  const response = await apiClient.delete(url, config);
  return response.data;
};

// 


