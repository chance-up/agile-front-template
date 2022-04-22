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

export interface ApiResponse {
  id: string;
  sys_id: string;
  nm: string;
  if_no: string;
  meth: any;
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
  meth: any;
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
  meth: any;
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
