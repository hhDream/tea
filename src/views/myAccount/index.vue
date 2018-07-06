<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的账户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row v-if="no_card1">
      <el-col  :span="24">
        <div class="unbind-card" id="whenNoneCard">
          <img src="../../assets/images/unbind-account.png">
          <div>您尚未绑定账户～</div>
          <el-button type="danger" class="bind_card" @click="no_card2=true;no_card1=false">绑定账户</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="no_card2">
      <el-col class="outFromBox" :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账户名称" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="选择银行卡" prop="cardAll">
              <el-select style="width:217px" v-model="ruleForm.cardAll" @change="change" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="银行账号" prop="bankcardNumber">
            <el-input v-model="ruleForm.bankcardNumber"></el-input>
          </el-form-item>
          <el-form-item label="分支行名称" prop="branchlineName">
            <el-input v-model="ruleForm.branchlineName"></el-input>
          </el-form-item>
          <el-form-item label="分支行省份" prop="branchlineProvince">
            <el-input v-model="ruleForm.branchlineProvince"></el-input>
          </el-form-item>
          <el-form-item label="分支行城市" prop="branchlineCity">
            <el-input v-model="ruleForm.branchlineCity"></el-input>
          </el-form-item>
            <el-input type="hidden" v-model="ruleForm.bankCode"></el-input>
            <el-input type="hidden" v-model="ruleForm.branchcardName"></el-input>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即绑卡</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs'
  export default {
    data(){
      return{
        phone:this.$store.state.dialog.phone,
        http:this.$store.state.dialog.http,
        no_card2:false,
        no_card1:true,
        options: [{
          value: '中信银行,302',
          label: '中信银行'
        }, {
          value: '中国工商银行,102',
          label: '中国工商银行'
        }, {
          value: '中国建设银行,105',
          label: '中国建设银行'
        }, {
          value: '中国邮政储蓄银行,100',
          label: '中国邮政储蓄银行'
        }, {
          value: '中国银行,104',
          label: '中国银行'
        }],
        ruleForm:{
          userName:'',
          bankcardNumber:'',
          branchlineName:'',
          branchlineProvince:'',
          branchlineCity:'',
          bankCode:'',
          branchcardName:'',
          cardAll:''
        },
        rules: {
          userName: [
            { required: true, message: '请输入账户名称', trigger: 'blur' },
          ],
          cardAll:[
            { required: true, message: '请选择银行', trigger: 'blur' }
            ],
          bankcardNumber: [
            { type: 'number',required: true, message: '请输入银行账号', trigger: 'blur' },
            { min: 16, max: 19, message: '长度在 16 到 19 个字符', trigger: 'blur' }
          ],
          branchlineName: [
            { required: true, message: '请输入分支行名称', trigger: 'blur' }
          ],
          branchlineProvince: [
            { required: true, message: '请输入分支行省份', trigger: 'blur' }
          ],
           branchlineCity: [
            { required: true, message: '请输入分支行城市', trigger: 'blur' }
          ],
          tableData:[]
        }
      }
    },
    created() {
      this.getData()
    },
    methods:{
      getData() {
        this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/myBrandCard", qs.stringify({
          phone:this.phone
        })).then(res => {
          if(res.data.code==200){
          this.tableData = JSON.parse(res.data.data).data;
          
          if(JSON.parse(res.data.data).brandCardManage==null)return false;
          this.have_card=true
          }else{
            this.$message({
              type:'error',
              text:'查询信息失败'
            })
          }
          console.log(res.data);
          
        })
      },
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      change(e){
        console.log(e.split(','));
        this.ruleForm.bankCode=e.split(',')[1];
        this.ruleForm.branchcardName=e.split(',')[0];
      }
      }
  }
</script>

<style lang='less'>
 .unbind-card{
        position: relative;
        height: 434px;
        background: #f6f6f6;    
        border-radius: 5px;
        img{
              position: absolute;
              left: 220px;
              top: 140px;
              width: 205px;
              height: 132px;
        }
        div{
              position: absolute;
              left: 460px;
              top: 180px;
              color: #666;
              font-size: 18px;
        }
        .bind_card{
          position: absolute;
          left: 460px;
          top: 220px;
          width: 150px;
        }
  }
  .outFromBox{
        padding: 60px 20px;
        border: 1px solid #ddd;
    input{
          width: 217px;
    }
    .el-select{
      input{
        width: 100%;
      }
    }
  }
</style>
