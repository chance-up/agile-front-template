import { GateWayResponse } from '@/types/GateWayResponse';
import { SystemResponse } from '@/types/SystemType';
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
    // addMock(
    //   '/system/list/',
    //   '[{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null}]'
    // );
    const response = await ApiResponse.getInstance().get<GateWayResponse<SystemResponse[]>>('/system/list');
    this.context.commit('setSystemList', response.data.value);
  }

  @Action
  async getSystemDetail(id: string) {
    // addMock(`/system/detail/${id}`, JSON.stringify(dummyData));
    const response = await ApiResponse.getInstance().get<GateWayResponse<SystemResponse>>(`/system/detail/${id}`);
    return response.data.value;
  }
}
