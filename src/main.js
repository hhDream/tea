import vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from '../static/node_modules/element-ui'
import axios from 'axios'
import vueAxios from 'vue-axios'
import '../static/node_modules/element-ui/lib/theme-chalk/index.css';
import 'vue2-animate/dist/vue2-animate.min.css';
import vuex from 'vuex'
import store from './store'
import echarts from 'echarts'
import "babel-polyfill"
import $ from 'jquery'
vue.config.productionTip = false
vue.use(vueAxios, axios);
vue.use(vuex)
vue.use(ElementUI);
vue.prototype.$echarts = echarts;
//全局的获取cookie方法
vue.prototype.$getcookie = function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    //设置cookie   name为cookie的名字，value是值，expiredays为过期时间（天数）
vue.prototype.$setcookie = function setCookie(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie =
            name +
            "=" +
            escape(value) +
            (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    }
    // 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    store.commit('changeLoading', true); //加载loading

    return config;
}, function(error) {
    // 对请求错误做些什么
    store.commit('changeLoading', false); //加载loading
    this.$alert("网络错误请求失败!", "错误", {
        confirmButtonText: "确定",
        callback: action => {
            this.delCookie("JSESSIONID");
            this.$router.openPage("/login");
            this.$message({
                type: "info",
                message: `错误原因: ${err}`
            });
        }
    });
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    store.commit('changeLoading', false); //加载loading

    return response;
}, function(error) {
    // 对响应错误做点什么
    store.commit('changeLoading', false); //加载loading
    this.$alert("网络错误请求失败!", "错误", {
        confirmButtonText: "确定",
        callback: action => {
            this.delCookie("JSESSIONID");
            this.$router.openPage("/login");
            this.$message({
                type: "info",
                message: `错误原因: ${err}`
            });
        }
    });
    return Promise.reject(error);
});
/* eslint-disable no-new */
new vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    methods: {
        //读取cookie，需要注意的是cookie是不能存中文的，如果需要存中文，解决方法是后端先进行编码encode()，前端取出来之后用decodeURI('string')解码。（安卓可以取中文cookie，IOS不行）
        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) {
                return true;
                // return (arr[2]);
            } else {
                return false
            }
        }
    },
    created() {}
})