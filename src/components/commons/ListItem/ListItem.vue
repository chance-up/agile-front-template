<template>
  <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="..." class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">{{ userInfo.id }}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { UserInfo } from '@/types/UserTypes';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const UserModule = namespace('UserModule');
@Component
export default class Home extends Vue {
  @UserModule.State
  private userInfo!: UserInfo;
}
</script>
<style lang=""></style>
