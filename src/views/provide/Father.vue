<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 13:20:36
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 13:20:48
-->
<template>
  <h1>父组件</h1>
  <p>当前颜色: {{color}}</p>
  <button @click="color='red'">红</button>
  <button @click="color='yellow'">黄</button>
  <button @click="color='blue'">蓝</button>

  <hr />
  <Son />
</template>

<script lang="ts">
import { provide, ref } from "vue";

import Son from "./Son.vue";
export default {
  name: "ProvideInject",
  components: {
    Son,
  },
  setup() {
    const color = ref("red");

    provide("color", color);

    return {
      color,
    };
  },
};
</script>