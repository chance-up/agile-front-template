import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiSearchQuery, apiMockList, ApiDetailResponse, apiMockData, apiMockData2 } from '@/types/ApiType';
import { addMock } from '@/axios/AxiosIntercept';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { AxiosClient } from '@/axios/AxiosClient';
import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';

function handleCommonError(error: GateWayError | any) {
  if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
    console.log('NETWORK_ERROR');
  } else {
    console.log('서버통신에 실패하였습니다.');
  }
}
@Module({ name: 'ApiModule' })
export default class ApiModule extends VuexModule {
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
      addMock('/api/list', JSON.stringify(apiMockList));
      const response = await AxiosClient.getInstance().get<ApiDetailResponse[]>('/api/list', searchQuery);
      console.log(response);
      response.map((item: ApiDetailResponse) => {
        if (typeof item.meth == 'string') item.meth = JSON.parse(item.meth);
      });
      this.context.commit('setApiList', response);
    } catch (error: GateWayError | any) {
      handleCommonError(error);
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
  @Action({ commit: 'setApiDetail' })
  async getApiDetail(id: string) {
    // param 체크
    addMock('/api/detail', JSON.stringify(id == apiMockData.id ? apiMockData : apiMockData2));
    const response = await AxiosClient.getInstance().get<ApiDetailResponse>('/api/detail', { id });
    if (typeof response.meth == 'string') response.meth = JSON.parse(response.meth);
    return response;
  }

  // 초기화
  @Action
  reset() {
    this.context.commit('setApiList', []);
    this.context.commit('setApiDetail', null);
  }
}

// 중복 체크
export const apiValidationCheck = async (id: string) => {
  console.log(id, apiMockList[0].id);
  addMock(
    '/api/validation',
    JSON.stringify(apiMockList.map((item: ApiDetailResponse) => item.id).includes(id) ? false : true)
  );
  const response = await AxiosClient.getInstance().get<boolean>('/api/validation', { id });
  console.log('apiValidationCheck => ' + response);

  return response;
};
