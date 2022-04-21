import Vue from 'vue';
import Vuex from 'vuex';

import TestModule from '@/store/test/TestModule';
import SystemModule from '@/store/modules/SystemModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    TestModule,
    SystemModule,
  },
});
