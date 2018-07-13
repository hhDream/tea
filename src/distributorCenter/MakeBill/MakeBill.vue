<template>
    <div>
        <div style="font-size:20px"><b>补开发票</b></div>
        <el-row style="background:#f5f5f5;margin-top:30px;padding:24px">
            <el-col :span="24">
                <el-radio-group v-model="radio">
                <el-radio label="普通发票" v-if="true"></el-radio>
                <el-radio  label="增值税发票" v-if="true"></el-radio>
                </el-radio-group>
            </el-col>
            <el-col :span="3" v-if="radio=='普通发票'"> 
                发票抬头：
            </el-col>
            <el-col :span="21" v-if="radio=='普通发票'"> 
                <el-input v-model="rationType" style="width:300px"></el-input>
            </el-col>
            <el-col :span="3" v-if="radio=='普通发票'"> 
                纳税人识别码：
            </el-col>
            <el-col :span="21" v-if="radio=='普通发票'"> 
                <el-input v-model="rationType" style="width:300px"></el-input>
            </el-col>	
            <el-col :span="3" style="margin-top:20px" v-if="radio=='增值税发票'"> 
                单位名称：
            </el-col>
            <el-col :span="21" v-if="radio=='增值税发票'"> 
                奥体1
            </el-col>
            <el-col :span="3" style="margin-top:20px" v-if="radio=='增值税发票'"> 
                纳税人识别码：
            </el-col>
            <el-col :span="21" v-if="radio=='增值税发票'"> 
                121431
            </el-col>
            <el-col :span="3" style="margin-top:20px" v-if="radio=='增值税发票'"> 
                注册地址：
            </el-col>
            <el-col :span="21" v-if="radio=='增值税发票'"> 
                奥体1
            </el-col>
            <el-col :span="3" style="margin-top:20px" v-if="radio=='增值税发票'"> 
                注册电话：
            </el-col>
            <el-col :span="21" v-if="radio=='增值税发票'"> 
                025*****6781
            </el-col>
            <el-col :span="3" style="margin-top:20px" v-if="radio=='增值税发票'"> 
                开户银行：
            </el-col>
            <el-col :span="21" v-if="radio=='增值税发票'"> 
                招商1
            </el-col>
            <el-col :span="3" style="margin-top:20px" v-if="radio=='增值税发票'"> 
                银行账户：
            </el-col>
            <el-col :span="21" v-if="radio=='增值税发票'"> 
                13**61
            </el-col>
            <el-col :span="3"> 
                发票内容：
            </el-col>
            <el-col :span="21"> 
                <el-radio-group v-model="checkboxGroup1">
                    <el-radio-button v-for="city in cities" :label="city" :key="city">{{city}}</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="3" style="margin-top:20px"> 
                收货地址：
            </el-col>
            <el-col :span="21"> 
                <el-radio v-model="radio2" label="安徽省 马鞍山市 当涂县 新街口(胡静) 联系方式：18205190171（默认地址）"></el-radio><br>
                <el-radio v-model="radio2" label="安徽省 马鞍山市 当涂县 新街口(胡静) 联系方式：18205190172"></el-radio><br>
                <el-radio v-model="radio2" label="安徽省 马鞍山市 当涂县 新街口(胡静) 联系方式：18205190173"></el-radio><br>
            </el-col>
            <el-col :span="3" style="margin-top:20px"> 
                寄送方式：
            </el-col>
            <el-col :span="21"> 
                <el-radio v-model="radio3" label="到付"></el-radio>
                <el-radio v-model="radio3" label="快递物流"></el-radio>
            </el-col>
        </el-row>
        <div style="text-align:right;margin-top:20px">
            <b>实付款：<span style="color:#dc2b01;font-size:25px">￥100.00元</span></b>
        </div>
        <div style="text-align:right;margin-top:20px">
            <el-button style="width:150px;background:#dc2b01;color:white;">提交订单</el-button>
        </div>
    </div>
</template>

<script>
const cityOptions = ['食品', '茶叶', '明细'];
export default {
  data() {
    return {
      radio:"普通发票",
      rationType:"",
      checkboxGroup1: '食品',
      cities: cityOptions,
      radio2:"",
      radio3:""
    };
  }
};
</script>

<style lang="less" scoped>
.el-col-3{
    margin-top: 30px;
}
.el-col-21{
    margin-top: 20px;
}
</style>
