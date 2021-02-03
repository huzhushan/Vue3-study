<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 14:48:19
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 15:52:54
-->
<template>
  <Suspense>
    <template v-slot:default>
      <AsyncComp />
    </template>

    <template v-slot:fallback>
      <p>AsyncComp LOADING...</p>
    </template>
  </Suspense>
  <hr />
  <Suspense>
    <template v-slot:default>
      <AsyncComp2 />
    </template>

    <template v-slot:fallback>
      <p>AsyncComp2 LOADING...</p>
    </template>
  </Suspense>
  <hr />
  <Suspense>
    <template v-slot:default>
      <AsyncComp3 />
    </template>

    <template v-slot:fallback>
      <p>AsyncComp3 LOADING...</p>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import AsyncComp from "./AsyncComp.vue";
import AsyncComp2 from "./AsyncComp2.vue";
const AsyncComp3 = defineAsyncComponent(() => import("./AsyncComp.vue"));
export default {
  setup() {
    return {};
  },

  components: {
    AsyncComp,
    AsyncComp2,
    AsyncComp3,
  },
};
</script>