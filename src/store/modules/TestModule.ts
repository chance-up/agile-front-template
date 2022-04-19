import { GateWayResponse } from '@/types/GateWayResponse';
import { UserList, Data } from '@/types/TestType';
import { ApiResponse } from '@/api/ApiResponse';

import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';
import { ParameterError } from '@/error/Errors';

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

  public list: Array<Data> = [];

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

  //post
  @Mutation
  public postAlert(data: Data): void {
    this.list.push(data);
    alert(this.list);
  }

  @Action
  async postTest(data: Data) {
    try {
      const response = await ApiResponse.getInstance().post<GateWayResponse<UserList>>('/users', {
        avatar: 'test',
        email: 'test',
        first_name: 'test',
        id: 0,
        last_name: 'test',
      });
      console.log(response);

      this.context.commit('postAlert', response);
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
