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
      <div class="col-8"><Card /></div>
      <input type="text" v-model="searchText" />
      <h1>{{ searchText }}</h1>

      <h1>{{ value }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
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
  get userRawData() {
    return this.userModule.userRawData;
  }

  // action 사용
  // action은 템플릿에서
  // :clickEvent="this.userModule.getUserListMAction"
  // 와 같이 바로 넣어줘도 되고, 아래와 같이 메서드를 하나 만들어서 넣어줘도 된다.
  getUserList = async () => {
    const temp1 = await this.userModule.getUserListMAction('1');
    console.log(this.userRawData);
    console.log(this.userRawData.data);

    return;
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
