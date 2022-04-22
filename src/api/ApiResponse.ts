import axios from '@/api/AxiosClient';
import { isMockData } from '@/api/AxiosClient';
import { GateWayResponse } from '@/types/GateWayResponse';
import { AxiosResponse } from 'axios';
export class ApiResponse {
  private static instance: ApiResponse;

  public static getInstance(): ApiResponse {
    if (!ApiResponse.instance) {
      ApiResponse.instance = new ApiResponse();
    }
    return ApiResponse.instance;
  }

  public async get<T>(url: string, query?: any): Promise<T> {
    const response: AxiosResponse = await axios.get<T>(url, {
      params: query,
    });
    // if (200 === response.data.common.code) {
    //   throw Error();
    // }
    console.log(response.data);

    if (isMockData(url)) {
      return JSON.parse(response.data);
    } else {
      return response.data;
    }

    // console.log('DATA =>' + response.data);

    // return response.data;
    // if ('S' == response.data.returnCode) {
    //   return response.data.data;
    // } else {
    //   if (response.data.errorCode == 'API_4001') {
    //     throw new ParameterError();
    //   }

    //   return response.data;
    // }
  }

  public async post<T>(url: string, data: any): Promise<GateWayResponse<T>> {
    const response: AxiosResponse = await axios.post<T>(url, data);
    if (isMockData(url)) {
      return JSON.parse(response.data);
    } else {
      return response.data;
    }
  }

  public async put<T>(url: string, data: any): Promise<GateWayResponse<T>> {
    const response: AxiosResponse = await axios.put<T>(url, data);
    if (isMockData(url)) {
      return JSON.parse(response.data);
    } else {
      return response.data;
    }
  }

  public async delete<T>(url: string, query?: any): Promise<GateWayResponse<T>> {
    const response: AxiosResponse = await axios.get<T>(url, {
      params: query,
    });
    if (isMockData(url)) {
      return JSON.parse(response.data);
    } else {
      return response.data;
    }
  }
}
