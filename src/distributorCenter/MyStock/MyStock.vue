<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="商品代码：">
        <el-input v-model="formInline.user" placeholder="商品代码"></el-input>
    </el-form-item>
    <el-form-item label="商品名称：">
        <el-input v-model="formInline.user" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default">重置</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="stock" border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品代码">
        <template slot-scope="scope">
            <span>12345678</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" show-overflow-tooltip align="center" label="商品名称">
        <template slot-scope="scope"> 
            <span>下关普洱茶</span><br>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="持有数量" width="120">
        <template slot-scope="scope">
            <span>100</span>
        </template>
        </el-table-column>
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="已提货数量" width="120">
        <template slot-scope="scope">
            <span>100</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="上架数量"  width="120">
        <template slot-scope="scope">
            <span>150</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="冻结数量"  width="120">
        <template slot-scope="scope">
            <span>150</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" align="center" label="操作" width="180">
        <template slot-scope="scope">
            <a @click="$router.openPage('/distributorCenter/deliveryApplication')" style="color:#0166bb">申请提货</a>&nbsp;&nbsp;
            <a @click="centerDialogVisible=!centerDialogVisible" style="color:#0166bb">我要卖茶</a>
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
      width="40%"
      :before-close="handleClose" center>
      <el-row>
        <el-col :span="7" style="margin-top:20px">温馨提示:</el-col>
        <el-col :span="13">
          此商品单价为不含税价格！
        </el-col>
        <el-col :span="7" style="margin-top:20px">商品名称:</el-col>
        <el-col :span="13">
          演示商品(勿拍不发货)
        </el-col>
        <el-col :span="7">单价:</el-col>
        <el-col :span="7" style="margin-top:20px">
          <el-input></el-input>
        </el-col>
        <el-col :span="7" offset="1" style="margin-top:20px">
          <el-select v-model="specifications" placeholder="请选择规格">
            <el-option label="元/盒" value="1"></el-option>
            <el-option label="元/粒" value="2"></el-option>
            <el-option label="元/克" value="3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">出售数量:</el-col>
        <el-col :span="7" style="margin-top:20px">
          <el-input></el-input>
        </el-col>
        <el-col :span="7">
          (库存数量547片)
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">保存</el-button>
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
      total: 0,
      activeName: "first",
      formInline: {
        user: "",
        region: ""
      },
      fullscreenLoading: "",
      stock: [{}],
      centerDialogVisible: false,
      specifications: ""
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
.el-col-7 {
  margin-top: 30px;
  text-align: right;
  padding-right: 20px;
}
.el-col-13 {
  margin-top: 20px;
}
</style>