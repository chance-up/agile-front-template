<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <div class="form-cont">
      <div class="domain-wrap">
        <Interface :clickEvent="addInterface" :shape="true" />
        <div v-for="(item, idx) in items" :key="idx">
          <Interface :clickEvent="deleteInterface" :shape="false" />
        </div>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import Interface from '@/components/system/Interface.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Interface,
  },
})
export default class InterfaceGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;
  items: number[] = [];
  addInterface() {
    this.items.push(1);
  }
  deleteInterface() {
    this.items.pop();
  }
}
</script>
<style lang=""></style>
