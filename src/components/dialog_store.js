export default {
    state: {
        phone: "",
        http: process.env.NODE_ENV === 'development' ? "/apis" : "https://ent.teaexs.com/platform",
        // http: process.env.NODE_ENV === 'development' ? "/apis" : "http://pc.teaexs.com",
        enterpriseCode: "",
        cookie: false,
        isLogin: false,
        toLogin: false,
        url: ''
    },
    mutations: {
        changePhone(state, phone) {
            state.phone = phone
        },
        changeEnterpriseCode(state, enterpriseCode) {
            state.enterpriseCode = enterpriseCode
        },
        changeCookie(state, cookie) {
            state.cookie = cookie
        },
        changeIsLogin(state, isLogin) {
            state.isLogin = isLogin
        },
        changeToLogin(state, toLogin) {
            state.toLogin = toLogin
        },
        changeUrl(state, toLogin) {
            state.Url = toLogin
        },


        // swich_dialog(state){
        //     state.phone = state.phone
        // } https://ent.teaexs.com/platform    http://192.168.1.126:8080/tea
    }
}