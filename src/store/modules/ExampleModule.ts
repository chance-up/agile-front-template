import { getUserList } from '@/service/UserService';
import { UserInfo } from '@/types/UserTypes';
import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';

@Module({ name: 'ExampleModule' })
export default class ExampleModule extends VuexModule {
  // State 선언시에는 아래와 같이 초기화를 해줘야 한다.
  userInfo: UserInfo = {
    avatar: '',
    email: '',
    first_name: '',
    id: 0,
    last_name: '',
  };

  @MutationAction({ mutate: ['userInfo'] })
  async getUserListMAction(page: string) {
    const data = await getUserList(page);
    console.log(data);
    return { userInfo: data };
  }
}
