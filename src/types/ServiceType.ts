export interface ServiceResponse {
  serviceNm: string;
  serviceId: string;
  authMethod: string[];
  start_validity_date: string;
  end_validity_date: string;
  update_data: string;
}

export interface DummyServiceResponse {
  no: string;
  serviceName: string;
  serviceId: string;
  ManagerName: string;
  department: string;
  email: string;
  period: string;
  update: string;
  authMethod: string[];
  slaPolicy: string[];
  serviceEx: string;
}

export const dummyData: DummyServiceResponse = {
  no: '1',
  serviceName: '서비스A',
  serviceId: 'SERVICE ID_NUMBER',
  ManagerName: '홍길동',
  department: 'Agile Core Team',
  email: 'abcabc@kt.com',
  period: '2202-04-01 ~ 2022-04-01',
  update: 'YYYY-MM-DD hh:mm:ss',
  authMethod: ['Basic Auth', 'passp2p_WOOOO', 'passp2p_WOOOO'],
  slaPolicy: ['분', '30'],
  serviceEx: '서비스 설명',
};
