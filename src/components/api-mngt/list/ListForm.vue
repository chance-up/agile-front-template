<template>
  <div class="comp">
    <div class="tb-tit">
      <h2 class="h2-tit">{{ title }}</h2>
      <div class="btn-wrap">
        <button class="mid-btn" @click="$router.push({ name: 'api-register' })">
          <i><img src="@/assets/check_ico.svg" :alt="this.$t('api.register')" /></i>{{ this.$t('api.register') }}
        </button>
      </div>
    </div>
    <!--- sys list table --->
    <div class="tb-wrap">
      <table class="list-tb">
        <slot name="list-table" />
      </table>
    </div>
    <!--- // sys list table --->
  </div>
  <!--- // comp --->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListForm extends Vue {
  @Prop() title!: string;

  getDetailInfo() {
    console.log('getDetailInfo');
  }
}
</script>
