<template>
  <div>
    <h1>this is Search Page!!</h1>
    <div class="row">
      <div class="col-8"><Input :childValue.sync="value" /></div>
      <div class="col-4">
        <Button text="Search" :clickEvent="getUserList" />
      </div>
    </div>
    <div class="row">
      <div class="row justify-content-md-center">
        <Card
          :text="userRawData.first_name"
          :imgUrl="userRawData.avatar"
          v-for="(userRawData, idx) in userRawDatas.data"
          :key="idx"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import UserStore from '@/store/modules/UserModule';

import Button from '@/components/commons/Button.vue';
import Input from '@/components/commons/Input.vue';
import Card from '@/components/commons/Card.vue';

@Component({
  components: {
    Button,
    Input,
    Card,
  },
})
export default class ExamplePage extends Vue {
  public created() {
    //console.log(this.searchText);
  }
  userModule = getModule(UserStore, this.$store);

  value = null;

  // 아래와 같이 사용하면 searchText라는 변수를 현재 클래스에 선언하지 않아도,
  // Store의 state인 searchText를 사용할 수 있다.

  // getter(store 에서 자동 생성) 사용
  get searchText() {
    return this.userModule.searchText;
  }
  // mutation 사용
  set searchText(val: string) {
    this.userModule.setSearchText(val);
  }

  get userInfo() {
    return this.userModule.userInfo;
  }
  get userRawDatas() {
    return this.userModule.userRawDatas;
  }

  // action 사용
  // action은 템플릿에서
  // :clickEvent="this.userModule.getUserListMAction"
  // 와 같이 바로 넣어줘도 되고, 아래와 같이 메서드를 하나 만들어서 넣어줘도 된다.
  getUserList = () => {
    this.userModule.getUserListMAction('1');
  };

  //UserStore.searchText = this.value;

  // @Watch('value')
  // onChildChanged(val: string) {
  //   console.log(val);
  //   //this.childValue = val;
  // }
  //UserStore.

  // @UserModule.State
  // private userInfo!: UserInfo;

  // @UserModule.Action
  // private getUserListMAction!: (page: number) => void;

  // @UserModule.Action
  // private getUserAction!: (id: number) => void;
}
</script>
<style lang=""></style>
