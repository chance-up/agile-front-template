import { HandlerGroupDetail } from '@/types/HandlerType';
import { addMock } from '@/axios/AxiosIntercept';
import { Module, Mutation, Action } from 'vuex-module-decorators';
import { AxiosClient } from '@/axios/AxiosClient';
import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';
import GateWayModule from '../GateWayModule';
import { GateWayResponse } from '@/types/GateWayResponse';

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
  // 핸들러 Req 그룹리스트
  public reqHandlerGroupList: HandlerGroupDetail[] = [];
  @Mutation
  setReqHandlerGroupList(list: HandlerGroupDetail[]): void {
    console.log('hjand', list);
    this.reqHandlerGroupList = list;
  }
  @Action
  async getReqHandlerGroupList() {
    try {
      // addMock('/api/getRequestHandlerGroupList', JSON.stringify(dummyReqHandlerGroupList));
      const response = await AxiosClient.getInstance().get<GateWayResponse<HandlerGroupDetail[]>>(
        'http://localhost:8080/mngt/v1/getRequestHandlerGroupList'
      );
      this.context.commit('setReqHandlerGroupList', response.data.value);
    } catch (error: GateWayError | any) {
      handleCommonError(error);
    }
  }

  // 핸들러 Res 그룹리스트
  public resHandlerGroupList: HandlerGroupDetail[] = [];
  @Mutation
  setResHandlerGroupList(list: HandlerGroupDetail[]): void {
    this.resHandlerGroupList = list;
  }
  @Action
  async getResHandlerGroupList() {
    try {
      // addMock('/api/getResponseHandlerGroupList', JSON.stringify(dummyResHandlerGroupList));
      const response = await AxiosClient.getInstance().get<GateWayResponse<HandlerGroupDetail[]>>(
        'http://localhost:8080/mngt/v1/getResponseHandlerGroupList'
      );
      this.context.commit('setResHandlerGroupList', response.data.value);
    } catch (error: GateWayError | any) {
      handleCommonError(error);
    }
  }

  @Action
  handlerReset() {
    this.context.commit('setResHandlerGroupList', []);
    this.context.commit('setReqHandlerGroupList', []);
  }
}
