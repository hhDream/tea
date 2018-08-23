<template>
  <div class="login_style"  style="min-width:1190px;margin:0px auto;float: none;" v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <div class="login_box">
        <h4>用户登陆</h4>
        <el-form-item label="手机号" prop="phone">
          <el-col :span='24'>
            <el-input type="text" placeholder="请输入手机号"  v-model="ruleForm.phone" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="imageCode">
          <el-col style="margin-top:0"  :span='16'>
            <el-input placeholder="请输入验证码" v-model="ruleForm.imageCode" auto-complete="off" clearable></el-input>
          </el-col>
          <el-col :span='8'>
            <span class="img-validate-code">
                  <el-tooltip class="item" effect="dark"  content="点图片重新获取验证码" placement="right">
                    <img id="codeimg" @click="changeCode()" :src="'data:image/jpg;base64,'+imgCodeUrl">
                  </el-tooltip>
              </span>
          </el-col>
        </el-form-item>
        <el-form-item label="手机验证码" prop="phoneCode">
          <el-col style="margin-top:0"  :span='16'>
            <el-input placeholder="请输入手机验证码" v-model="ruleForm.phoneCode" clearable></el-input>
          </el-col>
          <el-col :span='7' :offset="1" class="get_btn">
            <el-button @click="getPhoneCode()" :disabled="isDisabled" style="padding:12px 0" id="codeimg">{{buttonName}}</el-button>
          </el-col>
        </el-form-item>
        <div>
          <el-button @click="submitForm('ruleForm')" :span="24">登录</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      if (reg.test(value) === false) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    var validatePicture = (rule, value, callback) => {
      if (value.length != 4) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      buttonName: "获取验证码",
      isDisabled: false,
      time: 60,
      ok: "",
      imgCodeUrl: "",
      http: this.$store.state.dialog.http,
      fullscreenLoading: false,
      ruleForm: {
        phone: "",
        phoneCode: "",
        imageCode: "",
        picture: ""
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请填写手机号",
            trigger: "blur"
          },
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        imageCode: [
          {
            required: true,
            message: "请填写图形验证码",
            trigger: "blur"
          },
          {
            max: 4,
            message: "长度在4个字符",
            validator:validatePicture,
            trigger: "blur"
          }
        ],
        phoneCode: [
          {
            required: true,
            message: "请填写验证码",
            trigger: "blur"
          },
          {
            max: 4,
            message: "长度在4个字符",
            trigger: "blur"
          }
        ]
      },
      labelPosition: "left"
    };
  },
  methods: {
    changeCode() {
      this.axios
        .post(
          this.http + "/interface/pc/login/pictureCode"
        )
        .then(res => {
          this.imgCodeUrl = JSON.parse(res.data.data).code; 
        });
    },
    getPhoneCode() {
      if(!this.ruleForm.phone || this.ruleForm.phone.length != 11){
        this.$message("请填写手机号码");
        return;
      }
      if(!this.ruleForm.imageCode || this.ruleForm.imageCode.length != 4){
        this.$message("请填写图形验证码");
        return;
      }
      let me = this;
      me.isDisabled = true;
      this.axios
        .post(
          this.http + "/interface/pc/login/sendCode",
          qs.stringify({
            phone: this.ruleForm.phone,
            pictureCode:this.ruleForm.imageCode
          })
        )
        .then(res => {
          if(res.data.code == 200){
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
          }else{
            me.isDisabled = false;
            this.$message(res.data.message);
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      this.fullscreenLoading = true;
      this.axios
        .post(
          this.http + "/interface/pc/login/enterpriseLogin",
          qs.stringify({
            phone: this.ruleForm.phone,
            code: this.ruleForm.phoneCode,
            pictureCode:this.ruleForm.imageCode
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            // 经销商编号
            this.setCookie(
              "distributorCode",
              JSON.parse(res.data.data).roleCode,
              1
            );
            // 茶企编号
            this.setCookie(
              "ENTER_ID",
              JSON.parse(res.data.data).roleCode,
              1
            );
            // 客户账号
            this.setCookie(
              "LOGIN_ACCOUNT",
              JSON.parse(res.data.data).loginAccount,
              1
            );
            // 用户电话
            this.setCookie(
              "LOGIN_PHONE",
              JSON.parse(res.data.data).loginPhone,
              1
            );
            // 用户身份
            this.setCookie(
              "STATUS",
              JSON.parse(res.data.data).role,
              1
            );
            // role  1客户 2经销商 3茶企
            if (JSON.parse(res.data.data).role==1) {
              this.setCookie('changeUrl','/myUserCenter/userHome',1);
              this.$router.openPage('/myUserCenter/userHome',1);
              this.setCookie('messageUrl','/myUserCenter/MyNews_user');
              // this.$router.openPage('/');
            }else if (JSON.parse(res.data.data).role==2) {
              this.setCookie('messageUrl','/distributorCenter/MyNews',1);
              this.setCookie('changeUrl','/distributorCenter/banlance',1);
              this.$router.openPage('/distributorCenter/banlance');
              // this.$router.openPage('/');
            }else if (JSON.parse(res.data.data).role==3) {
              this.setCookie('changeUrl','/myCenter/home',1);
              this.setCookie('messageUrl','/myCenter/message',1);
              this.$router.openPage('/myCenter/home');
            }
            location.reload();
          } else {
            this.fullscreenLoading = false;
            this.$message("登陆失败:" + res.data.message);
          }
        })
    }, 
    //设置cookie   name为cookie的名字，value是值，expiredays为过期时间（天数）
    setCookie(name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        name +
        "=" +
        escape(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    }
  },
  mounted() {
    this.changeCode()
  }
};
</script>

<style scoped lang="less">
.login_style {
  padding: 15% 0;
  background-image: url(../assets/images/login-bg.jpg);
  position: relative;
  width: 100%;
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: cover;
  transition: opacity 200ms ease-in-out;
  h4 {
    font-weight: 800;
    margin-bottom: 30px;
  }
}
.login_box {
  margin: 0 auto;
  padding: 3% 5%;
  border-radius: 10px;
  width: 600px;
  background-color: rgba(255, 255, 255, 0.8);
  #codeimg {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    float: right;
  }
  .get_btn {
    text-align: right;
  }
  div {
    span {
      font-weight: 800;
    }
    .el-button {
      width: 100%;
      height: 40px;
      background-color: #db4b29;
      color: #fff;
      border: 0;
    }
  }
}
</style>
