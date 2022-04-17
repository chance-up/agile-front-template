<template>
  <div>
    <h1>This is Home Page!</h1>
    <Dropdown />
  </div>
</template>
<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import UserStore from '@/store/modules/UserModule';

import Dropdown from '@/components/commons/Dropdown.vue';

@Component({
  components: {
    Dropdown,
  },
})
export default class HomePage extends Vue {
  userModule = getModule(UserStore, this.$store);
}
</script>
<style lang=""></style>
