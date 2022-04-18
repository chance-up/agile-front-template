import { GateWayResponse } from '@/types/GateWayResponse';
import { UserList } from '@/types/TestType';
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
}
