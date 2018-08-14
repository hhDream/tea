<template>
<div>
  <el-row>
    <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
      <div class="grid-content  bg-purple clearfix top-side-box">
        <el-col :span="5">
          <div class="fl">
            <el-menu unique-opened default-active="1-4-1" class="el-menu-vertical-demo">
                <el-menu-item index="0">
                <i class="el-icon-menu" @click="$router.openPage('/distributorCenter/banlance')"></i>
                <span slot="title" @click="$router.openPage('/distributorCenter/banlance')">企业中心</span>
                </el-menu-item>
                <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">我的账号</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="$router.openPage('/distributorCenter/enterpriseInfo')">企业信息</el-menu-item>
                    <el-menu-item index="1-2" @click="$router.openPage('/distributorCenter/password')">资金密码管理</el-menu-item>
                    <el-menu-item index="1-3" @click="$router.openPage('/distributorCenter/distributorAddress')">我的地址</el-menu-item>
                    <el-menu-item index="1-4" @click="$router.openPage('/distributorCenter/enterpriseInfo')">我的消息</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-phone-outline"></i>
                    <span slot="title">商品管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="$router.openPage('/distributorCenter/myGoods')">我的商品</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span slot="title">订单管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" @click="$router.openPage('/distributorCenter/buyList')">购买订单</el-menu-item>
                    <el-menu-item index="3-2" @click="$router.openPage('/distributorCenter/saleList')">销售订单</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">新茶申购</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1" @click="$router.openPage('/distributorCenter/rushBuy')">抢购通知</el-menu-item>
                    <el-menu-item index="4-2" @click="$router.openPage('/distributorCenter/myRushBuy')">我的抢购</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">提货管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="5-1" @click="$router.openPage('/distributorCenter/myStock')">我的库存</el-menu-item>
                    <el-menu-item index="5-2" @click="$router.openPage('/distributorCenter/takeGoodsDetail')">提货明细</el-menu-item>
                    <el-menu-item index="5-3" @click="$router.openPage('/distributorCenter/shippingTemplates')">运费模板</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-star-off"></i>
                    <span slot="title">会员管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="6-1" @click="$router.openPage('/distributorCenter/vipInfo')">会员信息</el-menu-item>
                    <el-menu-item index="6-2" @click="$router.openPage('/distributorCenter/vipTransaction')">会员交易</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                <template slot="title">
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">财务管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="7-1" @click="$router.openPage('/distributorCenter/myBank')">我的银行卡</el-menu-item>
                    <el-menu-item index="7-2" @click="$router.openPage('/distributorCenter/myCoupon')">我的优惠券</el-menu-item>
                    <el-menu-item index="7-3" @click="$router.openPage('/distributorCenter/increaseAptitude')">增票资质</el-menu-item>
                    <el-menu-item index="7-4" @click="$router.openPage('/distributorCenter/invoiceSetting')">发票设置</el-menu-item>
                    <el-menu-item index="7-5" @click="$router.openPage('/distributorCenter/invoiceManage')">开票管理</el-menu-item>
                    <el-menu-item index="7-6" @click="$router.openPage('/distributorCenter/billCheck')">账单查询</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="19" style="min-height: 811px;">
            <transition name="bounce" enter-active-class="fadeInDown" leave-active-class="">
            <router-view></router-view>
            </transition>
        </el-col>
        </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import qs from "qs";

export default {};
</script> 
<style lang='less' scoped>
</style>