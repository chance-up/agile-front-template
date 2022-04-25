<template lang="">
  <li>
    <label class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <span
          v-for="(item, index) in methods"
          :key="index"
          class="badge"
          :class="{
            syan: item == 'GET',
            red: item == 'DELETE',
            blue: item == 'POST',
            violet: item == 'PUT',
          }"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MethodGroup extends Vue {
  @Prop() public inputNm!: string | null;
  @Prop() public methods!: string[];
}
</script>
