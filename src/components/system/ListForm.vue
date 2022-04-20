<template>
  <div class="comp">
    <div class="tb-tit">
      <h2 class="h2-tit">시스템 List</h2>
      <div class="btn-wrap">
        <button class="mid-btn">
          <i><img src="@/assets/check_ico.svg" alt="등록" /></i>등록
        </button>
      </div>
    </div>

    <!--- sys list table --->
    <div class="tb-wrap">
      <table class="list-tb">
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
          <tr v-for="(list, index) in option.listArrays" :key="index">
            <td
              v-for="(item, index2) in list"
              :key="index2"
              @click="getDetailInfo()"
              class="margin-right-10 cursor-pointer"
            >
              {{ item }}
            </td>
            <td>
              <button class="mod_btn"><i>수정</i></button>
              <button class="del_btn"><i>삭제</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--- // sys list table --->
  </div>
  <!--- // comp --->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListForm extends Vue {
  @Prop() option!: object;

  getDetailInfo() {
    console.log('getDetailInfo');
  }
}
</script>
