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
          <el-button icon="el-icon-search" @click="getData" circle></el-button>
      </el-form-item>
      <el-form-item>
          <el-button type="default"  @click='goodsCode=goodsName=""'>重置</el-button>
      </el-form-item>
      </el-form>
    </el-row>
    <el-tabs v-model="state" @tab-click='changeTab'>
        <el-tab-pane label="全部商品" name="0"></el-tab-pane>
        <el-tab-pane label="已上架" name="1"></el-tab-pane>
        <el-tab-pane label="已下架" name="2"></el-tab-pane>
        <!-- <el-tab-pane label="已售完" name="4"></el-tab-pane> -->
    </el-tabs>
    <el-table  @sort-change='mysort' :data="tableData" row-class-name="tdHeight" border style="width: 100%;margin-top:-15px">
      <el-table-column  align="center" prop="goodsCode" label="商品代码" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsCode?scope.row.goodsCode:'无'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goodsName" label="商品名称" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName?scope.row.goodsName:'无'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goodsPrice" sortable='custom' label="上架价格" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsPrice?Number(+scope.row.goodsPrice) :'无'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="param3" label="规格">
        <template slot-scope="scope">
          <span>{{scope.row.param3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="weight" label="规格重量">
        <template slot-scope="scope">
          <span>{{ scope.row.weight?scope.row.weight:'0'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goodsCount" label="上架数量">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsCount?scope.row.goodsCount:'0'}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="soldCount" label="已售">
        <template slot-scope="scope">
          <span>{{ scope.row.soldCount?scope.row.soldCount:'0'}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="state " label="当前状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state==1 ">已上架</span>
          <span v-else-if="scope.row.state==2 ">已下架</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="takeTeaCount" label="操作">
        <template slot-scope="scope">
          <a v-if="scope.row.state==1" @click="outShelf(scope.row.id)">下架</a>
          <!-- <a v-else-if="scope.row.state==2"  @click="onShelf(scope.row.id)">上架</a> -->
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
    inject: ['reload'],
    methods: {
      getData() {
        this.axios.post(this.http + "/interface/pc/distributor/pcGoods/myGoods", qs.stringify({
          loginPhone: this.phone,
          currentPage: this.currentPage,
          pageSize: this.showCount,
          goodsName: this.goodsName,
          goodsCode: this.goodsCode,
          priceSort:this.priceSort,
          state:this.state
        })).then(res => {
          if (res.data.code!=200) {
          this.tableData = [];
          this.total = 0;
          this.currentPage = 1;
          return false;
          }
          this.tableData = JSON.parse(res.data.data).onTheShelves;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        })
      },
      handleClick(row) {
      },
      handleSizeChange(data) {
        this.showCount = data;
        this.getData()
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        this.getData()
      },
      changeTab(val){
        this.state=val.name;
        this.getData()
      },
      mysort(val){
        if (val.order=='ascending') {
          this.priceSort=1;
        this.getData()
        }else{
          this.priceSort=2;
        this.getData()

        }
      },
      search() {
        this.getData()
      },
      outShelf(id){
        this.axios.post(this.http + "/interface/pc/distributor/pcTeaStore/outTheShelf", qs.stringify({
          id: id
        })).then(res => {
          if (res.data.code==200) {
            this.reload();
          }else{
            this.$message('下架失败');
          }
        })
      },
      // onShelf(id){
      //   this.axios.post(this.http + "/interface/pc/distributor/pcTeaStore/onTheShelf", qs.stringify({
      //     id: id
      //   })).then(res => {
      //     if (res.data.code==200) {
      //       location.reload();
      //     }else{
      //       this.$message('上架失败');
      //     }
      //   })
      // }
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
        phone:this.$getcookie('LOGIN_PHONE'),
        total:0,
        priceSort:1,
        state:'0',
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
