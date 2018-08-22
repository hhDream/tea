<template>
  <div>
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>提货明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom:20px" :gutter="24">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">提货单号:</span>
          <el-input v-model="takeTeaOrderCode" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="demonstration">商品名称:</span>
          <el-input v-model="goodsName" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span class="demonstration">经销商账号:</span>
        <el-input v-model="loginAccount" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <span class="demonstration">当前状态:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <span class="demonstration">时间</span>
          <el-date-picker style="width:100%" v-model="times" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6" style="margin-left:10px">
        <el-button style="margin-top: 19px;" icon="el-icon-search" circle @click="search"></el-button>
        <el-button @click="times=value=loginAccount=goodsName=takeTeaOrderCode=''">重置</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%;font-size:12px">
      <el-table-column prop="takeTeaOrderCode" fixed align="center" label="提货单号" width="170">
      </el-table-column>
      <el-table-column prop="goodsCode" align="center" label="商品代码" width="100">
      </el-table-column>
      <el-table-column prop="goodsName" align="center" label="商品名称">
      </el-table-column>
      <el-table-column prop="takeTeaCount" align="center" label="提货数量">
        <template slot-scope="scope">
                <span>{{ scope.row.takeTeaCount?scope.row.takeTeaCount:'0'}}  {{scope.row.benchmarkingUnit3}}</span>
</template>
      </el-table-column>
      <el-table-column prop="applyTime"  align="center" label="申请时间" width="150">
      </el-table-column>
      <el-table-column prop="loginAccount"  align="center" label="经销商账号" width="100">
      </el-table-column>
      <el-table-column prop="distributorName"  align="center" label="经销商名称" width="130">
      </el-table-column>
      <el-table-column prop="phone"  align="center" label="手机号" width="100">
      </el-table-column>
      <el-table-column prop="postalAddress"  align="center" label="地址" width="180">
      </el-table-column>
      <el-table-column prop="legalPersonName" align="center" label="法人">
      </el-table-column>
      <el-table-column prop="warehousingFee"  align="center" label="仓储费">
<template slot-scope="scope">
  <span>{{ scope.row.warehousingFee?scope.row.warehousingFee:'0'}} 元</span>
</template>
      </el-table-column>
      <el-table-column prop="status" :formatter="statusFmt"  align="center" label="当前状态">
      </el-table-column>
      <el-table-column fixed="right" :formatter="takeFmt" align="center" label="操作" min-width="100">
<template slot-scope="scope">
  <el-button @click="handleClick(scope.row)" type="text" size="small">
    {{scope.row.status==1?"确认":scope.row.status==2?"填写物流单号":"查看单号"}}
  </el-button>
</template>
      </el-table-column>
    </el-table>

    <div class="block" style="">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]"
        :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog
      width="30%"
      title="修改配额"
      :visible.sync="innerVisible"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="物流公司:" prop="cqEnterLogisticsCompanyName">
                  <el-select v-model="ruleForm.cqEnterLogisticsCompanyName" placeholder="请选择">
                    <el-option v-for="item in cqEnterLogisticsCompanyNameList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="物流单号:" prop="cqEnterLogisticsOrderId">
                    <el-input v-model="ruleForm.cqEnterLogisticsOrderId"></el-input>
              </el-form-item>
              <el-row :gutter="20"  style="text-align:right">
                <el-col :span="20">
                    <el-button @click="submitForm('ruleForm')" type="danger">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-col>
              </el-row>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    inject: ['reload'],
    methods: {
      //获取数据
      getData() {
        this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/tteaOrder", qs.stringify({
          enterpriseCode: this.enterpriseCode,
          currentPage: this.currentPage,
          showCount: this.showCount,
          coodsName: this.goodsName,
          takeTeaOrderCode: this.takeTeaOrderCode,
          loginAccount: this.loginAccount,
          status: this.value,
          startTime: this.times[0],
          endTime: this.times[1],
        })).then(res => {
          this.tableData = JSON.parse(res.data.data).data;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        })
      },
      takeFmt(row, column) {
        return row.status == 1 ? this.takeIt = "确认" : row.status == 2 ? this.takeIt = "填写物流单号" : this.takeIt = "查看单号"
      },
      statusFmt(row, column) {
        return row.status == 1 ? "已申请" : row.status == 2 ? "出库中" : row.status == 3 ? "已发货" : row.status == 4 ? "已到店" : row.status == 5 ? "待取货" : row.status == 6 ? "待收货" : row.status == 7 ? "确认收货" : "未知"
      },
      // 查看物流信息
      findGoodDetail(row) {
        this.axios.post(this.http + '/interface/pc/personal/pcEnterprise/showLogistics', qs.stringify({
          id: row.id
        })).then(res => {
          var text = JSON.parse(res.data.data)
          var newText = '<div class="content_left">物流公司:' + text.enterLogisticsCompanyName + '<br>物流单号:' + text.enterLogisticsOrderId + '<br>商品代码:' + text.goodsCode + '<br>商品名称:' + text.coodsName + '<br>提货数量:' + text.takeTeaCount + '<br>经销商名称:' + text.distributorName + "</div>";
          this.$alert(newText, '查看物流', {
            dangerouslyUseHTMLString: true
          })
        })
      },
      // 确认提货信息
      goodsDetailAlt(row) {
        var newText = '<div class="content_left"> <p>提货单号:' +
          row.takeTeaOrderCode + '</p>' + '<p>商品代码:' + row.goodsCode + '</p>' + '<p>商品名称:' + row.goodsName + '</p>' + '<p>提货数量:' + row.takeTeaCount + '</p>' + '<p>经销商账号:' + row.loginAccount + '</p>' + '<p>经销商名称:' + row.distributorName + '</p></div>';
        this.$confirm(newText, '确认订单', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/editTeaOrderStatus", qs.stringify({
            id: row.id,
            status: 2,
            cqEnterLogisticsCompanyName: "",
            cqEnterLogisticsOrderId: ""
          })).then(res => {
            this.$message({
              type: 'success',
              message: '确认成功!'
            });
            this.reload()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消确认'
          })
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submit_logistics()
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //填写物流单号
      submit_logistics() {
        this.axios.post(this.http + '/interface/pc/personal/pcEnterprise/editTeaOrderStatus', qs.stringify({
          id: this.id,
          status: 3,
          cqEnterLogisticsCompanyName: this.ruleForm.cqEnterLogisticsCompanyName,
          cqEnterLogisticsOrderId: this.ruleForm.cqEnterLogisticsOrderId
        })).then(res => {
          this.$message({
            type: 'info',
            message: '填写物流信息成功!'
          });
          this.reload()
        })
      },
      handleClick(row) {
        if (row.status != 1 && row.status != 2) {
          this.findGoodDetail(row)
        } else if (row.status == 1) {
          this.goodsDetailAlt(row)
        } else {
          this.innerVisible = true;
          this.id = row.id
        }
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
      }
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
        loginAccount: "",
        times: "",
        takeTeaOrderCode: "",
        total: 0,
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '已申请'
        }, {
          value: '2',
          label: '出库中'
        }, {
          value: '3',
          label: '已取货'
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
          label: '确认收货'
        }],
        value: '',
        takeIt: "",
        innerVisible: false,
        ruleForm: {
          cqEnterLogisticsCompanyName: "",
          cqEnterLogisticsOrderId: "",
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        cqEnterLogisticsCompanyNameList: [{
          value: 'EMS',
          label: 'EMS'
        }, {
          value: '申通快递',
          label: '申通快递'
        }, {
          value: '顺丰速运',
          label: '顺丰速运'
        }, {
          value: '圆通速递',
          label: '圆通速递'
        }, {
          value: '韵达速递',
          label: '韵达速递'
        }, {
          value: '中通快递',
          label: '中通快递'
        }, {
          value: '天天快递',
          label: '天天快递'
        }, {
          value: '其他',
          label: '其他'
        }],
        rules: {
          cqEnterLogisticsCompanyName: [{
              required: true,
              message: '请选择物流公司',
              trigger: 'blur'
            },
          ],
          cqEnterLogisticsOrderId: [{
              required: true,
              message: '请输入物流单号',
              trigger: 'blur'
            }
          ],
        }
      }
    },
  }
</script>
