<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">提货管理</el-breadcrumb-item>
      <el-breadcrumb-item>提货明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">提货单号</span>
          <el-input v-model="takeOrderNum" clearable></el-input>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品名称</span>
          <el-input v-model="goodsName" clearable></el-input>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">当前状态</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-bottom:20px" :gutter="20">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span class="demonstration">时间</span>
            <el-date-picker style="width:100%" v-model="times" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="10" style="margin-left:10px">
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button @click="takeOrderNum=goodsName=value=times=''">重置</el-button>
          <el-button type="success" @click="getquotalist_getExcel">导出EXCEL</el-button>
        </el-col>
        
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column sortable  fixed prop="id" label="序号">
      </el-table-column> -->
      <el-table-column prop="takeOrderNum" label="提货单号" width="200">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称">
      </el-table-column>
      <el-table-column prop="takeNum" label="提货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.takeNum?scope.row.takeNum:0}} {{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="applicationTime" label="申请时间" width="100">
      </el-table-column>
      <el-table-column prop="store" label="门店">
      </el-table-column>
      <el-table-column prop="takePattern" label="提货方式">
      </el-table-column>
      <el-table-column prop="warehousingFee" label="仓储费">
      </el-table-column>
      <el-table-column prop="courierFee" label="快递费">
      </el-table-column>
      <el-table-column prop="currentState" label="当前状态">
      </el-table-column>
      <el-table-column prop="action" label="操作">
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
        takeOrderNum: '',
        goodsName: '',
        value: '',
        times: '',
        releaseBeginTime: '',
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
            "takeOrderNum": "201807031618141262057",
            "goodsName": "商品1",
            "takeNum": "100",
            "unit": "盒",
            "applicationTime": "2018-07-03 16:18:15",
            "store": "张三的店",
            "takePattern": "提货方式1",
            "warehousingFee": "200.0元",
            "courierFee": "200.0元",
            "currentState": "已取消",
            "action": "操作1",
          },{
            "takeOrderNum": "201807031618141262058",
            "goodsName": "商品2",
            "takeNum": "200",
            "unit": "千克",
            "applicationTime": "2018-07-03 16:28:15",
            "store": "李四的店",
            "takePattern": "提货方式2",
            "warehousingFee": "220.0元",
            "courierFee": "220.0元",
            "currentState": "已取消",
            "action": "操作2",
          }],
        takeIt: false,
        showIt:false,
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '代付费'
        }, {
          value: '2',
          label: '已付款'
        }, {
          value: '3',
          label: '出库中'
        }, {
          value: '4',
          label: '已到店'
        }, {
          value: '5',
          label: '已发货'
        }, {
          value: '6',
          label: '待取货'
        }, {
          value: '7',
          label: '已完成'
        }, {
          value: '8',
          label: '已取消'
        }],
        optionsIn: [{
            value: "",
            label: '全部',
          },
          {
            value: "JXSLEVEL001",
            label: '一级',
          }, {
            value: "JXSLEVEL002",
            label: '二级',
          },
          {
            value: "JXSLEVEL003",
            label: '三级',
          }
        ],
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
        pickerOptions2:'',
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
