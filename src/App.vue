<template>
  <div id="app">
<el-row>
  <el-col :span="24">
        <div class="head">
        <div class="clearfix box">
            <div class="fl"><span>您好！</span><span id="showName"></span><a class="a3" href="javascript:;" onclick="getout()">退出</a></div>
            <div class="fr">
                <a href="#">我的消息</a>
                <!--<a>网站导航</a>-->
            </div>
        </div>
    </div>
  </el-col>
</el-row>
<el-row>
  <el-col :span="24">
        <div class="top-side">
            <div class="clearfix top-side-box">
                <div class="fl logo">
                    <a class="img" href="#"></a>
                </div>
                <ul class="fl nav">
                    <li><a href="#">首页</a></li>
                    <li><a href="#">品牌商城</a></li>
                    <li><a href="#">新茶抢购</a></li>
                </ul>
                <div class="fr phone-box">
                    <p>24小时全国服务热线</p>
                    <h4>4009286990</h4>
                </div>
            </div>
        </div>
  </el-col>
</el-row>
<el-row :gutter="20">

  <el-col :span="24"><div class="grid-content  bg-purple clearfix top-side-box">
    <div class="fl">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item index="0" >
        <i class="el-icon-menu" @click="sw"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title" >我的账号</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"  @click="$router.openPage('/editPwd')">密码管理</el-menu-item>
          <el-menu-item index="1-2" @click="$router.openPage('/message')" >我的消息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-phone-outline"></i>
          <span slot="title">新茶抢购</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="$router.openPage('/rushby')">我的抢购</el-menu-item>
          <el-menu-item index="2-2" @click="$router.openPage('/getRetailPrices')">零售指导价</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span slot="title">提货管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="$router.openPage('/myInventory')">我的库存</el-menu-item>
          <el-menu-item index="3-2" @click="$router.openPage('/takegoodsDetail')">提货明细</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">会员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1" @click="$router.openPage('/dealerManage')">经销商管理</el-menu-item>
          <el-menu-item index="4-2" @click="$router.openPage('/dealerTransaction')">经销商交易</el-menu-item>
          <el-menu-item index="4-3" @click="$router.openPage('/management')">客户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">财务管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" @click="$router.openPage('/myAccount')">我的账户</el-menu-item>
          <el-menu-item index="5-2" @click="$router.openPage('/billQuery')">账单查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    </div>

            <div class="main-cont" style="min-height: 811px;">
                    <transition 
                      name="bounce"
                      enter-active-class="bounceIn"
                      leave-active-class="bounceOut"
                    >
                      <router-view style="display:inline-block"></router-view>
                    </transition>
            </div>

        </div></el-col>  
</el-row>
<el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark">
            <div class="foot" id="foot">
            <div class="clearfix box">
                <ul class="fl">
                    <li class="l1">
                        <h5>网站指南</h5>
                        <a href="#">注册指南</a>
                        <a href="#">隐私说明</a>
                        <a href="#">注册协议</a>
                        <a href="#">抢购说明</a>
                        <a href="#">发票帮助</a>
                    </li>
                    <li class="l3">
                        <h5>支付与仓储</h5>
                        <a href="#">支付服务协议</a>
                        <a href="#">仓储服务协议</a>
                    </li>
                    <li class="L4">
                        <h5>关于我们</h5>
                        <a href="#">工商营业执照</a>
                        <a href="#">平台简介</a>
                    </li>
                </ul>
                <div class="fr phone-box">
                    <p>24小时全国服务热线</p>
                    <h4>4009286990</h4>
                </div>
                <div class="fl copyright">
                    <p>西双版纳璟泰茶业有限公司 版权所有<br>网站备案/许可证号：滇ICP备17005249号-1</p>
                </div>
            </div>
        </div>
    </div>
    </el-col>
</el-row>
  </div>
</template>

<script>
  // import axios from 'axios'
export default {
  name: 'App',
  
   data(){
     return{
        transitionName : 'slide-fade',
        isCollapse:true
     }
   },
   methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      sw(){
        this.isCollapse=!this.isCollapse;
      }
   }
}
</script>

<style>
  @import "./assets/teamall.css";
  @import "./assets/bootstrap.css";
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
