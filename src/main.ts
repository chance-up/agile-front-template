import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/admin.css';
import '@/style/common.css';
import '@/style/reset.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
