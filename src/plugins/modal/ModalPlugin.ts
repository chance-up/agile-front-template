import _Vue from 'vue';
import { EventBus } from '@/plugins/modal/ModalEvent';

export default {
  install: (Vue: typeof _Vue, options?: any) => {
    Vue.prototype.$modal = {
      show: (message: string) => {
        EventBus.$emit('message', message);
      },
    };
  },
};
