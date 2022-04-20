<template>
  <div>
    <h1>This is Service Page!</h1>
    <ServiceDetailPage />
  </div>
</template>
<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import ServiceDetailPage from './detail/ServiceDetailPage.vue';

@Component({
  components: {
    ServiceDetailPage,
  },
})
export default class ServiceManagementPage extends Vue {}
</script>
