<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userStock' }">提货管理</el-breadcrumb-item>
      <el-breadcrumb-item>提货明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">提货单号</span>
          <el-input v-model="takeTeaOrderCode" clearable></el-input>
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
          <el-select v-model="state" placeholder="请选择">
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
        </el-col>
        
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column sortable  fixed prop="id" label="序号">
      </el-table-column> -->
      <el-table-column prop="takeTeaOrderCode" show-overflow-tooltip align="center" label="提货单号" width="200">
      </el-table-column>
      <el-table-column prop="coodsName" show-overflow-tooltip align="center" label="商品名称">
      </el-table-column>
      <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="提货数量">
      </el-table-column>
      <el-table-column prop="applyTime" show-overflow-tooltip align="center" label="申请时间" width="100">
      </el-table-column>
      <el-table-column prop="distributorName" show-overflow-tooltip align="center" label="门店">
      </el-table-column>
      <el-table-column prop="takeTeaType" show-overflow-tooltip align="center" label="提货方式">
        <template slot-scope="scope">
            <span>{{ scope.row.takeTeaType == 1?'快递':'自提' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="warehousingFee" show-overflow-tooltip align="center" label="仓储费">
      </el-table-column>
      <el-table-column prop="expressFee" show-overflow-tooltip align="center" label="快递费">
      </el-table-column>
      <el-table-column prop="status" show-overflow-tooltip align="center" label="当前状态">
        <template slot-scope="scope">
            <span>{{ st[+scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="action" show-overflow-tooltip align="center" label="操作">
        <template slot-scope="scope">
            <span>{{ scope.row.status == 6?'确认收货':'' }}</span>
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
import qs from "qs";
export default {
  inject: ["reload"],
  data() {
    return {
      state: "",
      times: [],
      takeTeaOrderCode: "",
      goodsName: "",
      http: this.$store.state.dialog.http,
      total: 1,
      currentPage: 1,
      showCount: 10,
      tableData: [
      ],
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "9",
          label: "待付款"
        },
        {
          value: "1",
          label: "已申请"
        },
        {
          value: "2",
          label: "出库中"
        },
        {
          value: "3",
          label: "已发货"
        },
        {
          value: "4",
          label: "已到店"
        },
        {
          value: "5",
          label: "待收货"
        },
        {
          value: "6",
          label: "待取货"
        },
        {
          value: "7",
          label: "已完成"
        },
        {
          value: "8",
          label: "已取消"
        }
      ],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      st:['','已申请','出库中','已发货','已到店','待取货','待收货','已取货','待支付','已取消']
    };
  },
  methods: {
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcTeaStore/myTeaOrder",
          qs.stringify({
            phone: this.getCookie("LOGIN_PHONE"),
            pageSize: this.showCount,
            currentPage: this.currentPage,
            goodsCode: this.goodsCode,
            goodsName: this.goodsName,
            countSort: this.countSort,
            takeTeaOrderCode: this.takeTeaOrderCode,
            enterLogisticsOrderId: this.enterLogisticsOrderId,
            state: this.state,
            startTime: this.times[0],
            endTime: this.times[1]
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.tableData = JSON.parse(res.data.data).list;
            this.currentPage = JSON.parse(res.data.data).currentPage;
            this.total = JSON.parse(res.data.data).total;
          }else{
            this.tableData = [];
            this.currentPage = 1;
            this.total = 0;
          }
        });
    },
    search() {
      this.getData();
    },
    handleClick() {
      this.getData();
    },
    handleSizeChange(data) {
      this.showCount = data;
      this.getData();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getData();
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return arr[2];
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style >
.el-select {
  width: 100%;
}
</style>
