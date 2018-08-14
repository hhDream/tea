<template>
<div>
<el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/distributorCenter/banlance' }">企业中心</el-breadcrumb-item>
  <el-breadcrumb-item>新茶申购</el-breadcrumb-item>
  <el-breadcrumb-item>我的抢购</el-breadcrumb-item>
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
    <el-tabs v-model="type" @tab-click="myType">
        <el-tab-pane label="抢购记录" name="1"></el-tab-pane>
        <el-tab-pane label="交易明细" name="2"></el-tab-pane>
        <el-tab-pane label="调货记录" name="3"></el-tab-pane>
    </el-tabs>

    <el-table key='on' :data="tableData" border style="width: 100%" slot="empty" v-if="type == '1'">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品代码" width="120">

        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品名称" width="150">
        </el-table-column>
        <el-table-column prop="partakeAllomentCountTotal" show-overflow-tooltip align="center" label="抢购总量">
        <template slot-scope="scope">
            <span>{{scope.row.partakeAllomentCountTotal}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="releasePrice" show-overflow-tooltip align="center" label="抢购价格">
        <template slot-scope="scope">
            <span>{{scope.row.releasePrice}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="releaseBeginTime" show-overflow-tooltip align="center" label="抢购开始时间" width="120">
        <template slot-scope="scope">
            <span>{{scope.row.releaseBeginTime}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="releaseEndTime" show-overflow-tooltip align="center" label="抢购结束时间" width="120">
        <template slot-scope="scope">
            <span>{{scope.row.releaseEndTime}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="partakeAllomentCount" show-overflow-tooltip align="center" label="参与抢购数量" width="120">
        <template slot-scope="scope">
            <span>{{scope.row.partakeAllomentCount}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="shlfRetentionCount" show-overflow-tooltip align="center" label="自留数量">
        <template slot-scope="scope">
            <span>{{scope.row.shlfRetentionCount}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="soldCount" show-overflow-tooltip align="center" label="已售数量">
        <template slot-scope="scope">
            <span>{{scope.row.soldCount?scope.row.soldCount:0}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="inCount" show-overflow-tooltip align="center" label="调货数量">
       <template slot-scope="scope">
            <span>{{scope.row.inCount?scope.row.inCount:0}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="outCount" show-overflow-tooltip align="center" label="被调货数量"  width="100">
       <template slot-scope="scope">
            <span>{{scope.row.outCount?scope.row.outCount:0}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="剩余数量">
       <template slot-scope="scope">
            <span>{{scope.row.partakeAllomentCount-scope.row.soldCount>=0?scope.row.partakeAllomentCount-scope.row.soldCount:0}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" fixed="right" label="当前状态" width="100">
        <template slot-scope="scope">
            <span>抢购中</span>
        </template>
        </el-table-column>
    </el-table>
    <el-table key='two' :data="tableData" border style="width: 100%" slot="empty" v-if="type == '2'">
        <el-table-column prop="orderCode" show-overflow-tooltip align="center" label="申购编号">
        </el-table-column>
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品代码">
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品名称">
        </el-table-column>
        <el-table-column prop="buyerAccount" show-overflow-tooltip align="center" label="买家账号">
        </el-table-column>
        <el-table-column prop="buyerName" show-overflow-tooltip align="center" label="买家名称">
        </el-table-column>
        <el-table-column prop="orderTime" show-overflow-tooltip align="center" label="成交时间">
        </el-table-column>
        <el-table-column prop="goodPrice" show-overflow-tooltip align="center" label="成交单价">
        <template slot-scope="scope">
            <span>{{scope.row.goodPrice}}元</span>
        </template>
        </el-table-column>
        <el-table-column prop="buyGoodsCount" show-overflow-tooltip align="center" label="成交数量">
        <template slot-scope="scope">
            <span>{{scope.row.buyGoodsCount}}{{scope.row.goodsSpecification}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="totalAmountOrder" show-overflow-tooltip align="center" label="成交总价">
        <template slot-scope="scope">
            <span>{{scope.row.totalAmountOrder}}元</span>
        </template>
        </el-table-column>
    </el-table>
    <el-table key='three' :data="tableData" border style="width: 100%" slot="empty" v-if="type == '3'">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品代码">
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品名称">
        </el-table-column>
        <el-table-column prop="transferDistributorAccount" show-overflow-tooltip align="center" label="调货商家账号">
        </el-table-column>
        <el-table-column prop="transferDistributorName" show-overflow-tooltip align="center" label="调货商家名称">
        </el-table-column>
        <el-table-column prop="releasePrice" show-overflow-tooltip align="center" label="调货单价">
        <template slot-scope="scope">
            <span>{{scope.row.releasePrice}}元</span>
        </template>
        </el-table-column>
        <el-table-column prop="transferCount" show-overflow-tooltip align="center" label="调货数量">
        <template slot-scope="scope">
            <span>{{scope.row.transferCount}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column>
        <!-- <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="调出数量">
        <template slot-scope="scope">
            <span>{{scope.row.takeTeaCount}}{{scope.row.benchmarkingUnit3}}</span>
        </template>
        </el-table-column> -->
        <el-table-column prop="transferCost" show-overflow-tooltip align="center" label="需支付提成">
        <template slot-scope="scope">
            <span>{{scope.row.transferCost}}元</span>
        </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="可获得提成">
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
        this.axios.post(this.http + "/interface/pc/distributor/pcAllotment/myAllotment", qs.stringify({
          distributorCode: this.$getcookie('distributorCode'),
          currentPage: this.currentPage,
          pageSize: this.showCount,
          goodsName: this.goodsName,
          goodsCode: this.goodsCode,
          type:this.type
        })).then(res => {
            if (res.data.code!=200) {
          this.tableData =[];
          this.total =0;
          this.currentPage = 1;
          return false
            }
          this.tableData = JSON.parse(res.data.data).list;
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
      },
      myType(val){
          this.type=val.name;
          this.getData()
      }
    },
    mounted() {
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
        total:0,
        type:'1',
        stock:""
      }
    },
  }
</script>

<style lang='less' scoped>

.sp_info{
  display: flex;
}
.sp_cover{
  width: 30%;
  height: 80%;
  >img{
    display: block;
    width: 45px;
    height: 45px;
    margin-top: 4px;
  }
}
.sp_content{
  width: 70%;
  text-align: left;
  .sp_code{
    font-size: 12px;
    color: #999;
  }
}
</style>