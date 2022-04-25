import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiSearchQuery, apiMockList, ApiDetailResponse, apiMockData } from '@/types/ApiType';
import { addMock } from '@/api/AxiosClient';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ApiResponse } from '@/api/ApiResponse';

@Module({ name: 'ApiModule' })
export default class ApiModule extends VuexModule {
  public apiList: ApiDetailResponse[] = [];

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

  // @Action
  // async getSystemDetail(id: number) {
  //   addMock(`/api/detail/${id}`, JSON.stringify(dummyData));
  //   const response = await ApiResponse.getInstance().get<GateWayResponse<DummyApiResponse>>(`/api/detail/${id}`);
  //   this.context.commit('setApiDetail', response);
  // }
}

export const getApiDetail = async (id: string) => {
  addMock('/api/detail', JSON.stringify(apiMockData));
  const response = await ApiResponse.getInstance().get<ApiDetailResponse>('/api/detail', { id });
  console.log(response);
  if (typeof response.meth == 'string') response.meth = JSON.parse(response.meth);
  return response;
};
