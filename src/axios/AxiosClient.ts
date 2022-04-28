import axios from '@/axios/AxiosIntercept';
import { isMockData } from '@/axios/AxiosIntercept';
import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';
import { GateWayResponse } from '@/types/GateWayResponse';
import { AxiosResponse } from 'axios';
export class AxiosClient {
  private static instance: AxiosClient;

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
    }
    return AxiosClient.instance;
  }

  public async get<T>(url: string, query?: any): Promise<T> {
    try {
      const response: AxiosResponse = await axios.get<T>(url, {
        params: query,
      });

      if (isMockData(url)) {
        await this.sleep(1000);
        return JSON.parse(response.data);
      } else {
        return response.data;
      }
    } catch (error: Error | any) {
      if (!error.response) {
        throw new GateWayError(ErrorCode.NETWORK_ERROR);
      } else {
        const errorCode: number = error.response.status;
        throw new GateWayError(error.response.status);
      }
    }
  }

  public async post<T>(url: string, data: any): Promise<GateWayResponse<T>> {
    try {
      const response: AxiosResponse = await axios.post<T>(url, data);
      if (isMockData(url)) {
        await this.sleep(1000);
        return JSON.parse(response.data);
      } else {
        return response.data;
      }
    } catch (error: Error | any) {
      if (!error.response) {
        throw new GateWayError(ErrorCode.NETWORK_ERROR);
      } else {
        const errorCode: number = error.response.status;
        throw new GateWayError(error.response.status);
      }
    }
  }

  public async put<T>(url: string, data: any): Promise<GateWayResponse<T>> {
    try {
      const response: AxiosResponse = await axios.put<T>(url, data);
      if (isMockData(url)) {
        await this.sleep(1000);
        return JSON.parse(response.data);
      } else {
        return response.data;
      }
    } catch (error: Error | any) {
      if (!error.response) {
        throw new GateWayError(ErrorCode.NETWORK_ERROR);
      } else {
        const errorCode: number = error.response.status;
        throw new GateWayError(error.response.status);
      }
    }
  }

  public async delete<T>(url: string, query?: any): Promise<GateWayResponse<T>> {
    try {
      const response: AxiosResponse = await axios.get<T>(url, {
        params: query,
      });
      if (isMockData(url)) {
        await this.sleep(1000);
        return JSON.parse(response.data);
      } else {
        return response.data;
      }
    } catch (error: Error | any) {
      if (!error.response) {
        throw new GateWayError(ErrorCode.NETWORK_ERROR);
      } else {
        const errorCode: number = error.response.status;
        throw new GateWayError(error.response.status);
      }
    }
  }

  public sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
