<template>
  <div class="box">
    <el-breadcrumb style='padding:24px' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">我的账号</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="140px" style="background-color: #F6F6F6;padding-bottom: 10px;">
      <span class="title">个人信息</span>
      <el-form-item label="会员名称：" prop="name">
        <el-col :span='11'>
          <span>{{name}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="会员编号：" prop="number">
        <el-col :span='11'>
          <span>{{number}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证号：" prop="IDCard">
        <el-col :span='11'>
          <span>{{IDCard}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="会员类型：" prop="type">
        <el-col :span='11'>
          <span>{{type}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-col :span='6'>
          <el-input v-model="ruleForm2.nickname" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio-group v-model="sex">
          <el-radio label="1" name="sex">男</el-radio>
          <el-radio label="2" name="sex">女</el-radio>
          <el-radio label="0" name="sex">保密</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="生日：" prop="birth">
        <el-col :span='6'>
          <el-input v-model="birth" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-col :span='3'>
          <span>{{phone}}</span>
        </el-col>
        <span style="color: #409EFF;">修改</span>
      </el-form-item>
      <el-form-item label="常用邮箱：" prop="email">
        <el-col :span='6'>
          <el-input v-model="email" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所属经销商：" prop="dealer">
        <el-col :span='11'>
          <span>{{dealer}}</span>
        </el-col>
      </el-form-item>
      <el-form-item label="门店地址：" prop="storeAddress">
        <el-col :span='11'>
          <span>{{storeAddress}}</span>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">保存信息</el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
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
        name: "某某",
        number: "738818146221",
        IDCard: "1404**********6773",
        type: "个人用户",
        nickname: '',
        sex: '0',
        birth: '',
        phone: '130****9890',
        email: '',
        dealer: '江苏南京小行路小型店',
        storeAddress: '江苏省 南京市 雨花台区 小行路58号和润精品茶城',
        http: this.$store.state.dialog.http,
        imgCodeUrl: '',
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
