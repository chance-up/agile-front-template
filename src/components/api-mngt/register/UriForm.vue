<template lang="">
  <li>
    <label class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <div class="form-group">
        <img class="img" src="@/assets/in.svg" alt="uri" />
        <input type="text" :value="uriIn" class="input-box uri-input" placeholder="자동생성/변경불가" disabled />
      </div>
      <div class="form-group">
        <img class="img" src="@/assets/out.svg" alt="uri" />
        <input
          type="text"
          :value="value"
          class="input-box uri-input"
          placeholder="자동생성/변경불가"
          :disabled="!this.isEdit"
          @input="handleChangeUri"
        />
        <button class="sm-btn" @click="handleClickEdit">
          <i><img src="@/assets/edit.svg" alt="수정" /></i>
        </button>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class UriForm extends Vue {
  @Prop() groupNm!: string | null;
  @Prop() uriIn!: string | null;
  @Prop() value!: string | null;

  isEdit = false;
  handleClickEdit() {
    console.log(this.isEdit);
    this.isEdit = !this.isEdit;
  }

  handleChangeUri(event: any) {
    this.$emit('input', event.target.value);
    this.$emit('update:isvalid', Boolean(event.target.value));
  }
}
</script>
