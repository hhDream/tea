<template>
  <div class="login_style" v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <div class="login_box">
        <h4>用户登陆</h4>
        <div>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="登陆密码" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-button @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs'
  export default {
    data() {
      return {
        http: this.$store.state.dialog.http,
        fullscreenLoading: false,
        ruleForm: {
          phone: '',
          pwd: '',
        },
        rules: {
          phone: [{
              required: true,
              message: '请填写手机号',
              trigger: 'blur'
            },
            {
              max: 11,
              message: '长度在11个字符',
              trigger: 'blur'
            }
          ],
          pwd: [{
              required: true,
              message: '请填写密码',
              trigger: 'blur'
            },
            {
              main: 8,
              message: '最短8个字符',
              trigger: 'blur'
            }
          ]
        },
        labelPosition: 'left'
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      login() {
        this.fullscreenLoading=true;
        this.axios.post(this.http + '/interface/pcLogin/enterpriseLogin', qs.stringify({
          phone: this.ruleForm.phone,
          pwd: this.ruleForm.pwd
        })).then(res => {
          if (res.data.code == 200) {
            this.setCookie('JSESSIONID', JSON.parse(res.data.data).sessionId, 1);
            this.setCookie('ENTER_ID', JSON.parse(res.data.data).enterpriseId, 1);
            this.setCookie('LOGIN_PHONE', JSON.parse(res.data.data).loginPhone, 1);
            // this.$store.commit('changePhone',this.ruleForm.phone);
            // this.$store.commit('changeEnterpriseCode', JSON.parse(res.data.data).enterpriseId);
            console.log(this.$store.state.dialog)
            this.$router.openPage('/myCenter/home')
            location.reload()
          }else{
          this.fullscreenLoading=false;
          this.$message('登陆失败:'+res.data.message)
          }
        }).catch(error => {
          this.fullscreenLoading=false;

          this.$message('登陆失败')
        })
      }, //设置cookie   name为cookie的名字，value是值，expiredays为过期时间（天数）
      setCookie(name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
      },
    },
    created() {
      console.log(this);
    }
  }
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
    padding: 3% 8%;
    border-radius: 10px;
    width: 600px;
    background-color: #ffffffd9;
    div {
       :after,
       :before {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: none;
      }
      span {
        font-weight: 800;
      }
      .el-button {
        width: 100%;
        background-color: #DB4B29;
        color: #fff;
        border: 0;
        margin-top: 10px;
      }
    }
  }
</style>
