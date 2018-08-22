<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="是否提供发票" prop="permission">
            <el-radio-group v-model="ruleForm.permission">
            <el-radio label="2">不开发票</el-radio>
            <el-radio label="1">可开发票</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="" prop="type">
            <el-radio-group v-model="ruleForm.type" :disabled="ruleForm.permission=='2'">
            <el-radio label="1">普通发票</el-radio>
            <el-radio label="2">增值税专用发票</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="发票内容" prop="content">
            <el-radio-group v-model="ruleForm.content" :disabled="ruleForm.permission=='2'">
            <el-radio label="明细"></el-radio>
            <el-radio label="茶叶"></el-radio>
            <el-radio label="食品"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="寄送费用" prop="including">
            <el-radio-group v-model="ruleForm.including"  :disabled="ruleForm.permission=='2'">
            <el-radio label="1">包邮</el-radio>
            <el-radio label="2">不包邮</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="" prop="method">
            <el-radio-group v-model="ruleForm.method" :disabled="ruleForm.permission=='2'||ruleForm.including=='1'">
            <el-radio label="1">按运费模板计费</el-radio>
            <el-radio label="2">到付</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="">
            <el-button type="danger" @click="setInvoice()">保存</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      invoiceId: "",
      http: this.$store.state.dialog.http,
      ruleForm: {
        permission: "2",
        type: "1",
        content: "明细",
        including: "1",
        method: "1"
      }
    };
  },
  methods: {
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/distributor/pcBank/invoiceInformation",
          qs.stringify({
            loginPhone: this.getCookie("LOGIN_PHONE")
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            var temp = JSON.parse(res.data.data);
            this.ruleForm.permission =''+ temp.isDrawInvoice;
            this.ruleForm.type = ''+temp.invoiceType;
            this.ruleForm.content =''+ temp.tickedContent;
            this.ruleForm.including =''+ temp.invoiceFare;
            this.ruleForm.method =''+ temp.fareType;
            this.invoiceId = temp.id;
          }
        });
    },
    setInvoice() {
      this.axios
        .post(
          this.http + "/interface/pc/distributor/pcBank/setInvoice",
          qs.stringify({
            loginPhone: this.getCookie("LOGIN_PHONE"),
            isDrawInvoice: this.ruleForm.permission,
            invoiceType: this.ruleForm.type,
            tickedContent: this.ruleForm.content,
            invoiceFare: this.ruleForm.including,
            fareType: this.ruleForm.method,
            invoiceId: this.invoiceId
          })
        )
        .then(res => {
          this.reload();
        });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return arr[2];
      } else {
        return false;
      }
    }
  },
  mounted(){
    this.getData()
  }
};
</script>