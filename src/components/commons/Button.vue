<template>
  <button id="normal_button" type="button" class="btn btn-primary" @click="clickEvent">
    {{ text }}
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
//import { UserInfo } from '@/types/UserTypes';
//import { namespace } from 'vuex-class';
//const UserModule = namespace('UserModule');
@Component
export default class Button extends Vue {
  @Prop() private text!: string;
  @Prop() private aaa!: string;
  @Prop() private clickEvent!: () => void;
}
</script>
<style scoped>
#normal_button {
  width: 60%;
  height: 100%;
}
</style>
