<template>
    <div>
        <el-row class="product-detai" >
            <el-col  style="min-width:1190px;margin:0 auto;float: none;" :span="16">
                <div class="main-side">
                    <div class="main-cont">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/teaMallRush' }">新茶抢购</el-breadcrumb-item>
                        <el-breadcrumb-item>一念间(伴手礼)</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="clearfix detail-slide issue">
                            <div class="small">
                                <ul>
                                    <li  v-for="(item,index) in productList" :class="{active:id==index}" :key="index">
                                        <img @click="id=index;setActiveItem(index)"  :src="item.src" alt="">
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
                                <h3 id="productName">一念间(伴手礼)</h3>
                                <div class="clearfix price">
                                    <div class="fl">价格
                                        <b id="price">260.00元/盒</b>
                                        <span style="color: rgb(153, 153, 153); text-decoration: line-through; margin-left: 20px; display: none;" id="guidePrice">260.00元/盒</span>
                                    </div>
                                    <div class="fr"></div>
                                </div>
                                <div class="store">
                                    <p id="percentDes">抢购总量：100盒 / 剩余库存：89盒</p>
                                    <el-progress :stroke-width='12' :percentage="11" color="#FF5F00"></el-progress>
                                </div>
                                <div class="clearfix unit">
                                    <label>单位</label>
                                    <div class="fl">
                                        <a id="unitName">盒</a>
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
                                        <button type="button" class="btn btn-primary" style="background-color:#aaaaaa;border-color:#aaaaaa;">已结束</button>
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
                            <div id="xiangqing" class="fixed">
                                <div class="row info">
                                    <div class="col-md-3">
                                        <div>品牌：
                                            <span id="brandName">津乔普洱</span>
                                        </div>
                                        <div>商品毛重：
                                            <span id="unitNum">72克</span>
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
                                <div class="row" id="detailImage">
                                    <div class="img">
                                        <img src="../../assets/images/08dfc8db-f8a6-48cc-bc0a-5d3d80a841d5.jpg">
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
    export default ({
        data(){
            return{
                num:0,
                id:1,
                productList:[
                    {src:require("../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png")},
                    {src:require("../../assets/images/912258a1-5443-49f7-af77-cb0e05c5612d.png")},
                    {src:require("../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png")},
                    {src:require("../../assets/images/912258a1-5443-49f7-af77-cb0e05c5612d.png")},
                    {src:require("../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png")},

                ]
            }
        },
        methods:{
            setActiveItem(i){
                this.$refs.carousel.setActiveItem(i)
            }
        }
    })
</script>
<style lang = 'less' scoped>
    @import "../../assets/protuct.css";
    .active{
        border-color: #fa8f72;
    }
</style>