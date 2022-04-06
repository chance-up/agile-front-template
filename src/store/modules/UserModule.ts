import { getUserList, getUser } from '@/service/UserService';
import { UserList, UserInfo, UserRawData } from '@/types/UserTypes';
import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators';

@Module({ name: 'UserStore' })
export default class UserStore extends VuexModule {
  searchText = '11';
  userInfo: UserInfo = {
    avatar: '',
    email: '',
    first_name: '',
    id: 0,
    last_name: '',
  };

  userRawData: UserRawData = {
    data: [],
    page: 0,
  };

  @MutationAction({ mutate: ['userRawData'] })
  async getUserListMAction(page: string) {
    const data = await getUserList(page);
    //console.log(data);
    return { userRawData: data };
  }

  @Mutation
  setSearchText(val: string) {
    this.searchText = val;
  }
  // @Action
  // async getUserAction(id: number) {
  //   const data = await getUser(id);
  //   return { userInfo: data };
  // }

  // // Mutation 정의
  // @Mutation
  // userInfoMut(data: UserInfo) {
  //   this.userInfo = data;
  // }

  // Action 정의
  // @Action({ commit: 'userInfoMut' })
  // async getUserInfoAct(userName: string) {
  //   const data = await getUserInfo(userName);
  //   return data;
  // }

  // MutationAction 정의: mutation 과 action을 합친 기능, 위 Mutation + Action 과 같은 기능임

  // User Search 기능 fin

  // User List 기능 start
  // State 정의
  // userList: UserList[] = [];

  // // Mutation 정의
  // @Mutation
  // userListMut(data: UserList[]) {
  //   this.userList = data;
  // }

  // // Action 정의
  // @Action({ commit: 'userListMut' })
  // async getUserListAct(keyword: string) {
  //   const data = await getUserList(keyword);
  //   return data;
  // }

  // // MutationAction 정의: mutation 과 action을 합친 기능, 위 Mutation + Action 과 같은 기능임
  // @MutationAction({ mutate: ['userList'] })
  // async getUserListMuAct(userName: string) {
  //   const data = await getUserList(userName);
  //   return { userList: data };
  // }

  // User List 기능 fin
}
