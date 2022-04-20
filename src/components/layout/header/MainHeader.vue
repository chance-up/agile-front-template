<template>
  <div>
    <header class="header-wrap">
      <aside class="logo">
        <a href="javascript:void(0)"><img src="@/assets/logo.svg" alt="API G/W Admin logo" /></a>
      </aside>

      <!------- navigation -------->
      <nav id="navi">
        <ul>
          <li class="on">
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/platform">플랫폼관리</a>
          </li>
          <li>
            <a href="/api">API관리</a>
          </li>
          <li>
            <a href="/serviceAuth">인증관리</a>
          </li>
          <li>
            <a href="/monitoring">모니터링</a>
          </li>
          <li>
            <a href="javascript:void(0)" @click="isActive = !isActive">Menagement</a>
            <div class="depth-menu" v-if="isActive">
              <ul>
                <li>
                  <i></i>
                  <a href="javascript:void(0)">사용자 관리</a>
                </li>
                <li>
                  <i></i>
                  <!-- <i><img src="@/assets/power_ico.svg" alt="권한관리" /></i> -->
                  <a href="javascript:void(0)">권한 관리</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <!------- // navigation -------->

      <div class="member-wrap">
        <p><span class="bold">홍길동</span>님</p>
        <p><a class="link" href="javascript:void(0)">로그아웃</a></p>
        <i><img src="@/assets/member_ico.svg" alt="멤버 아이콘" /></i>
      </div>
    </header>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MainHeader extends Vue {
  isActive = false;
}
</script>
<style>
#navi ul li > .depth-menu {
  display: block;
  margin-top: 10px;
  padding: 25px 25px;
  width: 110px;
  position: absolute;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 1px 1px 5px #ccc;
}
#navi ul li > .depth-menu ul li {
  display: block;
  position: relative;
  width: 100%;
  height: 20px;
  margin-bottom: 20px;
  text-align: left;
}
#navi ul li > .depth-menu ul li i {
  width: 20px;
  height: 20px;
  display: inline-block;
  background: url('') no-repeat center center;
}
#navi ul li > .depth-menu ul li a {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #333;
}
</style>
