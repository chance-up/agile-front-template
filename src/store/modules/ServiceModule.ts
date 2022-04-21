import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiResponse } from '@/api/ApiResponse';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ServiceResponse } from '@/types/ServiceType';
import { addMock } from '@/api/AxiosClient';
@Module({ name: 'ServiceModule' })
export default class ServiceModule extends VuexModule {
  public services: ServiceResponse[] = [];

  @Mutation
  setServiceList(list: ServiceResponse[]): void {
    this.services = list;
  }

  @Action
  async getServiceList() {
    addMock(
      '/service/list',
      '[{"serviceNm" : "Service Name1","serviceId" : "Service1","authMethod" : ["Basic Auth"],"start_validity_date": "2022-04-21","end_validity_date": "2023-04-21","update_data" : "2022-04-21"}, {"serviceNm" : "Service Name2","serviceId" : "Service2","authMethod" : ["Basic Auth"],"start_validity_date": "2022-05-21","end_validity_date": "2023-05-21","update_data" : "2022-05-21"}]'
    );

    const response = await ApiResponse.getInstance().get<GateWayResponse<ServiceResponse[]>>('/service/list');

    this.context.commit('setServiceList', response);
    console.log('SERVICE TEST', response);
  }
}
