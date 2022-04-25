<template lang="">
  <li>
    <label class="label point">URI</label>
    <div class="form-cont">
      <div class="form-group">
        <img class="img" src="@/assets/in.svg" alt="uri" />
        <input type="text" id="" class="input-box uri-input" placeholder="자동생성/변경불가" disabled />
      </div>
      <div class="form-group">
        <img class="img" src="@/assets/out.svg" alt="uri" />
        <input type="text" id="" class="input-box uri-input" placeholder="자동생성/변경불가" disabled />
        <button class="sm-btn">
          <i><img src="@/assets/edit.svg" alt="수정" /></i>
        </button>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditURIGoup extends Vue {}
</script>
