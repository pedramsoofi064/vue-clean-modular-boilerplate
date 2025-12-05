import axios from "axios";
import {
  tokenInterceptor,
  loadingInterceptor,
  toastInterceptor,
  normalizerInterceptor,
  invalidAuthenticationInterceptor,
} from "./interceptors";

const DEFAULT_INTERCEPTORS = [
  tokenInterceptor,
  loadingInterceptor,
  toastInterceptor,
  invalidAuthenticationInterceptor,
  normalizerInterceptor,
];

const DEFAULTS = {
  timeout: 2 * 60 * 1000,
};

const BASE_URL = getEnv("API_BASE_URL");

class Client {
  constructor({
    baseURL = BASE_URL,
    domain = "",
    headers,
    defaults = DEFAULTS,
    interceptors = DEFAULT_INTERCEPTORS,
  } = {}) {
    this.client = axios.create({
      ...defaults,
      baseURL: baseURL + domain,
      headers,
    });

    interceptors.forEach(
      ({
        onRequest = onRequestFallback,
        onRequestError = onRequestErrorFallback,
        onResponse = onResponseFallback,
        onResponseError = onResponseErrorFallback,
      }) => {
        this.client.interceptors.request.use(
          (...args) => onRequest(...args, this.client),
          (...args) => onRequestError(...args, this.client),
        );
        this.client.interceptors.response.use(
          (...args) => onResponse(...args, this.client),
          (...args) => onResponseError(...args, this.client),
        );
      },
    );
  }

  getInstance() {
    return this.client;
  }
}

const onRequestFallback = (request) => request;
const onRequestErrorFallback = (error) => Promise.reject(error);
const onResponseFallback = (response) => response;
const onResponseErrorFallback = (error) => Promise.reject(error);

export default Client;
