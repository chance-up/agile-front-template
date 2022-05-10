import { GateWayResponse, Pagination } from './GateWayResponse';

export const dummyPagination: Pagination = {
  page: 1,
  size: 10,
  total_elements: 13,
  total_pages: 2,
  current_elements: 10,
  current_page: 1,
  order_by: 'ID',
  sort_by: 'DESC',
  limit: 10,
};
export interface ApiDetailResponse {
  id: string;
  sysId: string;
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
  id: string;
  sysId: string;
  meth: string[] | string;
  uriIn: string;
  uriOut: string;
  reqHandlrGrpId: string;
  resHandlrGrpId: string;
  timeOut: number;
  desc: string | null;
}

export interface RequsetPagenation {
  page?: number;
  size?: number;
  total_elements?: number;
  total_pages?: number;
  current_elements?: number;
  current_page?: number;
  order_by?: string;
  sort_by?: string;
  limit?: number;
}
export interface ApiSearchQuery extends RequsetPagenation {
  id?: string;
  nm?: string;
  uri?: string;
}

export interface ApiSearchLabel {
  [key: string]: string;
}

export const apiMockData: ApiDetailResponse = {
  id: 'getCustInfo11',
  sysId: 'id1',
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

export const apiMockList: GateWayResponse<ApiDetailResponse[]> = {
  status: 200,
  data: {
    pagination: dummyPagination,
    value: [
      apiMockData,
      apiMockData2,
      apiMockData,
      apiMockData2,
      apiMockData,
      apiMockData2,
      apiMockData,
      apiMockData2,
      apiMockData,
      apiMockData2,
      apiMockData,
      apiMockData2,
      apiMockData,
    ],
  },
};

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

export const dummyHandlerGroupList: HandlerGroupDetail[] = [
  {
    apiGroupId: 1,
    // apiGroupNm: 'API & Login Authentication Group Name',
    apiGroupNm: 'api group name 1',
    apiGroupDesc: 'api group name 1 의 Desc',
    apiIdList: [
      {
        apiId: 1,
        apiNm: 'api group name 1 의 api name 1',
        apiDesc: 'api group name 1 의 api name 1 의 Desc',
      },
      {
        apiId: 2,
        apiNm: 'api group name 1 의 api name 2',
        apiDesc: 'api group name 1 의 api name 2 의 Desc',
      },
      {
        apiId: 3,
        apiNm: 'api group name 1 의 api name 3',
        apiDesc: 'api group name 1 의 api name 3 의 Desc',
      },
      {
        apiId: 4,
        apiNm: 'api group name 1 의 api name 4',
        apiDesc: 'api group name 1 의 api name 4 의 Desc',
      },
    ],
  },
  {
    apiGroupId: 2,
    // apiGroupNm: 'API & Login Authentication Group Name',
    apiGroupNm: 'api group name 2',
    apiGroupDesc: 'api group name 2 의 Desc',
    apiIdList: [
      {
        apiId: 1,
        apiNm: 'api group name 2 의 api name 1',
        apiDesc: 'api group name 2 의 api name 1 의 Desc',
      },
      {
        apiId: 2,
        apiNm: 'api group name 2 의 api name 2',
        apiDesc: 'api group name 2 의 api name 2 의 Desc',
      },
      {
        apiId: 3,
        apiNm: 'api group name 2 의 api name 3',
        apiDesc: 'api group name 2 의 api name 3 의 Desc',
      },
      {
        apiId: 4,
        apiNm: 'api group name 2 의 api name 4',
        apiDesc: 'api group name 2 의 api name 4 의 Desc',
      },
    ],
  },
];

export const dummyResHandlerGroupList: HandlerGroupDetail[] = [
  {
    apiGroupId: 1,
    // apiGroupNm: 'API & Login Authentication Group Name',
    apiGroupNm: 'Res api group name 1',
    apiGroupDesc: 'Res api group name 1 의 Desc',
    apiIdList: [
      {
        apiId: 1,
        apiNm: 'Res api group name 1 의 api name 1',
        apiDesc: 'Res api group name 1 의 api name 1 의 Desc',
      },
      {
        apiId: 2,
        apiNm: 'Res api group name 1 의 api name 2',
        apiDesc: 'Res api group name 1 의 api name 2 의 Desc',
      },
      {
        apiId: 3,
        apiNm: 'Res api group name 1 의 api name 3',
        apiDesc: 'Res api group name 1 의 api name 3 의 Desc',
      },
      {
        apiId: 4,
        apiNm: 'Res api group name 1 의 api name 4',
        apiDesc: 'Res api group name 1 의 api name 4 의 Desc',
      },
    ],
  },
  {
    apiGroupId: 2,
    // apiGroupNm: 'API & Login Authentication Group Name',
    apiGroupNm: 'Res api group name 2',
    apiGroupDesc: 'Res api group name 2 의 Desc',
    apiIdList: [
      {
        apiId: 1,
        apiNm: 'Res api group name 2 의 api name 1',
        apiDesc: 'Res api group name 2 의 api name 1 의 Desc',
      },
      {
        apiId: 2,
        apiNm: 'Res api group name 2 의 api name 2',
        apiDesc: 'Res api group name 2 의 api name 2 의 Desc',
      },
      {
        apiId: 3,
        apiNm: 'Res api group name 2 의 api name 3',
        apiDesc: 'Res api group name 2 의 api name 3 의 Desc',
      },
      {
        apiId: 4,
        apiNm: 'Res api group name 2 의 api name 4',
        apiDesc: 'Res api group name 2 의 api name 4 의 Desc',
      },
    ],
  },
];

export const dummyPaginationSetting: Pagination = {
  page: 1,
  size: 10,
  total_elements: 13,
  total_pages: 2,
  current_elements: 10,
  current_page: 1,
  order_by: 'ID',
  sort_by: 'DESC',
  limit: 10,
};

export interface HandlerDetail {
  apiId: number | string;
  apiNm: string;
  apiDesc: string;
}
export interface HandlerGroupDetail {
  apiGroupId: number | string;
  apiGroupNm: string;
  apiGroupDesc: string;
  apiIdList: HandlerDetail[];
}

// delete
export const dummyDeleteResData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: null,
};

export interface ApiInfoEdit2 {
  id: string;
  sysId: string;
  ifNo: string;
  meth: string[];
  uriIn: string;
  uriOut: string;
  reqHndlrGrpId: string;
  resHndlrGrpId: string;
  timeOut: number;
  desc: string;
  cretId: string;
}
export const dummyApiInfoEdit: ApiInfoEdit2 = {
  id: 'getApiInfo',
  sysId: 'id2',
  ifNo: 'CAPRI-0200',
  meth: ['GET', 'POST', 'PUT', 'DELETE'],
  uriIn: '/CAPRI/v1/getApiInfo',
  uriOut: '/CAPRI/v1/getApiInfo',
  reqHndlrGrpId: 'REQ.DEFAULT',
  resHndlrGrpId: 'RES.DEFAULT',
  timeOut: 3000,
  desc: 'kt 가입자 고객 정보 제공',
  cretId: 'ktds',
};
