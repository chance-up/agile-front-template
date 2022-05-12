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
