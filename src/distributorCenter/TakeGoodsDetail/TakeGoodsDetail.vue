<template>
<div>
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="提货单号：">
        <el-input v-model="takeTeaOrderCode" placeholder="提货单号"></el-input>
    </el-form-item>
    <!-- <el-form-item label="茶企提货单号：">
        <el-input v-model="takeTeaOrderCode" placeholder="茶企提货单号"></el-input>
    </el-form-item> -->
    <el-form-item label="商品名称：">
        <el-input v-model="goodsName" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="物流单号：">
        <el-input v-model="enterLogisticsOrderId" placeholder="物流单号"></el-input>
    </el-form-item>
    <el-form-item label="申请时间：">
        <el-date-picker
      v-model="timer"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" >
    </el-date-picker>
    </el-form-item> 
    <el-form-item label="当前状态：">
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button icon="el-icon-search" circle @click="getData"></el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="default" @click="takeTeaOrderCode=goodsName=enterLogisticsOrderId=timer=status=''">重置</el-button>
    </el-form-item>
    </el-form>
    <el-tabs v-model="type" @tab-click="mytype">
        <el-tab-pane label="我的提货" name="1"></el-tab-pane>
        <el-tab-pane label="买家提货" name="2"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" border @sort-change="mysort" style="width: 100%" slot="empty">
        <el-table-column prop="takeTeaOrderCode" show-overflow-tooltip align="center" label="提货单号">
        </el-table-column>
        <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="商品货号">
        </el-table-column>
        <el-table-column prop="coodsName" show-overflow-tooltip align="center" label="商品名称">
        </el-table-column>     
        <el-table-column prop="takeTeaCount" show-overflow-tooltip sortable='custom' width="120" align="center" label="提货数量">
        <template slot-scope="scope">
            <span>{{scope.row.takeTeaCount}}{{scope.row.transactionSpecification3}}</span>
        </template>
        </el-table-column>
        <el-table-column prop="applyTime" show-overflow-tooltip  align="center" label="申请时间">
        </el-table-column>
        <el-table-column prop="enterpriseName" show-overflow-tooltip align="center" label="茶企">
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="提货方式">
        <template slot-scope="scope">
            <span v-if='scope.row.takeTeaType==1'>快递</span>
            <span v-else>自提</span>
        </template>
        </el-table-column>
        <el-table-column prop="warehousingFee" show-overflow-tooltip align="center" label="仓储费">
        <template slot-scope="scope">
            <span>{{scope.row.warehousingFee}}元</span>
        </template>
        </el-table-column>
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="当前状态">
        <template slot-scope="scope">
            <span v-if='scope.row.status=="1"'>已申请</span>
            <span v-if='scope.row.status=="2"'>出库中</span>
            <span v-if='scope.row.status=="3"'>已发货</span>
            <span v-if='scope.row.status=="4"'>已到店</span>
            <span v-if='scope.row.status=="5"'>待取货</span>
            <span v-if='scope.row.status=="6"'>待收货</span>
            <span v-if='scope.row.status=="7"'>已取货</span>
            <span v-if='scope.row.status=="8"'>待支付</span>
            <span v-if='scope.row.status=="9"'>已取消</span>
        </template>
        </el-table-column>
        <!-- <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="茶企提货单号" width="180">
        <template slot-scope="scope">
            <span>123456789012345678</span>
        </template>
        </el-table-column> -->
        <el-table-column prop="takeTeaCount" show-overflow-tooltip align="center" label="操作" width="180">
        <template slot-scope="scope">
            <span v-if="+scope.row.status < 8">
              <a @click="showDetail(scope.row.status)">物流信息</a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a v-if="scope.row.status=='3'&&scope.row.withInSystem=='1'&&type==1">确认到店</a>
              <a v-if="scope.row.status=='6'&&type==1">确认收货</a>
              <a v-if="scope.row.status=='3'&&type==2">确认到店</a>
              <a v-if="scope.row.status=='4'&&type==2&&scope.row.takeTeaType==1">填写物流信息</a>
              <a v-if="scope.row.status=='4'&&type==2&&scope.row.takeTeaType==2">发送自提码</a>
              <a v-if="scope.row.status=='5'&&type==2&&scope.row.takeTeaType==2">验证自提码</a>
            </span>
            <span v-if="scope.row.status=='8'"><a @click="showDetail(scope.row.status)">立即支付</a></span>
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
    <el-steps :active="active" align-center style="height:240px;padding-top:100px">
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
  inject:['reload'],
  data() {
    return {
      active:0,
      tableData: [],
      http: this.$store.state.dialog.http,
      distributorId: this.$getcookie('distributorCode'),
      phone:this.$getcookie('LOGIN_PHONE'),
      currentPage: 1,
      pageSize: 10,
      goodsName: "",
      goodsCode: "",
      total: 1,
      countSort:'',
      takeTeaOrderCode:'',//提货单号
      enterLogisticsOrderId:'',
      status:'',
      timer: "",
      type:'1',
      options: [{
          value: '1',
          label: '已申请'
        }, {
          value: '2',
          label: '出库中'
        }, {
          value: '3',
          label: '已发货'
        }, {
          value: '4',
          label: '已到店'
        }, {
          value: '5',
          label: '待取货'
        }, {
          value: '6',
          label: '待收货'
        }, {
          value: '7',
          label: '已取货'
        }, {
          value: '8',
          label: '待支付'
        }, {
          value: '9',
          label: '已取消'
        }],
      dialogVisible: false
    };
  },
  methods: {
    showDetail(pro){
      this.dialogVisible = !this.dialogVisible;
      if(+pro < 5){
        this.active == +pro - 1;
      }else if(+pro < 7){
        this.active == 5;
      }else{
        this.active == 6;
      }
    },
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
          this.http + "/interface/pc/distributor/pcTeaStore/myTeaOrder",
          qs.stringify({
            distributorId: this.distributorId,
            currentPage: this.currentPage,
            phone:this.phone,
            pageSize: this.pageSize,
            goodsName: this.goodsName,
            goodsCode: this.goodsCode,
            countSort:this.countSort,
            takeTeaOrderCode:this.takeTeaOrderCode,
            enterLogisticsOrderId:this.enterLogisticsOrderId,
            status:this.status,
            startTime:this.timer[0],
            endTime:this.timer[1],
            type:this.type
          })
        )
        .then(res => {
          if (res.data.code!=200) {
          this.tableData = [];
          this.total = 0;
          this.currentPage = 1;
          return false;
          }
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
    mytype(val){
      this.type=val.name;
      this.getData()
    },
    mysort(val){
        if (val.order=='ascending') {
          this.countSort=1
        this.getData()

        }else{
          this.countSort=2
        this.getData()

        }
      },
    search() {
      this.getData();
    }
  },
  created() {
    this.getData()
  },
  
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