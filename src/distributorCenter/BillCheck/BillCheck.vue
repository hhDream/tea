<template>
<div >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="订单编号：">
        <el-input v-model="loginAccount" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item label="提货单号：">
        <el-input v-model="formInline.user" placeholder="提货单号"></el-input>
    </el-form-item>
    <el-form-item label="资金方向：">
        <el-select v-model="formInline.region" placeholder="资金方向">
        <el-option label="全部" value="shanghai"></el-option>
        <el-option label="收入" value="beijing"></el-option>
        <el-option label="支出" value="nanjing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="费用类型：">
        <el-select v-model="formInline.region" placeholder="费用类型">
        <el-option label="全部" value="shanghai"></el-option>
        <el-option label="违约金" value="beijing"></el-option>
        <el-option label="货款" value="nanjing"></el-option>
        <el-option label="交易手续费" value="nanjing"></el-option>
        <el-option label="仓储费" value="nanjing"></el-option>
        <el-option label="运费" value="nanjing"></el-option>
        <el-option label="充值" value="nanjing"></el-option>
        <el-option label="提现" value="nanjing"></el-option>
        <el-option label="调货提成" value="nanjing"></el-option>
        <el-option label="发票递送费" value="nanjing"></el-option>
        <el-option label="折扣费用" value="nanjing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="申请时间：">
        <el-date-picker
      v-model="value13"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
    </el-form-item> 
    <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default">重置</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="结算时间">
        <template slot-scope="scope">
            <span>2018-03-08 11:14:37</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="订单编号">
        <template slot-scope="scope">
            <span>201803081113552258292</span><br>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="提货单号">
        <template slot-scope="scope">
            <span>201803081113552258292</span>
        </template>
        </el-table-column>     
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="费用类型" width="120">
        <template slot-scope="scope">
            <span>发票递送费</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="资金方向" width="100">
        <template slot-scope="scope">
            <span>收入</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="收支金额" width="120">
        <template slot-scope="scope">
            <span>+888888.00元</span>
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
        this.axios.post(this.http + "/interface/pc/distributor/pcBank/myBill", qs.stringify({
          loginAccount: this.enterpriseCode,
          currentPage: this.currentPage,
          showCount: this.showCount,
          startTime: this.goodsName,
          endTime: this.goodsCode,
          transactionDirection: this.goodsCode,
        })).then(res => {
          this.tableData = JSON.parse(res.data.data).data;
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
      search() {
        this.getData()
      },
      
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
        value13:"",
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