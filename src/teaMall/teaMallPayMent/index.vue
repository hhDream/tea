<template>
    <div class="order-payment" style="background:#F6F6F6"> 
        <el-row>
          <el-col   style="min-width:1190px;margin:20px auto;float: none;" :span="16">
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
        <div class="fl">
          <p id="p-goods">下关沱茶佩紫饼茶</p>
          <p id="p-number">商品数量：1</p>
        </div>
        <div id="d-totalprice" class="fr price">
          <span>680.00</span>元</div>

      </div>
      <div id="pay_tips" style="text-align: right;margin-right:20px;">由于库存紧俏，请在(
        <span style="color: red;padding: 0 5px">0小时29分28秒</span>)内付款，否则自动取消订单</div>
      <div class="pay-box">
        <!--------余额支付------->
        <div class="clearfix balance active" data-type="BALANCE">
          <div class="fl check">
            <i></i>
          </div>
          <div id="d-balance" class="fl sum">可用余额 0.00 元</div>
          <div id="d-balance-warn" class="fl notice" style="display: block;">余额不足，可先充值</div>
        </div>
        <!--添加的银行卡-->

        <!--快捷支付-->
        <div id="quick_pay" class="choose-box clearfix hide-wrap" data-type="QUICK_PAY">
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
          <div class="fast-type clearfix no-bb">
            <span class="icon-title fl">请选择快捷支付卡种：</span>
            <span class="type fl debit" type="debit">储蓄卡</span>
            <span class="type fl credit" type="credit">信用卡</span>
          </div>
        </div>
        <!--网银支付-->
        <div id="e_currency_pay" class="choose-box clearfix hide-wrap" data-type="E_CURRENCY_PAY">
          <div class="clearfix no-bb">
            <div class="fl check" data-name="orderPayMode">
              <i></i>
            </div>
            <div class="fl fast">
              <span class="wy fl icon-title">网银支付</span>
              <span class="note fl">需跳转网银页面
              </span>
            </div>
          </div>
          <div class="fast-type clearfix no-bb">
            <span class="icon-title fl">请选择网银支付卡种：</span>
            <span class="type fl" type="debit">储蓄卡</span>
            <span class="type fl">信用卡</span>
          </div>
        </div>
        <!--选择余额是显示的内容-->
        <!--无密码时显示设置资金密码-->
        <div id="balancePassword" class="hide-wrap">
          <div class="buttons pay-btn">
            <button type="button" class="btn btn-primary" onclick="orderPayment.modeControl('passwordDialog')" style="width:150px;">设置资金密码</button>
            <span>*您尚未设置资金密码，请设置资金密码</span>
          </div>
        </div>
        <!--正常余额支付-->
        <div id="balanceNext" class="hide-wrap balance-next">
          <div id="add-card" class="add-card clearfix">
            <div class="btn-add-card fl" @click="sw=1">添加快捷／网银付款</div>
            <a class="fl" href="javascript:teamall.showPayLimit();">限额说明</a>
          </div>
          <div class="label-title">
            资金密码：
          </div>
          <div class="input-box clearfix">
            <div class="password-box fl">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <input type="password" oninput="teamall.setPassword()" maxlength="6" id="password">
            </div>
            <!--<a href="javascript:personalCenter.EDIT_PWD='FUND_PWD';clickMenu('/account/editPwd.html');" class="fl">忘记密码？</a>-->
          </div>
          <div class="tip">请输入6位数字资金密码</div>
          <div class="label-title">
            短信验证码：
          </div>
          <div class="input-box clearfix">
            <input type="hidden" id="mobileCode-key" value="">
            <input type="text" class="fl" id="smsCode" maxlength="6">
            <button class="fl btn btn-default btn-code" onclick="orderPayment.sendSms()">发送验证码</button>
          </div>
          <div class="tip">请输入手机
            <span id="mobile">130****9890</span>收到的短信验证码</div>
          <div class="buttons pay-btn">
            <button id="bt-pay" type="button" class="btn btn-primary" style="width:150px;" onclick="orderPayment.payment()">立即支付</button>
          </div>
        </div>
        <!--选择银行卡时显示-->
        <div>
          <div id="addCard" class="add-card clearfix hide-wrap" style="display: block;">
            <div class="btn-add-card fl">添加快捷／网银付款</div>
            <a class="fl" href="javascript:teamall.showPayLimit();">限额说明</a>
          </div>
        </div>
        <!--end-->
        <!--余额不足-->
        <div id="balanceDisabled" class="hide-wrap" style="display: block;">
          <div class="buttons pay-btn disabled">
            <button type="button" class="btn btn-primary" style="width:150px;">立即支付</button>
          </div>
        </div>
        <!--end-->
      </div>


    </div>
  </div>
</div>
          </el-col>
        </el-row>

    </div> 
</template>

<script>
export default ({
    data(){
        return{
            active:3
        }
    }
})
</script> 
<style lang = 'less' scoped >
@import "../../assets/order.css";
.step{
        width: 500px;
    top: -100px;
    position: absolute;
    right: 0;
}
</style>