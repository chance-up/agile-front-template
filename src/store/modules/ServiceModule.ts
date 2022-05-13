import { GateWayResponse, Pagination } from '@/types/GateWayResponse';
import { AxiosClient } from '@/axios/AxiosClient';
import { Module, Mutation, Action } from 'vuex-module-decorators';
import {
  ServiceResponse,
  ServiceRegisterRequest,
  ServiceModifyRequest,
  JWTAlgResponse,
  ApiAuthResponse,
  BasicAuthResponse,
  duplicatedCheck,
  // getServiceInfo,
  // getServiceId,
  // getSearchServiceInfo,
  // getBasicAuth,
  getJWTAlg,
  // getApiAuthList,
} from '@/types/ServiceType';
import { addMock } from '@/axios/AxiosIntercept';
import { GateWayError } from '@/error/GateWayError';
import GateWayModule from '../GateWayModule';
@Module({ name: 'ServiceModule' })
export default class ServiceModule extends GateWayModule {
  public services: ServiceResponse[] = [];

  public service: ServiceResponse = {
    id: '',
    tkcgrNm: '',
    tkcgrPos: '',
    tkcgrEml: '',
    sla: { sec: null, min: null, hr: null, day: null, mon: null },
    svcStDt: '',
    svcEndDt: '',
    athn: {
      basic: {
        id: null,
        pw: null,
      },
      jwt: {
        alg: null,
        iss: null,
        aud: null,
        pubKey: null,
      },
    },
    athnType: '',
    apiAut: [],
    desc: null,
    cretDt: '',
    updDt: '',
    cretId: '',
    updId: '',
  };

  public requestService: ServiceRegisterRequest = {
    id: '',
    tkcgrNm: '',
    tkcgrPos: '',
    tkcgrEml: '',
    sla: { sec: null, min: null, hr: null, day: null, mon: null },
    svcStDt: '',
    svcEndDt: '',
    athn: {
      basic: {
        id: null,
        pw: null,
      },
      jwt: {
        alg: null,
        iss: null,
        aud: null,
        pubKey: null,
      },
    },
    athnType: '',
    apiAut: [],
    desc: null,
  };

  public servicePagination: Pagination = {} as Pagination;

  public basicAuth: BasicAuthResponse = {
    id: '',
    pw: '',
  };

  public duplicatedId: duplicatedCheck = {
    isPkDuplicated: true,
  };

  public JWTAlg: JWTAlgResponse = {
    alg: [],
  };

  public apiAuthList: ApiAuthResponse[] = [];

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

  //서비스 리스트 조회
  @Action({ rawError: true })
  async getServiceList(searchOption?: object) {
    // let data = null;
    // if (searchOption == undefined) {
    //   data = JSON.stringify(getServiceInfo);
    // } else {
    //   data = JSON.stringify(getSearchServiceInfo);
    // }
    try {
      // addMock('/api/service/getServiceInfo', data);
      const response = await AxiosClient.getInstance().get<GateWayResponse<ServiceResponse[]>>('/getServiceList', {
        ...searchOption,
      });
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

  //서비스 조회
  @Action({ rawError: true })
  async getService(id: string) {
    // addMock('/api/service/getServiceId', JSON.stringify(getServiceId));
    try {
      const response = await AxiosClient.getInstance().get<GateWayResponse<ServiceResponse>>(
        `/getServiceById?id=${id}`
      );
      this.context.commit('setService', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  //서비스 등록
  @Action({ rawError: true })
  async createService(data: ServiceRegisterRequest) {
    // addMock('/api/service/registerService', JSON.stringify(getServiceId));
    try {
      const response = await AxiosClient.getInstance().post<GateWayResponse<ServiceResponse>>(
        '/createServiceMngt',
        data
      );
      console.log(response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  //서비스 수정
  @Action({ rawError: true })
  async editService(data: ServiceModifyRequest) {
    // addMock('/api/service/updateServiceInfo', JSON.stringify(getServiceId));
    try {
      const response = await AxiosClient.getInstance().put<GateWayResponse<ServiceModifyRequest>>('/service', data);
      console.log(response);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  //서비스 삭제 요청
  @Action
  async deleteService(id: string) {
    try {
      // addMock('/api/service/deleteServiceInfo', '{ "common": { "code": 200, "message": "Success"}, "data": null}');
      await AxiosClient.getInstance().delete<GateWayResponse<null>>(`/service?id=${id}`);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  @Mutation
  setDuplicatedCheckId(duplicatedResponse: duplicatedCheck) {
    this.duplicatedId = duplicatedResponse;
  }
  @Action
  async getDuplicatedCheckId(id: string) {
    // addMock(`/service/detail/${id}`, JSON.stringify(getDuplicatedTrue));
    const response = await AxiosClient.getInstance().get<GateWayResponse<duplicatedCheck>>(
      `/serviceCheckById?id=${id}`
    );
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
      // addMock('/service/basicauth/', JSON.stringify(getBasicAuth));
      const response = await AxiosClient.getInstance().get<GateWayResponse<BasicAuthResponse>>(
        '/createAuthIdAndPwd?id=API8'
      );
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

  @Mutation
  setApiAuth(ApiAuthListResponse: ApiAuthResponse[]) {
    console.log('set Api Auth');
    this.apiAuthList = ApiAuthListResponse;
  }

  @Action
  async getApiAuthList() {
    try {
      // addMock('/service/apiauth/', JSON.stringify(getApiAuthList));
      const response = await AxiosClient.getInstance().get<GateWayResponse<JWTAlgResponse>>('/getApiAuthList');
      this.context.commit('setApiAuth', response.data.value);
    } catch (error: GateWayError | any) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
