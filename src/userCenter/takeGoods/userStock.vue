<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' }">提货管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的库存</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品代码</span>
          <el-input v-model="goodsNum" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品名称</span>
          <el-input v-model="goodsName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <!-- <el-button style="margin-top: 19px;" icon="el-icon-search" type="primary" plain></el-button> -->
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button @click="goodsNum=goodsName=''">重置</el-button>
          <el-button type="success" @click="getquotalist_getExcel">导出EXCEL</el-button>
        </div>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column sortable  fixed prop="id" label="序号">
      </el-table-column> -->
      <el-table-column prop="goodsNum" label="商品代码" width="200">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称">
      </el-table-column>
      <el-table-column prop="ownNum" label="持有数量">
        <template slot-scope="scope">
          <span>{{ scope.row.ownNum?scope.row.ownNum:0}} {{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="takenNum" label="已提货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.takenNum?scope.row.takenNum:0}} {{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="onSaleNum" label="上架数量">
        <template slot-scope="scope">
          <span>{{ scope.row.onSaleNum?scope.row.onSaleNum:0}} {{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="freezeNum" label="冻结数量">
        <template slot-scope="scope">
          <span>{{ scope.row.freezeNum?scope.row.freezeNum:0}} {{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作">
        <template slot-scope="scope">
          <el-button type="text">{{ scope.row.action}}</el-button>
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
        goodsNum: '',
        goodsName: '',
        value: '0',
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
            "goodsNum": "201807031618141262057",
            "goodsName": "商品1",
            "ownNum": "2000.0",
            "takenNum": "500.0",
            "onSaleNum": "100.0",
            "freezeNum": "1400.0",
            "unit": "盒",
            "action": "上架",
          },{
            "goodsNum": "201807031618141262058",
            "goodsName": "商品2",
            "ownNum": "200.0",
            "takenNum": "50.0",
            "onSaleNum": "10.0",
            "freezeNum": "140.0",
            "unit": "千克",
            "action": "下架",
          }],
        takeIt: false,
        showIt:false,
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '订单类型1'
        }, {
          value: '2',
          label: '订单类型2'
        }, {
          value: '3',
          label: '订单类型3'
        }, {
          value: '4',
          label: '订单类型4'
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
