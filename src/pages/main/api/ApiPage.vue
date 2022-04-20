<template>
  <div>
    <h1>This is API Page!</h1>
    <ApiDetailPage />
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import ApiDetailPage from './ApiDetailPage.vue';

@Component({
  components: {
    ApiDetailPage,
  },
})
export default class ApiPage extends Vue {}
</script>
