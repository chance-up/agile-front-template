<template>
  <li>
    <label class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="sla-toggle">
        <button
          class="btn-toggle"
          :class="{
            on: showSec,
            '': !showSec,
          }"
          @click="clickSec()"
        >
          Sec
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: showMin,
            '': !showMin,
          }"
          @click="clickMin()"
        >
          Min
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: showHour,
            '': !showHour,
          }"
          @click="clickHour()"
        >
          Hour
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: showDay,
            '': !showDay,
          }"
          @click="clickDay()"
        >
          Day
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: showMonth,
            '': !showMonth,
          }"
          @click="clickMonth()"
        >
          Month
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: none,
            '': !none,
          }"
          @click="clickNone()"
        >
          None
        </button>
      </div>

      <div class="sla-group">
        <div class="sla-form" v-if="showMonth">
          <label class="label">Month : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="month" min="1" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showDay">
          <label class="label">Day : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="day" min="1" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showHour">
          <label class="label">Hour : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="hour" min="1" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showMin">
          <label class="label">Min : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="min" min="1" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showSec">
          <label class="label">Sec : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="sec" min="1" />
          <span>건</span>
        </div>
      </div>
      <p
        v-if="
          (showSec && sec == null) ||
          (showMin && min == null) ||
          (showHour && hour == null) ||
          (showDay && day == null) ||
          (showMonth && month == null)
        "
        class="red-txt noti"
      >
        {{ $t('service.empty_check') }}
      </p>
      <p
        v-if="
          (showSec && sec == '') ||
          (showMin && min == '') ||
          (showHour && hour == '') ||
          (showDay && day == '') ||
          (showMonth && month == '')
        "
        class="red-txt noti"
      >
        {{ $t('service.empty_check') }}
      </p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class SlaReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: null }) secVal!: number | null;
  @Prop({ default: null }) minVal!: number | null;
  @Prop({ default: null }) hourVal!: number | null;
  @Prop({ default: null }) dayVal!: number | null;
  @Prop({ default: null }) monthVal!: number | null;
  @Prop({ default: false }) onSec!: boolean;
  @Prop({ default: false }) onMin!: boolean;
  @Prop({ default: false }) onHour!: boolean;
  @Prop({ default: false }) onDay!: boolean;
  @Prop({ default: false }) onMonth!: boolean;

  none = false;

  get showSec() {
    return this.onSec;
  }
  set showSec(val: boolean) {
    this.$emit('update:onSec', val);
  }

  get showMin() {
    return this.onMin;
  }
  set showMin(val: boolean) {
    this.$emit('update:onMin', val);
  }

  get showHour() {
    return this.onHour;
  }
  set showHour(val: boolean) {
    this.$emit('update:onHour', val);
  }

  get showDay() {
    return this.onDay;
  }
  set showDay(val: boolean) {
    this.$emit('update:onDay', val);
  }

  get showMonth() {
    return this.onMonth;
  }
  set showMonth(val: boolean) {
    this.$emit('update:onMonth', val);
  }

  get sec() {
    return this.secVal;
  }
  set sec(val: number | null) {
    console.log(val);

    this.$emit('update:secVal', val);
  }

  get min() {
    if (this.minVal != null) {
      this.showMin = true;
    }
    return this.minVal;
  }
  set min(val: number | null) {
    this.$emit('update:minVal', val);
  }

  get hour() {
    if (this.hourVal != null) {
      this.showHour = true;
    }
    return this.hourVal;
  }
  set hour(val: number | null) {
    this.$emit('update:hourVal', val);
  }

  get day() {
    if (this.dayVal != null) {
      this.showDay = true;
    }
    return this.dayVal;
  }
  set day(val: number | null) {
    this.$emit('update:dayVal', val);
  }

  get month() {
    if (this.monthVal != null) {
      this.showMonth = true;
    }
    return this.monthVal;
  }
  set month(val: number | null) {
    this.$emit('update:monthVal', val);
  }

  created() {
    if (this.sec != null) {
      this.showSec = true;
    }
    if (this.min != null) {
      this.showSec = true;
    }
    if (this.hour != null) {
      this.showSec = true;
    }
    if (this.day != null) {
      this.showSec = true;
    }
    if (this.month != null) {
      this.showSec = true;
    }
    if (
      this.monthVal == null &&
      this.dayVal == null &&
      this.hourVal == null &&
      this.minVal == null &&
      this.secVal == null
    ) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  clickSec() {
    this.showSec = !this.showSec;
    this.sec = null;
    if (
      this.showMonth == false &&
      this.showDay == false &&
      this.showHour == false &&
      this.showMin == false &&
      this.showSec == false
    ) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  clickMin() {
    this.showMin = !this.showMin;
    this.min = null;
    if (
      this.showMonth == false &&
      this.showDay == false &&
      this.showHour == false &&
      this.showMin == false &&
      this.showSec == false
    ) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  clickHour() {
    this.showHour = !this.showHour;
    this.hour = null;
    if (
      this.showMonth == false &&
      this.showDay == false &&
      this.showHour == false &&
      this.showMin == false &&
      this.showSec == false
    ) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  clickDay() {
    this.showDay = !this.showDay;
    this.day = null;
    if (
      this.showMonth == false &&
      this.showDay == false &&
      this.showHour == false &&
      this.showMin == false &&
      this.showSec == false
    ) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  clickMonth() {
    this.showMonth = !this.showMonth;
    this.month = null;
    if (
      this.showMonth == false &&
      this.showDay == false &&
      this.showHour == false &&
      this.showMin == false &&
      this.showSec == false
    ) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  clickNone() {
    this.none = !this.none;
    if (this.none) {
      this.$emit('update:isvalid', true);
      this.showSec = false;
      this.showMin = false;
      this.showHour = false;
      this.showDay = false;
      this.showMonth = false;
      this.sec = null;
      this.min = null;
      this.hour = null;
      this.day = null;
      this.month = null;
    }
  }
}
</script>
