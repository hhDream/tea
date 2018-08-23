<template>
<div >
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="会员账号：">
        <el-input v-model="customerAccount" placeholder="会员账号"></el-input>
    </el-form-item>
    <el-form-item label="会员名称：">
        <el-input v-model="customerName" placeholder="会员名称"></el-input>
    </el-form-item>
    <el-form-item label="手机号码：">
        <el-input v-model="customerRegisterPhone" placeholder="手机号码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" @click="search()" circle></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default" @click="customerRegisterPhone=customerName=customerAccount=''">重置</el-button>
    </el-form-item>
    </el-form>
    <el-table :data="tableData"  border style="width: 100%" slot="empty">
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="会员账号"  width="150">
        <template slot-scope="scope">
            <span>{{ scope.row.customerAccount }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" align="center" label="会员名称" width="100">
        <template slot-scope="scope">
            <span>{{ scope.row.customerName }}</span><br>
        </template>
        </el-table-column>
        <el-table-column prop="shelRetentionCount" show-overflow-tooltip align="center" label="性别"  width="100">
        <template slot-scope="scope">
            <span>男</span>
        </template>
        </el-table-column>     
        <el-table-column prop="releaseCountTotal" show-overflow-tooltip align="center" label="手机号码" width="120">
        <template slot-scope="scope">
            <span>{{ scope.row.customerRegisterPhone }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="CountTotal" show-overflow-tooltip align="center" label="电子邮箱">
        <template slot-scope="scope">
            <span>HHQ8286@163.COM</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="默认收货地址">
        <template slot-scope="scope">
            <span>{{ scope.row.detailAddress }}</span>
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
    data() {
      return {
        tableData: [],
        http: this.$store.state.dialog.http,
        enterpriseCode: this.getCookie('distributorCode'),
        currentPage: 1,
        showCount: 10,
        customerName:"",
        customerRegisterPhone: "",
        customerAccount: "",
        total:0
      }
    },
    methods: {
      getData() {
        this.axios.post(this.http + "/interface/pc/distributor/pcDistributor/myCustomer", qs.stringify({
          distributorCode: this.enterpriseCode,
          currentPage: this.currentPage,
          pageSize: this.showCount,
          customerRegisterPhone: this.customerRegisterPhone,
          customerName: this.customerName,
          customerAccount: this.customerAccount,
        })).then(res => {
          this.tableData = JSON.parse(res.data.data).list;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        })
      },
      handleSizeChange(data) {
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
      getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
      },
    },
    created() {
      this.getData()
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