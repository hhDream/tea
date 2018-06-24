<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>客户管理</el-breadcrumb-item>
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
          <span class="demonstration">注册手机号</span>
          <el-input v-model="loginPhone" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="distributorCode" label="经销商编号" >
      </el-table-column>
      <el-table-column prop="distributorName" label="经销商名称">
      </el-table-column>
      <el-table-column prop="legalPersonName" label="法人名称">
      </el-table-column>
      <el-table-column prop="loginPhone" label="注册手机号">
      </el-table-column>
      <el-table-column prop="count" label="注册客户数量">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    methods: {
      getData() {
        this.axios.post(this.http + "/interface/pc/personal/pcDistributor/myDistributor", qs.stringify({
          currentPage: this.currentPage,
          enterpriseCode: this.enterpriseCode,
          showCount: this.showCount,
          array: this.array,
          distributorName:this.distributorName,
          legalPersonName: this.legalPersonName,
          loginPhone:this.loginPhone,
          distributorCode:this.distributorCode
          
        })).then(res => {
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
      }
    },
    created() {
      this.getData()
    },
    data() {
      return {
        tableData: [{}],
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        currentPage: 1,
        showCount: 10,
        distributorName:"",
        legalPersonName:"",
        distributorCode:"",
        array:0,
        total:0,
        loginPhone:''

      }
    },
  }
</script>
