<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="date-wrap">
        <div class="date-cont">
          <input
            type="text"
            id=""
            class="input-box"
            :placeholder="placeholderStart"
            :value="startDt"
            @input="$emit('input', $event.target.value)"
          />
          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
        <span class="text">~</span>
        <div class="date-cont">
          <input
            type="text"
            id=""
            class="input-box"
            :placeholder="placeholderENd"
            :value="endDt"
            @input="$emit('input', $event.target.value)"
          />
          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync, Watch } from 'vue-property-decorator';

@Component
export default class DateGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) placeholderStart!: string;
  @Prop({ default: '' }) placeholderENd!: string;
  @Prop({ default: '' }) startDt!: string;
  @Prop({ default: '' }) endDt!: string;

  @PropSync('childValueStart', { type: String })
  syncedStartValue!: string;

  startDate = null;
  @Watch('startDate')
  startDateChanged(val: string) {
    this.syncedStartValue = val;
  }

  @PropSync('childValueEnd', { type: String })
  syncedEndValue!: string;

  endDate = null;
  @Watch('endDate')
  endDateChanged(val: string) {
    this.syncedEndValue = val;
  }
}
</script>
