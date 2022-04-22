<template>
  <li>
    <label class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <select v-model="show" class="select-box">
          <option selected>none</option>
          <option>TPS</option>
          <option>총량</option>
        </select>
      </div>

      <div v-if="show != 'none'" class="form-group sla-form">
        <!--  총량  -->
        <select class="select-box mr15" v-model="type">
          <option>분</option>
          <option>시</option>
          <option>일</option>
          <option>월</option>
        </select>
        <input type="text" id="" class="input-box" placeholder="number" v-model="count" />
        <span>건</span>
      </div>

      <!--  tps 일때 활성화
                                        <div class="form-group sla-form"> 
                                            <input type="text" id="" class="input-box lg" placeholder="number"/>
                                            <span>건</span>
                                        </div>
                                        // -->
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class SlaReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  @Prop({ default: '' }) type!: string;
  @Prop({ default: 0 }) count!: number;

  show = 'none';
}
</script>
