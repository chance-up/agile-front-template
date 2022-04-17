<template>
  <div>
    <nav>
      <img class="main-image" :src="require('@/assets/apigwLogo.png')" />
      <router-link to="/home">Home</router-link> |
      <router-link to="/platform">플랫폼 관리</router-link> |
      <router-link to="/api">API관리</router-link>|
      <router-link to="/serviceAuth">인증관리</router-link> |
      <router-link to="/monitoring">모니터링</router-link>|
      <router-link to="/management">Management</router-link>
    </nav>
    <!-- <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event)"></vue-dropdown> -->
    <h5>This is Main Page</h5>

    <router-view />
  </div>
</template>
<script>
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class MainPage extends Vue {}
</script>
<style scoped>
.main-image {
  max-width: 10%;
  margin: 30px;
}
</style>
