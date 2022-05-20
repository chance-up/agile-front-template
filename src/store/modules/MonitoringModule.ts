import { addMock } from '@/axios/AxiosIntercept';
import { Module, Mutation, Action } from 'vuex-module-decorators';
import { AxiosClient } from '@/axios/AxiosClient';
import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';
import GateWayModule from '../GateWayModule';
import { GateWayResponse } from '@/types/GateWayResponse';
import { ServiceStat } from '@/types/MonitoriingType';

@Module({ name: 'MonitoringModule' })
export default class MonitoringModule extends GateWayModule {
  // // statistic
  public serviceStatList: ServiceStat[] = [];
  @Mutation
  setServiceStatListt(list: ServiceStat[]): void {
    this.serviceStatList = list;
  }
  // @Action
  // async getLastTrafficList() {
  //   try {
  //     // ========== 목데이터 부분 ==========
  //     const mockList: LastTraffic[] = [];
  //     for (let h = 0; h < 24; h++) {
  //       for (let m = 0; m < 6; m++) {
  //         const r = randomInt((1 + h + m) / 2, (h > 15 ? 25 - h : h) + m + 2) * 1000;
  //         mockList.push({
  //           statBaseTm: `2019-08-01 ${h < 10 ? '0' + h : h}:${m + '0'}:00`,
  //           todayAvgResTm: r,
  //           ystdayAvgResTm: (r * randomInt(900, 1100)) / 1000,
  //           lstWkAvgResTm: (r * randomInt(1000, 1400)) / 1000,
  //         });
  //       }
  //     }
  //     addMock('/api/getLastTrafficList', JSON.stringify(mockList));
  //     const response = await AxiosClient.getInstance().get<LastTraffic[]>('/api/getLastTrafficList');
  //     this.context.commit('setLastTrafficList', response);
  //   } catch (error: GateWayError | any) {
  //     return Promise.reject(error);
  //   }
  // }
  // // Last Response
  // public lastResponseList: LastResponse[] = [];
  // @Mutation
  // setLastResponseList(list: LastResponse[]): void {
  //   this.lastResponseList = list;
  // }
  // @Action
  // async getLastResponseList() {
  //   try {
  //     // ========== 목데이터 부분 ==========
  //     const mockList: LastResponse[] = [];
  //     for (let h = 0; h < 24; h++) {
  //       for (let m = 0; m < 6; m++) {
  //         const r = randomInt((1 + h + m) / 2, h + m + 2) * 100;
  //         mockList.push({
  //           statBaseTm: `2019-08-01 ${h < 10 ? '0' + h : h}:${m + '0'}:00`,
  //           todayCnt: r,
  //           ystdayCnt: (r * randomInt(400, 1500)) / 1000,
  //           lstWkCnt: (r * randomInt(1000, 1400)) / 1000,
  //         });
  //       }
  //     }
  //     addMock('/api/getLastResponseList', JSON.stringify(mockList));
  //     // ==================================
  //     const response = await AxiosClient.getInstance().get<LastResponse[]>('/api/getLastResponseList');
  //     this.context.commit('setLastResponseList', response);
  //   } catch (error: GateWayError | any) {
  //     return Promise.reject(error);
  //   }
  // }
  // @Action
  // dashBoardReset() {
  //   this.context.commit('setLastResponseList', []);
  //   this.context.commit('setLastTrafficList', []);
  //   this.context.commit('setReqHandlerGroupList', []);
  // }
}

// const randomInt = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
