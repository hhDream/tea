import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
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


const router = new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component(resolve) {
                require(['@/components/login'], resolve)
            }
        },
        {
            path: '/myCenter',
            name: 'myCenter',
            component(resolve) {
                require(['@/views/myCenter/myCenter.vue'], resolve)
            },
            children: [{
                    path: 'home',
                    name: 'home',
                    component(resolve) {
                        require(['@/views/home/index.vue'], resolve)
                    }
                },
                {
                    path: 'editPwd',
                    name: 'editPwd',
                    component(resolve) {
                        require(['@/views/editPwd/index.vue'], resolve)
                    }
                },
                {
                    path: 'editMoneyPsw',
                    name: 'editMoneyPsw',
                    component(resolve) {
                        require(['@/views/editMoneyPsw/index.vue'], resolve)
                    }
                },

                {
                    path: 'message',
                    name: 'message',
                    component(resolve) {
                        require(['@/views/message/index.vue'], resolve)
                    }
                },
                {
                    path: 'billQuery',
                    name: 'billQuery',
                    component(resolve) {
                        require(['@/views/billQuery/index.vue'], resolve)
                    }
                },
                {
                    path: 'dealerManage',
                    name: 'dealerManage',
                    component(resolve) {
                        require(['@/views/dealerManage/index.vue'], resolve)
                    }
                },
                {
                    path: 'dealerTransaction',
                    name: 'dealerTransaction',
                    component(resolve) {
                        require(['@/views/dealerTransaction/index.vue'], resolve)
                    }
                },
                {
                    path: 'getRetailPrices',
                    name: 'getRetailPrices',
                    component(resolve) {
                        require(['@/views/getRetailPrices/index.vue'], resolve)
                    }
                },

                {
                    path: 'management',
                    name: 'management',
                    component(resolve) {
                        require(['@/views/management/index.vue'], resolve)
                    }
                },
                {
                    path: 'myAccount',
                    name: 'myAccount',
                    component(resolve) {
                        require(['@/views/myAccount/index.vue'], resolve)
                    }
                },
                {
                    path: 'myInventory',
                    name: 'myInventory',
                    component(resolve) {
                        require(['@/views/myInventory/index.vue'], resolve)
                    }
                },
                {
                    path: 'rushby',
                    name: 'rushby',
                    component(resolve) {
                        require(['@/views/rushby/index.vue'], resolve)
                    }
                },
                {
                    path: 'takegoodsDetail',
                    name: 'takegoodsDetail',
                    component(resolve) {
                        require(['@/views/takegoodsDetail/index.vue'], resolve)
                    }
                }
            ]
        }
    ]
})

// function getCookie(name) {
//     var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//     if (arr = document.cookie.match(reg)) {
//         return true;
//         // return (arr[2]);
//     } else {
//         return false
//     }
// }
  //获取cookie
  function getCookie  (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

// 全局路由守卫
router.beforeEach((to, from, next) => {
    console.log(this, 'navigation-guards');
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

    const nextRoute = ['home', 'takegoodsDetail', 'rushby', 'myInventory', 'myAccount', 'management', 'getRetailPrices', 'dealerTransaction', 'dealerManage', 'billQuery', 'message', 'editMoneyPsw', 'editPwd'];
    if (getCookie('JSESSIONID')) {
        store.commit('changeCookie', true);
    } else {
        store.commit('changeCookie', false);
    }
    if (getCookie('ENTER_ID')) {
        store.commit('changeEnterpriseCode', getCookie('ENTER_ID'));
    } else {
        store.commit('changeEnterpriseCode', "");
    }
    if (getCookie('LOGIN_PHONE')) {
        store.commit('changePhone', getCookie('LOGIN_PHONE'));
    } else {
        store.commit('changePhone', "");
    }
    let isLogin = store.state.dialog.cookie == true ? true : false; // 是否登录
    console.log('即将去的路由', to.name, '我是对的吗', isLogin);

    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    if (nextRoute.indexOf(to.name) >= 0) {
        if (!isLogin) {
            router.push({
                    name: 'login'
                })
                // location.href = ''
        }
    }
    // 已登录状态；当路由到login时，跳转至home 
    if (to.name === 'login') {
        store.commit('changeIsLogin', false);
        if (isLogin) {
            router.push({
                name: 'home'
            });
        }
    } else {
        store.commit('changeIsLogin', true);

    }
    next();
});

export default router