<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="提货单号：">
        <el-input v-model="formInline.user" placeholder="提货单号"></el-input>
    </el-form-item>
    <el-form-item label="茶企提货单号：">
        <el-input v-model="formInline.user" placeholder="茶企提货单号"></el-input>
    </el-form-item>
    <el-form-item label="商品名称：">
        <el-input v-model="formInline.user" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="物流单号：">
        <el-input v-model="formInline.user" placeholder="物流单号"></el-input>
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
        <el-select v-model="formInline.region" placeholder="当前状态：">
        <el-option label="待付款" value="shanghai"></el-option>
        <el-option label="已付款" value="beijing"></el-option>
        <el-option label="出库中" value="nanjing"></el-option>
        <el-option label="已发货" value="anhui"></el-option>
        <el-option label="已到店" value="anhui"></el-option>
        <el-option label="确认取货" value="anhui"></el-option>
        <el-option label="待取货" value="anhui"></el-option>
        <el-option label="待收货" value="anhui"></el-option>
        <el-option label="已取消" value="anhui"></el-option>
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
        <el-tab-pane label="我的提货" name="first"></el-tab-pane>
        <el-tab-pane label="买家提货" name="second"></el-tab-pane>
    </el-tabs>
    <el-table :data="stock" border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="提货单号"  width="180">
        <template slot-scope="scope">
            <span>123456789012345678</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品货号">
        <template slot-scope="scope">
            <span>f1234567890</span><br>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="商品名称">
        <template slot-scope="scope">
            <span>下关普洱茶</span>
        </template>
        </el-table-column>     
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="提货数量">
        <template slot-scope="scope">
            <span>{{scope.row.releaseCountTotal}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip sortable align="center" label="申请时间" width="120">
        <template slot-scope="scope">
            <span>2018-03-02 12:12:12</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="茶企">
        <template slot-scope="scope">
            <span>茶企001</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="提货方式">
        <template slot-scope="scope">
            <span>快递</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="仓储费">
        <template slot-scope="scope">
            <span>100</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="当前状态">
        <template slot-scope="scope">
            <span>待取货</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="茶企提货单号" width="180">
        <template slot-scope="scope">
            <span>123456789012345678</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" fixed="right" label="操作" width="180">
        <template slot-scope="scope">
            <span><a @click="dialogVisible = !dialogVisible">物流信息</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认到店</span>
        </template>
        </el-table-column>
    </el-table>
    <div class="block" style="">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog
    title="提货信息"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <el-steps :active="3" align-center style="height:240px;padding-top:100px">
      <el-step title="提交提货申请" icon="el-icon-edit-outline"></el-step>
      <el-step title="确认提货信息" icon="el-icon-search"></el-step>
      <el-step title="商品出库" icon="el-icon-upload"></el-step>
      <el-step title="商品到指定门店" icon="el-icon-sold-out"></el-step>
      <el-step title="门店发货" icon="el-icon-time"></el-step>
      <el-step title="完成" icon="el-icon-circle-check"></el-step>
    </el-steps>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
    // this.getData()
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
      total: 1,
      activeName: "first",
      formInline: {
        user: "",
        region: ""
      },
      value13: "",
      fullscreenLoading: "",
      stock: [
        { releaseCountTotal: 1 },
        { releaseCountTotal: 2 },
        { releaseCountTotal: 3 },
        { releaseCountTotal: 4 },
        { releaseCountTotal: 1 },
        { releaseCountTotal: 1 },
        { releaseCountTotal: 1 },
        { releaseCountTotal: 1 },
        { releaseCountTotal: 6 },
        { releaseCountTotal: 4 },
        { releaseCountTotal: 2 },
        { releaseCountTotal: 1 }
      ],
      dialogVisible: false
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
</style>