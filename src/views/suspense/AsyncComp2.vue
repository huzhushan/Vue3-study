<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 14:48:53
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 14:55:47
-->
<template>
  <h2>AsyncComp2</h2>
  <p>{{ msg }}</p>
</template>

<script lang="ts">
import axios from "axios";
export default {
  async setup() {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          msg: "abc",
        });
      }, 2000);
    });
    return result;
  },
};
</script>