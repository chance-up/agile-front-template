import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiSearchQuery, apiMockList, ApiDetailResponse } from '@/types/ApiType';
import { addMock } from '@/api/AxiosClient';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ApiResponse } from '@/api/ApiResponse';

@Module({ name: 'ApiModule' })
export default class ApiModule extends VuexModule {
  public apiList: ApiDetailResponse[] = [];

  @Mutation
  setApiList(list: ApiDetailResponse[]) {
    this.apiList = list;
  }

  @Action
  async getApiList(searchQuery?: ApiSearchQuery) {
    addMock('/api/list', JSON.stringify(apiMockList));
    const response = await ApiResponse.getInstance().get<GateWayResponse<ApiDetailResponse[]>>(
      '/api/list',
      searchQuery
    );
    this.context.commit('setApiList', response.data.value);
  }

  // @Action
  // async getSystemDetail(id: number) {
  //   addMock(`/api/detail/${id}`, JSON.stringify(dummyData));
  //   const response = await ApiResponse.getInstance().get<GateWayResponse<DummyApiResponse>>(`/api/detail/${id}`);
  //   this.context.commit('setApiDetail', response);
  // }
}
