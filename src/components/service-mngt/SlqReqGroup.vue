<template>
  <li>
    <label class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <select v-model="SLA" class="select-box">
          <option value="none">none</option>
          <option value="TPS">TPS</option>
          <option value="total">총량</option>
        </select>
      </div>

      <div v-if="SLA == 'total'" class="form-group sla-form">
        <!--  총량  -->
        <select class="select-box mr15" v-model="totalType" @focus="noticeType()">
          <option value="MINITUE">분</option>
          <option value="HOUR">시</option>
          <option value="DAY">일</option>
          <option value="MONTH">월</option>
        </select>
        <input type="text" id="" class="input-box" placeholder="number" v-model="totalCount" @focus="noticeCount()" />
        <span>건</span>
      </div>

      <div v-if="SLA == 'TPS'" class="form-group sla-form">
        <input type="text" id="" class="input-box lg" placeholder="number" v-model="TPSCount" @focus="noticeCount()" />
        <span>건</span>
      </div>
      <p
        v-if="
          (showCount && SLA == 'total' && !totalCount) ||
          (showType && SLA == 'total' && !totalType) ||
          (showCount && SLA == 'TPS' && !TPSCount)
        "
        class="red-txt noti"
      >
        해당 항목은 필수 입력값입니다.
      </p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SlaReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) SLAn!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: 0 }) totalCnt!: number;
  @Prop({ default: 0 }) TPSCnt!: number;

  get SLA() {
    return this.SLAn;
  }
  set SLA(val: string) {
    this.showType = false;
    this.showCount = false;
    this.$emit('update:SLAn', val);
  }

  get totalType() {
    return this.type;
  }
  set totalType(val: string) {
    this.$emit('update:type', val);
  }

  get totalCount() {
    return this.totalCnt;
  }
  set totalCount(val: number) {
    this.$emit('update:totalCnt', val);
  }

  get TPSCount() {
    return this.TPSCnt;
  }
  set TPSCount(val: number) {
    this.$emit('update:TPSCnt', val);
  }

  showType = false;

  noticeType() {
    this.showType = true;
  }
  showCount = false;

  noticeCount() {
    this.showCount = true;
  }
}
</script>
