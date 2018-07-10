<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的账户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row v-if="no_card1">
      <el-col :span="24">
        <div class="unbind-card" id="whenNoneCard">
          <img src="../../assets/images/unbind-account.png">
          <div>您尚未绑定账户～</div>
          <el-button type="danger" class="bind_card" @click="no_card2=true;no_card1=false">绑定账户</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="no_card2">
      <el-col class="outFromBox" :span="24">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="选择营业执照类型" prop="corp_license_type">
            <el-select style="width:217px" v-model="ruleForm.corp_license_type" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择企业类型" prop="corp_type">
            <el-select style="width:217px" v-model="ruleForm.corp_type"  filterable placeholder="请选择">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm.corp_license_type=='01030101'" label="统一社会信用代码" prop="social_credit_code">
            <el-input v-model="ruleForm.social_credit_code"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.corp_license_type!='01030101'" label="营业执照注册号" prop="business_code">
            <el-input v-model="ruleForm.business_code"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.corp_license_type!='01030101'" label="组织机构代码" prop="institution_code">
            <el-input v-model="ruleForm.institution_code"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.corp_license_type!='01030101'" label="税务登记证号" prop="tax_code">
            <el-input v-model="ruleForm.tax_code"></el-input>
          </el-form-item>
          <el-form-item label="企业的公司全称" prop="corp_name">
            <el-input v-model="ruleForm.corp_name"></el-input>
          </el-form-item>
          <el-form-item label="营业证照起止日期" prop="license_date">
            <el-date-picker style="width:100%" v-model="license_date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="经营地址" prop="corp_business_address">
            <el-input v-model="ruleForm.corp_business_address"></el-input>
          </el-form-item>
          <el-form-item label="注册地址" prop="corp_reg_address">
            <el-input v-model="ruleForm.corp_reg_address"></el-input>
          </el-form-item>
          <el-form-item label="企业的固定电话" prop="corp_fixed_telephone">
            <el-input v-model="ruleForm.corp_fixed_telephone"></el-input>
          </el-form-item>
          <el-form-item label="经营范围" prop="business_scope">
            <el-input v-model="ruleForm.business_scope"></el-input>
          </el-form-item>
          <el-form-item label="法人姓名" prop="legal_name">
            <el-input v-model="ruleForm.legal_name"></el-input>
          </el-form-item>
          <el-form-item label="身份证件类型" prop="legal_cert_type">
            <el-select style="width:217px" v-model="ruleForm.legal_cert_type"  filterable placeholder="请选择">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="legal_cert_id">
            <el-input placeholder="与证件类型对应" v-model="ruleForm.legal_cert_id"></el-input>
          </el-form-item>
          <el-form-item label="证件起止日期" prop="legal_cert_date">
            <el-date-picker style="width:100%" v-model="legal_cert_date" type="daterange" align="right" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="法人手机号码" prop="legal_mobile">
            <el-input v-model="ruleForm.legal_mobile"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人姓名" prop="contact_name">
            <el-input v-model="ruleForm.contact_name"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号码" prop="contact_mobile">
            <el-input v-model="ruleForm.contact_mobile"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱地址" prop="contact_email">
            <el-input v-model="ruleForm.contact_email"></el-input>
          </el-form-item>
          <el-form-item label="企业开户银行账户名" prop="bank_acct_name">
            <el-input placeholder="企业开户银行账户名，需与企业名称保持一致" v-model="ruleForm.bank_acct_name"></el-input>
          </el-form-item>
          <el-form-item label="开户银行代号" prop="bank_id">
            <el-input v-model="ruleForm.bank_id"></el-input>
          </el-form-item>
          <el-form-item label="企业开户银行账号" prop="bank_acct_no">
            <el-input v-model="ruleForm.bank_acct_no"></el-input>
          </el-form-item>
          <el-form-item label="企业开户银行的支行名称" prop="bank_branch">
            <el-input v-model="ruleForm.bank_branch"></el-input>
          </el-form-item>
          <el-form-item label="银行卡开户省份" prop="bank_prov">
            <el-input v-model="ruleForm.bank_prov"></el-input>
          </el-form-item>
          <el-form-item label="银行卡开户地区" prop="bank_area">
            <el-input v-model="ruleForm.bank_area"></el-input>
          </el-form-item>
          <el-form-item style="display:block;text-align:center">
            <el-button type="primary" @click="submitForm('ruleForm')">立即开户</el-button>
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
    data() {
      return {
        phone: this.$store.state.dialog.phone,
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        no_card2: false,
        no_card1: true,
        license_date:'',//营业证照起止日期
        legal_cert_date:'',//证件起止日期
        options: [{
          value: '01030100',
          label: '普通营业执照企业'
        }, {
          value: '01030101',
          label: '三证合一企业'
        }],
        options2: [{
          value: '01030000',
          label: '普通企业'
        }, {
          value: '01030001',
          label: '个体户'
        }],
        options3: [{
          value: '01020100',
          label: '身份证'
        }, {
          value: '01020101',
          label: '护照'
        }, {
          value: '01020102',
          label: '军官证'
        },{
          value: '01020103',
          label: '士兵证'
        },{
          value: '01020104',
          label: '回乡证'
        },  {
          value: '01020105',
          label: '警官证'
        }, {
          value: '01020106',
          label: '台胞证'
        }, {
          value: '01020107',
          label: '其他'
        }, ],
        ruleForm: {
          corp_license_type: '',
          corp_type: '',
          social_credit_code: '',
          business_code: '',
          institution_code: '',
          tax_code: '',
          corp_name: '',
          license_start_date: '',
          license_end_date:'',
          corp_business_address:'',
          corp_reg_address:'',
          corp_fixed_telephone:'',
          business_scope:'',
          controlling_shareholder:'',
          legal_name:'',
          legal_cert_type:'',
          legal_cert_id:'',
          legal_cert_start_date:'',
          legal_cert_end_date:'',
          legal_mobile:'',
          contact_mobile:'',
          contact_email:'',
          bank_acct_name:'',
          bank_id:'',
          bank_acct_no:'',
          bank_branch:'',
          bank_prov:'',
          bank_area:'',
        },
        rules: {
          userName: [{
            required: true,
            message: '请输入账户名称',
            trigger: 'blur'
          }, ],
           corp_license_type: [{
            required: true,
            message: '请选择营业执照类型',
            trigger: 'blur'
          }],
          bankcardNumber: [{
              type: 'number',
              required: true,
              message: '请输入银行账号',
              trigger: 'blur'
            },
            {
              min: 16,
              max: 19,
              message: '长度在 16 到 19 个字符',
              trigger: 'blur'
            }
          ],
          branchlineName: [{
            required: true,
            message: '请输入分支行名称',
            trigger: 'blur'
          }],
          branchlineProvince: [{
            required: true,
            message: '请输入分支行省份',
            trigger: 'blur'
          }],
          branchlineCity: [{
            required: true,
            message: '请输入分支行城市',
            trigger: 'blur'
          }],
          tableData: []
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        // this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/myBrandCard", qs.stringify({
        //   phone: this.phone
        // })).then(res => {
        //   if (res.data.code == 200) {
        //     this.tableData = JSON.parse(res.data.data).data;
        //     if (JSON.parse(res.data.data).brandCardManage == null) return false;
        //     this.have_card = true
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       text: '查询信息失败'
        //     })
        //   }
        //   console.log(res.data);
        // })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.binding()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      change(e) {
        console.log(e.split(','));
        this.ruleForm.bankCode = e.split(',')[1];
        this.ruleForm.branchcardName = e.split(',')[0];
      },
      binding(){
 this.axios.post(this.http+"/interface/pc/personal/pcEnterprise",qs.stringify({
          enterpriseCode:this.enterpriseCode,
          corp_license_type: this.ruleForm.corp_license_type,
          corp_type: this.ruleForm.corp_type,
          social_credit_code: this.ruleForm.social_credit_code,
          business_code: this.ruleForm.business_code,
          institution_code: this.ruleForm.institution_code,
          tax_code: this.ruleForm.tax_code,
          corp_name: this.ruleForm.corp_name,
          license_start_date: this.license_date[0],
          license_end_date:this.license_date[1],
          corp_business_address:this.ruleForm.corp_business_address,
          corp_reg_address:this.ruleForm.corp_reg_address,
          corp_fixed_telephone:this.ruleForm.corp_fixed_telephone,
          business_scope:this.ruleForm.business_scope,
          controlling_shareholder:this.ruleForm.controlling_shareholder,
          legal_name:this.ruleForm.legal_name,
          legal_cert_type:this.ruleForm.legal_cert_type,
          legal_cert_id:this.ruleForm.legal_cert_id,
          legal_cert_start_date:this.legal_cert_date[0],
          legal_cert_end_date:this.legal_cert_date[1],
          legal_mobile:this.ruleForm.legal_mobile,
          contact_mobile:this.ruleForm.contact_mobile,
          contact_email:this.ruleForm.contact_email,
          bank_acct_name:this.ruleForm.bank_acct_name,
          bank_id:this.ruleForm.bank_id,
          bank_acct_no:this.ruleForm.bank_acct_no,
          bank_branch:this.ruleForm.bank_branch,
          bank_prov:this.ruleForm.bank_prov,
          bank_area:this.ruleForm.bank_area,
        })).then(res=>{
          console.log(JSON.parse(res.data.data));
          var r=JSON.parse(res.data.data)
          this.axios.post('/apis',qs.stringify({
            cmd_id:r.cmdId,
            mer_cust_id :r.merCustId,
            check_value:r.sign,
            version:r.version
          })).then(res=>{
            console.log('内部res',res);
          })
        })
      }
    }
  }
</script>

<style lang='less'>
  .unbind-card {
    position: relative;
    height: 434px;
    background: #f6f6f6;
    border-radius: 5px;
    img {
      position: absolute;
      left: 220px;
      top: 140px;
      width: 205px;
      height: 132px;
    }
    div {
      position: absolute;
      left: 460px;
      top: 180px;
      color: #666;
      font-size: 18px;
    }
    .bind_card {
      position: absolute;
      left: 460px;
      top: 220px;
      width: 150px;
    }
  }
  .outFromBox {
    padding: 60px 20px;
    border: 1px solid #ddd;
    input {
      width: 217px;
    }
    .el-select {
      input {
        width: 100%;
      }
    }
  }
</style>
