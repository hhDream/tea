<template>
  <div class="box">
    <el-breadcrumb style='padding:24px' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userInfo' }">我的账号</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form status-icon  label-width="140px" style="background-color: #F6F6F6;padding-bottom: 10px;">
      <span class="title">个人信息</span>
      <el-form-item label="会员名称：" prop="name">
        <el-col :span='11'>
          <span>{{user.customerName}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="会员编号：" prop="number">
        <el-col :span='11'>
          <span>{{user.customerAccount}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证号：" prop="IDCard">
        <el-col :span='11'>
          <span>{{user.certificateNumber}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="会员类型：" prop="type">
        <el-col :span='11'>
          <span>个人用户</span>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-col :span='3'>
          <span>{{user.phone}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="所属经销商：" prop="dealer">
        <el-col :span='11'>
          <span>{{user.distributorName}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="门店地址：" prop="storeAddress">
        <el-col :span='11'>
          <span>{{user.protalAddress}}</span>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        user:{},
        http: this.$store.state.dialog.http,
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.axios.post(this.http + '/interface/pc/customer/pcCustomer/customerInfo', qs.stringify({
          loginPhone: this.getCookie('LOGIN_PHONE')
        })).then(res => {
          if(res.data.code == 200){
            this.user = JSON.parse(res.data.data);
          }else{
            
          }
        })
      },
      getCookie(name) {
          var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
          if (arr = document.cookie.match(reg)) {
              return (arr[2]);
          } else {
              return false
          }
      },
    }
  }
</script>

<style lang="less" scoped>
  #codeimg {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    float: right;
  }

  .get_btn {
    text-align: right;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  .title {
    text-align: right;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 16px 26px 10px 0;
    width: 140px;
    display: block;
    font-weight: bold;
  }
  
</style>
