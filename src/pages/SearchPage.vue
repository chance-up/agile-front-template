<template>
  <div>
    <h1>this is Search Page!!</h1>
    <div class="row">
      <div class="col-8"><Input /></div>
      <div class="col-4"><Button text="Search" /></div>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button/Button.vue';
import Input from '@/components/Input/Input.vue';

@Component({
  components: {
    Button,
    Input,
  },
})
export default class SearchPage extends Vue {}
</script>
<style lang=""></style>
