import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

/**
 * The list endpoints bind paging from the query string (`[FromQuery] offset/length`),
 * while every filter comes from the request body. Splitting them keeps `offset`/`length`
 * out of the body (where the backend ignores them) and onto the query string.
 */
export const withPaging = <T extends object>(
  params?: T
): { body: Omit<T, "offset" | "length">; config: AxiosRequestConfig } => {
  const { offset, length, ...body } = (params ?? {}) as T & {
    offset?: number;
    length?: number;
  };
  const query: Record<string, number> = {};
  if (offset !== undefined) query.offset = offset;
  if (length !== undefined) query.length = length;
  return { body: body as Omit<T, "offset" | "length">, config: { params: query } };
};

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