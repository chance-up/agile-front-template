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
                  'check-ok': notiMessageDomain[idx][0] === true,
                  'check-false': notiMessageDomain[idx][0] === false,
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
                @input="validCheckPort(idx)"
              />
              <button class="xs-btn" @click="addEdpt" v-if="idx === 0">
                <i class="plus"></i>
              </button>
              <button class="xs-btn" @click="deleteEdpt(idx)" v-else><i class="minus"></i></button>
            </div>
            <p v-if="notiMessageDomain[idx][0] == false" class="red-txt noti">{{ notiMessageDomain[idx][1] }}</p>
            <p v-if="notiMessagePort[idx][0] == false" class="red-txt noti">{{ notiMessagePort[idx][1] }}</p>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { SystemEdptType } from '@/types/SystemType';
import { edptArrToStringArr, edptToString, stringToEdpt } from '@/utils/converter';
import { checkLength, checkDomain, checkNumber } from '@/utils/validation';
@Component
export default class EdptForm extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: () => [] }) strArr!: string[];
  @Prop({ default: false }) isValid!: boolean | null;

  edpts: SystemEdptType[] = [];
  notiMessageDomain: [boolean | null, string][] = [];
  notiMessagePort: [boolean | null, string][] = [];

  created() {
    let isEmpty = true;
    this.strArr.forEach((str, idx) => {
      this.edpts.push(stringToEdpt(str));
      if (this.edpts[idx].domain !== '') {
        isEmpty = false;
      }
      this.notiMessageDomain.push([null, '']);
      this.notiMessagePort.push([null, '']);
    });

    // 도메인이 비어있지 않으면 유효성 검사를 수행한다.
    if (!isEmpty) {
      this.edpts.forEach((edpt, idx) => {
        this.validCheckDomain(idx);
        this.validCheckPort(idx);
      });
    }
  }

  @Watch('edpts', { deep: true })
  edptsChanged() {
    // 모든 값이 유효성 check를 통과했다면, isValid를 true로 변경한다.
    // * isValid? => SystemRegister/SystemEdit 페이지에서 태그들의 유효성 검사를 위해 사용한다.
    let valid: boolean | null = true;
    this.notiMessageDomain.forEach((domain) => {
      console.log('noti::' + domain[0]);
      valid = valid && domain[0];
    });
    this.notiMessagePort.forEach((port) => {
      console.log('noti::' + port[0]);
      valid = valid && port[0];
    });
    console.log(valid);
    this.$emit('update:isValid', valid);
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
    this.notiMessageDomain.push([null, '']);
    this.notiMessagePort.push([null, '']);
  }

  deleteEdpt(idx: number) {
    this.edpts.splice(idx, 1);
    this.notiMessageDomain.splice(idx, 1);
    this.notiMessagePort.splice(idx, 1);
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

  validCheckDomain(idx: number) {
    let domain = this.edpts[idx].domain;
    if (checkLength(domain, 1, 30) && checkDomain(domain)) {
      // 중복 체크 수행
      // edpt 구조로 저장되어있던 값들을 String 값으로 변환한다.
      if (!this.duplCheck(edptToString(this.edpts[idx]))) {
        this.notiMessageDomain[idx][0] = true;
        this.notiMessageDomain[idx][1] = '';
      } else {
        this.notiMessageDomain[idx][0] = false;
        this.notiMessageDomain[idx][1] = this.$t('system.dupl_check_edpt_nm') as string;
      }
    } else if (domain == '') {
      this.notiMessageDomain[idx][0] = false;
      this.notiMessageDomain[idx][1] = this.$t('system.empty_check') as string;
    } else {
      this.notiMessageDomain[idx][0] = false;
      this.notiMessageDomain[idx][1] = this.$t('system.valid_check_edpt_domain') as string;
    }
  }

  validCheckPort(idx: number) {
    let port = this.edpts[idx].port;
    if (checkLength(port, 1, 30) && checkNumber(port)) {
      // 중복 체크 수행
      // edpt 구조로 저장되어있던 값들을 String 값으로 변환한다.
      if (!this.duplCheck(edptToString(this.edpts[idx]))) {
        this.notiMessagePort[idx][0] = true;
        this.notiMessagePort[idx][1] = '';
      } else {
        this.notiMessagePort[idx][0] = false;
        this.notiMessagePort[idx][1] = this.$t('system.dupl_check_edpt_nm') as string;
      }
    } else if (port == '') {
      this.notiMessagePort[idx][0] = false;
      this.notiMessagePort[idx][1] = this.$t('system.empty_check') as string;
    } else {
      this.notiMessagePort[idx][0] = false;
      this.notiMessagePort[idx][1] = this.$t('system.valid_check_edpt_port') as string;
    }
  }
}
</script>
<style lang=""></style>
