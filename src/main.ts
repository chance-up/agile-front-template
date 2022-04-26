import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '@/plugins/Locale';
import { BootstrapVue } from 'bootstrap-vue';

import '@/style/admin.css';
import '@/style/common.css';
import '@/style/reset.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
new Vue({
  router,
  store,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
