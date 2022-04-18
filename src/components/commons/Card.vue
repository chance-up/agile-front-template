<template>
  <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="imgUrl" class="img-fluid rounded-start" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ text }}</h5>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Card extends Vue {
  @Prop({ default: 'defaultText' }) text!: string;
  @Prop({ default: 'defaultimgUrl' }) imgUrl!: string;
  // mounted() {
  //   console.log(this.text);
  //   console.log(this.imgUrl);
  // }
}
</script>
<style lang=""></style>
