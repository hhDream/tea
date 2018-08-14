<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的抢购</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品名</span>
          <el-input v-model="goodsName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">开始日期</span>
          <el-date-picker v-model="releaseBeginTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">活动状态</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <!-- <el-button style="margin-top: 19px;" icon="el-icon-search" type="primary" plain></el-button> -->
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
          <el-button type="success" @click="getquotalist_getExcel">导出EXCEL</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column sortable  fixed prop="id" label="序号">
      </el-table-column>
      <el-table-column prop="releaseCode" label="活动编码">
      </el-table-column>
      <el-table-column prop="releaseType" :formatter="releaseTypeFmt" label="活动类型">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称">
      </el-table-column>
      <el-table-column prop="goodsCode" label="商品代码">
      </el-table-column>
      <el-table-column prop="warehousingCount" label="库存总量">
        <template slot-scope="scope">
          <span>{{ scope.row.warehousingCount?scope.row.warehousingCount:0}} {{scope.row.benchmarkingUnit33}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="releaseCount" label="配订货总量">
        <template slot-scope="scope">
          <span>{{ scope.row.releaseCount?scope.row.releaseCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="shlfRetentionCount" label="自留总量">
        <template slot-scope="scope">
          <span>{{ scope.row.shlfRetentionCount?scope.row.shlfRetentionCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="partakeAllomentCount" label="抢购总量">
        <template slot-scope="scope">
          <span>{{ scope.row.partakeAllomentCount?scope.row.partakeAllomentCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="releasePrice" label="抢购价格">
        <template slot-scope="scope">
          <span>{{ scope.row.releasePrice?scope.row.releasePrice:0}} 元</span>
        </template>
      </el-table-column>
      <el-table-column prop="rushBuyType" :formatter="rushBuyTypeFmt" label="配售规则">
      </el-table-column>
      <el-table-column prop="transferCount" label="已售数量">
        <template slot-scope="scope">
          <span>{{ scope.row.transferCount?scope.row.transferCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="releaseBeginTime" label="活动开始时间" width="150">
      </el-table-column>
      <el-table-column prop="releaseEndTime" label="活动结束时间" width="150">
      </el-table-column>
      <el-table-column prop="releaseStatus" :formatter="releaseStatusFmt" label="确认状态">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      </el-table>
      
    <div class="block">
        <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="currentPage" 
        :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" 
        :total="total">
        </el-pagination>
    </div>

<!-- 模态框表格 -->

<el-dialog title="活动管理" width="80%" :visible.sync="dialogTableVisible">
  <el-row :gutter="24">
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div class="grid-content bg-purple">
          <span class="demonstration">经销商编号:</span>
          <el-input v-model="distributorId" clearable></el-input>
        </div>
      </div>
      </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div class="grid-content bg-purple">
          <span class="demonstration">经销商名称:</span>
          <el-input v-model="distributorName" clearable></el-input>
        </div>
      </div>
      </el-col>
    <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">经销商等级:</span>
          <el-select v-model="distributorLevel" placeholder="请选择">
            <el-option v-for="item in optionsIn" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">确认状态:</span>
          <el-select v-model="comfirmStatus" placeholder="请选择">
            <el-option v-for="item in optionsEditSearch" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
  </el-row>
  <el-row :gutter="24">
      <el-col :span="24">
      <div class="grid-content bg-purple">
          <el-button style="margin-top: 19px;" @click="inDataSearch" icon="el-icon-search" circle ></el-button>
          <el-button type="success" @click="getquotalistin_getExcel">导出</el-button>
      </div>
      </el-col>
  </el-row>
  <el-table show-summary :summary-method="getSummaries" :data="gridData"  border style="width: 100%;margin-top:20px;">
      <el-table-column fixed align="center" prop="distributorId" label="经销商编号">
      </el-table-column>
      <el-table-column  align="center" prop="distributorName" label="经销商名称">
      </el-table-column>
      <el-table-column  align="center" prop="distributorLevel" :formatter="distributorLevelFmt" label="经销商等级">
      </el-table-column>
      <el-table-column  align="center" prop="distributorLevelRank" label="信用系数">
      </el-table-column>
      <el-table-column  align="center" prop="distributorSettlementPrice" label="结算价">
        <template slot-scope="scope">
          <span>{{ scope.row.distributorSettlementPrice?scope.row.distributorSettlementPrice:0}} 元</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="goodsName" label="商品名称">
      </el-table-column>
      <el-table-column  align="center" prop="comfirmStatus" :formatter="comfirmStatusFmt" label="确认状态">
      </el-table-column>
      <el-table-column  align="center" prop="bondAmount" label="已支付定金">
        <template slot-scope="scope">
          <span>{{ scope.row.bondAmount?scope.row.bondAmount:0}} 元</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="rationCount" label="订货总量">
        <template slot-scope="scope">
          <span>{{ scope.row.rationCount?scope.row.rationCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="jcCount" label="基础订货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.jcCount?scope.row.jcCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="fdCount" v-if="showIt" label="浮动订货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.fdCount?scope.row.fdCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="shlfRetentionCount" label="自留数量">
        <template slot-scope="scope">
          <span>{{ scope.row.shlfRetentionCount?scope.row.shlfRetentionCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="partakeAllomentCount" label="抢购数量">
        <template slot-scope="scope">
          <span>{{ scope.row.partakeAllomentCount?scope.row.partakeAllomentCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="soldCount" label="已售数量">
        <template slot-scope="scope">
          <span>{{ scope.row.soldCount?scope.row.soldCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="customerCount" label="购买商品的客户数量">
        <template slot-scope="scope">
          <span>{{ scope.row.customerCount?scope.row.customerCount:0}} </span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="inCount" label="被调货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.inCount?scope.row.inCount:0}} {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" prop="outCount" label="调货数量">
        <template slot-scope="scope">
          <span>{{ scope.row.outCount?scope.row.outCount:0}}  {{scope.row.benchmarkingUnit3}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" v-if="takeIt" fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button v-if="scope.row.comfirmStatus == 5 && scope.row.releaseStatus == 2" @click="innerVisible = true;editClick(scope.row)" type="text" size="small">
          修改</el-button>
      </template>
      </el-table-column>
  </el-table>
    <div class="block">
      <el-pagination 
      @size-change="handleSizeChange2" 
      @current-change="handleCurrentChange2" 
      :current-page="currentPage2" 
      :page-sizes="[10, 20, 50]" 
      :page-size="10" 
      layout="total, sizes, prev, pager, next, jumper" :total="total2">
      </el-pagination>
    </div>
      <el-dialog
      width="30%"
      title="修改配额"
      :visible.sync="innerVisible"
      append-to-body>
      <el-row :gutter='20' style="margin-bottom:20px">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <span class="demonstration">修改类型:</span>
            </div>
          </el-col>
          <el-col :span="15">
            <div class="grid-content bg-purple">
              <el-select v-model="quotasType" placeholder="请选择">
                <el-option v-for="item in optionsEdit" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
      </el-row>
      <el-row :gutter="20"  style="margin-bottom:20px">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span class="demonstration">修改数量:</span>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">
              <el-input v-model="quotasNumber"  v-on:input="inpChange"  type="number" width="60" clearable></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">修改后总量为:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{newNumber}}</el-col>
      </el-row>
      <el-row :gutter="20"  style="text-align:right">
        <el-col :span="20">
            <el-button @click="editData()" type="danger">提交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
</el-dialog>

</div>
</template>

<script>
  import qs from 'qs'
  export default {
    inject:['reload'],
    methods: {
      getData() {
        this.axios.post(this.http + "/interface/pc/personal/pcAllotment/pcAllotmentList", qs.stringify({
          releaseEnterpriseId: this.enterpriseCode,
          currentPage: this.currentPage,
          showCount: this.showCount,
          goodsName: this.goodsName,
          releaseBeginTime: this.releaseBeginTime,
          releaseStatus: this.value
        })).then(res => {
          console.log(JSON.parse(res.data.data).data);
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        }).catch(err=>{
          this.open(err)
        })
      },
      open(err) {
          this.$alert('网络错误请求失败!', '错误', {
              confirmButtonText: '确定',
              callback: action => {
                  this.$message({
                      type: 'info',
                      message: `错误原因: ${ err }`
                  });
              }
          });
      },
      rationCountFmt(row, column){
        return row.rationCount = row.rationCount + row.benchmarkingUnit3
      },
      distributorLevelFmt(row, column){
        return row.distributorLevel == 'JXSLEVEL001' ? "一级" : row.distributorLevel == 'JXSLEVEL002' ? "二级" : "三级"
      },
      comfirmStatusFmt(row, column) {
        return row.comfirmStatus == 1 ? "已配售" : row.comfirmStatus == 2 ? "减少配额待确认" : row.comfirmStatus == 3 ? "增加配额待确认" : row.comfirmStatus ==
          4 ? "待支付尾款" : row.comfirmStatus == 5 ? "已确认" : row.comfirmStatus == 6 ? "已完成" : row.comfirmStatus == 0 ? "待配售" : '';
      },
      rushBuyTypeFmt(row, column) {
        return row.rushBuyType == 1 ? "被动配售" : "主动订货";
      },
      releaseTypeFmt(row, column) {
        return row.releaseType == 1 ? "封闭" : "公开"
      },
      releaseStatusFmt(row, column) {
        return row.releaseStatus == 1 ? "待配售" : row.releaseStatus == 2 ? "已配售" : row.releaseStatus == 5 ? "已发行" : row.releaseStatus == 6 ? "待结算" : row.releaseStatus == 7 ? "已结束" : "";
      },
      getInData(row) {
        this.axios.post(this.http + "/interface/pc/personal/pcAllotment/distributorrationInfo", qs.stringify({
          allotmentId: row.releaseCode,
          currentPage: this.currentPage2,
          showCount: this.showCount2,

        })).then(res => {
          console.log("元数据", res.data,JSON.parse(res.data.data));
          this.gridData = JSON.parse(res.data.data).pd;
          this.total2 = JSON.parse(res.data.data).total;

        })
      },
      getquotalistin_getExcel(){
        location.href = "https://ent.teaexs.com/platform/interface/pc/personal/pcAllotment/distributorrationExprot?allotmentId=" + this.row.releaseCode
      },
      inDataSearch(){
        this.axios.post(this.http+"/interface/pc/personal/pcAllotment/distributorrationInfo",qs.stringify({
          allotmentId: this.allotmentId,
          distributorId: this.distributorId,
          distributorName: this.distributorName,
          distributorLevel: this.distributorLevel,
          comfirmStatus: this.comfirmStatus,
          currentPage: this.currentPage2,
          showCount: this.showCount2,
        })).then(res=>{
          console.log("内部",JSON.parse(res.data.data));
          this.gridData = JSON.parse(res.data.data).pd;
        })
      },
      editData() {
        // console.log(this.quotasNumber);
        this.$message('正在修改,请稍等...');
        if(this.quotasNumber==""&&this.quotasNumber<0){
          this.$message('请填写大于零且不为空的值'); 
          return false;
        }
        this.axios.post(this.http + "/interface/pc/personal/pcDistributor/editDistributorrationCount", qs.stringify({
          distributorrationId: this.rowId,
          quotasType: this.quotasType,
          quotasNumber: this.quotasNumber
        })).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$alert('修改成功!', '成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.reload
                this.$message({
                  type: 'info',
                  message: `修改成功,数据将会更新!`
                });
                this.innerVisible=false;
                this.dialogTableVisible=false;
              }
              
            });
          }
        })
      },
      inpChange(){
        if(this.quotasType==1){
            this.newNumber= +this.e.rationCount+ +this.quotasNumber;
            if(this.newNumber<0){ this.newNumber=0}
        }else if(this.quotasType==2){
            this.newNumber= +this.e.rationCount- +this.quotasNumber;
            if(this.newNumber<0){ this.newNumber=0}

        }else{
          this.$message("请选择类型")
        }
          // console.log('ssss',this.e);
      },
      editClick(row) {
        console.log(row.id);
        this.rowId = row.id;
        this.e=row
      },
      handleClick(row) {
        console.log("数据行", row);
        this.dialogTableVisible = true;
        console.log(this.dialogTableVisible);
        if (row.releaseStatus != '5'&&row.releaseStatus != '6'&&row.releaseStatus != '7'&&row.releaseStatus!='1') {
          this.takeIt = true;
        }
        if (row.rushBuyType!=1) {
          this.showIt = true;
        }
        this.allotmentId=row.releaseCode;
        this.row=row;
        this.getInData(row)
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
      handleSizeChange2(data) {
        console.log(data);
        this.showCount2 = data;
        this.getInData(this.row)

      },
      handleCurrentChange2(data) {
        this.currentPage2 = data;
        this.getInData(this.row)
      },
      search() {
        this.getData()
      },
      getquotalist_getExcel() {
        location.href = this.http + "/interface/pc/personal/pcAllotment/allotmentExprot?releaseEnterpriseId=" + this.enterpriseCode
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        const reg =/[\u4e00-\u9fa5]/g;  
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 3||index === 4||index === 6) {
            sums[index] = '';
            return;
          }
          
          const values = data.map(item => Number(item[column.property]));
          
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      }
    },
    created() {
      this.getData()
    },
    data() {
      return {
        goodsName: '',
        releaseBeginTime: '',
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        total: 1,
        currentPage: 1,
        showCount: 10,
        total2: 1,
        currentPage2: 1,
        showCount2: 10,
        dialogTableVisible: false,
        innerVisible: false,
        distributorId: "",
        distributorName: "",
        distributorLevel: "",
        tableData: [],
        takeIt: false,
        showIt:false,
        newNumber:"",
        e:'',
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '待配售'
        }, {
          value: '2',
          label: '已配售'
        }, {
          value: '5',
          label: '已发行'
        }, {
          value: '6',
          label: '待结算'
        }, {
          value: '7',
          label: '已结束'
        }],
        optionsIn: [{
            value: "",
            label: '全部',
          },
          {
            value: "JXSLEVEL001",
            label: '一级',
          }, {
            value: "JXSLEVEL002",
            label: '二级',
          },
          {
            value: "JXSLEVEL003",
            label: '三级',
          }
        ],
        optionsEdit: [{
            value: "1",
            label: '增加配额',
          },
          {
            value: "2",
            label: '减少配额',
          }
        ],
        quotasType: '',
        quotasNumber: '',
        value: '',
        gridData: [],
        distributorLevel: "",
        rowId: "",
        comfirmStatus:"",
        optionsEditSearch: [{
            value: "",
            label: '全部',
          },
          {
            value: "0",
            label: '待配售',
          },
          {
            value: "1",
            label: '已配售',
          },
          {
            value: "2",
            label: '减少配额待确认',
          },
          {
            value: "3",
            label: '增加配额待确认',
          },
          {
            value: "4",
            label: '尾款待结',
          },
          {
            value: "5",
            label: '已确认',
          },
          {
            value: "6",
            label: '已结束',
          }
        ],
      }
    },
  }
</script>
<style >
  .el-select {
    width: 100%;
  }
</style>
