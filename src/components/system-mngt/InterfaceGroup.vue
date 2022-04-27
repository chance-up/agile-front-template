<template>
  <li>
    <label for="" class="label point">{{ inputNm }}</label>
    <ul>
      <li>
        <div class="form-cont">
          <div class="domain-wrap">
            <div class="domain-group">
              <input type="text" id="" class="input-box lg check-ok" placeholder="연동방식 그룹명 입력" />
              <button class="sm-btn">
                <i><img src="@/assets/plus.svg" alt="추가" /></i>
              </button>
            </div>
            <ul class="domain-list">
              <Interface :clickEvent="addInterface" :shape="true" />
              <Interface :clickEvent="deleteInterface" :shape="false" v-for="(item, idx) in items" :key="idx" />
            </ul>
          </div>
        </div>
      </li>
      <li>
        <div class="form-cont">
          <div class="domain-wrap">
            <div class="domain-group">
              <input type="text" id="" class="input-box lg check-ok" placeholder="연동방식 그룹명 입력" />
              <button class="sm-btn">
                <i><img src="@/assets/minus.svg" alt="추가" /></i>
              </button>
            </div>
            <ul class="domain-list">
              <Interface :clickEvent="addInterface" :shape="true" />
              <Interface :clickEvent="deleteInterface" :shape="false" v-for="(item, idx) in items" :key="idx" />
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </li>
</template>
<script lang="ts">
import Interface from '@/components/system-mngt/Interface.vue';
import InputGroup from '@/components/system-mngt/InputGroup.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Interface,
    InputGroup,
  },
})
export default class InterfaceGroup extends Vue {
  @Prop({ default: '' }) inputNm!: string;

  Item1: Record<string, unknown>[] = [];

  // Item1.id = '954';
  // console.log(Item1);

  items: number[] = [];
  addInterface() {
    this.items.push(1);
  }
  deleteInterface() {
    this.items.pop();
  }
  groupItems: number[] = [];
  addInterfaceGroup() {
    this.groupItems.push(1);
  }
  deleteInterfaceGroup() {
    this.groupItems.pop();
  }
}
</script>
<style lang=""></style>
