<template>
   <div class="st_body">
       <el-row>
           <el-col :span='24'>*不设定运费模板，所有提货的快递物流费用将按默认运费模板包邮，由卖家自行承担快递物流费用</el-col>
       </el-row>
       <el-row style="margin-top:20px">
           <el-col :span='12' class="st_deafult"><b>默认运费模板(运费)</b></el-col>
           <el-col :span='12' class="st_setting"><a>设为默认模板</a>&nbsp;&nbsp;&nbsp;<a @click="centerDialogVisible = !centerDialogVisible">修改</a>&nbsp;&nbsp;&nbsp;<a>删除</a></el-col>
           <el-col :span='24'>
               <el-table :data="tableData2" style="width: 100%;">
                    <el-table-column prop="date" width="180" label="运送方式" style="background:#e9e9e9;color">
                    </el-table-column>
                    <el-table-column prop="name" label="首重(KG)" width="180" style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="address" label="运费(元)" style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="address" label="续重(KG)" style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="address" label="运费(元)" style="background:#e9e9e9">
                    </el-table-column>
                </el-table>
           </el-col>
       </el-row>
       <el-row style="margin-top:20px">
           <el-col :span='12' class="st_deafult"><b>默认运费模板(运费)</b></el-col>
           <el-col :span='12' class="st_setting"><a>设为默认模板</a>&nbsp;&nbsp;&nbsp;<a @click="centerDialogVisible = !centerDialogVisible">修改</a>&nbsp;&nbsp;&nbsp;<a>删除</a></el-col>
           <el-col :span='24'>
               <el-table :data="tableData2" style="width: 100%;">
                    <el-table-column prop="date" width="180" label="运送方式" style="background:#e9e9e9;color">
                    </el-table-column>
                    <el-table-column prop="name" label="首重(KG)" width="180" style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="address" label="运费(元)" style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="address" label="续重(KG)" style="background:#e9e9e9">
                    </el-table-column>
                    <el-table-column prop="address" label="运费(元)" style="background:#e9e9e9">
                    </el-table-column>
                </el-table>
           </el-col>
       </el-row>
       <el-button type="danger" style="margin-top:20px" @click="centerDialogVisible = !centerDialogVisible">添加运费模板</el-button>
       <el-dialog
        :visible.sync="centerDialogVisible"
        title="设置运费模板"
        width="40%"
        :before-close="handleClose" center>
        <el-row>
          <el-col :span="6">模板名称</el-col>
          <el-col :span="13">
            <el-input></el-input>
          </el-col>
          <el-col :span="6">运送方式</el-col>
          <el-col :span="13">
            <el-input>快递</el-input>
          </el-col>
          <el-col :span="6">首重</el-col>
          <el-col :span="13">
            <el-input></el-input>
          </el-col>
          <el-col :span="2">
            KG
          </el-col>
          <el-col :span="6">运费</el-col>
          <el-col :span="13">
            <el-input></el-input>
          </el-col>
          <el-col :span="2">
            元
          </el-col>
          <el-col :span="6">续重</el-col>
          <el-col :span="13">
            <el-input></el-input>
          </el-col>
          <el-col :span="2">
            KG
          </el-col>
          <el-col :span="6">运费</el-col>
          <el-col :span="13">
            <el-input></el-input>
          </el-col>
          <el-col :span="2">
            元
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">保存</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">保存为默认运费模板</el-button>
        </span>
      </el-dialog>
    </div> 
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "111"
        }
      ],
      centerDialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
