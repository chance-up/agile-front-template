import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '@/plugins/Locale';
import { BootstrapVue } from 'bootstrap-vue';

import '@/style/reset.css';
import '@/style/common.css';
import '@/style/admin.css';
import '@/style/dash-board.css';
// Modal 삭제 금지($modal 사용)
import Modal from '@/plugins/modal/Modal';
import ModalPlugin from '@/plugins/modal/ModalPlugin';

import 'bootstrap/dist/css/bootstrap.css';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(ModalPlugin);

const toastOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
};

Vue.use(Toast, toastOptions);
new Vue({
  router,
  store,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
