<template>
   <div class="st_body">
       <el-row>
           <el-col :span='24'>*不设定运费模板，所有提货的快递物流费用将按默认运费模板包邮，由卖家自行承担快递物流费用</el-col>
       </el-row>
       <el-row style="margin-top:20px">
           <el-col :span='12' class="st_deafult"><b>默认运费模板(运费)</b></el-col>
           <el-col :span='12' class="st_setting"><a @click="centerDialogVisible = !centerDialogVisible;editType=true">修改</a></el-col>
           <el-col :span='24'>
               <el-table :data="tableData2" style="width: 100%;">
                    <el-table-column prop="sz" label="首重(KG)" align="center" width="180" style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="szje" label="运费(元)" align="center"  style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="xz" label="续重(KG)"  align="center" style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="xzje" label="运费(元)"  align="center" style="background:#e9e9e9">
                    </el-table-column>
                </el-table>
           </el-col>
       </el-row>
       <el-button type="danger" v-if="tableData2==[]" style="margin-top:20px" @click="centerDialogVisible = !centerDialogVisible">添加运费模板</el-button>
       <el-dialog
        @close='editType=false'
        :visible.sync="centerDialogVisible"
        title="设置运费模板"
        width="40%"
        center>
        <el-row v-if="!editType">
          <el-col :span="6">首重</el-col>
          <el-col :span="13">
            <el-input type="number" v-model="sz"></el-input>
          </el-col>
          <el-col :span="2">
            KG
          </el-col>
          <el-col :span="6">首重运费</el-col>
          <el-col :span="13">
            <el-input type="number" v-model="szje"></el-input>
          </el-col>
          <el-col :span="2">
            元
          </el-col>
          <el-col :span="6">续重</el-col>
          <el-col :span="13">
            <el-input type="number" v-model="xz"></el-input>
          </el-col>
          <el-col :span="2">
            KG
          </el-col>
          <el-col :span="6">续重运费</el-col>
          <el-col :span="13">
            <el-input type="number" v-model="xzje"></el-input>
          </el-col>
          <el-col :span="2">
            元
          </el-col>
        </el-row>

        <el-row v-else>
          <el-col :span="6">首重</el-col>
          <el-col :span="13">
            <el-input type="number" v-model="tableData2[0].sz"></el-input>
          </el-col>
          <el-col :span="2">
            KG
          </el-col>
          <el-col :span="6">首重运费</el-col>
          <el-col :span="13">
            <el-input type="number" v-model="tableData2[0].szje"></el-input>
          </el-col>
          <el-col :span="2">
            元
          </el-col>
          <el-col :span="6">续重</el-col>
          <el-col :span="13">
            <el-input type="number" v-model="tableData2[0].xz"></el-input>
          </el-col>
          <el-col :span="2">
            KG
          </el-col>
          <el-col :span="6">续重运费</el-col>
          <el-col :span="13">
            <el-input type="number" v-model="tableData2[0].xzje"></el-input>
          </el-col>
          <el-col :span="2">
            元
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button v-if="editType" type="primary" @click="myExpressfee">保存</el-button>
          <el-button v-else type="primary" @click="addExpressfee">保存</el-button>
        </span>
      </el-dialog>
    </div> 
</template>

<script>
import qs from 'qs';
export default {
  methods: {},
  data() {
    return {
      http: this.$store.state.dialog.http,      
      distributorCode:this.$getcookie('distributorCode'),
      sz:'',
      szje:'',
      xz:'',
      xzje:'',
      tableData2:[],
      centerDialogVisible: false,
      editType:false
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      this.axios.post(this.http+'/interface/pc/distributor/pcTeaStore/myExpressfee',qs.stringify({
        distributorCode:this.distributorCode
      })).then(res=>{
        if (res.data.code!=200) {
          this.tableData2=[{}]
          return;
        }
        this.tableData2=[JSON.parse(res.data.data)]
      })
    },
    addExpressfee(){
      this.axios.post(this.http+'/interface/pc/distributor/pcTeaStore/addExpressfee',qs.stringify({
        distributorCode:this.distributorCode,
        sz:this.sz,
        xz:this.xz,
        szje:this.szje,
        xzje:this.xzje
      })).then(res=>{
        this.centerDialogVisible = false;
      })
    },
    myExpressfee(){
      this.axios.post(this.http+'/interface/pc/distributor/pcTeaStore/editExpressfee',qs.stringify({
        id:this.tableData2[0].id,
        sz:this.tableData2[0].sz,
        xz:this.tableData2[0].xz,
        szje:this.tableData2[0].szje,
        xzje:this.tableData2[0].xzje
      })).then(res=>{
        this.centerDialogVisible = false;
       
      }).then(()=>{
         this.$nextTick()
      })
    }
  }
};
</script>

<style lang="less">
.st_body {
  .st_deafult {
    background: #e9e9e9;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding-left: 20px;
  }
  .st_setting {
    background: #e9e9e9;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding-right: 30px;
    text-align: right;
    color: #0166bb;
  }
  .el-table td,
  .el-table th {
    padding: 13px 10px;
  }
  .el-col-6 {
    margin-top: 30px;
    text-align: right;
    padding-right: 20px;
  }
  .el-col-13 {
    margin-top: 20px;
  }
  .el-col-2 {
    margin-top: 30px;
    padding-left: 20px;
  }
  .el-dialog--center .el-dialog__body {
    padding-top: 0px;
  }
}
</style>
