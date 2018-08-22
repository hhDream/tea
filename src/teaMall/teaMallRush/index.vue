<template>
    <div class="new-tea-sale">
        <el-carousel height="350px">
            <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                <a href="" :style="{ 'background': 'url(' + item.src + ') center top no-repeat','display':'block','width':'100%','height':'100%' }"></a>
            </el-carousel-item>
        </el-carousel>
        <!-- <div class="newTeaSale-banner"></div> -->
        <el-row>
            <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
                <div class="clearfix main-side">
                    <div class="main-cont">
                        <!-- <div class="notice">
                            <h4><span id="noticeTitle">【2018新品抢购】一念间·小粒茶和红柑丸</span></h4>
                            <div class="cont" id="content">
                                <p>2018春季抢购——津乔茶业新品一念间·小粒茶和红柑丸即将在茶企通平台亮相，自3月6日起新用户注册即可享受108元现金券大礼包。数量有限，欲购从速。</p>
                                <p>【新茶信息】<br> &nbsp;产品名称：一念间·小粒茶（伴手礼）
                                    <br> &nbsp;产品属性：生茶/熟茶/红茶
                                    <br> &nbsp;产品产地：云南勐库地区
                                    <br> &nbsp;产品规格：72g/套（内附随身盒3小盒）
                                    <br> 茶企通平台首发抢购价：208 元/盒（抢购结束恢复市场零售价：260元/盒）</p>
                                <p>产品名称：红柑丸<br> &nbsp;产品属性：熟茶
                                    <br> &nbsp;产品产地：云南勐库地区
                                    <br> &nbsp;产品规格：84g（7克/粒，12粒/盒，20盒/件）
                                    <br> 茶企通平台首发抢购价：128 元/盒（抢购结束恢复市场零售价：160元/盒）</p>
                                <p><br> 具体抢购时间：2018年3月7日10:00——2018年3月18日10:00
                                </p>
                            </div>
                        </div> -->
                        <div class="release" id="release">
                            <h4><span>新茶目录</span><em class="line"></em></h4>
                            <div v-for="(item,index) in SpList" :key="index">
                            <div v-if='index%2==0'  class="row">
                                <div class="col-sm-6">
                                    <div class="img text-right">
                                        <a v-if="item.effective!=3"><img @click="$router.openPage('/teaMallProduct',{resource:item.resource,id:item.releaseCode?item.releaseCode:'',goodsId:item.goodsId?item.goodsId:''})" :src="item.pcSmallPicture" style="width:495px;height:460px;"></a>
                                        <a v-else><img @click="$router.openPage('/teaMallProduct',{resource:item.resource,id:item.releaseCode?item.releaseCode:'',goodsId:item.goodsId?item.goodsId:''})" :src="item.pcSmallPicture" style="width:495px;height:460px;"></a>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="info">
                                        <div class="tit">
                                            <div class="a" style="width:250px;">
                                                <h5>{{item.goodsName}}</h5>
                                                <p>商品规格 {{item.benchmarkingUnitCount1/item.benchmarkingUnitCount2}}{{item.transactionSpecification2}}/{{item.transactionSpecification1}},{{item.benchmarkingUnitCount2/item.benchmarkingUnitCount3}}{{item.transactionSpecification3}}/{{item.transactionSpecification2}},{{item.benchmarkingUnitCount3}}{{item.benchmarkingUnit33}}/{{item.transactionSpecification3}}</p>
                                            </div>
                                            <div class="b"  v-if="item.effective!=3"><i>¥</i><b>{{ (item.effective==4||item.releaseStatus == 6|| item.releaseStatus == 7)?item.guidancePrice:item.releasePrice}}/{{item.benchmarkingUnit3}}</b></div>
                                            <div class="b"  v-else><i>¥</i><b>?</b></div>
                                        </div>
                                        <div class="property">
                                            <p><span>品牌 <b>{{item.brand}}</b></span><span>生产年份 <b>{{item.productYear}}</b></span></p>
                                            <p class="p" v-if="item.effective!=3"><span>抢购总量：<b>{{item.rushBuyCountTotal?item.rushBuyCountTotal:0}}{{item.benchmarkingUnit3}}</b> / 剩余库存：<b>{{item.rushBuyCount?item.rushBuyCount:0}}{{item.benchmarkingUnit3}}</b></span></p>
                                            <div class="schedule"  v-if="item.effective!=3">
                                                <p><em :style="{width: Math.ceil(+item.soldCount*100 / +item.rushBuyCountTotal)+'%'}"></em><i>{{isNaN(Math.ceil(+item.soldCount*100 / +item.rushBuyCountTotal))?0:Math.ceil(+item.soldCount*100 / +item.rushBuyCountTotal)}}.00%</i></p>
                                            </div>
                                        </div>
                                        <div class="buttons">
                                            <p class="clock">
                                                <span v-if="item.releaseStatus==5&&item.effective==1&&item.rushBuyCount==0">已售罄</span>
                                                <span v-else>{{item.resource==2?'尚未发售':(item.effective==4||item.releaseStatus==6||item.releaseStatus==7)?'抢购结束':(item.effective==1&&item.releaseStatus==5)?'立即抢购':(item.effective==2&&item.releaseStatus==5)?'抢购即将开始':'即将抢购'}}</span>
                                            </p>
                                            <button v-if="item.releaseStatus==5&&item.effective==1&&item.rushBuyCount==0" @click="$router.openPage('/teaMallProduct',{resource:item.resource,id:item.releaseCode?item.releaseCode:'',goodsId:item.goodsId?item.goodsId:''})"  type="button" :class="{'btn':true, 'btn-danger':true, 'btn-primary-end':true}">已售罄</button>
                                            <button v-else @click="$router.openPage('/teaMallProduct',{resource:item.resource,id:item.releaseCode?item.releaseCode:'',goodsId:item.goodsId?item.goodsId:''})"  type="button" :class="{'btn':true, 'btn-danger':true, 'btn-primary-end':item.effective==1?false:true}">{{item.resource==2?'尚未发售':(item.effective==4||item.releaseStatus==6||item.releaseStatus==7)?'抢购结束':(item.effective==1&&item.releaseStatus==5)?'立即抢购':(item.effective==2&&item.releaseStatus==5)?'抢购即将开始':'即将抢购'}}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="row">
                                <div class="col-sm-6 text-right">
                                    <div class="info text-left">
                                        <div class="tit">
                                            <div class="a" style="width:250px;">
                                                <h5>{{item.goodsName}}</h5>
                                                <p>商品规格 {{item.benchmarkingUnitCount1/item.benchmarkingUnitCount2}}{{item.transactionSpecification2}}/{{item.transactionSpecification1}},{{item.benchmarkingUnitCount2/item.benchmarkingUnitCount3}}{{item.transactionSpecification3}}/{{item.transactionSpecification2}},{{item.benchmarkingUnitCount3}}{{item.benchmarkingUnit33}}/{{item.transactionSpecification3}}</p>
                                            </div>
                                            <div class="b" v-if="item.resource == 1"><i>¥</i><b>{{ (item.effective==4||item.releaseStatus == 6|| item.releaseStatus == 7)?item.guidancePrice:item.releasePrice}}/{{item.benchmarkingUnit3}}</b></div>
                                            <div class="b" v-else><i>¥</i><b>?</b></div>
                                        </div>
                                        <div class="property">
                                            <p><span>品牌 <b>{{item.brand}}</b></span><span>生产年份 <b>{{item.productYear}}</b></span></p>
                                            <p class="p"><span>抢购总量：<b>{{item.rushBuyCountTotal?item.rushBuyCountTotal:0}}{{item.benchmarkingUnit3}}</b> / 剩余库存：<b>{{item.rushBuyCount?item.rushBuyCount:0}}{{item.benchmarkingUnit3}}</b></span></p>
                                            <div class="schedule">
                                                <p><em :style="{width: Math.ceil(+item.soldCount*100 / +item.rushBuyCountTotal)+'%'}"></em><i>{{isNaN(Math.ceil(+item.soldCount*100 / +item.rushBuyCountTotal))?0:Math.ceil(+item.soldCount*100 / +item.rushBuyCountTotal)}}.00%</i></p>
                                            </div>
                                        </div>
                                        <div class="buttons">
                                            <p class="clock">
                                                <span v-if="item.releaseStatus==5&&item.effective==1&&item.rushBuyCount==0">已售罄</span>
                                                <span v-else>{{item.resource==2?'尚未发售':(item.effective==4||item.releaseStatus==6||item.releaseStatus==7)?'抢购结束':(item.effective==1&&item.releaseStatus==5)?'立即抢购':(item.effective==2&&item.releaseStatus==5)?'抢购即将开始':'即将抢购'}}</span>
                                            </p>
                                            <button  v-if="item.releaseStatus==5&&item.effective==1&&item.rushBuyCount==0" @click="$router.openPage('/teaMallProduct',{resource:item.resource,id:item.releaseCode?item.releaseCode:'',goodsId:item.goodsId?item.goodsId:''})"  type="button" :class="{'btn':true, 'btn-danger':true, 'btn-primary-end':true}">已售罄</button>
                                            <button v-else @click="$router.openPage('/teaMallProduct',{resource:item.resource,id:item.releaseCode?item.releaseCode:'',goodsId:item.goodsId?item.goodsId:''})"  type="button" :class="{'btn':true, 'btn-danger':true, 'btn-primary-end':item.effective==1?false:true}">{{item.resource==2?'尚未发售':(item.effective==4||item.releaseStatus==6||item.releaseStatus==7)?'抢购结束':(item.effective==1&&item.releaseStatus==5)?'立即抢购':(item.effective==2&&item.releaseStatus==5)?'抢购即将开始':'即将抢购'}}</button>
                                        </div>      
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="img text-left">
                                        <a><img @click="$router.openPage('/teaMallProduct',{resource:item.resource,id:item.releaseCode?item.releaseCode:'',goodsId:item.goodsId?item.goodsId:''})" :src="item.pcSmallPicture" style="width:495px;height:460px;"></a>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div style="text-align:center;margin-top:30px;font-size:18px;cursor:pointer;color:#dc2b01;text-decoration:underline" @click="getMore()">{{ text }}</div>
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
      text: "点击加载更多",
      http: this.$store.state.dialog.http,
      pageSize: 3,
      bannerList: [
        {
          src: require("../../assets/images/banner1.jpg")
        }
      ],
      SpList: [
      ]
    };
  },
  methods: {
      getMore(){
          if(this.text == '没有更多了'){
              return;
          }
          this.pageSize = this.pageSize + 3;
          this.getRushList();
      },
    getRushList() {
      this.axios
        .post(
          this.http + "/interface/pc/allotment/seckill",
          qs.stringify({
            pageSize: this.pageSize
          })
        )
        .then(res => {
          if (res.data.code == 200) {
              console.log(JSON.parse(res.data.data))
            this.SpList = JSON.parse(res.data.data);
            if(this.pageSize > this.SpList.length){
                this.text = '没有更多了';
            }
          }
        });
    }
  },
  created() {
    this.getRushList();
  }
};
</script>
<style lang = 'less' scoped>
@import "../../assets/teaMallRush.css";
</style>