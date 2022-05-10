import { GateWayResponse, Pagination } from '@/types/GateWayResponse';
import { AxiosClient } from '@/axios/AxiosClient';
import { Module, Mutation, Action } from 'vuex-module-decorators';
import {
  ServiceResponse,
  ServiceRegisterRequest,
  getServiceInfo,
  getServiceId,
  getSearchServiceInfo,
  BasicAuthResponse,
  getBasicAuth,
  duplicatedCheck,
  getDuplicatedTrue,
  getDuplicatedFalse,
  getJWTAlg,
  JWTAlgResponse,
} from '@/types/ServiceType';
import { addMock } from '@/axios/AxiosIntercept';
import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';
import GateWayModule from '../GateWayModule';
import { USER_STATE } from '../UserState';
@Module({ name: 'ServiceModule' })
export default class ServiceModule extends GateWayModule {
  public services: ServiceResponse[] = [];

  public service: ServiceResponse = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    sla: { sec: null, min: null, hr: null, day: null, mon: null },
    svc_st_dt: '',
    svc_end_dt: '',
    athn: {
      BASIC_AUTH: {
        id: '',
        pw: '',
      },
      JWT: {
        alg: '',
        issuer: '',
        subject: '',
        publickey: '',
      },
    },
    api_aut: '',
    desc: '',
    cret_dt: '',
    upd_dt: '',
    cret_id: '',
    upd_id: '',
  };

  public requestService: ServiceRegisterRequest = {
    id: '',
    nm: '',
    tkcgr_nm: '',
    tkcgr_pos: '',
    tkcgr_eml: '',
    sla: { sec: null, min: null, hr: null, day: null, mon: null },
    svc_st_dt: '',
    svc_end_dt: '',
    athn: {
      BASIC_AUTH: {
        id: '',
        pw: '',
      },
      JWT: {
        alg: '',
        issuer: '',
        subject: '',
        publickey: '',
      },
    },
    api_aut: '',
    desc: '',
  };

  public servicePagination: Pagination = {} as Pagination;

  public basicAuth: BasicAuthResponse = {
    id: '',
    pw: '',
  };
  public duplicatedNm: duplicatedCheck = {
    isDuplicated: true,
  };
  public duplicatedId: duplicatedCheck = {
    isDuplicated: true,
  };

  public JWTAlg: JWTAlgResponse = {
    alg: [],
  };

  @Action
  serviceReset() {
    this.context.commit('setServiceList', []);
    this.context.commit('setService', {} as ServiceResponse);
    this.context.commit('setServicePagination', {} as Pagination);
  }

  //서비스 리스트 요청
  @Mutation
  setServiceList(list: ServiceResponse[]): void {
    this.services = list;
  }

  @Mutation
  getMethod() {
    console.log('getMethod');
  }
  @Mutation
  setServicePagination(pagination: Pagination) {
    this.servicePagination = pagination;
  }

  @Action({ rawError: true })
  async getServiceList(searchOption?: object) {
    let data = null;
    if (searchOption == undefined) {
      data = JSON.stringify(getServiceInfo);
    } else {
      data = JSON.stringify(getSearchServiceInfo);
    }
    try {
      addMock('/api/service/getServiceInfo', data);
      const response = await AxiosClient.getInstance().get<GateWayResponse<ServiceResponse[]>>(
        '/api/service/getServiceInfo'
      );
      this.context.commit('setServiceList', response.data.value);
      this.context.commit('setServicePagination', response.data.pagination);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  //서비스 상세 요청
  @Mutation
  setService(data: ServiceResponse): void {
    this.service = data;
  }

  @Action({ rawError: true })
  async getService(id: string) {
    addMock('/api/service/getServiceId', JSON.stringify(getServiceId));
    try {
      const response = await AxiosClient.getInstance().get<GateWayResponse<ServiceResponse>>(
        '/api/service/getServiceId',
        {
          serviceId: id,
        }
      );

      this.context.commit('setService', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  //서비스 등록 요청
  // @Mutation
  // public createServiceMutation(data: ServiceResponse): void {
  //   this.service = data;
  // }

  @Action({ rawError: true })
  async createServiceAction(data: ServiceRegisterRequest) {
    addMock('/api/service/registerService', JSON.stringify(getServiceId));
    try {
      const response = await AxiosClient.getInstance().post<GateWayResponse<ServiceResponse>>(
        '/api/service/registerService',
        data
      );
      console.log(response.data.value);
      // TODO:: 성공 or 실패 팝업으로 변경
      // this.context.commit('createserviceMutation', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
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

  @Action({ rawError: true })
  async editServiceAction(data: ServiceRegisterRequest) {
    addMock('/api/service/updateServiceInfo', JSON.stringify(getServiceId));
    try {
      const response = await AxiosClient.getInstance().put<GateWayResponse<ServiceRegisterRequest>>(
        '/api/service/updateServiceInfo',
        {
          data,
        }
      );
      // TODO:: 성공 or 실패 팝업으로 변경
      // this.context.commit('editServiceMutation', response.data);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
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
      const response = await AxiosClient.getInstance().delete<GateWayResponse<null>>('/api/service/deleteServiceInfo', {
        serviceId: id,
      });
      console.log(response);
      // this.context.commit('setServiceList', []);
      // if (200 === response.data.common.code) {
      // this.getServiceList();
      // }
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  // Service ID 중복 체크
  @Mutation
  setDuplicatedCheckNm(duplicatedResponse: duplicatedCheck) {
    console.log('중복되지 않은 서비스명 입니다.');
    this.duplicatedNm = duplicatedResponse;
  }
  @Action
  async getDuplicatedCheckNm(nm: string) {
    addMock(`/service/detail/${nm}`, JSON.stringify(getDuplicatedTrue));
    const response = await AxiosClient.getInstance().get<GateWayResponse<duplicatedCheck>>(`/service/detail/${nm}`);
    this.context.commit('setDuplicatedCheckNm', response.data.value);
  }

  @Mutation
  setDuplicatedCheckId(duplicatedResponse: duplicatedCheck) {
    console.log('중복된 서비스ID 입니다.');
    this.duplicatedId = duplicatedResponse;
  }
  @Action
  async getDuplicatedCheckId(id: string) {
    addMock(`/service/detail/${id}`, JSON.stringify(getDuplicatedFalse));
    const response = await AxiosClient.getInstance().get<GateWayResponse<duplicatedCheck>>(`/service/detail/${id}`);
    this.context.commit('setDuplicatedCheckId', response.data.value);
  }

  @Mutation
  setBasicAuth(basicAuthResponse: BasicAuthResponse) {
    console.log('setBasicAuth');
    this.basicAuth = basicAuthResponse;
  }

  @Action
  async getBasicAuth() {
    try {
      addMock('/service/basicauth/', JSON.stringify(getBasicAuth));
      const response = await AxiosClient.getInstance().get<GateWayResponse<BasicAuthResponse>>('/service/basicauth/');
      console.log('getBasicAuth' + response.data.value.id);
      this.context.commit('setBasicAuth', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  @Mutation
  setJWTAuth(JWTAlgResponse: JWTAlgResponse) {
    console.log('set JWT Alg');
    this.JWTAlg = JWTAlgResponse;
  }

  @Action
  async getJWTAlg() {
    try {
      addMock('/service/jwt/', JSON.stringify(getJWTAlg));
      const response = await AxiosClient.getInstance().get<GateWayResponse<JWTAlgResponse>>('/service/jwt/');
      this.context.commit('setJWTAuth', response.data.value);
    } catch (error: GateWayError | any) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
