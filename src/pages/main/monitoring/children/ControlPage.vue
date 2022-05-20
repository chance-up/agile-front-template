<template>
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">관제</h1>
    </div>
    <div class="tab-wrap">
      <ul>
        <li :class="{ on: navState.controllServiceState }">
          <router-link :to="{ name: 'controll-service' }">Service</router-link>
        </li>
        <li :class="{ on: navState.controllApiState }">
          <router-link :to="{ name: 'controll-api' }">API</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </article>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

interface NavState {
  [key: string]: boolean;
  controllServiceState: boolean;
  controllApiState: boolean;
}

@Component({})
export default class ControlPage extends Vue {
  navState: NavState = {
    controllServiceState: false,
    controllApiState: false,
  };

  @Watch('$route', { immediate: true, deep: true })
  onRouteChange(newVal: any) {
    if (newVal.name === 'controll-service') {
      this.navState.controllServiceState = true;
      this.navState.controllApiState = false;
    } else if (newVal.name === 'controll-api') {
      this.navState.controllServiceState = false;
      this.navState.controllApiState = true;
    }
  }
}
</script>
<style lang=""></style>
