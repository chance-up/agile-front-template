import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiSearchQuery, apiMockList, ApiDetailResponse, apiMockData, apiMockData2 } from '@/types/ApiType';
import { addMock } from '@/api/AxiosClient';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ApiResponse } from '@/api/ApiResponse';

@Module({ name: 'ApiModule' })
export default class ApiModule extends VuexModule {
  public apiList: ApiDetailResponse[] = [];
  public apiDetail: ApiDetailResponse | null = null;

  //api 리스트 요청
  @Mutation
  setApiList(list: ApiDetailResponse[]): void {
    console.log('set API list', list);
    this.apiList = list;
  }

  @Action
  async getApiList(searchQuery?: ApiSearchQuery) {
    addMock('/api/list', JSON.stringify(apiMockList));
    const response = await ApiResponse.getInstance().get<ApiDetailResponse[]>('/api/list', searchQuery);
    console.log(response);
    response.map((item: ApiDetailResponse) => {
      if (typeof item.meth == 'string') item.meth = JSON.parse(item.meth);
    });
    this.context.commit('setApiList', response);
  }

  @Mutation
  setApiDetail(api: ApiDetailResponse) {
    console.log('set API detail', api);
    this.apiDetail = api;
  }

  @Action({ commit: 'setApiDetail' })
  async getApiDetail(id: string) {
    // param 체크
    addMock('/api/detail', JSON.stringify(id == apiMockData.id ? apiMockData : apiMockData2));
    const response = await ApiResponse.getInstance().get<ApiDetailResponse>('/api/detail', { id });
    console.log(response);
    if (typeof response.meth == 'string') response.meth = JSON.parse(response.meth);
    return response;
  }
}

export const getApiDetail = async (id: string) => {
  addMock('/api/detail', JSON.stringify(apiMockData));
  const response = await ApiResponse.getInstance().get<ApiDetailResponse>('/api/detail', { id });
  console.log(response);
  if (typeof response.meth == 'string') response.meth = JSON.parse(response.meth);
  return response;
};
