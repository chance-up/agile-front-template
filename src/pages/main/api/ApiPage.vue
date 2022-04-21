<template>
  <div>
    <ListLayout title="API관리" subTitle="API List">
      <template v-slot:search-form>
        <SearchForm :searchPanelOption="searchOption" />
      </template>
      <template v-slot:list-form>
        <ListForm title="API List">
          <template v-slot:list-table>
            <colgroup>
              <col width="5%" />
              <col width="15%" />
              <col width="12%" />
              <col width="*" />
              <col width="14%" />
              <col width="13%" />
              <col width="8%" />
              <col width="10%" />
              <col width="8%" />
            </colgroup>
            <thead>
              <tr>
                <th>No.</th>
                <th>플랫폼명</th>
                <th>API ID</th>
                <th>API 명</th>
                <th>Method</th>
                <th>URI</th>
                <th>Time out<br />(ms)</th>
                <th>Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(apiData, index) in dummyList" :key="index">
                <!-- @click="$router.push({ path: '/api_detail', Param: list.apiId })" -->
                <td>{{ index + 1 }}</td>
                <td>
                  <span class="bold">{{ apiData.sysNm }}</span>
                </td>
                <td>{{ apiData.apiId }}</td>
                <td>{{ apiData.apiNm }}</td>
                <td>
                  <span
                    v-for="(method, idx) in apiData.methods"
                    :key="idx"
                    class="badge"
                    :class="{
                      syan: method == 'GET',
                      red: method == 'DELETE',
                      blue: method == 'POST',
                      violet: method == 'PUT',
                    }"
                  >
                    {{ method }}
                  </span>
                </td>
                <td class="tl">{{ apiData.uriSer }}</td>
                <td>{{ apiData.timeOut }}</td>
                <td>
                  <span>{{ new Date(apiData.updateTime).toISOString().slice(0, 10) }}</span
                  ><span>{{ new Date(apiData.updateTime).toISOString().slice(11, 19) }}</span>
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
    <ApiDetailPage />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ApiDetailPage from './detail/ApiDetailPage.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/api/SearchForm.vue';
import ListForm from '@/components/api/ListForm.vue';
import { DummyApiResponse, dummyList } from '@/types/ApiType';
@Component({
  components: {
    ApiDetailPage,
    ContentLayout,
    ListLayout,
    SearchForm,
    ListForm,
  },
})
export default class ApiPage extends Vue {
  searchOption = [
    {
      type: 'selectBox',
      label: '기본정보',
      placeholder: '입력해주세요.',
      selectOptions: ['api id', 'api 명', '플랫폼명', 'url'],
    },
  ];
  get dummyList(): DummyApiResponse[] {
    return dummyList;
  }
}
</script>
