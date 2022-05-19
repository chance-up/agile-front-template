<template>
  <div><TimeGroup /></div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import TimeGroup from '@/components/monitoring/TimeGroup.vue';

@Component({ components: { TimeGroup } })
export default class ControlPage extends Vue {
  servicePath = '';
}
</script>
<style lang=""></style>
