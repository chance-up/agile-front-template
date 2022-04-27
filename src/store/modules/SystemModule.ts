import { GateWayResponse } from '@/types/GateWayResponse';
import {
  dummyListData,
  dummySearchData,
  dummyDetailData,
  dummyRegisterData,
  dummyUpdateData,
  dummyDeleteData,
  SystemResponse,
} from '@/types/SystemType';
import { SearchCondition } from '@/types/SearchType';
import { AxiosClient } from '@/axios/AxiosClient';
import { addMock } from '@/axios/AxiosIntercept';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module({ name: 'SystemModule' })
export default class SystemModule extends VuexModule {
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

  // 시스템 관리 리스트 조회
  @Action
  async getSystemList(searchOption?: object) {
    if (!searchOption) {
      addMock('/system/list', JSON.stringify(dummyListData));
      const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse[]>>('/system/list');
      console.log('response', response.data.value);
      this.context.commit('setSystemList', response.data.value);
    } else {
      addMock('/system/getSystemSearch', JSON.stringify(dummySearchData));
      const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse[]>>(
        '/system/getSystemSearch'
      );
      console.log('system get list response', response.data.value);
      this.context.commit('setSystemList', response.data.value);
    }
  }

  // 시스템 관리 상세 정보
  @Action
  async getSystemDetail(id: string) {
    addMock(`/system/detail/${id}`, JSON.stringify(dummyDetailData));
    const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse>>(`/system/detail/${id}`);

    this.context.commit('setSystem', response.data.value);
    // return response;
  }

  // 시스템 관리 등록
  @Action
  async registerSystem(data: SystemResponse) {
    console.log(JSON.stringify(data));
    addMock(`/system/registerSystem/`, JSON.stringify(dummyRegisterData));
    const response = await AxiosClient.getInstance().post<GateWayResponse<SystemResponse>>(
      `/system/registerSystem/`,
      data
    );
    console.log('system register response', response);
  }

  // 시스템 관리 수정
  @Action
  async updateSystemDetail(data: SystemResponse) {
    console.log('data : ', data);
    addMock(`/system/updateSystem/`, JSON.stringify(data));
    const response = await AxiosClient.getInstance().post<GateWayResponse<SystemResponse>>(
      `/system/updateSystem/`,
      data
    );
    console.log('system put response', response);
  }

  // 시스템 관리 삭제
  @Action
  async deleteSystem(id: string) {
    addMock(`/system/deleteSystem/${id}`, JSON.stringify(dummyDeleteData));
    const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse>>(`/system/deleteSystem/${id}`);
    console.log('system delete response', response);
  }

  // System ID 중복 체크
  @Action
  async duplicateCheck(id: string): Promise<boolean> {
    addMock(`/system/detail/${id}`, JSON.stringify(dummyDetailData));
    const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse>>(`/system/detail/${id}`);
    //return response;
    return true;
  }
}
