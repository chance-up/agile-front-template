import { GateWayResponse, Pagination } from './GateWayResponse';

export const dummyPagination: Pagination = {
  page: 1,
  size: 10,
  totalElements: 13,
  totalPage: 2,
  currentElements: 10,
  currentPage: 1,
  orderBy: 'ID',
  sortBy: 'DESC',
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
  reqHndlrGrpId: string;
  resHndlrGrpId: string;
  timeOut: number;
  desc: string | null;
  cretDt: string | null;
  cretId: string | null;
  updDt: string | null;
  updId: string | null;
}
// [x:string ] => confirm 출력용으로 사용
export interface ApiCreateRequestBody {
  [x: string]: any;
  id: string;
  sysId: string;
  meth: string[] | string;
  uriIn: string;
  uriOut: string;
  reqHndlrGrpId: string;
  resHndlrGrpId: string;
  timeOut: number;
  desc: string | null;
}

export interface ApiUpdateRequestBody {
  id: string;
  sysId: string;
  ifNo: string;
  meth: string[] | string;
  uriIn: string;
  uriOut: string;
  reqHndlrGrpId: string;
  resHndlrGrpId: string;
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

export interface ResponseApiIdValidCheck {
  isPkDuplicated: boolean;
}

export const apiMockData: GateWayResponse<ApiDetailResponse> = {
  status: 200,
  data: {
    pagination: undefined,
    value: {
      id: 'getCustInfo11',
      sysId: 'id1',
      ifNo: 'IF_CAPRI_000122',
      meth: ['GET', 'POST'],
      uriIn: '/CAPRI/v1/getCustInfo22',
      uriOut: '/CAPRI/v1/getCustInfo22',
      ifGrp: 'authentication',
      reqHndlrGrpId: 'REQ.DEFAULT',
      resHndlrGrpId: 'RES.DEFAULT',
      timeOut: 3000,
      desc: 'kt 가입자 고객 정보 제공',
      cretDt: '2022-04-22 11:23:35',
      cretId: 'ktds',
      updDt: '2022-04-22 11:23:35',
      updId: null,
    },
  },
};

export const apiMockData2: GateWayResponse<ApiDetailResponse> = {
  status: 200,
  data: {
    pagination: undefined,
    value: {
      id: 'getCustInfo22',
      sysId: 'id2',
      ifNo: 'IF_CAPRI_000122',
      meth: '["DELETE", "PUT"]',
      uriIn: '/CAPRI/v1/getCustInfo22',
      uriOut: '/CAPRI/v1/getCustInfo22',
      ifGrp: 'service',
      reqHndlrGrpId: 'REQ.DEFAULT',
      resHndlrGrpId: 'RES.DEFAULT',
      timeOut: 5000,
      desc: 'kt 가입자 고객 정보 삭제',
      cretDt: '2022-04-22 11:23:35',
      cretId: 'ktds',
      updDt: '2022-04-22 11:23:35',
      updId: null,
    },
  },
};

export const apiMockList: GateWayResponse<ApiDetailResponse[]> = {
  status: 200,
  data: {
    pagination: dummyPagination,
    value: [apiMockData.data.value, apiMockData2.data.value],
  },
};

// export const dummyPaginationSetting: Pagination = {
//   page: 1,
//   size: 10,
//   total_elements: 13,
//   total_pages: 2,
//   current_elements: 10,
//   current_page: 1,
//   order_by: 'ID',
//   sort_by: 'DESC',
//   limit: 10,
// };

// delete
export const dummyDeleteResData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: null,
};

export const dummyApiIdValidCheck: GateWayResponse<ResponseApiIdValidCheck> = {
  status: 200,
  data: {
    value: {
      isPkDuplicated: true,
    },
    pagination: undefined,
  },
};
