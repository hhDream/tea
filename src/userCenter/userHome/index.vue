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
            <h3>{{person.enterpriseName}}</h3>
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
            <span id="my_balance_useable"> {{person.capitalBalance}}元</span>
          </p>
          <p class="p2">
            <em></em>冻结资金
            <span id="my_balance_frozen"> 0.00</span>
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
          <el-table-column prop="orderNum" label="订单编号"  width="120">
          </el-table-column>
          <el-table-column prop="goodsInfo" label="商品信息"  width="240">
            <template slot-scope="scope">
              <div class="sp_info">
                <div class="sp_cover">
                  <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=32b52bc5f51f4134f43a0d2c4476feaf/b999a9014c086e06893e896d0a087bf40ad1cb06.jpg">
                </div>
                <div class="sp_content">
                  <span>{{scope.row.goodsInfo}}</span><br>
                  <span class="sp_code">商品代码：CS2018030601</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column resizable show-overflow-tooltip align="center" prop="orderTime" label="下单时间" width="120">
            </el-table-column>
          <el-table-column prop="seller" label="卖家"  width="150">
          </el-table-column>
          <el-table-column prop="countTotal" label="商品数量"  width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.countTotal?scope.row.countTotal:'0'}} {{scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="payment" label="实付款"  >
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型"  >
          </el-table-column>
          <el-table-column prop="currentState" label="当前状态"  >
          </el-table-column>
          <el-table-column prop="action" label="操作"  >
            <template slot-scope="scope">
              <el-button @click="$router.openPage('/buyListDetail')" type="text">{{ scope.row.action}}</el-button>
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
          "enterpriseName": "某某某",
          "loginAccount": "10010",
          "capitalBalance": "200",
        },
        allotment: [],
        stock: [],
        bill: [{
            "orderNum": "201807031618141262057",
            "goodsInfo": "商品信息1",
            "orderTime": "2018-07-03 16:18:15",
            "seller": "广东广州芳村新华裕市场旗舰店",
            "countTotal": "100",
            "unit": "盒",
            "payment": "2000.0元",
            "orderType": "商城交易",
            "currentState": "交易取消",
            "action": "订单详情",
          },{
            "orderNum": "201807031618141262058",
            "goodsInfo": "商品信息2",
            "orderTime": "2018-07-04 16:18:15",
            "seller": "广东广州芳村新华裕市场旗舰店22",
            "countTotal": "10",
            "unit": "千克",
            "payment": "1000.0元",
            "orderType": "商城交易",
            "currentState": "交易取消",
            "action": "订单详情",
          }],
        fullscreenLoading:false
      }
    },
    created() {
      // this.getData();
      console.log(this.$store.state.dialog);
    },
    // methods: {
    //   releaseStatusFmt(row, column) {
    //     return row.releaseStatus == 1 ? "待配售" : row.releaseStatus == 2 ? "已配售" : row.releaseStatus == 5 ? "已发行" : row.releaseStatus == 6 ? "待结算" : row.releaseStatus == 7 ? "已结束" : "";
    //   },
    //   getData() {
    //     this.fullscreenLoading=true;
    //     this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/enterpriseInfo", qs.stringify({
    //       enterpriseId: this.enterpriseCode
    //     })).then(res => {
    //       this.fullscreenLoading=false;
    //       console.log(res.data.data)
    //       if(res.data.code==200){
    //           this.person = JSON.parse(res.data.data).enterprise;
    //           this.stock = JSON.parse(res.data.data).stock;
    //           this.allotment = JSON.parse(res.data.data).allotment;
    //           console.log(JSON.parse(res.data.data));
    //           if (this.allotment.releaseStatus == 1) {
    //             this.allotment.releaseStatus = "待配售"
    //           } else if (this.allotment.releaseStatus == 2) {
    //             this.allotment.releaseStatus = "已配售"
    //           } else if (this.allotment.releaseStatus == 5) {
    //             this.allotment.releaseStatus = "已发行"
    //           } else if (this.allotment.releaseStatus == 7) {
    //             this.allotment.releaseStatus = "已结束"
    //           } else if (this.allotment.releaseStatus == 6) {
    //             this.allotment.releaseStatus = "待结算"
    //           }
    //       }else{
    //         this.open(res.data.data.message)
    //       }

    //     }).catch(err => {
    //       this.fullscreenLoading=false;
    //       this.open(err)
    //     })
    //   },
      
    //   //删除cookie
    //   delCookie(name) {
    //       var exp = new Date();
    //       exp.setTime(exp.getTime() - 1);
    //       var cval = this.getCookie(name);
    //       if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    //       this.$router.openPage('/login')
    //       location.reload()
    //   },
      
    //   //读取cookie，需要注意的是cookie是不能存中文的，如果需要存中文，解决方法是后端先进行编码encode()，前端取出来之后用decodeURI('string')解码。（安卓可以取中文cookie，IOS不行）
    //   getCookie(name) {
    //       var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    //       if (arr = document.cookie.match(reg)) {
    //           return true;
    //           // return (arr[2]);
    //       } else {
    //           return false
    //       }
    //   },
    //   open(err) {
    //     this.$alert('网络错误请求失败!', '错误', {
    //       confirmButtonText: '确定',
    //       callback: action => {
    //         this.delCookie('JSESSIONID')
    //         this.$router.openPage('/login') 
    //         this.$message({
    //           type: 'info',
    //           message: `错误原因: ${ err }`
    //         });
    //       }
    //     });
    //   }
    // }
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