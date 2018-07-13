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
                发票类型：不开发票
            </el-col>
            <el-col :span="24" style="font-size:20px;margin-top:10px">
                <b>订单信息</b>
            </el-col>
            <el-col :span="24" style="background:#f5f5f5;margin-top:10px;padding:24px">
                订单编号：&nbsp;201806270948292261937&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下单时间：&nbsp;2018-06-27 09:48:30
                <el-table :data="stock" style="width:100%;margin-top:15px">
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品信息" width="240">
                        <template slot-scope="scope">
                            <div class="sp_info">
                                <div class="sp_cover">
                                <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=32b52bc5f51f4134f43a0d2c4476feaf/b999a9014c086e06893e896d0a087bf40ad1cb06.jpg">
                                </div>
                                <div class="sp_content">
                                <span>微信支付（勿买不发货）</span><br>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品代码">
                        <template slot-scope="scope">
                            <span>fx12345678</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品单价">
                        <template slot-scope="scope">
                            <span>23626</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品数量">
                        <template slot-scope="scope">
                            <span>336</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="预计总重量">
                        <template slot-scope="scope">
                            <span>125125</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品总价">
                        <template slot-scope="scope">
                            <span>326236</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" style="font-size:16px;margin-top:10px;text-align:right">
                <div class="de_every">
                    <div class="de_pretend"><b>总计：</b></div>
                    <div class="de_content">￥1003265元</div> 
                </div>
                <div class="de_every">
                    <div class="de_pretend"><b>货款：</b></div>
                    <div class="de_content">￥10033332元</div> 
                </div>
                <div class="de_every">
                    <div class="de_pretend"><b>手续费：</b></div>
                    <div class="de_content">￥100.25元</div> 
                </div>
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
.de_every {
  margin-top: 10px;
}
.de_pretend {
  width: 88%;
}
.de_content {
  width: 12%;
  position: relative;
  top: -23px;
  left: 100%;
  margin-left: -12%;
}
</style>
