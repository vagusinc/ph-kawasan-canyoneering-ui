/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";

export class ApiError<T> extends Error {
  options?: T;

  constructor(message: string, options?: T) {
    super(message);
    this.options = options;
  }
}

export const axiosServerClient = axios.create({
  baseURL: process.env.STRAPI_API_URL,
});

axiosServerClient.interceptors.request.use((config) => {
  // add auth headers or other header config here
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
  };
  return config;
});

axiosServerClient.interceptors.response.use(
  onRequestFulfilled,
  onRequestRejected
);

function onRequestFulfilled(value: AxiosResponse<any, any>) {
  return value;
}

function onRequestRejected(error: AxiosError) {
  console.log(error);
  throw new ApiError<{ message: string }>(
    (error.response?.data as any) || error?.message,
    error?.response?.data as any
  );
}
