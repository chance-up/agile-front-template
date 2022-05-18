<template>
  <div>
    <header class="header-wrap">
      <aside class="logo">
        <a href="javascript:void(0)"><img src="@/assets/logo.svg" alt="API G/W Admin logo" /></a>
      </aside>

      <!------- navigation -------->
      <nav id="navi">
        <ul>
          <li :class="{ on: navState.dashboardState }" @click="changeNavState('dashboardState')">
            <router-link :to="`${dashBoardPath}`">Home</router-link>
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
          <li :class="{ on: navState.monitoringState }" @click="changeShowMornitoring">
            <a href="javascript:void(0)">모니터링</a>
            <div class="depth-menu" v-if="navState.showMornitoring">
              <ul>
                <li>
                  <i><img src="@/assets/user_ico.svg" alt="사용자 관리" /></i>
                  <!-- <router-link :to="`${mornitoringPath}`">모니터링</router-link> -->
                  <router-link :to="`${mornitoringPath}`" @click="changeNavState('monitoringState')">관제</router-link>
                </li>
                <li>
                  <i><img src="@/assets/power_ico.svg" alt="권한관리" /></i>
                  <a href="javascript:void(0)" @click="changeNavState('monitoringState')">통계</a>
                </li>
                <li>
                  <i><img src="@/assets/power_ico.svg" alt="권한관리" /></i>
                  <a href="javascript:void(0)" @click="changeNavState('monitoringState')">트래픽</a>
                </li>
              </ul>
            </div>
          </li>
          <li :class="{ on: navState.managementState }" @click="changeShowManagement">
            <!-- <button @click="navState.showManagement = !navState.showManagement">ss</button> -->
            <!-- <a href="javascript:void(0)" @click="test2">Menagement</a> -->
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
        <p><a class="link" @click="logOut">로그아웃</a></p>
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
  dashBoardState: boolean;
  systemState: boolean;
  apiState: boolean;
  serviceState: boolean;
  monitoringState: boolean;
  managementState: boolean;
  showMornitoring: boolean;
  showManagement: boolean;
}
@Component
export default class MainHeader extends Vue {
  changeShowMornitoring() {
    if (!this.navState.showMornitoring) {
      this.navState.showMornitoring = true;
      if (this.navState.showManagement) {
        this.navState.showManagement = false;
      }
    } else {
      this.navState.showMornitoring = false;
    }
  }
  changeShowManagement() {
    if (!this.navState.showManagement) {
      this.navState.showManagement = true;
      if (this.navState.showMornitoring) {
        this.navState.showMornitoring = false;
      }
    } else {
      this.navState.showManagement = false;
    }
  }

  dashBoardPath = '/dashboard';
  systemPath = SYSTEM;
  apiPath = API;
  servicePath = SERVICE;
  mornitoringPath = MONITORING;
  managementPath = MANAGEMENT;

  navState: NavState = {
    dashBoardState: true,
    systemState: false,
    apiState: false,
    serviceState: false,
    monitoringState: false,
    managementState: false,
    showMornitoring: false,
    showManagement: false,
  };

  userModule = getModule(UserModule, this.$store);

  get loginUser(): UserResponse {
    return this.userModule.loginUser;
  }

  changeNavState(state: string) {
    console.log(state);
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

  logOut() {
    this.userModule.logout();
    this.$router.push({ name: 'login' });
  }
}
</script>
<style>
#navi {
  flex: 1;
  margin-top: 12px;
  text-align: right;
  padding-right: 80px;
}
#navi ul li {
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  margin-right: 70px;
}
#navi ul li:last-child {
  margin-right: 0px;
}
#navi ul li a {
  color: #333;
}
#navi ul li a:hover {
  color: #8041f7;
  text-decoration: none;
}

#navi ul li.on a {
  color: #8041f7;
}

#navi ul li > .depth-menu {
  display: block;
  margin-top: 10px;
  padding: 25px 25px;
  width: 140px;
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
}
#navi ul li > .depth-menu ul li a {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #333;
}
</style>
