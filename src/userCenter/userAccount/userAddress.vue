<template>
    <div>
    <el-breadcrumb style='padding:24px 0' separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">我的账号</el-breadcrumb-item>
        <el-breadcrumb-item>我的地址</el-breadcrumb-item>
    </el-breadcrumb>
    
    <div class="title_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收货地址" name="first" >
                <el-row style="padding-bottom: 12px;">
                    <el-button type="danger" @click="addAddressVisible = true">新增收货地址</el-button>
                    <span style="margin-left: 20px;">您已创建<span style="color: #f78989"> 4 </span>个收货地址，最多可创建<span style="color: #f78989"> 10 </span>个。</span>
                </el-row>
                <el-col :span="7" class="container_box">
                    <el-col class="box_dashed">
                        <b>默认地址</b>
                        <a style="margin-left: 18px;color: #0166bb">编辑</a>
                        <a style="margin-left: 18px;color: #0166bb">删除</a>
                    </el-col>
                    <el-col>收货人：某某某</el-col>
                    <el-col>所在地区：江苏省 南京市 雨花台区</el-col>
                    <el-col>地址：小行路58号和润精品茶城</el-col>
                    <el-col>手机：15951837265</el-col>
                </el-col>
                <el-col :span="7" class="container_box">
                    <el-col class="box_dashed">
                        <b style="color: #0166bb">设为默认地址</b>
                        <a style="margin-left: 18px;color: #0166bb">编辑</a>
                        <a style="margin-left: 18px;color: #0166bb">删除</a>
                    </el-col>
                    <el-col>收货人：某某某</el-col>
                    <el-col>所在地区：江苏省 南京市 雨花台区</el-col>
                    <el-col>地址：小行路58号和润精品茶城</el-col>
                    <el-col>手机：15951837265</el-col>
                </el-col>
                <el-col :span="7" class="container_box">
                    <el-col class="box_dashed">
                        <b style="color: #0166bb">设为默认地址</b>
                        <a style="margin-left: 18px;color: #0166bb">编辑</a>
                        <a style="margin-left: 18px;color: #0166bb">删除</a>
                    </el-col>
                    <el-col>收货人：某某某</el-col>
                    <el-col>所在地区：江苏省 南京市 雨花台区</el-col>
                    <el-col>地址：小行路58号和润精品茶城</el-col>
                    <el-col>手机：15951837265</el-col>
                </el-col>
                <el-col :span="7" class="container_box">
                    <el-col class="box_dashed">
                        <b style="color: #0166bb">设为默认地址</b>
                        <a style="margin-left: 18px;color: #0166bb">编辑</a>
                        <a style="margin-left: 18px;color: #0166bb">删除</a>
                    </el-col>
                    <el-col>收货人：某某某</el-col>
                    <el-col>所在地区：江苏省 南京市 雨花台区</el-col>
                    <el-col>地址：小行路58号和润精品茶城</el-col>
                    <el-col>手机：15951837265</el-col>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="提货门店" name="second" >
                <el-row class="container_box">
                    <el-col :span="24" class="box_dashed">
                        <b>所属门店：默认提货门店</b>
                    </el-col>
                    <el-col :span="24">门店名称：江苏南京小行路小型店</el-col>
                    <el-col :span="24">所在地区：江苏省 南京市 雨花台区</el-col>
                    <el-col :span="24">详细地址：小行路58号和润精品茶城</el-col>
                    <el-col :span="24">联系人：江苏南京小行路小型店</el-col>
                    <el-col :span="24">联系电话：15951837265</el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>

    <el-dialog title="新增收货地址" :visible.sync="addAddressVisible" center>
        <el-form :model="form">
            <el-form-item label="收货人" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="选择地区" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择省份" style="width: 120px;">
                    <el-option label="请选择" value="shanghai"></el-option>
                    <el-option label="省" value="beijing"></el-option>
                </el-select>
                <el-select v-model="form.region" placeholder="请选择地市" style="width: 120px;">
                    <el-option label="请选择" value="shanghai"></el-option>
                    <el-option label="市" value="beijing"></el-option>
                </el-select>
                <el-select v-model="form.region" placeholder="请选择区县" style="width: 120px;">
                    <el-option label="请选择" value="shanghai"></el-option>
                    <el-option label="区" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" auto-complete="off" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth">
                <el-input v-model="form.phone" auto-complete="off" style="width: 300px;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: -36px; padding-bottom: 20px;">
            <el-button type="primary" @click="addAddressVisible = false">保存</el-button>
            <el-button type="primary" @click="addAddressVisible = false">保存为默认地址</el-button>
            <el-button @click="addAddressVisible = false">取 消</el-button>
        </div>
    </el-dialog>


    
    </div>
</template>

<script>
export default {
    data(){
        return{
            input: '1101**********007X',
            activeName: 'first',
            addAddressVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                address: '',
                phone: '',
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        handleClick(){},  
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
        padding: 24px;
        margin-right: 20px;
        margin-bottom: 12px;
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

    
    .title_tabs .el-tabs__item {
        color: #db4b29!important;
        font-weight: 700;
        padding:0 0 15px 0;
        font-size: 18px;
        border-bottom: 2px solid #db4b29;
        margin-bottom: 10px;
    }
</style>
