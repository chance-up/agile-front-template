<template>
  <li>
    <div class="list-comp" @click="onClickRow">
      <div class="stati-group">
        <h4 class="h4-tit">service_ID_001</h4>
        <div class="other-cont">
          <div class="stick-cont">
            <span class="stick minor"></span>
            <span class="stick major"></span>
            <span class="stick critical"></span>
          </div>

          <span class="text">Total : <em class="purple">208</em></span>
          <span class="text">Success : <em class="syan">200</em></span>
          <span class="text">Fail : <em class="red">8</em></span>

          <span class="success"><em>90</em>%</span>
        </div>
      </div>

      <button class="more-btn">
        <i><img src="@/assets/dropup_ico.svg" alt="더보기" title="더보기" /></i>
      </button>
    </div>

    <div v-if="isOpen" class="stati-detail" :class="{ block: isOpen, none: !isOpen }">
      <div class="result-group">
        <div class="comp">
          <label class="badge syan">Success</label>
          <span class="text">200</span>
        </div>
      </div>

      <div class="result-group">
        <div class="comp">
          <label class="badge red">Fail</label>
          <span class="text">8</span>
        </div>

        <div class="comp">
          <ul class="error-list">
            <li class="minor">
              <span class="text"><strong>에러코드</strong> + 에러 메세지</span>
              <span class="text ml10">[<strong>2</strong>]</span>
            </li>
            <li class="major">
              <span class="text"><strong>에러코드</strong> + 에러 메세지</span>
              <span class="text ml10">[<strong>3</strong>]</span>
            </li>
            <li class="critical">
              <span class="text"><strong>에러코드</strong> + 에러 메세지</span>
              <span class="text ml10">[<strong>3</strong>]</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- // api -->
  </li>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ApiRow extends Vue {
  isOpen = false;
  onClickRow() {
    this.isOpen = !this.isOpen;
  }
}
</script>
