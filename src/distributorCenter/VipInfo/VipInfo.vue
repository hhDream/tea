<template>
<div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="会员账号：">
        <el-input v-model="formInline.user" placeholder="会员账号"></el-input>
    </el-form-item>
    <el-form-item label="会员名称：">
        <el-input v-model="formInline.user" placeholder="会员名称"></el-input>
    </el-form-item>
    <el-form-item label="手机号码：">
        <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default">重置</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="tableData"  border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="会员账号"  width="150">
        <template slot-scope="scope">
            <span>669904821432</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" align="center" label="会员名称" width="100">
        <template slot-scope="scope">
            <span>周杰伦</span><br>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="性别"  width="100">
        <template slot-scope="scope">
            <span>男</span>
        </template>
        </el-table-column>     
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="手机号码" width="120">
        <template slot-scope="scope">
            <span>18505175228</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="电子邮箱">
        <template slot-scope="scope">
            <span>HHQ8286@163.COM</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="默认收货地址">
        <template slot-scope="scope">
            <span>江东中路222号江东中路222号江东中路222号江东中路222号</span>
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
        fullscreenLoading:false
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