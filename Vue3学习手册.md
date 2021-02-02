

## 1. 认识 Vue3

### 1 了解相关信息

- Vue.js 3.0 "One Piece" 正式版在 2020 年 9 月份发布
- 2 年多开发, 100+位贡献者, 2600+次提交, 600+次 PR
- **Vue3 支持 vue2 的大多数特性**
- **更好的支持 Typescript**

### 2 性能提升:

- 打包大小减少 41%
- 初次渲染快 55%, 更新渲染快 133%
- 内存减少 54%
- **使用 Proxy 代替 defineProperty 实现数据响应式**
- **重写虚拟 DOM 的实现和 Tree-Shaking**

### 3 新增特性

- **Composition (组合) API**
- setup
  - ref 和 reactive
  - computed 和 watch
  - 新的生命周期函数
  - provide 与 inject
  - ...
- 新组件
  - Fragment - 文档碎片
  - Teleport - 瞬移组件的位置
  - Suspense - 异步加载组件的 loading 界面
- 其它 API 更新
  - 全局 API 的修改
  - 将原来的全局 API 转移到应用对象
  - 模板语法变化

## 2. 创建 vue3 项目

### 1 使用 vue-cli 创建

文档: https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```shell
## 安装或者升级
npm install -g @vue/cli
## 保证 vue cli 版本在 4.5.0 以上
vue --version
## 创建项目
vue create my-project
```

然后的步骤

- Please pick a preset - 选择 **\*Manually select features\***
- Check the features needed for your project - 选择上 **\*TypeScript\*** ，特别注意点空格是选择，点回车是下一步
- Choose a version of Vue.js that you want to start the project with - 选择 **\*3.x (Preview)\***
- Use class-style component syntax - **是否使用class类的方式创建组件？** 这里我们不使用，输入n
- Use Babel alongside TypeScript - 直接回车
- Pick a linter / formatter config - 直接回车
- Use history mode for router? - 直接回车
- Pick a linter / formatter config - 直接回车
- Pick additional lint features - 直接回车
- Where do you prefer placing config for Babel, ESLint, etc.? - 直接回车
- Save this as a preset for future projects? - 直接回车

### 2 使用 vite 创建

- 文档: https://v3.cn.vuejs.org/guide/installation.html
- vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，
- 它做到了**_本地快速开发启动_**, 在生产环境下基于 Rollup 打包。
  - 快速的冷启动，不需要等待打包操作；
  - 即时的热模块更新，替换性能和模块数量的解耦让更新飞起；
  - 真正的按需编译，不再等待整个应用编译完成，这是一个巨大的改变。

```shell
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

# 二. Composition API

## 1. Composition API(常用部分)

文档：https://composition-api.vuejs.org/zh/api.html

### setup

> 我们可以跟以前一样定义data和methods，但是在vue3中我们更推荐使用setup函数

- setup是一个函数, 只在初始化时执行一次

  - 以后大部分代码都是在setup函数中写
  
- 返回一个对象, 对象中的属性或方法, 模板中可以直接使用

- setup返回的数据会和data和methods进行合并，setup优先级更高

- setup函数中**没有this**

  - 以后开发都不使用this了

- setup 不能是一个 async 函数

  > 因为setup函数必须返回一个json对象供模板使用,如果setup是一个async函数,返回的将是一个promise对象

```html
<template>
  <!-- 不再需要根元素 -->
  <h1>首页</h1>
  <div>{{a}}-{{b}}-{{c}}</div>
  <button @click="handle">按钮</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ // defineComponent就是定义一个组件的意思
  name: "Home",
  data() {
    return {
      a: 1,
      b: 2,
    };
  },
  methods: {
    handle() {
      console.log("methods：handle");
    },
  },
  setup() {
    console.log("setup", this); // this是undefined

    const handle = () => {
      console.log("setup：handle");
    };
	
    // 返回一个对象，提供数据给模板使用
    return { a: 3, b: 4, c: 5, handle }; // 会和data和methods合并，setup优先级更高
  },
});
</script>
```



### ref

> 前面我们在setup函数中返回了一些数据，但是如果我们直接修改这些数据，我们可以发现并不是响应式的。
>
> 如何创建响应式的数据，这时候我们就要借助ref了。
>
> ```js
> setup() {
>     let a = 1, b = 2;
>     
>     const update = () => {
>         a++; 
>         b++; 
>         console.log(a, b); // 能打印出新值，但是页面无变化，不是响应式
>     }
>     
>     return { a, b, update }; 
> },
> ```
>

- 作用: 定义响应式数据
- 语法: const xxx = ref(initValue):
  - 创建一个包含响应式数据的引用(reference)对象
  - js 中修改数据: `xxx.value = otherValue `
  - 模板中显示数据: 不需要`.value`，直接使用`{{xxx}}`
- 一般用来定义一个原始类型的响应式数据

```html
<template>
  <h2>{{count}}-{{boo}}-{{str}}-{{obj.a}}</h2>
  <button @click="update">更新</button>
</template>

<script>
  import { defineComponent, ref } from "vue";
  export default defineComponent({
    setup() {
        // 一般定义原始类型的数据
        const count = ref(1);
        const str = ref("abc");
        const boo = ref(true);
        // 当然也可以定义对象，只不过定义对象有更好的方法：reactive
        const obj = ref({ a: 1 });
        
        const update = () => {
          // 修改数需要使用：xxx.value = otherValue  
          count.value++;
          boo.value = !boo.value;
          str.value = str.value.split("").reverse().join("");
          obj.value.a++;
        };

        return { count, str, boo, obj, update };
    },
  });
</script>
```

### reactive

- 作用: 定义对象格式的响应式数据

  > 如果用 ref 定义对象/数组, 内部会自动将对象/数组转换为 reactive 的对象

- const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象

- js中修改数据不需要操作`.value`

- 一般用来定义一个引用类型的响应式数据

```html
<template>
  <h2>{{state.count}}-{{state.boo}}-{{state.str}}-{{state.obj.a}}</h2>
  <button @click="update">更新</button>
</template>

<script>
  import { defineComponent, reactive } from "vue";
  export default defineComponent({
    setup() {
        // 创建对象格式的响应式数据
        const state = reactive({
          count: 1,
          str: "abc",
          boo: true,
          obj: { a: 1 },
        });

        const update = () => {
          // 更新的时候不需要写`.value`
          state.count++;
          state.boo = !state.boo;
          state.str = state.str.split("").reverse().join("");
          state.obj.a++;
        };

        return { state, update };
    },
  });
</script>
```

上面我们用reactive定义了一个对象格式的响应式数据，但是在模板中我们发现每个数据都有一个`state.`前缀，我们能不能去除这个`state.`前缀呢？

当然是可以的，我们return的时候对state进行一次扩展运算就行了

```js
setup() {
    // 省略
	
    // 把state展开
    return { ...state, update };
},
```
这样template中就不需要`state.`前缀了
```html
<template>
  <h2>{{count}}-{{boo}}-{{str}}-{{obj.a}}</h2>
</template>
```

但是这时候，我们点击`更新`按钮，发现页面不变化了，数据不是响应式了，这时因为展开之后的数据不是响应式的，解决这个问题我们需要使用toRefs

### toRefs

- 将响应式对象中所有属性包装为ref对象, 并返回包含这些ref对象的普通对象
- 应用：对reactive定义的对象进行toRefs包装，包装之后的对象中每个属性都是响应式的。

```vue
<template>
  <h2>{{count}}-{{boo}}-{{str}}-{{obj.a}}</h2>
  <button @click="update">更新</button>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";
  export default defineComponent({
    setup() {
        //++++++++这部分代码都没变++++++++++++++++++++
        // 创建对象格式的响应式数据
        const state = reactive({
          count: 1,
          str: "abc",
          boo: true,
          obj: { a: 1 },
        });

        const update = () => {
          // 更新的时候不需要写`.value`
          state.count++;
          state.boo = !state.boo;
          state.str = state.str.split("").reverse().join("");
          state.obj.a++;
        };
		//++++++++以上代码都没变++++++++++++++++++++
        
        // 用toRefs包装state
        return { ...toRefs(state), update };
    },
  });
</script>
```

### 比较 Vue2 与 Vue3 的响应式(重要)

#### vue2中的问题
1. 对象直接添加新的属性或删除已有属性，界面不会自动更新，不是响应式

2. 直接通过下标修改元素(arr[1] = xxx)或更新数组的length，界面不会自动更新，不是响应式 

#### vue2 的响应式

- 核心:
  - 对象: 通过 defineProperty 对**对象的已有属性**值的读取和修改进行劫持(监视/拦截)

    ```js
    /*
    const vm = new Vue({
    	el: '#app',
    	data: {
    		name: "John",
        	age: 12,
    	}
    })
    */
    
    // 假设vm是我们的vue实例
    const vm = {} 
    // data数据
    const data = { 
        name: "John",
        age: 12,
    }
    // 遍历data,将data属性绑定到vm上,对属性的读取和修改进行拦截
    Object.entries(data).forEach(([prop, value]) => {
        let initValue = value;
        Object.defineProperty(vm, prop, {
            get () {
                console.log('执行get')
                return initValue
            },
            set (newValue) {
                console.log('执行set')
                initValue = newValue
            }
        })
    })
    
    
    // 读取属性值
    console.log(vm.name); // '执行get' 'John'
    // 修改属性值
    vm.name = 'bob'; // '执行set'
    console.log(vm.name); // '执行get' 'bob'
    // 添加属性
    vm.sex = '男'; // 不会执行set方法
    console.log(vm.sex); // 能打印出`男`,但是不会执行get方法
    ```
  
    >  关于vue2响应式的具体实现可以阅读我的文章：[手动实现MVVM双向绑定(v-model原理)](https://www.toutiao.com/i6919477699404694023/?tt_from=weixin&utm_campaign=client_share&wxshare_count=1&timestamp=1612002792&app=news_article&utm_source=weixin&utm_medium=toutiao_ios&use_new_style=1&req_id=20210130183312010026076020234E4793&group_id=6919477699404694023)
  
  - 数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持
  
    > 数组的push、pop、splice等方法之所以能正常使用，其实是因为被vue重写了
    
    ```js
    // 把push,pop等方法放在一个对象里面
    const obj = {
      push() {},
      pop() {},
      shift() {},
      unshift() {},
      splice() {},
      sort() {},
      reverse() {}
    }
    
    // 遍历obj，使用defineProperty监听
    Object.keys(obj).forEach(key => {
        Object.defineProperty(obj, key, {
            value: function(...args) {
                return Array.prototype[key].call(this, ...args)
            }
        })
    })
    
    const arr = [];
    arr.__proto__ = obj; // 将数组的隐式原型指向obj。
    // 我们知道arr.__proto__等于它的构造函数的原型，也就是Array.prototype，所以arr可以执行push、pop等方法，但是现在arr.__proto__又等于obj了，所以arr.push就相当于obj.push了,而obj.push我们用defineProperty进行了监听,执行obj.push()就会执行value函数
    
    // 测试
    arr.push(1) // 执行这一句就相当于执行obj.push(1)
    console.log(arr)
    ```
    
    

#### Vue3 的响应式

- 核心:
  - 通过 Proxy(代理): 拦截对**对象本身**的操作, 包括属性值的读写, 属性的添加, 属性的删除等...
  
  - 通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
  
  - 文档:
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
    
    ```js
    const user = {
        name: "John",
        age: 12,
    };
    
    // 代理对象
    const proxyUser = new Proxy(user, {
        get(target, prop) {
            console.log("劫持get()", prop);
            return Reflect.get(target, prop);
        },
    
        set(target, prop, val) {
            console.log("劫持set()", prop, val);
            return Reflect.set(target, prop, val); 
        },
    
        deleteProperty(target, prop) {
            console.log("劫持delete", prop);
            return Reflect.deleteProperty(target, prop);
        },
    });
    
    // 读取属性值
    console.log(proxyUser === user); // false
    console.log(proxyUser.name); // 劫持get() name John
    // 设置属性值
    proxyUser.name = "bob"; // 劫持set() name bob
    proxyUser.age = 13;
    console.log(user);
    // 添加属性
    proxyUser.sex = "男"; // 劫持set() sex 男
    console.log(user);
    // 删除属性
    delete proxyUser.sex; // 劫持delete sex
    console.log(user);
    ```
    
    > 现在我们可以利用Proxy手动实现ref和reactive了,关于这个知识我们稍后讲解

#### vue3中不存在vue2的问题

> 正式由于vue3是使用Proxy代理的方式拦截对象本身,所以在vue3中添加/删除属性都是响应式的,通过下标修改数组也是响应式的.

```js
<template>
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
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";
  export default defineComponent({
    setup() {
        // 为了避免ts报错,将initData指定为any类型
        const initData: any = {
          person: {
            name: "张三",
            age: 20,
          },
          arr: ["a", "b", "c"],
        };
        const state = reactive(initData);
		
        // 添加新属性,也是响应式的
        const add = () => { 
          state.person.sex = "男";
          state.person.hobby = ["吃饭", "睡觉", "打豆豆"];
        };
		
        // 通过下标修改元素,也是响应式的
        const modify = () => { 
          state.arr[0] = "A"; 
        };

        return { ...toRefs(state), add, modify };
    },
  });
</script>
```



### setup 的参数

- props - 接收父组件传入的**通过 props 声明过的属性**
- context - 是一个对象,解构出来包含:
  - attrs - 接收父组件传入的**没有通过 props 声明过的属性**, 相当于 this.$attrs
  - slots - 接收父组件传入的插槽内容的对象, 相当于 this.$slots
  - emit - 用来分发自定义事件的函数, 相当于 this.$emit

父组件:

```html
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
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from "vue";
  import child from "./child.vue";

  export default defineComponent({
    components: {
      child,
    },

    setup() {
      const msg = ref("abc");

      function update(content: string) {
        msg.value += content;
      }
      return {
        msg,
        update,
      };
    },
  });
</script>
```

子组件child.vue:

```html
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
          slots,

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
```

### 计算属性computed

> 回顾vue2中的计算属性
>
> ```js
> computed: {
>     // 只有getter
>     fullName() {
>         return this.firstName + " " + this.lastName;
>     },
>     // 有 getter 和 setter
>     fullName2: {
>         get() {
>             return this.firstName + " " + this.lastName;
>         }, 
>         set(val) {
>             const names = value.split(" ");
>             this.firstName = names[0];
>             this.lastName = names[1];
>         }
>     }
> }
> ```
>

vue3的计算属性

- computed - 用法跟vue2类似，不过需要先引入computed

```js
import { defineComponent, reactive, toRefs, computed } from "vue";

export default defineComponent({
    setup() {
      const user = reactive({
        firstName: "zhang",
        lastName: "san",
      });

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

      return {
        ...toRefs(user),
        fullName1,
        fullName2,
      };
    },
});
```

### 侦听属性watch

> 回顾vue2的侦听属性
>
> ```js
> watch: {
>     obj(newVal, oldVal) {
>         console.log(newVal, oldVal);
>     },
>     // 立即监听、深度监听
>     obj: {
>         handler(newVal, oldVal) {
>             console.log(newVal, oldVal);
>         },
>         immediate: true, // 初始化立即执行一次
>         deep: true, // 深度监视
>     },
>     // 监听对象上的属性
>     'obj.a'(newVal, oldVal) {
>         console.log(newVal, oldVal);
>     }    
> }
> ```

vue3的侦听属性：

- watch - **指定监听数据**
  - 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
  
    - 如果是监听reactive对象中的属性,  必须通过函数来指定
    - 监听多个数据,使用数组来指定
  
  - 默认初始时不执行回调, 但可以通过配置 immediate 为 true, 来指定初始时立即执行第一次
  
  - 通过配置 deep 为 true, 来指定深度监视
  
- watchEffect - **不指定监听数据**
  - 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
  - **默认初始时就会执行第一次**

> 使用时需要先引入watch 和 watchEffect

```js

  import { defineComponent, ref, reactive, toRefs, watch, watchEffect } from "vue";

  export default defineComponent({
    setup() {
        const str = ref('abc')
        const user = reactive({
          firstName: "zhang",
          lastName: "san",
        });
      
        // 侦听ref数据
        watch(str, (newVal, oldVal) => {
          console.log("watch ref", newVal, oldVal);
        });
        
        // 侦听reactive对象的属性
        watch(
          () => user.firstName, // 侦听reactive对象的属性, 必须通过函数来指定
          (newVal, oldVal) => {
            console.log("watch reactive", newVal, oldVal);
          }
        );

      // watch多个数据: 使用数组来指定 
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
          console.log('watchEffect')
          fullName4.value = user.firstName + '-' + user.lastName
      }) 
  
      return {
        ...toRefs(user),
        str,
        fullName3,
        fullName4,
      };
    },
  });

```

### 生命周期

> vue2中的生命周期钩子函数依旧可以使用，不过建议使用vue3的钩子函数

- **vue2与vue3生命周期对比**

|          vue2 | vue3            |
| ------------: | --------------- |
|  beforeCreate | setup           |
|       created | setup           |
|   beforeMount | onBeforeMount   |
|       mounted | onMounted       |
|  beforeUpdate | onBeforeUpdate  |
|       updated | onUpdated       |
| beforeDestroy | onBeforeUnmount |
|     destroyed | onUnmounted     |

**注意：**beforeDestroy和destroyed已经被废弃，如果想继续使用vue2的写法，对应的api是beforeUnmount(~~beforeDestroy~~)和unmounted(~~destroyed~~)

```html
<template>
  <p>msg: {{msg}}</p>
  <button @click="update('--')">更新</button>
</template>

<script lang="ts">
  import {
      defineComponent,
      ref,
      onBeforeMount,
      onMounted,
      onActivated,
  	  onDeactivated,
      onBeforeUpdate,
      onUpdated,
      onBeforeUnmount,
      onUnmounted,
  } from "vue"; 

  export default defineComponent({
    beforeCreate() {
      console.log("beforeCreate");
    },

    created() {
      console.log("created");
    },

    beforeMount() {
      console.log("beforeMount");
    },

    mounted() {
      console.log("mounted");
    },

    beforeUpdate() {
      console.log("beforeUpdate");
    },

    updated() {
      console.log("updated");
    },
	// vue3中已经用beforeUnmount代替了beforeDestroy
    beforeUnmount() {
      console.log("beforeUnmount");
    },
	// vue3中已经用unmounted代替了destroyed
    unmounted() {
      console.log("unmounted");
    },
      
    setup(){
        const msg = ref("abc");

        function update(content: string) {
          msg.value += content;
        }
        
        onBeforeMount(() => {
          console.log("--onBeforeMount");
        });

        onMounted(() => {
          console.log("--onMounted");
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
     
        return {
          msg,
          update
        };
    }
  });
</script>
```

- **新增的调试用的钩子函数**

  > 它会跟踪页面上所有响应式变量和方法的状态，也就是我们用return返回去的值，他都会跟踪。只要页面有update的情况，他就会跟踪，然后生成一个event对象，我们通过event对象来查找程序的问题所在

  - onRenderTriggered - **在onBeforeUpdate前触发**
  - onRenderTracked  - **在onBeforeUpdate后触发**

  ```js
  import {
    onRenderTriggered,
    onRenderTracked,
  } from "vue";
  
  setup(){
      onRenderTriggered((event) => {
        console.log("--onRenderTriggered", event);
      });
      onRenderTracked((event) => {
        console.log("--onRenderTracked", event);
      });
  }
  ```

### ref 获取元素

> 我们知道vue2中是用this.$refs.xxx来获取元素或组件的，但是vue3中 没有this的概念，应该如何获取元素呢
>
> 这个时候我们可以使用之前学过的ref创建响应式数据的api来获取元素

1. 使用ref创建响应式数据，假设叫X
2. 模板中绑定ref属性，值为上面的X
   - 注意不能使用v-bind动态绑定
   - 这时X就是一个dom元素或组件了

示例: 让输入框自动获取焦点

```vue
<template>
  <!-- 2. 模板中绑定ref属性，此时inputRef就是这个input元素了 -->
  <input type="text" ref="inputRef" placeholder="我会自动获取焦点" />
</template>

<script lang="ts">
import { onMounted, ref } from "vue";

export default {
  setup() {
    // 1. 使用ref创建响应式数据inputRef
    const inputRef = ref<HTMLElement | null>(null); // 为了防止ts报错，需要加上ts类型校验
	
    // 3. 渲染完成，让input获取焦点，注意要操作`.value`
    onMounted(() => {
      inputRef.value && inputRef.value.focus();
    });

    return {
      inputRef,
    };
  },
};
</script>
```

### 自定义 hook 函数

> 用过react的同学对**hook函数**这个名词应该不陌生，hook函数翻译成中文就是钩子函数（注意并不只是生命周期钩子函数）。
>
> 其实我们前面学过的所有api，比如ref、reactive、computed、watch、onBeforeMount等等都是hook函数，只不过他们是vue内部hook函数，现在我们要学怎么自定义一个hook函数。

1. 创建一个函数，函数的名称必须**use开头**

2. 函数必须return一些数据

   

需求 1: 收集用户鼠标点击页面的坐标

```vue
<template>
  <div>
    <h2>x: {{ x }}, y: {{ y }}</h2>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

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

export default {
  setup() {
    const { x, y } = useMousePosition();

    return {
      x,
      y,
    };
  },
};
</script>
```



需求 2: 封装发 ajax 请求的 hook 函数

hooks/useRequest.ts

```js
import { ref } from "vue";
import axios from "axios";

export default function useRequest<T>(url: string) {
  // result的数据类型用泛型T表示，因为不同接口返回的数据结构肯定是不一样的
  const result = ref<T | null>(null);
  const loading = ref(true);
  const errorMsg = ref("");

  axios
    .get(url)
    .then((response) => {
      loading.value = false;
      result.value = response.data;
      errorMsg.value = "";
    })
    .catch((e) => {
      loading.value = false;
      result.value = null;
      errorMsg.value = e.message || "未知错误";
    });

  return {
    loading,
    result,
    errorMsg,
  };
}
```

```vue
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

    <ul v-else v-for="p in result" :key="p.id">
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
    // const {loading, result, errorMsg} = useRequest<AddressResult>('xxx/xxx/address.json'); 
    const { loading, result, errorMsg } = useRequest<ProductResult[]>('xxx/xxx/products.json');

    return {
      loading,
      result,
      errorMsg,
    };
  },
});
</script>
```



## 2. Composition API(其它部分)

### 1 shallowReactive 与 shallowRef

- 它们都表示浅响应式

  >  reactive和ref是深响应

- shallowReactive : 只处理了对象第一层属性的响应式（只响应第一层）

- shallowRef: 只有重新赋值时才是响应式（不响应内部数据，只响应整体）

```html
<template>
  <h2>shallowReactive和shallowRef</h2>

  <h3>m1: {{m1}}</h3>
  <h3>m2: {{m2}}</h3>

  <button @click="update">更新</button>
</template>

<script lang="ts">
  import { shallowReactive, shallowRef } from "vue";


export default {
    setup() {
        const m1 = shallowReactive({ a: 1, b: { c: 2 } });
        const m2: any = shallowRef({ a: 1, b: { c: 2 } });

        const update = () => {
          // m1.b.c += 1; // 无效
          m1.a += 1; // 有效

          // m2.value.a += 1; // 无效
          m2.value = { a: 123 }; // 有效
        };

        return {
          m1,
          m2,
          update,
        };
    },
};
</script>
```

### 2 readonly 与 shallowReadonly

- 它们表示只读代理对象
- readonly:
  - 深度只读
  - 设置readonly后，修改响应式数据会报错
- shallowReadonly
  - 浅只读
  - 设置shallowReadonly后，修改响应式数据的第一层属性会报错
- 应用场景:
  - 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

```html
<template>
  <h2>readonly和shallowReadonly</h2>
  <h3>{{state}}</h3>
  <button @click="update">更新</button>
</template>

<script lang="ts">
  import { reactive, readonly, shallowReadonly } from "vue";

  export default {
    setup() {
      const state = reactive({
        a: 1,
        b: {
          c: 2,
        },
      });

      const rState1 = readonly(state)
      const rState2 = shallowReadonly(state);

      const update = () => {
        // rState1.a++ // ts报错
        // rState1.b.c++ // ts报错

        // rState2.a++ // ts报错
        rState2.b.c++; // 不报错，但是页面不会变化
      };

      return {
        state,
        update,
      };
    },
  };
</script>
```

### 3 toRaw 与 markRaw

- toRaw
  - 返回 `reactive` 或 `readonly` 对象的原始数据。
  - 这是一个还原方法，可用于临时读取，得到的数据不具有响应式。
- markRaw
  - 标记一个对象，**使其不具有响应式**
  - 应用场景:
    - 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
    - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

```html
<template>
  <h2>{{state}}</h2>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">

  import { markRaw, reactive, toRaw } from "vue";
  export default {
    setup() {
      const state = reactive<any>({
        name: "tom",
        age: 25,
      });

      const testToRaw = () => {
        const user = toRaw(state);
        user.age++; // 界面不会更新
      };

      const testMarkRaw = () => {
        const likes = ["a", "b"];
        // state.likes = likes
        state.likes = markRaw(likes); // likes数组就不再是响应式的了
        setTimeout(() => {
          state.likes.push("c");
        }, 1000);
      };

      return {
        state,
        testToRaw,
        testMarkRaw,
      };
    },
  };
</script>
```

### 4 toRef

- 为源响应式对象上的某个属性创建一个 ref 对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
- 区别 ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
- 应用: 当要将 某个 prop 的 ref 传递给复合函数时，toRef 很有用

```html
<template>
  <h2>App</h2>
  <p>{{state}}</p>
  <p>{{foo}}</p>
  <p>{{foo2}}</p>

  <button @click="update">更新</button>

  <Child :foo="foo" />
</template>

<script lang="ts">
  /*
toRef:
  为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
  区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
  应用: 当要将某个 prop 的 ref 传递给复合函数时，toRef 很有用
*/

  import { reactive, toRef, ref } from "vue";
  import Child from "./Child.vue";

  export default {
    setup() {
      const state = reactive({
        foo: 1,
        bar: 2,
      });

      const foo = toRef(state, "foo");
      const foo2 = ref(state.foo);

      const update = () => {
        state.foo++;
        // foo.value++
        // foo2.value++  // foo和state中的数据不会更新
      };

      return {
        state,
        foo,
        foo2,
        update,
      };
    },

    components: {
      Child,
    },
  };
</script>
```

```html
<template>
  <h2>Child</h2>
  <h3>{{foo}}</h3>
  <h3>{{length}}</h3>
</template>

<script lang="ts">
  import { computed, defineComponent, Ref, toRef } from "vue";

  const component = defineComponent({
    props: {
      foo: {
        type: Number,
        require: true,
      },
    },

    setup(props, context) {
      const length = useFeatureX(toRef(props, "foo"));

      return {
        length,
      };
    },
  });

  function useFeatureX(foo: Ref) {
    const lenth = computed(() => foo.value.length);

    return lenth;
  }

  export default component;
</script>
```

### 5 customRef

- 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
- 需求: 使用 customRef 实现 debounce 的示例

```html
<template>
  <h2>App</h2>
  <input v-model="keyword" placeholder="搜索关键字" />
  <p>{{keyword}}</p>
</template>

<script lang="ts">
  /*
customRef:
  创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制

需求: 
  使用 customRef 实现 debounce 的示例
*/

  import { ref, customRef } from "vue";

  export default {
    setup() {
      const keyword = useDebouncedRef("", 500);
      console.log(keyword);
      return {
        keyword,
      };
    },
  };

  /* 
实现函数防抖的自定义ref
*/
  function useDebouncedRef<T>(value: T, delay = 200) {
    let timeout: number;
    return customRef((track, trigger) => {
      return {
        get() {
          // 告诉Vue追踪数据
          track();
          return value;
        },
        set(newValue: T) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            value = newValue;
            // 告诉Vue去触发界面更新
            trigger();
          }, delay);
        },
      };
    });
  }
</script>
```

### 6 provide 与 inject

- provide`和`inject`提供依赖注入，功能类似 2.x 的`provide/inject
- 实现跨层级组件(祖孙)间通信

```html
<template>
  <h1>父组件</h1>
  <p>当前颜色: {{color}}</p>
  <button @click="color='red'">红</button>
  <button @click="color='yellow'">黄</button>
  <button @click="color='blue'">蓝</button>

  <hr />
  <Son />
</template>

<script lang="ts">
  import { provide, ref } from "vue";
  /* 
- provide` 和 `inject` 提供依赖注入，功能类似 2.x 的 `provide/inject
- 实现跨层级组件(祖孙)间通信
*/

  import Son from "./Son.vue";
  export default {
    name: "ProvideInject",
    components: {
      Son,
    },
    setup() {
      const color = ref("red");

      provide("color", color);

      return {
        color,
      };
    },
  };
</script>
```

```html
<template>
  <div>
    <h2>子组件</h2>
    <hr />
    <GrandSon />
  </div>
</template>

<script lang="ts">
  import GrandSon from "./GrandSon.vue";
  export default {
    components: {
      GrandSon,
    },
  };
</script>
```

```html
<template>
  <h3 :style="{color}">孙子组件: {{color}}</h3>
</template>

<script lang="ts">
  import { inject } from "vue";
  export default {
    setup() {
      const color = inject("color");

      return {
        color,
      };
    },
  };
</script>
```

### 7 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

## 3. 手写组合 API

### 1 shallowReactive 与 reactive

```js
const reactiveHandler = {
  get(target, key) {
    if (key === "_is_reactive") return true;

    return Reflect.get(target, key);
  },

  set(target, key, value) {
    const result = Reflect.set(target, key, value);
    console.log("数据已更新, 去更新界面");
    return result;
  },

  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key);
    console.log("数据已删除, 去更新界面");
    return result;
  },
};

/* 
自定义shallowReactive
*/
function shallowReactive(obj) {
  return new Proxy(obj, reactiveHandler);
}

/* 
自定义reactive
*/
function reactive(target) {
  if (target && typeof target === "object") {
    Object.entries(target).forEach(([key, value]) => {
      target[key] = reactive(value);
    });

    return new Proxy(target, reactiveHandler);
  }

  return target;
}

/* 测试自定义shallowReactive */
const proxy = shallowReactive({
  a: {
    b: 3,
  },
});

proxy.a = { b: 4 }; // 劫持到了
proxy.a.b = 5; // 没有劫持到

/* 测试自定义reactive */
const obj = {
  a: "abc",
  b: [{ x: 1 }],
  c: { x: [11] },
};

const proxy = reactive(obj);
console.log(proxy);
proxy.b[0].x += 1;
proxy.c.x[0] += 1;
```

### 2 shallowRef 与 ref

```js
/*
自定义shallowRef
*/
function shallowRef(target) {
  const result = {
    _value: target, // 用来保存数据的内部属性
    _is_ref: true, // 用来标识是ref对象
    get value() {
      return this._value;
    },
    set value(val) {
      this._value = val;
      console.log("set value 数据已更新, 去更新界面");
    },
  };

  return result;
}

/* 
自定义ref
*/
function ref(target) {
  if (target && typeof target === "object") {
    target = reactive(target);
  }

  const result = {
    _value: target, // 用来保存数据的内部属性
    _is_ref: true, // 用来标识是ref对象
    get value() {
      return this._value;
    },
    set value(val) {
      this._value = val;
      console.log("set value 数据已更新, 去更新界面");
    },
  };

  return result;
}

/* 测试自定义shallowRef */
const ref3 = shallowRef({
  a: "abc",
});
ref3.value = "xxx";
ref3.value.a = "yyy";

/* 测试自定义ref */
const ref1 = ref(0);
const ref2 = ref({
  a: "abc",
  b: [{ x: 1 }],
  c: { x: [11] },
});
ref1.value++;
ref2.value.b[0].x++;
console.log(ref1, ref2);
```

### 3 shallowReadonly 与 readonly

```js
const readonlyHandler = {
  get(target, key) {
    if (key === "_is_readonly") return true;

    return Reflect.get(target, key);
  },

  set() {
    console.warn("只读的, 不能修改");
    return true;
  },

  deleteProperty() {
    console.warn("只读的, 不能删除");
    return true;
  },
};

/* 
自定义shallowReadonly
*/
function shallowReadonly(obj) {
  return new Proxy(obj, readonlyHandler);
}

/* 
自定义readonly
*/
function readonly(target) {
  if (target && typeof target === "object") {
    if (target instanceof Array) {
      // 数组
      target.forEach((item, index) => {
        target[index] = readonly(item);
      });
    } else {
      // 对象
      Object.keys(target).forEach((key) => {
        target[key] = readonly(target[key]);
      });
    }
    const proxy = new Proxy(target, readonlyHandler);

    return proxy;
  }

  return target;
}

/* 测试自定义readonly */
/* 测试自定义shallowReadonly */
const objReadOnly = readonly({
  a: {
    b: 1,
  },
});
const objReadOnly2 = shallowReadonly({
  a: {
    b: 1,
  },
});

objReadOnly.a = 1;
objReadOnly.a.b = 2;
objReadOnly2.a = 1;
objReadOnly2.a.b = 2;
```

### 4 isRef, isReactive 与 isReadonly

```js
/* 
判断是否是ref对象
*/
function isRef(obj) {
  return obj && obj._is_ref;
}

/* 
判断是否是reactive对象
*/
function isReactive(obj) {
  return obj && obj._is_reactive;
}

/* 
判断是否是readonly对象
*/
function isReadonly(obj) {
  return obj && obj._is_readonly;
}

/* 
是否是reactive或readonly产生的代理对象
*/
function isProxy(obj) {
  return isReactive(obj) || isReadonly(obj);
}

/* 测试判断函数 */
console.log(isReactive(reactive({})));
console.log(isRef(ref({})));
console.log(isReadonly(readonly({})));
console.log(isProxy(reactive({})));
console.log(isProxy(readonly({})));
```

# 三. 其它新组件和 API

## 1. 新组件

### 1 Fragment(片断)

- 在 Vue2 中: 组件必须有一个根标签
- 在 Vue3 中: 组件可以没有根标签, 内部会将多个标签包含在一个 Fragment 虚拟元素中
- 好处: 减少标签层级, 减小内存占用

```vue
<template>
  <h2>aaaa</h2>
  <h2>aaaa</h2>
</template>
```

### 2 Teleport(瞬移)

- Teleport 提供了一种干净的方法, 让组件的 html 在父组件界面外的特定标签(很可能是 body)下插入显示
- ModalButton.vue:

```vue
<template>
  <button @click="modalOpen = true">
    Open full screen modal! (With teleport!)
  </button>

  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a teleported modal! (My parent is "body")
        <button @click="modalOpen = false">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
export default {
  name: "modal-button",
  setup() {
    const modalOpen = ref(false);
    return {
      modalOpen,
    };
  },
};
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
```

- App.vue:

```vue
<template>
  <h2>App</h2>
  <modal-button></modal-button>
</template>

<script lang="ts">
import ModalButton from "./ModalButton.vue";

export default {
  setup() {
    return {};
  },

  components: {
    ModalButton,
  },
};
</script>
```

### 3 Suspense(不确定的)

- 它们允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验

```vue
<template>
  <Suspense>
    <template v-slot:default>
      <AsyncComp />
      <!-- <AsyncAddress/> -->
    </template>

    <template v-slot:fallback>
      <h1>LOADING...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
/* 
异步组件 + Suspense组件
*/
// import AsyncComp from './AsyncComp.vue'
import AsyncAddress from "./AsyncAddress.vue";
import { defineAsyncComponent } from "vue";
const AsyncComp = defineAsyncComponent(() => import("./AsyncComp.vue"));
export default {
  setup() {
    return {};
  },

  components: {
    AsyncComp,
    AsyncAddress,
  },
};
</script>
```

- AsyncComp.vue

```vue
<template>
  <h2>AsyncComp22</h2>
  <p>{{ msg }}</p>
</template>

<script lang="ts">
export default {
  name: "AsyncComp",
  setup() {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       msg: 'abc'
    //     })
    //   }, 2000)
    // })
    return {
      msg: "abc",
    };
  },
};
</script>
```

- AsyncAddress.vue

```vue
<template>
  <h2>{{ data }}</h2>
</template>

<script lang="ts">
import axios from "axios";
export default {
  async setup() {
    const result = await axios.get("/data/address.json");
    return {
      data: result.data,
    };
  },
};
</script>
```

## 2. 其他新的 API

### 1 全新的全局 API

- createApp()
- defineProperty()
- defineAsyncComponent()
- nextTick()

### 2 将原来的全局 API 转移到应用对象

- app.component()
- app.config()
- app.directive()
- app.mount()
- app.unmount()
- app.use()

### 3 模板语法变化

- v-model 的本质变化

  - prop：value -> modelValue；
  - event：input -> update:modelValue；

- .sync 修改符已移除, 由 v-model 代替

  - 

- v-if 优先 v-for 解析

  

# 四. Vue3 综合案例 - TodoList

```vue
<template>
  <div class="wrap">
    <div class="input">
      <input
        type="text"
        placeholder="请输入任务标题"
        v-model="title"
        @keyup.enter="handleAddTask"
      />
    </div>
    <ul class="list">
      <li
        :class="item.status === 1 ? 'active' : ''"
        v-for="(item, index) in filterList"
        :key="item.id"
      >
        <div class="left">
          <input type="checkbox" :value="item.id" v-model="checkedArr" />
          <span class="orange" v-show="item.status === 1">✔</span>
          {{ item.title }}
        </div>
        <div class="right">
          <button class="btn" @click="handleModifyStatus(item)">
            切换为{{ item.status === 1 ? "未完成" : "已完成" }}
          </button>
          <a href="javascript:;" @click="hadleDelete(index)">x</a>
        </div>
      </li>
    </ul>
    <div class="operate">
      <div class="left">
        <button @click="handleBatchDeleteTask">删除选中项</button>
        <button @click="handleBatchSetStatus(1)">设为已完成</button>
        <button @click="handleBatchSetStatus(0)">设为未完成</button>
      </div>
      <div class="right">
        <span
          :class="sort === 'all' ? 'active' : ''"
          @click="handleSwitchSort('all')"
          >全部</span
        >
        <span
          :class="sort === 'done' ? 'active' : ''"
          @click="handleSwitchSort('done')"
          >已完成</span
        >
        <span
          :class="sort === 'undone' ? 'active' : ''"
          @click="handleSwitchSort('undone')"
          >未完成</span
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed, ComputedRef } from "vue";
interface ITask {
  id: number;
  title: string;
  status: number;
}
interface IDataProps {
  title: string;
  list: ITask[];
  checkedArr: number[];
  sort: string;
  filterList: any;
  handleModifyStatus: (item: ITask) => void;
  hadleDelete: (index: number) => void;
  handleAddTask: () => void;
  handleBatchDeleteTask: () => void;
  handleBatchSetStatus: (status: number) => void;
  handleSwitchSort: (sort: string) => void;
}

export default {
  name: "About",
  setup() {
    const data: IDataProps = reactive({
      title: "",
      list: [
        {
          id: 1,
          title: "html5+css3",
          status: 1,
        },
        {
          id: 2,
          title: "javascript",
          status: 1,
        },
        {
          id: 3,
          title: "nodejs",
          status: 0,
        },
      ],
      checkedArr: [],
      sort: "all",
      filterList: computed(() => {
        switch (data.sort) {
          case "all":
            return data.list;
            break;
          case "done":
            return data.list.filter((item) => {
              return item.status === 1;
            });
            break;
          case "undone":
            return data.list.filter((item) => {
              return item.status === 0;
            });
            break;
          default:
            return data.list;
            break;
        }
      }),
      handleModifyStatus(item: ITask) {
        item.status = item.status === 1 ? 0 : 1;
      },
      hadleDelete(index: number) {
        data.list.splice(index, 1);
      },
      handleAddTask() {
        const task = {
          id: Date.now(),
          title: data.title,
          status: 0,
        };
        data.list.push(task);
        data.title = "";
      },
      handleBatchDeleteTask() {
        // 先打印checkedArr，打印出来的是选中的任务的id，也就是要删除的任务，
        // 使用数组的filter方法过滤出不在checkedArr中的任务，那过滤出来的数组就是要保留的任务
        const arr: ITask[] = data.list.filter((item: ITask) => {
          return !data.checkedArr.includes(item.id);
        });

        // console.log(arr);
        data.list = arr;
      },
      handleBatchSetStatus(status: number) {
        data.list.forEach((item: ITask) => {
          if (data.checkedArr.includes(item.id)) {
            item.status = status;
          }
        });
      },
      handleSwitchSort(sort: string) {
        data.sort = sort;
      },
    });

    return toRefs(data);
  },
};
</script>

<style lang="less" scoped>
.wrap {
  padding: 20px;
}

.input input {
  width: 100%;
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #05e;
  margin-top: 10px;
  color: #fff;
}

.list li.active {
  background-color: #090;
}

.list li span.delete {
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  margin-left: 16px;
}

.list li .btn {
  cursor: pointer;
}

.orange {
  color: #f90;
}

.operate {
  display: flex;
  justify-content: space-between;
  color: #fff;
  margin-top: 10px;
  background-color: #f90;
  padding: 8px;
}

.operate .right span {
  cursor: pointer;
}

.operate .right span.active {
  color: #090;
  font-weight: bold;
}
</style>
```
