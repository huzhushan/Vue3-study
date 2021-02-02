<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-01-29 11:05:01
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-02 18:30:06
-->
<template>
  <h2>Parent</h2>
  <p>msg: {{msg}}</p>
  <button @click="update('--')">更新</button>
  <hr />
  <child
    :msg="msg"
    msg2="cba"
    @fn="update"
  >
    <template #aaa>
      <em>我是插槽的内容</em>
    </template>
  </child>

  <hr>
  <input
    type="text"
    placeholder="我会自动获取焦点"
    ref="inputRef"
  />

  <hr>
  <h2>x: {{ x }}, y: {{ y }}</h2>
</template>



<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onBeforeMount,
  onMounted,
  onActivated,
  onDeactivated,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onRenderTracked,
  onRenderTriggered,
} from "vue";
import child from "./child.vue";

function useMousePosition() {
  // 初始化坐标数据
  const x = ref(-1);
  const y = ref(-1);

  // 用于收集点击事件坐标的函数
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };

  // 挂载后绑定点击监听
  onMounted(() => {
    document.addEventListener("click", updatePosition);
  });

  // 卸载前解绑点击监听
  onUnmounted(() => {
    document.removeEventListener("click", updatePosition);
  });

  return { x, y };
}

export default defineComponent({
  components: {
    child,
  },

  setup() {
    const msg = ref("abc");

    function update(content: string) {
      msg.value += content;
    }

    const inputRef = ref<HTMLElement | null>(null);

    onBeforeMount(() => {
      console.log("--onBeforeMount");
    });

    onMounted(() => {
      console.log("--onMounted");
      inputRef.value && inputRef.value.focus();
    });

    onActivated(() => {
      console.log("--onActivated");
    });

    onDeactivated(() => {
      console.log("--onDeactivated");
    });

    onBeforeUpdate(() => {
      console.log("--onBeforeUpdate");
    });

    onUpdated(() => {
      console.log("--onUpdated");
    });

    onBeforeUnmount(() => {
      console.log("--onBeforeUnmount");
    });

    onUnmounted(() => {
      console.log("--onUnmounted");
    });

    onRenderTracked((event) => {
      console.log("--onRenderTracked", event);
    });

    onRenderTriggered((event) => {
      console.log("--onRenderTriggered", event);
    });

    const { x, y } = useMousePosition();

    return {
      msg,
      update,
      inputRef,
      x,
      y,
    };
  },
});
</script>