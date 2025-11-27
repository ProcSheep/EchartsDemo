export const TIME_OUT = 30000; // 30s

// vite提供的import.meta.env对象上的特殊环境变量
// vite打包机制是先运行,不打包,不经过node,只有运行build指令后才会打包
/** vite提供的默认环境变量之一: import.meta.env.MODE
 *  MODE: 模式 development/production, 测试prod可以打包后运行 npm run preview 进行预览,产看环境
 *  布尔类型 import.meta.env.DEV/PROD
 *  其余的以后再说
 */
let BASE_URL = "";

if (import.meta.env.MODE === "production") {
  // 生产环境
  BASE_URL = "http://localhost:4000";
} else {
  // 开发环境
  BASE_URL = "http://localhost:4000";
}

export { BASE_URL };
