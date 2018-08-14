<template>
<div>
<el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/distributorCenter/banlance' }">企业中心</el-breadcrumb-item>
  <el-breadcrumb-item>提货管理</el-breadcrumb-item>
  <el-breadcrumb-item>我的库存</el-breadcrumb-item>
</el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="商品代码：">
        <el-input v-model="goodsCode" placeholder="商品代码"></el-input>
    </el-form-item>
    <el-form-item label="商品名称：">
        <el-input v-model="goodsName" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" @click="getData" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default" @click="goodsCode=goodsName=''">重置</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" slot="empty">
        <el-table-column prop="goodscode" show-overflow-tooltip align="center" label="商品代码">
        </el-table-column>
        <el-table-column prop="goodsname" show-overflow-tooltip align="center" label="商品名称">
        </el-table-column>
        <el-table-column prop="stockcount" show-overflow-tooltip align="center" label="持有数量" width="120">
        <template slot-scope="scope">
            <span>{{scope.row.stockcount?scope.row.stockcount:0}}{{scope.row.transactionSpecification3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="已提货数量" width="120">
        <template slot-scope="scope">
            <span>{{scope.row.param4?scope.row.param4:0}}{{scope.row.transactionSpecification3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="上架数量"  width="120">
        <template slot-scope="scope">
            <span>{{scope.row.param3?scope.row.param3:0}}{{scope.row.transactionSpecification3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="param3" show-overflow-tooltip align="center" label="冻结数量"  width="120">
        <template slot-scope="scope">
            <span>{{scope.row.param3?scope.row.param3:0}}{{scope.row.transactionSpecification3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" align="center" label="操作" width="180">
        <template slot-scope="scope">
            <a @click="$router.openPage('/distributorCenter/deliveryApplication')" style="color:#0166bb">申请提货</a>&nbsp;&nbsp;
            <a @click="centerDialogVisible=!centerDialogVisible" style="color:#0166bb">我要卖茶</a>
        </template>
        </el-table-column>
    </el-table>
    <div class="block" style="">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="40%"
      :before-close="handleClose" center>
      <el-row>
        <el-col :span="7" style="margin-top:20px">温馨提示:</el-col>
        <el-col :span="13">
          此商品单价为不含税价格！
        </el-col>
        <el-col :span="7" style="margin-top:20px">商品名称:</el-col>
        <el-col :span="13">
          演示商品(勿拍不发货)
        </el-col>
        <el-col :span="7">单价:</el-col>
        <el-col :span="7" style="margin-top:20px">
          <el-input></el-input>
        </el-col>
        <el-col :span="7" offset="1" style="margin-top:20px">
          <el-select v-model="specifications" placeholder="请选择规格">
            <el-option label="元/盒" value="1"></el-option>
            <el-option label="元/粒" value="2"></el-option>
            <el-option label="元/克" value="3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">出售数量:</el-col>
        <el-col :span="7" style="margin-top:20px">
          <el-input></el-input>
        </el-col>
        <el-col :span="7">
          (库存数量547片)
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">保存</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import qs from "qs";
export default {
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/distributor/pcTeaStore/myHolderStock",
          qs.stringify({
            loginPhone: this.$getcookie('LOGIN_PHONE'),
            currentPage: this.currentPage,
            pageSize: this.showCount,
            goodsName: this.goodsName,
            goodsCode: this.goodsCode
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code!=200) {
          this.tableData = [];
          this.total = 0;
          this.currentPage =1;
          return false;
          }
          this.tableData = JSON.parse(res.data.data).list;
          this.total = JSON.parse(res.data.data).total;
          console.log(JSON.parse(res.data.data));
          this.currentPage = JSON.parse(res.data.data).currentPage;
        });
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(data) {
      console.log(data);
      this.showCount = data;
      this.getData();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getData();
    },
    search() {
      this.getData();
    }
  },
  created() {
    this.getData()
  },
  data() {
    return {
      tableData: [],
      http: this.$store.state.dialog.http,
      currentPage: 1,
      showCount: 10,
      goodsName: "",
      goodsCode: "",
      total: 0,
      centerDialogVisible: false,
      specifications: ""
    };
  }
};
</script>

<style lang='less' scoped>
.sp_info {
  display: flex;
}
.sp_cover {
  width: 30%;
  height: 80%;
  > img {
    display: block;
    width: 45px;
    height: 45px;
    margin-top: 4px;
  }
}
.sp_content {
  width: 70%;
  text-align: left;
  .sp_code {
    font-size: 12px;
    color: #999;
  }
}
.el-col-7 {
  margin-top: 30px;
  text-align: right;
  padding-right: 20px;
}
.el-col-13 {
  margin-top: 20px;
}
</style>