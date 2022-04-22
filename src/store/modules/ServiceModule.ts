import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiResponse } from '@/api/ApiResponse';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ServiceResponse, DummyServiceResponse } from '@/types/ServiceType';
import { addMock } from '@/api/AxiosClient';
import { ParameterError } from '@/error/Errors';
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

  //서비스 리스트 요청
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

  //서비스 상세 요청
  @Mutation
  setService(data: DummyServiceResponse): void {
    this.service = data;
  }

  @Action
  async getService(id: string) {
    addMock(
      '/service',
      '{"serviceNm" : "Service Name1", "serviceId" : "Service1", "ManagerNm" : "홍길동", "department" : "Agile Core Team", "email" : "abcabc@kt.com", "start_validity_date": "2022-04-21", "end_validity_date": "2023-04-21", "update_date" : "2022-04-21", "authMethod" : ["Basic Auth","Auth_ID","Auth_PW"], "slaPolicy" : ["분", "30"], "serviceEx" : "서비스 설명입니다."}'
    );

    const response = await ApiResponse.getInstance().get<GateWayResponse<DummyServiceResponse>>('/service', {
      serviceId: id,
    });
    console.log('detail' + response);

    this.context.commit('setService', response);
  }

  //서비스 등록 요청
  @Mutation
  public createServiceMutation(data: DummyServiceResponse): void {
    this.service = data;
  }

  @Action
  async createserviceAction(data: DummyServiceResponse) {
    try {
      const response = await ApiResponse.getInstance().post<GateWayResponse<DummyServiceResponse>>('/service', {
        data,
      });

      this.context.commit('createserviceMutation', response.data);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }

  //서비스 수정 요청
  @Mutation
  public editServiceMutation(data: DummyServiceResponse): void {
    this.service = data;
    this.services = this.services.map((item: ServiceResponse) => {
      if (item.serviceId == data.serviceId) {
        item.serviceNm = data.serviceNm;
        item.serviceId = data.serviceId;
        item.authMethod = data.authMethod;
        item.start_validity_date = data.start_validity_date;
        item.end_validity_date = data.end_validity_date;
        item.update_date = data.update_date;
        console.log(item);
      }
      return item;
    });
  }

  @Action
  async editServiceAction(data: DummyServiceResponse) {
    try {
      const response = await ApiResponse.getInstance().put<GateWayResponse<DummyServiceResponse>>(
        '/service/' + data.serviceId,
        {
          data,
        }
      );
      this.context.commit('editServiceMutation', response.data);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }

  //서비스 삭제 요청
  @Mutation
  public deleteServiceMutation(id: string): void {
    this.services = this.services.filter((item) => {
      return item.serviceId !== id;
    });
    console.log(this.services);
  }

  @Action
  async deleteServiceAction(id: string) {
    try {
      await ApiResponse.getInstance().delete<GateWayResponse<DummyServiceResponse>>('/service/delete', id);

      this.context.commit('deleteServiceMutation', id);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }
}
