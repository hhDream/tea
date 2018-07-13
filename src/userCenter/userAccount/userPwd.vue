<template>
  <div class="box">
    <el-breadcrumb style='padding:24px' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">我的账号</el-breadcrumb-item>
      <el-breadcrumb-item>密码管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
      <el-form-item label="已验证手机" prop="phone">
        <el-col :span='11'>
          <el-input type="text" :disabled="true" v-model="phone" auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-col :span='11'>
          <el-tooltip class="item" effect="dark" content="请务必设置8位以上密码" placement="right">
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
        <el-col :span='6'>
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
        <el-col :span='6'>
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
  import qs from 'qs'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '' || value.length < 8) {
          callback(new Error('请输入8位以上密码'));
        } else {
          if (this.ruleForm2.checkPass !== '' && this.ruleForm2.checkPass.length >= 8) {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
        } else {
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空'));
          return false;
        };
        this.validateCode(
          function(ok) {
            if (ok == false) {
              callback(new Error('图形验证码或手机验证码错误'));
              return false;
            } else {
              callback();
            };
          }
        )
      };
      return {
        buttonName: "发送短信",
        isDisabled: false,
        time: 60,
        ok: '',
        http: this.$store.state.dialog.http,
        imgCodeUrl: '',
        phone: this.$store.state.dialog.phone,
        ruleForm2: {
          pass: '',
          checkPass: '',
          imageCode: '',
          phoneCode: "",
        },
        rules2: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          imageCode: [{
            validator: validatePass3,
            trigger: 'blur'
          }],
          phoneCode: [{
            validator: validatePass4,
            trigger: 'blur'
          }],
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
          me.buttonName = me.time + '秒后重新发送';
          --me.time;
          if (me.time < 0) {
            me.buttonName = "重新发送";
            me.time = 10;
            me.isDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            console.log(valid)
            this.$message('请按照提示修改字段');
            return false;
          } else {
            this.editPassWord()
            this.$message('修改中');
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeCode() {
        this.imgCodeUrl = this.http + '/code.do?t=' + new Date().getTime()
      },
      getPhoneCode() {
        this.sendMsg()
        this.axios.post(this.http + '/interface/pc/personal/pcEnterprise/sendCode', qs.stringify({
          phone: this.phone
        })).then(res => {
          console.log(res);
        })
      },
      editPassWord() {
        this.axios.post(this.http + '/interface/pc/personal/pcEnterprise/editPassword', qs.stringify({
          loginPhone: this.phone,
          loginPassword: this.ruleForm2.pass
        })).then(res => {
          if (res.data.code == 200) {
            this.clearCookie()
            this.$message({
              type: 'success',
              message: '即将跳回登陆页!'
            });
          location.reload()
          }else{
          this.$message({
              type: 'info',
              message: '修改失败!'
            });
          }
          console.log(res);
        })
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie('JSESSIONID', "", -1);
        this.setCookie('ENTER_ID', "", -1);
        this.setCookie('LOGIN_PHONE', "", -1);
      },
      setCookie(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
      },
      validateCode(callback) {
        this.axios.post(this.http + '/interface/pc/personal/pcEnterprise/validateCode', qs.stringify({
          phone: this.phone,
          pictureCode: this.ruleForm2.imageCode,
          code: this.ruleForm2.phoneCode
        })).then(res => {
          if (res.data.code == 200) {
            console.log(res.data);
            var ok = true;
            callback(ok)
            // this.editPassWord()
          } else {
            var ok = false;
            callback(ok)
          }
        })
      },
      tips() {
        this.$confirm('此操作将修改您的密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.validateCode()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      }
    }
  }
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
