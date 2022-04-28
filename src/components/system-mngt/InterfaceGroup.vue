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
                class="input-box lg check-ok"
                placeholder="연동방식 그룹명 입력"
                v-model="ifgrp.if_nm"
              />
              <button class="sm-btn" @click="addIfGrp" v-if="idx === 0">
                <i><img src="@/assets/plus.svg" alt="추가" /></i>
              </button>
              <button class="sm-btn" @click="deleteIfGrp(idx)" v-else>
                <i><img src="@/assets/minus.svg" alt="삭제" /></i>
              </button>
            </div>
            <ul class="domain-list">
              <li v-for="(ifurl, idx2) in ifgrp.if_url" :key="idx2">
                <select class="select-box" v-model="ifurl.protocol">
                  <option value="http" selected>http</option>
                  <option value="https">https</option>
                </select>
                <span>://</span>
                <input type="text" id="" class="input-box mid" placeholder="domain" v-model="ifurl.domain" />
                <span>:</span>
                <input type="text" id="" class="input-box sm" placeholder="port" v-model="ifurl.port" />
                <button class="xs-btn" @click="addUrl(idx)" v-if="idx2 === 0">
                  <i class="plus"></i>
                </button>
                <button class="xs-btn" @click="deleteUrl(idx, idx2)" v-else><i class="minus"></i></button>
              </li>

              <!-- <Interface :clickEvent="test" :shape="true" v-model="ifgrp.if_url" />
              <Interface :clickEvent="test" :shape="false" v-for="(item, idx) in items" :key="idx" /> -->
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </li>
</template>
<script lang="ts">
import Interface from '@/components/system-mngt/Interface.vue';
import InputGroup from '@/components/system-mngt/InputGroup.vue';
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import { SystemResponse, IfGrpType } from '@/types/SystemType';
@Component({
  components: {
    Interface,
    InputGroup,
  },
})
export default class InterfaceGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: () => [] }) ifgrps!: IfGrpType[];

  get grps() {
    return this.ifgrps;
  }

  set grps(newVal: IfGrpType[]) {
    this.$emit('update:ifgrps', newVal);
  }

  // @Watch('ifgrps')
  // onChanged(newVal: IfGrpType[]) {
  //   console.log(newVal);
  //   //this.$emit('input', newVal);
  // }

  // Item1: Record<string, unknown>[] = [];

  // // Item1.id = '954';
  // // console.log(Item1);

  items: number[] = [];
  //ifgrps: IfGrpType[] = [];
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

    this.ifgrps.push(empty);
    console.log(this.ifgrps);
  }
  deleteIfGrp(idx: number) {
    this.ifgrps.splice(idx, 1);
  }
  addUrl(idx: number) {
    let empty = {
      protocol: 'http',
      domain: '',
      port: '',
    };
    this.ifgrps[idx].if_url.push(empty);
  }

  deleteUrl(idx: number, idx2: number) {
    this.ifgrps[idx].if_url.splice(idx2, 1);
  }
  // test() {
  //   console.log('!!!!');
  // }
  // groupItems: number[] = [];
  // addInterfaceGroup() {
  //   this.groupItems.push(1);
  // }
  // deleteInterfaceGroup() {
  //   this.groupItems.pop();
  // }
}
</script>
<style lang=""></style>
