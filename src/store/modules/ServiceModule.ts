import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiResponse } from '@/api/ApiResponse';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ServiceResponse, ServiceRegisterRequest, getServiceInfo, getServiceId } from '@/types/ServiceType';
import { addMock } from '@/api/AxiosClient';
import { ParameterError } from '@/error/Errors';
@Module({ name: 'ServiceModule' })
export default class ServiceModule extends VuexModule {
  public services: ServiceResponse[] = [];

  public service: ServiceResponse = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    sla_type: '',
    sla_cnt: 0,
    svc_st_dt: '',
    svc_end_dt: '',
    athn: '',
    api_aut: '',
    desc: '',
    cret_dt: '',
    upd_dt: '',
    cret_id: '',
    upd_id: '',
  };

  //서비스 리스트 요청
  @Mutation
  setServiceList(list: ServiceResponse[]): void {
    this.services = list;
  }

  @Action
  async getServiceList() {
    addMock('/api/service/getServiceInfo', JSON.stringify(getServiceInfo));

    const response = await ApiResponse.getInstance().get<GateWayResponse<ServiceResponse[]>>(
      '/api/service/getServiceInfo'
    );

    this.context.commit('setServiceList', response.data.value);
  }

  //서비스 상세 요청
  @Mutation
  setService(data: ServiceResponse): void {
    this.service = data;
  }

  @Action
  async getService(id: string) {
    addMock('/api/service/getServiceId', JSON.stringify(getServiceId));

    const response = await ApiResponse.getInstance().get<GateWayResponse<ServiceResponse>>(
      '/api/service/getServiceId',
      {
        serviceId: id,
      }
    );

    console.log('detail' + response.data.value);

    this.context.commit('setService', response.data.value);
  }

  //서비스 등록 요청
  @Mutation
  public createServiceMutation(data: ServiceResponse): void {
    this.service = data;
  }

  @Action
  async createserviceAction(data: ServiceRegisterRequest) {
    addMock('/api/service/registerService', JSON.stringify(getServiceId));

    try {
      const response = await ApiResponse.getInstance().post<GateWayResponse<ServiceResponse>>(
        '/api/service/registerService',
        {
          data,
        }
      );

      // TODO:: 성공 or 실패 팝업으로 변경
      this.context.commit('createserviceMutation', response.data.value);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }

  //   //서비스 수정 요청
  //   @Mutation
  //   public editServiceMutation(data: DummyServiceResponse): void {
  //     this.service = data;
  //     this.services = this.services.map((item: ServiceResponse) => {
  //       if (item.serviceId == data.serviceId) {
  //         item.serviceNm = data.serviceNm;
  //         item.serviceId = data.serviceId;
  //         item.authMethod = data.authMethod;
  //         item.start_validity_date = data.start_validity_date;
  //         item.end_validity_date = data.end_validity_date;
  //         item.update_date = data.update_date;
  //         console.log(item);
  //       }
  //       return item;
  //     });
  //   }

  @Action
  async editServiceAction(data: ServiceResponse) {
    try {
      const response = await ApiResponse.getInstance().put<GateWayResponse<ServiceResponse>>(
        '/api/service/updateServiceInfo',
        {
          data,
        }
      );

      // TODO:: 성공 or 실패 팝업으로 변경
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
      return item.id !== id;
    });
    console.log(this.services);
  }

  @Action
  async deleteServiceAction(id: string) {
    try {
      addMock('/api/service/deleteServiceInfo', '{ "common": { "code": 200, "message": "Success"}, "data": null}');
      const response = await ApiResponse.getInstance().delete<GateWayResponse<null>>('/api/service/deleteServiceInfo', {
        serviceId: id,
      });
      console.log(response);
      if (200 === response.common.code) {
        this.getServiceList();
      }
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
