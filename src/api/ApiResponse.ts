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
    const response: AxiosResponse = await axios.get<T>(url, {
      params: {
        query,
      },
    });

    if ('S' == response.data.returnCode) {
      return response.data;
    } else {
      if (response.data.errorCode == 'API_4001') {
        throw new ParameterError();
      }

      return response.data;
    }
  }

  public async post<T>(url: string, data: any): Promise<GateWayResponse<T>> {
    const response: AxiosResponse = await axios.post<T>(url, data);

    if ('S' == response.data.returnCode) {
      return response.data;
    } else {
      if (response.data.errorCode == 'API_4001') {
        throw new ParameterError();
      }

      return response.data;
    }
  }
}
