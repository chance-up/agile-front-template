<template lang="">
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="domain-wrap">
        <ul class="domain-list">
          <li v-for="(edpt, idx) in edpts" :key="idx">
            <div class="domain-cont">
              <select class="select-box" v-model="edpt.protocol">
                <option value="http" selected>http</option>
                <option value="https">https</option>
              </select>
              <span>://</span>
              <input
                type="text"
                :class="{
                  'check-ok': notiMessage[0] === true,
                  'check-false': notiMessage[0] === false,
                }"
                class="input-box mid"
                placeholder="도메인"
                v-model="edpt.domain"
                @input="validCheckDomain(idx)"
              />
              <span>:</span>
              <input
                type="text"
                class="input-box sm"
                placeholder="port"
                v-model="edpt.port"
                maxlength="5"
                @input="validCheckDomain(idx)"
              />
              <button class="xs-btn" @click="addEdpt" v-if="idx === 0">
                <i class="plus"></i>
              </button>
              <button class="xs-btn" @click="deleteEdpt(idx)" v-else><i class="minus"></i></button>
            </div>
            <p v-if="notiMessage[idx][0] == false" class="red-txt noti">{{ notiMessage[idx][1] }}</p>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { SystemEdptType } from '@/types/SystemType';
import { edptArrToStringArr, edptToString } from '@/utils/converter';
import { checkLength, checkEnglishNumber } from '@/utils/validation';
@Component
export default class EdptForm extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: () => [] }) edptArr!: string[];
  notiMessage: [boolean | null, string][] = [[null, '']];

  edpts: SystemEdptType[] = [
    {
      protocol: 'http',
      domain: '',
      port: '',
    },
  ];

  @Watch('edpts', { deep: true })
  edptsChanged() {
    this.$emit('update:edptArr', edptArrToStringArr(this.edpts));
  }

  addEdpt() {
    console.log(this.edpts);
    let empty = {
      protocol: 'http',
      domain: '',
      port: '',
    };
    this.edpts.push(empty);
    this.notiMessage.push([null, '']);
  }
  deleteEdpt(idx: number) {
    this.edpts.splice(idx, 1);
    this.notiMessage.splice(idx, 1);
  }

  duplCheck(val: string) {
    let strArr = edptArrToStringArr(this.edpts);
    for (let i = 0; i < strArr.length; i++) {
      if (strArr[i] === val && i !== this.edpts.length - 1) {
        return true;
      }
    }
    return false;
  }

  validCheckDomain(idx: number) {
    let val = this.edpts[idx].domain;
    if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
      this.notiMessage[idx][0] = true;
      this.notiMessage[idx][1] = '';
    } else if (val == '') {
      this.notiMessage[idx][0] = false;
      this.notiMessage[idx][1] = this.$t('system.empty_check') as string;
    } else {
      this.notiMessage[idx][0] = false;
      this.notiMessage[idx][1] = this.$t('system.valid_check_ifgrp_nm') as string;
    }

    if (this.duplCheck(edptToString(this.edpts[idx]))) {
      this.notiMessage[idx][0] = false;
      this.notiMessage[idx][1] = this.$t('system.dupl_check_ifgrp_nm') as string;
    }
  }
}
</script>
<style lang=""></style>
