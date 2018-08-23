export default {
    state: {
        noticeId: '',
        loading: false,
        newId: '',
        isShow: sessionStorage.getItem('changeIsShow')
    },
    mutations: {
        changeLoading(state, loading) {
            state.loading = loading
        }, //loading动画
        changeIsShow(state, isShow) {
            state.isShow = isShow
        }, //导航的activ样式
        // swich_dialog(state){
        //     state.phone = state.phone
        // } https://ent.teaexs.com/platform    http://192.168.1.126:8080/tea
    }
}