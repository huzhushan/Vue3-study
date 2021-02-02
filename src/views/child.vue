<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-01 16:50:55
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-02 17:02:24
-->
<template>
  <div>
    <h3>Child</h3>
    <p>msg: {{msg}}</p>
    <slot name="aaa"></slot>
    <div>
      <button @click="update">更新</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "child",
  props: ["msg"],
  emits: ["fn"], // 可选的, 声明了更利于程序员阅读, 且可以对分发的事件数据进行校验

  // setup (props, context) {
  setup(props, { attrs, emit, slots }) {
    console.log(
      "props---",
      props,

      "attrs---",
      attrs,

      "slots---",
      slots.aaa,

      "emit---",
      emit
    );

    function update() {
      // 分发自定义事件
      emit("fn", "++");
    }

    return {
      update,
    };
  },
});
</script>