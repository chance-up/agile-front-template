<template>
  <div>
    <h1>{{ test.data.email }}</h1>
    <Button text="Search" :clickEvent="getUserList" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/commons/Button.vue';
import { getModule } from 'vuex-module-decorators';
import TestModule from '@/store/modules/TestModule';
import { UserList } from '@/types/TestType';

@Component({
  components: {
    Button,
  },
})
export default class PlatformPage extends Vue {
  testModule = getModule(TestModule, this.$store);

  getUserList() {
    console.log('getUserList');
    this.testModule.getTest();
  }

  get test(): UserList {
    console.log('TEST UserList');
    return this.testModule.test;
  }
}
</script>
<style lang=""></style>
