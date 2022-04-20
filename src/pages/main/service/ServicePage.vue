<template>
  <ListLayout :title="title">
    <template slot="search-form">
      <SearchForm />
    </template>
    <template slot="list-form">
      <ListForm :title="listOption.listMainTitle">
        <template slot="list-table">
          <caption>
            서비스명, 서비스ID, 인증수단, 유효기간, Update, 수정, 삭제 항목 테이블
          </caption>
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
            <tr>
              <td>1</td>
              <td><span class="bold">서비스명 텍스트 길이 얼마나 긴가요</span></td>
              <td>서비스ID_title</td>
              <td>Basic Auth</td>
              <td><span>YYYY-MM-DD</span> ~ <span>YYYY-MM-DD</span></td>
              <td>
                <p>YYYY-MM-DD hh:mm:ss</p>
              </td>
              <td>
                <button class="mod_btn"><i>수정</i></button>
                <button class="del_btn"><i>삭제</i></button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td><span class="bold">서비스명 텍스트 길이 얼마나 긴가요</span></td>
              <td>서비스ID_title</td>
              <td>Basic Auth</td>
              <td><span>YYYY-MM-DD</span> ~ <span>YYYY-MM-DD</span></td>
              <td>
                <p>YYYY-MM-DD hh:mm:ss</p>
              </td>
              <td>
                <button class="mod_btn"><i>수정</i></button>
                <button class="del_btn"><i>삭제</i></button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td><span class="bold">서비스명 텍스트 길이 얼마나 긴가요</span></td>
              <td>서비스ID_title</td>
              <td>Basic Auth</td>
              <td><span>YYYY-MM-DD</span> ~ <span>YYYY-MM-DD</span></td>
              <td>
                <p>YYYY-MM-DD hh:mm:ss</p>
              </td>
              <td>
                <button class="mod_btn"><i>수정</i></button>
                <button class="del_btn"><i>삭제</i></button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td><span class="bold">서비스명 텍스트 길이 얼마나 긴가요</span></td>
              <td>서비스ID_title</td>
              <td>Basic Auth</td>
              <td><span>YYYY-MM-DD</span> ~ <span>YYYY-MM-DD</span></td>
              <td>
                <p>YYYY-MM-DD hh:mm:ss</p>
              </td>
              <td>
                <button class="mod_btn"><i>수정</i></button>
                <button class="del_btn"><i>삭제</i></button>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td><span class="bold">서비스명 텍스트 길이 얼마나 긴가요</span></td>
              <td>서비스ID_title</td>
              <td>Basic Auth</td>
              <td><span>YYYY-MM-DD</span> ~ <span>YYYY-MM-DD</span></td>
              <td>
                <p>YYYY-MM-DD hh:mm:ss</p>
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
import ServiceDetailPage from './detail/ServiceDetailPage.vue';
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
  listOption = {
    listMainTitle: '서비스 리스트',
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
