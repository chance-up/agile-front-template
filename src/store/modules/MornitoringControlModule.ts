import { EachApi, EachService } from '@/types/MornitoringControllType';

import { Module, Mutation, Action } from 'vuex-module-decorators';
import GateWayModule from '../GateWayModule';

@Module({ namespaced: true, name: 'MornitoringControlModule' })
export default class MornitoringControlModule extends GateWayModule {
  //
  apiList: EachApi[] = [];
  public serviceList: EachService[] = [];

  @Mutation
  setApiList(list: EachApi[]): void {
    this.apiList = list;
  }
  @Action({ rawError: true })
  getApiList(time: number) {
    const cnt = Math.random() * 4 + 5;

    const list: EachApi[] = [];
    for (let i = 0; i < cnt; i++) {
      const totCnt = Math.floor(Math.random() * 190 + 10);
      const sucesCnt = Math.floor(totCnt * Math.random());
      const failCnt = totCnt - sucesCnt;
      const sucesRate = Math.floor((sucesCnt / totCnt) * 100);
      const failRate = 100 - sucesRate;
      const crCnt = Math.floor(failCnt * Math.random());
      const maCnt = Math.floor((failCnt - crCnt) * Math.random());
      const miCnt = failCnt - crCnt - maCnt;
      const tps = Math.floor(Math.random() * 1000) / 1000;
      const avgResTm = Math.floor(Math.random() * 10 + 1);
      const api: EachApi = {
        statPerd: time, // 통계 기준 시간
        sysId: 'sysId' + i, // 시스템 ID
        apiId: 'apiId' + i, // Api ID
        apiDesc: 'apiDesc' + i, // Api 설명
        totCnt: totCnt, // 전체 서비스 건수
        sucesCnt: sucesCnt, // 성공 건수
        failCnt: failCnt, // 실패 건수
        sucesRate: sucesRate, // 성공율
        failRate: failRate, // 실패율
        crCnt: crCnt, // Critical 건수
        maCnt: maCnt, // Major 건수
        miCnt: miCnt, // Minor 건수
        tps: tps, // TPS
        avgResTm: avgResTm, // 평균 응답시간
      };
      list.push(api);
    }
    this.context.commit('setApiList', list);
  }

  @Mutation
  setServiceList(list: EachService[]) {
    console.log('setServiceList');
    this.serviceList = list;
  }
  @Action({ rawError: true })
  getServiceList(time: number) {
    console.log('getServiceList');
    const cnt = Math.random() * 4 + 5;
    const list: EachService[] = [];
    for (let i = 0; i < cnt; i++) {
      let totCnt = 0;
      let sucesCnt = 0;
      let failCnt = 0;

      let crCnt = 0;
      let maCnt = 0;
      let miCnt = 0;
      const tps = Math.floor(Math.random() * 1000) / 1000;
      const avgResTm = Math.floor(Math.random() * 10 + 1);
      // const totCnt = Math.floor(Math.random() * 190 + 10);
      // const sucesCnt = Math.floor(totCnt * Math.random());
      // const failCnt = totCnt - sucesCnt;
      // const sucesRate = Math.floor((sucesCnt / totCnt) * 100);
      // const failRate = 100 - sucesRate;
      // const crCnt = Math.floor(failCnt * Math.random());
      // const maCnt = Math.floor((failCnt - crCnt) * Math.random());
      // const miCnt = failCnt - crCnt - maCnt;
      // const tps = Math.floor(Math.random() * 1000) / 1000;
      // const avgResTm = Math.floor(Math.random() * 10 + 1);
      this.getApiList(time);
      const apiList: EachApi[] = [];
      for (let j = 0; j < this.apiList.length; j++) {
        if (Math.random() > 0.5) {
          totCnt += this.apiList[j].totCnt;
          sucesCnt += this.apiList[j].sucesCnt;
          failCnt += this.apiList[j].failCnt;
          crCnt += this.apiList[j].crCnt;
          maCnt += this.apiList[j].maCnt;
          miCnt += this.apiList[j].miCnt;
          apiList.push(this.apiList[j]);
        }
      }
      if (apiList.length === 0) {
        totCnt += this.apiList[0].totCnt;
        sucesCnt += this.apiList[0].sucesCnt;
        failCnt += this.apiList[0].failCnt;
        crCnt += this.apiList[0].crCnt;
        maCnt += this.apiList[0].maCnt;
        miCnt += this.apiList[0].miCnt;
        apiList.push(this.apiList[0]);
      }
      const sucesRate = Math.floor((sucesCnt / totCnt) * 100);
      const failRate = 100 - sucesRate;

      const service: EachService = {
        statPerd: time, // 통계 기준 시간
        svcId: 'svcId' + i, // 서비스 ID
        svcDesc: 'svcDesc' + i, // 서비스 설명
        totCnt: totCnt, // 전체 서비스 건수
        sucesCnt: sucesCnt, // 성공 건수
        failCnt: failCnt, // 실패 건수
        sucesRate: sucesRate, // 성공율
        failRate: failRate, // 실패율
        crCnt: crCnt, // Critical 건수
        maCnt: maCnt, // Major 건수
        miCnt: miCnt, // Minor 건수
        tps: tps, // TPS
        avgResTm: avgResTm, // 평균 응답시간
        apiList: apiList, // Api 리스트
      };
      list.push(service);
    }
    this.context.commit('setServiceList', list);
  }
}
