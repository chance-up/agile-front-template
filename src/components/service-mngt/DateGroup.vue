<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="date-wrap">
        <div class="date-cont">
          <date-picker valueType="format" placeholder="YYYY-MM-DD" v-model="start" @focus="noticeStart()"></date-picker>

          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
        <span class="text">~</span>
        <div class="date-cont">
          <date-picker valueType="format" placeholder="YYYY-MM-DD" v-model="end" @focus="noticeEnd()"></date-picker>

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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
  @Prop({ default: false }) isvalid!: boolean | null;

  notiMessage: [boolean | null, boolean | null] = [null, null];
  @Watch('start')
  onStartChanged(val: string) {
    if (this.start == null || this.end == null || this.start == '' || this.end == '') {
      console.log(val);
      this.$emit('update:isvalid', false);
    } else {
      this.$emit('update:isvalid', true);
    }
  }
  @Watch('end')
  onEndChanged(val: string) {
    if (this.start == null || this.end == null || this.start == '' || this.end == '') {
      this.$emit('update:isvalid', false);
    } else {
      this.$emit('update:isvalid', true);
    }
  }

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
