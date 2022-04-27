<template>
  <li>
    <!-- <span @click="handleOnClickGroup">API & Login Authentication Group</span>
    <p class="multi-btn" @click="handleOnClickGroupDetail"></p> -->
    <span>{{ handlerGroupId }}</span>
    <!-- <span>API & Login Authentication Group</span> -->
    <p class="multi-btn" @click="showModal = true"></p>
    <!-- <div> -->
    <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
    <HandlerModal v-if="showModal" @close="showModal = false" />
    <!-- <h3 slot="header">custom header</h3> -->
    <!-- </div> -->
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HandlerModal from '@/components/api-mngt/register/HandlerModal.vue';
interface API_DETAIL {
  apiId: number | string;
  apiNm: string;
  apiDesc: string;
}
interface API_GROUP_DETAIL {
  apiGroupId: number | string;
  apiGroupNm: string;
  apiGroupDesc: string;
  apiIdList: API_DETAIL[];
}
@Component({ components: { HandlerModal } })
export default class EachHandler extends Vue {
  showModal = false;
  apiGroup!: API_GROUP_DETAIL;
  @Prop() handlerGroupId!: string | number;
  //   groupId!: number;
  //   groupNm!: string | null;
  //   groupDesc!: string | null;
  //   groupDetail!: [] | null;

  //   // prop 예제
  //   @Prop() public inputNm!: string | null;
  //   @Prop() public options!: [string] | [number] | null;
  //   @Prop({ default: '' }) value!: string;
  created() {
    this.apiGroup = {
      apiGroupId: 1,
      apiGroupNm: 'API & Login Authentication Group Name',
      apiGroupDesc: 'API & Login Authentication Group Desc',
      apiIdList: [
        {
          apiId: 1,
          apiNm: 'API & Login Authentication 1 Name',
          apiDesc: 'API & Login Authentication 1 Desc',
        },
        {
          apiId: 2,
          apiNm: 'API & Login Authentication 2 Name',
          apiDesc: 'API & Login Authentication 2 Desc',
        },
        {
          apiId: 3,
          apiNm: 'API & Login Authentication 3 Name',
          apiDesc: 'API & Login Authentication 3 Desc',
        },
        {
          apiId: 4,
          apiNm: 'API & Login Authentication 4 Name',
          apiDesc: 'API & Login Authentication 4 Desc',
        },
      ],
    };
  }
}
</script>
<style lang=""></style>
