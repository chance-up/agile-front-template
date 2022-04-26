<template>
  <!-- 페이지 최상단에 들어갈 타이들을 넘겨주세요 (ex. 시스템 관리) -->
  <ListLayout :title="$t('system.list_top_title')">
    <template slot="search-form">
      <!-- 검색 컴포넌트의 옵션이 조금씩 다르니 페이지에 맞는 옵션으로 넘겨주세요. -->
      <SearchForm :searchPanelOption="searchOption" :searchData="searchData">
        <!-- 검색 컴포넌트에 들어갈 버튼은 template로 묶어서 넣어주시면 됩니다. -->
        <template slot="search-btn-area">
          <button class="mid-btn" @click="searchOnClieckEvent">
            <i><img src="@/assets/search_ico.svg" alt="검색" /></i>{{ $t('common.search') }}
          </button>
        </template>
      </SearchForm>
    </template>
    <template slot="list-form">
      <!-- 리스트 컴포넌트에서 사용할 타이틀(ex. 시스템 리스트)을 넘겨주세요. -->
      <ListForm :title="$t('system.list_cont_title')">
        <!-- 리스트 우측 상단에 들어갈 버튼은 template로 묶어서 넣어주시면 됩니다. -->
        <template slot="list-btn-area">
          <button class="mid-btn" @click="registerOnClickEvent">
            <i><img src="@/assets/check_ico.svg" alt="등록" /></i>{{ $t('common.register') }}
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
              <th>{{ $t('system.no') }}</th>
              <th>{{ $t('system.name') }}</th>
              <th>{{ $t('system.id') }}</th>
              <th>{{ $t('system.tkcgr') }}</th>
              <th>{{ $t('system.update') }}</th>
              <th>{{ $t('system.action') }}</th>
            </tr>
          </thead>
          <!-- 각 리스트 페이지에 맞는 데이터로 v-for 돌려주시면 됩니다. <td> 태그 안이 조금씩 다를 수 있으니 퍼블리싱 파일 참조하면서 수정해주세요. -->
          <tbody>
            <tr v-for="(list, index) in listOption" :key="index">
              <td @click="getRoutePage('system-detail', 1)">{{ index + 1 }}</td>
              <td @click="getRoutePage('system-detail', 2)">
                <span class="bold">{{ list.nm }}</span>
              </td>
              <td @click="getRoutePage('system-detail', list.id)">{{ list.id }}</td>
              <td @click="getRoutePage('system-detail', list.id)">{{ list.tkcgr_nm }}</td>
              <td @click="getRoutePage('system-detail', list.id)">
                <p>
                  {{ list.updated_at === null ? list.created_at : list.updated_at }}
                </p>
              </td>
              <td>
                <button class="mod-btn" @click="getRoutePage('system-edit', list.id)">
                  <i>{{ $t('common.modify') }}</i>
                </button>
                <button class="del-btn" @click="deleteSystem(list.id)">
                  <i>{{ $t('common.delete') }}</i>
                </button>
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

import { SearchCondition, SearchOption } from '@/types/SearchType';
import { SystemResponse } from '@/types/SystemType';

@Component({
  components: {
    ListLayout,
    SearchForm,
    ListForm,
  },
})
export default class SystemPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);
  searchData: SearchCondition = {
    inputBoxCondition: {},
    selectBoxCondition: {},
  };

  created() {
    this.systemModule.getSystemList();
  }

  get listOption(): SystemResponse[] {
    return this.systemModule.listOption;
  }

  searchOnClieckEvent() {
    if (
      //썼다 지웠을 때도 통과 안되도록 로직 추가해야 함
      Object.keys(this.searchData.inputBoxCondition).length > 0 ||
      Object.keys(this.searchData.selectBoxCondition).length > 0
    ) {
      console.log('system page : ', this.searchData);
      this.systemModule.getSystemList(this.searchData);
    } else {
      alert('검색 데이터를 입력해주세요.');
    }
  }

  registerOnClickEvent() {
    this.$router.push({ name: 'system-register' });
  }

  getRoutePage(page: string, id?: string): void {
    console.log(id);
    if (id) {
      this.$router.push({ name: page, params: { id: id } });
    } else {
      this.$router.push({ name: page });
    }
  }

  deleteSystem(id: string) {
    alert('삭제하시겠습니까?');
    this.systemModule.deleteSystem(id);
  }

  searchOption: SearchOption[] = [
    //inputBox 옵션
    {
      type: 'inputBox',
      label: '시스템명',
      target: 'nm',
      placeholder: '입력해주세요.',
    },
    {
      type: 'inputBox',
      label: '시스템ID',
      target: 'id',
      placeholder: '입력해주세요.',
    },
    {
      type: 'inputBox',
      label: '담당자명',
      target: 'tkcgr_nm',
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
