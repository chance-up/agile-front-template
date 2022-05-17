<template>
  <tr>
    <td @click="routeDetail(apiData.id, apiData.sysId)" v-text="getIdx(index)"></td>
    <td @click="routeDetail(apiData.id, apiData.sysId)">
      <span class="bold">{{ apiData.sysId }}</span>
    </td>
    <td @click="routeDetail(apiData.id, apiData.sysId)">{{ apiData.id }}</td>
    <td @click="routeDetail(apiData.id, apiData.sysId)">
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
    <td @click="routeDetail(apiData.id, apiData.sysId)" class="tl">{{ apiData.uriIn }}</td>
    <td @click="routeDetail(apiData.id, apiData.sysId)">{{ apiData.timeOut }}</td>
    <td @click="routeDetail(apiData.id, apiData.sysId)">
      <span>{{ apiData.cretDt.slice(0, 10) }}</span
      ><span>{{ apiData.updDt.slice(11, 19) }}</span>
    </td>
    <td>
      <button class="mod-btn" @click="routeEdit(apiData.id, apiData.sysId)">
        <i>{{ $t('api.edit') }}</i>
      </button>
      <button class="del-btn" @click="deleteApi(apiData.id, apiData.sysId)">
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
import { Pagination } from '@/types/GateWayResponse';

@Component({
  components: {
    InputBox,
    SelectBox,
  },
})
export default class ListRow extends Vue {
  @Prop() public apiData!: ApiDetailResponse | null;
  @Prop() public pagination!: Pagination;
  @Prop() public index!: number;

  apiModule = getModule(ApiModule, this.$store);
  deleteApi(id: string, sysId: string) {
    // console.log('delete Id: ' + id);
    // this.$modal.show('삭제하시겠습니까?');
    // this.apiModule.deleteApi(id);
    this.$emit('deleteApi', { id, sysId });
  }
  routeDetail(id: string, sysId: string) {
    this.$router.push({ name: 'api-detail', query: { id, sysId } });
  }
  routeEdit(id: string, sysId: string) {
    this.$router.push({ name: 'api-edit', query: { id, sysId } });
  }
  getIdx(index: number): number {
    return this.pagination.totalElements - this.pagination.currentPage * 10 - index;
  }
}
</script>
