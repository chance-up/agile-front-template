export interface SystemLinkType {
  type: number;
  domain: string;
  port: string;
}
export interface DummySystemResponse {
  sysNm: string;
  sysId: string;
  mgrNm: string;
  belong: string;
  eMail: string;
  linkType: SystemLinkType[];
  sysDescription: string;
}

export const dummyData: DummySystemResponse = {
  sysNm: '시스템 이름 1',
  sysId: '시스템아이디1',
  mgrNm: '담당자이름1',
  belong: '소속1',
  eMail: '이메일1',
  linkType: [
    { type: 0, domain: 'domain1', port: 'port1' },
    { type: 1, domain: 'domain2', port: 'port2' },
    { type: 0, domain: 'domain3', port: 'port3' },
    { type: 1, domain: 'domain4', port: 'port4' },
  ],
  sysDescription: '서비스설명1',
};
