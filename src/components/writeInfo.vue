<template>
<div style="background:#f6f6f6;padding-bottom:50px">
    <div style="background:white;border-top: solid 3px #b0b0b0;width:1200px;margin:0 auto;padding-top:30px">
        <el-row>
            <el-col :span="18" :offset="3">
                <el-steps :active="active" align-center finish-status="success" process-status="wait">
                <el-step title="实名认证"></el-step>
                <el-step title="绑定门店"></el-step>
                <el-step title="完成"></el-step>
                </el-steps>
            </el-col>
            <el-col :span="22" :offset="1" style="height:1px;background:#e1e1e1;margin-top:20px"></el-col>
            <el-col :span="18" :offset="3" style="margin-top:40px;padding-bottom:50px">
                <el-form  status-icon  ref="ruleForm2" label-width="180px" class="demo-ruleForm" v-if="active==1">
                <el-form-item label="姓名">
                    <el-input auto-complete="off" style="width:550px"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" style="margin-top:40px">
                    <el-input auto-complete="off" style="width:550px"></el-input>
                </el-form-item>
                <el-form-item  style="margin-top:40px">
                    <el-button style="background:#db4b29;color:white" @click="active=2">下一步</el-button>
                </el-form-item>
                </el-form>

                <el-form  status-icon  ref="ruleForm2" label-width="180px" class="demo-ruleForm" v-if="active==2">
                <el-form-item label="经销商推荐码">
                    <el-input auto-complete="off" style="width:550px"></el-input>
                </el-form-item>
                <el-form-item label="省份">
                    <el-select v-model="act" style="width:550px">
                        <el-option laebl="1" value="1"></el-option>
                        <el-option laebl="2" value="2"></el-option>
                        <el-option laebl="3" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市">
                    <el-select v-model="act" style="width:550px">
                        <el-option laebl="1" value="1"></el-option>
                        <el-option laebl="2" value="2"></el-option>
                        <el-option laebl="3" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区县">
                    <el-select v-model="act" style="width:550px">
                        <el-option laebl="1" value="1"></el-option>
                        <el-option laebl="2" value="2"></el-option>
                        <el-option laebl="3" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="经销商地址">
                    <el-select v-model="act" style="width:550px">
                        <el-option laebl="1" value="1"></el-option>
                        <el-option laebl="2" value="2"></el-option>
                        <el-option laebl="3" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="background:#db4b29;color:white"  @click="active=3">下一步</el-button>
                </el-form-item>
                </el-form>
                <el-row v-if="active==3" style="margin-top:10px">
                    <el-col :span='8' style="text-align:right;margin-left:10px">
                        <img src="../assets/images/icon-success.png" alt="">
                    </el-col>
                    <el-col :span='10' style="line-height:30px;font-size:20px;padding-left:20px">恭喜您，您的资料已经完善成功！</el-col>
                    <el-col  :span='24' style="text-align:center;margin:40px 0 30px">
                        <el-button  style="background:#db4b29;color:white" @click="$router.openPage('/teaMallIndex')">回首页逛逛</el-button>                        
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        active:1,
        act:""
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
