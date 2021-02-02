<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-02 19:29:32
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-02 19:34:12
-->
<template>
  <h2>readonly和shallowReadonly</h2>
  <h3>{{state}}</h3>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, readonly, shallowReadonly } from "vue";

export default {
  setup() {
    const state = reactive({
      a: 1,
      b: {
        c: 2,
      },
    });

    const rState1 = readonly(state);
    const rState2 = shallowReadonly(state);

    const update = () => {
      // rState1.a++; // ts报错
      // rState1.b.c++; // ts报错

      // rState2.a++; // ts报错
      rState2.b.c++; // 不报错，但是页面不会变化
    };

    return {
      state,
      update,
    };
  },
};
</script>