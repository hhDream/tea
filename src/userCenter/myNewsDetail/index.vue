<template>
    <div class="outbox">
        <h1>{{alldata.title}}</h1>
        <div v-html="alldata.content" class="content_text">
            
        </div>
        <div class="footer">
            {{alldata.beginTime}}
        </div>
         <el-button style="width:100px" @click="$router.go(-1)" type="danger">返回</el-button>
    </div>
</template>

<script>
import qs from 'qs'
    export default ({
        data(){
            return{
                id:this.$route.query.id,
                param:this.$route.query.param1,
                http:this.$store.state.dialog.http,
                account:this.$getcookie('LOGIN_PHONE'),
                alldata:{}
            }
        },
        methods:{
            getData(){
                this.axios.post(this.http+'/interface/pc/distributor/pcSystemmessage/getSystemMessageDetail',qs.stringify({
                    account:this.account,
                    isBulltin: this.param?this.param : 2,
                    messageId: this.id
                })).then(res=>{
                    console.log(res);
                    console.log(JSON.parse(res.data.data));
                    this.alldata=JSON.parse(res.data.data)
                })
            },
            eidtData(){
                this.axios.post(this.http+'/interface/systemmessage/updateMessageReadState',qs.stringify({
                    account:this.account,
                    isBulltin: this.param?this.param : 2,
                    messageId: this.id
                })).then(res=>{
                    console.log(res);
                })
            }
        },
        mounted() {
            this.getData()
        },
        destroyed(){
            this.eidtData()
        }

    })
</script>
<style lang = 'less' scoped>
.outbox{
    padding: 20px;
    padding-bottom: 50px;
    border: 2px solid #EAEAEA;
    text-align: center;
}
h1{
    text-align: center;
    font-size: 23px;
    font-weight: 600;
    margin: 30px 0;

}
.content_text{
        text-indent: 2em;
    margin-bottom: 50px;
    line-height: 25px;
    font-size: 16px;
    text-align: left;
}
.footer{
    text-align: right;
}
</style>