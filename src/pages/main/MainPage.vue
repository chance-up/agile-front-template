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
    <!-- <nav>
      <router-link to="/dashboard">Monitoring</router-link> |
      <router-link to="/log">Log</router-link> |
      <router-link to="/statistic">Statictic</router-link> |
      <router-link to="/traffic">Traffic</router-link>
    </nav> -->
    <h5>This is Main Page</h5>

    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.main-image {
  max-width: 10%;
  margin: 30px;
}
</style>
