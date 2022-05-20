<template>
  <div class="tb-tit">
    <div class="search-cont">
      <label class="label">정렬기준</label>
      <select class="select-box" @change="handleChangeSort">
        <option v-for="(item, index) in sorts" :key="index" :value="item.value">{{ item.text }}</option>
      </select>
    </div>

    <p class="total">
      total : <span>{{ cnt }}</span>
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class CardSort extends Vue {
  @Prop({ default: 0 }) cnt!: number;

  sorts = [
    {
      value: 'cnt',
      text: '건수',
    },
    {
      value: 'failRate',
      text: '에러율',
    },
    {
      value: 'tps',
      text: 'TPS',
    },
    {
      value: 'resTm',
      text: '응답시간',
    },
  ];

  mounted() {
    this.$emit('changeSort', 'cnt');
  }

  handleChangeSort(event: any) {
    this.$emit('changeSort', event.target.value);
  }
}
</script>
