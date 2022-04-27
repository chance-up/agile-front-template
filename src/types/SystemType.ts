//연동방식
export interface IfGrpType {
  if_nm: string;
  if_url: string[];
}

//시스템 관리
export interface SystemResponse {
  id: string; // system id(PK)
  nm: string; // system name
  tkcgr_nm: string; // 담당자 이름
  tkcgr_pos: string; //담당자 소속
  tkcgr_eml: string; //담당자 이메일
  if_grp: IfGrpType[]; //연동 그룹
  desc: string; //설명
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

//pagination
export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
  totalPage: number;
  currentElements: number;
  currentPage: number;
  orderBy: string;
  sortBy: string;
  limit: number;
}

export const dummyListData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: [
      {
        id: 'KT_COM1',
        nm: 'KT닷컴1',
        tkcgr_nm: '박재원',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'jwpark@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM2',
        nm: 'KT닷컴2',
        tkcgr_nm: '최찬섭',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'cschoi@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM3',
        nm: 'KT닷컴3',
        tkcgr_nm: '김형창',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'hckim@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM4',
        nm: 'KT닷컴4',
        tkcgr_nm: '정혜림',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'hrjeong@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM5',
        nm: 'KT닷컴5',
        tkcgr_nm: '이정필',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Digico 사업수행팀',
        tkcgr_eml: 'jplee@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM6',
        nm: 'KT닷컴6',
        tkcgr_nm: '이진솔',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Digico 사업수행팀',
        tkcgr_eml: 'jslee@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
    ],
    pagination: {
      page: 1, //페이지 => 이동하고 싶은 페이지?(라고 추측)
      size: 10, //페이징 처리 수(한 페이지 당 보여줄 데이터 수)
      totalElements: 6, //전체 데이터 수
      totalPage: 1, //전체 페이지 수
      currentElements: 6, //현재 페이지 데이터 수
      currentPage: 1, //현재 페이지 번호
      orderBy: 'order_by', //DB 오름차순, 내림차순
      sortBy: 'DESC', //DB 정렬 기준 칼럼
      limit: 10, //DB Limit 사용값
    },
  },
};

export const dummySearchData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: [
      {
        id: 'KT_COM1',
        nm: 'KT닷컴2',
        tkcgr_nm: '박재원',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'jwpark@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM2',
        nm: 'KT닷컴2',
        tkcgr_nm: '최찬섭',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'cschoi@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM3',
        nm: 'KT닷컴3',
        tkcgr_nm: '김형창',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'hckim@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM4',
        nm: 'KT닷컴4',
        tkcgr_nm: '정혜림',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'hrjeong@kt.com',
        if_grp: [
          {
            if_nm: 'authentication',
            if_url: ['https://capri.com:443', 'https://capri.com:443'],
          },
          {
            if_nm: 'service',
            if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
          },
        ],
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
    ],
    pagination: null,
  },
};

export const dummyDetailData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: {
      id: 'KT_COM2',
      nm: 'KT닷컴2',
      tkcgr_nm: '최찬섭',
      tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
      tkcgr_eml: 'cschoi@kt.com',
      if_grp: [
        {
          if_nm: 'authentication',
          if_url: ['https://capri.com:443', 'https://capri.com:443'],
        },
        {
          if_nm: 'service',
          if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
        },
      ],
      desc: 'desc',
      created_at: '2022-04-20 17:44:23',
      created_by: 'updatedByAdmin',
      updated_at: '2022-04-25 09:50:59',
      updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
    },
    pagination: null,
  },
};

export const dummyRegisterData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: {
      id: 'KT_COM7',
      nm: 'KT닷컴7',
      tkcgr_nm: '이승재',
      tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
      tkcgr_eml: 'sjlee@kt.com',
      if_grp: [
        {
          if_nm: 'authentication',
          if_url: ['https://capri.com:443', 'https://capri.com:443'],
        },
        {
          if_nm: 'service',
          if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
        },
      ],
      desc: 'desc',
      created_at: '2022-04-25 09:54:21',
      created_by: '9a42a772-3d2c-4332-b749-f616b3886c40',
      updated_at: '2022-04-20 17:44:23',
      updated_by: 'updatedByAdmin',
    },
    pagination: null,
  },
};

export const dummyUpdateData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: {
      id: 'KT_COM2',
      nm: 'KT닷컴2',
      tkcgr_nm: '최찬섭2',
      tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
      tkcgr_eml: 'cschoi@kt.com',
      if_grp: [
        {
          if_nm: 'authentication',
          if_url: ['https://capri.com:443', 'https://capri.com:443'],
        },
        {
          if_nm: 'service',
          if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
        },
      ],
      desc: 'desc',
      created_at: '2022-04-25 09:53:02',
      created_by: 'c2276636-b220-4b50-9a72-1c06cb20ae1c',
      updated_at: '2022-04-25 10:07:22',
      updated_by: 'b2538f70-78ed-41ad-b522-05c5a13d3c23',
    },
    pagination: null,
  },
};

export const dummyDeleteData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: null,
};

export const dummyTestData1 = {
  if_grp: {
    authentication: ['https://capri.com:443'],
    service: ['http://127.0.0.1:8080', 'http://127.0.0.2:8080'],
    // ...
  },
};
export const dummyTestData2 = {
  if_grp: [
    {
      if_nm: 'authentication',
      if_url: ['https://capri.com:443', 'https://capri.com:443'],
    },
    {
      if_nm: 'service',
      if_url: ['https://capri.com:443', 'https://capri.com:8080', 'https://capri.com:8081'],
    },
    // ...
  ],
};
