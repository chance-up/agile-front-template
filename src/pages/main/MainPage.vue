<template>
  <div>
    <body>
      <div class="body-wrap">
        <div class="wrap">
          <MainHeader></MainHeader>
          <router-view />
          <MainFooter></MainFooter>
        </div>
      </div>
    </body>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainHeader from '@/components/layout/header/MainHeader.vue';
import MainFooter from '@/components/layout/footer/MainFooter.vue';

@Component({
  components: {
    MainHeader: MainHeader,
    MainFooter: MainFooter,
  },
})
export default class MainPage extends Vue {}
</script>
