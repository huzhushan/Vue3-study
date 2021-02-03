<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-03 13:28:37
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 14:03:03
-->
<template>
  <button @click="modalOpen = true">
    Open full screen modal! (With teleport!)
  </button>

  <teleport to="body">
    <div
      v-if="modalOpen"
      class="modal"
    >
      <div>
        I'm a teleported modal! (My parent is "body")
        <button @click="modalOpen = false">Close</button>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  readonly,
  isRef,
  isReactive,
  isReadonly,
  isProxy,
} from "vue";
export default defineComponent({
  setup() {
    const num = ref(123);
    console.log("isRef", isRef(num));
    const obj = reactive({});
    console.log("isReactive", isReactive(obj));
    const rdObj = readonly(obj);
    console.log("isReadonly", isReadonly(rdObj));
    console.log("isProxy", isProxy(obj));
    console.log("isProxy", isProxy(rdObj));

    const modalOpen = ref(false);
    return {
      modalOpen,
    };
  },
});
</script>
<style>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
</style>