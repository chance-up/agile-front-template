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

  @Watch('value')
  onValueChange(val: string[]) {
    this.methList = val;
  }
  created() {
    this.methList = this.value;
    console.log(this.methList);
  }

  handleOnClickMeth(event: any) {
    const value = event.target.value;
    if (this.methList.includes(value)) {
      this.methList = this.methList.filter((item: string) => item !== value);
    } else {
      this.methList.push(value);
    }
    this.$emit('input', this.methList);
  }
}
</script>
