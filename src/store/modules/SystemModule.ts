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
import { ApiResponse } from '@/api/ApiResponse';
import { addMock } from '@/api/AxiosClient';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ParameterError } from '@/error/Errors';

@Module({ name: 'SystemModule' })
export default class SystemModule extends VuexModule {
  public listOption: SystemResponse[] = [];

  @Mutation
  setSystemList(list: SystemResponse[]): void {
    this.listOption = list;
  }

  // 시스템 관리 리스트 조회
  @Action
  async getSystemList(searchOption?: SearchCondition) {
    if (!searchOption) {
      addMock(
        '/system/list',
        JSON.stringify(dummyListData)
        // '[{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null}]'
      );
      const response = await ApiResponse.getInstance().get<GateWayResponse<SystemResponse[]>>('/system/list');
      console.log('response', response.data.value);
      this.context.commit('setSystemList', response.data.value);
    } else {
      addMock(
        '/system/getSystemSearch',
        JSON.stringify(dummySearchData)
        // '[{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null}]'
      );
      const response = await ApiResponse.getInstance().get<GateWayResponse<SystemResponse[]>>(
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
    const response = await ApiResponse.getInstance().get<GateWayResponse<SystemResponse>>(`/system/detail/${id}`);
    return response;
  }

  // 시스템 관리 등록
  @Action
  async registerSystem(data: SystemResponse) {
    console.log(JSON.stringify(data));
    addMock(`/system/registerSystem/`, JSON.stringify(dummyRegisterData));
    const response = await ApiResponse.getInstance().post<GateWayResponse<SystemResponse>>(
      `/system/registerSystem/`,
      data
    );
    console.log('system register response', response);
  }

  // 시스템 관리 수정
  @Action
  async updateSystemDetail(data: SystemResponse) {
    addMock(`/system/updateSystem/`, JSON.stringify(dummyUpdateData));
    const response = await ApiResponse.getInstance().post<GateWayResponse<SystemResponse>>(
      `/system/updateSystem/`,
      data
    );
    console.log('system put response', response);
  }

  // 시스템 관리 삭제
  @Action
  async deleteSystem(id: string) {
    addMock(`/system/deleteSystem/${id}`, JSON.stringify(dummyDeleteData));
    const response = await ApiResponse.getInstance().get<GateWayResponse<SystemResponse>>(`/system/deleteSystem/${id}`);
    console.log('system delete response', response);
  }
}
