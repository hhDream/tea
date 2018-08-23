<template>
    <div class="order-payment" style="background:#F6F6F6"> 
        <el-row>
          <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
            <div class="main-side">
              <div class="main-cont">
                <div class="order-payment-cont">
                    <el-steps class="step" :active="active">
                      <el-step title="拍下商品"></el-step>
                      <el-step title="确认订单信息"></el-step>
                      <el-step title="确认支付"></el-step>
                      <el-step title="订单完成"></el-step>
                    </el-steps>
                  <div class="clearfix title">
                    <div class="cover" style="float:left">
                      <img :src="order.pcLargePicture" alt="">
                    </div>
                    <div class="fl" style="margin-left:20px">
                      <p>{{ order.goodsName }}</p>
                      <p>优惠金额：{{ order.preferentialAmount?order.preferentialAmount:0 }}元</p>
                      <p>商品数量：{{ order.buyGoodsCount }}{{ order.benchmarkingUnit3 }}</p>
                    </div>
                    <div class="fr price">
                      <span>{{ order.actualAmountPayment }}</span>元
                    </div>
                  </div>
                  <div style="text-align: right;margin-right:20px;">由于库存紧俏，请在<span style="color: red;padding: 0 5px">15分钟</span>内付款，否则自动取消订单</div>
                  <div class="pay-box">
                    <!-- 余额支付 -->
                    <!-- <div :class="{'clearfix':true,'notactive':true,'active':act==1}" @click="act=1">
                      <div class="fl check">
                        <i></i>
                      </div>
                      <div class="fl sum">可用余额 0.00 元</div>
                      <div class="fl notice" style="display: block;">余额不足，可先充值</div>
                    </div> -->
                    <!--快捷支付-->
                    <div :class="{'choose-box':true,'clearfix':true,'notactive':true,'active':act==2}" @click="act=2">
                      <div class="clearfix no-bb">
                        <div class="fl check">
                          <i></i>
                        </div>
                        <div class="fl fast">
                          <span class="tit fl icon-title">快捷支付</span>
                          <span class="note fl">无需登录，支付更便捷
                          </span>
                        </div>
                      </div>
                      <!-- <div class="fast-type clearfix no-bb">
                        <span class="icon-title fl">请选择快捷支付卡种：</span>
                        <span class="type fl debit" type="debit">储蓄卡</span>
                        <span class="type fl credit" type="credit">信用卡</span>
                      </div> -->
                    </div>
                    <!--网银支付-->
                    <!-- <div  :class="{'choose-box':true,'clearfix':true,'notactive':true,'active':act==3}" @click="act=3">
                      <div class="clearfix no-bb">
                        <div class="fl check" data-name="orderPayMode">
                          <i></i>
                        </div>
                        <div class="fl fast">
                          <span class="wy fl icon-title">网银支付</span>
                          <span class="note fl">需跳转网银页面
                          </span>
                        </div>
                      </div> -->
                      <!-- <div class="fast-type clearfix no-bb">
                        <span class="icon-title fl">请选择网银支付卡种：</span>
                        <span class="type fl" type="debit">储蓄卡</span>
                        <span class="type fl">信用卡</span>
                      </div> -->
                    <!-- </div> -->
                    <!--选择余额是显示的内容-->
                    <!--无密码时显示设置资金密码-->
                    <!-- <div  v-if="false">
                      <div class="buttons pay-btn">
                        <button type="button" class="btn btn-primary" @click="toChangePass" style="width:150px;">设置资金密码</button>
                        <span>*您尚未设置资金密码，请设置资金密码</span>
                      </div>
                    </div> -->
                    <!--正常余额支付-->
                    <div class="balance-next">
                      <!-- <div class="add-card clearfix">
                        <div class="btn-add-card fl" @click="sw=1">添加快捷／网银付款</div>
                        <a class="fl" href="">限额说明</a>
                      </div> -->
                      <!-- <div class="label-title">
                        资金密码：
                      </div>
                      <div class="input-box clearfix">
                        <div class="password-box fl">
                          <ul style="font-size:20px;text-align:center;">
                            <li>{{ password.length >= 1?"*":'' }}</li>
                            <li>{{ password.length >= 2?"*":'' }}</li>
                            <li>{{ password.length >= 3?"*":'' }}</li>
                            <li>{{ password.length >= 4?"*":'' }}</li>
                            <li>{{ password.length >= 5?"*":'' }}</li>
                            <li>{{ password.length >= 6?"*":'' }}</li>
                          </ul>
                          <input type="password" v-model="password" maxlength="6">
                        </div>
                        <a style="color:#337ab7;cursor:pointer;" @click="toChangePass" class="fl">忘记密码？</a>
                      </div>
                      <div class="tip">请输入6位数字资金密码</div> -->
                      <!-- <div class="label-title">
                        短信验证码：
                      </div>
                      <div class="input-box clearfix">
                        <input type="hidden" value="">
                        <input type="text" class="fl" maxlength="6">
                        <button class="fl btn btn-default btn-code" >发送验证码</button>
                      </div>c
                      <div class="tip">请输入手机
                        <span>130****9890</span>收到的短信验证码
                      </div> -->
                      <div class="buttons pay-btn">
                        <button type="button" class="btn btn-primary" @click="payNow" style="width:150px;" >立即支付</button>
                      </div>
                    </div>
                    <!--选择银行卡时显示-->
                    <!-- <div>
                      <div class="add-card clearfix">
                        <div class="btn-add-card fl">添加快捷／网银付款</div>
                        <a class="fl" href="">限额说明</a>
                      </div>
                    </div> -->
                    <!--end-->
                    <!--余额不足-->
                    <!-- <div >
                      <div class="buttons pay-btn disabled">
                        <button type="button" class="btn btn-primary" style="width:150px;">立即支付</button>
                      </div>
                    </div> -->
                    <!--end-->
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
            <form :action="payment.url" method="post" id="sss" enctype="application/x-www-form-urlencoded">
              <input type="hidden" :value="payment.cmdId" name="cmd_id">
              <input type="hidden" :value="payment.merCustId" name="mer_cust_id">
              <input type="hidden" :value="payment.sign" name="check_value">
              <input type="hidden" :value="payment.version" name="version">
              <button type="submit" style="display:none">提交</button>
            </form>
          </el-col>
        </el-row>
    </div> 
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      act: 2,
      password: "",
      order: {},
      http: this.$store.state.dialog.http,
      active: 2,
      payment:{},
      orgin:''
    };
  },
  methods: {
    payNow() {
      if(this.orgin == 1){
        this.axios
        .post(
          this.http + "/interface/pc/order/finishOrder",
          qs.stringify({
            orderCode: this.$route.query.orderCode,
            phone:this.getCookie('LOGIN_PHONE'),
            state:this.getCookie('STATUS')
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            console.log(JSON.parse(res.data.data))
            this.payment = JSON.parse(res.data.data);
            console.log(this.payment);
            var ss = document.getElementById("sss");
            setTimeout(function() {
              ss.submit();
            }, 1000);
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
      }else if(this.orgin == 2){
         this.axios
        .post(
          this.http + "/interface/pc/order/finishShoppingMallOrder",
          qs.stringify({
            orderCode: this.$route.query.orderCode,
            phone:this.getCookie('LOGIN_PHONE'),
            state:this.getCookie('STATUS')
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.payment = JSON.parse(res.data.data);
            var ss = document.getElementById("sss");
            setTimeout(function() {
              ss.submit();
            }, 1000);
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
      }
      
    },
    // toChangePass(){
    //   if(true){
    //     this.$router.openPage('/distributorCenter/password');
    //   }
    // },
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/order/orderInfromation",
          qs.stringify({
            orderCode: this.$route.query.orderCode
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.order = JSON.parse(res.data.data);
            console.log(JSON.parse(res.data.data));
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return arr[2];
      } else {
        return false;
      }
    }
  },
  created() {
    this.getData();
    this.orgin = this.$route.query.type; 
  },
  watch: {
    password() {
      console.log(this.password);
    }
  }
};
</script> 
<style lang = 'less' scoped >
@import "../../assets/order.css";
.step {
  width: 500px;
  top: -100px;
  position: absolute;
  right: 0;
}
</style>