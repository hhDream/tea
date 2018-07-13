<template>
    <div>
    <el-breadcrumb style='padding:24px 0' separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>我的银行卡</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">我的银行卡</div>
    <el-row style='padding:24px;background:#efefef;width:100%;height:400px;position:relative'>
      <el-col :span="12">
        <img src="../../assets/images/bank.png" class="bank_tip">
      </el-col>
      <el-col :span="12">
        <div class="bank_place">
            <span style="font-size:18px;color:#666">您尚未绑定银行卡</span><br>
            <el-button style="background:#db4b29;color:white;width:150px;margin-top:6px">绑定银行卡</el-button>
        </div>
      </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      input: "1101**********007X"
    };
  }
};
</script>

<style lang="less" scoped>
.title {
  color: #db4b29;
  font-weight: 700;
  padding: 0 0 15px 0;
  font-size: 18px;
  border-bottom: 2px solid #db4b29;
  margin-bottom: 10px;
}
.bank_tip{
  position: absolute;
  left: 50%;
  top: 110px;
  margin-left: -225px;
}
.bank_place{
    position: absolute;
    left: 50%;
    top: 160px;
    margin-left: 10px;
}
</style>
