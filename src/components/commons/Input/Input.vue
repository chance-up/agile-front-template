<template>
  <div class="form-floating">
    <input type="text" class="form-control" id="floatingInput" v-model="inputValue" />
    <label id="floatingInput" for="floatingInput">User Name</label>
  </div>
</template>
<script lang="ts">
import { Component, Vue, PropSync, Watch } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @PropSync('childValue', { type: String })
  syncedChildValue!: string;

  inputValue = null;
  @Watch('inputValue')
  onChildChanged(val: string) {
    this.syncedChildValue = val;
  }
}
</script>
<style scoped>
#floatingInput {
  margin-left: 10%;
}
</style>
