<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="domain-wrap" v-for="(type, idx) in linkType" :key="idx">
        <select>
          <option>https</option>
          <option>http</option>
          <option v-for="(option, idx) in options" :key="idx" :value="option" :selected="option === options[type.type]">
            {{ option }}
          </option>
        </select>
        <span>://</span>
        <input type="text" id="" class="input-box mid" :placeholder="type.domain" />
        <span>:</span>
        <input type="text" id="" class="input-box sm" :placeholder="type.port" />
        <button>
          <i><img src="@/assets/plus.svg" alt="추가" /></i>
        </button>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { SystemInterfaceGroup } from '@/types/SystemType';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class LinkGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) linkType!: Array<SystemInterfaceGroup>;
  options: string[] = ['https', 'http'];
}
</script>
<style lang=""></style>
