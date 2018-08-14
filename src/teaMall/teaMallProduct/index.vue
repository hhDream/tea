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
                                <ul v-if="product.goods.pcLargePicture">
                                    <li v-for="(item,index) in product.goods.pcLargePicture.split(',')[index]" :class="{active:id==index}" :key="index">
                                        <img @click="id=index;setActiveItem(index)" :src="item" alt="">
                                    </li>
                                </ul>
                                <ul v-else>
                                    <li v-for="(item,index) in productList" :class="{active:id==index}" :key="index">
                                        <img @click="id=index;setActiveItem(index)" :src="item.src" alt="">
                                    </li>
                                </ul>
                            </div>
                            <div class="big">
                                <el-carousel :arrow="'never'" :indicator-position="'none'" :autoplay="false" trigger="click" height="350px" ref="carousel">
                                    <el-carousel-item v-for="(item,index) in productList" :key="index">
                                        <img :src="item.src" style="width:350px" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="fl info">
                                <h3 id="productName">{{product.goods.goodsName}}</h3>
                                <div class="clearfix price">
                                    <div class="fl">价格
                                        <b id="price">{{product.pd.releasePrice}}元 / {{product.pd.transactionSpecification3}}</b>
                                    </div>
                                    <div class="fr"></div>
                                </div>
                                <div class="store">
                                    <p id="percentDes">抢购总量：{{product.pd.rushBuyCountTotal }}{{product.pd.transactionSpecification3}} / 剩余库存：{{+product.pd.rushBuyCount}}{{product.pd.transactionSpecification3}} </p>
                                    <el-progress :stroke-width='12' :percentage="product.pd.lastNum" color="#FF5F00"></el-progress>
                                </div>
                                <div class="clearfix unit">
                                    <label>单位</label>
                                    <div class="fl">
                                        <a id="unitName">{{product.pd.transactionSpecification3}}</a>
                                        <span id="productSpecification" style="margin-left: 50px;">12套/件,1盒/套,72克/盒</span>
                                    </div>
                                </div>
                                <div class="clearfix num">
                                    <label>数量</label>
                                    <div class="fl number">
                                        <el-input-number size="small" v-model="num"></el-input-number>
                                    </div>
                                    <input type="hidden" id="quantity" value="89">
                                </div>
                                <div class="clearfix buttons">
                                    <div class="fl" id="btn">
                                        <button v-if='product.right==1' type="button" @click="addNewPay" class="btn btn-danger">立即抢购</button>
                                        <button v-else type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">暂无资格</button>
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
                                    <div class="col-md-3">
                                        <div>品牌：
                                            <span>{{product.goods.belongEnterpriseName}}</span>
                                        </div>
                                        <div>商品毛重：
                                            <span>{{product.goods.specificationsWeight}} {{product.goods.specifications}} </span>
                                        </div>
                                        <div>外包装：
                                            <span>{{product.goods.outerPacking}} </span>
                                        </div>
                                        <div>储存建议：
                                            <span>{{product.goods.storageSuggest}}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div>商品编号：
                                            <span>{{product.goods.goodsCode}}</span>
                                        </div>
                                        <!-- <div id="col1ChineseName">配送频次：
                                                    <span id="col1">津乔普洱</span>
                                                </div> -->
                                        <div>内包装：
                                            <span>{{product.goods.internalPacking}}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div>年份：
                                            <span>{{product.goods.productYear}}</span>
                                        </div>
                                        <div>上市日期：
                                            <span>{{product.goods.listDate}}</span>
                                        </div>
                                        <div>食品添加剂：
                                            <span>{{product.goods.foodAdditives}}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div>工艺：
                                            <span>{{product.goods.technology}}</span>
                                        </div>
                                        <div>产品产地：
                                            <span>{{product.goods.placeOrigin}}</span>
                                        </div>
                                        <div>保质期：
                                            <span>{{product.goods.qualityPeriod}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-if='product.goods.pcDetailPicture!=null'>
                                    <div class="img"  v-for="(item,index) in product.goods.pcDetailPicture.split(',')" :key="index">
                                        <img :src="item">
                                    </div>

                                </div>
                                <div class="row" v-else>
                                    <div class="img" v-for="(item,index) in productList" :key="index">
                                        <img :src="item.src">
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
    import qs from 'qs'
    export default ({
        data() {
            return {
                num: 1,
                id: 1,
                productList: [{
                    src: require("../../assets/images/912258a1-5443-49f7-af77-cb0e05c5612d.png")
                }, ],
                product: {
                    "pd": {
                        "releaseEnterpriseName": "正在加载",
                        "releaseBeginTime": "2018-08-06 10:38:46",
                        "releasePrice": "1000",
                        "releaseSpecification": "1",
                        "releaseCount": "1000",
                        "benchmarkingUnit3": "克",
                        "purchaseLimite": "1",
                        "releaseEnterpriseId": 97107222,
                        "marginLevelType": "1",
                        "soldCount": 11,
                        "setupStay": "0",
                        "stayRate": "80",
                        "banCycle": "7",
                        "id": 384,
                        "rushBuyType": "1",
                        "goodsName": "商品G010",
                        "rushBuyCount": "969",
                        "releaseRate": "2",
                        "appDetailPicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "expirationTime": 1779439,
                        "releaseEndTime": "2018-08-31 00:00:00",
                        "releaseEnterpriseAccount": "97846813",
                        "benchmarkingUnitCount3": "357",
                        "transactionSpecification3": "片",
                        "releaseCode": "FX800117146",
                        "appLargePicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "marginLevel": "20",
                        "modelSmallPicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "guidancePrice": "1200",
                        "goodsId": 87,
                        "factoryPrice": "600",
                        "confirmedNumber": "1000",
                        "appSmallPicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "storageCost": "7",
                        "totalMargin": "200000.0",
                        "freeStorageTime": "7",
                        "effective": 1,
                        "releaseType": "0",
                        "stayCount": "20",
                        "modelDetailPicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "releaseStatus": "5",
                        "startTime": -342235,
                        "modelLargePicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "distributorCount": "1",
                        "param3": 0,
                        "param1": "3",
                        "param2": 0,
                        "holdingCount": "10000",
                        "seasonCondimentsRate": "30",
                        "str_to_date(\n RELEASE_END_TIME,\n '%Y-%m-%d %H:%i:%s'\n )": "Aug 31, 2018 12:00:00 AM",
                        "auditStatus": "1",
                        "goodsCode": "SP420518321"
                    },
                    "couponList": [],
                    "couponUser": null,
                    "goods": {
                        "id": 87,
                        "goodsCode": "SP420518321",
                        "goodsName": "商品G010",
                        "goodsStatus": "0",
                        "belongEnterpriseId": "97107222",
                        "belongEnterpriseName": "茶企002",
                        "productYear": "1993",
                        "brand": "13",
                        "technology": "3",
                        "trandStatus": null,
                        "listDate": null,
                        "category": "4",
                        "placeOrigin": "无",
                        "outerPacking": "无",
                        "internalPacking": "无",
                        "qualityPeriod": "1",
                        "storageSuggest": "无",
                        "foodAdditives": "无",
                        "shelfPrice": null,
                        "specifications": "1",
                        "specificationsWeight": null,
                        "shelfCount": null,
                        "soldCount": "0",
                        "releaseStatus": "0",
                        "pcSmallPicture": null,
                        "pcLargePicture": null,
                        "pcDetailPicture": null,
                        "appSmallPicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "appLargePicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "appDetailPicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "modelSmallPicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "modelLargePicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "modelDetailPicture": "picture/e89d1a9edb5749108def2fbf10ac1e5a.png",
                        "benchmarkingUnit3": null
                    },
                    "right": 2,
                    "specifications": {
                        "id": 1,
                        "specificationsName": "普洱",
                        "transactionSpecification1": "件",
                        "benchmarkingUnit1": "克",
                        "benchmarkingUnitCount1": "17493",
                        "transactionSpecification2": "提",
                        "benchmarkingUnit2": "克",
                        "benchmarkingUnitCount2": "2499",
                        "transactionSpecification3": "片",
                        "benchmarkingUnit3": "克",
                        "benchmarkingUnitCount3": "357",
                        "param1": null,
                        "param2": null,
                        "param3": null,
                        "param4": null,
                        "param5": null
                    }
                },
                http: this.$store.state.dialog.http,
                phone: this.$store.state.dialog.phone,
                fx: this.$route.query.id,
                couponId: ''
            }
        },
        methods: {
            setActiveItem(i) {
                this.$refs.carousel.setActiveItem(i)
            },
            getProduct() {
                this.axios.post(this.http + '/interface/pc/allotment/seckillInfo', qs.stringify({
                    id: this.$route.query.id
                })).then(res => {
                    this.product = JSON.parse(res.data.data)
                    console.log(JSON.parse(res.data.data));
                    this.product.pd.lastNum= Math.ceil(+this.product.pd.rushBuyCount/+this.product.pd.rushBuyCountTotal)
                })
            },
            addNewPay() {
                this.axios.post(this.http + '/interface/pc/order/submitOrder', qs.stringify({
                    phone: this.phone,
                    id: this.fx, //发行编码
                    count: this.num, //购买总量
                    // couponId:this.couponId,//优惠券
                    channel: 3, //3为pc2为app
                    state: 2 //2经销商1客户
                })).then(res => {
                    console.log(res.data);
                })
            }
        },
        created() {
            this.getProduct()
        },
    })
</script>
<style lang = 'less' scoped>
    @import "../../assets/protuct.css";
    .active {
        border-color: #fa8f72;
    }
</style>