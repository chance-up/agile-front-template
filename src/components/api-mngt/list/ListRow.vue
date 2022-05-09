<template>
  <tr>
    <td @click="$router.push({ name: 'api-detail', params: { id: apiData.id } })">{{ index + 1 }}</td>
    <td @click="$router.push({ name: 'api-detail', params: { id: apiData.id } })">
      <span class="bold">{{ apiData.sysId }}</span>
    </td>
    <td @click="$router.push({ name: 'api-detail', params: { id: apiData.id } })">{{ apiData.id }}</td>
    <td @click="$router.push({ name: 'api-detail', params: { id: apiData.id } })">
      <span
        v-for="(method, idx) in apiData.meth"
        :key="idx"
        class="badge"
        :class="{
          syan: method == 'GET',
          red: method == 'DELETE',
          blue: method == 'POST',
          violet: method == 'PUT',
        }"
      >
        {{ method }}
      </span>
    </td>
    <td @click="$router.push({ name: 'api-detail', params: { id: apiData.id } })" class="tl">{{ apiData.uriIn }}</td>
    <td @click="$router.push({ name: 'api-detail', params: { id: apiData.id } })">{{ apiData.timeOut }}</td>
    <td @click="$router.push({ name: 'api-detail', params: { id: apiData.id } })">
      <span>{{ apiData.cretDt.slice(0, 10) }}</span
      ><span>{{ apiData.updDt.slice(11, 19) }}</span>
    </td>
    <td>
      <button class="mod-btn" @click="$router.push({ name: 'api-edit', params: { id: apiData.id } })">
        <i>{{ $t('api.edit') }}</i>
      </button>
      <button class="del-btn" @click="deleteApi(apiData.id)">
        <i>{{ $t('api.delete') }}</i>
      </button>
    </td>
  </tr>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InputBox from '@/components/api-mngt/search-option/InputBox.vue';
import SelectBox from '@/components/api-mngt/search-option/SelectBox.vue';
import { ApiDetailResponse } from '@/types/ApiType';
import { getModule } from 'vuex-module-decorators';
import ApiModule from '@/store/modules/ApiModule';

@Component({
  components: {
    InputBox,
    SelectBox,
  },
})
export default class ListRow extends Vue {
  @Prop() public apiData!: ApiDetailResponse | null;
  @Prop() public index!: number;

  apiModule = getModule(ApiModule, this.$store);
  deleteApi(id: string) {
    console.log('delete Id: ' + id);
    // this.$modal.show('삭제하시겠습니까?');
    // this.apiModule.deleteApi(id);
    this.$emit('deleteApi', id);
  }
}
</script>
