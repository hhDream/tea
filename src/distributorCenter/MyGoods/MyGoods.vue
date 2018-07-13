<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/distributorCenter/banlance' }">企业中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/distributorCenter/myGoods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-top: 20px;" :gutter="20">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style='padding-left:10px'>
      <el-form-item label="商品代码：">
          <el-input v-model="goodsCode" clearable placeholder="商品代码"></el-input>
      </el-form-item>
      <el-form-item label="商品名称：">
          <el-input v-model="goodsName" clearable placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button icon="el-icon-search" circle></el-button>
      </el-form-item>
      <el-form-item>
          <el-button type="default">重置</el-button>
      </el-form-item>
      </el-form>
    </el-row>
    <el-tabs v-model="activeName">
        <el-tab-pane label="全部商品" name="1"></el-tab-pane>
        <el-tab-pane label="出售中" name="2"></el-tab-pane>
        <el-tab-pane label="已下架" name="3"></el-tab-pane>
        <el-tab-pane label="已售完" name="4"></el-tab-pane>
    </el-tabs>
    <el-table  :data="tableData" row-class-name="tdHeight" border style="width: 100%;margin-top:-15px">
      <el-table-column  align="center" prop="goodsCode" label="商品代码" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.shelRetentionCount?scope.row.shelRetentionCount:'0'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goodsName" label="商品名称" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.shelRetentionCount?scope.row.shelRetentionCount:'0'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="shelRetentionCount" sortable label="上架价格" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.shelRetentionCount?scope.row.shelRetentionCount:'0'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="releaseCountTotal" label="规格">
        <template slot-scope="scope">
          <span>{{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="shelRetentionCount" label="规格重量">
        <template slot-scope="scope">
          <span>{{ scope.row.shelRetentionCount?scope.row.shelRetentionCount:'0'}}克</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="takeTeaCount" label="上架数量">
        <template slot-scope="scope">
          <span>{{ scope.row.takeTeaCount?scope.row.takeTeaCount:'0'}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="takeTeaCount" label="已售">
        <template slot-scope="scope">
          <span>{{ scope.row.takeTeaCount?scope.row.takeTeaCount:'0'}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="takeTeaCount" label="当前状态">
        <template slot-scope="scope">
          <span>已上架</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="takeTeaCount" label="操作">
        <template slot-scope="scope">
          <a>下架</a>
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
        tableData: [],
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        currentPage: 1,
        showCount: 10,
        goodsName: "",
        goodsCode: "",
        total:0,
        activeName:'1',
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    watch:{
      activeName(){

      }
    }
  }
</script>
<style lang="less" scoped>
    
</style>
