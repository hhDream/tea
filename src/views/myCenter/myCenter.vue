<template>
<div>
  <el-row>
    <el-col :span="24">
      <div class="grid-content  bg-purple clearfix top-side-box">
        <el-col :span="5">
          <div class="fl">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
                <el-menu-item index="0">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="$router.openPage('/myCenter/home')">个人中心</span>
                </el-menu-item>
                <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">我的账号</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="$router.openPage('/myCenter/editPwd')">密码管理</el-menu-item>
                    <el-menu-item index="1-2" @click="$router.openPage('/myCenter/editMoneyPsw')">资金密码管理</el-menu-item>
                    <el-menu-item index="1-3" @click="$router.openPage('/myCenter/message')">我的消息</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-phone-outline"></i>
                    <span slot="title">新茶抢购</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="$router.openPage('/myCenter/rushby')">我的抢购</el-menu-item>
                    <el-menu-item index="2-2" @click="$router.openPage('/myCenter/getRetailPrices')">零售指导价</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span slot="title">提货管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" @click="$router.openPage('/myCenter/myInventory')">我的库存</el-menu-item>
                    <el-menu-item index="3-2" @click="$router.openPage('/myCenter/takegoodsDetail')">提货明细</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">会员管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1" @click="$router.openPage('/myCenter/dealerManage')">经销商管理</el-menu-item>
                    <el-menu-item index="4-2" @click="$router.openPage('/myCenter/dealerTransaction')">经销商交易</el-menu-item>
                    <el-menu-item index="4-3" @click="$router.openPage('/myCenter/management')">客户管理</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">财务管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="5-1" @click="$router.openPage('/myCenter/myAccount')">我的账户</el-menu-item>
                    <el-menu-item index="5-2" @click="$router.openPage('/myCenter/billQuery')">账单查询</el-menu-item>
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