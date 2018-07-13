<template>
    <div>
        <el-row>
            <el-col :span="24" style="border:1px solid #ffb7a6;background:#ffe5df;padding:24px">
                订单状态：交易取消
            </el-col>
            <el-col :span="24" style="font-size:20px;margin-top:10px">
                <b>发票信息</b>
            </el-col>
            <el-col :span="24" style="background:#f5f5f5;margin-top:10px;padding:24px">  
                <div>发票类型：普通发票</div>           
                <div style="margin-top:20px">发票抬头：个人</div>           
                <div style="margin-top:20px">纳税人识别码：ddddd222</div>           
                <div style="margin-top:20px">发票内容：明细</div>           
                <div style="margin-top:20px">收票人姓名：胡静</div>           
                <div style="margin-top:20px">收票人手机：182****0171</div>           
                <div style="margin-top:20px">收票人地址：安徽省马鞍山市当涂县新街口</div>           
            </el-col>
            <el-col :span="24" style="font-size:20px;margin-top:10px">
                <b>订单信息</b>
            </el-col>
            <el-col :span="24" style="background:#f5f5f5;margin-top:10px;padding:24px">
                订单编号：&nbsp;201806270948292261937&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下单时间：&nbsp;2018-06-27 09:48:30
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      stock: [{}]
    };
  }
};
</script>

<style lang="less" scoped>
.sp_info {
  display: flex;
}
.sp_cover {
  width: 25%;
  height: 80%;
  padding: 0 0 0 5%;
  > img {
    display: block;
    width: 30px;
    height: 30px;
    margin-top: 4px;
  }
}
.sp_content {
  margin-top: 7px;
  width: 75%;
  text-align: left;
  .sp_code {
    font-size: 12px;
    color: #999;
  }
}

</style>
