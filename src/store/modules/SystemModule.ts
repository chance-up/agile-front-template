import { GateWayResponse } from '@/types/GateWayResponse';
import { dummyData, SystemResponse } from '@/types/SystemType';
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

  @Action
  async getSystemList(searchOption?: SearchCondition) {
    addMock(
      '/system/list/',
      '[{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null},{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null}]'
    );
    const response = await ApiResponse.getInstance().get<GateWayResponse<SystemResponse[]>>('/system/list/');
    console.log('response', response);
    this.context.commit('setSystemList', response);
  }

  @Action
  async getSystemDetail(id: string) {
    addMock(
      `/system/detail/${id}`,
      JSON.stringify(dummyData)
      // '{"id": 1,"nm": "systemName1", "tkcgr_nm": "managerName1","tkcgr_pos": "managerPosition1","tkcgr_eml": "managerEmail1","if_grp": "interfaceGroup1","desc": "systemDescription1","created_at": "2020-01-01","created_by": "systemUser1","updated_at": null,"updated_by": null}'
    );
    const response = await ApiResponse.getInstance().get<GateWayResponse<SystemResponse>>(`/system/detail/${id}`);
    return response;
  }
}
