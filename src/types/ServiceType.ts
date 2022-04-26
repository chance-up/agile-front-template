import { Data, GateWayResponse, Pagination } from './GateWayResponse';

export interface ServiceResponse {
  id: string;
  nm: string;
  tkcgr_nm: string;
  tkcgr_pos: string;
  tkcgr_eml: string;
  sla_type: string;
  sla_cnt: number;
  svc_st_dt: string;
  svc_end_dt: string;
  athn: string;
  api_aut: string;
  desc: string;
  cret_dt: string;
  upd_dt: string;
  cret_id: string;
  upd_id: string;
}

export interface ServiceRegisterRequest {
  id: string;
  nm: string;
  tkcgr_nm: string;
  tkcgr_pos: string;
  tkcgr_eml: string;
  sla_type: string;
  sla_cnt: number;
  svc_st_dt: string;
  svc_end_dt: string;
  athn: string;
  api_aut: string;
  desc: string;
}

export const pagination: Pagination = {
  page: 1,
  size: 1,
  total_elements: 1,
  total_pages: 1,
  current_elements: 1,
  current_page: 1,
  order_by: '',
  sort_by: '',
  limit: 1,
};

export const serviceListResponse: ServiceResponse[] = [
  {
    id: 'KT_COM',
    nm: 'KT닷컴',
    tkcgr_nm: '이경민',
    tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
    tkcgr_eml: 'km0403.lee@kt.com',
    sla_type: 'SECOND',
    sla_cnt: 10,
    svc_st_dt: '2022-04-13 00:00:00',
    svc_end_dt: '9999-12-31 00:00:00',
    athn: 'aasdasdasd',
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
    sla_type: 'SECOND',
    sla_cnt: 10,
    svc_st_dt: '2022-04-13 00:00:00',
    svc_end_dt: '9999-12-31 00:00:00',
    athn: 'zxczxczxc',
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
  sla_type: 'SECOND',
  sla_cnt: 10,
  svc_st_dt: '2022-04-13 00:00:00',
  svc_end_dt: '9999-12-31 00:00:00',
  athn: 'aasdasdasd',
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
