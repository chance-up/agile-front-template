<template>
  <div>
    <header class="header-wrap">
      <aside class="logo">
        <a href="javascript:void(0)"><img src="@/assets/logo.svg" alt="API G/W Admin logo" /></a>
      </aside>

      <!------- navigation -------->
      <nav id="navi">
        <ul>
          <li :class="{ on: navState.homeState }" @click="changeNavState('homeState')">
            <router-link to="/home">Home</router-link>
          </li>
          <li :class="{ on: navState.systemState }" @click="changeNavState('systemState')">
            <router-link to="/system_list">시스템 관리</router-link>
          </li>
          <li :class="{ on: navState.apiState }" @click="changeNavState('apiState')">
            <router-link to="/api">API관리</router-link>
          </li>
          <li :class="{ on: navState.serviceState }" @click="changeNavState('serviceState')">
            <router-link to="/service">서비스 관리</router-link>
          </li>
          <li :class="{ on: navState.monitoringState }" @click="changeNavState('monitoringState')">
            <router-link to="/monitoring">모니터링</router-link>
          </li>
          <li :class="{ on: navState.showManagement }" @click="navState.showManagement = !navState.showManagement">
            <a href="javascript:void(0)">Menagement</a>
            <div class="depth-menu" v-if="navState.showManagement">
              <ul>
                <li>
                  <i><img src="@/assets/user_ico.svg" alt="사용자 관리" /></i>
                  <a href="javascript:void(0)">사용자 관리</a>
                </li>
                <li>
                  <i><img src="@/assets/power_ico.svg" alt="권한관리" /></i>
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
      <h1>hahah{{ $router.fullPath }}</h1>
    </header>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

interface NavState {
  [key: string]: boolean;
  homeState: boolean;
  systemState: boolean;
  apiState: boolean;
  serviceState: boolean;
  monitoringState: boolean;
  showManagement: boolean;
}
@Component
export default class MainHeader extends Vue {
  navState: NavState = {
    homeState: true,
    systemState: false,
    apiState: false,
    serviceState: false,
    monitoringState: false,
    showManagement: false,
  };
  changeNavState(state: string) {
    for (const key of Object.keys(this.navState)) {
      this.navState[key] = false;
    }
    this.navState[state] = true;
  }

  created() {
    const path = this.$route.path;
    const paths = path.split('/');
    this.changeNavState(paths[1] + 'State');
  }
}
</script>
<style></style>
