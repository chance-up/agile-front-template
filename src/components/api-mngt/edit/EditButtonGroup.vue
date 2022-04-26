<template>
  <div class="btn-wrap">
    <button class="lg-btn purple-btn" @click="$router.push({ name: 'api-edigt', params: { id: mockData.id } })">
      수정
    </button>
    <button class="lg-btn white-btn" @click="$router.go(-1)">취소</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EditButtontGroup extends Vue {
  @Prop({ default: '' }) id!: string;
}
</script>
