<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="会员账号：">
        <el-input v-model="customerAccount" placeholder="会员账号"></el-input>
    </el-form-item>
    <el-form-item label="会员名称：">
        <el-input v-model="customerName" placeholder="会员名称"></el-input>
    </el-form-item><br>
    <el-form-item label="订单额：">
        <el-input v-model="lowAmount" placeholder="订单额" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item label="～" style="margin-left:-105px">
        <el-input v-model="topAmount" placeholder="订单额" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item label="订单量："  style="margin-left:-100px">
        <el-input v-model="lowCount" placeholder="订单量" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item label="～" style="margin-left:-105px">
        <el-input v-model="topCount" placeholder="订单量" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item label="订单时间：">
        <el-date-picker
      v-model="startTime"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
    </el-form-item> 
    <el-form-item>
        <el-button icon="el-icon-search" circle @click="search()"></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default" @click="reset()">重置</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="会员账号">
        <template slot-scope="scope">
            <span>{{ scope.row.buyerAccount }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" align="center" label="会员名称">
        <template slot-scope="scope">
            <span>{{ scope.row.buyerName }}</span><br>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="会员订单额">
        <template slot-scope="scope">
            <span>{{ scope.row.actualAmountPayment }}</span>
        </template>
        </el-table-column>     
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="会员订单量">
        <template slot-scope="scope">
            <span>{{ scope.row.orderCount }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="平均订单金额">
        <template slot-scope="scope">
            <span>{{ +scope.row.actualAmountPayment/+scope.row.orderCount?+scope.row.actualAmountPayment/+scope.row.orderCount:0 }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="最后一笔订单时间" width="180">
        <template slot-scope="scope">
            <span>{{ scope.row.orderTime }}</span>
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
    data() {
      return {
        tableData: [],
        http: this.$store.state.dialog.http,
        enterpriseCode: this.getCookie('distributorCode'),
        currentPage: 1,
        showCount: 10,
        customerName: "",
        customerAccount: "",
        lowAmount:"",
        topAmount:"",
        lowCount:"",
        topCount:"",
        startTime:[],
        total:0,
        activeName:"first",
        formInline: {
          user: '',
          region: ''
        },
        value13:"",
        fullscreenLoading:""
      }
    },
    methods: {
      getData() {
        var date_value1 = '';  
        var date_value2 = '';   
        if(this.startTime.length!=0){
          var date1 = new Date(this.startTime[0]);  
          var date2 = new Date(this.startTime[1]);  
          date_value1=date1.getFullYear() + '-' + (date1.getMonth() + 1<10?('0'+(date1.getMonth() + 1)):(date1.getMonth() + 1)) + '-' + (date1.getDate()<10?('0'+date1.getDate()):date1.getDate()) + ' ' + '00:00:00'; 
          date_value2=date2.getFullYear() + '-' + (date2.getMonth() + 1<10?('0'+(date2.getMonth() + 1)):(date2.getMonth() + 1)) + '-' + (date2.getDate()<10?('0'+date2.getDate()):date2.getDate()) + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds();  
        } 
        this.axios.post(this.http + "/interface/pc/distributor/pcDistributor/customerTransaction", qs.stringify({
          currentPage: this.currentPage,
          pageSize: this.showCount,
          customerAccount: this.customerAccount,
          customerName: this.customerName,
          distributorCode: this.enterpriseCode,
          lowAmount: this.lowAmount,
          topAmount: this.topAmount,
          lowCount: this.lowCount,
          topCount: this.topCount,
          startTime: date_value1,
          endTime: date_value2,
        })).then(res => {
          console.log(JSON.parse(res.data.data).list)
          this.tableData = JSON.parse(res.data.data).list;
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
      getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
      },
      reset(){
        this.customerName = "";
        this.customerAccount = "";
        this.lowAmount = "";
        this.topAmount = "";
        this.lowCount = "";
        this.topCount = "";
        this.startTime = [];
      }
    },
    created() {
      this.getData()
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