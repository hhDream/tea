<template>
<div>
    <el-dialog :visible.sync="centerDialogVisible" width="50%" :before-close="handleClose" title="提示" center>
      <el-row>
        <el-col :span="24" style="text-align:center;margin-top:-10px">您还未完善资料信息，完善资料信息将拥有以下优势：</el-col>
        <el-col :span="7" :offset='2'>
          <div class="icon_box"><img src="../assets/images/fill-in-info01.png" alt="" class="icon_img"></div>
          <div class="icon_place">严格保证您的资金安全</div>
        </el-col>
        <el-col :span="6">
          <div class="icon_box"><img src="../assets/images/fill-in-info02.png" alt="" class="icon_img"></div>
          <div class="icon_place">自由参与商城交易</div>
        </el-col>
        <el-col :span="7">
          <div class="icon_box"><img src="../assets/images/fill-in-info03.png" alt="" class="icon_img"></div>
          <div class="icon_place">特约门店提供优质服务</div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button style="background:white;color:#db4b29;margin-right:40px;" class="will_complete" @click="dialogVisible = false">稍后完善</el-button>
        <el-button style="background:#db4b29;color:white;" @click="$router.openPage('/writeInfo')">完善资料</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: true
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="less" scoped>
.icon_box {
  width: 100%;
  margin-top: 30px;
  // height: 100px;
}
.icon_img {
  display: block;
  width: 90px;
  height: 90px;
  margin: 10px auto 25px;
}
.icon_place {
  text-align: center;
}
</style>
