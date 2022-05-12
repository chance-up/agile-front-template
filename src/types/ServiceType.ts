import { Data, GateWayResponse, Pagination } from './GateWayResponse';

export interface ApiAuthResponse {
  sysId: string;
  apiId: string[];
}

interface AuthResponse {
  basic: BasicAuthDetail;
  jwt: JWTDetail;
}
interface BasicAuthDetail {
  id: string | null;
  pw: string | null;
}

interface JWTDetail {
  alg: string | null;
  iss: string | null;
  aud: string | null;
  pubKey: string | null;
}
export interface ServiceResponse {
  id: string;
  nm: string;
  tkcgrNm: string;
  tkcgrPos: string;
  tkcgrEml: string;
  sla: { sec: number | null; min: number | null; hr: number | null; day: number | null; mon: number | null };
  svcStDt: string;
  svcEndDt: string;
  athn: AuthResponse;
  athnType: string;
  apiAut: ApiAuthResponse[];
  desc: string;
  cretDt: string;
  updDt: string;
  cretId: string;
  updId: string;
}
export interface BasicAuthResponse {
  id: string | null;
  pw: string | null;
}

export interface duplicatedCheck {
  isDuplicated: boolean;
}

export interface JWTAlgResponse {
  alg: string[];
}

export const JWtAlgMock: JWTAlgResponse = {
  alg: ['ABC111', 'DEF222', 'GHI333'],
};

export const basicAuthMock: BasicAuthResponse = {
  id: 'AKSJaiohfasdAS7asD',
  pw: 'KL8SsS1KKsdJKASH9',
};

export interface ServiceRegisterRequest {
  id: string;
  nm: string;
  tkcgrNm: string;
  tkcgrPos: string;
  tkcgrEml: string;
  sla: { sec: number | null; min: number | null; hr: number | null; day: number | null; mon: number | null };
  svcStDt: string;
  svcEndDt: string;
  athn: AuthResponse;
  athnType: string;
  apiAut: ApiAuthResponse[];
  desc: string;
}

// export const pagination: Pagination = {
//   page: 1,
//   size: 10,
//   total_elements: 57,
//   total_pages: 6,
//   current_elements: 10,
//   current_page: 1,
//   order_by: 'ID',
//   sort_by: 'DESC',
//   limit: 10,
// };

// export const searchServiceListResponse: ServiceResponse[] = [
//   {
//     id: 'KT_COM',
//     nm: 'KT닷컴',
//     tkcgrNm: '이경민',
//     tkcgrPos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
//     tkcgrEml: 'km0403.lee@kt.com',
//     sla: { sec: 10, min: null, hr: 30000, day: null, mon: null },
//     svcStDt: '2022-04-13 00:00:00',
//     svcEndDt: '9999-12-31 00:00:00',
//     athn: {
//       basic: { id: '', pw: '' },
//       jwt: { alg: 'ABC216', iss: '임꺽정', aud: '홍길등', pubKey: 'testKey' },
//     },
//     athnType: 'jwt',
//     apiAut: [
//       { sysId: 'SYSTEM_A', apiId: ['API_1', 'API_2'] },
//       { sysId: 'SYSTEM_C', apiId: ['API_5', 'API_6'] },
//     ],
//     desc: 'test',
//     cretDt: '2022-04-20 17:44:23',
//     updDt: '2022-04-20 17:44:23',
//     cretId: 'AUTH_ADMIN',
//     updId: 'AUTH_ADMIN',
//   },
//   {
//     id: 'Safe2go',
//     nm: 'safe2gogogo',
//     tkcgrNm: '박재원',
//     tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
//     tkcgr_eml: 'parkjaewon@kt.com',
//     sla: { sec: null, min: null, hr: null, day: 951013, mon: null },
//     svc_st_dt: '2022-04-13 00:00:00',
//     svc_end_dt: '9999-12-31 00:00:00',
//     athn: {
//       basic: { id: 'admin', pw: '123123' },
//       jwt: { alg: '', iss: '', aud: '', pubKey: '' },
//     },
//     athnType: 'JWT',
//     apiAut: [
//       { sysId: 'SYSTEM_A', apiId: ['API_1', 'API_2'] },
//       { sysId: 'SYSTEM_C', apiId: ['API_5', 'API_6'] },
//     ],
//     desc: 'test',
//     cret_dt: '2022-04-20 17:44:23',
//     upd_dt: '2022-04-20 17:44:23',
//     cret_id: 'AUTH_ADMIN',
//     upd_id: 'AUTH_ADMIN',
//   },
//   {
//     id: 'chanceUp',
//     nm: 'chanceUpService',
//     tkcgr_nm: '최찬섭',
//     tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
//     tkcgr_eml: 'chanceUp@kt.com',
//     sla: { sec: null, min: null, hr: null, day: null, mon: null },
//     svc_st_dt: '2022-04-13 00:00:00',
//     svc_end_dt: '9999-12-31 00:00:00',
//     athn: {
//       basic: { id: 'admin', pw: '123123' },
//       jwt: { alg: '', iss: '', aud: '', pubKey: '' },
//     },
//     athnType: 'jwt',
//     apiAut: [
//       { sysId: 'SYSTEM_A', apiId: ['API_1', 'API_2'] },
//       { sysId: 'SYSTEM_C', apiId: ['API_5', 'API_6'] },
//     ],
//     desc: 'test',
//     cret_dt: '2022-04-20 17:44:23',
//     upd_dt: '2022-04-20 17:44:23',
//     cret_id: 'AUTH_ADMIN',
//     upd_id: 'AUTH_ADMIN',
//   },
// ];

// export const serviceListResponse: ServiceResponse[] = [
//   {
//     id: 'KT_COM',
//     nm: 'KT닷컴',
//     tkcgr_nm: '이경민',
//     tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
//     tkcgr_eml: 'km0403.lee@kt.com',
//     sla: { sec: null, min: 25, hr: null, day: 15000, mon: null },
//     svc_st_dt: '2022-04-13 00:00:00',
//     svc_end_dt: '9999-12-31 00:00:00',
//     athn: {
//       basic: { id: '', pw: '' },
//       jwt: { alg: 'ABC216', iss: '임꺽정', aud: '홍길등', pubKey: 'testKey' },
//     },
//     athnType: 'jwt',
//     apiAut: [
//       { sysId: 'SYSTEM_A', apiId: ['API_1', 'API_2'] },
//       { sysId: 'SYSTEM_C', apiId: ['API_5', 'API_6'] },
//     ],
//     desc: 'test',
//     cret_dt: '2022-04-20 17:44:23',
//     upd_dt: '2022-04-20 17:44:23',
//     cret_id: 'AUTH_ADMIN',
//     upd_id: 'AUTH_ADMIN',
//   },
//   {
//     id: 'Safe2go',
//     nm: 'safe2gogogo',
//     tkcgr_nm: '박재원',
//     tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
//     tkcgr_eml: 'parkjaewon@kt.com',
//     sla: { sec: 5, min: null, hr: 15000, day: null, mon: null },
//     svc_st_dt: '2022-04-13 00:00:00',
//     svc_end_dt: '9999-12-31 00:00:00',
//     athn: {
//       basic: { id: 'admin', pw: '123123' },
//       jwt: { alg: '', iss: '', aud: '', pubKey: '' },
//     },
//     athnType: 'jwt',
//     apiAut: [
//       { sysId: 'SYSTEM_A', apiId: ['API_1', 'API_2'] },
//       { sysId: 'SYSTEM_C', apiId: ['API_5', 'API_6'] },
//     ],
//     desc: 'test',
//     cret_dt: '2022-04-20 17:44:23',
//     upd_dt: '2022-04-20 17:44:23',
//     cret_id: 'AUTH_ADMIN',
//     upd_id: 'AUTH_ADMIN',
//   },
// ];

// export const serviceResponse: ServiceResponse = {
//   id: 'KT_COM',
//   nm: 'KT닷컴',
//   tkcgr_nm: '이경민',
//   tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
//   tkcgr_eml: 'km0403.lee@kt.com',
//   sla: { sec: 10, min: null, hr: 45000, day: null, mon: null },
//   svc_st_dt: '2022-04-13 00:00:00',
//   svc_end_dt: '9999-12-31 00:00:00',
//   athn: {
//     basic: { id: '', pw: '' },
//     jwt: { alg: 'ABC111', iss: '임꺽정', aud: '홍길등', pubKey: 'testKey' },
//   },
//   athnType: 'jwt',
//   apiAut: [
//     { sysId: 'SYSTEM_A', apiId: ['API_1', 'API_2'] },
//     { sysId: 'SYSTEM_C', apiId: ['API_5', 'API_6'] },
//   ],
//   desc: 'test',
//   cret_dt: '2022-04-20 17:44:23',
//   upd_dt: '2022-04-20 17:44:23',
//   cret_id: 'AUTH_ADMIN',
//   upd_id: 'AUTH_ADMIN',
// };

// export const serviceListData: Data<ServiceResponse[]> = {
//   pagination: pagination,
//   value: serviceListResponse,
// };

// export const searchServiceListData: Data<ServiceResponse[]> = {
//   pagination: pagination,
//   value: searchServiceListResponse,
// };

// export const serviceData: Data<ServiceResponse> = {
//   pagination: pagination,
//   value: serviceResponse,
// };

// export const getServiceInfo: GateWayResponse<ServiceResponse[]> = {
//   data: serviceListData,
//   status: 0,
// };

// export const getServiceId: GateWayResponse<ServiceResponse> = {
//   data: serviceData,
//   status: 0,
// };

// export const getSearchServiceInfo: GateWayResponse<ServiceResponse[]> = {
//   data: searchServiceListData,
//   status: 0,
// };

// export const basicAuthData: Data<BasicAuthResponse> = {
//   pagination: pagination,
//   value: basicAuthMock,
// };

// export const getBasicAuth: GateWayResponse<BasicAuthResponse> = {
//   data: basicAuthData,
//   status: 0,
// };

// export const duplicatedTrue: duplicatedCheck = {
//   isDuplicated: true,
// };

// export const duplicatedFalse: duplicatedCheck = {
//   isDuplicated: false,
// };

// export const duplicatedTrueData: Data<duplicatedCheck> = {
//   pagination: pagination,
//   value: duplicatedTrue,
// };

// export const duplicatedfalseData: Data<duplicatedCheck> = {
//   pagination: pagination,
//   value: duplicatedFalse,
// };

// export const getDuplicatedTrue: GateWayResponse<duplicatedCheck> = {
//   data: duplicatedTrueData,
//   status: 0,
// };

// export const getDuplicatedFalse: GateWayResponse<duplicatedCheck> = {
//   data: duplicatedfalseData,
//   status: 0,
// };

// export const JWTAlgData: Data<JWTAlgResponse> = {
//   pagination: pagination,
//   value: JWtAlgMock,
// };

// export const getJWTAlg: GateWayResponse<JWTAlgResponse> = {
//   data: JWTAlgData,
//   status: 0,
// };

// export const ApiAuthListMock: ApiAuthResponse[] = [
//   { sysId: 'SYSTEM_A', apiId: ['API_1', 'API_2', 'API_112', 'API_4'] },
//   { sysId: 'SYSTEM_B', apiId: ['API_11', 'API_3', 'API_5'] },
//   { sysId: 'SYSTEM_C', apiId: ['API_12', 'API_4', 'API_55'] },
//   { sysId: 'SYSTEM_D', apiId: ['API_111', 'API_2'] },
// ];

// export const ApiAuthListData: Data<ApiAuthResponse[]> = {
//   pagination: pagination,
//   value: ApiAuthListMock,
// };

// export const getApiAuthList: GateWayResponse<ApiAuthResponse[]> = {
//   data: ApiAuthListData,
//   status: 0,
// };
