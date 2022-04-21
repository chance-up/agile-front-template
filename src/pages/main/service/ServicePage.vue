<template>
  <ListLayout :title="title">
    <template slot="search-form">
      <SearchForm :searchPanelOption="searchOption" />
    </template>
    <template slot="list-form">
      <ListForm :title="listTitle">
        <template slot="list-table">
          <colgroup>
            <col width="7%" />
            <col width="18%" />
            <col width="15%" />
            <col width="12%" />
            <col width="*" />
            <col width="18%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th>{{ $t('service.no') }}</th>
              <th>{{ $t('service.name') }}</th>
              <th>{{ $t('service.id') }}</th>
              <th>{{ $t('service.authentication_method') }}</th>
              <th>{{ $t('service.validity') }}</th>
              <th>{{ $t('service.update') }}</th>
              <th>{{ $t('service.action') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(list, index) in listOption"
              :key="index"
              @click="$router.push({ path: '/service_detail', Param: list.serviceId })"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <span class="bold">{{ list.serviceNm }}</span>
              </td>
              <td>{{ list.serviceId }}</td>
              <td>{{ list.authMethod[0] }}</td>
              <td>{{ list.start_validity_date }} ~ {{ list.end_validity_date }}</td>
              <td>
                {{ list.update_data }}
              </td>
              <td>
                <button class="mod-btn">
                  <i>{{ $t('common.modify') }}</i>
                </button>
                <button class="del-btn">
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
import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/commons/SearchForm.vue';
import ListForm from '@/components/commons/ListForm.vue';
import ServiceModule from '@/store/modules/ServiceModule';
import { ServiceResponse } from '@/types/ServiceType';

@Component({
  components: {
    SearchForm,
    ListLayout,
    ListForm,
  },
})
export default class ServiceManagementPage extends Vue {
  title = this.$t('service.title');
  listTitle = '서비스 리스트';
  serviceModule = getModule(ServiceModule, this.$store);

  searchOption = [
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
  ];

  get listOption(): ServiceResponse[] {
    return this.serviceModule.services;
  }

  created() {
    this.serviceModule.getServiceList();
  }
}
</script>
