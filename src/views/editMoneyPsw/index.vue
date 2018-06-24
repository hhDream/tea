<template>
  <div class="box">
    <el-breadcrumb style='padding:24px' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">个人中心</el-breadcrumb-item>
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
            <el-tooltip class="item" effect="dark" content="点图片重新获取验证码" placement="right">
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
          <el-button @click="getPhoneCode()">获取验证码</el-button>
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
          function (ok) {
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
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            console.log(valid)
            this.$message('请将字段填写完整');
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
        this.axios.post(this.http + '/interface/pc/personal/pcEnterprise/sendCode', qs.stringify({
          phone: this.phone
        })).then(res => {
          console.log(res);
        })
      },
      editPassWord() {
        this.axios.post(this.http + '/interface/pc/personal/pcEnterprise/editPassword', qs.stringify({
          loginPhone: this.phone,
          transactionPassword: this.ruleForm2.pass
        })).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '即将跳回登陆页!'
            });
          }

          console.log(res);
        })
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
      }
    }
  }
</script>

<style type="text/less">
  #codeimg { width: 100px; height: 40px; border-radius: 5px; float: right; } .get_btn { text-align: right; }
</style>
