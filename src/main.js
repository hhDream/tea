// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from '../static/node_modules/element-ui'
import qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '../static/node_modules/element-ui/lib/theme-chalk/index.css';
import 'vue2-animate/dist/vue2-animate.min.css';

Vue.use(VueAxios, axios);
Vue.use(qs)
Vue.config.productionTip = false

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})