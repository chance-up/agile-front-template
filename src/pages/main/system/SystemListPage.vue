<template>
  <ListLayout :title="title">
    <template slot="search-form">
      <SearchForm />
    </template>
    <template slot="list-form">
      <ListForm :title="listOption.listMainTitle">
        <template slot="list-table">
          <colgroup>
            <col width="10%" />
            <col width="15%" />
            <col width="*" />
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th>No.</th>
              <th>시스템명</th>
              <th>시스템ID</th>
              <th>담당자</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in listOption.listArrays" :key="index">
              <td>{{ list.no }}</td>
              <td>
                <span class="bold">{{ list.systemName }}</span>
              </td>
              <td>{{ list.systemId }}</td>
              <td>{{ list.manager }}</td>
              <td>
                <p>
                  {{ list.update }}
                </p>
              </td>
              <td>
                <button class="mod_btn"><i>수정</i></button>
                <button class="del_btn"><i>삭제</i></button>
              </td>
            </tr>
          </tbody>
        </template>
      </ListForm>
    </template>
  </ListLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/system/SearchForm.vue';
import ListForm from '@/components/system/ListForm.vue';

@Component({
  components: {
    ListLayout,
    SearchForm,
    ListForm,
  },
})
export default class SystemManagement extends Vue {
  title = '시스템 관리';
  listOption = {
    listMainTitle: '시스템 리스트',
    // listBtnTitle: '등록',
    // listItemTitle: ['No.', '시스템 ID', '시스템명', '담당자', 'Update'],
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

@Component({
  components: {
    Button,
  },
})
export default class SystemManagementPage extends Vue {
  //testModule = getModule(TestModule, this.$store);
  // getUserList() {
  //   console.log('getUserList');
  //   this.testModule.getTest();
  // }
  // get test(): UserList {
  //   console.log('TEST UserList');
  //   return this.testModule.test;
  // }
}
</script>
<style lang=""></style>
-->
