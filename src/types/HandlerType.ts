// import { GateWayResponse, Pagination } from './GateWayResponse';

export interface HandlerDetail {
  apiId: number | string;
  apiNm: string;
  apiDesc: string;
}
export interface HandlerGroupDetail {
  id: string;
  trtSect: string;
  hndlrId: string[];
  desc: string | null;
  cretDt: string;
  cretId: string;
  updDt: string | null;
  updId: string | null;
}

// 이런식으로 핸들러 타입 바뀔꺼니까 월요일 기준으로 변경해놓기
// export interface HandlerDetail {
//   hndlrId: string;
//   hndlrDesc: string | null;
// }
// export interface HandlerGroupDetail {
//   grpId: string;
//   hndlrId: HandlerDetail[];
//   desc: string | null;
// }
