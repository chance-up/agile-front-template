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
import { Module, Mutation, Action } from 'vuex-module-decorators';
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
@Module({ name: 'HandlerModule' })
export default class HandlerModule extends GateWayModule {

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
}
