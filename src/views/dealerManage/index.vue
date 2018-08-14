<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>经销商管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">经销商编号</span>
          <el-input v-model="distributorCode" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">经销商名称</span>
          <el-input v-model="distributorName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">法人名称</span>
          <el-input v-model="legalPersonName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">公司地址</span>
          <el-input v-model="postalAddress" clearable></el-input>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-button icon="el-icon-search" circle @click="search"></el-button>
          <el-button  @click="distributorCode=distributorName=legalPersonName=postalAddress=''">重置</el-button>
          <el-button type="success" @click="distributor_getExcel">经销商模板下载</el-button>
          <el-button type="success" @click="distributorRelation_getExcel">经销商关系模板下载</el-button>
          <el-button type="success" @click="dialogVisible=true">经销商导入</el-button>
          <el-button type="success" @click="dialogVisible2=true">经销商关系导入</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="distributorCode" label="经销商编号" width="100">
      </el-table-column>
      <el-table-column prop="distributorName" label="经销商名称" width="120">
      </el-table-column>
      <el-table-column prop="legalPersonName" label="法人" width="100">
      </el-table-column>
      <el-table-column prop="legalPersonIdentityCard" label="法人身份证" width="170">
      </el-table-column>
      <el-table-column prop="" label="是否对公账户"  width="130">
        <template slot-scope="scope">
          <span>是</span>
        </template>
      </el-table-column>
      <el-table-column prop="phoneNumber" label="联系电话"  width="130">
      </el-table-column>
      <el-table-column prop="postalAddress" label="公司地址" width="200">
      </el-table-column>
      <el-table-column prop="province" label="省份">
      </el-table-column>
      <el-table-column prop="city" label="城市">
      </el-table-column>
      <el-table-column prop="region" label="地区">
      </el-table-column>
      <el-table-column prop="superiorDealerCode" label="上级经销商编号" width="100">
      </el-table-column>
      <el-table-column prop="superiorDealerName" label="上级经销商" width="100">
      </el-table-column>
      <el-table-column prop="unifiedSocialCreditCode" label="统一社会信用代码" width="200">
      </el-table-column>
      <el-table-column prop="businessLicense" label="营业执照" width="200">
      </el-table-column>
      <el-table-column prop="taxRegistrationCertificate" label="税务登记证" width="200">
      </el-table-column>
      <el-table-column prop="organizationCode" label="组织机构码" width="200">
      </el-table-column>
      <el-table-column prop="status" :formatter="statusFmt" label="审核状态">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog 
    title="经销商导入"
    :visible.sync="dialogVisible"
    width="30%">
          <el-upload action="https://ent.teaexs.com/platform/interface/pc/personal/pcDistributor/importDistributor" 
          :on-preview="handlePreview" 
          :on-remove="handleRemove" 
          :before-remove="beforeRemove" 
          :limit="1" 
          :name="filename"
          :on-exceed="handleExceed" 
          :on-error="errorMsg"
          :file-list="fileList"
          :data="moreData"
          :before-upload="beforeAvatarUpload">
            <el-button size="small" type="primary">经销商导入</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
          </el-upload>
    </el-dialog>
    <el-dialog 
    title="经销商关系导入"
    :visible.sync="dialogVisible2"
    width="30%">
          <el-upload action="https://ent.teaexs.com/platform/interface/pc/personal/pcDistributor/importDistributorRelation" 
          :on-preview="handlePreview" 
          :on-remove="handleRemove" 
          :before-remove="beforeRemove" 
          :limit="1" 
          :name="filenameRelation"
          :on-exceed="handleExceed" 
          :on-error="errorMsg"
          :file-list="fileList"
          :before-upload="beforeAvatarUpload">
            <el-button size="small" type="primary">经销商关系导入</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
          </el-upload>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    methods: {
      getData() {
        this.axios.post(this.http + "/interface/pc/personal/pcDistributor/distributoerList", qs.stringify({
          currentPage: this.currentPage,
          enterpriseCode: this.enterpriseCode,
          showCount: this.showCount,
          legalPersonName: this.legalPersonName,
          distributorName: this.distributorName,
          postalAddress: this.postalAddress,
          distributorName: this.distributorName,
          distributorCode:this.distributorCode
        })).then(res => {
          console.log(JSON.parse(res.data.data));
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        })
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange(data) {
        console.log(data);
        this.showCount = data;
        this.getData()
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        this.getData()
      },
      search() {
        this.getData()
      },
      statusFmt(row, column) {
        return row.status == 1 ? "已激活" : "未激活"
      },
      distributor_getExcel() {
        this.axios.post(this.http + '/interface/pc/personal/pcDistributor/templateDown', qs.stringify({
          templateName: 'distributor',
        })).then(res => {
          // console.log(JSON.parse(res.data.data));
          location.href = JSON.parse(res.data.data)
        })
      },
      distributorRelation_getExcel() {
        this.axios.post(this.http + '/interface/pc/personal/pcDistributor/templateDown', qs.stringify({
          templateName: 'distributorRelation'
        })).then(res => {
          location.href = JSON.parse(res.data.data)
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeAvatarUpload(file, fileList){
        // console.log(file.type);
        const isXLS = file.type === 'application/vnd.ms-excel';
        if (!isXLS) {
          this.$message.error('上传文件只能是 xls 格式!');
        }
      },
      errorMsg(error, file, fileList){
        // this.$message(error)
        console.log(error);
      }
    },
    created() {
      this.getData()
    },
    data() {
      return {
        tableData: [],
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        currentPage: 1,
        showCount: 10,
        legalPersonName: "",
        distributorName: "",
        distributorCode: "",
        postalAddress: "",
        total: 1,
        currentPage: 1,
        fileList: [],
        dialogVisible:false,
        dialogVisible2:false,
        filename:'filename',
        filenameRelation:'filenameRelation',
        moreData:{
          enterpriseCode:this.$store.state.dialog.enterpriseCode
        }
      }
    },
  }
</script>
<style>

</style>

