<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
  <el-row class="myCenter" :gutter="20">
    <el-col :span="12" style="padding-right: 10px;padding-left:0">
      <div class="grid-content bg-purple">
        <div class="rb_title">我的资产</div>
        <div>可用余额:</div>
        <div class="rb_money">￥0.95</div>
        <el-button class="rb_button">充值</el-button>
        <div class="rb_place">为了不影响您参与新茶抢购，请确保您的账户可用余额足够支付货款！</div>
      </div>
    </el-col>
    <el-col class="myCenter_right" :span="12">
      <div class="grid-content bg-purple">
        <div class="fl" id="indicatorContainer">
          <div class="time-graph">
            <el-progress id="time-graph-canvas" color="#85d824" type="circle" :percentage="100" :width="152" :show-text="false"></el-progress>
          </div>
          <div class="sum">
            <p>账户余额
              <i>(元)</i>
            </p>
            <h5 id="my_balance">{{person.capitalBalance}}</h5>
          </div>
        </div>
        <div class="fl usable">
          <p class="p1">
            <em></em>可用余额
            <span id="my_balance_useable"> {{person.capitalBalance}}元</span>
          </p>
          <p class="p2">
            <em></em>冻结资金
            <span id="my_balance_frozen"> 0.00</span>
          </p>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-table :data="stock" border style="width: 100%;margin-top:30px" slot="empty">
    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品代码">
    <template slot-scope="scope">
        <span>CS2018030601</span>
    </template>
    </el-table-column>
    <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品名称">
    <template slot-scope="scope">
        <span class="sp_code">下关普洱茶</span>
    </template>
    </el-table-column>
    <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="抢购总量">
    <template slot-scope="scope">
        <span>100片</span>
    </template>
    </el-table-column>
    <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="抢购价格">
    <template slot-scope="scope">
        <span>100/片</span>
    </template>
    </el-table-column>
    <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="配售到数量" width="100">
    <template slot-scope="scope">
        <span>150片</span>
    </template>
    </el-table-column>
    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="预支付货款总额">
    <template slot-scope="scope">
        <span>15000</span>
    </template>
    </el-table-column>
    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="抢购开始时间">
    <template slot-scope="scope">
        <span>2018-03-02 12:12:12</span>
    </template>
    </el-table-column>
    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="支付截止时间">
    <template slot-scope="scope">
        <span>2018-03-02 12:12:12</span>
    </template>
    </el-table-column>
    <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="自留数量">
    <template slot-scope="scope">
        <span>100</span>
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
      enterpriseCode: this.$store.state.dialog.enterpriseCode,
      http: this.$store.state.dialog.http,
      person: {},
      allotment: [],
      stock: [],
      fullscreenLoading: false,
      tableData: [],
      http: this.$store.state.dialog.http,
      enterpriseCode: this.$store.state.dialog.enterpriseCode,
      currentPage: 1,
      showCount: 10,
      goodsName: "",
      goodsCode: "",
      total: 0,
      activeName: "first",
      formInline: {
        user: "",
        region: ""
      },
      centerDialogVisible: false,
      stu: ""
    };
  },
  created() {
    this.getData();
    console.log(this.$store.state.dialog);
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    releaseStatusFmt(row, column) {
      return row.releaseStatus == 1
        ? "待配售"
        : row.releaseStatus == 2
          ? "已配售"
          : row.releaseStatus == 5
            ? "已发行"
            : row.releaseStatus == 6
              ? "待结算"
              : row.releaseStatus == 7 ? "已结束" : "";
    },
    getData() {
      this.fullscreenLoading = false;
      this.axios
        .post(
          this.http + "/interface/pc/personal/pcEnterprise/enterpriseInfo",
          qs.stringify({
            enterpriseId: this.enterpriseCode
          })
        )
        .then(res => {
          this.fullscreenLoading = false;
          console.log(res.data.data);
          if (res.data.code == 200) {
            this.person = JSON.parse(res.data.data).enterprise;
            this.stock = JSON.parse(res.data.data).stock;
            this.allotment = JSON.parse(res.data.data).allotment;
            console.log(JSON.parse(res.data.data));
            if (this.allotment.releaseStatus == 1) {
              this.allotment.releaseStatus = "待配售";
            } else if (this.allotment.releaseStatus == 2) {
              this.allotment.releaseStatus = "已配售";
            } else if (this.allotment.releaseStatus == 5) {
              this.allotment.releaseStatus = "已发行";
            } else if (this.allotment.releaseStatus == 7) {
              this.allotment.releaseStatus = "已结束";
            } else if (this.allotment.releaseStatus == 6) {
              this.allotment.releaseStatus = "待结算";
            }
          } else {
            this.open(res.data.data.message);
          }
        })
        .catch(err => {
          this.fullscreenLoading = false;
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

    //读取cookie，需要注意的是cookie是不能存中文的，如果需要存中文，解决方法是后端先进行编码encode()，前端取出来之后用decodeURI('string')解码。（安卓可以取中文cookie，IOS不行）
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return true;
        // return (arr[2]);
      } else {
        return false;
      }
    },
    open(err) {
      this.$alert("网络错误请求失败!", "错误", {
        confirmButtonText: "确定",
        callback: action => {
          this.delCookie("JSESSIONID");
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