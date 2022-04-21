import { GateWayResponse } from '@/types/GateWayResponse';
import { dummyData, DummySystemListResponse, DummySystemResponse } from '@/types/SystemType';
import { SearchCondition } from '@/types/SearchType';
import { ApiResponse } from '@/api/ApiResponse';
import { addMock } from '@/api/AxiosClient';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ParameterError } from '@/error/Errors';

@Module({ name: 'SystemModule' })
export default class SystemModule extends VuexModule {
  public systemItem: DummySystemResponse = {
    id: '',
    nm: '',
    tkcgrNm: '',
    tkcgrPos: '',
    tkcgrEml: '',
    ifGrp: [],
    desc: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
  };
  public listOption: DummySystemListResponse[] = [];

  @Mutation
  setSystemList(list: DummySystemListResponse[]): void {
    this.listOption = list;
  }

  @Mutation
  setSystemItem(item: DummySystemResponse) {
    this.systemItem = item;
  }

  @Action
  async getSystemList(searchOption?: SearchCondition) {
    addMock(
      '/system/list/',
      '[{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null},{"id": 1,"nm": "systemName1", "tkcgrNm": "managerName1","tkcgrPos": "managerPosition1","tkcgrEml": "managerEmail1","ifGrp": "interfaceGroup1","desc": "systemDescription1","createdAt": "2020-01-01","createdBy": "systemUser1","updatedAt": null,"updatedBy": null}]'
    );
    const response = await ApiResponse.getInstance().get<GateWayResponse<DummySystemListResponse[]>>('/system/list/');
    this.context.commit('setSystemList', response);
    console.log('listOption', this.listOption);
  }

  @Action
  async getSystemDetail(id: number) {
    addMock(`/system/detail/${id}`, JSON.stringify(dummyData));
    const response = await ApiResponse.getInstance().get<GateWayResponse<DummySystemResponse>>(`/system/detail/${id}`);
    console.log('response', response);
    this.context.commit('setSystemItem', response);
  }
}
