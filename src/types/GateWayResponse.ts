export interface GateWayResponse<T> {
  common: Common;
  data: T;
}
export interface Common {
  code: number;
  message: string;
}
