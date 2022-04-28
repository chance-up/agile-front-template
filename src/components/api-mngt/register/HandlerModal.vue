<template>
  <ModalLayout size="l">
    <template v-slot:modalHeader>
      <h1 class="h1-tit">{{ eachApiGroup.apiGroupNm }}</h1>
      <button @click="$emit('close')">
        <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
      </button>
    </template>
    <template v-slot:modalContainer>
      <p class="text">{{ eachApiGroup.apiGroupDesc }}</p>

      <ul class="handler-list">
        <!-- <li>
          <span>REQ.API & Login Authentication1</span>
          <a v-on:mouseout="showHoverModal = false" v-on:mouseover="showHoverModal = true" href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" /></i>
          </a>
        </li>
        <HoverModal v-if="showHoverModal" @close="showHoverModal = false">
          <h3 slot="header">custom header</h3>
        </HoverModal> -->

        <li v-for="(eachApi, index) in eachApiGroup.apiIdList" :key="index">
          <span>{{ eachApi.apiNm }}</span>
          <a v-on:mouseout="handleMouseOut" v-on:mouseover="handleMouseOver" href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" :value="eachApi.apiId" /></i>
          </a>
        </li>
        <HoverModal v-if="showHoverModal" @close="showHoverModal = false">
          <h3 slot="header">custom header</h3>
        </HoverModal>
        <!-- <div v-if="showHoverModal">
          <HoverLayout v-for="(eachApi, index) in eachApiGroup.apiIdList" :key="index" @close="showHoverModal = false">
            <template v-slot:hoverContents>{{ eachApi.apiDesc }}</template>
          </HoverLayout>
        </div> -->

        <!-- <li>
          <span>REQ.API & Login Authentication</span>
          <a href="" class="tip-btn">
            <i><img src="@/assets/tip.svg" alt="팁" /></i>
          </a>
        </li> -->
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
  check = false;
  @Prop() public eachApiGroup!: HandlerGroupDetail;
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
}
</script>
<style></style>
