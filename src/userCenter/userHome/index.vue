<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
  <el-row class="myCenter" :gutter="20">
    <el-col :span="8" style="padding-right: 10px;padding-left:0">
      <div class="grid-content bg-purple">
        <h4>欢迎您</h4>
        <div class="clearfix user-info">
          <div class="fl img">
            <img src="../../assets/images/user-head.jpg">
          </div>
          <div class="fr txt">
            <h3>{{person.customerName}}</h3>
            <p id="producerNo">
              <i>会员账号</i>{{person.loginAccount}}
            </p>
            <p>
              <i>会员类型</i>用户</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col class="myCenter_right" :span="16">
      
      <div class="grid-content bg-purple">
        <h4 class="clearfix">
          <span class="fl">我的资产</span>
        </h4>
        <div style="float: right;position: absolute;right: 60px;top: 24px;">
          <el-button @click="$router.openPage('/myUserCenter/coupon')" type="text">我的优惠券</el-button>
          <!-- <span style="color: #0166bb">我的优惠券</span> -->
          <span style="font-size: 16px;color: #66b1ff"> | </span>
          <el-button @click="$router.openPage('/myUserCenter/bankCard')" type="text">我的银行卡</el-button>
        </div>
        
        <div class="fl" id="indicatorContainer">
          <div class="time-graph">
            <el-progress id="time-graph-canvas" color="#85d824" type="circle" :percentage="100" :width="152" :show-text="false"></el-progress>
          </div>
          <div class="sum">
            <p>账户余额
              <i>(元)</i>
            </p>
            <h5 id="my_balance">{{person.capitalBalance}}</h5>
          </div>
        </div>
        <div class="fl usable">
          <p class="p1">
            <em></em>可用余额
            <span id="my_balance_useable">{{person.availableFunds}}元</span>
          </p>
          <p class="p2">
            <em></em>冻结资金
            <span id="my_balance_frozen">{{person.capitalBalance - person.availableFunds}}</span>
          </p>
        </div>
        <div class="fr buttons">
          <el-button>提现</el-button>
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
          <a class="fr" @click="$router.openPage('/myCenter/myInventory')">更多&gt;</a>
        </h4>
        <el-table :data="bill" border style="width: 100%" slot="empty">
          <el-table-column prop="orderCode" label="订单编号"  width="120" align="center">
          </el-table-column>
          <el-table-column prop="goodsInfo" label="商品信息" align="center" width="240">
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
          <el-table-column resizable show-overflow-tooltip align="center" prop="orderTime" label="下单时间" width="120">
            </el-table-column>
          <el-table-column prop="soldName" label="卖家"  width="150" align="center">
          </el-table-column>
          <el-table-column prop="buyGoodsCount" label="商品数量"  width="100" align="center">
          </el-table-column>
          <el-table-column prop="actualAmountPayment" label="实付款" align="center">
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.orderType==1?'秒杀订单':'商城交易'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="currentState" label="当前状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status==1?'待支付':scope.row.status==2?'已支付':'已取消'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center" fixed='right'>
            <template slot-scope="scope">
              <span v-if="scope.row.status==1" style="color:#66b1ff;cursor:pointer">立即支付</span><br>
              <span v-if="scope.row.status==1" style="color:#66b1ff;cursor:pointer">取消订单</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
  
</div>
</template>

<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        warning_row: 'warning_row',
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        http: this.$store.state.dialog.http,
        person: {
          "name": "",
          "loginAccount": this.getCookie("LOGIN_ACCOUNT"),
          "capitalBalance": "0",
          'availableFunds':'0',
        },
        allotment: [],
        stock: [],
        bill: [],
        fullscreenLoading:false
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.fullscreenLoading=true;
        this.axios.post(this.http + "/interface/pc/customer/pcCustomer/customerPersonlInfo", qs.stringify({
          loginPhone: this.getCookie('LOGIN_PHONE'),
          pageSize:2
        })).then(res => {
          this.fullscreenLoading=false;
          if(res.data.code == 200){
            console.log(JSON.parse(res.data.data).buyOrder)
            this.person.name = JSON.parse(res.data.data).customerName;
            this.person.loginAccount = JSON.parse(res.data.data).loginAccount;
            this.person.availableFunds = JSON.parse(res.data.data).availableFunds;
            this.person.capitalBalance = JSON.parse(res.data.data).capitalBalance;
            this.bill = JSON.parse(res.data.data).buyOrder;
          }
        })
      },
      //读取cookie，需要注意的是cookie是不能存中文的，如果需要存中文，解决方法是后端先进行编码encode()，前端取出来之后用decodeURI('string')解码。（安卓可以取中文cookie，IOS不行）
      getCookie(name) {
          var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
          if (arr = document.cookie.match(reg)) {
              return (arr[2]);
          } else {
              return false
          }
      },
    }
  }
</script>

<style lang="less" scoped>
  .myCenter {
    padding: 25px 30px;
    background-color: #fff;
    box-shadow: 0 0 15px #eee;
    border: 1px solid #e9e9e9;
    width: 100%;
    margin: 0!important;
  }
  .myCenter_right {
    border-left: 1px dashed #ececec
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
    color: #66b1ff;
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
    font-style: normal
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
    color: #66b1ff;
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
    width: 55px;
    height: 80%;
    >img{
      display: block;
      width: 45px;
      height: 45px;
      margin-top: 2px;
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
</style>