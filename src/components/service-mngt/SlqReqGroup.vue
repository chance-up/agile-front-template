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
          @click="onSec()"
        >
          Sec
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: showMin,
            '': !showMin,
          }"
          @click="onMin()"
        >
          Min
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: showHour,
            '': !showHour,
          }"
          @click="onHour()"
        >
          Hour
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: showDay,
            '': !showDay,
          }"
          @click="onDay()"
        >
          Day
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: showMonth,
            '': !showMonth,
          }"
          @click="onMonth()"
        >
          Month
        </button>
        <button
          class="btn-toggle"
          :class="{
            on: none,
            '': !none,
          }"
          @click="onNone()"
        >
          None
        </button>
      </div>

      <div class="sla-group">
        <div class="sla-form" v-if="showMonth">
          <label class="label">Month : </label>
          <input type="text" id="" class="input-box" placeholder="입력해주세요" v-model="month" />
          <span>{{ month }}건</span>
        </div>
        <div class="sla-form" v-if="showDay">
          <label class="label">Day : </label>
          <input type="text" id="" class="input-box" placeholder="입력해주세요" v-model="day" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showHour">
          <label class="label">Hour : </label>
          <input type="text" id="" class="input-box" placeholder="입력해주세요" v-model="hour" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showMin">
          <label class="label">Min : </label>
          <input type="text" id="" class="input-box" placeholder="입력해주세요" v-model="min" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showSec">
          <label class="label">Sec : </label>
          <input type="text" id="" class="input-box" placeholder="입력해주세요" v-model="sec" />
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
        해당 항목은 필수 입력값입니다.
      </p>
      <p
        v-if="
          (showSec && sec == 0) ||
          (showSec && min == 0) ||
          (showHour && hour == 0) ||
          (showDay && day == 0) ||
          (showMonth && month == 0)
        "
        class="red-txt noti"
      >
        1 이상의 값을 입력해주세요.
      </p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SlaReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: null }) secVal!: number | null;
  @Prop({ default: null }) minVal!: number | null;
  @Prop({ default: null }) hourVal!: number | null;
  @Prop({ default: null }) dayVal!: number | null;
  @Prop({ default: null }) monthVal!: number | null;

  showSec = false;
  showMin = false;
  showHour = false;
  showDay = false;
  showMonth = false;
  none = false;

  get sec() {
    if (this.secVal != null) {
      this.showSec = true;
    }
    return this.secVal;
  }
  set sec(val: number | null) {
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

  onSec() {
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

  onMin() {
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

  onHour() {
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

  onDay() {
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

  onMonth() {
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

  onNone() {
    this.none = !this.none;
    if (this.none) {
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
