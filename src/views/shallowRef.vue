<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-02 19:07:32
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-02 19:17:09
-->
<template>
  <h2>App</h2>

  <h3>m1: {{m1}}</h3>
  <h3>m2: {{m2}}</h3>

  <button @click="update">更新</button>
</template>

<script lang="ts">
import { shallowReactive, shallowRef } from "vue";

export default {
  setup() {
    const m1 = shallowReactive({ a: 1, b: { c: 2 } });
    const m2: any = shallowRef({ a: 1, b: { c: 2 } });

    const update = () => {
      // m1.b.c += 1; // 无效
      m1.a += 1; // 有效

      // m2.value.a += 1; // 无效
      m2.value = { a: 123 }; // 有效
    };

    return {
      m1,
      m2,
      update,
    };
  },
};
</script>