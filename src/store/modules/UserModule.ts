import { Module, Mutation, Action } from 'vuex-module-decorators';

import { AxiosClient } from '@/axios/AxiosClient';
import { addMock } from '@/axios/AxiosIntercept';

import { GateWayError } from '@/error/GateWayError';

import { GateWayResponse } from '@/types/GateWayResponse';
import GateWayModule from '../GateWayModule';

import {
  UserResponse,
  userLogin,
  userLogout,
  userDetailInfo,
  userEditInfo,
  LoginUserResponse,
  StipulationResponse,
} from '@/types/UserType';
import { SystemResponse } from '@/types/SystemType';

@Module({ name: 'UserModule' })
export default class UserModule extends GateWayModule {
  public loginUser: UserResponse = {} as UserResponse;

  @Mutation
  setLoginUser(user: UserResponse): void {
    this.loginUser = user;
  }

  // 로그인
  @Action({ rawError: true })
  async login(id: string, pwd: string) {
    addMock(`/signIn`, JSON.stringify(userLogin));

    try {
      const response = await AxiosClient.getInstance().post<LoginUserResponse>(`/signIn`, {
        id: id,
        pwd: pwd,
      });
      console.log('로그인 response', response);
      //쿠키 저장(세션 스토리지 -> 쿠키로 변경하기)
      sessionStorage.setItem('session_token', response.data.value.session);
      // sessionStorage.setItem('auth_dtl', JSON.stringify(response.data.value.data.value.autDtl));
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  // 로그아웃
  @Action({ rawError: true })
  async logout() {
    addMock(`/signOut`, JSON.stringify(userLogout));

    try {
      const response = await AxiosClient.getInstance().get<GateWayResponse<UserResponse>>(`/signOut`);
      console.log('로그아웃 response', response);
      // 쿠키 삭제(세션 스토리지 -> 쿠키로 변경하기)
      sessionStorage.clear();
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  // 로그인 유저 정보 조회
  @Action({ rawError: true })
  async getLoginUser(uId: string) {
    addMock(`/user/getLoginUser/${uId}`, JSON.stringify(userDetailInfo));

    try {
      const response = await AxiosClient.getInstance().get<GateWayResponse<UserResponse>>(`/user/getLoginUser/${uId}`);

      this.context.commit('setLoginUser', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  // 로그인 유저 정보 수정
  @Action({ rawError: true })
  async updateLoginUserInfo(userInfo: UserResponse) {
    addMock(`/user/userInfo/${userInfo.id}`, JSON.stringify(userEditInfo));

    try {
      const response = await AxiosClient.getInstance().put<GateWayResponse<UserResponse>>(
        `/user/userInfo/${userInfo.id}`,
        userInfo
      );
      this.context.commit('setLoginUser', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  // 회뤈가입
  @Action({ rawError: true })
  async signUp(userInfo: UserResponse) {
    addMock(`/user/signUp`, JSON.stringify(userInfo));

    try {
      const response = await AxiosClient.getInstance().post<GateWayResponse<UserResponse>>(`/user/signUp`, userInfo);
      // this.context.commit('setLoginUser', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  // 약관 동의
  @Action({ rawError: true })
  async agreeStipulation(stpltInfo: StipulationResponse) {
    addMock(`/user/agreeStipulation`, JSON.stringify(stpltInfo));

    try {
      const response = await AxiosClient.getInstance().post<GateWayResponse<UserResponse>>(
        `/user/agreeStipulation`,
        stpltInfo
      );
      // this.context.commit('setLoginUser', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }
}
