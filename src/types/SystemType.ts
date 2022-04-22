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
