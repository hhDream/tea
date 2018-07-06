<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>经销商交易</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">经销商账号</span>
          <el-input v-model="loginAccount" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">经销商名称</span>
          <el-input v-model="distributorName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <span class="demonstration">时间</span>
          <el-date-picker style="width:100%" v-model="times" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">订单额</span>
          <el-input style="width:45%" type="number" v-model="startMoney" clearable></el-input>~
          <el-input style="width:45%"  type="number" v-model="endMoney" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button  @click="loginAccount=distributorName=times=startMoney=endMoney=''">重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="loginAccount" align="center" label="经销商账号" width="120">
      </el-table-column>
      <el-table-column prop="distributorName" align="center" label="经销商名称" width="100">
      </el-table-column>
      <el-table-column prop="orderTime" align="center" label="日期" width="160">
      </el-table-column>
      <el-table-column prop="newCount" align="center" label="新增会员数量" width="130">
      </el-table-column>
      <el-table-column prop="customerCount" align="center" label="总会员数量" width="100">
      </el-table-column>
      <el-table-column prop="count" label="订单总数" align="center" width="100">
      </el-table-column>
      <el-table-column prop="actualAmountPayment" align="center" label="订单总额(元)" width="100">
      </el-table-column>
      <el-table-column prop="avger" align="center" label="订单平均额(元)" >
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    methods: {
      getData() {
        this.axios.post(this.http + "/interface/pc/personal/pcDistributor/distransaction", qs.stringify({
          currentPage: this.currentPage,
          phone: this.phone,
          enterpriseId: this.enterpriseCode,
          type: this.type,
          showCount: this.showCount,
          loginAccount: this.loginAccount,
          distributorName: this.distributorName,
          startMoney: this.startMoney,
          endMoney: this.endMoney,
          startTimes: this.times[0],
          endTimes: this.times[1],
        })).then(res => {
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
          console.log(this.tableData);
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
        phone: this.$store.state.dialog.phone,
        currentPage: 1,
        showCount: 10,
        type: 1,
        loginAccount: "",
        distributorName: "",
        startMoney: "",
        endMoney: "",
        array: 0,
        total: 0,
        loginPhone: '',
        times: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
  }
</script>
<style scoped>
  .demonstration {
    display: block
  }
  input::-webkit-inner-spin-button {  
   -webkit-appearance: none!important;  
}  
  input::-webkit-outer-spin-button {  
   -webkit-appearance: none!important;  
}  
</style>
