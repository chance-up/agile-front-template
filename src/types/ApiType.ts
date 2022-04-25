export interface DummyApiResponse {
  sysNm: string;
  apiId: string;
  apiNm: string;
  itfNum: number;
  methods: string[];
  uriSer: string;
  uriSys: string;
  sysSync: string;
  reqHdlGrp: string;
  resHdlGrp: string;
  timeOut: number;
  apiCmt: string;
  updateTime: string;
}

export interface ApiDetailResponse {
  id: string;
  sys_id: string;
  nm: string;
  if_no: string;
  meth: string[] | string;
  uri_in: string;
  uri_out: string;
  if_grp: string;
  req_handlr_grp_id: string;
  res_handlr_grp_id: string;
  time_out: number;
  desc: string | null;
  cret_dt: string | null;
  cret_id: string | null;
  upd_dt: string | null;
  upd_id: string | null;
}

export interface ApiEditRequestBody {
  id: string;
  sys_id: string;
  nm: string;
  if_no: string;
  meth: string[];
  uri_in: string;
  uri_out: string;
  if_grp: string;
  req_handlr_grp_id: string;
  res_handlr_grp_id: string;
  time_out: number;
  desc: string | null;
}

export interface ApiCreateRequestBody {
  id: string;
  sys_id: string;
  nm: string;
  if_no: string;
  meth: string[];
  uri_in: string;
  uri_out: string;
  if_grp: string;
  req_handlr_grp_id: string;
  res_handlr_grp_id: string;
  time_out: number;
  desc: string | null;
}

export interface ApiSearchQuery {
  apiId?: string;
  apiName?: string;
  platformName?: string;
  uri?: string;
  page?: number;
}

export const apiMockData: ApiDetailResponse = {
  id: 'getCustInfo11',
  sys_id: 'id1',
  nm: '고객 정보 조회',
  if_no: 'IF_CAPRI_000122',
  meth: ['GET', 'POST'],
  uri_in: '/CAPRI/v1/getCustInfo22',
  uri_out: '/CAPRI/v1/getCustInfo22',
  if_grp: 'authentication',
  req_handlr_grp_id: 'REQ.DEFAULT',
  res_handlr_grp_id: 'RES.DEFAULT',
  time_out: 3000,
  desc: 'kt 가입자 고객 정보 제공',
  cret_dt: '2022-04-22 11:23:35',
  cret_id: 'ktds',
  upd_dt: '2022-04-22 11:23:35',
  upd_id: null,
};

export const apiMockData2: ApiDetailResponse = {
  id: 'getCustInfo22',
  sys_id: 'id2',
  nm: '고객 정보 조회',
  if_no: 'IF_CAPRI_000122',
  meth: ['GET', 'DELETE'],
  uri_in: '/CAPRI/v1/getCustInfo22',
  uri_out: '/CAPRI/v1/getCustInfo22',
  if_grp: 'authentication',
  req_handlr_grp_id: 'REQ.DEFAULT',
  res_handlr_grp_id: 'RES.DEFAULT',
  time_out: 3000,
  desc: 'kt 가입자 고객 정보 제공',
  cret_dt: '2022-04-22 11:23:35',
  cret_id: 'ktds',
  upd_dt: '2022-04-22 11:23:35',
  upd_id: null,
};

export const apiMockList: ApiDetailResponse[] = [apiMockData, apiMockData2];

export const dummyData: DummyApiResponse = {
  sysNm: '플랫폼 서비스A',
  apiId: 'API ID_NUMBER',
  apiNm: 'API NAME_영문한글혼용가능?',
  itfNum: 123123123,
  methods: ['DELETE', 'GET', 'POST'],
  uriSer: '/ccas/v1/getUserInfo',
  uriSys: '/ccas/v1/getUserInfo',
  sysSync: 'https://safe2gopass.com:443',
  reqHdlGrp: 'REQ.API & Login Authentication',
  resHdlGrp: 'RES.DEFAULT',
  timeOut: 30,
  apiCmt: 'API별 분/시/일/월 단위 총량, TPS API별 분/시/일/월 단위 총량, API별 분/시/일/월 단위 총량',
  updateTime: '2020-01-01 00:00:00',
};

export const dummyList: DummyApiResponse[] = [
  dummyData,
  dummyData,
  dummyData,
  dummyData,
  dummyData,
  dummyData,
  dummyData,
  dummyData,
  dummyData,
  dummyData,
];

export const dummySystemList: string[] = [
  '시스템1',
  '시스템2',
  '시스템3',
  '시스템4',
  '시스템5',
  '시스템6',
  '시스템7',
  '시스템8',
  '시스템9',
  '시스템10',
];

export const dummySystemInfList: string[] = [
  'test1.com',
  'test2.com',
  'test3.com',
  'test4.com',
  'test5.com',
  'test6.com',
  'test7.com',
  'test8.com',
  'test9.com',
  'test10.com',
];

export interface ApiInfoEdit {
  id: string;
  sys_id: string;
  nm: string;
  if_no: string;
  meth: string;
  uri_in: string;
  uri_out: string;
  if_grp: string;
  req_handlr_grp_id: string;
  res_handlr_grp_id: string;
  time_out: number;
  desc: string;
}
