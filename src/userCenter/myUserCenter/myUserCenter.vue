<template>
<div>
  <el-row>
    <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
      <div class="grid-content  bg-purple clearfix top-side-box">
        <el-col :span="5">
          <div class="fl">
            <el-menu unique-opened default-active="1-4-1" class="el-menu-vertical-demo">
                <el-menu-item index="0">
                    <i class="el-icon-menu"></i>
                    <span slot="title" @click="$router.openPage('/myUserCenter/userHome')">个人中心</span>
                </el-menu-item>
                <!-- <el-menu-item index="1">
                    <i class="el-icon-tickets"></i>
                    <span slot="title" @click="$router.openPage('/myUserCenter/userHome')">会员首页</span>
                </el-menu-item> -->
                <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-phone-outline"></i>
                    <span slot="title">我的账号</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="$router.openPage('/myUserCenter/userInfo')">个人信息</el-menu-item>
                    <el-menu-item index="2-2" @click="$router.openPage('/myUserCenter/userPwd')">密码管理</el-menu-item>
                    <el-menu-item index="2-3" @click="$router.openPage('/myUserCenter/userAddress')">我的地址</el-menu-item>
                    <el-menu-item index="2-4" @click="$router.openPage('/myUserCenter/userInfo')">我的消息</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span slot="title">订单管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" @click="$router.openPage('/myUserCenter/purchaseOrder')">购买订单</el-menu-item>
                    <el-menu-item index="3-2" @click="$router.openPage('/myUserCenter/sellOrder')">销售订单</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">提货管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1" @click="$router.openPage('/myUserCenter/userStock')">我的库存</el-menu-item>
                    <el-menu-item index="4-2" @click="$router.openPage('/myUserCenter/takeDetail')">提货明细</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">财务管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="5-1" @click="$router.openPage('/myUserCenter/bankCard')">我的银行卡</el-menu-item>
                    <el-menu-item index="5-2" @click="$router.openPage('/myUserCenter/coupon')">我的优惠券</el-menu-item>
                    <el-menu-item index="5-3" @click="$router.openPage('/myUserCenter/increaseAptitudes')">增票资质</el-menu-item>
                    <el-menu-item index="5-4" @click="$router.openPage('/myUserCenter/orderSearch')">账单查询</el-menu-item>
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
    import qs from 'qs'

    export default {
        
    }
</script> 
<style lang = 'less' scoped >

</style>