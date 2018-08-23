<template>
    <div class="bd_body">
        <el-row>
            <el-col :span="24" style="border:1px solid #ffb7a6;background:#ffe5df;padding:24px">
                订单状态：{{ tempData.orderStatus == 1?'待支付':tempData.orderStatus == 2?'已支付':'已取消' }}
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
                订单编号：&nbsp;{{ tempData.orderCode }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;下单时间：&nbsp;{{ tempData.orderTime }}
                <el-table :data="[{}]" style="width:100%;margin-top:15px">
                    <el-table-column prop="takeTeaCount" :show-overflow-tooltip='true' align="center" label="商品信息" width="240" >
                        <template slot-scope="scope">
                            <div class="sp_info">
                                <div class="sp_cover">
                                <img :src="tempData.pcSmallPicture">
                                </div>
                                <div class="sp_content">
                                <span>{{ tempData.goodsName }}</span><br>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品代码">
                        <template slot-scope="scope">
                            <span>{{ tempData.goodsCode }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品单价">
                        <template slot-scope="scope">
                            <span>{{ tempData.goodPrice }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品数量">
                        <template slot-scope="scope">
                            <span>{{ tempData.buyGoodsCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="预计总重量">
                        <template slot-scope="scope">
                            <span>125125</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="商品总价">
                        <template slot-scope="scope">
                            <span>{{ tempData.totalAmountOrder }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" style="font-size:16px;margin-top:20px;text-align:right">
                <div>
                    <div class="de_pretend"><b>总计：</b></div>
                    <div class="de_content">￥{{ tempData.actualAmountPayment }}元</div> 
                </div>
                <div>
                    <div class="de_pretend"><b>货款：</b></div>
                    <div class="de_content">￥{{ tempData.totalAmountOrder }}元</div> 
                </div>
                <div>
                    <div class="de_pretend"><b>手续费：</b></div>
                    <div class="de_content">￥{{ tempData.serviceCharge }}元</div> 
                </div>
                <div>
                    <div class="de_pretend"><b>快递费：</b></div>
                    <div class="de_content">￥0元</div> 
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      http: this.$store.state.dialog.http,
      tempData:{}
    };
  },
  methods: {
    getData(id) {
      this.axios
        .post(
          this.http + "/interface/pc/order/orderInfromation",
          qs.stringify({
            orderCode: id
          })
        )
        .then(res => {
          if(res.data.code == 200){
              console.log(JSON.parse(res.data.data))
              this.tempData = JSON.parse(res.data.data);
          }else{
              this.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
    }
  },
  mounted() {
      this.getData(this.$route.query.id);
  }
};
</script>

<style lang="less" scoped>
.bd_body{
    min-width: 1190px;
    padding: 0 150px;
    box-sizing: border-box;
}
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
