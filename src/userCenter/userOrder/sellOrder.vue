<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/myUserCenter/purchaseOrder' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>购买订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">订单编号</span>
          <el-input v-model="orderCode" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品名称</span>
          <el-input v-model="goodsName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span class="demonstration">订单类型</span>
          <el-select v-model="orderType" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button @click="orderNum=goodsName=value=times=''">重置</el-button>
        </div>
      </el-col>
    </el-row>

    <el-tabs v-model="state" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="0" ></el-tab-pane>
      <el-tab-pane label="待付款" name="1" ></el-tab-pane>
      <el-tab-pane label="交易完成" name="2" ></el-tab-pane>
      <el-tab-pane label="已取消" name="4" ></el-tab-pane>
    </el-tabs>

    <el-table :data="tableData" border style="width: 100%">
          <!-- <el-table-column sortable  fixed prop="id" label="序号">
          </el-table-column> -->
          <el-table-column prop="orderNum" label="订单编号" width="200">
          </el-table-column>
          <el-table-column prop="goodsInfo" label="商品信息" width="240">
            <template slot-scope="scope">
              <div class="sp_info">
                <div class="sp_cover">
                  <img src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=32b52bc5f51f4134f43a0d2c4476feaf/b999a9014c086e06893e896d0a087bf40ad1cb06.jpg">
                </div>
                <div class="sp_content">
                  <span>{{scope.row.goodsInfo}}</span><br>
                  <span class="sp_code">商品代码：CS2018030601</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="100">
          </el-table-column>
          <el-table-column prop="seller" label="卖家" width="140">
          </el-table-column>
          <el-table-column prop="countTotal" label="商品数量">
            <template slot-scope="scope">
              <span>{{ scope.row.countTotal?scope.row.countTotal:0}} {{scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="payment" label="实付款">
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型">
          </el-table-column>
          <el-table-column prop="currentState" label="当前状态">
          </el-table-column>
          <el-table-column prop="action" label="操作">
            <template slot-scope="scope">
              <el-button @click="$router.openPage('/buyListDetail')" type="text">{{ scope.row.action}}</el-button>
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
      fullscreenLoading: false,
      orderCode: "",
      goodsName: "",
      orderType: "",
      state: "0",
      http: this.$store.state.dialog.http,
      total: 1,
      currentPage: 1,
      showCount: 10,
      tableData: [
        {
          orderNum: "201807031618141262057",
          goodsInfo: "商品信息1",
          orderTime: "2018-07-03 16:18:15",
          seller: "广东广州芳村新华裕市场旗舰店",
          countTotal: "100",
          unit: "盒",
          payment: "2000.0元",
          orderType: "商城交易",
          currentState: "交易取消",
          action: "订单详情"
        },
        {
          orderNum: "201807031618141262058",
          goodsInfo: "商品信息2",
          orderTime: "2018-07-04 16:18:15",
          seller: "广东广州芳村新华裕市场旗舰店22",
          countTotal: "10",
          unit: "千克",
          payment: "1000.0元",
          orderType: "商城交易",
          currentState: "交易取消",
          action: "订单详情"
        }
      ],
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "新茶抢购"
        },
        {
          value: "2",
          label: "商城交易"
        },
        {
          value: "3",
          label: "补开发票"
        }
      ]
    };
  },
  methods: {
    getData() {
      this.fullscreenLoading = true;
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcOrder/myOrder",
          qs.stringify({
            loginPhone: this.getCookie("LOGIN_PHONE"),
            currentPage: this.currentPage,
            pageSize: "",
            goodsName: this.goodsName,
            orderCode: this.orderCode,
            priceSort: this.priceSort,
            state: this.state,
            orderType: this.orderType,
            type:2
          })
        )
        .then(res => {
          this.fullscreenLoading = false;
          if (res.data.code == 200) {
          }
        });
    },
    search() {
      this.getData();
    },
    handleClick() {
      this.getData();
    },
    handleSizeChange() {
      this.getData();
    },
    handleCurrentChange() {
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
<style lang="less" scoped>
.el-select {
  width: 100%;
}
.sp_info {
  display: flex;
}
.sp_cover {
  width: 55px;
  height: 80%;
  > img {
    display: block;
    width: 45px;
    height: 45px;
    margin-top: 2px;
  }
}
.sp_content {
  width: 70%;
  text-align: left;
  .sp_code {
    font-size: 12px;
    color: #999;
  }
}
</style>
