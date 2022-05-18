import Vue from 'vue';
import Vuex from 'vuex';

import TestModule from '@/store/test/TestModule';
import SystemModule from '@/store/modules/SystemModule';
import ServiceModule from '@/store/modules/ServiceModule';
import ApiModule from '@/store/modules/ApiModule';
import HandlerModule from '@/store/modules/HandlerModule';
import UserModule from '@/store/modules/UserModule';
import DashBoardModule from '@/store/modules/DashBoardModule';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    TestModule,
    SystemModule,
    ServiceModule,
    ApiModule,
    HandlerModule,
    UserModule,
    DashBoardModule,
  },
});
