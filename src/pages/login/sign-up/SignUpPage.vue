<template>
  <div>
    <body>
      <div class="body-wrap">
        <div class="wrap">
          <SignUpHeader></SignUpHeader>
          <router-view />
          <MainFooter></MainFooter>
          <ModalLayout
            v-if="showAlert"
            :alert="true"
            errorTitle="정보"
            :errorDesc="message"
            @close="showAlert = false"
            size="m"
          >
          </ModalLayout>
        </div>
      </div>
    </body>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignUpHeader from '@/components/layout/header/SignUpHeader.vue';
import MainFooter from '@/components/layout/footer/MainFooter.vue';
import { EventBus } from '@/plugins/modal/ModalEvent';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { BSpinner } from 'bootstrap-vue';

@Component({
  components: {
    SignUpHeader: SignUpHeader,
    MainFooter: MainFooter,
    ModalLayout,
    BSpinner,
  },
})
export default class SignUpPage extends Vue {
  showAlert = false;
  message = '';

  created() {
    EventBus.$on('message', (text: string) => {
      if (text === 'dissmiss') {
        this.showAlert = false;
      } else {
        this.showAlert = true;
        this.message = text;
      }
    });
  }
}
</script>
