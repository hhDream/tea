<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">财务管理</el-breadcrumb-item>
      <el-breadcrumb-item>账单查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">订单编号</span>
          <el-input v-model="orderNum" clearable></el-input>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">提货单号</span>
          <el-input v-model="takeGoodsNum" clearable></el-input>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">资金方向</span>
          <el-select v-model="fundDirection" placeholder="请选择">
            <el-option v-for="item in fundOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">费用类型</span>
          <el-select v-model="feeType" placeholder="请选择">
            <el-option v-for="item in feeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-bottom:20px" :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span class="demonstration">结算时间</span>
            <el-date-picker style="width:100%" v-model="times" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="10" style="margin-left:10px">
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button @click="orderNum=takeGoodsNum=fundDirection=feeType=times=''">重置</el-button>
          <el-button type="success" @click="getquotalist_getExcel">导出EXCEL</el-button>
        </el-col>
        
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column sortable  fixed prop="id" label="序号">
      </el-table-column> -->
      <el-table-column prop="settleTime" label="结算时间">
      </el-table-column>
      <el-table-column prop="orderNum" label="订单编号">
      </el-table-column>
      <el-table-column prop="takeGoodsNum" label="提货单号">
      </el-table-column>
      <el-table-column prop="feeType" label="费用类型">
      </el-table-column>
      <el-table-column prop="fundDirection" label="资金方向">
      </el-table-column>
      <el-table-column prop="szAmount" label="收支金额">
        <template slot-scope="scope">
          <span>{{ scope.row.szAmount?scope.row.szAmount:0}} 元</span>
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
  import qs from 'qs'
  export default {
    inject:['reload'],
    methods:{
      search(){

      },
      getquotalist_getExcel(){

      },
      handleClick(){},
      handleSizeChange(){},
      handleCurrentChange(){},
    },
    data() {
      return {
        orderNum: '',
        takeGoodsNum: '',
        fundDirection: '',
        feeType: '',
        times: '',
        releaseBeginTime: '',
        pickerOptions2: '',
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        total: 1,
        currentPage: 1,
        showCount: 10,
        total2: 1,
        currentPage2: 1,
        showCount2: 10,
        dialogTableVisible: false,
        innerVisible: false,
        distributorId: "",
        distributorName: "",
        distributorLevel: "",
        activeName: "first",
        tableData: [{
            "settleTime": "2018-07-03 16:18:15",
            "orderNum": "201807031618141262057",
            "takeGoodsNum": "1123456789",
            "feeType": "充值",
            "fundDirection": "支出",
            "szAmount": "2000",
          },{
            "settleTime": "2018-07-06 16:18:15",
            "orderNum": "201807031618141262058",
            "takeGoodsNum": "2123456789",
            "feeType": "充值",
            "fundDirection": "收入",
            "szAmount": "1000",
          }],
        takeIt: false,
        showIt:false,
        fundOptions: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '收入'
        }, {
          value: '2',
          label: '支出'
        }],
        feeOptions: [{
          value: "",
          label: '全部',
        },{
          value: "1",
          label: '违约金',
        }, {
          value: "2",
          label: '贷款',
        },{
          value: "3",
          label: '交易手续费',
        },{
          value: "4",
          label: '仓储费',
        },{
          value: "5",
          label: '运费',
        },{
          value: "6",
          label: '充值',
        },{
          value: "7",
          label: '提现',
        },{
          value: "8",
          label: '调货提成',
        },{
          value: "9",
          label: '发票递送费',
        },{
          value: "10",
          label: '折扣费用',
        }],
        optionsEdit: [{
            value: "1",
            label: '增加配额',
          },
          {
            value: "2",
            label: '减少配额',
          }
        ],
        quotasType: '',
        quotasNumber: '',
        value: '',
        gridData: [],
        distributorLevel: "",
        rowId: "",
        comfirmStatus:"",
        optionsEditSearch: [{
            value: "",
            label: '全部',
          },
          {
            value: "0",
            label: '待配售',
          },
          {
            value: "1",
            label: '已配售',
          },
          {
            value: "2",
            label: '减少配额待确认',
          },
          {
            value: "3",
            label: '增加配额待确认',
          },
          {
            value: "4",
            label: '尾款待结',
          },
          {
            value: "5",
            label: '已确认',
          },
          {
            value: "6",
            label: '已结束',
          }
        ],
      }
    },
  }
</script>
<style >
  .el-select {
    width: 100%;
  }
</style>
