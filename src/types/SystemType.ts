//연동방식
export interface SystemInterfaceGroup {
  type: number;
  domain: string;
  port: string;
}

//시스템 관리 상세 정보
export interface SystemResponse {
  id: string; // system id(PK)
  nm: string; // system name
  tkcgrNm: string; // 담당자 이름
  tkcgrPos: string; //담당자 소속
  tkcgrEml: string; //담당자 이메일
  ifGrp: string; //연동 그룹
  desc: string; //설명
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
