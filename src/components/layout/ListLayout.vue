<template>
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">{{ title }}</h1>
    </div>
    <SearchForm />
    <ListForm :option="option" />
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import SearchForm from '@/components/system/SearchForm.vue';
import ListForm from '@/components/system/ListForm.vue';

@Component({
  components: {
    SearchForm,
    ListForm,
  },
})
export default class ListLayout extends Vue {
  @Prop() title!: string;
  @Prop() option!: object;
}
</script>
