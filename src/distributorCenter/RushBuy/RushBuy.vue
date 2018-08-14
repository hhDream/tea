<template>
<div>
  <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/distributorCenter/banlance' }">企业中心</el-breadcrumb-item>
  <el-breadcrumb-item >新茶申购</el-breadcrumb-item>
  <el-breadcrumb-item>抢购通知</el-breadcrumb-item>
</el-breadcrumb>
  <el-row class="myCenter" :gutter="20">
    <el-col :span="12" style="padding-right: 10px;padding-left:0">
      <div class="grid-content bg-purple">
        <div class="rb_title">我的资产</div>
        <div>可用余额:</div>
        <div class="rb_money">￥{{allData.availableFunds}}</div>
        <el-button class="rb_button">充值</el-button>
        <div class="rb_place">为了不影响您参与新茶抢购，请确保您的账户可用余额足够支付货款！</div>
      </div>
    </el-col>
    <el-col class="myCenter_right" :span="12">
      <div class="grid-content bg-purple">
        <div class="fl" id="indicatorContainer">
          <div class="time-graph">
            <el-progress id="time-graph-canvas" color="#85d824" type="circle" :percentage="bfb" :width="152" :show-text="false"></el-progress>
          </div>
          <div class="sum">
            <p>账户余额
              <i>(元)</i>
            </p>
            <h5 id="my_balance">{{allData.capitalBalance}}</h5>
          </div>
        </div>
        <div class="fl usable">
          <p class="p1">
            <em></em>可用余额
            <span id="my_balance_useable"> {{allData.availableFunds}}元</span>
          </p>
          <p class="p2">
            <em></em>冻结资金
            <span id="my_balance_frozen"> {{allData.capitalBalance-allData.availableFunds}}元</span>
          </p>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-table :data="allData.list" border style="width: 100%;margin-top:30px" slot="empty">
    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品代码">
    </el-table-column>
    <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品名称">
    </el-table-column>
    <el-table-column prop="partakeAllomentCountTotal" show-overflow-tooltip align="center" label="抢购总量">
    </el-table-column>
    <el-table-column prop="releasePrice" show-overflow-tooltip align="center" label="抢购价格">
    <template slot-scope="scope">
        <span>{{scope.row.releasePrice}}/{{scope.row.benchmarkingUnit3}}</span>
    </template>
    </el-table-column>
    <el-table-column prop="rationCount" show-overflow-tooltip align="center" label="配售到数量" width="100">
    <template slot-scope="scope">
        <span>{{scope.row.rationCount}}{{scope.row.benchmarkingUnit3}}</span>
    </template>
    </el-table-column>
    <el-table-column prop="bondAmount" show-overflow-tooltip align="center" label="预支付货款总额">
    <template slot-scope="scope">
        <span>{{scope.row.bondAmount}}元</span>
    </template>
    </el-table-column>
    <el-table-column prop="releaseBeginTime" show-overflow-tooltip align="center" label="抢购开始时间">
    </el-table-column>
    <el-table-column prop="finalConfirmationTime" show-overflow-tooltip align="center" label="支付截止时间">
    </el-table-column>
    <el-table-column prop="shlfRetentionCount" show-overflow-tooltip align="center" label="自留数量">
    <template slot-scope="scope">
        <span>{{scope.row.shlfRetentionCount}}{{scope.row.benchmarkingUnit3}}</span>
    </template>
    </el-table-column>
	<el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="操作" width="200">
    <template slot-scope="scope" style="color">
        <a @click="centerDialogVisible=!centerDialogVisible">设置自留数量</a>
        <a @click="$router.openPage('/teaMallProduct')">抢购商品详情</a>
    </template>
    </el-table-column>
  </el-table>
  <div class="block" style="">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
      :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
  <el-dialog
    :visible.sync="centerDialogVisible"
    title="设置自留数量"
    width="40%"
    :before-close="handleClose" center>
    <el-row>
      <el-col :span="6" style="margin-top:10px">参与发行数量</el-col>
      <el-col :span="13">
        <el-input></el-input>
      </el-col>
      <el-col :span="6" style="margin-top:30px">自留数量</el-col>
      <el-col :span="13" style="margin-top:20px">
        <el-input></el-input>
      </el-col>
      <el-col :span="6" style="margin-top:30px">订货数量</el-col>
      <el-col :span="13" style="margin-top:20px">
        <el-input></el-input>        
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">提 交</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      warning_row: "warning_row",
      person: {},
      allotment: [],
      allData: [],
      tableData: [],
      http: this.$store.state.dialog.http,
      distributorCode:this.$getcookie('distributorCode'),
      capitalBalance:'',
      currentPage: 1,
      showCount: 10,
      total: 0,
      centerDialogVisible: false,
      bfb: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/distributor/pcAllotment/rushNotice",
          qs.stringify({
            distributorCode: this.distributorCode,
            currentPage:this.currentPage,
            pageSize:this.pageSize
          })
        )
        .then(res => {
          console.log( JSON.parse(res.data.data));
          if (res.data.code == 200) {
            this.allData = JSON.parse(res.data.data);
            this.total=JSON.parse(res.data.data).total;
            this.currentPage=JSON.parse(res.data.data).currentPage;
            this.bfb=+(+this.allData.capitalBalance-+this.allData.availableFunds)/+this.allData.capitalBalance
          } else {
            this.open(res.data.data.message);
          }
        })
        .catch(err => {
          this.open(err);
        });
    },
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(data) {
      console.log(data);
      this.showCount = data;
      this.getData();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getData();
    },
    search() {
      this.getData();
    },
    //删除cookie
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      this.$router.openPage("/login");
      location.reload();
    },

    open(err) {
      this.$alert("网络错误请求失败!", "错误", {
        confirmButtonText: "确定",
        callback: action => {
          this.delCookie("LOGIN_PHONE");
          this.$router.openPage("/login");
          this.$message({
            type: "info",
            message: `错误原因: ${err}`
          });
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.myCenter {
  padding: 25px 30px;
  background-color: #fff;
  box-shadow: 0 0 15px #eee;
  border: 1px solid #e9e9e9;
  width: 100%;
  margin: 0 !important;
}
.rb_title {
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
}
.rb_money {
  color: #db4b29;
  font-size: 26px;
  font-weight: bold;
}
.rb_button {
  width: 150px;
  text-align: center;
  height: 40px;
  background: #db4b29;
  color: white;
}
.rb_place {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.myCenter_right {
  border-left: 1px dashed #ececec;
}
.fl {
  float: left;
  /* display: inline-block; */
}
.fr {
  float: right;
  display: inline-block;
}
.txt {
  margin: 5px 0 0 10px;
  width: 180px;
}
#indicatorContainer {
  position: relative;
  min-width: 152px;
  margin: 0px 0 0 54px;
}
.sum {
  position: absolute;
  left: 20px;
  top: 57px;
  width: 110px;
  text-align: center;
}
.sum p {
  font-size: 12px;
  font-weight: bold;
  margin: 0 0 2px;
}
.sum h5 {
  margin: 0;
  font-size: 18px;
  color: #db4b29;
}
.sum i {
  font-style: normal;
}
.usable {
  margin: 20px 0 0 45px;
  line-height: 25px;
}
.usable .p1 em {
  background-color: #85d824;
}
.usable .p2 em {
  background-color: #e5e9f2;
}
.usable p em {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 10px 0 0;
}
.buttons {
  margin: 110px 0 0;
  position: absolute;
  right: 60px;
}
.table-box {
  margin-top: 20px;
  font-size: 12px;
}
.table-box h4 {
  font-size: 16px;
  font-weight: bold;
}
.table-box h4 a {
  font-size: 14px;
  font-weight: normal;
  color: #0166bb;
  padding: 0 10px;
}
.el-icon-menu:before {
  /* margin-left: -10px; */
  color: #b4b4b4;
}
.sp_info {
  display: flex;
}
.sp_cover {
  width: 30%;
  height: 80%;
  > img {
    display: block;
    width: 45px;
    height: 45px;
    margin-top: 4px;
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