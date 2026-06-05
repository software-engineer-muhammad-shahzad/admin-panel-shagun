import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});


// request interceptor


apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);




// response interceptor

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        localStorage.removeItem("accessToken");

        window.location.href = "/login";
        break;

      case 403:
        console.error("Forbidden");
        break;

      case 500:
        console.error("Server Error");
        break;

      default:
        break;
    }

    return Promise.reject(error);
  }
);


export default apiClient;