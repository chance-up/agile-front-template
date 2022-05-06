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
                  <input type="text" id="" class="input-box sm" placeholder="port" v-model="ifurl.port" />
                  <button class="xs-btn" @click="addUrl(idx)" v-if="idx2 === 0">
                    <i class="plus"></i>
                  </button>
                  <button class="xs-btn" @click="deleteUrl(idx, idx2)" v-else><i class="minus"></i></button>
                </div>
                <p v-if="notiMessage[idx].domainValid[idx2].isValid == false" class="noti">도메인을 입력해 주세요.</p>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IfGrpType, IfGrpValidMessageType } from '@/types/SystemType';
import { checkLength, checkEnglishNumber, checkEnglishKorean, checkEmpty } from '@/utils/validation';
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
    // const ifgrp =
    //   this.ifgrps.filter((ifgrp) => {
    //     return ifgrp.if_nm === val;
    //   }).length > 0;
    // // const ifgrp = this.ifgrps.find((ifgrp) => ifgrp.if_nm === val);
    // return ifgrp;

    let duplArr: number[] = [];
    this.ifgrps.forEach((ifgrp, idx) => {
      if (ifgrp.if_nm === val) {
        duplArr.push(idx);
      }
    });
    console.log('@!!!!' + duplArr.length);
    if (duplArr.length > 1) {
      return true;
    } else {
      return false;
    }
    // duplArr.forEach((idx) => {
    //   console.log('!!!!!!' + idx);
    //   this.notiMessage[idx].isValid = false;
    //   this.notiMessage[idx].msg = '이미 존재하는 그룹명입니다.';
    // });
    // let duplArr: number[] = [];
    // this.ifgrps.forEach((ifgrp, idx) => {
    //   if (ifgrp.if_nm === val) {
    //     duplArr.push(idx);
    //   }
    // });
    // if (duplArr.length > 0) {
    // duplArr.forEach((idx) => {
    //   console.log('!!!!!!' + idx);
    //   this.notiMessage[idx].isValid = false;
    //   this.notiMessage[idx].msg = '이미 존재하는 그룹명입니다.';
    // });
    // } else {
    // }
    // console.log(this.notiMessage);
    // duplArr.forEach((idx) => {
    //   this.notiMessage[idx].isValid = false;
    //   this.notiMessage[idx].msg = '이미 존재하는 그룹명입니다.';
    // });
    // console.log('::list :: ' + ifgrpList + '::length :: ' + ifgrpList.length);
    // console.log(ifgrpList);
    // if (count > 0) {
    //   this.notiMessage[this.ifgrps.length - 1].isValid = false;
    //   this.notiMessage[this.ifgrps.length - 1].msg = '중복된 이름이 있습니다.';
    // } else {
    //   this.notiMessage[this.ifgrps.length - 1].isValid = true;
    //   this.notiMessage[this.ifgrps.length - 1].msg = '';
    // }
  }

  validCheck(idx: number) {
    let val = this.ifgrps[idx].if_nm;
    // console.log(this.duplCheck(val));

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

  //연동 방식 uri 공백 여부 체크
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
      this.notiMessage[idx].domainValid[idx2].msg = this.$t('system.valid_check_ifgrp_nm') as string;
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
