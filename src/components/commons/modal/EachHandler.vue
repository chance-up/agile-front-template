<template>
  <li>
    <!-- <span @click="handleOnClickGroup">API & Login Authentication Group</span>
    <p class="multi-btn" @click="handleOnClickGroupDetail"></p> -->
    <span>{{ apiGroup.api_group_nm }} {{ testId }}</span>
    <!-- <span>API & Login Authentication Group</span> -->
    <p class="multi-btn" @click="showModal = true"></p>
    <!-- <div> -->
    <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header</h3>
    </Modal>
    <!-- </div> -->
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Modal from '@/components/commons/modal/Modal.vue';
interface API_DETAIL {
  api_id: number;
  api_nm: string;
  api_desc: string;
}
interface API_GROUP_DETAIL {
  api_group_id: number;
  api_group_nm: string;
  api_group_desc: string;
  api_list: API_DETAIL[];
}
@Component({ components: { Modal } })
export default class EachHandler extends Vue {
  showModal = false;
  apiGroup!: API_GROUP_DETAIL;
  @Prop() testId!: number;
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
      api_group_id: 1,
      api_group_nm: 'API & Login Authentication Group',
      api_group_desc: 'API & Login Authentication Group',
      api_list: [
        {
          api_id: 1,
          api_nm: 'API & Login Authentication 1',
          api_desc: 'API & Login Authentication 1',
        },
        {
          api_id: 2,
          api_nm: 'API & Login Authentication 2',
          api_desc: 'API & Login Authentication 2',
        },
        {
          api_id: 3,
          api_nm: 'API & Login Authentication 3',
          api_desc: 'API & Login Authentication 3',
        },
        {
          api_id: 4,
          api_nm: 'API & Login Authentication 4',
          api_desc: 'API & Login Authentication 4',
        },
      ],
    };
  }
}
</script>
<style lang=""></style>
