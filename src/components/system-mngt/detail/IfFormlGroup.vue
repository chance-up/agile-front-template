<template>
  <li>
    <label class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="tb-wrap">
        <table class="sm-tb">
          <caption>
            URL 항목 테이블
          </caption>
          <colgroup>
            <col width="10%" />
            <col width="*" />
          </colgroup>
          <thead>
            <tr>
              <th>No.</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(endPoint, index) in endPoints" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="tl">{{ endPoint }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class IfFormlGroup extends Vue {
  @Prop() public inputNm!: string | null;
  @Prop() public endPoints!: object | null;
}
</script>
