<template>
  <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <!-- <img src="..." class="img-fluid rounded-start" alt="..." /> -->
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">{{ text }}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
//import { namespace } from 'vuex-class';
//const UserModule = namespace('UserModule');
export default class Card extends Vue {
  @Prop() private text!: string;
  @Prop() private imgUrl!: string;
}
</script>
<style lang=""></style>
