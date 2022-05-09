// import { GateWayResponse, Pagination } from './GateWayResponse';

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
export const dummyReqHandlerGroupList: HandlerGroupDetail[] = [
  {
    apiGroupId: 1,
    // apiGroupNm: 'API & Login Authentication Group Name',
    apiGroupNm: 'Req api group name 1',
    apiGroupDesc: 'Req api group name 1 의 Desc',
    apiIdList: [
      {
        apiId: 1,
        apiNm: 'Req api group name 1 의 api name 1',
        apiDesc: 'Req api group name 1 의 api name 1 의 Desc',
      },
      {
        apiId: 2,
        apiNm: 'Req api group name 1 의 api name 2',
        apiDesc: 'Req api group name 1 의 api name 2 의 Desc',
      },
      {
        apiId: 3,
        apiNm: 'Req api group name 1 의 api name 3',
        apiDesc: 'Req api group name 1 의 api name 3 의 Desc',
      },
      {
        apiId: 4,
        apiNm: 'Req api group name 1 의 api name 4',
        apiDesc: 'Req api group name 1 의 api name 4 의 Desc',
      },
    ],
  },
  {
    apiGroupId: 2,
    // apiGroupNm: 'API & Login Authentication Group Name',
    apiGroupNm: 'Req api group name 2',
    apiGroupDesc: 'Req api group name 2 의 Desc',
    apiIdList: [
      {
        apiId: 1,
        apiNm: 'Req api group name 2 의 api name 1',
        apiDesc: 'Req api group name 2 의 api name 1 의 Desc',
      },
      {
        apiId: 2,
        apiNm: 'Req api group name 2 의 api name 2',
        apiDesc: 'Req api group name 2 의 api name 2 의 Desc',
      },
      {
        apiId: 3,
        apiNm: 'Req api group name 2 의 api name 3',
        apiDesc: 'Req api group name 2 의 api name 3 의 Desc',
      },
      {
        apiId: 4,
        apiNm: 'Req api group name 2 의 api name 4',
        apiDesc: 'Req api group name 2 의 api name 4 의 Desc',
      },
    ],
  },
];

export const dummyResHandlerGroupList: HandlerGroupDetail[] = [
  {
    apiGroupId: 11,
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
    apiGroupId: 22,
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
