import { GateWayResponse, Pagination } from '@/types/GateWayResponse';
import {
  ApiSearchQuery,
  apiMockList,
  ApiDetailResponse,
  apiMockData,
  apiMockData2,
  dummyDeleteResData,
  HandlerGroupDetail,
  dummyHandlerGroupList,
} from '@/types/ApiType';
import { addMock } from '@/axios/AxiosIntercept';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { AxiosClient } from '@/axios/AxiosClient';
import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';
import GateWayModule from '../GateWayModule';

function handleCommonError(error: GateWayError | any) {
  try {
    if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
      console.log('NETWORK_ERROR');
    } else {
      console.log('서버통신에 실패하였습니다.');
    }
  } catch (e) {
    console.log('서버통신에 실패하였습니다.');
  }
}
@Module({ name: 'ApiModule' })
export default class ApiModule extends GateWayModule {
  //api 리스트 요청

  public apiList: ApiDetailResponse[] = [];

  @Mutation
  setApiList(list: ApiDetailResponse[]): void {
    console.log('set API list', list);
    this.apiList = list;
  }
  @Action
  async getApiList(searchQuery?: ApiSearchQuery) {
    try {
      this.showLoading();
      console.log('searchQuery: ', searchQuery);
      addMock('/api/list', JSON.stringify(apiMockList));
      const response = await AxiosClient.getInstance().get<GateWayResponse<ApiDetailResponse[]>>(
        '/api/list',
        searchQuery
      );
      console.log(response);
      response.data.value.map((item: ApiDetailResponse) => {
        if (typeof item.meth == 'string') item.meth = JSON.parse(item.meth);
      });
      this.context.commit('setApiList', response.data.value);
      this.context.commit('setPagination', response.data.pagination);
      this.dissmissLoading();
    } catch (error: GateWayError | any) {
      handleCommonError(error);
      this.dissmissLoading();

      // 디테일 에러 처리
    }
  }

  //api 상세 요청

  public apiDetail: ApiDetailResponse | null = null;

  @Mutation
  setApiDetail(api: ApiDetailResponse | null) {
    console.log('set API detail', api);
    this.apiDetail = api;
  }
  @Action
  async getApiDetail(id: string) {
    try {
      this.showLoading();
      // param 체크
      addMock('/api/detail', JSON.stringify(id == apiMockData.id ? apiMockData : apiMockData2));
      const response = await AxiosClient.getInstance().get<ApiDetailResponse>('/api/detail', { id });
      if (typeof response.meth == 'string') response.meth = JSON.parse(response.meth);
      this.context.commit('setApiDetail', response);
      this.dissmissLoading();
    } catch (error: GateWayError | any) {
      handleCommonError(error);
    }
  }

  // Api 삭제
  @Action
  async deleteApi(id: string) {
    try {
      addMock(`/api/deleteApi/${id}`, JSON.stringify(dummyDeleteResData));
      const response = await AxiosClient.getInstance().get<ApiDetailResponse[]>(`/api/deleteApi/${id}`);
      console.log('api delete response: ', response);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        console.log('NetWork not connection');
      } else {
        console.log('서버통신에 실패하였습니다.');
      }
    }
  }

  // 핸들러그룹리스트
  public handlerGroupList: HandlerGroupDetail[] = [];
  @Mutation
  setHandlerGroupList(list: HandlerGroupDetail[]): void {
    this.handlerGroupList = list;
  }
  @Action
  async getHandlerGroupList() {
    try {
      addMock('/api/handlerGroupList', JSON.stringify(dummyHandlerGroupList));
      const response = await AxiosClient.getInstance().get<HandlerGroupDetail[]>('/api/handlerGroupList');
      this.context.commit('setHandlerGroupList', response);
    } catch (error: GateWayError | any) {
      handleCommonError(error);
    }
  }
  // 초기화
  @Action
  reset() {
    this.context.commit('setApiList', []);
    this.context.commit('setApiDetail', null);
  }

  // 페이지네이션
  public pagination: Pagination | null = null;
  @Mutation
  setPagination(pagination: Pagination | null): void {
    this.pagination = pagination;
  }
}

// 중복 체크
export const apiValidationCheck = async (id: string) => {
  addMock(
    '/api/validation',
    JSON.stringify(apiMockList.data.value.map((item: ApiDetailResponse) => item.id).includes(id) ? false : true)
  );
  const response = await AxiosClient.getInstance().get<boolean>('/api/validation', { id });
  console.log('apiValidationCheck => ' + response);

  return response;
};
