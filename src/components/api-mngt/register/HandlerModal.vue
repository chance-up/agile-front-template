<template>
  <ModalLayout size="l">
    <template v-slot:modalHeader>
      <h1 class="h1-tit">{{ handlerGroup.apiGroupNm }}</h1>
      <button @click="$emit('close')">
        <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
      </button>
    </template>
    <template v-slot:modalContainer>
      <p class="text">{{ handlerGroup.apiGroupDesc }}</p>

      <ul class="handler-list">
        <li v-for="(eachApi, index) in handlerGroup.apiIdList" :key="index">
          <span>{{ eachApi.apiNm }}</span>
          <a v-on:mouseout="handleMouseOut" v-on:mouseover="[changeApiDesc(eachApi.apiDesc)]" href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" :value="eachApi.apiDesc" /></i>
          </a>
        </li>
        <HoverModal v-if="showHoverModal" @close="showHoverModal = false" :apiDesc="sendApiDesc">
          <!-- <h3 slot="header">custom header</h3> -->
        </HoverModal>
      </ul>
    </template>
    <template v-slot:modalFooter>
      <button class="lg-btn purple-btn" @click="$emit('close')">ok</button>
    </template>
  </ModalLayout>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalLayout from '@/components/commons/modal/ModalLayout.vue';
import HoverModal from '@/components/api-mngt/register/HoverModal.vue';
import { HandlerGroupDetail } from '@/types/ApiType';

import HoverLayout from '@/components/commons/modal/HoverLayout.vue';

@Component({
  components: {
    ModalLayout,
    HoverModal,
    HoverLayout,
  },
})
export default class HandlerModal extends Vue {
  showHoverModal = false;
  sendApiDesc = '';
  check = false;
  @Prop() public handlerGroup!: HandlerGroupDetail;
  handleMouseOut() {
    if (this.showHoverModal) {
      this.showHoverModal = false;
    }
  }
  handleMouseOver(event: MouseEvent) {
    if (!this.showHoverModal) {
      console.log(event);
      this.showHoverModal = true;
    }
  }
  changeApiDesc(apiDesc: string, event: MouseEvent) {
    if (!this.showHoverModal) {
      this.sendApiDesc = apiDesc;
      console.log(apiDesc);
      this.showHoverModal = true;
    }
  }
}
</script>
<style></style>
