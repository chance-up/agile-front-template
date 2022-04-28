<template>
  <div>
    <body>
      <div class="body-wrap">
        <div class="wrap">
          <MainHeader></MainHeader>
          <router-view />
          <MainFooter></MainFooter>
          <ModalLayout
            v-if="showAlert"
            :alert="true"
            errorTitle="에러발생"
            :errorDesc="message"
            @close="showAlert = false"
          >
            <!-- <template v-slot:modalContainer> {{ message }} </template> -->
          </ModalLayout>
        </div>
      </div>
    </body>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/layout/header/MainHeader.vue';
import MainFooter from '@/components/layout/footer/MainFooter.vue';
import { EventBus } from '@/plugins/modal/ModalEvent';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import { BSpinner } from 'bootstrap-vue';

@Component({
  components: {
    MainHeader: MainHeader,
    MainFooter: MainFooter,
    ModalLayout,
    BSpinner,
  },
})
export default class MainPage extends Vue {
  showAlert = false;
  message = '';
  isShowProgress = true;

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

<!-- 
<style scoped>
.text-center {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.spinner-border {
  display: block;
  position: fixed;
  top: calc(50% - (58px / 2));
  right: calc(50% - (58px / 2));
}
</style>-->
