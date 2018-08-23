<template>
    <div>
        <el-row class="product-detai">
            <el-col style="min-width:1190px;margin:0 auto;float: none;" :span="16">
                <div class="main-side">
                    <div class="main-cont">
                        <el-breadcrumb style="margin:10px 0" separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: '/teaMallRush' }" >新茶抢购</el-breadcrumb-item>
                            <el-breadcrumb-item>{{product.goods.goodsName}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="clearfix detail-slide issue">
                            <div class="small">
                                <ul v-if="product.pd.pcLargePicture"  :style="styleObject" >
                                    <li v-for="(item,index) in product.pd.pcLargePicture.split(',')" :class="{active:id==index}"  @click="id=index;setActiveItem(index)" :key="index">
                                        <img :src="item" alt="">
                                    </li>
                                </ul>
                                <ul v-else>
                                    <li v-for="(item,index) in productList" :class="{active:id==index}" @click="id=index;setActiveItem(index)" :key="index">
                                        <img :src="item.src" alt="">
                                    </li>
                                </ul>
                            </div>
                            <div class="big">
                                <el-carousel :arrow="'never'" :indicator-position="'none'" :autoplay="false" trigger="click" height="350px" ref="carousel">
                                    <el-carousel-item v-for="(item,index) in product.pd.pcLargePicture.split(',')" :key="index">
                                        <img :src="item" style="width:350px" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="fl info">
                                <h3 id="productName">{{product.goods.goodsName}}</h3>
                                <div class="clearfix price">
                                    <div class="fl">价格
                                        <b id="price">{{ (product.pd.effective==4||product.pd.releaseStatus == 6|| product.pd.releaseStatus == 7)?product.pd.guidancePrice:product.pd.releasePrice}}元 / {{product.pd.transactionSpecification3}}</b>
                                    </div>
                                    <div class="fr"></div>
                                </div>
                                <div class="store">
                                    <p id="percentDes">抢购总量：{{product.pd.rushBuyCountTotal }}{{product.pd.transactionSpecification3}} / 剩余库存：{{+product.pd.rushBuyCount}}{{product.pd.transactionSpecification3}} </p>
                                    <el-progress :stroke-width='12' :percentage="Math.ceil(+product.pd.soldCount/+product.pd.rushBuyCountTotal*100)?Math.ceil(+product.pd.soldCount/+product.pd.rushBuyCountTotal*100):0" color="#FF5F00"></el-progress>
                                </div>
                                <div class="clearfix unit">
                                    <label>单位</label>
                                    <div class="fl">
                                        <a id="unitName">{{product.pd.transactionSpecification3}}</a>
                                        <span id="productSpecification" style="margin-left: 50px;">{{product.specifications.benchmarkingUnitCount1/product.specifications.benchmarkingUnitCount2}}{{product.specifications.transactionSpecification2}}/{{product.specifications.transactionSpecification1}},{{product.specifications.benchmarkingUnitCount2/product.specifications.benchmarkingUnitCount3}}{{product.specifications.transactionSpecification3}}/{{product.specifications.transactionSpecification2}},{{product.specifications.benchmarkingUnitCount3}}{{product.specifications.benchmarkingUnit33}}/{{product.specifications.transactionSpecification3}}</span>
                                    </div>
                                </div>
                                <div class="clearfix num">
                                    <label>数量</label>
                                    <div class="fl number">
                                        <el-input-number size="small" v-model="num"></el-input-number>
                                        <span style="margin-left:20px" v-if="product.pd.purchaseLimite != 1">限购：<b style="color:#dc2b01">{{ product.pd.limiteCount?product.pd.limiteCount:0 }}{{ product.pd.transactionSpecification3 }}</b> </span><br><br>
                                        <el-select v-model="couponId"  placeholder="请选择优惠券">
                                            <el-option label="请选择优惠券" value="" ></el-option>
                                            <el-option :label="v.couponName" :value="v.id" v-for="(v,i) of product.couponUser" :key='i'></el-option>
                                        </el-select>
                                    </div>
                                    <input type="hidden" id="quantity" value="89">
                                </div>
                                <div v-if="product.pd.releaseStatus==5&&product.pd.effective==2" class="clearfix buttons">距离活动开始：<span style="color:#dc2b01;font-size:16px;">{{dayStr}}:{{hrStr}}:{{minStr}}:{{secStr}}</span> </div>
                                <div v-if="product.pd.releaseStatus==5&&product.pd.effective==1&&product.pd.rushBuyCount==0" class="clearfix buttons"><span style="color:#dc2b01;font-size:16px;">有订单尚未支付请您稍后查看</span> </div>
                                <div v-if="product.pd.releaseStatus==5&&product.pd.effective==1&&product.pd.rushBuyCount!=0" class="clearfix buttons">距离结束开始：<span style="color:#dc2b01;font-size:16px;">{{dayStr}}:{{hrStr}}:{{minStr}}:{{secStr}}</span> </div>
                                <div class="clearfix buttons">
                                    <div class="fl" id="btn">
                                        <button v-if="!phone"  type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">您尚未登录</button>
                                        <!-- <button v-else-if="!distributorCode && status == 1"  type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">您尚未绑定经销商</button> -->
                                        <button v-else-if='product.right==2'  type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">暂无资格</button>
                                        <button v-else-if='product.pd.effective==4||product.pd.releaseStatus==6||product.pd.releaseStatus==7'  type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">抢购已结束</button>
                                        <button v-else-if='product.pd.releaseStatus==5&&product.pd.effective==2'  type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">抢购即将开始</button> 
                                        <button v-else-if='product.pd.releaseStatus==5&&product.pd.effective==1&&product.pd.rushBuyCount==0'  type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">已售罄</button>    
                                        <button type="button" v-else-if='product.pd.releaseStatus==5&&product.pd.effective==1' @click="addNewPay" class="btn btn-primary" style="background-color:#d9534f;border-color:#d9534f;">立即抢购</button>
                                        <button v-else  type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">即将抢购</button>                                   
                                    </div>
                                    <div class="fl" id="time_div"></div>
                                </div>
                            </div>
                        </div>
                        <div class="detail-tab">
                            <ul class="nav nav-tabs tit">
                                <li class="active">
                                    <a href="#xiangqing">商品详情</a>
                                </li>
                            </ul>
                            <div class="fixed">
                                <div class="row info">
                                    <div class="col-md-4">品牌：
                                        <span>{{product.goods.belongEnterpriseName}}</span>
                                    </div>
                                    <div class="col-md-4">商品编号：
                                        <span>{{product.goods.goodsCode}}</span>
                                    </div>
                                    <div class="col-md-4">年份：
                                        <span>{{product.goods.productYear}}</span>
                                    </div>
                                    <div class="col-md-4">工艺：
                                        <span>{{product.goods.technology}}</span>
                                    </div>
                                    <div class="col-md-4">商品毛重：
                                        <span>{{product.goods.specificationsWeight}} {{product.goods.specifications}} </span>
                                    </div>
                                    <div class="col-md-4">内包装：
                                        <span>{{product.goods.internalPacking}}</span>
                                    </div>
                                    <div class="col-md-4">上市日期：
                                        <span>{{product.goods.listDate}}</span>
                                    </div>
                                    <div class="col-md-4">产品产地：
                                        <span>{{product.goods.placeOrigin}}</span>
                                    </div>
                                    <div class="col-md-4">外包装：
                                        <span>{{product.goods.outerPacking}} </span>
                                    </div>  
                                    <div class="col-md-4">食品添加剂：
                                        <span>{{product.goods.foodAdditives}}</span>
                                    </div>
                                    <div class="col-md-4">保质期：
                                        <span>{{product.goods.qualityPeriod}}</span>
                                    </div>
                                    <div class="col-md-4">储存建议：
                                        <span>{{product.goods.storageSuggest}}</span>
                                    </div>
                                </div>
                                <div class="row" v-if='product.pd.pcDetailPicture!=null'>
                                    <div class="img"  v-for="(item,index) in product.pd.pcDetailPicture.split(',')" :key="index">
                                        <img :src="item">
                                    </div>
                                </div>
                                <div class="row" v-else>
                                    <div class="img" v-for="(item,index) in product.pd.pcDetailPicture.split(',')" :key="index">
                                        <img :src="item">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
        styleObject:{},
      phone: this.getCookie("LOGIN_PHONE"),
      distributorCode: this.getCookie("DISTRIBUTOR_CODE"),
      num: 1,
      id: 0,
      productList: [],
      product: {
        pd: {
          pcLargePicture: ",",
          pcDetailPicture: ",",
          soldCount: 0,
          releaseCount: 0
        },
        couponList: [],
        couponUser: [],
        goods: {},
        right: 2,
        specifications: {}
      },
      http: this.$store.state.dialog.http,
      couponId: "",
      interval1: "",
      interval2: "",
      totalSecond: "",
      beforeSecond: "",
      nowSecond: "",
      dayStr: "00",
      hrStr: "00",
      minStr: "00",
      secStr: "00",
      status: this.getCookie("STATUS"),
    };
  },
  methods: {
    setActiveItem(i) {
      this.$refs.carousel.setActiveItem(i);
      console.log(i>4?(i-4)*71:0);
      let tX=i>=4?(i-3)*71:0;
      console.log(i);
      this.styleObject={height: 71*this.product.pd.pcLargePicture.split(',').length+'px',transform:'translateY('+-tX+'px)'}
    },
    getProduct() {
      this.axios
        .post(
          this.http + "/interface/pc/allotment/seckillInfo",
          qs.stringify({
            id: this.$route.query.id,
            phone: this.getCookie("LOGIN_PHONE"),
            goodsId: this.$route.query.goodsId
          })
        )
        .then(res => {
          if (res.data.code == 200) {
              console.log(JSON.parse(res.data.data))
            this.product = JSON.parse(res.data.data);
            // 防止split报错
            if (!this.product.pd.pcLargePicture) {
              this.product.pd.pcLargePicture = ",";
            }
            if (!this.product.pd.pcDetailPicture) {
              this.product.pd.pcDetailPicture = ",";
            }
            // 距离结束时间
            this.totalSecond = this.product.pd.expirationTime;
            // 距离开始时间
            this.beforeSecond = this.product.pd.startTime;
            // 活动时间
            this.nowSecond = this.totalSecond - this.beforeSecond;

            if (
              this.product.pd.releaseStatus == 5 &&
              this.product.pd.effective == 2
            ) {
              // 即将开始
              this.interval1 = setInterval(() => {
                this.beforeSecond--;
                if (this.beforeSecond <= 0) {
                  clearInterval(this.interval1);
                  this.product.pd.effective = 1;
                  this.interval2 = setInterval(() => {
                    this.nowSecond--;
                    if (this.nowSecond <= 0) {
                      this.product.pd.effective = 4;
                      clearInterval(this.interval2);
                      return;
                    }
                    var timer = this.dealTime(this.nowSecond);
                    this.dayStr = timer.dayStr;
                    this.hrStr = timer.hrStr;
                    this.minStr = timer.minStr;
                    this.secStr = timer.secStr;
                  }, 1000);
                }
                var timer = this.dealTime(this.beforeSecond);
                this.dayStr = timer.dayStr;
                this.hrStr = timer.hrStr;
                this.minStr = timer.minStr;
                this.secStr = timer.secStr;
              }, 1000);
            } else if (
              this.product.pd.releaseStatus == 5 &&
              this.product.pd.effective == 1
            ) {
              this.interval2 = setInterval(() => {
                this.totalSecond--;
                if (this.totalSecond <= 0) {
                  this.product.pd.effective = 4;
                  clearInterval(this.interval2);
                  return;
                }
                var timer = this.dealTime(this.totalSecond);
                this.dayStr = timer.dayStr;
                this.hrStr = timer.hrStr;
                this.minStr = timer.minStr;
                this.secStr = timer.secStr;
              }, 1000);
            }
          }
        });
    },
    addNewPay() {
      if (!+this.num || +this.num > +this.product.pd.rushBuyCount || +this.num < 0) {
        this.$message({
          type: "error",
          message: "请输入正确的数量"
        });
        return;
      }
      if(+this.num>+this.product.pd.limiteCount && this.product.pd.purchaseLimite != 1){
          this.$message({
          type: "error",
          message: "限购"+this.product.pd.limiteCount+this.product.pd.transactionSpecification3
        });
        return;
      }
      this.axios
        .post(
          this.http + "/interface/pc/order/submitOrder",
          qs.stringify({
            phone: this.phone,
            id: this.product.pd.id, //主键id
            count: this.num, //购买总量
            couponId:this.couponId,//优惠券
            channel: 3, //3为pc2为app
            state: this.status //2经销商1客户
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            // 跳转页面
            this.$router.openPage('/teaMallPayMent',{orderCode:JSON.parse(res.data.data).orderCode,type:1})
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
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
    },
    dealTime(time) {
      // 秒数
      var second = time;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = "0" + dayStr;
      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = "0" + hrStr;
      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = "0" + minStr;
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = "0" + secStr;
      return {
        dayStr,
        hrStr,
        minStr,
        secStr
      };
    }
  },
  created() {
    this.getProduct();
  }
};
</script>
<style lang = 'less' scoped>
@import "../../assets/protuct.css";
.active {
  border-color: #fa8f72;
}
</style>