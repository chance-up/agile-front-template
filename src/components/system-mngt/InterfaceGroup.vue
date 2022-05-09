<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <ul>
      <li v-for="(ifgrp, idx) in ifgrps" :key="idx">
        <div class="form-cont">
          <div class="domain-wrap">
            <div class="domain-group">
              <input
                type="text"
                id=""
                class="input-box lg"
                :class="{
                  'check-ok': notiMessage[idx].isValid === true,
                  'check-false': notiMessage[idx].isValid === false,
                }"
                placeholder="연동방식 그룹명 입력"
                v-model="ifgrp.if_nm"
                @input="validCheck(idx)"
              />
              <button class="sm-btn" @click="addIfGrp" v-if="idx === 0">
                <i><img src="@/assets/plus.svg" :alt="$t('common.add')" /></i>
              </button>
              <button class="sm-btn" @click="deleteIfGrp(idx)" v-else>
                <i><img src="@/assets/minus.svg" :alt="$t('common.delete')" /></i>
              </button>
              <p v-if="notiMessage[idx].isValid == false" class="red-txt noti">
                {{ notiMessage[idx].msg }}
              </p>
            </div>
            <ul class="domain-list">
              <li v-for="(ifurl, idx2) in ifgrp.if_url" :key="idx2">
                <div class="domain-cont">
                  <select class="select-box" v-model="ifurl.protocol">
                    <option value="http" selected>http</option>
                    <option value="https">https</option>
                  </select>
                  <span>://</span>
                  <input
                    type="text"
                    id=""
                    class="input-box mid"
                    placeholder="domain"
                    v-model="ifurl.domain"
                    @input="domainValidCheck(idx, idx2)"
                  />
                  <span>:</span>
                  <input
                    type="text"
                    id=""
                    class="input-box sm"
                    placeholder="port"
                    v-model="ifurl.port"
                    @input="portValidCheck(idx, idx2)"
                  />
                  <button class="xs-btn" @click="addUrl(idx)" v-if="idx2 === 0">
                    <i class="plus"></i>
                  </button>
                  <button class="xs-btn" @click="deleteUrl(idx, idx2)" v-else><i class="minus"></i></button>
                </div>
                <p v-if="notiMessage[idx].domainValid[idx2].isValid == false" class="noti">
                  {{ notiMessage[idx].domainValid[idx2].msg }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { IfGrpType, IfGrpValidMessageType } from '@/types/SystemType';
import { checkLength, checkEnglishNumber, checkNumber } from '@/utils/validation';
@Component({
  components: {},
})
export default class InterfaceGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;

  // ifgrps는 부모로부터 넘어오는 값.
  // 해당 값을 배열로 선언하고, 추가 삭제할 때 마다 배열의 값이 변한다.
  @Prop({ default: () => [] }) ifgrps!: IfGrpType[];
  @Prop({ default: false }) isvalid!: boolean | null;
  notiMessage: IfGrpValidMessageType[] = [];

  @Watch('notiMessage')
  messageChanged(val: IfGrpValidMessageType[]) {
    let valid: boolean | null = true;
    this.notiMessage.forEach((grpMsg) => {
      console.log(grpMsg.isValid);
      valid = valid && grpMsg.isValid;

      grpMsg.domainValid.forEach((domainMsg) => {
        console.log(domainMsg.isValid);
        valid = valid && domainMsg.isValid;
      });
    });
    console.log('this is interface Valid!! :: ' + valid);
    this.$emit('update:isvalid', valid);
  }

  // notiMessage: [boolean | null, string, [boolean | null, string]][] = [[null, '', [null, '']]];

  created() {
    this.ifgrps.forEach((ifgrp, idx) => {
      this.notiMessage.push({
        isValid: null,
        msg: '',
        domainValid: [],
      });

      ifgrp.if_url.forEach((ifurl, idx2) => {
        this.notiMessage[idx].domainValid.push({
          isValid: null,
          msg: '',
        });
      });
    });
  }

  duplCheck(val: string) {
    let duplArr: number[] = [];
    this.ifgrps.forEach((ifgrp, idx) => {
      if (ifgrp.if_nm === val) {
        duplArr.push(idx);
      }
    });
    if (duplArr.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  validCheck(idx: number) {
    let val = this.ifgrps[idx].if_nm;
    if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
      this.notiMessage[idx].isValid = true;
      this.notiMessage[idx].msg = '';
    } else if (val == '') {
      this.notiMessage[idx].isValid = false;
      this.notiMessage[idx].msg = this.$t('system.empty_check') as string;
      //this.notiMessage[idx] = [false, this.$t('system.empty_check') as string];
    } else {
      this.notiMessage[idx].isValid = false;
      this.notiMessage[idx].msg = this.$t('system.valid_check_ifgrp_nm') as string;
    }

    if (this.duplCheck(val)) {
      this.notiMessage[idx].isValid = false;
      this.notiMessage[idx].msg = this.$t('system.dupl_check_ifgrp_nm') as string;
    }
  }

  // 도메인 Input의 유효성 체크
  domainValidCheck(idx: number, idx2: number) {
    let val = this.ifgrps[idx].if_url[idx2].domain;
    if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
      this.notiMessage[idx].domainValid[idx2].isValid = true;
      this.notiMessage[idx].domainValid[idx2].msg = '';
    } else if (val == '') {
      this.notiMessage[idx].domainValid[idx2].isValid = false;
      this.notiMessage[idx].domainValid[idx2].msg = this.$t('system.empty_check') as string;
    } else {
      this.notiMessage[idx].domainValid[idx2].isValid = false;
      this.notiMessage[idx].domainValid[idx2].msg = this.$t('system.valid_check_ifgrp_domain') as string;
    }
  }

  // port Input의 유효성 체크
  // Todo : 1~65535 사이의 숫자만 입력 가능하도록 하기
  portValidCheck(idx: number, idx2: number) {
    let val = this.ifgrps[idx].if_url[idx2].port;
    if (checkLength(val, 1, 5) && checkNumber(val)) {
      this.notiMessage[idx].domainValid[idx2].isValid = true;
      this.notiMessage[idx].domainValid[idx2].msg = '';
    } else if (val == '') {
      this.notiMessage[idx].domainValid[idx2].isValid = false;
      this.notiMessage[idx].domainValid[idx2].msg = this.$t('system.empty_check') as string;
    } else {
      this.notiMessage[idx].domainValid[idx2].isValid = false;
      this.notiMessage[idx].domainValid[idx2].msg = this.$t('system.valid_check_ifgrp_port') as string;
    }
  }

  get grps() {
    return this.ifgrps;
  }

  set grps(newVal: IfGrpType[]) {
    this.$emit('update:ifgrps', newVal);
  }

  addIfGrp() {
    let empty = {
      if_nm: '',
      if_url: [
        {
          protocol: 'http',
          domain: '',
          port: '',
        },
      ],
    };
    this.notiMessage.push({
      isValid: null,
      msg: '',
      domainValid: [
        {
          isValid: null,
          msg: '',
        },
      ],
    });
    this.ifgrps.push(empty);
  }
  deleteIfGrp(idx: number) {
    this.notiMessage.splice(idx, 1);
    this.ifgrps.splice(idx, 1);
  }
  addUrl(idx: number) {
    let empty = {
      protocol: 'http',
      domain: '',
      port: '',
    };
    this.ifgrps[idx].if_url.push(empty);
    this.notiMessage[idx].domainValid.push({
      isValid: null,
      msg: '',
    });
  }

  deleteUrl(idx: number, idx2: number) {
    this.ifgrps[idx].if_url.splice(idx2, 1);
    this.notiMessage[idx].domainValid.splice(idx2, 1);
  }
}
</script>
<style lang=""></style>
