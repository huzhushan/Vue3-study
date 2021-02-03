<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 10:50:32
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 10:52:27
-->
<template>
  <h2>App</h2>
  <p>{{state}}</p>
  <p>{{foo}}</p>
  <p>{{foo2}}</p>

  <button @click="update">更新</button>

</template>

<script lang="ts">
import { reactive, toRef, ref } from "vue";

export default {
  setup() {
    const state = reactive({
      foo: 1,
      bar: 2,
    });

    const foo = toRef(state, "foo");
    const foo2 = ref(state.foo);

    const update = () => {
      // state.foo++;
      // foo.value++;
      foo2.value++; // foo和state中的数据不会更新
    };

    return {
      state,
      foo,
      foo2,
      update,
    };
  },
};
</script>