import { Module, Mutation, Action } from 'vuex-module-decorators';

import { AxiosClient } from '@/axios/AxiosClient';
import { addMock } from '@/axios/AxiosIntercept';

import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';

import { GateWayResponse, Pagination } from '@/types/GateWayResponse';
import GateWayModule from '../GateWayModule';

import { UserResponse, userDetailInfo, userEditInfo } from '@/types/UserType';
import { SystemResponse } from '@/types/SystemType';

@Module({ name: 'UserModule' })
export default class UserModule extends GateWayModule {
  public loginUser: UserResponse = {} as UserResponse;

  @Mutation
  setLoginUser(user: UserResponse): void {
    this.loginUser = user;
  }

  @Action({ rawError: true })
  async getLoginUser(uId: string) {
    addMock(`/user/getLoginUser/${uId}`, JSON.stringify(userDetailInfo));

    try {
      const response = await AxiosClient.getInstance().get<GateWayResponse<SystemResponse[]>>(
        `/user/getLoginUser/${uId}`
      );

      this.context.commit('setLoginUser', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }

  @Action({ rawError: true })
  async updateLoginUserInfo(userInfo: UserResponse) {
    addMock(`/user/userInfo/${userInfo.id}`, JSON.stringify(userEditInfo));

    try {
      const response = await AxiosClient.getInstance().put<GateWayResponse<SystemResponse[]>>(
        `/user/userInfo/${userInfo.id}`,
        userInfo
      );
      this.context.commit('setLoginUser', response.data.value);
    } catch (error: GateWayError | any) {
      return Promise.reject(error);
    }
  }
}
