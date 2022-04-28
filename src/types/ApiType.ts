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
  sysId: string;
  sysNm: string;
  nm: string;
  ifNo: string;
  meth: string[] | string;
  uriIn: string;
  uriOut: string;
  ifGrp: string;
  reqHandlrGrpId: string;
  resHandlrGrpId: string;
  timeOut: number;
  desc: string | null;
  cretDt: string | null;
  cretId: string | null;
  updDt: string | null;
  updId: string | null;
}

export interface ApiEditRequestBody {
  id: string;
  sysId: string;
  nm: string;
  ifNo: string;
  meth: string[];
  uriIn: string;
  uriOut: string;
  ifGrp: string;
  reqHandlrGrpId: string;
  resHandlrGrpId: string;
  timeOut: number;
  desc: string | null;
}
// [x:string ] => confirm 출력용으로 사용
export interface ApiCreateRequestBody {
  [x: string]: any;
  sysNm: string;
  id: string;
  sysId: string;
  nm: string;
  ifNo: string;
  meth: string[] | string;
  uriIn: string;
  uriOut: string;
  ifGrp: string;
  reqHandlrGrpId: string;
  resHandlrGrpId: string;
  timeOut: number;
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
  sysId: 'id1',
  sysNm: 'name1',
  nm: '고객 정보 조회',
  ifNo: 'IF_CAPRI_000122',
  meth: ['GET', 'POST'],
  uriIn: '/CAPRI/v1/getCustInfo22',
  uriOut: '/CAPRI/v1/getCustInfo22',
  ifGrp: 'authentication',
  reqHandlrGrpId: 'REQ.DEFAULT',
  resHandlrGrpId: 'RES.DEFAULT',
  timeOut: 3000,
  desc: 'kt 가입자 고객 정보 제공',
  cretDt: '2022-04-22 11:23:35',
  cretId: 'ktds',
  updDt: '2022-04-22 11:23:35',
  updId: null,
};

export const apiMockData2: ApiDetailResponse = {
  id: 'getCustInfo22',
  sysId: 'id2',
  sysNm: 'name2',
  nm: '고객 정보 삭제',
  ifNo: 'IF_CAPRI_000122',
  meth: '["DELETE", "PUT"]',
  uriIn: '/CAPRI/v1/getCustInfo22',
  uriOut: '/CAPRI/v1/getCustInfo22',
  ifGrp: 'service',
  reqHandlrGrpId: 'REQ.DEFAULT',
  resHandlrGrpId: 'RES.DEFAULT',
  timeOut: 5000,
  desc: 'kt 가입자 고객 정보 삭제',
  cretDt: '2022-04-22 11:23:35',
  cretId: 'ktds',
  updDt: '2022-04-22 11:23:35',
  updId: null,
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
  sysId: string;
  nm: string;
  ifNo: string;
  meth: string;
  uriIn: string;
  uriOut: string;
  ifGrp: string;
  reqHandlrGrpId: string;
  resHandlrGrpId: string;
  timeOut: number;
  desc: string;
}
export const dummyHandlerGroupIdList: string[] = [
  'handlerGroupId1',
  'handlerGroupId2',
  'handlerGroupId3',
  'handlerGroupId4',
];

export interface ApiDetail {
  apiId: number | string;
  apiNm: string;
  apiDesc: string;
}
export interface ApiGroupDetail {
  apiGroupId: number | string;
  apiGroupNm: string;
  apiGroupDesc: string;
  apiIdList: ApiDetail[];
}

// delete
export const dummyDeleteResData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: null,
};
