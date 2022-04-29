import { Data, GateWayResponse, Pagination } from './GateWayResponse';

interface AuthResponse {
  BASIC_AUTH: BasicAuthDetail;
  JWT: JWTDetail;
}
interface BasicAuthDetail {
  id: string;
  pw: string;
}

interface JWTDetail {
  alg: string[];
  issuer: string;
  subject: string;
  publickey: string;
}
export interface ServiceResponse {
  id: string;
  nm: string;
  tkcgr_nm: string;
  tkcgr_pos: string;
  tkcgr_eml: string;
  sla_yn: string;
  sla_type: string;
  sla_cnt: number;
  svc_st_dt: string;
  svc_end_dt: string;
  athn: AuthResponse;
  api_aut: string;
  desc: string;
  cret_dt: string;
  upd_dt: string;
  cret_id: string;
  upd_id: string;
}

export interface BasicAuthResponse {
  id: string;
  pw: string;
}

export interface duplicatedCheck {
  isDuplicated: boolean;
}

export const basicAuthMock: BasicAuthResponse = {
  id: 'AKSJaiohfasdAS7asD',
  pw: 'KL8SsS1KKsdJKASH9',
};

export interface ServiceRegisterRequest {
  id: string;
  nm: string;
  tkcgr_nm: string;
  tkcgr_pos: string;
  tkcgr_eml: string;
  sla_yn: string;
  sla_type: string;
  sla_cnt: number;
  svc_st_dt: string;
  svc_end_dt: string;
  athn: AuthResponse;
  api_aut: string;
  desc: string;
}

export const pagination: Pagination = {
  page: 1,
  size: 10,
  total_elements: 57,
  total_pages: 6,
  current_elements: 10,
  current_page: 1,
  order_by: 'ID',
  sort_by: 'DESC',
  limit: 10,
};

export const searchServiceListResponse: ServiceResponse[] = [
  {
    id: 'KT_COM',
    nm: 'KT닷컴',
    tkcgr_nm: '이경민',
    tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
    tkcgr_eml: 'km0403.lee@kt.com',
    sla_type: 'MINITUE',
    sla_yn: 'total',
    sla_cnt: 10,
    svc_st_dt: '2022-04-13 00:00:00',
    svc_end_dt: '9999-12-31 00:00:00',
    athn: {
      BASIC_AUTH: { id: '', pw: '' },
      JWT: { alg: ['A', 'B', 'C'], issuer: '임꺽정', subject: '홍길등', publickey: 'testKey' },
    },
    api_aut: 'admin',
    desc: 'test',
    cret_dt: '2022-04-20 17:44:23',
    upd_dt: '2022-04-20 17:44:23',
    cret_id: 'AUTH_ADMIN',
    upd_id: 'AUTH_ADMIN',
  },
  {
    id: 'Safe2go',
    nm: 'safe2gogogo',
    tkcgr_nm: '박재원',
    tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
    tkcgr_eml: 'parkjaewon@kt.com',
    sla_yn: 'TPS',
    sla_type: 'HOUR',
    sla_cnt: 10,
    svc_st_dt: '2022-04-13 00:00:00',
    svc_end_dt: '9999-12-31 00:00:00',
    athn: {
      BASIC_AUTH: { id: 'admin', pw: '123123' },
      JWT: { alg: [], issuer: '', subject: '', publickey: '' },
    },
    api_aut: 'admin',
    desc: 'test',
    cret_dt: '2022-04-20 17:44:23',
    upd_dt: '2022-04-20 17:44:23',
    cret_id: 'AUTH_ADMIN',
    upd_id: 'AUTH_ADMIN',
  },
  {
    id: 'chanceUp',
    nm: 'chanceUpService',
    tkcgr_nm: '최찬섭',
    tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
    tkcgr_eml: 'chanceUp@kt.com',
    sla_yn: 'TPS',
    sla_type: 'HOUR',
    sla_cnt: 10,
    svc_st_dt: '2022-04-13 00:00:00',
    svc_end_dt: '9999-12-31 00:00:00',
    athn: {
      BASIC_AUTH: { id: 'admin', pw: '123123' },
      JWT: { alg: [], issuer: '', subject: '', publickey: '' },
    },
    api_aut: 'admin',
    desc: 'test',
    cret_dt: '2022-04-20 17:44:23',
    upd_dt: '2022-04-20 17:44:23',
    cret_id: 'AUTH_ADMIN',
    upd_id: 'AUTH_ADMIN',
  },
];

export const serviceListResponse: ServiceResponse[] = [
  {
    id: 'KT_COM',
    nm: 'KT닷컴',
    tkcgr_nm: '이경민',
    tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
    tkcgr_eml: 'km0403.lee@kt.com',
    sla_type: 'MINITUE',
    sla_yn: 'total',
    sla_cnt: 10,
    svc_st_dt: '2022-04-13 00:00:00',
    svc_end_dt: '9999-12-31 00:00:00',
    athn: {
      BASIC_AUTH: { id: '', pw: '' },
      JWT: { alg: ['A', 'B', 'C'], issuer: '임꺽정', subject: '홍길등', publickey: 'testKey' },
    },
    api_aut: 'admin',
    desc: 'test',
    cret_dt: '2022-04-20 17:44:23',
    upd_dt: '2022-04-20 17:44:23',
    cret_id: 'AUTH_ADMIN',
    upd_id: 'AUTH_ADMIN',
  },
  {
    id: 'Safe2go',
    nm: 'safe2gogogo',
    tkcgr_nm: '박재원',
    tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
    tkcgr_eml: 'parkjaewon@kt.com',
    sla_yn: 'TPS',
    sla_type: 'HOUR',
    sla_cnt: 10,
    svc_st_dt: '2022-04-13 00:00:00',
    svc_end_dt: '9999-12-31 00:00:00',
    athn: {
      BASIC_AUTH: { id: 'admin', pw: '123123' },
      JWT: { alg: [], issuer: '', subject: '', publickey: '' },
    },
    api_aut: 'admin',
    desc: 'test',
    cret_dt: '2022-04-20 17:44:23',
    upd_dt: '2022-04-20 17:44:23',
    cret_id: 'AUTH_ADMIN',
    upd_id: 'AUTH_ADMIN',
  },
];

export const serviceResponse: ServiceResponse = {
  id: 'KT_COM',
  nm: 'KT닷컴',
  tkcgr_nm: '이경민',
  tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
  tkcgr_eml: 'km0403.lee@kt.com',
  sla_yn: 'total',
  sla_type: 'MINITUE',
  sla_cnt: 10,
  svc_st_dt: '2022-04-13 00:00:00',
  svc_end_dt: '9999-12-31 00:00:00',
  athn: {
    BASIC_AUTH: { id: '', pw: '' },
    JWT: { alg: ['A', 'B', 'C'], issuer: '임꺽정', subject: '홍길등', publickey: 'testKey' },
  },
  api_aut: 'admin',
  desc: 'test',
  cret_dt: '2022-04-20 17:44:23',
  upd_dt: '2022-04-20 17:44:23',
  cret_id: 'AUTH_ADMIN',
  upd_id: 'AUTH_ADMIN',
};

export const serviceListData: Data<ServiceResponse[]> = {
  pagination: pagination,
  value: serviceListResponse,
};

export const searchServiceListData: Data<ServiceResponse[]> = {
  pagination: pagination,
  value: searchServiceListResponse,
};

export const serviceData: Data<ServiceResponse> = {
  pagination: pagination,
  value: serviceResponse,
};

export const getServiceInfo: GateWayResponse<ServiceResponse[]> = {
  data: serviceListData,
  status: 0,
};

export const getServiceId: GateWayResponse<ServiceResponse> = {
  data: serviceData,
  status: 0,
};

export const getSearchServiceInfo: GateWayResponse<ServiceResponse[]> = {
  data: searchServiceListData,
  status: 0,
};

export const basicAuthData: Data<BasicAuthResponse> = {
  pagination: pagination,
  value: basicAuthMock,
};

export const getBasicAuth: GateWayResponse<BasicAuthResponse> = {
  data: basicAuthData,
  status: 0,
};

export const duplicatedTrue: duplicatedCheck = {
  isDuplicated: true,
};

export const duplicatedFalse: duplicatedCheck = {
  isDuplicated: false,
};

export const duplicatedTrueData: Data<duplicatedCheck> = {
  pagination: pagination,
  value: duplicatedTrue,
};

export const duplicatedfalseData: Data<duplicatedCheck> = {
  pagination: pagination,
  value: duplicatedFalse,
};

export const getDuplicatedTrue: GateWayResponse<duplicatedCheck> = {
  data: duplicatedTrueData,
  status: 0,
};

export const getDuplicatedFalse: GateWayResponse<duplicatedCheck> = {
  data: duplicatedfalseData,
  status: 0,
};
