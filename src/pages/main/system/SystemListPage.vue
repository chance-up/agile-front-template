<template>
  <!-- 페이지 최상단에 들어갈 타이들을 넘겨주세요 (ex. 시스템 관리) -->
  <ListLayout :title="title">
    <template slot="search-form">
      <!-- 검색 컴포넌트의 옵션이 조금씩 다르니 페이지에 맞는 옵션으로 넘겨주세요. -->
      <SearchForm :searchPanelOption="searchOption" />
    </template>
    <template slot="list-form">
      <!-- 리스트 컴포넌트에서 사용할 타이틀(ex. 시스템 리스트)을 넘겨주세요. -->
      <ListForm :title="listOption.listMainTitle">
        <!-- 리스트 우측 상단에 들어갈 버튼은 template로 묶어서 넣어주시면 됩니다. -->
        <template slot="list-btn-area">
          <button class="mid-btn" @click="onClickEvent">
            <i><img src="@/assets/check_ico.svg" alt="등록" /></i>등록
          </button>
        </template>
        <!-- 각 페이지마다 테이블 규격이 조금씩 달라서 template으로 묶어서 colgroup ~ tbody까지 넣어주시면 됩니다. -->
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
          <!-- 각 리스트 페이지에 맞는 데이터로 v-for 돌려주시면 됩니다. <td> 태그 안이 조금씩 다를 수 있으니 퍼블리싱 파일 참조하면서 수정해주세요. -->
          <tbody>
            <tr v-for="(list, index) in listOption" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <span class="bold" @click="getRoutePage('system_view')">{{ list.nm }}</span>
              </td>
              <td>{{ list.id }}</td>
              <td>{{ list.tkcgrNm }}</td>
              <td>
                <p>
                  {{ list.updatedAt === null ? list.createdAt : list.updatedAt }}
                </p>
              </td>
              <td>
                <button class="mod-btn" @click="getRoutePage('system_edit')"><i>수정</i></button>
                <button class="del-btn" @click="deleteSystem()"><i>삭제</i></button>
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
import { getModule } from 'vuex-module-decorators';

import SystemModule from '@/store/modules/SystemModule';

import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/commons/SearchForm.vue';
import ListForm from '@/components/commons/ListForm.vue';

import { SearchOption } from '@/types/SearchType';
import { DummySystemListResponse } from '@/types/SystemType';

@Component({
  components: {
    ListLayout,
    SearchForm,
    ListForm,
  },
})
export default class SystemManagement extends Vue {
  systemModule = getModule(SystemModule, this.$store);

  created() {
    this.systemModule.getSystemList();
  }

  get listOption(): DummySystemListResponse[] {
    return this.systemModule.listOption;
  }

  onClickEvent() {
    this.$router.push({ name: 'system_register' });
  }

  getRoutePage(page: string, id?: number): void {
    if (id) {
      this.$router.push({ name: page, params: { id: String(id) } });
    } else {
      this.$router.push({ name: page });
    }
  }

  deleteSystem() {
    console.log('Not yet implemented');
  }

  title = '시스템 관리';
  searchOption: SearchOption[] = [
    //inputBox 옵션
    {
      type: 'inputBox',
      label: '시스템명',
      placeholder: '입력해주세요.',
    },
    {
      type: 'inputBox',
      label: '시스템ID',
      placeholder: '입력해주세요.',
    },
    {
      type: 'inputBox',
      label: '담당자명',
      placeholder: '입력해주세요.',
    },
    // selectBox 옵션

    // {
    //   type: 'selectBox',
    //   label: '기본정보',
    //   placeholder: '입력해주세요.',
    //   selectOptions: ['api id', 'api 명', '플랫폼명', 'uri'],
    // },
  ];
}
</script>
