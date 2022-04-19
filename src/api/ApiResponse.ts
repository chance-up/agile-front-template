import axios from '@/api/axios';
import { GateWayResponse } from '@/types/GateWayResponse';
import { AxiosResponse } from 'axios';
import { ParameterError } from '@/error/Errors';

export class ApiResponse {
  private static instance: ApiResponse;

  public static getInstance(): ApiResponse {
    if (!ApiResponse.instance) {
      ApiResponse.instance = new ApiResponse();
    }
    return ApiResponse.instance;
  }

  public async get<T>(url: string, query?: any): Promise<GateWayResponse<T>> {
    const response: AxiosResponse = await axios.get<T>(url, query);
    return response.data;
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
    return response.data;
  }

  public async put<T>(url: string, data: any): Promise<GateWayResponse<T>> {
    const response: AxiosResponse = await axios.put<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string, data?: any): Promise<GateWayResponse<T>> {
    const response: AxiosResponse = await axios.delete<T>(url, data);
    return response.data;
  }
}
