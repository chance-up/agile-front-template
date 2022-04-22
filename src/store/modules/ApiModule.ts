import { GateWayResponse } from '@/types/GateWayResponse';
import { dummyList, DummyApiResponse, ApiSearchQuery } from '@/types/ApiType';
import { ApiResponse } from '@/api/ApiResponse';
import { addMock } from '@/api/AxiosClient';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module({ name: 'ApiModule' })
export default class ApiModule extends VuexModule {
  public apiList: DummyApiResponse[] = [];
  @Mutation
  setApiList(list: DummyApiResponse[]) {
    this.apiList = list;
  }

  @Action
  async getApiList(searchQuery: ApiSearchQuery) {
    addMock('/api/list', JSON.stringify(dummyList));
    const response = await ApiResponse.getInstance().get<GateWayResponse<DummyApiResponse[]>>('/api/list', searchQuery);
    this.context.commit('setApiList', response.data);
  }

  // @Action
  // async getSystemDetail(id: number) {
  //   addMock(`/api/detail/${id}`, JSON.stringify(dummyData));
  //   const response = await ApiResponse.getInstance().get<GateWayResponse<DummyApiResponse>>(`/api/detail/${id}`);
  //   this.context.commit('setApiDetail', response);
  // }
}
