<template>
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">관제</h1>
    </div>

    <!------- tab -------->
    <div class="tab-wrap">
      <ul>
        <li><router-link :to="{ name: 'controll-service' }">Service</router-link></li>
        <!-- :class="{ on: navState.dashboardState }" -->
        <li><router-link :to="{ name: 'controll-api' }">API</router-link></li>
      </ul>
    </div>
    <router-view />
  </article>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ControlPage extends Vue {}
</script>
<style lang=""></style>
