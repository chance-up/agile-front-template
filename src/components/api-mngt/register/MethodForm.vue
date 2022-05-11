<template lang="">
  <li>
    <label for="" class="label point">{{ groupNm }}</label>
    <div class="form-cont">
      <div class="check-group">
        <div class="check-box">
          <div class="check">
            <input
              type="checkbox"
              id="checkGet"
              value="GET"
              @input="handleOnClickMeth"
              :checked="methList.includes('GET')"
            /><span class="checkmark"></span>
          </div>
          <label for="checkGet">GET</label>
        </div>

        <div class="check-box">
          <div class="check">
            <input
              type="checkbox"
              id="checkPost"
              value="POST"
              @input="handleOnClickMeth"
              :checked="methList.includes('POST')"
            /><span class="checkmark"></span>
          </div>
          <label for="checkPost">POST</label>
        </div>

        <div class="check-box">
          <div class="check">
            <input
              type="checkbox"
              id="checkPut"
              value="PUT"
              @input="handleOnClickMeth"
              :checked="methList.includes('PUT')"
            /><span class="checkmark"></span>
          </div>
          <label for="checkPut">PUT</label>
        </div>

        <div class="check-box">
          <div class="check">
            <input
              type="checkbox"
              id="checkDelete"
              value="DELETE"
              @input="handleOnClickMeth"
              :checked="this.methList.includes('DELETE')"
            /><span class="checkmark"></span>
          </div>
          <label for="checkDelete">DELETE</label>
        </div>
      </div>
      <p v-if="notiMessage[0] == false" class="red-txt noti">{{ notiMessage[1] }}</p>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class MethodForm extends Vue {
  @Prop() groupNm!: string | null;
  @Prop({ default: () => [] }) value!: string[];

  methList: string[] = [];
  notiMessage: [boolean | null, string] = [null, ''];

  @Watch('value')
  onValueChange(val: string[]) {
    this.methList = val;
    this.$emit('update:isvalid', Boolean(this.methList.length));
  }
  created() {
    this.methList = this.value;
    this.$emit('update:isvalid', Boolean(this.methList.length));
  }

  handleOnClickMeth(event: any) {
    const value = event.target.value;
    if (this.methList.includes(value)) {
      this.methList = this.methList.filter((item: string) => item !== value);
    } else {
      this.methList.push(value);
    }
    this.notiMessage = this.methList.length ? [true, ''] : [false, this.$t('api.valid_check_method') as string];
    this.$emit('input', this.methList);
    this.$emit('update:isvalid', Boolean(this.methList.length));
  }
}
</script>
