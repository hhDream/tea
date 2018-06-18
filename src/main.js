// The vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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


vue.config.productionTip = false
vue.use(vueAxios, axios);
vue.use(vuex)
vue.use(ElementUI);


/* eslint-disable no-new */
new vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})