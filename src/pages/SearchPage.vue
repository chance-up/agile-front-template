<template>
  <div>
    <h1>this is Search Page!!</h1>
    <div class="row">
      <div class="col-8"><Input :childValue.sync="value" /></div>
      <div class="col-4"><Button text="Search" /></div>
    </div>
    <div class="row">
      <div class="col-8"><Card /></div>
      <h1>{{ value }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
//import { UserInfo } from '@/types/UserTypes';
//import { namespace } from 'vuex-class';
import UserStore from '@/store/modules/UserModule';

import Button from '@/components/commons/Button/Button.vue';
import Input from '@/components/commons/Input/Input.vue';
import Card from '@/components/commons/Card/Card.vue';

//const UserModule = namespace('UserModule');

@Component({
  components: {
    Button,
    Input,
    Card,
  },
})
export default class SearchPage extends Vue {
  mounted() {
    //this.getUser(1);
    // this.getUserAction(1);
    console.log();
  }
  value = null;
  get searchText() {
    return UserStore.searchText;
  }

  //UserStore.searchText = this.value;

  // @Watch('value')
  // onChildChanged(val: string) {
  //   console.log(val);
  //   //this.childValue = val;
  // }
  //UserStore.ß

  // @UserModule.State
  // private userInfo!: UserInfo;

  // @UserModule.Action
  // private getUserListMAction!: (page: number) => void;

  // @UserModule.Action
  // private getUserAction!: (id: number) => void;
}
</script>
<style lang=""></style>
