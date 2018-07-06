<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>零售指导价</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 20px;" :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品代码</span>
          <el-input v-model="goodsCode" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品名称</span>
          <el-input v-model="goodsName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="goodsCode" label="商品代码"  width="120">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称"  width="120">
      </el-table-column>
      <el-table-column prop="releasePrice" label="抢购价格" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.releasePrice?scope.row.releasePrice:'0'}} 元/{{scope.row.benchmarkingUnit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nowPrice" label="当前零售指导价(元)" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.nowPrice?scope.row.nowPrice:'0'}} 元/{{scope.row.benchmarkingUnit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="setTime" label="设置时间" >
      </el-table-column>

      <el-table-column fixed="right" align='center' label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="mini">设置指导价</el-button>
          <el-button type="text" size="mini" @click="showHis(scope.row)">查看历史设置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 修改指导价模态框 -->
    <el-dialog title="修改指导价" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item style="border-bottom:1px solid #ddd" label="商品名称" :label-width="formLabelWidth">
          <el-input v-text="form.goodsName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="border-bottom:1px solid #ddd" label="商品代码" :label-width="formLabelWidth">
          <el-input v-text="form.goodsCode"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设置指导价" :label-width="formLabelWidth">
          <el-input style="width:100px;" type='number' class="deal"  v-model="form.nowPrice" auto-complete="off"></el-input><span>元/{{this.form.benchmarkingUnit}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-aline">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editIt">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 指导价历史模态框 -->
    <el-dialog title="查看指导价历史" :visible.sync="dialogFormVisible2">
      <el-table :data="tableData2"  style="width: 100%">
        <el-table-column prop="setTime" label="设置时间" >
        </el-table-column>
        <el-table-column prop="nowPrice" label="零售指导价">
          <template slot-scope="scope">
            <span>{{ scope.row.nowPrice?scope.row.nowPrice:'0'}} 元/{{scope.row.benchmarkingUnit}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" style="text-aline">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total2">
      </el-pagination>
    </div>
    </el-dialog>

  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    inject:['reload'],
    methods: {
      getData() {
        this.axios.post(this.http+"/interface/pc/personal/PcRetailGuidancePrice/priceList", qs.stringify({
          enterpriseId: this.enterpriseCode,
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
        this.dialogFormVisible = true
        this.form.goodsName=row.goodsName
        this.form.goodsCode=row.goodsCode
        this.form.benchmarkingUnit=row.benchmarkingUnit
        this.form.nowPrice=row.nowPrice
        this.row=row;
      },
      editIt(){
        this.axios.post(this.http+'/interface/pc/personal/PcRetailGuidancePrice/saveRetail',qs.stringify({
          enterpriseId: 98980889,
          goodsName: this.row.goodsName,
          goodsCode: this.row.goodsCode,
          nowPrice: this.form.nowPrice,
          releasePrice: this.row.releasePrice,
          benchmarkingUnit3: this.row.benchmarkingUnit3,
          realseCode: this.row.realseCode,
        })).then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.reload()
          }else{
            this.$message({
                  type: 'info',
                  message: `修改失败了!`
                })
          }
        }).catch(error=>{
          this.$message({
            type: 'info',
            message: `修改失败了!`+error
          })
        })
      },
      showHis(row){
        this.dialogFormVisible2=true
        this.row=row
        this.axios.post(this.http+'/interface/pc/personal/PcRetailGuidancePrice/showHistory',qs.stringify({
          currentPage: this.currentPage2,
          goodsCode: this.row.goodsCode,
          showCount: this.showCount2,
        })).then(res=>{
          console.log(JSON.parse(res.data.data));
          this.tableData2=JSON.parse(res.data.data).data;
          console.log(this.tableData2);
          this.total2=JSON.parse(res.data.data).total;

        })
      },
      handleSizeChange(data) {
        console.log(data);
        this.showCount = data;
        this.getData()
      },
      handleSizeChange2(data) {
        console.log(data);
        this.showCount2 = data;
        this.showHis(this.row)
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        this.getData()
      },
      handleCurrentChange2(data) {
        this.currentPage2 = data;
        this.showHis(this.row)

      },
      search() {
        this.getData()
      }
    },
    created() {
      this.getData()
    },
    data() {
      return {
        tableData:[],
        tableData2:[],
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        currentPage:1,
        showCount:10,
        currentPage2:1,
        showCount2:10,
        goodsName:"",
        goodsCode:"",
        total:0,
        total2:0,
        dialogFormVisible:false,
        dialogFormVisible2:false,
        formLabelWidth: '120px',
        form:{
          nowPrice:1,
          benchmarkingUnit:'',
          goodsName:'',
          goodsCode:''
        }
      }
    },
  }
</script>
<style>
  input::-webkit-inner-spin-button {  
   -webkit-appearance: none;  
}  
  input::-webkit-outer-spin-button {  
   -webkit-appearance: none;  
}  
</style>

