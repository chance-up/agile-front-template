import { Module, Mutation, Action } from 'vuex-module-decorators';

import { AxiosClient } from '@/axios/AxiosClient';
import { addMock } from '@/axios/AxiosIntercept';

import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';

import { GateWayResponse, Pagination } from '@/types/GateWayResponse';
import GateWayModule from '../GateWayModule';
import {
  dummyListData,
  dummySearchData,
  dummyDetailData,
  dummyRegisterData,
  // dummyUpdateData,
  dummyDeleteData,
  SystemResponse,
  SystemIdEdpt,
  dummySystemIdEdptList,
} from '@/types/SystemType';

@Module({ name: 'SystemModule' })
export default class SystemModule extends GateWayModule {
  public systemList: SystemResponse[] = [];
  public system: SystemResponse = {} as SystemResponse;
  public systemIdEdptList: SystemIdEdpt[] = [];
  public systemPagination: Pagination = {} as Pagination;

  @Mutation
  setSystemList(list: SystemResponse[]): void {
    this.systemList = list;
  }

  @Mutation
  setSystem(system: SystemResponse): void {
    this.system = system;
  }

  @Mutation
  setSystemPagination(pagination: Pagination): void {
    this.systemPagination = pagination;
  }

  // // system state reset
  @Action
  systemReset() {
    this.context.commit('setSystemList', []);
    this.context.commit('setSystem', {});
    this.context.commit('setSystemPagination', {});
  }

  // 시스템 관리 리스트 조회
  @Action
  async getSystemList(searchOption?: object) {
    let url = '';
    if (searchOption == undefined) {
      addMock('/system/list', JSON.stringify(dummyListData));
      url = '/system/list';
    } else {
      addMock('/system/getSystemSearch', JSON.stringify(dummySearchData));
      url = '/system/getSystemSearch';
    }

    try {
      this.showLoading();

      const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse[]>>(url, {
        ...searchOption,
      });
      console.log('response', response.data.value);
      console.log('response.data.pagination : ', response.data.pagination);
      this.context.commit('setSystemList', response.data.value);
      this.context.commit('setSystemPagination', response.data.pagination);

      this.dissmissLoading();
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.CANCEL_ERROR) {
        console.log('get system list cancel');
      } else if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        // console.log('NetWork not connection');
        this.showError();
      } else {
        // console.log('서버통신에 실패하였습니다.');
        this.showError();
      }
    }
  }

  // 시스템 관리 상세 정보
  @Action
  async getSystemDetail(id: string) {
    try {
      addMock(`/system/detail/${id}`, JSON.stringify(dummyDetailData));

      this.showLoading();
      const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse>>(`/system/detail/${id}`);

      this.context.commit('setSystem', response.data.value);
      this.dissmissLoading();
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.CANCEL_ERROR) {
        console.log('get system list cancel');
      } else if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        // console.log('NetWork not connection');
        this.showError();
      } else {
        // console.log('서버통신에 실패하였습니다.');
        this.showError();
      }
    }
  }

  // 시스템 관리 등록
  @Action
  async registerSystem(data: SystemResponse) {
    // console.log(JSON.stringify(data));
    try {
      addMock(`/system/registerSystem/`, JSON.stringify(dummyRegisterData));

      this.showLoading();
      const response = await AxiosClient.getInstance().post<GateWayResponse<SystemResponse>>(
        `/system/registerSystem/`,
        data
      );
      console.log('system register response', response);
      this.dissmissLoading();
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.CANCEL_ERROR) {
        console.log('get system list cancel');
      } else if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        // console.log('NetWork not connection');
        this.showError();
      } else {
        // console.log('서버통신에 실패하였습니다.');
        this.showError();
      }
    }
  }

  // 시스템 관리 수정
  @Action
  async updateSystemDetail(data: SystemResponse) {
    // console.log('data : ', data);
    try {
      addMock(`/system/updateSystem/`, JSON.stringify(data));

      this.showLoading();
      const response = await AxiosClient.getInstance().post<GateWayResponse<SystemResponse>>(
        `/system/updateSystem/`,
        data
      );
      console.log('system put response', response);
      this.dissmissLoading();
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.CANCEL_ERROR) {
        console.log('get system list cancel');
      } else if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        // console.log('NetWork not connection');
        this.showError();
      } else {
        // console.log('서버통신에 실패하였습니다.');
        this.showError();
      }
    }
  }

  // 시스템 관리 삭제
  @Action
  async deleteSystem(id: string) {
    try {
      addMock(`/system/deleteSystem/${id}`, JSON.stringify(dummyDeleteData));

      const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse>>(
        `/system/deleteSystem/${id}`
      );
      console.log('system delete response', response);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.CANCEL_ERROR) {
        console.log('get system list cancel');
      } else if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        // console.log('NetWork not connection');
        this.showError();
      } else {
        // console.log('서버통신에 실패하였습니다.');
        this.showError();
      }
    }
  }

  // System ID 중복 체크
  @Action
  async duplicateCheck(id: string): Promise<boolean> {
    addMock(`/system/detail/${id}`, JSON.stringify(dummyDetailData));
    const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse>>(`/system/detail/${id}`);
    console.log('response : ', response);
    return false;
  }

  //System ID 리스트 조회
  @Mutation
  setSystemIdEdptList(data: SystemIdEdpt[]) {
    this.systemIdEdptList = data;
  }
  @Action
  async getSystemIdEdptList() {
    try {
      addMock('/mngt/v1/getSystemIdList', JSON.stringify(dummySystemIdEdptList));
      const response = await AxiosClient.getInstance().get<GateWayResponse<SystemIdEdpt[]>>('/mngt/v1/getSystemIdList');
      this.context.commit('setSystemIdEdptList', response.data.value);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.CANCEL_ERROR) {
        console.log('get system list cancel');
      } else if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        // console.log('NetWork not connection');
        this.showError();
      } else {
        // console.log('서버통신에 실패하였습니다.');
        this.showError();
      }
    }
  }
}
