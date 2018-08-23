<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userStock' }">提货管理</el-breadcrumb-item>
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
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <!-- <el-button style="margin-top: 19px;" icon="el-icon-search" type="primary" plain></el-button> -->
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button @click="goodsNum=goodsName=''">重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData"  border style="width: 100%">
      <!-- <el-table-column sortable  fixed prop="id" label="序号">
      </el-table-column> -->
      <el-table-column prop="goodscode" show-overflow-tooltip align="center"  label="商品代码" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" show-overflow-tooltip align="center"  label="商品名称"  width="180">
      </el-table-column>
      <el-table-column prop="stockcount" show-overflow-tooltip align="center"  label="持有数量">
      </el-table-column>
      <el-table-column prop="param4" show-overflow-tooltip align="center"  label="已提货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.param4?scope.row.param4:0 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="param3" show-overflow-tooltip align="center"  label="上架数量">
        <template slot-scope="scope">
          <span>{{ scope.row.param3?scope.row.param3:0 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="param3" show-overflow-tooltip align="center"  label="冻结数量">
        <template slot-scope="scope">
          <span>{{ scope.row.param3?scope.row.param3:0 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="param1" show-overflow-tooltip align="center"  label="操作">
        <template slot-scope="scope">
          <span style="color:#409EFF;cursor:pointer;" @click="$router.openPage('/myUserCenter/takeTea',{id:scope.row.id})">立即取茶</span>
        </template>
      </el-table-column>
    </el-table>  
    <div class="block">
        <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="currentPage" 
        :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" 
        :total="total">
        </el-pagination>
    </div>



</div>
</template>

<script>
import qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      goodsCode: "",
      goodsName: "",
      value: "0",
      http: this.$store.state.dialog.http,
      total: 1,
      currentPage: 1,
      showCount: 10,
      tableData: [
        
      ]
    };
  },
  methods: {
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcTeaStore/myHolderStock",
          qs.stringify({
            loginPhone: this.getCookie("LOGIN_PHONE"),
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            goodsCode: this.goodsCode,
            goodsName: this.goodsName
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            console.log(JSON.parse(res.data.data).list)
            this.tableData = JSON.parse(res.data.data).list;
            this.total = JSON.parse(res.data.data).total;
            this.currentPage = JSON.parse(res.data.data).currentPage;
          }else{
            this.tableData = [];
            this.total = 0;
            this.currentPage = 1;
          }
        });
    },
    search() {
      this.getData();
    },
    handleClick() {
      this.getData();
    },
    handleSizeChange(data) {
      this.showCount = data;
      this.getData();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getData();
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
  mounted() {
    this.getData();
  }
};
</script>
<style >
.el-select {
  width: 100%;
}
</style>
