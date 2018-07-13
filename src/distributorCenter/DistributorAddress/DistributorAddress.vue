<template>
    <div>
    <el-breadcrumb style='padding:24px 0' separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/myCenter/home' }">企业中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/myCenter/home' }">我的账号</el-breadcrumb-item>
        <el-breadcrumb-item>我的地址</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">提货门店</div>
    <el-row class="container_box">
        <el-col :span="24" class="box_dashed">
            <b>所属门店：默认提货门店</b>
        </el-col>
        <el-col :span="24">门店名称：测试经销商</el-col>
        <el-col :span="24">所在地区：安徽省 马鞍山市 当涂县</el-col>
        <el-col :span="24">详细地址：新街口</el-col>
        <el-col :span="24">联系人：测试经销商</el-col>
        <el-col :span="24">联系电话：18205190171</el-col>
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
    .title{
        color: #db4b29;
        font-weight: 700;
        padding:0 0 15px 0;
        font-size: 18px;
        border-bottom: 2px solid #db4b29;
        margin-bottom: 10px;
    }
    .container_box{
        padding:24px;
        border: 1px solid #efefef;
    }
    .el-col-24{
        margin-top: 20px;
    }
    .box_dashed{
        border-bottom:2px dashed #efefef;
        margin:0 ;
        padding-bottom: 10px;
    }
</style>
