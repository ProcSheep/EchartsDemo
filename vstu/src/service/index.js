import { BASE_URL, TIME_OUT } from "./config";
import HYRequest from "./request";

// 某一个实例
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export { hyRequest };
