<template>
  <div class="stati-wrap">
    <div class="tit-wrap">
      <h3 class="h3-tit">API List</h3>
      <p class="total">total : <span>8</span></p>
    </div>
    <div class="stati-list">
      <ul>
        <li>
          <!-- api -->
          <div class="list-comp">
            <div class="stati-group">
              <h4 class="h4-tit">sysID_001_API</h4>
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
          <div class="stati-detail block">
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
          <!-- api -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class ApiDetailModalApiList extends Vue {}
</script>
