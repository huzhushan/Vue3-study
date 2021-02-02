/*
 * @Descripttion:
 * @version:
 * @Author: zsen.hu@uni-chain.com
 * @Date: 2021-02-02 18:44:04
 * @LastEditors: zsen.hu@uni-chain.com
 * @LastEditTime: 2021-02-02 18:45:01
 */
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
