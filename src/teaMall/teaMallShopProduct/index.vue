<template>
  <div style="background:#F6F6F6" v-if="have">
    <el-row>
      <el-col class="main-cont-mall" style="min-width:1190px;margin:20px auto;float: none;background:#fff" :span="16">
        <div class="main-side">
          <div class="main-cont" style="min-width:1119px">
            <el-breadcrumb style="margin-bottom:10px" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/teaMallShop' }">自由集市</el-breadcrumb-item>
              <el-breadcrumb-item>{{product.alotments.goodsName}}</el-breadcrumb-item>
              <!-- <el-breadcrumb-item>混合</el-breadcrumb-item>
              <el-breadcrumb-item>勐库地区</el-breadcrumb-item> -->
            </el-breadcrumb>
            <div class="detail-productContent">
              <div class="detail-productContent-l fl">
                <div class="w290px fl">
                  <div class="product-picture-big big">
                    <el-carousel :arrow="'never'" :indicator-position="'none'" :autoplay="false" trigger="click" height="288px" ref="carousel">
                      <el-carousel-item v-for="(item,index) in product.goods.pcLargePicture.split(',')" :key="index">
                        <img :src="item" style="width:288px" alt="">
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                  <div class="mt20px small">
                    <a class="picture-arrow-left go_t" @click="id>0?id--:id=product.goods.pcLargePicture.split(',').length-1;setActiveItem(id)">&lt;</a>
                    <div class="product-picture-small">
                      <ul id="small" :style="styleObject">
                        <li v-for="(item,index) in product.goods.pcLargePicture.split(',')" :class="{active:id==index}" @click="id=index;setActiveItem(index)" :key="index">
                          <img  :src="item" alt="">
                        </li>
                      </ul>
                    </div>
                    <a class="picture-arrow-right go_b" @click="id<product.goods.pcLargePicture.split(',').length-1?id++:id=0;setActiveItem(id)">&gt;</a>
                  </div>
                </div>
                <div class="productContent-parameter fl">
                  <h2 id="productName">{{product.alotments.goodsName}}</h2>
                  <div class="fs12px mt10px"></div>
                  <div class="bg-price mt10px">
                    <div>
                      <label>
                        <span>零售指导价：</span>
                      </label>
                      <span class="c-red" id="guidePrice">{{product.alotments.releasePrice }}元/{{product.alotments.transactionSpecification3 }}</span>
                    </div>
                  </div>
                  <div class="mt20px" id="productSpecification">商品规格：{{product.specifications.benchmarkingUnitCount1/product.specifications.benchmarkingUnitCount2}}{{product.specifications.transactionSpecification2}}/{{product.specifications.transactionSpecification1}},{{product.specifications.benchmarkingUnitCount2/product.specifications.benchmarkingUnitCount3}}{{product.specifications.transactionSpecification3}}/{{product.specifications.transactionSpecification2}},{{product.specifications.benchmarkingUnitCount3}}{{product.specifications.benchmarkingUnit33}}/{{product.specifications.transactionSpecification3}}</div>
                  <div class="productContent-parameter-data mt20px">
                    <div>可买量：
                      <span class="c-orange" id="saleNo">{{+product.alotments.param2}}{{product.alotments.transactionSpecification3 }}</span>
                    </div>
                    <div>求购量：
                      <span class="c-orange" id="buyNo">0{{product.alotments.transactionSpecification3 }}</span>
                    </div>
                    <div class="br-none">成交量：
                      <span class="c-orange" id="historySaleCount">{{product.alotments.param3}}{{product.alotments.transactionSpecification3 }}</span>
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
            <el-tabs v-model="activeName2" style="margin-top:20px;max-width:1118px" type="border-card">
              <el-tab-pane label="报价窗口" name="first">
                <el-row>
                  <el-col :span="7">
                    按规格显示
                    <el-select style="width:193px" v-model="value" size="mini" clearable placeholder="请选择">
                      <el-option  :label="options.transactionSpecification1" :value="1"></el-option>
                      <el-option  :label="options.transactionSpecification2" :value="2"></el-option>
                      <el-option  :label="options.transactionSpecification3" :value="3"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="17">
                    <el-input style="display:inline-block;width:100px" size="mini" v-model="lowPrice"></el-input>~
                    <el-input style="display:inline-block;width:100px" size="mini" v-model="topPrice"></el-input>
                    <el-button size="mini" style="margin-left:50px" @click="getTable()" icon="el-icon-search" circle></el-button>
                  </el-col>
                </el-row>
                <el-table :data="tableData" @sort-change="sortChange" style="width: 100%">
                  <el-table-column prop="id" label="序号" width="180">
                  </el-table-column>
                  <el-table-column prop="param4" sortable='custom' label="数量" width="180">
                  </el-table-column>
                  <el-table-column prop="param3" label="规格">
                  </el-table-column>
                  <el-table-column prop="goodsPrice"  sortable='custom' label="单价(元)">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                          <el-button v-if="phone" @click="handleClick(scope.row)" type="text">立即购买</el-button>
                          <el-button v-if="!phone" @click="$route.openPage('/login')" type="text">立即登录</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                    <el-pagination
                      style="margin-top:20px"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="商品详情" name="second">
                <div id="xiangqing" class=" w1118px ">
                  <div class="info">
                    <div class="col-md-3">
                      <div>品牌：
                        <span id="brandName">{{product.goods.brand}}</span>
                      </div>
                      <div>商品毛重：
                        <span id="unitNum">{{product.alotments.benchmarkingUnitCount3}}{{product.alotments.benchmarkingUnit3}}</span>
                      </div>
                      <div id="co14ChineseName">外包装：
                        <span id="col4">{{product.goods.outerPacking}}</span>
                      </div>
                      <div id="col8ChineseName">储存建议：
                        <span id="col8">{{product.goods.storageSuggest}}</span>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div>商品编号：
                        <span id="productCode">YNJ2018030502</span>
                      </div>
                      <div id="col1ChineseName">配送频次：
                        <span id="col1">{{product.goods.brand}}</span>
                      </div>
                      <div id="col5ChineseName">内包装：
                        <span id="col5">{{product.goods.internalPacking }}</span>
                      </div>
                      <div id="col9ChineseName">
                        <span id="col9"></span>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div>年份：
                        <span id="makeDate">{{product.goods.productYear}}</span>
                      </div>
                      <div id="col2ChineseName">生产日期：
                        <span id="col2">{{product.goods.productYear}}</span>
                      </div>
                      <div id="col6ChineseName">食品添加剂：
                        <span id="col6">{{product.goods.foodAdditives}}</span>
                      </div>
                      <div id="col10ChineseName">
                        <span id="col10"></span>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div>工艺：
                        <span id="craft">{{product.goods.technology}}</span>
                      </div>
                      <div id="col3ChineseName">产品产地：
                        <span id="col3">{{product.goods.placeOrigin}}</span>
                      </div>
                      <div id="col7ChineseName">保质期：
                        <span id="col7">{{product.goods.qualityPeriod }}年</span>
                      </div>
                    </div>
                  </div>
                      <img v-for="(item,index) in product.goods.pcDetailPicture.split(',')" :key="index" style="margin: 0 auto;display: block;margin-top:120px;width:100%" :src="product.goods.pcDetailPicture.split(',')[index]">
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
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品名称" prop="name">
            {{ row.goodsName }}
          </el-form-item>
          <el-form-item label="单价" prop="name">
            {{row.goodsPrice}}元/{{row.param3}}
          </el-form-item>
          <el-form-item label="总数量" prop="name">
            {{row.goodsCount}}{{ row.param3 }}
          </el-form-item>
          <el-form-item label="购买数量" prop="name">
            <el-input style="width:150px" v-model="number"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false;row={}">取 消</el-button>
          <el-button type="primary" @click="buyNow()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      styleObject:{},
      phone: this.getCookie("LOGIN_PHONE"),
      dialogVisible: false,
      activeName2: "first",
      have: false,
      num: 0,
      id: 0,
      start: "", //价格区间
      end: "",
      row: {},
      value: "", //规格容器
      number: "",
      product: {},
      options: {},
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      http: this.$store.state.dialog.http,
      data: {
        title: null,
        xAxisTitle: "",
        yAxisTitle: "价格(元/盒)",
        xAxis: [
          "6.12",
          "6.13",
          "6.14",
          "6.15",
          "6.16",
          "6.17",
          "6.18",
          "6.19",
          "6.20",
          "6.21",
          "6.22",
          "6.23",
          "6.24",
          "6.25",
          "6.26",
          "6.27",
          "6.28",
          "6.29",
          "6.30",
          "7.1",
          "7.2",
          "7.3",
          "7.4",
          "7.5",
          "7.6",
          "7.7",
          "7.8",
          "7.9",
          "7.10"
        ],
        items: [
          {
            name: "历史成交均价",
            data: [
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238",
              "238"
            ],
            type: "line"
          },
          {
            name: "零售指导价",
            data: [
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288",
              "288"
            ],
            type: "line"
          }
        ]
      },
      sort: 1,
      topPrice: "",
      lowPrice: "",
      total: 0
    };
  },
  methods: {
    buyNow() {
      if (
        !+this.number ||
        +this.number > +this.row.goodsCount ||
        +this.number < 0
      ) {
        this.$message({
          type: "error",
          message: "请输入正确的数量"
        });
        return;
      }
      this.axios
        .post(
          this.http + "/interface/pc/order/shoppingMallOrder",
          qs.stringify({
            phone: this.phone,
            id: this.row.id, //主键id
            count: this.number, //购买总量
            channel: 3, //3为pc2为app
            state: this.getCookie("STATUS") //2经销商1客户
          })
        )
        .then(res => {
          this.dialogVisible = false;
          if (res.data.code == 200) {
            // 跳转页面
            this.$router.openPage("/teaMallPayMent", {
              orderCode: JSON.parse(res.data.data).orderCode,
              type: 2
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
    },
    message() {
      this.$confirm("您还未登录, 是否登陆?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.openPage("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTable();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTable();
    },
    sortChange(val) {
      if (val.prop == "param4") {
        this.sort = val.order == "descending" ? 2 : 1;
        this.getTable2();
      } else {
        this.sort = val.order == "descending" ? 2 : 1;
        this.getTable();
      }
    },
    handleClick(row) {
      if (this.$store.state.dialog.cookie != true) {
        this.message();
        return false;
      }
      console.log(row);
      this.row = row;
      this.dialogVisible = true;
    },
    getProduct() {
      this.axios
        .post(
          this.http + "/interface/pc/allotment/soldInformationTop",
          qs.stringify({
            goodsCode: this.$route.query.id, //商品编码
            releaseCode: this.$route.query.releaseCode,
            phone: this.$store.state.dialog.phone
          })
        )
        .then(res => {
          console.log(JSON.parse(res.data.data))
          this.options = JSON.parse(res.data.data).specifications;
          this.product = JSON.parse(res.data.data);
          if (this.product.goods.pcDetailPicture == null) {
            this.product.goods.pcDetailPicture =
              "../../assets/images/912258a1-5443-49f7-af77-cb0e05c5612d.png";
          }
          if (this.product.goods.pcLargePicture == null) {
            this.product.goods.pcLargePicture =
              "../../assets/images/912258a1-5443-49f7-af77-cb0e05c5612d.png";
          }
          if (this.product.goods.pcSmallPicture == null) {
            this.product.goods.pcSmallPicture =
              "../../assets/images/912258a1-5443-49f7-af77-cb0e05c5612d.png";
          }
          this.have = true;
        })
        .then(() => {
          this.drawLine();
        })
        .then(() => {
          this.getTable();
        });
    },
    getTable() {
      this.axios
        .post(
          this.http + "/interface/pc/allotment/soldInformation",
          qs.stringify({
            goodsCode: this.$route.query.id, //商品编码
            priceSort: this.sort, //1升2降
            releaseCode: this.$route.query.releaseCode,
            // countSort:1,
            specificationSonId: this.value,
            currentPage: this.currentPage,
            lowPrice: this.lowPrice,
            topPrice: this.topPrice,
            pageSize: this.pageSize,
            phone: this.$store.state.dialog.phone
          })
        )
        .then(res => {
          console.log(JSON.parse(res.data.data));
          this.tableData = JSON.parse(res.data.data).onTheShelves;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        });
    },
    getTable2() {
      this.axios
        .post(
          this.http + "/interface/pc/allotment/soldInformation",
          qs.stringify({
            goodsCode: this.$route.query.id, //商品编码
            // priceSort:this.sort,//1升2降
            releaseCode: this.$route.query.releaseCode,
            countSort: this.sort,
            specificationSonId: this.value,
            currentPage: this.currentPage,
            lowPrice: this.lowPrice,
            topPrice: this.topPrice,
            pageSize: this.pageSize,
            phone: this.$store.state.dialog.phone
          })
        )
        .then(res => {
          this.tableData = JSON.parse(res.data.data).onTheShelves;
          this.total = JSON.parse(res.data.data).total;
          this.currentPage = JSON.parse(res.data.data).currentPage;
        });
    },
    setActiveItem(i) {
      this.$refs.carousel.setActiveItem(i);
      console.log(this.id);
      console.log(this.id>4?(this.id-4)*49:0);
      let tX=this.id>=4?(this.id-4)*49:0;
      this.styleObject={width: 49*this.product.goods.pcLargePicture.split(',').length+'px',transform:'translateX('+-tX+'px)'}
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            animation: false,
            label: {
              formatter: "日期{value}",
              backgroundColor: "#505765"
            }
          }
        },
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true
          },
          data: []
        },
        yAxis: {
          boundaryGap: ["20%", "20%"],
          min: "dataMin"
        },
        series: []
      });
      let data = this.data;
      var legendData = new Array(data.items.length);
      for (var i = 0; i < data.items.length; i++) {
        legendData.push(data.items[i].name);
      }
      myChart.setOption({
        title: {
          text: data.title,
          x: "left"
        },
        xAxis: {
          data: data.xAxis
        },
        yAxis: {
          name: data.yAxisTitle
        },
        legend: {
          data: legendData,
          x: "right"
        },
        series: data.items
      });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return arr[2];
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getProduct();
  }
};
</script>
<style lang = 'less' scoped>
@import "../../assets/shopProduct.css";
.el-tabs__header {
  margin: 0 !important;
}
#small{
  transition: all 0.25s ease;
}
</style>