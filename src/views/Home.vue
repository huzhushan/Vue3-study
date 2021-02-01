<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-01-29 11:05:01
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-01-30 18:29:51
-->
<template>
  <!-- 不再需要根元素 -->
  <h1>首页</h1>
  <!-- 
  <div>{{a}}-{{b}}-{{c}}</div>
  <button @click="handle">按钮</button>
 -->
  <div>{{count}}-{{boo}}-{{str}}-{{obj.a}}-{{obj.b}}</div>
  <button @click="update">更新</button>
  <button @click="add">add</button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Home",
  // data() {
  //   return {
  //     a: 1,
  //     b: 2,
  //   };
  // },
  // methods: {
  //   handle() {
  //     console.log("methods：handle");
  //   },
  // },
  setup() {
    console.log("setup", this); // this是undefined

    // const handle = () => {
    //   console.log("setup：handle");
    // };

    // return { a: 3, b: 4, c: 5, handle }; // 会和data和methods合并

    // // 一般定义原始类型的数据
    // const count = ref(1);
    // const str = ref("abc");
    // const boo = ref(true);
    // // 当然也可以定义对象，只不过定义对象有更好的方法：reactive
    // const obj = ref({ a: 1 });
    // const update = () => {
    //   count.value++;
    //   boo.value = !boo.value;
    //   str.value = str.value.split("").reverse().join("");
    //   obj.value.a++;
    // };

    // return { count, str, boo, obj, update };

    type Idata = {
      [propName: string]: any;
    };

    const initData: Idata = {
      count: 1,
      str: "abc",
      boo: true,
      obj: { a: 1 },
    };

    const state = reactive(initData);

    const update = () => {
      state.count++;
      state.boo = !state.boo;
      state.str = state.str.split("").reverse().join("");
      state.obj.a++;
    };

    const add = () => {
      state.obj.b = "bbb";
    };

    return { ...toRefs(state), update, add };
  },
});
</script>
