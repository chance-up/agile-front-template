import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from '@/store/modules/UserModule';
import TestModule from '@/store/modules/TestModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UserStore,
    TestModule,
  },
});
