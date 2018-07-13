<template>
    <div>
    <el-breadcrumb style='padding:24px 0' separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/distributorCenter/banlance' }">企业中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/distributorCenter/enterpriseInfo' }">我的账号</el-breadcrumb-item>
        <el-breadcrumb-item>企业信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style='padding:10px 24px;background:#efefef'>
        <el-col :span="24"><b style="font-size:18px">企业信息</b></el-col>
        <el-col :span="24">会员名称：测试经销商</el-col>
        <el-col :span="24">会员账号：19860001</el-col>
        <el-col :span="24">会员类型：经销商</el-col>
        <el-col :span="24">统一社会信用代码：22**22</el-col>
        <el-col :span="24">法人名称：胡*</el-col>
        <el-col :span="24" style="margin:10px 0">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="法人身份证：">
                    <el-input v-model="input"  placeholder="请输入身份"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger">修改</el-button>
                </el-form-item>
            </el-form> 
        </el-col>
        <el-col :span="24">注册手机：182****0171</el-col>
        <el-col :span="24">所属茶企：茶企通</el-col>
        <el-col :span="24">上级经销商：</el-col>
        <el-col :span="24">公司地址：安徽省 马鞍山市 当涂县 新街口</el-col>
    </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            input:'1101**********007X'
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
