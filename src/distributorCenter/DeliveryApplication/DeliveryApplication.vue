<template>
    <div>
        <el-row>
            <el-col :span="2" style="margin-top:0">商品代码</el-col>
            <el-col :span="22" style="margin-top:0">CQT001</el-col>
            <el-col :span="2">商品名称</el-col>
            <el-col :span="22">内购商品（请勿购买不发货）</el-col>
            <el-col :span="2">可提数量</el-col>
            <el-col :span="22">1 片</el-col>
            <el-col :span="2" style="margin-top:40px">提货数量</el-col>
            <el-col :span="22" style="margin-top:30px">
                <el-input v-model="input" placeholder="请输入内容" style="width:200px"></el-input>
            </el-col>
            <el-col :span="2">商品规格</el-col>
            <el-col :span="22">2提/件, 7片/提, 357克/片</el-col>
            <el-col :span="2">提货方式</el-col>
            <el-col :span="22">
                <el-radio v-model="radio" label="1">快递物流</el-radio>
                <el-radio v-model="radio" label="2">自提</el-radio>
                <div style="margin-top:20px">提货门店运费收费标准</div>                
                <el-table :data="tableData" border style="width: 100%;margin-top:15px">
                    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="首重" width="220">
                    <template slot-scope="scope">
                        <span>1</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="首重金额">
                    <template slot-scope="scope">
                        <span>1</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="续重" width="220">
                    <template slot-scope="scope">
                        <span>1</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="续重金额">
                    <template slot-scope="scope">
                        <span>1</span>
                    </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top:20px">
                    收货地址
                </div>
                <el-radio v-model="radio2" label="收货人：测试经销商  详细地址：安徽省 马鞍山市 当涂县 新街口  手机：22205190171" style="margin-top:20px"></el-radio><br>
                <el-radio v-model="radio2" label="收货人：测试经销商  详细地址：安徽省 马鞍山市 当涂县 新街口  手机：22205190172" style="margin-top:20px"></el-radio><br>
            </el-col>
            <el-col :span="2">仓储费</el-col>
            <el-col :span="22">
                0元&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:#409EFF" @click="changeState()">仓储收费标准</a>
                <br><span style="font-size:12px;color:#8c8c8c;position:relative;top:10px"  v-if="show">免费仓储周期：2017-12-01 至 2018-02-28</span>
            </el-col>
            <el-col :span="2">快递费</el-col>
            <el-col :span="22">
                0元&nbsp;&nbsp;&nbsp;&nbsp;<a style="color:#409EFF">快递费收费标准</a>
                <!-- <br><span style="font-size:12px;color:#8c8c8c;position:relative;top:10px">免费仓储周期：2017-12-01 至 2018-02-28</span> -->
            </el-col>
            <el-col :span="22" offset="2">
                <el-button type="danger" style="width:120px">确认提货</el-button>
                <el-button type="danger" style="background:white;color:red;width:120px">取消</el-button>
            </el-col>

        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[{}],
            input:"",
            radio:"1",
            radio2:"1",
            show:true
        }
    },
    methods:{
        changeState(){
            this.show=!this.show;
        }
    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>
    .el-col-2{
        text-align: right;
        margin-top: 30px;
        font-weight: 600;
    }
    .el-col-22{
        padding-left: 20px;
        box-sizing: border-box;
        margin-top: 30px;
    }
</style>
