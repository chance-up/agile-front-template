<template>
  <li>
    <label class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <select class="select-box" v-model="inputValue">
          <option>Basic Auth</option>
          <option>JWT</option>
        </select>
      </div>

      <div class="form-group auth-group">
        <!-- Basic Auth -->
        <div class="auth-form">
          <label class="label">ID :</label>
          <input type="text" id="" class="input-box" placeholder="자동생성/변경불가" disabled />
          <button class="sm-btn">
            <i><img src="@/assets/reserve.svg" alt="재발급" /></i>
          </button>
        </div>
        <div class="auth-form">
          <label class="label">PW :</label>
          <input type="text" id="" class="input-box" placeholder="" />
        </div>
      </div>
      <!-- // Basic Auth -->

      <!-- JWT 일때 활성화
                                        <div class="form-group auth-group"> 
                                            <div class="auth-form">
                                                <label class="label">알고리즘 :</label>
                                                <select class="select-box">
                                                    <option>선택해주세요</option>
                                                </select>
                                            </div>
                                            <div class="auth-form">
                                                <label class="label">발급자 :</label>
                                                <input type="text" id="" class="input-box" placeholder=""/>
                                            </div>
                                            <div class="auth-form">
                                                <label class="label">대상자 :</label>
                                                <input type="text" id="" class="input-box" placeholder=""/>
                                            </div>
                                            <div class="auth-form">
                                                <label class="label">공개key :</label>
                                                <textarea class="textarea"></textarea>
                                            </div>
                                        </div>   // JWT -->
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, PropSync, Watch } from 'vue-property-decorator';
@Component
export default class AuthReqGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;

  @PropSync('childValue', { type: String })
  syncedChildValue!: string;

  inputValue = null;
  @Watch('inputValue')
  onChildChanged(val: string) {
    this.syncedChildValue = val;
  }
}
</script>
