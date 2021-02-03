<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 13:21:32
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 13:22:41
-->
<template>
  <h2>孙组件</h2>
  <p>当前颜色: {{color}}</p>
</template>

<script lang="ts">
import { inject } from "vue";
export default {
  setup() {
    const color = inject("color");

    return {
      color,
    };
  },
};
</script>
