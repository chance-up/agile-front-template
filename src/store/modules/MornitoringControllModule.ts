import { EachApi, EachService } from '@/types/MornitoringControllType';

import { Module, Mutation, Action } from 'vuex-module-decorators';
import GateWayModule from '../GateWayModule';

@Module({ name: 'MornitoringControllModule' })
export default class MornitoringControllModule extends GateWayModule {
  //
  apiList: EachApi[] = [];
  serviceList: EachService[] = [];

  @Mutation
  setApiList(list: EachApi[]): void {
    this.apiList = list;
  }
  @Action({ rawError: true })
  async getApiList(time: number) {
    let cnt = Math.random() * 4 + 5;

    let list: EachApi[] = [];
    for (let i = 0; i < cnt; i++) {
      let totCnt = Math.random() * 190 + 10;
      let sucesCnt = Math.floor(totCnt * Math.random());
      let failCnt = totCnt - sucesCnt;
      let sucesRate = Math.floor((sucesCnt / totCnt) * 100);
      let failRate = 100 - sucesRate;
      let crCnt = Math.floor(failCnt * Math.random());
      let maCnt = Math.floor((failCnt - crCnt) * Math.random());
      let miCnt = failCnt - crCnt - maCnt;
      let tps = Math.random();
      let avgResTm = Math.random() * 10 + 1;
      let api: EachApi = {
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
  setServiceList(list: EachService[]): void {
    this.serviceList = list;
  }
  @Action({ rawError: true })
  async getServiceList(time: number) {
    let cnt = Math.random() * 4 + 5;
    let list: EachService[] = [];
    for (let i = 0; i < cnt; i++) {
      let totCnt = Math.random() * 190 + 10;
      let sucesCnt = Math.floor(totCnt * Math.random());
      let failCnt = totCnt - sucesCnt;
      let sucesRate = Math.floor((sucesCnt / totCnt) * 100);
      let failRate = 100 - sucesRate;
      let crCnt = Math.floor(failCnt * Math.random());
      let maCnt = Math.floor((failCnt - crCnt) * Math.random());
      let miCnt = failCnt - crCnt - maCnt;
      let tps = Math.random();
      let avgResTm = Math.random() * 10 + 1;
      this.getApiList(time);
      let apiList: EachApi[] = [];
      for (let j = 0; j < this.apiList.length; j++) {
        if (Math.random() > 0.5) {
          apiList.push(this.apiList[j]);
        }
      }
      if(apiList.length === 0) {
          apiList.push(this.apiList[0]);
      }
      let service: EachService = {
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
  }
}
