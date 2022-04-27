import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

export default class GateWayModule extends VuexModule {
  isProgessbar = false;

  showProgressbar() {
    this.isProgessbar = true;
  }

  hideProgressbar() {
    this.isProgessbar = false;
  }
}
