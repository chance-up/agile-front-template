<template>
  <div class="form-floating">
    <input type="text" class="form-control" id="floatingInput" placeholder="cschoi" />
    <label id="floatingInput" for="floatingInput">User Name</label>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Input extends Vue {}
</script>
<style scoped>
#floatingInput {
  margin-left: 10%;
}
</style>
