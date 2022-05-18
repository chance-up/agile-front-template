export interface LastTraffic {
  statBaseTm: string; // 통계 기준 시간
  todayAvgResTm: number; // 오늘 평균 응답시간
  ystdayAvgResTm: number; // 어제 평균 응답시간
  lstWkAvgResTm: number; // 저번주 평균 응답시간
}

export interface LastResponse {
  statBaseTm: string; // 통계 기준 시간
  todayCnt: number; // 오늘 응답 건수
  ystdayCnt: number; // 어제 응답 건수
  lstWkCnt: number; // 저번주 응답 건수
}
