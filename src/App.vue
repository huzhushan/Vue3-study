<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-01-29 11:05:01
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-03 16:23:13
-->
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/demo">Demo</router-link> |
    <router-link to="/shallowRef">shallowRef和shallowReactive</router-link> |
    <router-link to="/shallowReadonly">readonly和shallowReadonly</router-link> |
    <router-link to="/markRaw">toRaw和markRaw</router-link> |
    <router-link to="/toRef">toRef</router-link> |
    <router-link to="/customRef">customRef</router-link> |
    <router-link to="/provide">provide/inject</router-link> |
    <router-link to="/isRef">isRef/isReactive/isReadonly/isProxy</router-link> |
    <router-link to="/suspense">Suspense</router-link>
  </div>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
