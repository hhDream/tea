import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import _ from 'lodash' //这个工具可以降低js对数组的操作

Router.prototype.openPage = function(link, query) {
    this.push({ //向后面添加
        path: link,
        query: _.assignIn({
            time: new Date().getTime()
        }, query || {})
    })
}

Vue.use(Router)


const router = new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: '/teaMallIndex'
        },
        {
            path: '/ccfwxy',
            name: 'ccfwxy',
            component(resolve) {
                require(['@/views/common/ccfwxy/index.vue'], resolve)
            }
        },
        {
            path: '/cqtptjj',
            name: 'cqtptjj',
            component(resolve) {
                require(['@/views/common/cqtptjj/index.vue'], resolve)
            }
        },
        {
            path: '/fpbz',
            name: 'fpbz',
            component(resolve) {
                require(['@/views/common/fpbz/index.vue'], resolve)
            }
        },
        {
            path: '/gsyyzz',
            name: 'gsyyzz',
            component(resolve) {
                require(['@/views/common/gsyyzz/index.vue'], resolve)
            }
        },
        {
            path: '/payAgreement',
            name: 'payAgreement',
            component(resolve) {
                require(['@/views/common/payAgreement/index.vue'], resolve)
            }
        },
        {
            path: '/payLimit',
            name: 'payLimit',
            component(resolve) {
                require(['@/views/common/payLimit/index.vue'], resolve)
            }
        },
        {
            path: '/qgsm',
            name: 'qgsm',
            component(resolve) {
                require(['@/views/common/qgsm/index.vue'], resolve)
            }
        },
        {
            path: '/yssm',
            name: 'yssm',
            component(resolve) {
                require(['@/views/common/yssm/index.vue'], resolve)
            }
        },
        {
            path: '/zcxy',
            name: 'zcxy',
            component(resolve) {
                require(['@/views/common/zcxy/index.vue'], resolve)
            }
        },
        {
            path: '/zczn',
            name: 'zczn',
            component(resolve) {
                require(['@/views/common/zczn/index.vue'], resolve)
            }
        },
        {
            path: '/zffwxy',
            name: 'zffwxy',
            component(resolve) {
                require(['@/views/common/zffwxy/index.vue'], resolve)
            }
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
        },
        {
            path: '/teaMallIndex',
            name: 'teaMallIndex',
            component(resolve) {
                require(['@/teaMall/teaMallIndex/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallShop',
            name: 'teaMallShop',
            component(resolve) {
                require(['@/teaMall/teaMallShop/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallRush',
            name: 'teaMallRush',
            component(resolve) {
                require(['@/teaMall/teaMallRush/index.vue'], resolve)
            }
        },
        {
            path: '/buyListDetail',
            name: 'buyListDetail',
            component(resolve) {
                require(['@/components/buyListDetail.vue'], resolve)
            }
        },
        {
            path: '/myUserCenter',
            name: 'myUserCenter',
            component(resolve) {
                require(['@/userCenter/myUserCenter/myUserCenter.vue'], resolve)
            },
            children: [{
                    path: 'userHome',
                    name: 'userHome',
                    component(resolve) {
                        require(['@/userCenter/userHome/index.vue'], resolve)
                    }
                },
                {
                    path: 'userInfo',
                    name: 'userInfo',
                    component(resolve) {
                        require(['@/userCenter/userAccount/userInfo.vue'], resolve)
                    }
                },
                {
                    path: 'userPwd',
                    name: 'userPwd',
                    component(resolve) {
                        require(['@/userCenter/userAccount/userPwd.vue'], resolve)
                    }
                },
                {
                    path: 'userAddress',
                    name: 'userAddress',
                    component(resolve) {
                        require(['@/userCenter/userAccount/userAddress.vue'], resolve)
                    }
                },
                {
                    path: 'purchaseOrder',
                    name: 'purchaseOrder',
                    component(resolve) {
                        require(['@/userCenter/userOrder/purchaseOrder.vue'], resolve)
                    }
                },
                {
                    path: 'sellOrder',
                    name: 'sellOrder',
                    component(resolve) {
                        require(['@/userCenter/userOrder/sellOrder.vue'], resolve)
                    }
                },

                {
                    path: 'userStock',
                    name: 'userStock',
                    component(resolve) {
                        require(['@/userCenter/takeGoods/userStock.vue'], resolve)
                    }
                },
                {
                    path: 'takeDetail',
                    name: 'takeDetail',
                    component(resolve) {
                        require(['@/userCenter/takeGoods/takeDetail.vue'], resolve)
                    }
                },
                {
                    path: 'bankCard',
                    name: 'bankCard',
                    component(resolve) {
                        require(['@/userCenter/userFinance/bankCard.vue'], resolve)
                    }
                },
                {
                    path: 'coupon',
                    name: 'coupon',
                    component(resolve) {
                        require(['@/userCenter/userFinance/coupon.vue'], resolve)
                    }
                },
                {
                    path: 'increaseAptitudes',
                    name: 'increaseAptitudes',
                    component(resolve) {
                        require(['@/userCenter/userFinance/increaseAptitudes.vue'], resolve)
                    }
                },
                {
                    path: 'orderSearch',
                    name: 'orderSearch',
                    component(resolve) {
                        require(['@/userCenter/userFinance/orderSearch.vue'], resolve)
                    }
                }
            ],
        },
        {
            path: '/distributorCenter',
            name: 'distributorCenter',
            redirect: '/distributorCenter/banlance',
            component(resolve) {
                require(['@/distributorCenter/DistributorHome/DistributorHome.vue'], resolve)
            },
            children: [{
                    path: 'banlance',
                    name: 'banlance',
                    component(resolve) {
                        require(['@/distributorCenter/Banlance/Banlance.vue'], resolve)
                    }
                },
                {
                    path: 'enterpriseInfo',
                    name: 'enterpriseInfo',
                    component(resolve) {
                        require(['@/distributorCenter/EnterpriseInfo/EnterpriseInfo.vue'], resolve)
                    }
                },
                {
                    path: 'password',
                    name: 'password',
                    component(resolve) {
                        require(['@/distributorCenter/Password/Password.vue'], resolve)
                    }
                },
                {
                    path: 'distributorAddress',
                    name: 'distributorAddress',
                    component(resolve) {
                        require(['@/distributorCenter/DistributorAddress/DistributorAddress.vue'], resolve)
                    }
                },
                {
                    path: 'myGoods',
                    name: 'myGoods',
                    component(resolve) {
                        require(['@/distributorCenter/MyGoods/MyGoods.vue'], resolve)
                    }
                },
                {
                    path: 'saleList',
                    name: 'saleList',
                    component(resolve) {
                        require(['@/distributorCenter/SaleList/SaleList.vue'], resolve)
                    }
                },
                {
                    path: 'buyList',
                    name: 'buyList',
                    component(resolve) {
                        require(['@/distributorCenter/BuyList/BuyList.vue'], resolve)
                    }
                },
                {
                    path: 'rushBuy',
                    name: 'rushBuy',
                    component(resolve) {
                        require(['@/distributorCenter/RushBuy/RushBuy.vue'], resolve)
                    }
                },

                {
                    path: 'myRushBuy',
                    name: 'myRushBuy',
                    component(resolve) {
                        require(['@/distributorCenter/MyRushBuy/MyRushBuy.vue'], resolve)
                    }
                },
                {
                    path: 'myStock',
                    name: 'myStock',
                    component(resolve) {
                        require(['@/distributorCenter/MyStock/MyStock.vue'], resolve)
                    }
                },
                {
                    path: 'takeGoodsDetail',
                    name: 'takeGoodsDetail',
                    component(resolve) {
                        require(['@/distributorCenter/TakeGoodsDetail/TakeGoodsDetail.vue'], resolve)
                    }
                },
                {
                    path: 'shippingTemplates',
                    name: 'shippingTemplates',
                    component(resolve) {
                        require(['@/distributorCenter/ShippingTemplates/ShippingTemplates.vue'], resolve)
                    }
                },
                {
                    path: 'vipInfo',
                    name: 'vipInfo',
                    component(resolve) {
                        require(['@/distributorCenter/VipInfo/VipInfo.vue'], resolve)
                    }
                },
                {
                    path: 'vipTransaction',
                    name: 'vipTransaction',
                    component(resolve) {
                        require(['@/distributorCenter/VipTransaction/VipTransaction.vue'], resolve)
                    }
                },
                {
                    path: 'myBank',
                    name: 'myBank',
                    component(resolve) {
                        require(['@/distributorCenter/MyBank/MyBank.vue'], resolve)
                    }
                },
                {
                    path: 'myCoupon',
                    name: 'myCoupon',
                    component(resolve) {
                        require(['@/distributorCenter/MyCoupon/MyCoupon.vue'], resolve)
                    }
                },
                {
                    path: 'increaseAptitude',
                    name: 'increaseAptitude',
                    component(resolve) {
                        require(['@/distributorCenter/IncreaseAptitude/IncreaseAptitude.vue'], resolve)
                    }
                },
                {
                    path: 'invoiceSetting',
                    name: 'invoiceSetting',
                    component(resolve) {
                        require(['@/distributorCenter/InvoiceSetting/InvoiceSetting.vue'], resolve)
                    }
                },
                {
                    path: 'invoiceManage',
                    name: 'invoiceManage',
                    component(resolve) {
                        require(['@/distributorCenter/InvoiceManage/InvoiceManage.vue'], resolve)
                    }
                },
                {
                    path: 'billCheck',
                    name: 'billCheck',
                    component(resolve) {
                        require(['@/distributorCenter/BillCheck/BillCheck.vue'], resolve)
                    }
                },
                {
                    path: 'deliveryApplication',
                    name: 'deliveryApplication',
                    component(resolve) {
                        require(['@/distributorCenter/DeliveryApplication/DeliveryApplication.vue'], resolve)
                    }
                },
                {
                    path: 'billDetail',
                    name: 'billDetail',
                    component(resolve) {
                        require(['@/distributorCenter/BillDetail/BillDetail.vue'], resolve)
                    }
                },
                {
                    path: 'makeBill',
                    name: 'makeBill',
                    component(resolve) {
                        require(['@/distributorCenter/MakeBill/MakeBill.vue'], resolve)
                    }
                }
            ]
        }, ,
        {
            path: '/teaMallNotice',
            name: 'teaMallNotice',
            component(resolve) {
                require(['@/teaMall/teaMallNotice/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallMoreNotice',
            name: 'teaMallMoreNotice',
            component(resolve) {
                require(['@/teaMall/teaMallMoreNotice/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallNew',
            name: 'teaMallNew',
            component(resolve) {
                require(['@/teaMall/teaMallNew/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallNews',
            name: 'teaMallNews',
            component(resolve) {
                require(['@/teaMall/teaMallNews/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallProduct',
            name: 'teaMallProduct',
            component(resolve) {
                require(['@/teaMall/teaMallProduct/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallTeaExperts',
            name: 'teaMallTeaExperts',
            component(resolve) {
                require(['@/teaMall/teaMallTeaExperts/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallShopProduct',
            name: 'teaMallShopProduct',
            component(resolve) {
                require(['@/teaMall/teaMallShopProduct/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallOrderForm',
            name: 'teaMallOrderForm',
            component(resolve) {
                require(['@/teaMall/teaMallOrderForm/index.vue'], resolve)
            }
        },
        {
            path: '/teaMallPayMent',
            name: 'teaMallPayMent',
            component(resolve) {
                require(['@/teaMall/teaMallPayMent/index.vue'], resolve)
            }
        },
        {
            path: '/register',
            name: 'register',
            component(resolve) {
                require(['@/components/register.vue'], resolve)
            }
        },
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
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
// 跳转后返回顶部
router.afterEach((to, from, next) => {
        window.scrollTo(0, 0);
    })
    // 全局路由守卫
router.beforeEach((to, from, next) => {
    console.log(this, 'navigation-guards');
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    const nextRoute = ['home', 'takegoodsDetail', 'rushby', 'myInventory', 'myAccount', 'management', 'getRetailPrices', 'dealerTransaction', 'dealerManage', 'billQuery', 'message', 'editMoneyPsw', 'editPwd'];
    // const nextRoute = [];
    if (getCookie('LOGIN_PHONE')) {
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
    const teaMallArr = ['teaMallMoreNotice', 'teaMallNotice', 'teaMallNew', 'teaMallNews', 'teaMallPayMent', 'register']
    const userCenter = ['myUserCenter', 'takeDetail', 'userStock', 'userAddress', 'userInfo', 'userPwd', 'bankCard', 'coupon', 'increaseAptitudes', 'orderSearch', 'userHome', 'userInfo', 'buyListDetail', 'purchaseOrder', 'sellOrder', 'userPwd']
    const distributorCenter = ['banlance', 'billCheck', 'billDetail', 'buyList', 'buyListDetail', 'deliveryApplication', 'distributorAddress', 'distributorHome', 'enterpriseInfo', 'freightTemplate', 'increaseAptitude', 'invoiceManage', 'invoiceSetting', 'makeBill', 'myBank', 'myCoupon', 'myGoods', 'myRushBuy', 'myStock', 'password', 'rushBuy', 'saleList', 'shippingTemplates', 'takeGoodsDetail', 'vipInfo', 'vipTransaction']
    if (to.name == 'login' || nextRoute.indexOf(to.name) >= 0 || teaMallArr.indexOf(to.name) >= 0 || distributorCenter.indexOf(to.name) >= 0 || userCenter.indexOf(to.name) >= 0) { //限定隐藏顶部搜索 
        console.log(123);
        store.commit('changeToLogin', false);
    } else {
        store.commit('changeToLogin', true);
    }
    console.log('即将去的路由', to.name, '我是对的吗', isLogin);
    if (to.name == 'teaMallIndex') {
        store.commit('changeIsShow', 0)
    }
    if (to.name == 'teaMallRush') {
        store.commit('changeIsShow', 1)
    }
    if (to.name == 'teaMallShop') {
        store.commit('changeIsShow', 2)
    }
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    if (nextRoute.indexOf(to.name) >= 0 || teaMallArr.indexOf(to.name) >= 0 || distributorCenter.indexOf(to.name) >= 0 || userCenter.indexOf(to.name) >= 0) {
        if (!isLogin) {
            router.push({
                name: 'login'
            })
        }
    }
    // 已登录状态；当路由到login时，跳转至home 
    if (to.name === 'login') {
        store.commit('changeIsLogin', false);
        if (isLogin) {
            var c = getCookie('STATUS')
            if (c == 1) {
                router.push({
                    name: "userHome"
                });
            } else if (c == 2) {
                router.push({
                    name: "banlance"
                });
            } else if (c == 3) {
                router.push({
                    name: "home"
                });
            }

        }
    } else {
        store.commit('changeIsLogin', true);

    }
    next();
});

export default router