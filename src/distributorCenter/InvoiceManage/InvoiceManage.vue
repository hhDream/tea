<template>
<div >
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="订单编号：">
        <el-input v-model="takeTeaOrderCode" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item label="申请时间：">
        <el-date-picker
      v-model="startTime"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
    </el-form-item> 
    <el-form-item label="当前状态：">
        <el-select v-model="status" placeholder="当前状态">
        <el-option label="全部" value="0"></el-option>
        <el-option label="已开票" value="2"></el-option>
        <el-option label="未开票" value="1"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="交易类型：">
        <el-select v-model="orderType" placeholder="交易类型">
        <el-option label="商城交易" value="2"></el-option>
        <el-option label="新茶抢购" value="1"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" @click="search()" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default" @click="reset()">重置</el-button>
    </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="已开票" name="2"></el-tab-pane>
        <el-tab-pane label="未开票" name="1"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="订单编号">
        <template slot-scope="scope">
            <span>201802011422332256526</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="申请时间">
        <template slot-scope="scope">
            <span>2018-02-01 14:22:33</span><br>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="开票金额">
        <template slot-scope="scope">
            <span>0.07</span>
        </template>
        </el-table-column>     
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="纳税人识别码">
        <template slot-scope="scope">
            <span>156515156156151</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="发票类型">
        <template slot-scope="scope">
            <span>普通发票</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="交易类型">
        <template slot-scope="scope">
            <span>商城交易</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="当前状态">
        <template slot-scope="scope">
            <span>未开票</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="操作" width="180">
        <template slot-scope="scope">
            <span><a @click="centerDialogVisible = !centerDialogVisible">发票详情</a>&nbsp;&nbsp;&nbsp;&nbsp;<a @click="centerDialogVisible2 = !centerDialogVisible2">填写物流单号</a></span>
        </template>
        </el-table-column>
    </el-table>
    <div class="block" style="">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="centerDialogVisible" title="发票详情" width="35%" :before-close="handleClose" center>
      <el-row style="margin-top:-20px">
        <el-col :span="8">订单号:</el-col>
        <el-col :span="13">
          普通发票
        </el-col>
        <el-col :span="8">纳税人识别码:</el-col>
        <el-col :span="13">
          3566136136
        </el-col>
        <el-col :span="8">发票内容:</el-col>
        <el-col :span="13">
          明细
        </el-col>
        <el-col :span="8">发票抬头:</el-col>
        <el-col :span="13">
          个人
        </el-col>
        <el-col :span="8">收票人姓名:</el-col>
        <el-col :span="13">
          周杰伦
        </el-col>
        <el-col :span="8">收票人手机号:</el-col>
        <el-col :span="13">
          13338630230
        </el-col>
        <el-col :span="8">收票人地址:</el-col>
        <el-col :span="13">
          北京市 市辖区 东城区 匿名公公婆婆
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="centerDialogVisible2" title="填写物流单号" width="35%" :before-close="handleClose" center>
      <el-row class="dialog2">
        <el-col :span="8" style="margin-top:20px">收票人姓名:</el-col>
        <el-col :span="13">
          杨成
        </el-col>
        <el-col :span="8">收票人手机号:</el-col>
        <el-col :span="13">
          <el-input>13338630230</el-input>
        </el-col>
        <el-col :span="8" style="margin-top:20px">收票人地址:</el-col>
        <el-col :span="13">
          北京市 市辖区 东城区 匿名公公婆婆
        </el-col>
        <el-col :span="8">快递公司:</el-col>
        <el-col :span="13">
          <el-select v-model="formInline.region" placeholder="请选择快递公司">
            <el-option :label="v" :value="i" v-for="(v,i) in companys" :key="i"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">快递单号:</el-col>
        <el-col :span="13">
          <el-input></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">确 定</el-button>
        <el-button type="primary" @click="centerDialogVisible2 = false">关 闭</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      http: this.$store.state.dialog.http,
      currentPage: 1,
      showCount: 10,
      total: 0,
      activeName: "0",
      formInline: {
        user: "",
        region: ""
      },
      value13: "",
      centerDialogVisible: false,
      centerDialogVisible2: false,
      companys: [
        "圆通快递",
        "中通快递",
        "EMS",
        "宅急送",
        "德邦快递",
        "韵达快递",
        "汇通快递",
        "天天快递",
        "百世快递",
        "顺丰快递",
        "申通快递",
        "京东速递",
        "苏宁快递"
      ],
    };
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
      var date_value1 = "";
      var date_value2 = "";
      if (this.startTime.length != 0) {
        var date1 = new Date(this.startTime[0]);
        var date2 = new Date(this.startTime[1]);
        date_value1 =
          date1.getFullYear() +
          "-" +
          (date1.getMonth() + 1 < 10
            ? "0" + (date1.getMonth() + 1)
            : date1.getMonth() + 1) +
          "-" +
          (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate()) +
          " " +
          "00:00:00";
        date_value2 =
          date2.getFullYear() +
          "-" +
          (date2.getMonth() + 1 < 10
            ? "0" + (date2.getMonth() + 1)
            : date2.getMonth() + 1) +
          "-" +
          (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate()) +
          " " +
          date2.getHours() +
          ":" +
          date2.getMinutes() +
          ":" +
          date2.getSeconds();
      }
      this.axios
        .post(
          this.http + "/interface/pc/distributor/pcBank/showInvoice",
          qs.stringify({
            distributorCode: this.getCookie("distributorCode"),
            currentPage: this.currentPage,
            pageSize: this.showCount,
            status: this.status,
            startTime: date_value1,
            endTime: date_value2,
            takeTeaOrderCode: this.takeTeaOrderCode,
            orderType: this.orderType,
            type: 2
          })
        )
        .then(res => {
          this.tableData = JSON.parse(res.data.data).list;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        });
    },
    handleClick(row) {
    },
    handleSizeChange(data) {
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
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less' scoped>
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
.el-col-8 {
  margin-top: 20px;
  text-align: right;
  padding-right: 20px;
}
.el-col-13 {
  margin-top: 20px;
}
.dialog2 > .el-col-8 {
  margin-top: 30px;
  text-align: right;
  // padding-right: 20px;
}
</style>