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
            <router-link :to="`${homePath}`">Home</router-link>
          </li>
          <li :class="{ on: navState.systemState }" @click="changeNavState('systemState')">
            <router-link :to="`${systemPath}`">시스템 관리</router-link>
          </li>
          <li :class="{ on: navState.apiState }" @click="changeNavState('apiState')">
            <router-link :to="`${apiPath}`">API관리</router-link>
          </li>
          <li :class="{ on: navState.serviceState }" @click="changeNavState('serviceState')">
            <router-link :to="`${servicePath}`">서비스 관리</router-link>
          </li>
          <li :class="{ on: navState.monitoringState }" @click="changeNavState('monitoringState')">
            <router-link :to="`${mornitoringPath}`">모니터링</router-link>
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
        <i @click="goMyPage"><img src="@/assets/member_ico.svg" alt="멤버 아이콘" /></i>
      </div>
    </header>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import UserModule from '@/store/modules/UserModule';

import { SYSTEM, SERVICE, API, MONITORING, MANAGEMENT } from '@/router/Names';
import { UserResponse } from '@/types/UserType';

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
  homePath = '/home';
  systemPath = SYSTEM;
  apiPath = API;
  servicePath = SERVICE;
  mornitoringPath = MONITORING;
  managementPath = MANAGEMENT;

  navState: NavState = {
    homeState: true,
    systemState: false,
    apiState: false,
    serviceState: false,
    monitoringState: false,
    showManagement: false,
  };

  userModule = getModule(UserModule, this.$store);

  get loginUser(): UserResponse {
    return this.userModule.loginUser;
  }

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

  goMyPage() {
    this.$router.push({ name: 'my', params: { id: this.loginUser.id } });
  }
}
</script>
<style></style>
