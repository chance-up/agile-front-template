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
                  'check-ok': notiMessage[idx][0] === true,
                  'check-false': notiMessage[idx][0] === false,
                }"
                placeholder="연동방식 그룹명 입력"
                v-model="ifgrp.if_nm"
                @input="validCheck(idx)"
                @focus="emptyChkFunc(idx)"
              />
              <button class="sm-btn" @click="addIfGrp" v-if="idx === 0">
                <i><img src="@/assets/plus.svg" alt="추가" /></i>
              </button>
              <button class="sm-btn" @click="deleteIfGrp(idx)" v-else>
                <i><img src="@/assets/minus.svg" alt="삭제" /></i>
              </button>
              <p v-if="!notiMessage[idx][0] && emptyChk[idx]" class="red-txt noti">
                {{ notiMessage[idx][1] }}
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
                    :class="{
                      'check-ok': domainEmptyChk[idx][idx2].isFocus && !domainEmptyChk[idx][idx2].isEmpty,
                      'check-false': domainEmptyChk[idx][idx2].isFocus && domainEmptyChk[idx][idx2].isEmpty,
                    }"
                    placeholder="domain"
                    v-model="ifurl.domain"
                    @input="domainValidCheck(idx, idx2)"
                    @focus="domainEmptyChkFunc(idx, idx2)"
                  />
                  <span>:</span>
                  <input type="text" id="" class="input-box sm" placeholder="port" v-model="ifurl.port" />
                  <button class="xs-btn" @click="addUrl(idx)" v-if="idx2 === 0">
                    <i class="plus"></i>
                  </button>
                  <button class="xs-btn" @click="deleteUrl(idx, idx2)" v-else><i class="minus"></i></button>
                </div>
                <p v-if="domainEmptyChk[idx][idx2].isFocus && domainEmptyChk[idx][idx2].isEmpty" class="noti">
                  도메인을 입력해 주세요.
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IfDomainEmptyChkType, IfGrpType } from '@/types/SystemType';
import { checkLength, checkEnglishNumber, checkEnglishKorean } from '@/utils/validation';
@Component({
  components: {},
})
export default class InterfaceGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;

  // ifgrps는 부모로부터 넘어오는 값.
  // 해당 값을 배열로 선언하고, 추가 삭제할 때 마다 배열의 값이 변한다.
  @Prop({ default: () => [] }) ifgrps!: IfGrpType[];
  @Prop({ default: false }) isvalid!: boolean | null;

  notiMessage: [boolean | null, string][] = [[null, this.$t('system.empty_check') as string]];

  emptyChk: boolean[] = [false];
  domainEmptyChk: IfDomainEmptyChkType[][] = [[{ isFocus: false, isEmpty: true }]];
  ifGrpValid: boolean[] = [false, false];

  @Watch('notiMessage')
  onNotiMessageChange(val: [boolean | null, string][]) {
    console.log('notiMessage', val);
  }

  // ifGrp valid check에 필요한 watch들
  @Watch('emptyChk')
  onEmptyChkChange(val: boolean[]) {
    if (val.every((item) => item === true)) this.ifGrpValid.splice(0, 1, true);
    else this.ifGrpValid.splice(0, 1, false);
  }

  @Watch('domainEmptyChk')
  onDomainEmptyChkChange(val: IfDomainEmptyChkType[][]) {
    if (val.every((item) => item.every((item2) => item2.isEmpty === false))) this.ifGrpValid.splice(1, 1, true);
    else this.ifGrpValid.splice(1, 1, false);
  }

  @Watch('ifGrpValid')
  ifGrpValidChange(val: boolean[]) {
    this.$emit('update:isvalid', val);
  }
  // ------------------------------------

  duplCheck(val: string) {
    const ifgrpList = this.ifgrps.filter((ifgrp) => ifgrp.if_nm === val);
    if (ifgrpList.length > 1) {
      this.notiMessage[this.ifgrps.length] = [false, '중복된 이름이 있습니다.'];
    } else {
      this.notiMessage[this.ifgrps.length] = [true, ''];
    }
  }

  validCheck(idx: number) {
    console.log(this.ifgrps.length);
    console.log(this.ifgrps[idx].if_nm);
    let val = this.ifgrps[idx].if_nm;
    this.duplCheck(val);

    if (checkLength(val, 1, 20) && checkEnglishNumber(val)) {
      this.notiMessage[idx] = [true, ''];
    } else if (val == '') {
      this.notiMessage[idx] = [null, this.$t('system.empty_check') as string];
    } else {
      this.notiMessage[idx] = [false, this.$t('system.valid_check_ifgrp_nm') as string];
    }
  }

  get grps() {
    return this.ifgrps;
  }

  set grps(newVal: IfGrpType[]) {
    this.$emit('update:ifgrps', newVal);
  }

  items: number[] = [];
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
    this.notiMessage.push([null, this.$t('system.empty_check') as string]);
    this.ifgrps.push(empty);
    console.log(this.ifgrps);

    this.emptyChk.push(false);
    this.domainEmptyChk.push([{ isFocus: false, isEmpty: true }]);
  }
  deleteIfGrp(idx: number) {
    this.notiMessage.splice(idx, 1);
    this.ifgrps.splice(idx, 1);

    this.emptyChk.splice(idx, 1);
    this.domainEmptyChk.splice(idx, 1);
  }
  addUrl(idx: number) {
    let empty = {
      protocol: 'http',
      domain: '',
      port: '',
    };
    this.ifgrps[idx].if_url.push(empty);
    this.domainEmptyChk[idx].push({ isFocus: false, isEmpty: true });
  }

  deleteUrl(idx: number, idx2: number) {
    this.ifgrps[idx].if_url.splice(idx2, 1);
    this.domainEmptyChk[idx].splice(idx2, 1);
  }

  //연동 방식 그룹명 포커싱 체크
  emptyChkFunc(idx: number) {
    this.emptyChk.splice(idx, 1, true);
  }

  //연동 방식 uri 포커싱 체크
  domainEmptyChkFunc(idx: number, idx2: number) {
    const domianEmpty = this.domainEmptyChk[idx][idx2].isEmpty;
    this.domainEmptyChk[idx].splice(idx2, 1, { isFocus: true, isEmpty: domianEmpty });
  }

  //연동 방식 uri 공백 여부 체크
  domainValidCheck(idx: number, idx2: number) {
    let val = this.ifgrps[idx].if_url[idx2].domain;
    const domainFocus = this.domainEmptyChk[idx][idx2].isFocus;
    if (val == '') {
      this.domainEmptyChk[idx].splice(idx2, 1, { isFocus: domainFocus, isEmpty: true });
    } else {
      this.domainEmptyChk[idx].splice(idx2, 1, { isFocus: domainFocus, isEmpty: false });
    }
  }
}
</script>
<style lang=""></style>
