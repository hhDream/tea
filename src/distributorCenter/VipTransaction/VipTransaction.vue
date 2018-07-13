<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="会员账号：">
        <el-input v-model="formInline.user" placeholder="会员账号"></el-input>
    </el-form-item>
    <el-form-item label="会员名称：">
        <el-input v-model="formInline.user" placeholder="会员名称"></el-input>
    </el-form-item><br>
    <el-form-item label="订单额：">
        <el-input v-model="formInline.user" placeholder="订单额" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item label="～" style="margin-left:-105px">
        <el-input v-model="formInline.user" placeholder="订单额" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item label="订单量："  style="margin-left:-100px">
        <el-input v-model="formInline.user" placeholder="订单量" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item label="～" style="margin-left:-105px">
        <el-input v-model="formInline.user" placeholder="订单量" style="width:50%"></el-input>
    </el-form-item>
    <el-form-item label="订单时间：">
        <el-date-picker
      v-model="value13"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
    </el-form-item> 
    <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default">重置</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="会员账号">
        <template slot-scope="scope">
            <span>669904821432	</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" align="center" label="会员名称">
        <template slot-scope="scope">
            <span>吴彦祖</span><br>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="会员订单额">
        <template slot-scope="scope">
            <span>894.35元</span>
        </template>
        </el-table-column>     
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="会员订单量">
        <template slot-scope="scope">
            <span>17</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="平均订单金额">
        <template slot-scope="scope">
            <span>150</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="最后一笔订单时间" width="180">
        <template slot-scope="scope">
            <span>2018-03-07 10:15:54</span>
        </template>
        </el-table-column>
    </el-table>
    <div class="block" style="">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
</div>
</template>

<script>
  import qs from 'qs'
  export default {
    methods: {
      getData() {
        this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/myStore", qs.stringify({
          releaseEnterpriseId: this.enterpriseCode,
          currentPage: this.currentPage,
          showCount: this.showCount,
          goodsName: this.goodsName,
          goodsCode: this.goodsCode,
        })).then(res => {
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          console.log( JSON.parse(res.data.data));
          this.currentPage = JSON.parse(res.data.data).currentPage;
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
      
    },
    created() {
      this.getData()
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
        total:0,
        activeName:"first",
        formInline: {
          user: '',
          region: ''
        },
        value13:"",
        fullscreenLoading:""
      }
    },
  }
</script>

<style lang='less' scoped>

.sp_info{
  display: flex;
}
.sp_cover{
  width: 30%;
  height: 80%;
  >img{
    display: block;
    width: 45px;
    height: 45px;
    margin-top: 4px;
  }
}
.sp_content{
  width: 70%;
  text-align: left;
  .sp_code{
    font-size: 12px;
    color: #999;
  }
}
</style>