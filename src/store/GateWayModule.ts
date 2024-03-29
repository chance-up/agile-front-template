import { VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { USER_STATE } from '@/store/UserState';
import { AxiosClient } from '@/axios/AxiosClient';

export default abstract class GateWayModule extends VuexModule {
  public currAsyncState = USER_STATE.IDLE;

  @Mutation
  fetchCurrAsyncState(state: USER_STATE) {
    console.log('fetchCurrAsyncState', state);
    this.currAsyncState = state;
  }
  @Action
  showLoading() {
    this.context.commit('fetchCurrAsyncState', USER_STATE.LOADING);
  }
  @Action
  dissmissLoading() {
    this.context.commit('fetchCurrAsyncState', USER_STATE.DONE);
  }
  @Action
  showError() {
    this.context.commit('fetchCurrAsyncState', USER_STATE.ERROR);
  }

  @Action
  release() {
    AxiosClient.getInstance().cancel();
  }
}
