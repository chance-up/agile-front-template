//연동방식
export interface SystemInterfaceGroup {
  type: number;
  domain: string;
  port: string;
}

//시스템 관리
export interface SystemResponse {
  id: string; // system id(PK)
  nm: string; // system name
  tkcgr_nm: string; // 담당자 이름
  tkcgr_pos: string; //담당자 소속
  tkcgr_eml: string; //담당자 이메일
  if_grp: IfGrpType; //연동 그룹
  desc: string; //설명
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

interface IfGrpType {
  [group_name: string]: string[];
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
        nm: 'KT닷컴',
        tkcgr_nm: '박재원',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'jwpark@kt.com',
        if_grp: '{ifGrp1:{234},ifGrp2:{4116}}',
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM2',
        nm: 'KT닷컴',
        tkcgr_nm: '최찬섭',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'cschoi@kt.com',
        if_grp: '{ifGrp1:{123},ifGrp2:{456}}',
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM3',
        nm: 'KT닷컴',
        tkcgr_nm: '김형창',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'hckim@kt.com',
        if_grp: '{ifGrp1:{564},ifGrp2:{2333}}',
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM4',
        nm: 'KT닷컴',
        tkcgr_nm: '정혜림',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'hrjeong@kt.com',
        if_grp: '{ifGrp1:{324},ifGrp2:{235}}',
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM5',
        nm: 'KT닷컴',
        tkcgr_nm: '이정필',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Digico 사업수행팀',
        tkcgr_eml: 'jplee@kt.com',
        if_grp: '{ifGrp1:{523},ifGrp2:{2124}}',
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM6',
        nm: 'KT닷컴',
        tkcgr_nm: '이진솔',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Digico 사업수행팀',
        tkcgr_eml: 'jslee@kt.com',
        if_grp: '{ifGrp1:{435},ifGrp2:{6611}}',
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

export const dummySearchData = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: [
      {
        id: 'KT_COM1',
        nm: 'KT닷컴',
        tkcgr_nm: '박재원',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'jwpark@kt.com',
        if_grp: '{ifGrp1:{234},ifGrp2:{4116}}',
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM2',
        nm: 'KT닷컴',
        tkcgr_nm: '최찬섭',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'cschoi@kt.com',
        if_grp: '{ifGrp1:{123},ifGrp2:{456}}',
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM3',
        nm: 'KT닷컴',
        tkcgr_nm: '김형창',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'hckim@kt.com',
        if_grp: '{ifGrp1:{564},ifGrp2:{2333}}',
        desc: 'desc',
        created_at: '2022-04-20 17:44:23',
        created_by: 'updatedByAdmin',
        updated_at: '2022-04-25 09:50:59',
        updated_by: '604ed253-e79e-4aa0-8e18-ef9326df1b95',
      },
      {
        id: 'KT_COM4',
        nm: 'KT닷컴',
        tkcgr_nm: '정혜림',
        tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
        tkcgr_eml: 'hrjeong@kt.com',
        if_grp: '{ifGrp1:{324},ifGrp2:{235}}',
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
      nm: 'KT닷컴',
      tkcgr_nm: '최찬섭',
      tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
      tkcgr_eml: 'cschoi@kt.com',
      if_grp: {
        authentication: ['https://capri.com:443'],
        service: ['http://127.0.0.1:8080', 'http://127.0.0.2:8080'],
      },
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
      nm: 'KT닷컴',
      tkcgr_nm: '이승재',
      tkcgr_pos: 'KTDS 시스템서비스본부 Digico개발센터 Agile Core팀',
      tkcgr_eml: 'sjlee@kt.com',
      if_grp: '{ifGrp1:{111},ifGrp2:{234}}',
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
      if_grp: '{ifGrp1:{123},ifGrp2:{456},ifGrp3:{789}}',
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
