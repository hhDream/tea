<template>
  <div style="background:#F6F6F6">
    <el-row>
      <el-col style="min-width:1190px;margin:20px auto;float: none;background:#fff" :span="16">
        <div class="main-side">
          <div style="padding-left: 35px;" class="main-cont main-cont-mall">
            <el-breadcrumb style="margin-bottom:10px" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/teaMallShop' }">品牌商城</el-breadcrumb-item>
              <el-breadcrumb-item>津乔普洱</el-breadcrumb-item>
              <el-breadcrumb-item>混合</el-breadcrumb-item>
              <el-breadcrumb-item>勐库地区</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="detail-productContent">
              <div class="detail-productContent-l fl">
                <div class="w290px fl">
                  <div class="product-picture-big big">
                    <el-carousel :arrow="'never'" :indicator-position="'none'" :autoplay="false" trigger="click" height="288px" ref="carousel">
                      <el-carousel-item v-for="(item,index) in productList" :key="index">
                        <img :src="item.src" style="width:288px" alt="">
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                  <div class="mt20px small">
                    <a class="picture-arrow-left go_t" @click="id>0?id--:id=productList.length-1;setActiveItem(id)">&lt;</a>
                    <div class="product-picture-small">
                      <ul id="small" style="width: 245px;">
                        <li v-for="(item,index) in productList" :class="{active:id==index}" :key="index">
                          <img @click="id=index;setActiveItem(index)" :src="item.src" alt="">
                        </li>
                      </ul>
                    </div>
                    <a class="picture-arrow-right go_b" @click="id<productList.length-1?id++:id=0;setActiveItem(id)">&gt;</a>
                  </div>
                </div>
                <div class="productContent-parameter fl">
                  <h2 id="productName">一念间(伴手礼)</h2>
                  <div class="fs12px mt10px"></div>
                  <div class="bg-price mt10px">
                    <div>
                      <label>
                    <span>零售指导价：</span>
                  </label>
                      <span class="c-red" id="guidePrice">260.00元/盒</span>
                    </div>
                  </div>
                  <div class="mt20px" id="productSpecification">商品规格：12套/件,1盒/套,72克/盒</div>
                  <div class="productContent-parameter-data mt20px">
                    <div>可买量：
                      <span class="c-orange" id="saleNo">0盒</span>
                    </div>
                    <div>求购量：
                      <span class="c-orange" id="buyNo">0盒</span>
                    </div>
                    <div class="br-none">成交量：
                      <span class="c-orange" id="historySaleCount">11盒</span>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                  <div class="fs12px c999 mt30px">提示：商品购买后可通过个人中心－提货管理功能对已购买的商品进行提货操作。</div>
                </div>
              </div>
              <div class="detail-productContent-r fl">
                <div class="productContent-grade" id="evaluation">暂无评分</div>
                <div class="productContent-expertise">
                  <h4>综合评价：</h4>
                  <div id="content"></div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <div id="myChart" class="detail-priceTrend mt20px"></div>

            <el-tabs v-model="activeName2" style="margin-right: 16px;margin-top:20px" type="border-card">


              <el-tab-pane label="报价窗口" name="first">
                <el-row>
                  <el-col :span="7">
                    按规格显示
                    <el-select v-model="value" size="mini" clearable placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="17">
                    <el-input style="display:inline-block;width:100px" size="mini" v-model="start"></el-input>~
                    <el-input style="display:inline-block;width:100px" size="mini" v-model="end"></el-input>
                    <el-button size="mini" style="margin-left:50px" icon="el-icon-search" circle></el-button>
                  </el-col>
                </el-row>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="序号" width="180">
                  </el-table-column>
                  <el-table-column prop="number" sortable label="数量" width="180">
                  </el-table-column>
                  <el-table-column prop="specification" label="规格">
                  </el-table-column>
                  <el-table-column prop="univalence" sortable label="单价(元/规格)">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template  slot-scope="scope">
                      <el-button @click="handleClick(scope.row)" type="text">立即购买</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                    <el-pagination
                      style="margin-top:20px"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="3">
                    </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="商品详情" name="second">
                <div id="xiangqing" class=" w1118px ">
                  <div class="info">
                    <div class="col-md-3">
                      <div>品牌：
                        <span id="brandName">津乔普洱</span>
                      </div>
                      <div>商品毛重：
                        <span id="unitNum"></span>
                      </div>
                      <div id="co14ChineseName">外包装：
                        <span id="col4">盒</span>
                      </div>
                      <div id="col8ChineseName">储存建议：
                        <span id="col8">干燥除湿</span>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div>商品编号：
                        <span id="productCode">YNJ2018030502</span>
                      </div>
                      <div id="col1ChineseName">配送频次：
                        <span id="col1">津乔普洱</span>
                      </div>
                      <div id="col5ChineseName">内包装：
                        <span id="col5">锡纸</span>
                      </div>
                      <div id="col9ChineseName">
                        <span id="col9"></span>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div>年份：
                        <span id="makeDate">2017</span>
                      </div>
                      <div id="col2ChineseName">生产日期：
                        <span id="col2">2017年12月</span>
                      </div>
                      <div id="col6ChineseName">食品添加剂：
                        <span id="col6">无</span>
                      </div>
                      <div id="col10ChineseName">
                        <span id="col10"></span>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div>工艺：
                        <span id="craft">发酵工艺</span>
                      </div>
                      <div id="col3ChineseName">产品产地：
                        <span id="col3">云南勐库地区</span>
                      </div>
                      <div id="col7ChineseName">保质期：
                        <span id="col7">999999999天</span>
                      </div>
                    </div>
                  </div>
                      <img style="margin: 0 auto;display: block;" src="../../assets/images/130e546b-d4bf-4360-bc4a-ff2cad0c22e2.jpg">
                </div>
              </el-tab-pane>
              <el-tab-pane label="茶品点评" name="third">
                <div id="review" class="in" style="min-height:200px;">
                  <ul class="review-list" id="evaluationList">
                    <li>
                      <div class="headPortrait-box fl">
                        <img src="../../assets/images/8898f95a-9399-4af4-9fa4-3d1596eab305.jpg">
                      </div>
                      <div class="w986px ml10px fl">
                        <h6 class="clearfix">
                          <span class="fl">专家评茶组</span>
                          <div class="icon-expert c-999 ml20px fl">专家</div>
                          <a href="javascript:queryEvaluatorInfo('3','expert')" class="fr">查看专家简介</a>
                        </h6>
                        <div class="lh16px c-orange mt10px">
                          <span>评分: 9.1</span>
                          <span class="icon-leaf"></span>
                          <span class="icon-leaf"></span>
                          <span class="icon-leaf"></span>
                          <span class="icon-leaf"></span>
                          <span class="icon-leaf-half"></span>
                        </div>
                        <p class="lh24px mt20px"> 一念间·小粒茶适用于日常杯泡、盖碗冲泡等多种方式，且具备出味快、可存放转化的功能，可以说在使用上是全能的。且选料优异，冲泡容易把握，不论是专业茶人还是新手，都可以用各自方式泡出一杯好茶。对于“回归品饮”的倡导，小粒茶做到延续传统的革新，时尚的诠释让更多人轻松切入，可以说小粒茶，有大市场，小粒茶，更有大滋味。</p>
                        <div class="c-999 mt10px">2018-03-06</div>
                      </div>
                      <div class="clearfix"></div>
                    </li>
                  </ul>
                  <div class="clearfix"></div>
                  <div class="page-css" id="Pagination" style="height:40px;"></div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 购买模态框 -->
      <el-dialog title="购买" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品名称" prop="name">
            下关标准沱茶(礼盒装)
          </el-form-item>
          <el-form-item label="单价" prop="name">
            {{row.univalence}}元/{{row.specification}}
          </el-form-item>
          <el-form-item label="购买数量" prop="name">
            <el-input v-model="ruleForm.number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  export default ({
    data() {
      return {
        dialogVisible:false,
        activeName2:'first',
        num: 0,
        id: 1,
        start:"",//价格区间
        end:"",
        row:'',
        value:'',//规格容器
        ruleForm:{
          number:''
        },
        rules:{
          number: [
            { required: true, message: '请输入购买数量',type:'number', trigger: 'blur' }
          ],
        },
        options:[
          {value: '1',label: '片'},
          {value: '2',label: '粒'},
          {value: '3',label: '盒'},
        ],
        tableData: [{
            date: '2016-05-02',
            number: '110',
            specification: '片',
            univalence: '120',
          },{
            date: '2016-05-02',
            number: '150',
            specification: '片',
            univalence: '130',
          },{
            date: '2016-05-02',
            number: '120',
            specification: '片',
            univalence: '140',
          }],
        productList: [{
            src: require("../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png")
          },
          {
            src: require("../../assets/images/912258a1-5443-49f7-af77-cb0e05c5612d.png")
          },
          {
            src: require("../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png")
          },
          {
            src: require("../../assets/images/912258a1-5443-49f7-af77-cb0e05c5612d.png")
          },
          {
            src: require("../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png")
          },
        ],
        currentPage:1,
        pageSize:10
      }
    },
    methods: {
      message(){
         this.$confirm('您还未登录, 是否登陆?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.openPage('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
      handleCurrentChange(val){
        this.currentPage=val
      },
      handleSizeChange(val){
        this.pageSize=val
      },
      handleClick(row){
        if(this.$store.state.dialog.cookie!=true){
          this.message();
          return false;
        }
        this.row=row;
        console.log(this.row);
        this.dialogVisible=true;
      },
      setActiveItem(i) {
        this.$refs.carousel.setActiveItem(i)
      },
      drawLine() {
                // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))

                // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              animation: false,
              label: {
                formatter: '日期{value}',
                backgroundColor: '#505765'
              }
            }
          },
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: []
          },
          yAxis: {
            boundaryGap: ['20%', '20%'],
            min: 'dataMin'
          },
          series: []
        });

        this.axios.get('../../../static/data.json').then(res=>{
          let data=res.data
          var legendData=new Array(data.items.length);
				for(var i=0;i<data.items.length;i++){
					legendData.push(data.items[i].name);
				}
				
				myChart.setOption({
					title: {
				        text: data.title,
				        x:'left'
				    },
			        xAxis: {
			            data: data.xAxis
			        },
			        yAxis: {
			        	name: data.yAxisTitle
			        },
			        legend: {
			            data:legendData,
			            x: 'right'
			        },
			        series: data.items
			    });
        })


      }
    },
    mounted() {
      this.drawLine()
    },
  })
</script>
<style lang = 'less' scoped>
  @import '../../assets/shopProduct.css';
 .el-tabs__header{
    margin: 0!important;
  }
</style>