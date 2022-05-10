<template lang="">
  <li>
    <label class="label">{{ groupNm }}</label>
    <div class="form-cont">
      <!--  end-point list -->
      <div class="tb-wrap">
        <table class="sm-tb" v-if="edptList">
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
            <tr v-for="(edpt, index) in edptList" :key="index">
              <td>{{ index + 1 }}</td>
              <td class="tl">{{ edpt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  // end-point list -->
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EndPointGroup extends Vue {
  @Prop() groupNm!: string | null;
  @Prop() public edptList!: string[];
}
</script>
