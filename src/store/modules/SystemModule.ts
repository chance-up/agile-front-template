import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import { AxiosClient } from '@/axios/AxiosClient';
import { addMock } from '@/axios/AxiosIntercept';

import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';

import { GateWayResponse } from '@/types/GateWayResponse';
import {
  PaginationType,
  dummyListData,
  dummySearchData,
  dummyDetailData,
  dummyRegisterData,
  // dummyUpdateData,
  dummyDeleteData,
  SystemResponse,
} from '@/types/SystemType';

@Module({ name: 'SystemModule' })
export default class SystemModule extends VuexModule {
  public pagination: PaginationType = {} as PaginationType;
  public systemList: SystemResponse[] = [];
  public system: SystemResponse = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    if_grp: [],
    desc: '',
    created_at: '',
    created_by: '',
    updated_at: '',
    updated_by: '',
  };

  @Mutation
  setSystemList(list: SystemResponse[]): void {
    this.systemList = list;
  }

  @Mutation
  setSystem(system: SystemResponse) {
    this.system = system;
  }

  @Mutation
  setPagination(pagination: PaginationType) {
    this.pagination = pagination;
  }

  // 시스템 관리 리스트 조회
  @Action
  async getSystemList(searchOption?: object) {
    console.log('searchOption : ', searchOption);
    if (searchOption == undefined) {
      try {
        addMock('/system/list', JSON.stringify(dummyListData));
        const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse[]>>('/system/list');
        // console.log('response', response.data.value);
        console.log('response.data.pagination : ', response.data.pagination);
        this.context.commit('setSystemList', response.data.value);
        this.context.commit('setPagination', response.data.pagination);
      } catch (error: GateWayError | any) {
        if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
          console.log('NetWork not connection');
        } else {
          console.log('서버통신에 실패하였습니다.');
        }
      }
    } else {
      try {
        addMock('/system/getSystemSearch', JSON.stringify(dummySearchData));
        const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse[]>>(
          '/system/getSystemSearch'
        );
        // console.log('system get list response', response.data.value);
        this.context.commit('setSystemList', response.data.value);
        this.context.commit('setPagination', response.data.pagination);
      } catch (error: GateWayError | any) {
        if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
          console.log('NetWork not connection');
        } else {
          console.log('서버통신에 실패하였습니다.');
        }
      }
    }
  }

  // 시스템 관리 상세 정보
  @Action
  async getSystemDetail(id: string) {
    try {
      addMock(`/system/detail/${id}`, JSON.stringify(dummyDetailData));
      const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse>>(`/system/detail/${id}`);

      this.context.commit('setSystem', response.data.value);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        console.log('NetWork not connection');
      } else {
        console.log('서버통신에 실패하였습니다.');
      }
    }
  }

  // 시스템 관리 등록
  @Action
  async registerSystem(data: SystemResponse) {
    // console.log(JSON.stringify(data));
    try {
      addMock(`/system/registerSystem/`, JSON.stringify(dummyRegisterData));
      const response = await AxiosClient.getInstance().post<GateWayResponse<SystemResponse>>(
        `/system/registerSystem/`,
        data
      );
      console.log('system register response', response);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        console.log('NetWork not connection');
      } else {
        console.log('서버통신에 실패하였습니다.');
      }
    }
  }

  // 시스템 관리 수정
  @Action
  async updateSystemDetail(data: SystemResponse) {
    // console.log('data : ', data);
    try {
      addMock(`/system/updateSystem/`, JSON.stringify(data));
      const response = await AxiosClient.getInstance().post<GateWayResponse<SystemResponse>>(
        `/system/updateSystem/`,
        data
      );
      console.log('system put response', response);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        console.log('NetWork not connection');
      } else {
        console.log('서버통신에 실패하였습니다.');
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
      if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        console.log('NetWork not connection');
      } else {
        console.log('서버통신에 실패하였습니다.');
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
}
