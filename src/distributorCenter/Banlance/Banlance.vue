<template>
<div >
  <el-row class="myCenter" :gutter="20">
    <el-col :span="8" style="padding-right: 10px;padding-left:0">
      <div class="grid-content bg-purple">
        <h4>欢迎您</h4>
        <div class="clearfix user-info">
          <div class="fl img">
            <img src="../../assets/images/user-head.jpg">
          </div>
          <div class="fr txt">
            <h3>{{distributorName}}</h3>
            <p id="producerNo">
              <i>会员账号</i>{{loginAccount}}
            </p>
            <p>
              <i>会员类型</i>经销商</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="myCenter_right" :span="12">
      <div class="grid-content bg-purple">
        <h4 class="clearfix">
          <span class="fl">我的资产</span>
        </h4>
        <div class="fl" id="indicatorContainer">
          <div class="time-graph">
            <el-progress id="time-graph-canvas" color="#85d824" type="circle" :percentage="100" :width="152" :show-text="false"></el-progress>
          </div>
          <div class="sum">
            <p>账户余额
              <i>(元)</i>
            </p>
            <h5 id="my_balance">{{capitalBalance}}</h5>
          </div>
        </div>
        <div class="fl usable">
          <p class="p1">
            <em></em>可用余额
            <span id="my_balance_useable"> {{availableFunds}}元</span>
          </p>
          <p class="p2">
            <em></em>冻结资金
            <span id="my_balance_frozen">{{ capitalBalance - availableFunds }}元</span>
          </p>
        </div>
        <div class="fr buttons">
          <a class="coupon" @click="$router.openPage('/distributorCenter/myCoupon')">我的优惠券 |</a>
          <a class="bank" @click="$router.openPage('/distributorCenter/myBank')">我的银行卡</a>
          <el-button @click="$router.openPage('/distributorCenter/myBank')">提现</el-button>
          <el-button type="danger">充值</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark table-box ">
        <h4 class="clearfix">
          <span class="fl buy-order el-icon-menu">我的买单</span>
          <a class="fr" @click="$router.openPage('/distributorCenter/buyList')">更多&gt;</a>
        </h4>
        <el-table :data="buyOrder" border style="width: 100%" slot="empty">
          <el-table-column prop="orderCode" show-overflow-tooltip align="center" label="订单编号" width="100">
          </el-table-column>
          <el-table-column prop="goodsName" align="center" label="商品信息" width="200">
            <template slot-scope="scope">
              <div class="sp_info">
                <div class="sp_cover">
                  <img :src="scope.row.pcSmallPicture">
                </div>
                <div class="sp_content">
                  <span>{{scope.row.goodsName}}</span><br>
                  <span class="sp_code">商品代码：{{scope.row.goodsCode}}</span> 
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" show-overflow-tooltip align="center" label="下单时间" width="100">
          </el-table-column>
          <el-table-column prop="buyerName" show-overflow-tooltip align="center" label="买家" width="100">
          </el-table-column>
          <el-table-column prop="buyGoodsCount" show-overflow-tooltip align="center" label="商品数量">
            <template slot-scope="scope">
              <span>{{scope.row.buyGoodsCount}}{{scope.row.goodsSpecification}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="actualAmountPayment" show-overflow-tooltip align="center" label="实付款">
          </el-table-column>
          <el-table-column prop="orderType" show-overflow-tooltip align="center" label="订单类型">
            <template slot-scope="scope">
              <span v-if="scope.row.orderType==1">秒杀订单</span>
              <span v-else>商城交易</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" show-overflow-tooltip align="center" label="当前状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.orderStatus==1">待支付</span>
              <span v-else-if="scope.row.orderStatus==2">已支付</span>
              <span v-else-if="scope.row.orderStatus==4">已取消</span>
            </template>
          </el-table-column>
          <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="操作" width="100">
            <template slot-scope="scope">
              <a  @click="$router.openPage('/buyListDetail',{id:scope.row.orderCode})" style="color:#0166bb">订单详情</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark table-box ">
        <h4 class="clearfix">
          <span class="fl buy-order el-icon-menu">我的卖单</span>
          <a class="fr" @click="$router.openPage('/distributorCenter/saleList')">更多&gt;</a>
        </h4>
        <el-table :data="soldOrder" border style="width: 100%" slot="empty">
          <el-table-column prop="orderCode" show-overflow-tooltip align="center" label="订单编号" width="100">
          </el-table-column>
          <el-table-column prop="goodsName" align="center" label="商品信息" width="200">
            <template slot-scope="scope">
              <div class="sp_info">
                <div class="sp_cover">
                  <img :src="scope.row.pcSmallPicture">
                </div>
                <div class="sp_content">
                  <span>{{scope.row.goodsName}}</span><br>
                  <span class="sp_code">商品代码：{{scope.row.goodsCode}}</span> 
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" show-overflow-tooltip align="center" label="下单时间" width="100">
          </el-table-column>
          <el-table-column prop="soldName" show-overflow-tooltip align="center" label="卖家" width="100">
          </el-table-column>
          <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="商品数量">
            <template slot-scope="scope">
              <span>{{scope.row.buyGoodsCount}}{{scope.row.goodsSpecification}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="actualAmountPayment" show-overflow-tooltip align="center" label="实付款">
          </el-table-column>
          <el-table-column prop="orderType" show-overflow-tooltip align="center" label="订单类型">
            <template slot-scope="scope">
              <span v-if="scope.row.orderType==1">秒杀订单</span>
              <span v-else>秒杀订单</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" show-overflow-tooltip align="center" label="当前状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.orderStatus==1">待支付</span>
              <span v-else-if="scope.row.orderStatus==2">已支付</span>
              <span v-else-if="scope.row.orderStatus==4">已取消</span>
            </template>
          </el-table-column>
          <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="操作" width="100">
            <template slot-scope="scope">
              <a  @click="$router.openPage('/buyListDetail',{id:scope.row.orderCode})" style="color:#0166bb">订单详情</a>
            </template>
          </el-table-column>
        </el-table>
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
      warning_row: "warning_row",
      enterpriseCode: this.$store.state.dialog.enterpriseCode,
      http: this.$store.state.dialog.http,
      person: {},
      distributorName:'加载中',
      loginAccount:'加载中',
      availableFunds:'加载中',
      capitalBalance:"加载中",
      soldOrder: [],
      buyOrder: [{
        takeTeaCount:1
      },{
        takeTeaCount:1
      }],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    releaseStatusFmt(row, column) {
      return row.releaseStatus == 1
        ? "待配售"
        : row.releaseStatus == 2
          ? "已配售"
          : row.releaseStatus == 5
            ? "已发行"
            : row.releaseStatus == 6
              ? "待结算"
              : row.releaseStatus == 7 ? "已结束" : "";
    },
    getData() {
      this.axios.post(
          this.http + "/interface/pc/distributor/pcDistributor/distributorInfo",
          qs.stringify({
            loginPhone:this.$getcookie('LOGIN_PHONE'),
            pageSize:2
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.buyOrder = JSON.parse(res.data.data).buyOrder;
            this.soldOrder = JSON.parse(res.data.data).soldOrder;
            this.distributorName=JSON.parse(res.data.data).distributorName;
            this.loginAccount=JSON.parse(res.data.data).loginAccount;
            this.availableFunds=JSON.parse(res.data.data).availableFunds;
            this.capitalBalance=JSON.parse(res.data.data).capitalBalance;
          } else {
            this.open(res.data.data.message);
          }
        })
        .catch(err => {
          this.open(err);
        });
    },

    //删除cookie
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      this.$router.openPage("/login");
      location.reload();
    },

    //读取cookie，需要注意的是cookie是不能存中文的，如果需要存中文，解决方法是后端先进行编码encode()，前端取出来之后用decodeURI('string')解码。（安卓可以取中文cookie，IOS不行）
    getCookie(name) {
      var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return (arr[2]);
      } else {
        return false;
      }
    },
    open(err) {
      this.$alert("网络错误请求失败!", "错误", {
        confirmButtonText: "确定",
        callback: action => {
          this.delCookie("JSESSIONID");
          this.$router.openPage("/login");
          this.$message({
            type: "info",
            message: `错误原因: ${err}`
          });
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.myCenter {
  padding: 25px 30px;
  background-color: #fff;
  box-shadow: 0 0 15px #eee;
  border: 1px solid #e9e9e9;
  width: 100%;
  margin: 0 !important;
}
.myCenter_right {
  border-left: 1px dashed #ececec;
}
.user-info {
  margin: 30px 0 0;
}
.fl {
  float: left;
  /* display: inline-block; */
}
.fr {
  float: right;
  display: inline-block;
}
.txt {
  margin: 5px 0 0 10px;
  width: 180px;
}
.user-info h3 {
  font-size: 16px;
  margin: 0 0 5px;
}
.user-info .txt i {
  font-style: normal;
  color: #999;
  margin: 0 10px 0 0;
}
.user-info p {
  font-size: 12px;
  margin: 0 0 5px;
}
#indicatorContainer {
  position: relative;
  min-width: 152px;
  margin: 0px 0 0 54px;
}
.sum {
  position: absolute;
  left: 20px;
  top: 57px;
  width: 110px;
  text-align: center;
}
.sum p {
  font-size: 12px;
  font-weight: bold;
  margin: 0 0 2px;
}
.sum h5 {
  margin: 0;
  font-size: 18px;
  color: #db4b29;
}
.sum i {
  font-style: normal;
}
.usable {
  margin: 20px 0 0 45px;
  line-height: 25px;
}
.usable .p1 em {
  background-color: #85d824;
}
.usable .p2 em {
  background-color: #e5e9f2;
}
.usable p em {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 10px 0 0;
}
.buttons {
  margin: 110px 0 0;
  position: absolute;
  right: 60px;
}
.table-box {
  margin-top: 20px;
  font-size: 12px;
}
.table-box h4 {
  font-size: 16px;
  font-weight: bold;
}
.table-box h4 a {
  font-size: 14px;
  font-weight: normal;
  color: #0166bb;
  padding: 0 10px;
}
.el-icon-menu:before {
  /* margin-left: -10px; */
  color: #b4b4b4;
}
.sp_info{
  display: flex;
}
.sp_cover{
  width: 30%;
  height: 80%;
  >img{
    display: block;
    width: 45px;
    height: 45px;
    margin-top: 4px;
  }
}
.sp_content{
  width: 70%;
  text-align: left;
  .sp_code{
    font-size: 12px;
    color: #999;
  }
}
.coupon{
    color: #0166bb;
    position: absolute;
    top: -143px;
    font-size: 18px;
    left: -50px;
}
.bank{
    color: #0166bb;
    position: absolute;
    top: -143px;
    font-size: 18px;
    left: 56px;
}
</style>