<template>
  <div><TimeGroup @changeTime="handle" /></div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TimeGroup from '@/components/monitoring/TimeGroup.vue';

@Component({ components: { TimeGroup } })
export default class ControlPage extends Vue {
  servicePath = '';
  handle(event: any) {
    console.log(event);
  }
}
</script>
<style lang=""></style>
