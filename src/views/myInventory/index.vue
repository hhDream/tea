<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的库存</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品代码</span>
          <el-input v-model="goodsCode" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品名称</span>
          <el-input v-model="goodsName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button  @click="goodsName=商品代码=''">重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table  :data="tableData" row-class-name="tdHeight" border style="width: 100%">
      <el-table-column  align="center" prop="goodsCode" label="商品代码" width="120">
      </el-table-column>
      <el-table-column align="center" prop="goodsName" sortable label="商品名称" width="120">
      </el-table-column>
      <el-table-column align="center" prop="shelRetentionCount" sortable label="持有数量" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.shelRetentionCount?scope.row.shelRetentionCount:'0'}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="releaseCountTotal" sortable label="抢购数量">
        <template slot-scope="scope">
          <span>{{ scope.row.releaseCountTotal?scope.row.releaseCountTotal:'0'}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="" sortable label="冻结数量">
        <template slot-scope="scope">
          <span>{{ scope.row.CountTotal?scope.row.CountTotal:'0'}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="takeTeaCount" label="已提货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.takeTeaCount?scope.row.takeTeaCount:'0'}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="">
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
        this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/myStore", qs.stringify({
          releaseEnterpriseId: this.enterpriseCode,
          currentPage: this.currentPage,
          showCount: this.showCount,
          goodsName: this.goodsName,
          goodsCode: this.goodsCode,
        })).then(res => {
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          console.log( JSON.parse(res.data.data));
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
        goodsName: "",
        goodsCode: "",
        total:0
      }
    },
  }
</script>
