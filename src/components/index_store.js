export default {
    state: {
        noticeId: '',
        loading: false,
        newId: '',
        isShow: 0
    },
    mutations: {
        changeNoticeId(state, noticeId) {
            state.noticeId = noticeId
        }, //公告id
        changeNewId(state, newId) {
            state.newId = newId
        }, //新闻id
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