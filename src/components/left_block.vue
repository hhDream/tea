<template>
<div class="fl">
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
    <el-menu-item index="0">
      <i class="el-icon-menu"></i>
      <span slot="title" @click="$router.openPage('/')">个人中心</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span slot="title">我的账号</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" @click="$router.openPage('/editPwd')">密码管理</el-menu-item>
        <el-menu-item index="1-2" @click="$router.openPage('/editMoneyPsw')">资金密码管理</el-menu-item>
        <el-menu-item index="1-3" @click="$router.openPage('/message')">我的消息</el-menu-item>
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
</template>