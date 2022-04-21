export interface SystemLinkType {
  type: number;
  domain: string;
  port: string;
}

//시스템 관리 상세 정보
export interface DummySystemResponse {
  id: string; // system id(PK)
  nm: string; // system name
  tkcgrNm: string; // 담당자 이름
  tkcgrPos: string; //담당자 소속
  tkcgrEml: string; //담당자 이메일
  ifGrp: SystemLinkType[]; //연동 그룹
  desc: string; //설명
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

//시스템 리스트 조회
export interface DummySystemListResponse {
  id: string; // system id(PK)
  nm: string; // system name
  tkcgrNm: string; // 담당자 이름
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export const dummyData: DummySystemResponse = {
  id: '0001',
  nm: '시스템 이름 1',
  tkcgrNm: '담당자이름1',
  tkcgrPos: '소속1',
  tkcgrEml: '이메일1',
  ifGrp: [
    { type: 0, domain: 'domain1', port: 'port1' },
    { type: 1, domain: 'domain2', port: 'port2' },
    { type: 0, domain: 'domain3', port: 'port3' },
    { type: 1, domain: 'domain4', port: 'port4' },
  ],
  desc: '서비스설명1',
  createdAt: '2022-04-21',
  createdBy: '관리자1',
  updatedAt: '2022-04-23',
  updatedBy: '사용자1',
};
