import axios from "axios";
import qs from "qs";
import store from "../store";
// import utilConfig from "@/utils/config";
import { MessageBox, Message } from "element-ui";


// const baseUrl = utilConfig.baseUrl;
const baseUrl = '/api';
const suffix = store.state.suffix;

// axios.defaults.baseURL = '/api';
// http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        // const kongAdminUrl = localStorage.getItem("kongAdminUrl");
        const url = config.url;
        const flag = url.indexOf(suffix) != -1 ? true : false;
        const other = url.indexOf("other") == -1 ? true : false;
        const authservice = url.indexOf("authservice") == -1 ? true : false;

        if (token) {
            config.headers.token = token;
        }
        if (flag) {
            config.url = url.replace(suffix, "");
            config.url = other ? authservice ? baseUrl + config.url : config.url : config.url;
        // } else {
        //     config.url = "http://" + kongAdminUrl + config.url;
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code == 401 || response.data.code == 501 ) {
            // 返回 401 清除token信息并跳转到登录页面
            store.commit("LOGIN_OUT");
            let msg = "您的登录信息已过期，请重新登录";
            if(response.data.code == 501) {
                msg = "您当前无权限，请联系管理员！"
            }
            MessageBox.confirm(msg, "提示", {
                type: "warning",
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
            .then(() => {
                window.location.replace("/#/login?redirect=" + location.hash.slice(1));
            })
            .catch(() => {
                Message({
                    type: 'info',
                    message: "已取消重新登录"
                });
            });
        }

        return response;
    },
    error => {
        if (error.response) {
            Message({
                type: 'error',
                message: error.response.data
            });
        }
        return Promise.reject(error);
    }
);

export default {
    install(Vue, option) {
        Vue.prototype.$post = function(url, params, sb) {
            return new Promise((resolve, reject) => {
                axios.post(url, sb ? qs.stringify(params) : params)
                    .then(
                        res => {
                            resolve(res.data);
                        },
                        err => {
                            reject(err);
                            this.$message.error(JSON.stringify(err.response.data.message));
                        }
                    )
                    .catch(error => {
                        console.info(error);
                    });
            });
        };

        Vue.prototype.$get = function(url, params) {
            // const newParams = Object.assign({noCache: new Date().getTime()}, params)
            return new Promise((resolve, reject) => {
                axios.get(url, { params: params })
                    .then(
                        res => {
                            resolve(res.data);
                        },
                        err => {
                            reject(err);
                            this.$message.error(JSON.stringify(err.response.data.message));
                        }
                    )
                    .catch(error => {
                        console.log(error);
                    });
            });
        };

        Vue.prototype.$delete = function(url, params) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(url, { params: params })
                    .then(
                        res => {
                            resolve(res);
                        },
                        err => {
                            reject(err);
                            this.$message.error(JSON.stringify(err.response.data.message));
                        }
                    )
                    .catch(error => {
                        console.log(error);
                    });
            });
        };

        Vue.prototype.$patch = function(url, params, sb) {
            return new Promise((resolve, reject) => {
                axios.patch(url, sb ? qs.stringify(params) : params)
                    .then(
                        res => {
                            resolve(res.data);
                        },
                        err => {
                            reject(err);
                            this.$message.error(JSON.stringify(err.response.data.message));
                        }
                    )
                    .catch(error => {
                        console.info(error);
                    });
            });
        };
    }
};
