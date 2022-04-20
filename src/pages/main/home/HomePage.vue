<template>
  <div>
    <h1>This is Home Page!</h1>
    <Dropdown />
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';

import Dropdown from '@/components/commons/Dropdown.vue';

@Component({
  components: {
    Dropdown,
  },
})
export default class HomePage extends Vue {}
</script>
<style lang=""></style>
