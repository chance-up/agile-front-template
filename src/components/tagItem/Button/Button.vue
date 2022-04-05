<template>
  <button id="normal_button" type="button" class="btn btn-primary" @click="getUser('2')">
    {{ text }}
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserInfo } from '@/types/UserTypes';
import { namespace } from 'vuex-class';
const UserModule = namespace('UserModule');
@Component
export default class Button extends Vue {
  mounted() {
    //this.getUser(1);
    this.getUserAction(1);
  }
  @Prop() private text!: string;

  @UserModule.State
  private userInfo!: UserInfo;

  //@UserStore.Getter('doubledCount')
  //private doubledCount!: number;

  @UserModule.Action
  private getUserListAction!: (page: number) => void;

  @UserModule.Action
  private getUserAction!: (id: number) => void;
}
</script>
<style scoped>
#normal_button {
  width: 60%;
  height: 100%;
}
</style>
