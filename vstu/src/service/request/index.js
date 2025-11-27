import axios from "axios";

class HYRequest {
  instance;

  // request实例 => axios的实例
  constructor(config) {
    this.instance = axios.create(config);

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        // console.log('全局请求成功的拦截')
        return config;
      },
      (err) => {
        // console.log('全局请求失败的拦截')
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功的拦截')
        return res.data;
      },
      (err) => {
        // console.log('全局响应失败的拦截')
        return err;
      }
    );

    // 针对特定的hyRequest实例添加拦截器
    // config内部可自定义写拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  // 封装网络请求的方法
  request(config) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }

    // 返回Promise
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "GET" });
  }
  post(config) {
    return this.request({ ...config, method: "POST" });
  }
  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default HYRequest;
