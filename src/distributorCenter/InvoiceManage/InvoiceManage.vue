<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="订单编号：">
        <el-input v-model="formInline.user" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item label="申请时间：">
        <el-date-picker
      v-model="value13"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
    </el-form-item> 
    <el-form-item label="当前状态：">
        <el-select v-model="formInline.region" placeholder="当前状态">
        <el-option label="全部" value="shanghai"></el-option>
        <el-option label="已开票" value="beijing"></el-option>
        <el-option label="未开票" value="nanjing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="交易类型：">
        <el-select v-model="formInline.region" placeholder="交易类型">
        <el-option label="商城交易" value="shanghai"></el-option>
        <el-option label="新茶抢购" value="beijing"></el-option>
        <el-option label="补开发票" value="nanjing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default">重置</el-button>
    </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="已开票" name="second"></el-tab-pane>
        <el-tab-pane label="未开票" name="third"></el-tab-pane>
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
          this.http + "/interface/pc/personal/pcEnterprise/myStore",
          qs.stringify({
            releaseEnterpriseId: this.enterpriseCode,
            currentPage: this.currentPage,
            showCount: this.showCount,
            goodsName: this.goodsName,
            goodsCode: this.goodsCode
          })
        )
        .then(res => {
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          console.log(JSON.parse(res.data.data));
          this.currentPage = JSON.parse(res.data.data).currentPage;
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
    }
  },
  created() {
    this.getData();
  },
  data() {
    return {
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
      fullscreenLoading: false
    };
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