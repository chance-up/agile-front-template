<template>
  <div class="search-wrap monitor-search key-search">
    <div class="border-cont search-cont">
      <h4 class="label-tit">기간 선택</h4>

      <div class="date-wrap">
        <div class="date-cont">
          <input type="text" id="" class="input-box" placeholder="YYYY-MM-DD" />
          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
        <div class="date-cont">
          <input type="text" id="" class="input-box" placeholder="YYYY-MM-DD" />
          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
        <span class="text">~</span>
        <div class="date-cont">
          <input type="text" id="" class="input-box" placeholder="YYYY-MM-DD" />
          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
        <div class="date-cont">
          <input type="text" id="" class="input-box" placeholder="YYYY-MM-DD" />
          <i class="icon"><img src="@/assets/picker.svg" alt="달력아이콘" /></i>
        </div>
      </div>
    </div>

    <!------- 서비스 ID 검색 -------->
    <div class="search-cont">
      <h4 class="label-tit">ID 검색</h4>

      <div class="service-search">
        <div class="word-wrap">
          <div class="api-stick">
            <span>서비스_A_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="api-stick">
            <span>서비스_AA_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="api-stick">
            <span>서비스_AP_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="api-stick">
            <span>서비스_A_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="api-stick">
            <span>서비스_AA_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="api-stick">
            <span>서비스_AP_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="api-stick">
            <span>서비스_A_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="api-stick">
            <span>서비스_AA_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
          <div class="api-stick">
            <span>서비스_AP_01</span>
            <button>
              <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
            </button>
          </div>
        </div>

        <div class="multi-wrap">
          <input type="text" class="input-box lg" placeholder="서비스 ID 검색" />
          <button class="mid-btn">
            <i><img src="@/assets/search_ico.svg" alt="검색" /></i>Search
          </button>
        </div>

        <!--  multi select -->
        <div class="multi-wrap">
          <div class="select-form">
            <!--  dropdown시 block class 추가-->
            <ul>
              <li>
                <span>service123_01</span>
              </li>
              <li>
                <span>service123_012</span>
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
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class SelectSearch extends Vue {}
</script>
