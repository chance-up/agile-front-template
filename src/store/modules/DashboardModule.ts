import { HandlerGroupDetail } from '@/types/HandlerType';
import { addMock } from '@/axios/AxiosIntercept';
import { Module, Mutation, Action } from 'vuex-module-decorators';
import { AxiosClient } from '@/axios/AxiosClient';
import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';
import GateWayModule from '../GateWayModule';
import { GateWayResponse } from '@/types/GateWayResponse';
import { LastResponse, LastTraffic } from '@/types/DashboardType';

@Module({ name: 'DashboardModule' })
export default class DashboardModule extends GateWayModule {
  // Total API Traffic (24Hour) area

  // Error stats (24Hour) area

  // API 평균 응답시간 / TPS area

  // 실시간 Traffic area

  // API Top 5 area

  // Service Top 5 area

  // Last Traffic
  public lastTrafficList: LastTraffic[] = [];
  @Mutation
  setLastTrafficList(list: LastTraffic[]): void {
    this.lastTrafficList = list;
  }
  @Action
  async getLastTrafficList() {
    try {
      addMock('/api/getLastTrafficList', JSON.stringify({}));
      const response = await AxiosClient.getInstance().get<GateWayResponse<LastTraffic[]>>('/api/getLastTrafficList');
      this.context.commit('setLastTrafficList', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  // Last Response
  public lastResponseList: LastResponse[] = [];
  @Mutation
  setLastResponseList(list: LastResponse[]): void {
    this.lastResponseList = list;
  }
  @Action
  async getLastResponseList() {
    try {
      addMock('/api/getLastResponseList', JSON.stringify({}));
      const response = await AxiosClient.getInstance().get<GateWayResponse<LastResponse[]>>('/api/getLastResponseList');
      this.context.commit('setLastResponseList', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  @Action
  dashboardReset() {
    this.context.commit('setLastResponseList', []);
    this.context.commit('setLastTrafficList', []);
    this.context.commit('setReqHandlerGroupList', []);
  }
}
