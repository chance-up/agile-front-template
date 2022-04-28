<template>
  <li>
    <span>{{ handlerGroup.apiGroupNm }}</span>
    <p class="multi-btn" @click="showModal = true"></p>
    <HandlerModal :eachApiGroup="handlerGroup" v-if="showModal" @close="showModal = false" />
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HandlerModal from '@/components/api-mngt/register/HandlerModal.vue';
import { HandlerGroupDetail, HandlerDetail } from '@/types/ApiType';

@Component({ components: { HandlerModal } })
export default class EachHandler extends Vue {
  showModal = false;
  // apiGroup!: HandlerGroupDetail;
  @Prop() public handlerGroup!: HandlerGroupDetail;
  //   groupId!: number;
  //   groupNm!: string | null;
  //   groupDesc!: string | null;
  //   groupDetail!: [] | null;

  //   // prop 예제
  //   @Prop() public inputNm!: string | null;
  //   @Prop() public options!: [string] | [number] | null;
  //   @Prop({ default: '' }) value!: string;
  created() {
    console.log('@@@@@: ' + this.handlerGroup.apiGroupNm);
    // this.apiGroup = {
    //   apiGroupId: 1,
    //   // apiGroupNm: 'API & Login Authentication Group Name',
    //   apiGroupNm: this.handlerGroupId as string,
    //   apiGroupDesc: 'API & Login Authentication Group Desc',
    //   apiIdList: [
    //     {
    //       apiId: 1,
    //       apiNm: 'API & Login Authentication 1 Name',
    //       apiDesc: 'API & Login Authentication 1 Desc',
    //     },
    //     {
    //       apiId: 2,
    //       apiNm: 'API & Login Authentication 2 Name',
    //       apiDesc: 'API & Login Authentication 2 Desc',
    //     },
    //     {
    //       apiId: 3,
    //       apiNm: 'API & Login Authentication 3 Name',
    //       apiDesc: 'API & Login Authentication 3 Desc',
    //     },
    //     {
    //       apiId: 4,
    //       apiNm: 'API & Login Authentication 4 Name',
    //       apiDesc: 'API & Login Authentication 4 Desc',
    //     },
    //   ],
    // };
  }
}
</script>
<style lang=""></style>
