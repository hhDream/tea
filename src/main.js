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

vue.config.productionTip = false
vue.use(vueAxios, axios);
vue.use(vuex)
vue.use(ElementUI);
vue.prototype.$echarts = echarts
console.log(process.env.API_HOST);
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