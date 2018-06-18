import vue from 'vue'
import vuex from 'vuex'
import createLogger from 'vuex/dist/logger'; // 修改日志
const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false
vue.use(vuex)
import dialog_store from '../components/dialog_store'
export default new vuex.Store({
    modules: {
        dialog: dialog_store
    },
    plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
})