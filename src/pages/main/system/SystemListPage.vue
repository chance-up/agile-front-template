<template>
  <ListLayout :title="title" :option="listOption" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ListLayout from '@/components/layout/ListLayout.vue';

@Component({
  components: {
    ListLayout,
  },
})
export default class SystemManagement extends Vue {
  title = '시스템 관리';
  listOption = {
    listMainTitle: '시스템 리스트',
    listBtnTitle: '등록',
    listItemTitle: ['No.', '시스템 ID', '시스템명', '담당자', 'Update'],
    listArrays: [
      {
        no: '1',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '2',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '3',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '4',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '5',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '6',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '7',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '8',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '9',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
      {
        no: '10',
        systemId: 'systemId',
        systemName: 'systemName',
        manager: 'manager',
        update: 'update',
      },
    ],
  };
}
</script>

<!-- <template>
  <div>
    <h1>this is the SystemListPage</h1>
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
export default class SystemManagementPage extends Vue {
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
-->
