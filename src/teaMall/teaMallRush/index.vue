<template>
    <div class="new-tea-sale">
        <div class="newTeaSale-banner"></div>
        <el-row>
            <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
                <div class="clearfix main-side">
                    <div class="main-cont">
                        <div class="notice">
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
                        </div>
                        <div class="release" id="release">
                            <h4><span>新茶目录</span><em class="line"></em></h4>
                            <div v-for="(item,index) in SpList" :key="index">
                            <div v-if='index%2==0'  class="row">
                                <div class="col-sm-6">
                                    <div class="img text-right">
                                        <a><img  @click="$router.openPage('/teaMallProduct')" src="../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png" style="width:495px;height:460px;"></a>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="info">
                                        <div class="tit">
                                            <div class="a" style="width:250px;">
                                                <h5>{{item.title}}</h5>
                                                <p>商品规格 12套/件,1盒/套,72克/盒</p>
                                            </div>
                                            <div class="b"><i>¥</i><b>260.00/盒</b></div>
                                        </div>
                                        <div class="property">
                                            <p><span>品牌 <b>津乔普洱</b></span><span>产地 <b>云南勐库地区</b></span><span>生产年份 <b>2017</b></span></p>
                                            <p class="p"><span>抢购总量：<b>100盒</b> / 剩余库存：<b>89盒</b></span></p>
                                            <div class="schedule">
                                                <p><em style="width: 11.00%;"></em><i>11.00%</i></p>
                                            </div>
                                        </div>
                                        <div class="buttons">
                                            <p class="clock"><span>已结束</span></p><button type="button" class="btn btn-primary-end">已结束</button></div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="row">
                                <div class="col-sm-6 text-right">
                                    <div class="info text-left">
                                        <div class="tit">
                                            <div class="a" style="width:250px;">
                                                <h5>{{item.title}}</h5>
                                                <p>商品规格 20套/件,1盒/套,84克/盒</p>
                                            </div>
                                            <div class="b"><i>¥</i><b>288.00/盒</b></div>
                                        </div>
                                        <div class="property">
                                            <p><span>品牌 <b>茶企通</b></span><span>产地 <b>云南</b></span><span>生产年份 <b>2017</b></span></p>
                                            <p class="p"><span>抢购总量：<b>100盒</b> / 剩余库存：<b>96盒</b></span></p>
                                            <div class="schedule">
                                                <p><em style="width: 4.00%;"></em><i>4.00%</i></p>
                                            </div>
                                        </div>
                                        <div class="buttons">
                                            <p class="clock"><span>已结束</span></p><button type="button" class="btn btn-primary-end">已结束</button></div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="img text-left">
                                        <a><img @click="$router.openPage('/teaMallProduct')" src="../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png" style="width:495px;height:460px;"></a>
                                    </div>
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
                SpList:[
                    {
                        title:'一念间(伴手礼)',
                    },
                    {
                        title:'一念间(伴手礼)',
                    },
                    {
                        title:'一念间(伴手礼)',
                    }
                ]
            }
        }
    })
</script>
<style lang = 'less' scoped>
@import '../../assets/teaMallRush.css';
</style>