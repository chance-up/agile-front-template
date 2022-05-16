import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '@/plugins/Locale';
import { BootstrapVue } from 'bootstrap-vue';

import '@/style/reset.css';
import '@/style/common.css';
import '@/style/admin.css';
// Modal 삭제 금지($modal 사용)
import Modal from '@/plugins/modal/Modal';
import ModalPlugin from '@/plugins/modal/ModalPlugin';

import 'bootstrap/dist/css/bootstrap.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ModalPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
