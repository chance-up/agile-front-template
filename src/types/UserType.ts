export interface UserResponse {
  id: string; // id
  pwd: string; // 비밀번호
  pwdConfirm?: string; // 비밀번호 확인
  nm: string; // 이름
  pos: string; // 소속
  eml: string; // 이메일
  tel: string; // 전화번호
  sttus: string; // 상태
  autId: string; // 권한 id
  stpltId: string; // 약관 id
  stpltAgreeDt: string; //약관 동의 일시
  lastLoginDt: string; // 마지막 로그인 일시
  lastLoginFailDt: string; // 마지막 로그인 실패 일시
  loginFailCnt: number; // 로그인 실패 건수
  cretDt: string; // 생성 일자
  updDt: string; // 갱신 일자
  cretId: string; // 생성 id
  updId: string; // 갱신 id
}

// 사용자 권한
export interface UserAuth {
  [menu: string]: AuthDtl;
}

// 사용자 권한 상세
export interface AuthDtl {
  isShow: boolean; // 노출 여부
  action?: AuthAction; // CRUD 접근 권한 정보
}

// 사용자 접근 권한
export interface AuthAction {
  isView?: boolean; //조회 권한 여부
  isEdit?: boolean; //수정 권한 여부
  isDelete?: boolean; //삭제 권한 여부
}

// 로그인 성공 시 사용자 정보
export interface LoginUserResponse {
  userInfo: UserResponse; // 사용자 정보
  session: string; // 세션
  autDtl: UserAuth; // 사용자 권한
}

export interface StipulationResponse {
  id: string; // id
  stpltType: string; // 약관 유형
  stpltSbst: string[]; // 약관 내용
  cretDt: string; // 생성 일자
  updDt: string; // 갱신 일자
  cretId: string; // 생성 id
  updId: string; // 갱신 id
}

// mock data
export const userLogin = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: {
      userInfo: {
        id: 'hyerim488',
        pwd: 'asdf1234!H',
        pwdConfirm: 'asdf1234!H',
        nm: '정혜림',
        pos: 'Agile Core팀',
        eml: 'ktds.admin22@kt.com',
        tel: '01098765432',
        sttus: 'NRML',
        autId: 'AUth_OP',
        stpltId: '',
        stpltAgreeDt: '2022-05-11 14:46:44',
        lastLoginDt: '2022-05-11 14:46:44',
        lastLoginFailDt: '2022-04-13 09:01:25',
        loginFailCnt: 0,
        cretDt: '2022-05-11 14:50:44',
        updDt: '2022-05-11 14:50:44',
        cretId: 'hyerim488',
        updId: 'hyerim488',
      },
      session: 'SESSION_TOKEN',
      autDtl: {
        sysMngt: {
          isShow: false,
        },
        apiMngt: {
          isShow: true,
          action: {
            isView: true,
            isEdit: false,
          },
        },
        serviveMngt: {
          isShow: true,
          action: {
            isView: true,
            isEdit: true,
            isDelete: true,
          },
        },
      },
    },
  },
  pagination: null,
};

export const userLogout = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: null,
  pagination: null,
};

export const userDetailInfo = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: {
      id: 'syugi443',
      pwd: 'asdf1234!H',
      pwdConfirm: 'asdf1234!H',
      nm: '유시혁',
      pos: 'Agile Core팀',
      eml: 'ktds.admin@kt.com',
      tel: '01012345678',
      sttus: 'NRML',
      autId: 'AUth_OP',
      stpltId: '',
      stpltAgreeDt: '2022-04-13 09:01:25',
      lastLoginDt: '2022-04-13 09:01:25',
      lastLoginFailDt: '2022-04-13 09:01:25',
      loginFailCnt: 0,
      cretDt: '2022-04-13 15:39:01.222',
      updDt: '2022-04-13 15:39:01.222',
      cretId: 'syugi',
      updId: 'syugi',
    },
    pagination: null,
  },
};

export const userEditInfo = {
  common: {
    code: '200',
    message: 'Success',
  },
  data: {
    value: {
      id: 'hyerim488',
      pwd: 'asdf1234!H',
      pwdConfirm: 'asdf1234!H',
      nm: '정혜림',
      pos: 'Agile Core팀',
      eml: 'ktds.admin22@kt.com',
      tel: '01098765432',
      sttus: 'NRML',
      autId: 'AUth_OP',
      stpltId: '',
      stpltAgreeDt: '2022-05-11 14:46:44',
      lastLoginDt: '2022-05-11 14:46:44',
      lastLoginFailDt: '2022-04-13 09:01:25',
      loginFailCnt: 0,
      cretDt: '2022-05-11 14:50:44',
      updDt: '2022-05-11 14:50:44',
      cretId: 'hyerim488',
      updId: 'hyerim488',
    },
    pagination: null,
  },
};
