export interface EachService {
  statPerd: number; // 통계 기준 시간
  svcId: string; // 서비스 ID
  svcDesc: string; // 서비스 설명
  totCnt: number; // 전체 서비스 건수
  sucesCnt: number; // 성공 건수
  failCnt: number; // 실패 건수
  sucesRate: number; // 성공율
  failRate: number; // 실패율
  crCnt: number; // Critical 건수
  maCnt: number; // Major 건수
  miCnt: number; // Minor 건수
  tps: number; // TPS
  avgResTm: number; // 평균 응답시간
  apiList: EachApi[]; // API 리스트
}

export interface EachApi {
  statPerd: number; // 통계 기준 시간
  sysId: string; // 시스템 ID
  apiId: string; // Api ID
  apiDesc: string; // Api 설명
  totCnt: number; // 전체 서비스 건수
  sucesCnt: number; // 성공 건수
  failCnt: number; // 실패 건수
  sucesRate: number; // 성공율
  failRate: number; // 실패율
  crCnt: number; // Critical 건수
  maCnt: number; // Major 건수
  miCnt: number; // Minor 건수
  tps: number; // TPS
  avgResTm: number; // 평균 응답시간
}
