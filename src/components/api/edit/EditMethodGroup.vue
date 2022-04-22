<template lang="">
  <li>
    <label for="" class="label point">Method</label>
    <div class="form-cont">
      <div class="check-group">
        <div class="check-box">
          <div class="check"><input type="checkbox" id="checkGet" /><span class="checkmark"></span></div>
          <label for="checkGet">GET</label>
        </div>

        <div class="check-box">
          <div class="check"><input type="checkbox" id="checkPost" /><span class="checkmark"></span></div>
          <label for="checkPost">POST</label>
        </div>

        <div class="check-box">
          <div class="check"><input type="checkbox" id="checkPut" /><span class="checkmark"></span></div>
          <label for="checkPut">PUT</label>
        </div>

        <div class="check-box">
          <div class="check"><input type="checkbox" id="checkDelete" /><span class="checkmark"></span></div>
          <label for="checkDelete">DELETE</label>
        </div>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditMethodGoup extends Vue {}
</script>
