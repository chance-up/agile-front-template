<template>
  <ListLayout :title="title">
    <template slot="search-form">
      <SearchForm :searchPanelOption="searchOption" />
    </template>
    <template slot="list-form">
      <ListForm :title="listOption.listMainTitle">
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
              <th>No.</th>
              <th>서비스명</th>
              <th>서비스ID</th>
              <th>인증수단</th>
              <th>유효기간</th>
              <th>Update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(list, index) in listOption.listArrays" :key="index">
              <td>{{ list.no }}</td>
              <td>
                <span class="bold">{{ list.serviceName }}</span>
              </td>
              <td>{{ list.serviceId }}</td>
              <td>{{ list.authMethod }}</td>
              <td>
                {{ list.period }}
              </td>
              <td>
                {{ list.update }}
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
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import ListLayout from '@/components/layout/ListLayout.vue';
import SearchForm from '@/components/system/SearchForm.vue';
import ListForm from '@/components/system/ListForm.vue';

@Component({
  components: {
    SearchForm,
    ListLayout,
    ListForm,
  },
})
export default class ServiceManagementPage extends Vue {
  title = '서비스 관리';

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

  listOption = {
    listMainTitle: '서비스 리스트',
    listArrays: [
      {
        no: '1',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '2',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '3',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '4',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '5',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '6',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '7',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '8',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '9',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
      {
        no: '10',
        serviceName: '서비스명 텍스트 길이 얼마나 긴가요',
        serviceId: '서비스ID_title',
        authMethod: 'Basic Auth',
        period: 'YYYY-MM-DD ~ YYYY-MM-DD',
        update: 'YYYY-MM-DD hh:mm:ss',
      },
    ],
  };
}
</script>
