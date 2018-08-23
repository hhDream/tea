<template>
<div>
<el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
  <el-breadcrumb-item >订单管理</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/distributorCenter/myGoods' }">购买订单</el-breadcrumb-item>
</el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="订单编号：">
        <el-input v-model="goodsCode" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item label="商品名称：">
        <el-input v-model="goodsName" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="订单类型：">
        <el-select v-model="orderType" placeholder="订单类型">
        <el-option label="全部" value=""></el-option>
        <el-option label="秒杀订单" value="1"></el-option>
        <el-option label="商城交易" value="2"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" @click="getData" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default" @click="goodsCode=goodsName=orderType=''">重置</el-button>
    </el-form-item>
    </el-form>
    <el-tabs v-model="state" @tab-click="changeTab">
        <el-tab-pane label="全部订单" name="0"></el-tab-pane>
        <el-tab-pane label="待支付" name="1"></el-tab-pane>
        <el-tab-pane label="已支付" name="2"></el-tab-pane>
        <el-tab-pane label="已取消" name="4"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" @sort-change="mysort" border style="width: 100%" slot="empty">
        <el-table-column prop="orderCode" show-overflow-tooltip align="center" label="订单编号" width="100">
        </el-table-column>
        <el-table-column prop="goodsName" align="center" label="商品信息" width="200">
        <template slot-scope="scope">
            <div class="sp_info">
            <div class="sp_cover">
                <img :src="scope.row.pcSmallPicture">
            </div>
            <div class="sp_content">
                <span>{{scope.row.goodsName}}</span><br>
                <span class="sp_code">商品代码：{{scope.row.goodsCode}}</span>
            </div>
            </div>
        </template>
        </el-table-column>
        <el-table-column prop="orderTime" show-overflow-tooltip align="center" label="下单时间" width="100">
        </el-table-column>
        <el-table-column prop="enterpriseName" show-overflow-tooltip align="center" label="买家" width="100">
        </el-table-column>
          <el-table-column prop="buyGoodsCount" show-overflow-tooltip align="center" label="商品数量">
            <template slot-scope="scope">
              <span>{{scope.row.buyGoodsCount}}{{scope.row.goodsSpecification}}</span>
            </template>
          </el-table-column>
        <el-table-column prop="actualAmountPayment" show-overflow-tooltip align="center" sortable='custom' width="100" label="实付款">
        </el-table-column>
          <el-table-column prop="orderType" show-overflow-tooltip align="center" label="订单类型">
            <template slot-scope="scope">
              <span v-if="scope.row.orderType==1">秒杀订单</span>
              <span v-else>商城交易</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" show-overflow-tooltip align="center" label="当前状态" >
            <template slot-scope="scope">
              <span v-if="scope.row.orderStatus==1">待支付</span>
              <span v-else-if="scope.row.orderStatus==2">已支付</span>
              <span v-else-if="scope.row.orderStatus==4">已取消</span>
            </template>
          </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="操作" width="100">
        <template slot-scope="scope">
            <a  @click="$router.openPage('/distributorCenter/billDetail')" style="color:#0166bb" v-if="scope.row.takeTeaCount">已补发票</a><br v-if="scope.row.takeTeaCount">
            <a  @click="$router.openPage('/distributorCenter/makeBill')" style="color:#0166bb" v-if="scope.row.orderStatus==2">补开发票</a><br v-if="scope.row.orderStatus==2">
            <a  @click="$router.openPage('/buyListDetail',{id:scope.row.orderCode})" style="color:#0166bb">订单详情</a>
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
import qs from "qs";
export default {
  methods: {
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/distributor/pcGoods/myOrder",
          qs.stringify({
            loginPhone: this.phone,
            currentPage: this.currentPage,
            pageSize: this.showCount,
            goodsName: this.goodsName,
            goodsCode: this.goodsCode,
            priceSort: this.priceSort,
            state: this.state,
            orderType: this.orderType,
            type: this.type
          })
        )
        .then(res => {
          if (res.data.code != 200) {
            this.tableData = [];
            this.total = 0;
            this.currentPage = 1;
            return false;
          }
          this.tableData = JSON.parse(res.data.data).orderList;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        });
    },
    handleClick(row) {
    },
    handleSizeChange(data) {
      this.showCount = data;
      this.getData();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getData();
    },
    changeTab(val) {
      this.state = val.name;
      this.getData();
    },
    mysort(val) {
      if (val.order == "ascending") {
        this.priceSort = 1;
        this.getData();
      } else {
        this.priceSort = 2;
        this.getData();
      }
    },
    search() {
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  data() {
    return {
      tableData: [],
      priceSort: "",
      state: "0",
      orderType: "",
      type: "1",
      http: this.$store.state.dialog.http,
      phone: this.$getcookie("LOGIN_PHONE"),
      currentPage: 1,
      showCount: 10,
      goodsName: "",
      goodsCode: "",
      total: 0,
      activeName: "first",
      formInline: {
        user: "",
        region: ""
      },
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
</style>