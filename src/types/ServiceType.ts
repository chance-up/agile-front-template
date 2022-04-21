export interface ServiceResponse {
  serviceNm: string;
  serviceId: string;
  authMethod: string[];
  start_validity_date: string;
  end_validity_date: string;
  update_data: string;
}

export interface DummyServiceResponse {
  serviceNm: string;
  serviceId: string;
  ManagerNm: string;
  department: string;
  email: string;
  start_validity_date: string;
  end_validity_date: string;
  update_date: string;
  authMethod: string[];
  slaPolicy: string[];
  serviceEx: string;
}

export const dummyData: DummyServiceResponse = {
  serviceNm: '서비스A',
  serviceId: 'SERVICE ID_NUMBER',
  ManagerNm: '홍길동',
  department: 'Agile Core Team',
  email: 'abcabc@kt.com',
  start_validity_date: '2022-04-01',
  end_validity_date: '2022-04-01',
  update_date: 'YYYY-MM-DD hh:mm:ss',
  authMethod: ['Basic Auth', 'passp2p_WOOOO', 'passp2p_WOOOO'],
  slaPolicy: ['분', '30'],
  serviceEx: '서비스 설명',
};
