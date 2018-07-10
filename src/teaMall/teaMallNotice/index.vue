<template>
    <div>
        <el-row>
            <el-col :span="16" style="min-width:1190px;margin:0 auto;float: none;">
                <div class="article-cont">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/teaMallMoreNotice' }">公告列表</el-breadcrumb-item>
                    <el-breadcrumb-item>公告详情</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="wz_text">
                        <h1 id="notice_title" style="word-break:break-all;">【新品上市】一念间·小粒茶和红柑丸</h1>
                        <div class="fontsize" id="notice_publishTime">2018-03-07 10:00:01&nbsp;&nbsp; 字体： <a href="#" @click="size=20">大</a> | <a href="#" @click="size=16">中</a> | <a href="#" @click="size=12">小</a> &nbsp;&nbsp; 茶企通官方平台</div>
                        <div id="text" :style="{wordBreak: 'break-all',fontSize:size+'px'}">
                            <p style="text-align: center;"><span style="color:#FF0000"><strong>红柑丸</strong></span></p>
                            我的id是<span style="font-size:20px;color:red">{{this.$store.state.index.noticeId}}</span> 
                            <p>1、商品参数</p>
                            <p>【品牌名称】津乔茶业</p>
                            <p>【商品净含量】84g</p>
                            <p>【产品规格】7克/粒，12粒/盒，20盒/件</p>
                            <p>【储存建议】避光防潮，透气、防异味</p>
                            <p>【生产日期】2017年12月</p>
                            <p>【工艺】全手工制作</p>
                            <p>【产品产地】云南省临沧市双江县勐库镇</p>
                            <p>【保质期】长期</p>
                            <p>&nbsp;</p>
                            <p>2、商品价格</p>
                            <p>【市场零售价】160元/盒，3200元/件</p>
                            <p>【抢购价】128元／盒；</p>
                            <p>&nbsp;</p>
                            <p>3、商品介绍</p>
                            <p>【卖点信息】</p>
                            <p>不用掰散的柑普茶、津乔首款伴手礼、冬季养生佳品</p>
                            <p>【品牌介绍】</p>
                            <p>津乔茶业半个世纪以来始终坚持“匠心传承，品味纯粹”的品牌理念，致力于发挥产区优势，遵循企业独创的“津制工艺”制茶标准，以”传承经典，工于至善“为制茶理念，沿袭普洱茶传统制作技艺，加入现代化制茶的要求，并融合津乔品牌的精细化标准，将“纯正原料、传统工艺、现代设计”完美融合，打造了津乔茶业的差异化竞争优势，铸就了品质普洱茶典范品牌和临沧茶区代表性优质品牌，成为了同业内的领军企业。</p>
                            <p>【实物商品介绍】</p>
                            <p>&nbsp;“红柑丸”，因选材和圆润造型而取名，茶品搭配经典，精选津乔“陈年配方”熟普，辅以新会永久保护地红柑丝，经精心配比、全手工制成。熟茶的醇厚与陈香融合了红柑的果香，让茶汤入口甘醇、香甜，暖胃暖身的同时，新会陈皮良好的“理气”功效会帮助您在生活中保持身心舒爽。同时红柑丸颠覆传统整粒大红柑形态，将柑皮精致切丝，与熟茶揉合成沱，一粒一泡，小铁盒收纳，既方便携带分享，又方便冲泡，让你从取茶到冲泡，至少节约3分钟品宝贵时间。</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <p style="text-align: center;"><strong><span style="color:#FF0000">一念间·小粒茶</span></strong></p>
                            <p>1、商品参数</p>
                            <p>【品牌名称】津乔茶业</p>
                            <p>【商品净含量】标准装248g，伴手礼72g</p>
                            <p>【伴手礼装规格】3随身盒/套（2gx12粒/盒）一套三味，生、熟、红各1盒；</p>
                            <p>【储存建议】避光防潮，透气、防异味</p>
                            <p>【生产日期】2017年12月</p>
                            <p>【工艺】 小粒茶全手工工序制作</p>
                            <p>【产品产地】云南省临沧市双江县勐库镇</p>
                            <p>【保质期】长期</p>
                            <p>&nbsp;</p>
                            <p>2、商品价格</p>
                            <p>【市场零售价】260元／盒</p>
                            <p>【抢购价】208元／盒</p>
                            <p>&nbsp;</p>
                            <p>3、商品介绍</p>
                            <p>【商品卖点信息】</p>
                            <p>一粒一杯，一杯一味，2克小粒，3种滋味，4款收纳，便携易冲泡，适合多个生活场景，缔造高效茶尚品质生活。</p>
                            <p>【商品品牌介绍】</p>
                            <p>津乔茶业半个世纪以来始终坚持“匠心传承，品味纯粹”的品牌理念，致力于发挥产区优势，遵循企业独创的“津制工艺”制茶标准，以”传承经典，工于至善“为制茶理念，沿袭普洱茶传统制作技艺，加入现代化制茶的要求，并融合津乔品牌的精细化标准，将“纯正原料、传统工艺、现代设计”完美融合，打造了津乔茶业的差异化竞争优势，铸就了品质普洱茶典范品牌和临沧茶区代表性优质品牌，成为了同业内的领军企业。</p>
                            <p>【实物商品介绍】</p>
                            <p>一念间®·小粒茶™，特别选用优质云南大叶种，经过津乔“小粒茶全手工工序”制成，共有三种滋味，生茶，凝大叶古树之精华，鲜爽生津，韵厚耐品；熟茶，承古树陈料之技艺，尽显活、厚之韵；红茶，纳古树晒制之灵气，呈阳光自然之味。一粒仅2克，作为最小的紧压茶，揉制更精细，松紧更适中，叶片更完整，滋味更地道。同时有标准装和伴手礼两种规格，伴手礼份量轻巧，商务、日常，精致时尚。标准装份量十足，包含一念间罐盒绝配，自用、赠予，高端大气。只需打开一粒加水冲泡，一念间好茶即得。</p>
                            <p>&nbsp;</p>
                            <p>具体抢购时间：2018年3月7日10:00——2018年3月18日10:00</p>
                        </div>
                    </div>
                    <div class="tab-news-none hideEle">
                        <div>空空如也，暂时没有消息哦～</div>
                        <a class="button-orange" href="/index.html">回首页逛逛</a>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                id: this.$store.state.index.noticeId,
                size:12
            }
        },
        methods: {
        },
        created() {
            console.log("ssss", this.id);
        },
    })
</script>
<style lang = 'less' scoped>
    /* @import url(../../assets/notice.css); */
    @import "../../assets/notice.css";
</style>