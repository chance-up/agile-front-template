<template>
  <li>
    <label class="label point">{{ $t('service.api_mngt') }}</label>
    <div class="form-cont">
      <button class="sm-btn" @click="showApiAuth">{{ inputNm }}</button>
    </div>
    <p v-if="!check" class="red-txt noti">{{ $t('service.valid_check_tkcgrNm') }}</p>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class ApiAuthReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: true }) setCheck!: boolean;

  showApiAuth() {
    this.$emit('showApiAuth');
  }

  check = true;
  @Watch('setCheck')
  setCheckChanged(val: boolean) {
    console.log(this.check);
    this.check = val;
  }
}
</script>
