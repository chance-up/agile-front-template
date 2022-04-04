<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Hello msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hello from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    Hello,
  },
})
export default class HomeView extends Vue {}
</script>
