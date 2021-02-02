<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-02 18:42:52
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-02 18:59:23
-->
<template>
  <div class="about">
    <h2 v-if="loading">LOADING...</h2>
    <h2 v-else-if="errorMsg">{{ errorMsg }}</h2>

    <!-- 
    <ul v-else>
      <li>id: {{result.id}}</li>
      <li>name: {{result.name}}</li>
      <li>distance: {{result.distance}}</li>
    </ul> 
    -->

    <ul
      v-else
      v-for="p in result"
      :key="p.id"
    >
      <li>id: {{ p.id }}</li>
      <li>title: {{ p.title }}</li>
      <li>price: {{ p.price }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useRequest from "@/hooks/useRequest";

// 地址数据接口
interface AddressResult {
  id: number;
  name: string;
  distance: string;
}

// 产品数据接口
interface ProductResult {
  id: string;
  title: string;
  price: number;
}

export default defineComponent({
  setup() {
    // const {loading, result, errorMsg} = useRequest<AddressResult>('xxx/xxx/address.json')
    const { loading, result, errorMsg } = useRequest<ProductResult[]>(
      "http://192.168.12.105:61488/products.json"
    );

    return {
      loading,
      result,
      errorMsg,
    };
  },
});
</script>