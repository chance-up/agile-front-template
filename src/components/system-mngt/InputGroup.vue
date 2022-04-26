<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <input
        :type="type"
        id=""
        :class="inputClass"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @change="checkEmail1"
      />
      <p v-if="validCheck !== ''" class="red-txt noti">{{ validCheck }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InputGroup extends Vue {
  @Prop({ default: '' }) type!: string;
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) placeholder!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: '' }) inputClass!: string;
  @Prop({ default: '' }) validCheck!: string;
  @Prop({ default: '' }) value!: string;

  checkEmail(): void {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    //let re = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    // console.log(re.test(this.systemItem.tkcgr_eml));
    // return re.test(this.systemItem.tkcgr_eml);
  }
  checkEmail1 = () => {
    console.log(this.value);
  };
}
</script>
<style lang=""></style>
