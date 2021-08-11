import axios from "axios";
import { Notification, Loading } from "element-ui";

let loading;
let loadingNum = 0;

const httpUtil = axios.create({
  baseURL: "https://api.mcloc.cn/words/",
  timeout: 30000,
});

httpUtil.interceptors.request.use(
  (config) => {
    startLoading();
    const token = "Bearer ";
    if (token) config.headers.Authorization = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpUtil.interceptors.response.use(
  (response) => {
    const res = response.data;
    endLoading();
    return res;
  },
  (error) => {
    endLoading();
    handleError(error);
    return Promise.reject(error);
  }
);

function handleError(error) {
  if (error && error.response) {
    let statusCode = parseInt(error.response.status);
    let msg = {
      400: "请求错误",
      401: "未授权，请登录",
      403: "拒绝访问",
      404: "请求地址出错",
      408: "请求超时",
      500: "服务器内部错误",
      501: "服务未实现",
      502: "网关错误",
      503: "服务不可用",
      504: "网关超时",
      505: "HTTP版本不受支持",
    };
    Notification({
      title: "警告",
      message: msg[statusCode],
      type: "error",
    });

    switch (statusCode) {
      case 401:
        break;

      default:
        break;
    }
  }
}

function startLoading() {
  if (loadingNum == 0) {
    loading = Loading.service({
      lock: true,
      text: "加载中...",
      background: "rgba(0, 0, 0, 0.7)",
    });
  }
  loadingNum++;
}
function endLoading() {
  loadingNum--;
  if (loadingNum <= 0) {
    loading.close();
  }
}

export default httpUtil;
