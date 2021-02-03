<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-02 19:56:01
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 09:32:01
-->
<template>
  <h2>{{state}}</h2>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
/* 
toRaw: 得到reactive代理对象的目标数据对象
*/
import { ref, reactive, toRaw, markRaw } from "vue";
export default {
  setup() {
    const state = reactive<any>({
      name: "tom",
      age: 25,
    });

    const testToRaw = () => {
      const user = toRaw(state);
      user.age++; // 界面不会更新
      console.log(user);
      console.log(state);
    };

    const testMarkRaw = () => {
      const likes = ["a", "b"];
      // state.likes = likes
      state.likes = markRaw(likes); // likes数组就不再是响应式的了
      console.log(state.likes);
      setTimeout(() => {
        state.likes.push("c");
      }, 1000);
    };

    return {
      state,
      testToRaw,
      testMarkRaw,
    };
  },
};
</script>