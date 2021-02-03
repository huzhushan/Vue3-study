<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 14:48:33
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 14:48:43
-->
<template>
  <h2>AsyncComp</h2>
  <p>{{ msg }}</p>
</template>

<script lang="ts">
export default {
  name: "AsyncComp",
  setup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          msg: "abc",
        });
      }, 2000);
    });
  },
};
</script>