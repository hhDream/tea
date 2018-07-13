export default {
    state: {
        phone: "",
        // http: "http://192.168.1.115:8080/platform/",
        http: "http://192.168.1.103:8080/tea",
        // http: "https://ent.teaexs.com/platform",
        enterpriseCode: "",
        cookie: false,
        isLogin: false,
        toLogin: false,
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


        // swich_dialog(state){
        //     state.phone = state.phone
        // } https://ent.teaexs.com/platform    http://192.168.1.126:8080/tea
    }
}