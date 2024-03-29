//연동방식
export interface SystemEdptType {
  protocol: string;
  domain: string;
  port: string;
}
export interface SystemIdEdpt {
  id: string;
  edpt: string[];
}

//시스템 관리
export interface SystemResponse {
  id: string; // system id(PK)
  tkcgrNm: string; // 담당자 이름
  tkcgrPos: string; //담당자 소속
  tkcgrEml: string; //담당자 이메일
  edpt: string[]; //엔드포인트
  desc: string; //설명
  cretDt: string;
  cretId: string;
  updDt: string;
  updId: string;
}
//시스템 관리
export interface SystemRegisterResponse {
  id: string; // system id(PK)
  tkcgrNm: string; // 담당자 이름
  tkcgrPos: string; //담당자 소속
  tkcgrEml: string; //담당자 이메일
  edpt: string[]; //엔드포인트
  desc: string; //설명
  cretId: string;
  updId: string;
}
//pagination
export interface PaginationType {
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
        tkcgrNm: '박재원',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'jwpark@kt.com',
        edpt: ['https://capri.com:443', 'https://capri.com:443'],
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
        edpt: ['https://capri.com:443', 'https://capri.com:443'],
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
        edpt: ['https://capri.com:443', 'https://capri.com:443'],
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
        edpt: ['https://capri.com:443', 'https://capri.com:443'],
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
        edpt: ['https://capri.com:443', 'https://capri.com:443'],
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
        edpt: ['https://capri.com:443', 'https://capri.com:443'],
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
      total_elements: 57, //전체 데이터 수
      total_pages: 6, //전체 페이지 수
      current_elements: 10, //현재 페이지 데이터 수
      current_page: 1, //현재 페이지 번호
      order_by: 'ID', //DB 정렬 기준 칼럼
      sort_by: 'DESC', //정렬
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
    pagination: {
      page: 6, //페이지 => 이동하고 싶은 페이지?(라고 추측)
      size: 10, //페이징 처리 수(한 페이지 당 보여줄 데이터 수)
      total_elements: 57, //전체 데이터 수
      total_pages: 6, //전체 페이지 수
      current_elements: 10, //현재 페이지 데이터 수
      current_page: 6, //현재 페이지 번호
      order_by: 'ID', //DB 정렬 기준 칼럼
      sort_by: 'DESC', //정렬
      limit: 10, //DB Limit 사용값
    },
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
      edpt: ['https://capri.com:443', 'http://capri.com:8080'],
      desc: '시스템 KT_COM2 설명입니다.',
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

export const dummySystemIdEdptList = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: [
      {
        id: 'sysid1',
        edpt: ['http://127.0.0.1:8084', 'https://capri.com:8080', 'https://capri.com:8081'],
      },
      {
        id: 'sysid2',
        edpt: ['http://127.0.0.1:7733', 'https://capri.com:7001', 'https://capri.com:8080'],
      },
      {
        id: 'sysid3',
        edpt: ['http://127.0.0.1:8084', 'https://capri.com:8081'],
      },
    ],
  },
};
