import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash' //这个工具可以降低js对数组的操作

Router.prototype.openPage = function(link, query) {
    this.push({ //向后面添加
        path: link,
        // query: _.assignIn({
        //     time: new Date().getTime()
        // }, query || {})
    })
}

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component(resolve) {
                require(['@/components/home'], resolve)
            }
        },
        {
            path: '/editPwd',
            name: 'editPwd',
            component(resolve) {
                require(['@/views/editPwd/index.vue'], resolve)
            }
        },
        {
            path: '/message',
            name: 'message',
            component(resolve) {
                require(['@/views/message/index.vue'], resolve)
            }
        },
        {
            path: '/billQuery',
            name: 'billQuery',
            component(resolve) {
                require(['@/views/billQuery/index.vue'], resolve)
            }
        },
        {
            path: '/dealerManage',
            name: 'dealerManage',
            component(resolve) {
                require(['@/views/dealerManage/index.vue'], resolve)
            }
        },
        {
            path: '/dealerTransaction',
            name: 'dealerTransaction',
            component(resolve) {
                require(['@/views/dealerTransaction/index.vue'], resolve)
            }
        },
        {
            path: '/getRetailPrices',
            name: 'getRetailPrices',
            component(resolve) {
                require(['@/views/getRetailPrices/index.vue'], resolve)
            }
        },
        {
            path: '/management',
            name: 'management',
            component(resolve) {
                require(['@/views/management/index.vue'], resolve)
            }
        },
        {
            path: '/myAccount',
            name: 'myAccount',
            component(resolve) {
                require(['@/views/myAccount/index.vue'], resolve)
            }
        },
        {
            path: '/myInventory',
            name: 'myInventory',
            component(resolve) {
                require(['@/views/myInventory/index.vue'], resolve)
            }
        },
        {
            path: '/quoTe',
            name: 'quoTe',
            component(resolve) {
                require(['@/views/quoTe/index.vue'], resolve)
            }
        },
        {
            path: '/rushby',
            name: 'rushby',
            component(resolve) {
                require(['@/views/rushby/index.vue'], resolve)
            }
        },
        {
            path: '/takegoodsDetail',
            name: 'takegoodsDetail',
            component(resolve) {
                require(['@/views/takegoodsDetail/index.vue'], resolve)
            }
        }
    ]
})