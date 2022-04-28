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

@Component({
  components: {
    MainHeader: MainHeader,
    MainFooter: MainFooter,
    ModalLayout,
  },
})
export default class MainPage extends Vue {
  showAlert = false;
  message = '';
  created() {
    EventBus.$on('message', (text: string) => {
      this.showAlert = true;
      this.message = text;
    });
  }
}
</script>
