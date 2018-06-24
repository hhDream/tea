export default {
    state: {
        phone: "13062539890",
        http: "https://ent.teaexs.com/platform",
        enterpriseCode: 98980889,
        cookie: false,
        isLogin: false,
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


        // swich_dialog(state){
        //     state.phone = state.phone
        // } https://ent.teaexs.com/platform    http://192.168.1.117:8080/tea
    }
}