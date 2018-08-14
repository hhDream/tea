<template>
    <div>
    <el-row style='padding:10px 24px;background:#efefef'>
        <el-col :span="24"><b style="font-size:18px">企业信息</b></el-col>
        <el-col :span="24">会员名称：{{alldata.distributorName}}</el-col>
        <el-col :span="24">会员账号：{{alldata.loginAccount}}</el-col>
        <el-col :span="24">会员类型：经销商</el-col>
        <el-col :span="24">统一社会信用代码：{{alldata.unifiedSocialCreditCode}}</el-col>
        <el-col :span="24">法人名称：{{alldata.legalPersonName}}</el-col>
        <el-col :span="24" style="margin:10px 0">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="法人身份证：">
                    <el-input disabled="disabled" v-model="alldata.legalPersonIdentityCard"  placeholder="请输入身份"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button disabled="disabled" type="danger">修改</el-button>
                </el-form-item>
            </el-form> 
        </el-col>
        <el-col :span="24">注册手机：{{alldata.loginPhone}}</el-col>
        <el-col :span="24">所属茶企：{{alldata.enterpriseName}}</el-col>
        <el-col :span="24">上级经销商：{{alldata.superiorDealerName}}</el-col>
        <el-col :span="24">公司地址：{{alldata.postalAddress}}</el-col>
    </el-row>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    data(){
        return{
            http:this.$store.state.dialog.http,
            distributorCode:this.$getcookie('distributorCode'),
            alldata:{}
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
        getData(){
            this.axios.post(this.http+'/interface/pc/distributor/pcDistributor/companyInfo',qs.stringify({
                distributorCode:this.distributorCode
            })).then(res=>{
                this.alldata=JSON.parse(res.data.data);
                console.log(JSON.parse(res.data.data));
            })
        }
    }
};
</script>

<style lang="less" scoped>
    label{
        color: #000;
        font-weight: normal;
    }
    .el-col-24{
        margin:20px 0;
    }
    .el-form-item {
        margin: 0;
    }
</style>
