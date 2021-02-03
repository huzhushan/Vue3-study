<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 13:21:26
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 13:21:27
-->
<template>
  <div>
    <h2>子组件</h2>
    <p>当前颜色: {{color}}</p>
    <hr />
    <GrandSon />
  </div>
</template>

<script lang="ts">
import { inject } from "vue";
import GrandSon from "./GrandSon.vue";
export default {
  components: {
    GrandSon,
  },
  setup() {
    const color = inject("color");

    return {
      color,
    };
  },
};
</script>