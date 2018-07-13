<template>
<div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="订单编号：">
        <el-input v-model="formInline.user" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item label="商品名称：">
        <el-input v-model="formInline.user" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="订单类型：">
        <el-select v-model="formInline.region" placeholder="订单类型">
        <el-option label="全部" value="shanghai"></el-option>
        <el-option label="新茶抢购" value="beijing"></el-option>
        <el-option label="商城交易" value="nanjing"></el-option>
        <el-option label="补开发票" value="anhui"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default">重置</el-button>
    </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
        <el-tab-pane label="全部订单" name="first"></el-tab-pane>
        <el-tab-pane label="待确认" name="second"></el-tab-pane>
        <el-tab-pane label="待付款" name="third"></el-tab-pane>
        <el-tab-pane label="交易完成" name="fourth"></el-tab-pane>
        <el-tab-pane label="已取消" name="five"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="订单编号" width="100">
        <template slot-scope="scope">
            <span>123456789012345678</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" align="center" label="商品信息" width="200">
        <template slot-scope="scope">
            <div class="sp_info">
            <div class="sp_cover">
                <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=32b52bc5f51f4134f43a0d2c4476feaf/b999a9014c086e06893e896d0a087bf40ad1cb06.jpg">
            </div>
            <div class="sp_content">
                <span>微信支付（勿买不发货）</span><br>
                <span class="sp_code">商品代码：CS2018030601</span>
            </div>
            </div>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="下单时间" width="100">
        <template slot-scope="scope">
            <span>2018-03-02 12:12:12</span>
        </template>
        </el-table-column>
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="买家" width="100">
        <template slot-scope="scope">
            <span>茶企001经销商</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="商品数量">
        <template slot-scope="scope">
            <span>150</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="实付款">
        <template slot-scope="scope">
            <span>150</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="订单类型">
        <template slot-scope="scope">
            <span>新茶抢购</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="当前状态" width="100">
        <template slot-scope="scope">
            <span>交易取消</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="操作" width="100">
        <template slot-scope="scope">
            <a  @click="$router.openPage('/distributorCenter/billDetail')" style="color:#0166bb" v-if="scope.row.takeTeaCount">已补发票</a><br v-if="scope.row.takeTeaCount">
            <a  @click="$router.openPage('/distributorCenter/makeBill')" style="color:#0166bb" v-if="!scope.row.takeTeaCount">补开发票</a><br v-if="!scope.row.takeTeaCount">
            <a  @click="$router.openPage('/buyListDetail')" style="color:#0166bb">订单详情</a>
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
        activeName:"first",
        formInline: {
          user: '',
          region: ''
        },
        fullscreenLoading:false
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