export interface DummyServiceResponse {
  svcNm: string;
  svcId: string;
  MngNm: string;
  depart: string;
  email: string;
  period: string;
  authMtd: string[];
  slaPlc: string[];
  scvEx: string;
}

export const dummyData: DummyServiceResponse = {
  svcNm: '서비스A',
  svcId: 'SERVRCE_ID_NUMBER',
  MngNm: '홍길동',
  depart: 'Agile Core Team',
  email: 'abcabc@kt.com',
  period: '2202-04-01 ~ 2022-04-01',
  authMtd: ['Basic Auth', 'passp2p_WOOOO', 'passp2p_WOOOO'],
  slaPlc: ['분', '30'],
  scvEx: '서비스 설명',
};
