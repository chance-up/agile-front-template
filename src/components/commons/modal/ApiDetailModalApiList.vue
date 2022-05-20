<template>
  <li>
    <!-- api -->
    <div class="list-comp">
      <div class="stati-group">
        <h4 class="h4-tit">{{ item.apiId }}</h4>
        <!-- <h4 class="h4-tit">{{ kind === 'svc' ? item.svcId : item.apiId }}</h4> -->
        <div class="other-cont">
          <div class="stick-cont">
            <span class="stick minor"></span>
            <span class="stick major"></span>
            <span class="stick critical"></span>
          </div>

          <span class="text"
            >Total : <em class="purple">{{ item.totCnt }}</em></span
          >
          <span class="text"
            >Success : <em class="syan">{{ item.sucesCnt }}</em></span
          >
          <span class="text"
            >Fail : <em class="red">{{ item.failCnt }}</em></span
          >

          <span class="success"
            ><em>{{ item.sucesRate }}</em
            >%</span
          >
        </div>
      </div>

      <button
        v-if="kind === 'svc' ? true : false"
        class="more-btn"
        @click="showStatiDetailBlock = !showStatiDetailBlock"
      >
        <i
          ><img
            :src="showStatiDetailBlock ? require('@/assets/dropdown_ico.svg') : require('@/assets/dropup_ico.svg')"
            alt="더보기"
            title="더보기"
        /></i>
      </button>
    </div>
    <div class="stati-detail block" v-if="showStatiDetailBlock">
      <div class="result-group">
        <div class="comp">
          <label class="badge syan">Success</label>
          <span class="text">{{ item.sucesCnt }}</span>
        </div>
      </div>

      <div class="result-group">
        <div class="comp">
          <label class="badge red">Fail</label>
          <span class="text">{{ item.failCnt }}</span>
        </div>

        <div class="comp">
          <ul class="error-list">
            <li class="minor">
              <span class="text"><strong>에러코드</strong> + 에러 메세지</span>
              <span class="text ml10"
                >[<strong>{{ item.miCnt }}</strong
                >]</span
              >
            </li>
            <li class="major">
              <span class="text"><strong>에러코드</strong> + 에러 메세지</span>
              <span class="text ml10"
                >[<strong>{{ item.maCnt }}</strong
                >]</span
              >
            </li>
            <li class="critical">
              <span class="text"><strong>에러코드</strong> + 에러 메세지</span>
              <span class="text ml10"
                >[<strong>{{ item.crCnt }}</strong
                >]</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- api -->
  </li>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { EachApi, EachService } from '@/types/MornitoringControllType';

@Component({
  components: {},
})
export default class ApiDetailModalApiList extends Vue {
  @Prop() kind!: string;
  @Prop() item!: EachApi;
  // apiList: EachApi[] = [];
  // oneApi!: EachApi;

  showStatiDetailBlock = false;
  // mounted() {
  //   if (this.kind === 'api') {
  //     this.apiList = this;
  //   } else {
  //     this.apiList = EachService.serviceList;
  //   }
  // }
  created() {
    console.log('qweqweqweqwsada', this.kind, this.item);
    if (this.kind === 'api') {
      this.showStatiDetailBlock = true;
    }
  }
}
</script>
