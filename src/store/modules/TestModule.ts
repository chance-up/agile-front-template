import { GateWayResponse } from '@/types/GateWayResponse';
import { UserList, Data } from '@/types/TestType';
import { ApiResponse } from '@/api/ApiResponse';

import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import { ParameterError } from '@/error/Errors';
import axios from '@/api/axios';

@Module({ name: 'TestModule' })
export default class TestModule extends VuexModule {
  public test: UserList = {
    data: {
      avatar: '',
      email: '',
      first_name: '',
      id: 0,
      last_name: '',
    },
    support: {
      url: '',
      text: '',
    },
  };

  @Mutation
  setItem(test: UserList): void {
    this.test = test;
  }

  @Mutation
  showAlert(string: string) {
    alert(string);
  }

  @Action
  async getTest() {
    try {
      const response = await ApiResponse.getInstance().get<GateWayResponse<UserList>>(
        'air/utilGdnc/inquiryInspectionCenterList'
      );
      console.log(response);

      const response1 = await ApiResponse.getInstance().get<GateWayResponse<UserList>>(
        '/air/inscntrAdm/inquiryRgnInspectionCenterList',
        {
          limit: '10',
          offset: '0',
        }
      );
      console.log(response1);

      this.context.commit('setItem', response);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }

  /////////////////////////////////////////////////////////////////////
  public list: Array<Data> = [];
  public fetchedList = false;
  public member_id = 0;
  public user: Data = {
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    id: 0,
  };

  @Mutation
  public pickId(id: number): void {
    this.member_id = id;
  }
  @Action
  public pickMember(id: number) {
    this.context.commit('pickId', id);
  }

  // 유저 리스트 불러오기
  @Mutation
  getUserListMutation(data: Array<Data>) {
    this.fetchedList = true;
    this.list = [...this.list, ...data];
    console.log(this.list);
  }

  @Action
  async getUserListAction(page: string) {
    try {
      if (!this.fetchedList) {
        const response = await ApiResponse.getInstance().get<GateWayResponse<UserList>>('/users', {
          params: {
            page: page,
          },
        });
        this.context.commit('getUserListMutation', response.data);
      }
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }

  //유저 검색
  @Mutation
  getUserMutation(data: Data) {
    this.user = data;
    console.log(this.user);
  }

  @Action
  async getUserAction(id: number) {
    try {
      const response = await ApiResponse.getInstance().get<GateWayResponse<Data>>('/users/' + id);
      this.context.commit('getUserMutation', response.data);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }

  //유저 생성
  @Mutation
  public createUserMutation(data: Data): void {
    this.list.push(data);
    console.log(this.list);
  }

  @Action
  async createUserAction(data: Data) {
    try {
      const response = await ApiResponse.getInstance().post<GateWayResponse<Data>>('/users', {
        data,
      });

      this.context.commit('createUserMutation', response.data);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }

  // 유저 편집
  @Mutation
  public editUserMutation(data: Data): void {
    this.list = this.list.map((item: Data) => {
      if (item.id == data.id) {
        item = data;
        console.log(item);
      }

      return item;
    });

    console.log(this.list);
  }

  @Action
  async editUserAction(data: Data) {
    try {
      const response = await ApiResponse.getInstance().put<GateWayResponse<Data>>(
        '/users/' + data.id,
        {
          data,
        }
      );
      this.context.commit('editUserMutation', response.data);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }

  // 유저 삭제
  @Mutation
  public deleteUserMutation(id: number): void {
    this.list = this.list.filter((item) => {
      return item.id !== id;
    });
    console.log(this.list);
  }

  @Action
  async deleteUserAction(id: number) {
    try {
      const response = await ApiResponse.getInstance().delete<GateWayResponse<Data>>('/users/', id);

      this.context.commit('deleteUserMutation', id);
    } catch (error) {
      if (error as ParameterError) {
        this.context.commit('showAlert');
        console.log('ParameterError');
      } else {
        console.log('ParameterError');
      }
    }
  }
}
