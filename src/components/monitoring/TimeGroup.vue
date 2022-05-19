<template>
  <div class="search-wrap monitor-search">
    <div class="search-cont">
      <h4 class="label-tit">기간 선택</h4>

      <div class="radio-group">
        <label class="radio-check" for="timeGroup24"
          >24Hour
          <input type="radio" name="timeGroup" value="radio" id="timeGroup24" />
          <span class="radiomark"></span>
        </label>
        <label class="radio-check" for="timeGroup12"
          >12Hour
          <input type="radio" name="timeGroup" value="radio" id="timeGroup12" />
          <span class="radiomark"></span>
        </label>
        <label class="radio-check" for="timeGroup6"
          >6Hour
          <input type="radio" name="timeGroup" value="radio" id="timeGroup6" />
          <span class="radiomark"></span>
        </label>
        <label class="radio-check" for="timeGroup1"
          >1Hour
          <input type="radio" name="timeGroup" value="radio" id="timeGroup1" />
          <span class="radiomark"></span>
        </label>
        <label class="radio-check" for="timeGroup30"
          >30Min
          <input type="radio" name="timeGroup" value="radio" id="timeGroup30" />
          <span class="radiomark"></span>
        </label>
        <label class="radio-check" for="timeGroup10"
          >10Min
          <input type="radio" name="timeGroup" value="radio" id="timeGroup10" />
          <span class="radiomark"></span>
        </label>
        <label class="radio-check" for="timeGroup5"
          >5Min
          <input type="radio" name="timeGroup" value="radio" id="timeGroup5" />
          <span class="radiomark"></span>
        </label>
      </div>
    </div>

    <div class="time-wrap">
      <span>2022.05.16 15:23:36</span>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ControlPage extends Vue {}
</script>
