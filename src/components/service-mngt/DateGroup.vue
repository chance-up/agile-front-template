<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="date-wrap">
        <div class="date-cont">
          <date-picker valueType="format" v-model="start"></date-picker>

          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
        <span class="text">~</span>
        <div class="date-cont">
          <date-picker valueType="format" v-model="end"></date-picker>

          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
      </div>
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

  // time1 = null;
  // time2 = null;
  // time3 = null;

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
}
</script>
