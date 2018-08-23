<template>
  <div class="box">
    <el-breadcrumb style='padding:24px 0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userInfo' }">我的账号</el-breadcrumb-item>
      <el-breadcrumb-item>资金密码管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
      <el-form-item label="已验证手机" prop="phone">
        <el-col :span='11'>
          <el-input type="text" :disabled="true" v-model="phone" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-col :span='11'>
          <el-tooltip class="item" effect="dark" content="请设置6位数字密码" placement="right">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-tooltip>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-col :span='11'>
          <el-tooltip class="item" effect="dark" content="请确认密码" placement="right">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-tooltip>
        </el-col>
      </el-form-item>
      <el-form-item label="验证码" prop="imageCode">
        <el-col style="margin-top:0"  :span='6'>
          <el-input placeholder="请输入验证码" v-model="ruleForm2.imageCode" auto-complete="off" clearable></el-input>
        </el-col>
        <el-col :span='5'>
          <span class="img-validate-code">
                <el-tooltip class="item" effect="dark"  content="点图片重新获取验证码" placement="right" >
                  <img id="codeimg" @click="changeCode()" :src="imgCodeUrl">
                </el-tooltip>
            </span>
        </el-col>
      </el-form-item>
      <el-form-item label="手机验证码" prop="phoneCode">
        <el-col style="margin-top:0"  :span='6'>
          <el-input placeholder="请输入手机验证码" v-model="ruleForm2.phoneCode" clearable></el-input>
        </el-col>
        <el-col :span='5' class="get_btn">
          <el-button @click="getPhoneCode()" :disabled="isDisabled">{{buttonName}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs";
export default {
  inject:['reload'],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "" || value.length != 6 || !/^[0-9]{6}$/.test(value)) {
        callback(new Error("请输入6位数字密码"));
      } else {
        if (
          this.ruleForm2.checkPass !== "" &&
          this.ruleForm2.checkPass.length >= 8
        ) {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
        return false;
      }else{
          callback();
      }
    };
    return {
      phoneState:true,
      buttonName: "发送短信",
      isDisabled: false,
      time: 60,
      http: this.$store.state.dialog.http,
      imgCodeUrl: "",
      phone: this.$store.state.dialog.phone,
      ruleForm2: {
        pass: "",
        checkPass: "",
        imageCode: "",
        phoneCode: ""
      },
      rules2: {
        pass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        imageCode: [
          {
            validator: validatePass3,
            trigger: "blur"
          }
        ],
        phoneCode: [
          {
            validator: validatePass4,
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.changeCode();
  },
  methods: {
    sendMsg() {
      let me = this;
      me.isDisabled = true;
      let interval = window.setInterval(function() {
        me.buttonName = me.time + "秒后重新发送";
        --me.time;
        if (me.time < 0) {
          me.buttonName = "重新发送";
          me.time = 60;
          me.isDisabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$message("请按照提示修改字段");
          return false;
        } else {
          this.editPassWord();
          this.$message("修改中");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCode() {
      this.imgCodeUrl = this.http + "/code.do?t=" + new Date().getTime();
    },
    getPhoneCode() {
      if(!this.phoneState){
        return;
      }
      this.phoneState = false;
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcCustomer/sendCode",
          qs.stringify({
            loginPhone: this.phone,
            pictureCode:this.ruleForm2.imageCode
          })
        )
        .then(res => {
          if(res.data.code == 200){
            this.phoneState = true;
            this.sendMsg();
          }
        });
    },
    editPassWord() {
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcCustomer/editPassword",
          qs.stringify({
            loginPhone: this.phone,
            code: this.ruleForm2.phoneCode,
            pictureCode:this.ruleForm2.imageCode,
            capitalCipher:this.ruleForm2.pass
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "设置成功!"
            });
            this.reload();
          } else {
            this.$message({
              type: "info",
              message: "设置失败!"
            });
          }
        });
    }
  }
};
</script>

<style type="text/less">
#codeimg {
  width: 100px;
  height: 40px;
  border-radius: 5px;
  float: right;
}
.get_btn {
  text-align: right;
}
</style>
