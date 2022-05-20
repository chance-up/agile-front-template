<template>
  <div class="search-wrap monitor-search key-search">
    <div class="border-cont search-cont">
      <h4 class="label-tit">기간 선택</h4>
      <div class="date-wrap">
        <div class="date-cont bg-white-date">
          <date-picker
            v-model="startDate"
            value-type="format"
            format="YYYY-MM-DD"
            placeholder="YYYY-MM-DD"
            :disabled-date="disabledAfterTodayAndAfterEndDay"
          ></date-picker>
        </div>
        <div class="date-cont bg-white-date">
          <date-picker
            type="time"
            v-model="startTime"
            value-type="format"
            format="HH:mm"
            placeholder="HH:MM"
            :disabled="startDate === ''"
            :disabled-time="disabledAfterNowOrAfterEndTime"
          ></date-picker>
        </div>
        <span class="text">~</span>
        <div class="date-cont bg-white-date">
          <date-picker
            v-model="endDate"
            value-type="format"
            format="YYYY-MM-DD"
            placeholder="YYYY-MM-DD"
            :disabled-date="disabledAfterTodayOrBeforeStartDay"
          ></date-picker>
        </div>
        <div class="date-cont bg-white-date">
          <date-picker
            type="time"
            v-model="endTime"
            value-type="format"
            format="HH:mm"
            placeholder="HH:MM"
            :disabled="endDate === ''"
            :disabled-time="disabledAfterNowOrBeforeStartTime"
          ></date-picker>
        </div>
      </div>
    </div>

    <!------- 서비스 ID 검색 -------->
    <div class="search-cont">
      <h4 class="label-tit">ID 검색</h4>

      <div class="service-search">
        <div class="word-wrap">
          <div v-for="(service, index) in selectedServices" :key="index" class="api-stick">
            <span>{{ service }}</span>
            <button>
              <i @click="unselectService"><img src="@/assets/close.svg" alt="닫기" :title="service" /></i>
            </button>
          </div>
        </div>

        <div class="multi-wrap">
          <input
            id="search-focus-input"
            type="text"
            class="input-box lg search-focus-input"
            placeholder="서비스 ID 검색"
            v-model="searchText"
          />
          <button class="mid-btn">
            <i><img src="@/assets/search_ico.svg" alt="검색" /></i>Search
          </button>
        </div>

        <!--  multi select -->
        <div id="search-focus-div" v-show="isFocus" class="multi-wrap search-focus-div">
          <div class="select-form">
            <!--  dropdown시 block class 추가-->
            <ul>
              <li v-for="(item, index) in serviceList" :key="index" @click="selectService">
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!--  // multi select -->
      </div>
    </div>
    <!------- // 서비스 ID 검색 -------->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
@Component({ components: { DatePicker } })
export default class SelectSearch extends Vue {
  @Prop({ default: true }) isFocus!: boolean;
  @Prop({ default: () => ['service1', 'service2', 'service3', 'service4', 'service5'] }) propServiceList!: string[];

  searchText = '';
  get serviceList() {
    return this.propServiceList.filter((item: string) => item.includes(this.searchText));
  }
  selectedServices: string[] = [];
  selectService(event: any) {
    const service = event.target.innerText as string;
    if (this.selectedServices.includes(service)) {
      return;
    }
    this.selectedServices.push(service);
    this.selectedServices = this.selectedServices.sort();
  }
  unselectService(event: any) {
    const service = event.target.title as string;
    this.selectedServices = this.selectedServices.filter((item: string) => item !== service);
  }
  startDate = '';
  startTime = '';
  endDate = '';
  endTime = '';
  disabledAfterTodayAndAfterEndDay(date: Date) {
    const today = new Date();
    const endDay = new Date(this.endDate);
    return date > today || date > endDay;
  }
  disabledAfterNowOrAfterEndTime(date: Date) {
    const now = new Date();
    const endTime = this.endDate && this.endTime ? new Date(this.endDate + 'T' + this.endTime) : new Date();
    return date > now || date > endTime;
  }

  disabledAfterTodayOrBeforeStartDay(date: Date) {
    const today = new Date();
    const startDay = this.startDate ? new Date(this.startDate + 'T' + '00:00:00') : new Date(0);
    return date > today || date < startDay;
  }

  disabledAfterNowOrBeforeStartTime(date: Date) {
    const now = new Date();
    const startTime =
      this.startDate && this.startTime ? new Date(this.startDate + 'T' + this.startTime + ':00') : new Date(0);
    return date >= now || date <= startTime;
  }
  // getRangeClasses(cellDate: Date, classnames: string) {
  //   const classes = [];
  //   const start = this.startDate && new Date(this.startDate+'T'+this.startTime);
  //   const end = this.endDate && new Date(this.endDate + 'T' + this.endTime);
  //   if (
  //     !/disabled|active|not-current-month/.test(classnames) &&
  //     start &&
  //     end &&
  //     cellDate.getTime() >= start &&
  //     cellDate.getTime() <= end
  //   ) {
  //     classes.push('in-range');
  //   }
  //   return classes;
  // }
}
</script>
<style>
.bg-white-date {
  padding-right: 14px;
}
.bg-white-date .mx-datepicker .mx-input {
  background-color: #fff;
  border: 1px #ddd solid;
}
</style>
