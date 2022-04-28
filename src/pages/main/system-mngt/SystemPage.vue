<template>
  <!-- 페이지 최상단에 들어갈 타이들을 넘겨주세요 (ex. 시스템 관리) -->
  <ListLayout :title="$t('system.list_top_title')">
    <template slot="search-form">
      <div class="search-wrap">
        <h2 class="h2-tit">{{ $t('common.search') }}</h2>

        <!-- Input Box 옵션 -->
        <div class="search-cont">
          <InputBox v-model="searchData['nm']" :label="$t('system.name')" placeholder="입력해주세요." />
        </div>
        <div class="search-cont">
          <InputBox v-model="searchData['id']" :label="$t('system.id')" placeholder="입력해주세요." />
        </div>
        <div class="search-cont">
          <InputBox v-model="searchData['tkcgr_nm']" :label="$t('system.tkcgrNm')" placeholder="입력해주세요." />
        </div>
        <button class="mid-btn" @click="searchOnClieckEvent">
          <i><img src="@/assets/search_ico.svg" :alt="$t('common.search')" /></i>{{ $t('common.search') }}
        </button>
      </div>

      <!-- Select Box 옵션 -->
      <!-- <div class="search-cont">
          <SelectBox
            v-model="searchData[target]"
            label="기본정보"
            placeholder="입력해주세요."
            :selectOptions="selectOptions"
            v-bind:value.sync="target"
          />
        </div> -->
    </template>
    <template slot="list-form">
      <!-- 리스트 컴포넌트에서 사용할 타이틀(ex. 시스템 리스트)을 넘겨주세요. -->
      <ListForm :title="$t('system.list_cont_title')">
        <!-- 리스트 우측 상단에 들어갈 버튼은 template로 묶어서 넣어주시면 됩니다. -->
        <template slot="list-btn-area">
          <button class="mid-btn" @click="registerOnClickEvent">
            <i><img src="@/assets/check_ico.svg" :alt="$t('common.register')" /></i>{{ $t('common.register') }}
          </button>
        </template>
        <!-- 각 페이지마다 테이블 규격이 조금씩 달라서 template으로 묶어서 colgroup ~ tbody까지 넣어주시면 됩니다. -->
        <template slot="list-table">
          <colgroup>
            <col width="8%" />
            <col width="20%" />
            <col width="*" />
            <col width="12%" />
            <col width="22%" />
            <col width="12%" />
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
              <td @click="getRoutePage('system-detail', list.id)">{{ index + 1 }}</td>
              <td @click="getRoutePage('system-detail', list.id)" class="tl">
                <span class="bold">{{ list.nm }}</span>
              </td>
              <td @click="getRoutePage('system-detail', list.id)">{{ list.id }}</td>
              <td @click="getRoutePage('system-detail', list.id)">{{ list.tkcgr_nm }}</td>
              <td @click="getRoutePage('system-detail', list.id)">
                <p>
                  {{ list.updated_at === '' ? list.created_at : list.updated_at }}
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
        <template slot="pagination">
          <ul>
            <li class="page-btn">
              <a><img src="@/assets/page_first.svg" alt="처음" /></a>
            </li>
            <li class="page-btn">
              <a><img src="@/assets/page_before.svg" alt="이전" /></a>
            </li>
            <li class="active"><a>1</a></li>
            <li><a>2</a></li>
            <li><a>3</a></li>
            <li><a>4</a></li>
            <li><a>5</a></li>
            <li><a>6</a></li>
            <li><a>7</a></li>
            <li><a>8</a></li>
            <li><a>9</a></li>
            <li><a>10</a></li>
            <li class="page-btn">
              <a><img src="@/assets/page_after.svg" alt="다음" /></a>
            </li>
            <li class="page-btn">
              <a><img src="@/assets/page_last.svg" alt="마지막" /></a>
            </li>
          </ul>
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
import InputBox from '@/components/commons/search-option/InputBox.vue';
import SelectBox from '@/components/commons/search-option/SelectBox.vue';
import ListForm from '@/components/commons/ListForm.vue';

import { SearchCondition, SearchOption, SelectOptionType } from '@/types/SearchType';
import { SystemResponse } from '@/types/SystemType';
import { Pagination } from '@/types/GateWayResponse';

@Component({
  components: {
    ListLayout,
    InputBox,
    SelectBox,
    ListForm,
  },
})
export default class SystemPage extends Vue {
  systemModule = getModule(SystemModule, this.$store);

  // target = '';
  // selectOptions: SelectOptionType[] = [
  //   { label: 'api id', value: 'id' },
  //   { label: 'api 명', value: 'nm' },
  //   { label: '시스템명', value: 'sys_id' },
  //   { label: 'uri', value: 'uri' },
  // ];
  // searchData: object = {};

  searchData: SearchCondition = {
    nm: '',
    id: '',
    tkcgr_nm: '',
  };

  created() {
    console.log('listOption', this.listOption);
    if (Object.keys(this.$route.query).length > 0) {
      this.searchData.nm = this.$route.query.nm as string;
      this.searchData.id = this.$route.query.id as string;
      this.searchData.tkcgr_nm = this.$route.query.tkcgr_nm as string;

      //store 말고 페이지에서 action 부를 때도 예외처리를 해줘야하는지 물어보기
      this.systemModule.getSystemList(this.searchData);
    } else {
      this.systemModule.getSystemList();
    }
  }

  get listOption(): SystemResponse[] {
    return this.systemModule.systemList;
  }

  get pagination(): Pagination {
    return this.systemModule.pagination;
  }

  searchOnClieckEvent() {
    if (Object.values(this.searchData).some((item) => item != '')) {
      this.$router.push({
        name: 'system',
        query: {
          nm: this.searchData.nm,
          id: this.searchData.id,
          tkcgr_nm: this.searchData.tkcgr_nm,
        },
      });
    } else {
      this.$modal.show('검색 데이터를 입력해주세요.');
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
    this.$modal.show('삭제하시겠습니까?');
    this.systemModule.deleteSystem(id);
  }

  destroyed() {
    this.systemModule.setSystemList([]);
  }
}
</script>
