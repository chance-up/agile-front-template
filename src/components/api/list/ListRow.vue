<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      <span class="bold">{{ apiData.sys_id }}</span>
    </td>
    <td>{{ apiData.id }}</td>
    <td @click="$router.push({ path: '/api-detail', Param: apiData.id })">{{ apiData.nm }}</td>
    <td>
      <span
        v-for="(method, idx) in apiData.methods"
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
    <td class="tl">{{ apiData.uri_in }}</td>
    <td>{{ apiData.time_out }}</td>
    <td>
      <span>{{ apiData.cret_dt.slice(0, 10) }}</span
      ><span>{{ apiData.upd_dt.slice(11, 19) }}</span>
    </td>
    <td>
      <button class="mod-btn" @click="$router.push({ path: '/api-edit', Param: apiData.id })">
        <i>{{ $t('api.edit') }}</i>
      </button>
      <button class="del-btn">
        <i>{{ $t('api.delete') }}</i>
      </button>
    </td>
  </tr>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InputBox from '@/components/api/search-option/InputBox.vue';
import SelectBox from '@/components/api/search-option/SelectBox.vue';
import { ApiDetailResponse, DummyApiResponse } from '@/types/ApiType';

@Component({
  components: {
    InputBox,
    SelectBox,
  },
})
export default class ListRow extends Vue {
  @Prop() public apiData!: ApiDetailResponse | null;
  @Prop() public index!: number;
}
</script>
