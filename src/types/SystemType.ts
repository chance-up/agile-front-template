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
  if_grp: string; //연동 그룹
  desc: string; //설명
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export const dummyData = {
  common: {
    code: '200',
    message: '정상처리되었습니다.',
  },
  data: {
    value: {
      id: 'id3',
      nm: 'nm3',
      tkcgr_nm: 'tkcgrNm3',
      tkcgr_pos: 'tkcgrPos3',
      tkcgr_eml: 'tkcgrEml3',
      if_grp: 'ifGrp3',
      desc: 'desc3',
      created_at: '2022-04-20 17:44:23',
      created_by: 'createdByTest',
      updated_at: '2022-04-20 17:44:23',
      updated_by: 'updatedByTest',
    },
    pagination: null,
  },
};
