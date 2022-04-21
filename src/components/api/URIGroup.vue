<template lang="">
  <li>
    <label class="label">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <img class="img" src="@/assets/in.svg" alt="uri" />
        <span>{{ uriSer }}</span>
      </div>
      <div class="form-group">
        <img class="img" src="@/assets/out.svg" alt="uri" />
        <span>{{ uriSys }}</span>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class URIGroup extends Vue {
  @Prop() public inputNm!: string | null;
  @Prop() public uriSer!: string | null;
  @Prop() public uriSys!: string | null;
}
</script>
