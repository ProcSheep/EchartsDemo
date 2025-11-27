import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import pinia from "@/store";
import "dayjs/locale/zh-cn"; // 日期中国化

import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn"; // 语言中国化
import "element-plus/dist/index.css";

import "normalize.css";
import "./assets/css/index.css";

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .mount("#app");
