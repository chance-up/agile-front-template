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
  apiCmt:
    'API별 분/시/일/월 단위 총량, TPS API별 분/시/일/월 단위 총량, API별 분/시/일/월 단위 총량',
};
