import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from '@/store/modules/UserModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UserStore,
  },
});
