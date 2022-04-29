<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="date-wrap">
        <div class="date-cont">
          <date-picker valueType="format" v-model="start" @focus="noticeStart()"></date-picker>

          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
        <span class="text">~</span>
        <div class="date-cont">
          <date-picker valueType="format" v-model="end" @focus="noticeEnd()"></date-picker>

          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
      </div>
      <p
        v-if="(showStart && !start) || (showStart && !end) || (showEnd && !start) || (showEnd && !end)"
        class="red-txt noti"
      >
        해당 헝목은 필수 입력값입니다.
      </p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

@Component({
  components: {
    DatePicker,
  },
})
export default class DateGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) placeholderStart!: string;
  @Prop({ default: '' }) placeholderENd!: string;
  @Prop({ default: null }) startDt!: string;
  @Prop({ default: null }) endDt!: string;

  get start() {
    return this.startDt;
  }
  set start(val: string) {
    this.$emit('update:startDt', val);
  }

  get end() {
    return this.endDt;
  }
  set end(val: string) {
    this.$emit('update:endDt', val);
  }
  showStart = false;
  showEnd = false;
  noticeStart() {
    this.showStart = true;
  }
  showCount = false;

  noticeEnd() {
    this.showEnd = true;
  }
}
</script>
