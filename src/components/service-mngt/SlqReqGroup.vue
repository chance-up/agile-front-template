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
            on: showHr,
            '': !showHr,
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
            on: showMon,
            '': !showMon,
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
        <div class="sla-form" v-if="showMon">
          <label class="label">Month : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="month" min="1" step="1" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showDay">
          <label class="label">Day : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="day" min="1" step="1" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showHr">
          <label class="label">Hour : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="hour" min="1" step="1" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showMin">
          <label class="label">Min : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="min" min="1" step="1" />
          <span>건</span>
        </div>
        <div class="sla-form" v-if="showSec">
          <label class="label">Sec : </label>
          <input type="number" id="" class="input-box" placeholder="입력해주세요" v-model="sec" min="1" step="1" />
          <span>건</span>
        </div>
      </div>
      <p
        v-if="
          (showSec && sec == null) ||
          (showMin && min == null) ||
          (showHr && hour == null) ||
          (showDay && day == null) ||
          (showMon && month == null)
        "
        class="red-txt noti"
      >
        {{ $t('service.empty_check') }}
      </p>
      <p
        v-else-if="
          (showSec && sec == '') ||
          (showMin && min == '') ||
          (showHr && hour == '') ||
          (showDay && day == '') ||
          (showMon && month == '')
        "
        class="red-txt noti"
      >
        {{ $t('service.empty_check') }}
      </p>
      <p
        v-else-if="
          (showSec && sec == 0) ||
          (showMin && min == 0) ||
          (showHr && hour == 0) ||
          (showDay && day == 0) ||
          (showMon && month == 0)
        "
        class="red-txt noti"
      >
        1 이상의 값을 입력해주세요.
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
  showSec = false;
  @Watch('showSec')
  showSecChange() {
    this.$emit('update:onSec', false);
  }

  showMin = false;
  @Watch('showMin')
  showMinChange() {
    this.$emit('update:onMin', false);
  }

  showHr = false;
  @Watch('showHr')
  showHrChange() {
    this.$emit('update:onHr', false);
  }

  showDay = false;
  @Watch('showDay')
  showDayChange() {
    this.$emit('update:onDay', false);
  }

  showMon = false;
  @Watch('showMon')
  showMonChange() {
    this.$emit('update:onMon', false);
  }

  get sec() {
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
      this.showHr = true;
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
      this.showMon = true;
    }
    return this.monthVal;
  }
  set month(val: number | null) {
    this.$emit('update:monthVal', val);
  }

  mounted() {
    if (this.sec != null) {
      this.showSec = true;
    }
    if (this.min != null) {
      this.showMin = true;
    }
    if (this.hour != null) {
      this.showHr = true;
    }
    if (this.day != null) {
      this.showDay = true;
    }
    if (this.month != null) {
      this.showMon = true;
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
      this.showMon == false &&
      this.showDay == false &&
      this.showHr == false &&
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
      this.showMon == false &&
      this.showDay == false &&
      this.showHr == false &&
      this.showMin == false &&
      this.showSec == false
    ) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  clickHour() {
    this.showHr = !this.showHr;
    this.hour = null;
    if (
      this.showMon == false &&
      this.showDay == false &&
      this.showHr == false &&
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
      this.showMon == false &&
      this.showDay == false &&
      this.showHr == false &&
      this.showMin == false &&
      this.showSec == false
    ) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  clickMonth() {
    this.showMon = !this.showMon;
    this.month = null;
    if (
      this.showMon == false &&
      this.showDay == false &&
      this.showHr == false &&
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
      this.showHr = false;
      this.showDay = false;
      this.showMon = false;
      this.sec = null;
      this.min = null;
      this.hour = null;
      this.day = null;
      this.month = null;
    }
  }
}
</script>
