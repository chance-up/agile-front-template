import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from '@/service/axios';

export class ApiResponse extends Axios {
  private static instance: ApiResponse;

  public static getInstance(): ApiResponse {
    if (!ApiResponse.instance) {
      ApiResponse.instance = new ApiResponse();
    }
    return ApiResponse.instance;
  }

  get<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return axios.get(url);
  }

  post<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return axios.post(url, data);
  }
}

export interface ApiPromise<T> extends Promise<AxiosResponse<T>> {}
