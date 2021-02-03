<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 16:22:20
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 16:26:25
-->
<template>
  <p>{{msg}}</p>
  <Child
    v-model="msg"
    msg="hello world"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Child from "./child.vue";

export default defineComponent({
  components: {
    Child,
  },
  setup() {
    const msg = ref("abc");
    return {
      msg,
    };
  },
});
</script>