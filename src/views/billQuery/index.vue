<template>
<div>
  <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
    <el-breadcrumb-item>账单查询</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row style="margin-bottom: 10px;" :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <span class="demonstration">资金方向</span>
        <el-select v-model="transactionDirection" placeholder="请选择">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <span class="demonstration">费用类型</span>
        <el-select v-model="transactionType" placeholder="请选择">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <span class="demonstration">结算时间</span>
        <el-date-picker style="width:100%" v-model="times" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
    </el-col>
  </el-row>
  <el-row style="margin-bottom:20px">
    <el-col :span="6">
        <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button  @click="transactionDirection=transactionType=times=''">重置</el-button>
    </el-col>
  </el-row>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="transactionTime" align="center" label="结算时间" width="170">
    </el-table-column>
    <el-table-column prop="transactionType" align="center" label="费用类型" width="120">
      <template slot-scope="scope">
          <span>{{scope.row.transactionType==1?'抢购货款':scope.row.transactionType==2?'保证金缴纳':scope.row.transactionType==3?'补交保证金':scope.row.transactionType==4?'补交货款':scope.row.transactionType==5?'快递费':scope.row.transactionType==6?'茶企仓储费':scope.row.transactionType==7?'app商城交易':scope.row.transactionType==8?'结算分账':'手续费'}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="transactionDirection" align="center" label="资金方向"  width="120">
      <template slot-scope="scope">
          <span>{{scope.row.transactionDirection==1?'支出':'收入'}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="transactionAmmount" header-align="center" align="left" label="收支金额">
      <template slot-scope="scope">
          <span>{{scope.row.transactionDirection==1?'-￥':'+￥'}} {{ scope.row.transactionAmmount?scope.row.transactionAmmount:'0'}} 元</span>
      </template>
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
        this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/myBill", qs.stringify({
          enterpriseId: this.enterpriseCode,
          currentPage: this.currentPage,
          showCount: this.showCount,
          transactionDirection: this.transactionDirection,
          transactionType: this.transactionType,
          startTime: this.times[0],
          endTime: this.times[1],
        })).then(res => {
          if(res.data.code==200){
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
          }else{
            this.tableData=[]
          }
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
        total:0,
        transactionDirection: "",
        transactionType: "",
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
        },
        options1: [{
          value: '1',
          label: '收入'
        }, {
          value: '2',
          label: '支出'
        }],
        options2: [{
          value: '1',
          label: '提现'
        }, {
          value: '2',
          label: '交易手续费',
        }, {
          value: '3',
          label: '仓储费',
        }, {
          value: '4',
          label: '货款',
        }, {
          value: '5',
          label: '充值',
        }],
      }
    },
  }
</script>
