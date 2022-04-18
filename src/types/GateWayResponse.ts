export interface GateWayResponse<T> {
  common: Common;
  data: T;
}

export interface Common {
  response_at: String;
  result: Result;
}

export interface Result {
  code: String;
  message: String;
  description: String;
  request_uri: String;
  request_method: String;
}
