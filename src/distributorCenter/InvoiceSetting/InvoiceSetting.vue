<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="是否提供发票" prop="permission">
            <el-radio-group v-model="ruleForm.permission">
            <el-radio label="不开发票"></el-radio>
            <el-radio label="可开发票"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="" prop="type">
            <el-radio-group v-model="ruleForm.type" :disabled="ruleForm.permission=='不开发票'">
            <el-radio label="普通发票"></el-radio>
            <el-radio label="增值税专用发票"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="发票内容" prop="content">
            <el-radio-group v-model="ruleForm.content" :disabled="ruleForm.permission=='不开发票'">
            <el-radio label="明细"></el-radio>
            <el-radio label="茶叶"></el-radio>
            <el-radio label="食品"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="寄送费用" prop="including">
            <el-radio-group v-model="ruleForm.including"  :disabled="ruleForm.permission=='不开发票'">
            <el-radio label="包邮"></el-radio>
            <el-radio label="不包邮"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="" prop="method">
            <el-radio-group v-model="ruleForm.method" :disabled="ruleForm.permission=='不开发票'||ruleForm.including=='包邮'">
            <el-radio label="按运费模板计费"></el-radio>
            <el-radio label="到付"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="">
            <el-button type="danger">保存</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
      return {
        ruleForm: {
          permission: '不开发票',
          type: '普通发票',
          content: '明细',
          including: '包邮',
          method: '按运费模板计费'
        }
      };
    },
    methods: {
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
      }
    }
  }
</script>