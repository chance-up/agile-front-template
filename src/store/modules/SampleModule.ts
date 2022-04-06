import { getUserList } from '@/service/UserService';
import { UserInfo } from '@/types/UserTypes';
import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';

@Module({ name: 'SampleStore' })
export default class UserStore extends VuexModule {
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

  //   @Mutation
  //   setSearchText(val: string) {
  //     this.searchText = val;
  //   }

  // @Action
}
