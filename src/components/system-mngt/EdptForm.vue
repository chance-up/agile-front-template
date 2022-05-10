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
                @input="validCheck(idx)"
              />
              <span>:</span>
              <input
                type="text"
                class="input-box sm"
                placeholder="port"
                v-model="edpt.port"
                maxlength="5"
                @input="validCheck(idx)"
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
import { stringArrToEdptArr, edptArrToStringArr, edptToString, stringToEdpt } from '@/utils/converter';
import { checkLength } from '@/utils/validation';
@Component
export default class EdptForm extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: () => [] }) strArr!: string[];
  @Prop({ default: false }) isValid!: boolean | null;

  edpts: SystemEdptType[] = [];
  notiMessage: [boolean | null, string][] = [];

  created() {
    this.strArr.forEach((str) => {
      this.edpts.push(stringToEdpt(str));
      this.notiMessage.push([null, '']);
    });
  }

  @Watch('edpts', { deep: true })
  edptsChanged() {
    this.$emit('update:strArr', edptArrToStringArr(this.edpts));
  }

  addEdpt() {
    if (this.edpts.length > 9) {
      return;
    }
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
    let duplCnt = 0;
    let duplArr = edptArrToStringArr(this.edpts);

    for (let i = 0; i < duplArr.length; i++) {
      if (val === duplArr[i]) {
        duplCnt++;
      }
    }

    if (duplCnt > 1) {
      return true;
    }
    return false;
  }

  validCheck(idx: number) {
    let val = this.edpts[idx].domain;
    if (checkLength(val, 1, 30)) {
      this.notiMessage[idx][0] = true;
      this.notiMessage[idx][1] = '';
    } else if (val == '') {
      this.notiMessage[idx][0] = false;
      this.notiMessage[idx][1] = this.$t('system.empty_check') as string;
    } else {
      this.notiMessage[idx][0] = false;
      this.notiMessage[idx][1] = this.$t('system.valid_check_ifgrp_nm') as string;
    }

    // 중복 체크 수행
    // edpt 구조로 저장되어있던 값들을 String 값으로 변환한다.
    if (this.duplCheck(edptToString(this.edpts[idx]))) {
      this.notiMessage[idx][0] = false;
      this.notiMessage[idx][1] = this.$t('system.dupl_check_ifgrp_nm') as string;
    }

    // 모든 값이 유효성 check를 통과했다면, isValid를 true로 변경한다.
    // * isValid? => SystemRegister/SystemEdit 페이지에서 태그들의 유효성 검사를 위해 사용한다.
    let valid: boolean | null = true;
    this.notiMessage.forEach((noti) => {
      valid = valid && noti[0];
    });
    this.$emit('update:isValid', valid);
  }
}
</script>
<style lang=""></style>
