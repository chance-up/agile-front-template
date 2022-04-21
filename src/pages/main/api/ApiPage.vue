<template>
  <div>
    <ListLayout :title="`${this.$t('api.api')}${this.$t('api.management')}`" subTitle="API List">
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
                <th>{{ $t('api.platform') + $t('api.name') }}</th>
                <th>{{ $t('api.api') + ' ' + $t('api.id') }}</th>
                <th>{{ $t('api.api') + ' ' + $t('api.name') }}</th>
                <th>{{ $t('api.method') }}</th>
                <th>{{ $t('api.uri') }}</th>
                <th>{{ $t('api.timeOut') }}<br />(ms)</th>
                <th>{{ $t('api.update') }}</th>
                <th>{{ $t('api.action') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(apiData, index) in dummyList"
                :key="index"
                @click="$router.push({ path: '/api-detail', Param: apiData.apiId })"
              >
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
                  <button class="mod_btn">
                    <i>{{ $t('api.edit') }}</i>
                  </button>
                  <button class="del_btn">
                    <i>{{ $t('api.delete') }}</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </template>
        </ListForm>
      </template>
    </ListLayout>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/api/SearchForm.vue';
import ListForm from '@/components/api/ListForm.vue';
import { DummyApiResponse, dummyList } from '@/types/ApiType';
@Component({
  components: {
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
      label: `${this.$t('api.basic')}` + `${this.$t('api.information')}`,
      placeholder: `${this.$t('api.placeholder')}`,
      selectOptions: [
        `${this.$t('api.api')} ${this.$t('api.id')}`,
        `${this.$t('api.api')} ${this.$t('api.name')}`,
        `${this.$t('api.platform')}${this.$t('api.name')}`,
        `${this.$t('api.uri')}`,
      ],
    },
  ];
  get dummyList(): DummyApiResponse[] {
    return dummyList;
  }
}
</script>
