<template lang="">
  <li>
    <label for="" class="label" :class="{ point: required }">{{ groupNm }}</label>

    <div v-if="type == 'text'" class="form-cont">
      <input type="text" id="" class="input-box lg" :class="{ 'check-ok': check }" />
    </div>

    <div v-if="type == 'textarea'" class="form-cont">
      <textarea class="textarea"></textarea>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextForm extends Vue {
  @Prop() type!: string | null;
  @Prop() groupNm!: string | null;
  @Prop({ default: false }) check!: boolean | null;
  @Prop({ default: false }) required!: boolean | null;
}
</script>
