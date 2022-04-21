import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiResponse } from '@/api/ApiResponse';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ServiceResponse, DummyServiceResponse } from '@/types/ServiceType';
import { addMock } from '@/api/AxiosClient';
@Module({ name: 'ServiceModule' })
export default class ServiceModule extends VuexModule {
  public services: ServiceResponse[] = [];
  public service: DummyServiceResponse = {
    serviceNm: '',
    serviceId: '',
    ManagerNm: '',
    department: '',
    email: '',
    start_validity_date: '',
    end_validity_date: '',
    update_date: '',
    authMethod: [],
    slaPolicy: [],
    serviceEx: '',
  };

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

  @Mutation
  setService(data: DummyServiceResponse): void {
    this.service = data;
  }

  @Action
  async getService(id: string) {
    addMock(
      '/service?serviceId=Service1',
      '[{"serviceNm" : "Service Name1", "serviceId" : "Service1", "ManagerNm" : "홍길동", "department" : "Agile Core Team", "email" : "abcabc@kt.com", "start_validity_date": "2022-04-21", "end_validity_date": "2023-04-21", "update_date" : "2022-04-21", "authMethod" : ["Basic Auth","Auth_ID","Auth_PW"], "slaPolicy" : ["분", "30"], "serviceEx" : "서비스 설명입니다."}]'
    );

    const response = await ApiResponse.getInstance().get<GateWayResponse<DummyServiceResponse>>('/service', {
      serviceId: id,
    });
    console.log('detail' + response);

    this.context.commit('setService', response);
  }
}
