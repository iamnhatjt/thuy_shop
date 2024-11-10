import axios, { AxiosInstance, HttpStatusCode } from "axios";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  API_TIMEOUT,
  API_URL,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../constant";
import { clientStorage } from "../utils/storage";
import { Endpoint } from "./endpoint";

const signOut = () => {
  clientStorage.remove(ACCESS_TOKEN_STORAGE_KEY);
  clientStorage.remove(REFRESH_TOKEN_STORAGE_KEY);
  window.location.reload();
};
const createAxiosInstance = (baseUrl: string) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      post: {
        "Content-Type": "application/json",
      },
    },
    timeout: API_TIMEOUT,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
      if (accessToken) {
        config.headers.token = accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => response?.data?.data || response?.data || response,
    async (error) => {
      if (
        error.response &&
        error.response.status === HttpStatusCode.Unauthorized &&
        error.response?.data?.code !== "ACTION_NOT_ALLOWED"
      ) {
        const refreshToken = clientStorage.get(REFRESH_TOKEN_STORAGE_KEY);
        if (
          (!refreshToken && error.config.headers.token) ||
          error.config.headers["refresh-token"]
        ) {
          signOut();
        } else if (refreshToken) {
          try {
            const rTResponse = await axios.post(
              Endpoint.REFRESH_TOKEN,
              {},
              {
                headers: { "refresh-token": refreshToken },
              },
            );
            if (rTResponse?.status === HttpStatusCode.Ok) {
              clientStorage.set(
                ACCESS_TOKEN_STORAGE_KEY,
                rTResponse.data.accessToken,
              );
              clientStorage.set(
                REFRESH_TOKEN_STORAGE_KEY,
                rTResponse.data.refreshToken,
              );
            }
            error.config.headers = {
              token: rTResponse.data.accessToken,
            };
            return axiosInstance(error.config);
          } catch (_) {
            signOut();
          }
        }
      }
    },
  );
  return axiosInstance;
};

const RequestClient = class {
  private readonly defaultConfig: {};
  private readonly axios: AxiosInstance;

  constructor(config = {}) {
    this.defaultConfig = config;
    this.axios = createAxiosInstance(API_URL);
  }

  async get(endpoint: string, params = {}, configs = {}) {
    try {
      const response = await this.axios.get(endpoint, {
        params,
        ...this.defaultConfig,
        ...configs,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await this.axios.post(endpoint, body, {
        ...this.defaultConfig,
        ...configs,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await this.axios.put(endpoint, body, {
        ...this.defaultConfig,
        ...configs,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async patch(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await this.axios.patch(endpoint, body, {
        ...this.defaultConfig,
        ...configs,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint: string, configs = {}) {
    try {
      const response = await this.axios.delete(endpoint, {
        ...this.defaultConfig,
        ...configs,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export const client = new RequestClient();

export { axios };
