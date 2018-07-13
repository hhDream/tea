<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="商品代码：">
        <el-input v-model="formInline.user" placeholder="商品代码"></el-input>
    </el-form-item>
    <el-form-item label="商品名称：">
        <el-input v-model="formInline.user" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default">重置</el-button>
    </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
        <el-tab-pane label="抢购记录" name="1"></el-tab-pane>
        <el-tab-pane label="成交明细" name="2"></el-tab-pane>
        <el-tab-pane label="调货记录" name="3"></el-tab-pane>
    </el-tabs>

    <el-table :data="tableData" border style="width: 100%" slot="empty" v-if="activeName == '1'">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品代码" width="120">
        <template slot-scope="scope">
            <span>fx12567890</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品名称" width="150">
        <template slot-scope="scope"> 
            <span>下关普洱茶</span>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="抢购总量">
        <template slot-scope="scope">
            <span>10000</span>
        </template>
        </el-table-column>
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="抢购价格">
        <template slot-scope="scope">
            <span>10000</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="抢购开始时间" width="120">
        <template slot-scope="scope">
            <span>2018-03-02 12:12:12</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="抢购结束时间" width="120">
        <template slot-scope="scope">
            <span>2018-03-02 12:12:12</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="参与抢购数量" width="120">
        <template slot-scope="scope">
            <span>1126</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="自留数量">
        <template slot-scope="scope">
            <span>125</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="已售数量">
        <template slot-scope="scope">
            <span>1252</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="调货数量">
        <template slot-scope="scope">
            <span>12552</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="被调货数量"  width="100">
        <template slot-scope="scope">
            <span>12512</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="剩余数量">
        <template slot-scope="scope">
            <span>12512</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" fixed="right" label="当前状态" width="100">
        <template slot-scope="scope">
            <span>抢购中</span>
        </template>
        </el-table-column>
    </el-table>
    <el-table :data="tableData" border style="width: 100%" slot="empty" v-if="activeName == '2'">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="申购编号">
        <template slot-scope="scope">
            <span>fx12567890</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品代码">
        <template slot-scope="scope"> 
            <span>fx12567890</span>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="商品名称" width="120">
        <template slot-scope="scope">
            <span>下关普洱茶下关普洱茶</span>
        </template>
        </el-table-column>
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="买家账号">
        <template slot-scope="scope">
            <span>10004440</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="买家名称">
        <template slot-scope="scope">
            <span>王思聪</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="成交时间" width="120">
        <template slot-scope="scope">
            <span>2018-03-02 12:12:12</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="成交单价">
        <template slot-scope="scope">
            <span>1126</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="成交数量">
        <template slot-scope="scope">
            <span>125</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="成交总价">
        <template slot-scope="scope">
            <span>1252</span>
        </template>
        </el-table-column>
    </el-table>
    <el-table :data="tableData" border style="width: 100%" slot="empty" v-if="activeName == '3'">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品代码" width="120">
        <template slot-scope="scope">
            <span>fx12567890</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品名称" width="120">
        <template slot-scope="scope"> 
            <span>下关普洱茶</span>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="调货商家账号" width="120">
        <template slot-scope="scope">
            <span>100sss00</span>
        </template>
        </el-table-column>
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="调货商家名称" width="120">
        <template slot-scope="scope">
            <span>经销商001</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="调货单价">
        <template slot-scope="scope">
            <span>1412</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="调入数量">
        <template slot-scope="scope">
            <span>46246</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="调出数量">
        <template slot-scope="scope">
            <span>1126</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="需支付提成">
        <template slot-scope="scope">
            <span>125</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="可获得提成">
        <template slot-scope="scope">
            <span>1252</span>
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
        activeName:"1",
        formInline: {
          user: '',
          region: ''
        },
        fullscreenLoading:"",
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