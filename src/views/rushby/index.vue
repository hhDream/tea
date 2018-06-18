<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的抢购</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品名</span>
          <el-input v-model="goodsName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">开始日期</span>
          <el-date-picker v-model="releaseBeginTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">活动状态</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <!-- <el-button style="margin-top: 19px;" icon="el-icon-search" type="primary" plain></el-button> -->
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button type="success" @click="getquotalist_getExcel">导出EXCEL</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="序号" width="150">
      </el-table-column>
      <el-table-column prop="releaseCode" label="活动编码" width="120">
      </el-table-column>
      <el-table-column prop="releaseType" label="活动类型" width="120">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="goodsCode" label="商品代码" width="300">
      </el-table-column>
      <el-table-column prop="warehousingCount" label="库存总量" width="120">
      </el-table-column>
      <el-table-column prop="orderQuantity" label="配订货总量" width="120">
      </el-table-column>
      <el-table-column prop="shlfRetentionCount" label="自留总量" width="120">
      </el-table-column>
      <el-table-column prop="partakeAllomentCount" label="抢购总量" width="120">
      </el-table-column>
      <el-table-column prop="releasePrice" label="抢购价格" width="120">
      </el-table-column>
      <el-table-column prop="rushBuyType" label="配售规则" width="120">
      </el-table-column>
      <el-table-column prop="stockCount" label="已售数量" width="120">
      </el-table-column>
      <el-table-column prop="releaseBeginTime" label="活动开始时间" width="120">
      </el-table-column>
      <el-table-column prop="releaseEndTime" label="活动结束时间" width="120">
      </el-table-column>
      <el-table-column prop="releaseStatus" label="确认状态" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
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
    methods: {
      getData() {
        this.axios.post("https://ent.teaexs.com/platform/interface/pc/personal/pcAllotment/pcAllotmentList", qs.stringify({
          releaseEnterpriseId: this.enterpriseCode,
          currentPage: this.currentPage,
          showCount: this.showCount,
          goodsName: this.goodsName,
          releaseBeginTime: this.releaseBeginTime,
          releaseStatus: this.value
        })).then(res => {
          console.log(JSON.parse(res.data.data).totalPage);
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
          for (let index = 0; index < this.tableData.length; index++) {
            if (this.tableData[index].releaseStatus == 1) {
              this.tableData[index].releaseStatus = "待配售"
            } else if (this.tableData[index].releaseStatus == 2) {
              this.tableData[index].releaseStatus = "已配售"
            } else if (this.tableData[index].releaseStatus == 5) {
              this.tableData[index].releaseStatus = "已发行"
            } else if (this.tableData[index].releaseStatus == 6) {
              this.tableData[index].releaseStatus = "待结算"
            } else if (this.tableData[index].releaseStatus == 7) {
              this.tableData[index].releaseStatus = "已结束"
            }
          }
          for (let index = 0; index < this.tableData.length; index++) {
            if (this.tableData[index].releaseType == 1) {
              this.tableData[index].releaseType = "封闭"
            } else {
              this.tableData[index].releaseType = "公开"
            }
          }
          for (let index = 0; index < this.tableData.length; index++) {
            if (this.tableData[index].rushBuyType == 1) {
              this.tableData[index].rushBuyType = "被动配售"
            } else {
              this.tableData[index].rushBuyType = "主动订货"
            }
          }
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
      },
      getquotalist_getExcel() {
        location.href = this.http + "/interface/pc/personal/pcAllotment/allotmentExprot?releaseEnterpriseId=" + this.enterpriseCode
      }
    },
    created() {
      this.getData()
    },
    data() {
      return {
        goodsName: '',
        releaseBeginTime: '',
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        total: 1,
        currentPage: 1,
        showCount: 2,
        tableData: [{}],
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '待配售'
        }, {
          value: '2',
          label: '已配售'
        }, {
          value: '5',
          label: '已发行'
        }, {
          value: '6',
          label: '待结算'
        }, {
          value: '7',
          label: '已结束'
        }],
        value: ''
      }
    },
  }
</script>
