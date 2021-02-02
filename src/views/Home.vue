<!--
 * @Descripttion: 
 * @version: 
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-01-29 11:05:01
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-02 17:49:25
-->
<template>
  <!-- 不再需要根元素 -->
  <h1>首页</h1>
  <!-- 
    <div>{{a}}-{{b}}-{{c}}</div>
    <button @click="handle">按钮</button>
  -->

  <!-- 
  <div>{{count}}-{{boo}}-{{str}}-{{obj.a}}</div>
  <button @click="update">更新</button>
  -->

  <!-- 
  <div
    v-for="(value, key ) of person"
    :key="key"
  >
    {{key}} - {{value}}
  </div>
  <button @click="add">增加对象属性</button>
  <hr />
  <div
    v-for="(item, index) of arr"
    :key="index"
  >{{item}}</div>
  <button @click="modify">修改数组元素</button> 
-->

  <div>str - <input v-model="str" /></div>
  <div>firstName - <input v-model="firstName" /></div>
  <div>lastName - <input v-model="lastName" /></div>
  <div>fullName1 - {{fullName1}}</div>
  <div>fullName2 - <input v-model="fullName2" /></div>
  <div>fullName3 - {{fullName3}}</div>
  <div>fullName4 - {{fullName4}}</div>

</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  watchEffect,
} from "vue";
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

    // const state = reactive({
    //   count: 1,
    //   str: "abc",
    //   boo: true,
    //   obj: { a: 1 },
    // });

    // const update = () => {
    //   state.count++;
    //   state.boo = !state.boo;
    //   state.str = state.str.split("").reverse().join("");
    //   state.obj.a++;
    // };

    // return { ...toRefs(state), update };

    // const initData: any = {
    //   person: {
    //     name: "张三",
    //     age: 20,
    //   },
    //   arr: ["a", "b", "c"],
    // };
    // const state = reactive(initData);

    // const add = () => {
    //   state.person.sex = "男";
    //   state.person.hobby = ["吃饭", "睡觉", "打豆豆"];
    // };

    // const modify = () => {
    //   state.arr[0] = "A";
    // };

    // return { ...toRefs(state), add, modify };

    const user = reactive({
      firstName: "zhang",
      lastName: "san",
    });

    const str = ref("abc");

    // 只有getter的计算属性
    const fullName1 = computed(() => {
      return user.firstName + "-" + user.lastName;
    });

    // 有getter与setter的计算属性
    const fullName2 = computed({
      get() {
        return user.firstName + "-" + user.lastName;
      },

      set(value: string) {
        const names = value.split("-");
        user.firstName = names[0];
        user.lastName = names[1];
      },
    });

    // 侦听ref数据
    watch(str, (newVal, oldVal) => {
      console.log("watch ref", newVal, oldVal);
    });
    // 侦听reactive对象的属性
    watch(
      () => user.firstName,
      (newVal, oldVal) => {
        console.log("watch reactive", newVal, oldVal);
      }
    );

    // 监听多个数据
    watch(
      [str, () => user.firstName, () => user.lastName],
      (newVal, oldVal) => {
        console.log("监视多个数据", newVal, oldVal);
      }
    );

    /*
        使用watch的2个特性:
          深度监视
          初始化立即执行
        */
    const fullName3 = ref("");
    watch(
      user,
      () => {
        console.log("立即监听,深度监听");
        fullName3.value = user.firstName + "-" + user.lastName;
      },
      {
        immediate: true, // 是否初始化立即执行一次, 默认是false
        deep: true, // 是否是深度监视, 默认是false
      }
    );

    /*
        watchEffect: 监视所有回调中使用的数据
        */
    const fullName4 = ref("");
    watchEffect(() => {
      console.log("watchEffect");
      fullName4.value = user.firstName + "-" + user.lastName;
    });

    return {
      ...toRefs(user),
      str,
      fullName1,
      fullName2,
      fullName3,
      fullName4,
    };
  },
});
</script>
