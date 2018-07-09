<template>
    <div>
        <div style="min-width:1190px;margin:20px auto;float: none;" class="block">
            <el-carousel height="350px">
                <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                    <a href="" :style="{ 'background': 'url(' + item.src + ') center top no-repeat','display':'block','width':'100%','height':'100%' }"></a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-row style="border-bottom:1px solid #ddd;padding:20px 0;margin-bottom:70px">
            <!-- <el-col :span="4">&nbsp;</el-col> -->
            <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
                <div class="scroll-wrap">
                    <ul class="scroll-content" :style="{ top }">
                        <li v-for="(item,index) in prizeList" :key="index" @mouseenter="stopInterval" @mouseleave="intervalStart">
                            <img style="width:30px;height:30px;margin-right:30px" src="../../assets/images/icon/gg.svg" alt="">
                            <a href="">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </el-col>
            <!-- <el-col :span="4">&nbsp;</el-col> -->
        </el-row>
        <el-row>
            <!-- <el-col :span="4">&nbsp;</el-col> -->
            <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
                <div style="text-align:center;margin-bottom:50px;"><img src="../../assets/images/tea-title.png" alt=""></div>
                <el-carousel trigger="click" :autoplay="false" arrow='always'>
                    <el-carousel-item v-for="(item,index) in SPbannerList" :key="index">
                        <img style="width:100%" :src="item.src" alt="">
                    </el-carousel-item>
                </el-carousel>
                <div style="margin-bottom:80px;">
                    <div class="notice-information clearfix">
                        <div id="newsImg" class="fl img"><img src="../../assets/images/noticeImage_0941058468127.jpg"></div>
                        <div class="fr list">
                            <div class="title">
                                <div class="tit"><span>新闻</span>中心</div>
                                <div class="en">News</div>
                                <a class="more" id="moreInformationLink">MORE&gt;</a>
                            </div>
                            <ul id="newsUL">
                                <li class="first clearfix">
                                    <a target="_blank" href="" title="【新品上市】一念间·小粒茶和红柑丸">
                                        <div class="fr">
                                            <div class="tit">【新品上市】一念间·小粒茶和红柑丸
                                                <div class="bottom"></div>
                                            </div>
                                            <div class="detail"></div>
                                        </div>
                                        <div class="fl">
                                            <div class="day">07</div>
                                            <div class="month">2018-03</div>
                                        </div>
                                    </a>
                                </li>
                                <li><a target="_blank" href="" title="关于茶企通春节放假公告">●&nbsp;&nbsp;关于茶企通春节放假公告</a><span class="time">02-09</span></li>
                                <li><a target="_blank" href="" title="春节快递停发公告">●&nbsp;&nbsp;春节快递停发公告</a><span class="time">02-07</span></li>
                                <li><a target="_blank" href="" title="关于强暴雪天气延误快递服务的公告">●&nbsp;&nbsp;关于强暴雪天气延误快递服务的公告</a><span class="time">01-30</span></li>
                                <li><a target="_blank" href="" title="【新品上市】佩紫饼茶，茶者，紫为上">●&nbsp;&nbsp;【新品上市】佩紫饼茶，茶者，紫为上</a><span class="time">01-18</span></li>
                                <li><a target="_blank" href="" title="2018，年轻群体或成茶叶消费新突破点！">●&nbsp;&nbsp;2018，年轻群体或成茶叶消费新突破点！</a><span class="time">12-28</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div style="text-align:center;margin-bottom:50px;"><img src="../../assets/images/brand-title.png" alt=""></div>
                    <div style="width:100%;height:300px;margin-bottom:100px">
                        <div v-for="(o, index) in merchantList" style="width:100%" :key="index">
                            <el-card style="width:19%;float:left;margin-right:1%" shadow="hover" :body-style="{ padding: '0px' }">
                                <img :src='o.src' class="image">
                                <div style="padding: 14px;">
                                    <span style="display: block;font-family:'微软雅黑';font-weight: 600;">{{o.title}}</span>
                                    <div class="bottom clearfix">
                                        <span class="text_my">{{ o.text }}</span>
                                        <el-button type="text" class="button" @click="showChange(index)">查看简介</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </div>
                <div>
                    <el-carousel style="text-align:center" :autoplay="false" type="card">
                        <el-carousel-item v-for="(item,index) in JSbannerList" :key="index">
                            <img :src="item.src" alt="">
                        </el-carousel-item>
                    </el-carousel>
                    <span class="txt" style="display: block;">
                            <h4>{{teaText.title}}</h4>
                            <p>{{teaText.text}}
                            </p>
                            </span>
                </div>
            </el-col>
            <!-- <el-col :span="4">&nbsp;</el-col> -->
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                teaText: {
                    title: '下关沱茶',
                    text: '云南下关沱茶（集团）股份有限公司位于风景秀丽、气候宜人的大理市下关，苍山洱海优良的生态环境，大理地区悠久精湛的制茶技艺，为下关沱茶的优良品质提供了得天独厚的条件。 下关沱茶集团公司产品是以下关沱茶、饼茶、砖茶等各种紧压茶为主的云南普洱茶，也包括部分绿茶、特种茶、袋泡茶等共200多个品种。 下关沱茶集团拥有8项桂冠：农业产业化国家级重点龙头企业、国家扶贫龙头企业、全国民族特需商品定点生产企业、国家边销茶原料储备企业、国家茶叶加工技术研发分中心、中华老字号、下关沱茶制作技艺入选国务院公布的第三批非物质文化遗产名录、“下关”商标认定为“中国驰名商标”。'
                },
                interval: '',
                merchantList: [{
                    src: require('../../assets/images/brand-head1-img01.jpg'),
                    title: '下关沱茶',
                    text: '云南下关沱茶（集团）股份有限公司位于风景秀丽、气候宜人的大理市下关，苍山洱海优良的生态环境，大理地区悠久精湛的制茶技艺，为下关沱茶的优良品质提供了得天独厚的条件。 下关沱茶集团公司产品是以下关沱茶、饼茶、砖茶等各种紧压茶为主的云南普洱茶，也包括部分绿茶、特种茶、袋泡茶等共200多个品种。 下关沱茶集团拥有8项桂冠：农业产业化国家级重点龙头企业、国家扶贫龙头企业、全国民族特需商品定点生产企业、国家边销茶原料储备企业、国家茶叶加工技术研发分中心、中华老字号、下关沱茶制作技艺入选国务院公布的第三批非物质文化遗产名录、“下关”商标认定为“中国驰名商标”。'
                }, {
                    src: require('../../assets/images/brand-head2-img01.jpg'),
                    title: '臻味号',
                    text: '在花开四季的云南，在地处热带的西双版纳，在常有云雾升起的高山、群山之间，有傣人、布朗人、拉祜人、爱尼人的家园、几百年来，他们仰俯大地，以茶为生，守望着历史悠久的古树茶园。臻味号和这片土地结缘，和守望土地的人们结缘。臻味号以虔诚之心，扎根这片土地；阅读这片土地；拣选最好的古树茶，以古法精心加工，利于越陈越香。尊重土地、尊重传统的人、尊重原生古茶。真味、真实、真地道。'
                }, {
                    src: require('../../assets/images/brand-head3-img02.jpg'),
                    title: '老同志',
                    text: '云南海湾茶业有限公司于2002年成立，位于昆明国家经济技术开发区，建筑面积5200平方米。作为与国内外客户的贸易合作桥梁，它不仅是海湾茶业的销售窗口，而且是茶叶研究、开发的中心。 云南海湾茶业不仅重视生产技术，还聚集了一大批专业的市场营销人员，公司自2002年成立，2003年取得进出口经营权以来，每年的普洱茶出口量在800吨左右,位居云南普洱茶出口的前列，为亚洲出口，欧美出口，专业市场内销，大众市场营销等提供优质的普洱茶产品，满足市场需求，为客户创造价值。'
                }, {
                    src: require('../../assets/images/brand-head4-img01.jpg'),
                    title: '岁月知味',
                    text: '岁月知味茶业由资深茶人郑少烘先生创办于2005年,公司一直以“纯正易武茶”的传承者为己任，尊重人文历史和自然法则，弘扬古法制茶工艺，以“匠心与品质”为企业主旨，经过十年沉积，已成为易武茶区经营规模及老茶存量皆具说服力的代言企业，并拥有易武千亩古茶园有机认证。岁月知味用了很多时间去读懂易武，从2005年生产出第一款【易武正山古树】始，到2008年细分出易武各村寨小产区，再到2010年建立易武四大古树茶基地，并在2012年获得有机认证至今，公司所生产的每一款产品都是心血的结晶和品质的见证。'
                }, {
                    src: require('../../assets/images/brand-head6-img03.jpg'),
                    title: '六大茶山',
                    text: '云南六大茶山茶业有限公司于2002年在昆明成立，是一家专业生产和销售精品系列普洱茶的茶叶企业。公司在凤庆、勐海两个云南茶叶主产地建有完全符合食品生产标准的现代化茶厂，拥有位于西双版纳勐海县的贺开16200亩有机古茶原料基地及位于临沧凤庆县的岔河10000多亩有机茶园原料基地，年生产能力50000吨，并在全国二十多个省（市、自治区）与1000余家机构（个人）建立了合作伙伴关系。公司主要生产和销售以普洱茶为主的各种茶叶珍品：包括六大茶山野生茶系列的饼茶、砖茶、沱茶、竹筒茶，以及上等的各级有机生态茶系列品。公司生产的精品系列普洱茶不仅得到国内同行的好评，而且受到海外茶人的认可和赞誉，近年来在各种茶叶评奖活动中公司产品多次获奖，“六大茶山”正成为普洱茶的强势品牌。'
                }],
                bannerList: [{
                    src: require('../../assets/images/banner1.jpeg')
                }, {
                    src: require('../../assets/images/banner2.jpeg')
                }],
                SPbannerList: [{
                    src: require('../../assets/images/SPbanner1.png')
                }, {
                    src: require('../../assets/images/SPbanner2.png')
                }],
                JSbannerList: [{
                    src: require('../../assets/images/brand-head1-img01.jpg')
                }, {
                    src: require('../../assets/images/brand-head1-img02.jpg')
                }, {
                    src: require('../../assets/images/brand-head1-img03.jpg')
                }],
                prizeList: [{
                        name: '关于强暴雪天气延误快递服务的公告'
                    },
                    {
                        name: '关于强暴雪天气延误快递服务的公告'
                    },
                    {
                        name: '关于强暴雪天气延误快递服务的公告'
                    },
                    {
                        name: '关于强暴雪天气延误快递服务的公告'
                    },
                    {
                        name: '关于强暴雪天气延误快递服务的公告'
                    }
                ],
                activeIndex: 0
            }
        },
        computed: {
            top() {
                return -this.activeIndex * 50 + 'px';
            }
        },
        mounted() {
            this.intervalStart()
        },
        methods: {
            stopInterval() {
                // console.log(this.interval);
                clearInterval(this.interval)
            },
            intervalStart() {
                this.interval = setInterval(_ => {
                    if (this.activeIndex < this.prizeList.length - 1) {
                        this.activeIndex += 1;
                    } else {
                        this.activeIndex = 0;
                    }
                }, 1500);
            },
            showChange(i) {
                console.log(i);
                if (i == 0) {
                    this.teaText = {
                        title: '下关沱茶',
                        text: '云南下关沱茶（集团）股份有限公司位于风景秀丽、气候宜人的大理市下关，苍山洱海优良的生态环境，大理地区悠久精湛的制茶技艺，为下关沱茶的优良品质提供了得天独厚的条件。 下关沱茶集团公司产品是以下关沱茶、饼茶、砖茶等各种紧压茶为主的云南普洱茶，也包括部分绿茶、特种茶、袋泡茶等共200多个品种。 下关沱茶集团拥有8项桂冠：农业产业化国家级重点龙头企业、国家扶贫龙头企业、全国民族特需商品定点生产企业、国家边销茶原料储备企业、国家茶叶加工技术研发分中心、中华老字号、下关沱茶制作技艺入选国务院公布的第三批非物质文化遗产名录、“下关”商标认定为“中国驰名商标”。'
                    }
                    this.JSbannerList = [{
                        src: require('../../assets/images/brand-head1-img01.jpg')
                    }, {
                        src: require('../../assets/images/brand-head1-img02.jpg')
                    }, {
                        src: require('../../assets/images/brand-head1-img03.jpg')
                    }]
                }else if(i==1){
                    this.teaText = {
                        title: '臻味号',
                        text: '在花开四季的云南，在地处热带的西双版纳，在常有云雾升起的高山、群山之间，有傣人、布朗人、拉祜人、爱尼人的家园、几百年来，他们仰俯大地，以茶为生，守望着历史悠久的古树茶园。臻味号和这片土地结缘，和守望土地的人们结缘。臻味号以虔诚之心，扎根这片土地；阅读这片土地；拣选最好的古树茶，以古法精心加工，利于越陈越香。尊重土地、尊重传统的人、尊重原生古茶。真味、真实、真地道。'
                    }
                    this.JSbannerList = [{
                        src: require('../../assets/images/brand-head2-img01.jpg')
                    }, {
                        src: require('../../assets/images/brand-head2-img02.jpg')
                    }, {
                        src: require('../../assets/images/brand-head2-img03.jpg')
                    }]
                }else if(i==2){
                    this.teaText = {
                        title: '老同志',
                    text: '云南海湾茶业有限公司于2002年成立，位于昆明国家经济技术开发区，建筑面积5200平方米。作为与国内外客户的贸易合作桥梁，它不仅是海湾茶业的销售窗口，而且是茶叶研究、开发的中心。 云南海湾茶业不仅重视生产技术，还聚集了一大批专业的市场营销人员，公司自2002年成立，2003年取得进出口经营权以来，每年的普洱茶出口量在800吨左右,位居云南普洱茶出口的前列，为亚洲出口，欧美出口，专业市场内销，大众市场营销等提供优质的普洱茶产品，满足市场需求，为客户创造价值。'
                    }
                    this.JSbannerList = [{
                        src: require('../../assets/images/brand-head3-img01.jpg')
                    }, {
                        src: require('../../assets/images/brand-head3-img02.jpg')
                    }, {
                        src: require('../../assets/images/brand-head3-img03.jpg')
                    }]
                }else if(i==3){
                    this.teaText = {
                    title: '岁月知味',
                    text: '岁月知味茶业由资深茶人郑少烘先生创办于2005年,公司一直以“纯正易武茶”的传承者为己任，尊重人文历史和自然法则，弘扬古法制茶工艺，以“匠心与品质”为企业主旨，经过十年沉积，已成为易武茶区经营规模及老茶存量皆具说服力的代言企业，并拥有易武千亩古茶园有机认证。岁月知味用了很多时间去读懂易武，从2005年生产出第一款【易武正山古树】始，到2008年细分出易武各村寨小产区，再到2010年建立易武四大古树茶基地，并在2012年获得有机认证至今，公司所生产的每一款产品都是心血的结晶和品质的见证。'
                    }
                    this.JSbannerList = [{
                        src: require('../../assets/images/brand-head4-img01.jpg')
                    }, {
                        src: require('../../assets/images/brand-head4-img02.jpg')
                    }, {
                        src: require('../../assets/images/brand-head4-img03.jpg')
                    }]
                }else if(i==4){
                    this.teaText = {
                    title: '六大茶山',
                    text: '云南六大茶山茶业有限公司于2002年在昆明成立，是一家专业生产和销售精品系列普洱茶的茶叶企业。公司在凤庆、勐海两个云南茶叶主产地建有完全符合食品生产标准的现代化茶厂，拥有位于西双版纳勐海县的贺开16200亩有机古茶原料基地及位于临沧凤庆县的岔河10000多亩有机茶园原料基地，年生产能力50000吨，并在全国二十多个省（市、自治区）与1000余家机构（个人）建立了合作伙伴关系。公司主要生产和销售以普洱茶为主的各种茶叶珍品：包括六大茶山野生茶系列的饼茶、砖茶、沱茶、竹筒茶，以及上等的各级有机生态茶系列品。公司生产的精品系列普洱茶不仅得到国内同行的好评，而且受到海外茶人的认可和赞誉，近年来在各种茶叶评奖活动中公司产品多次获奖，“六大茶山”正成为普洱茶的强势品牌。'
                    }
                    this.JSbannerList = [{
                        src: require('../../assets/images/brand-head6-img01.jpg')
                    }, {
                        src: require('../../assets/images/brand-head6-img02.jpg')
                    }, {
                        src: require('../../assets/images/brand-head6-img03.jpg')
                    }]
                }
            }
        }
    })
</script>
<style lang = 'less' scoped>
    @import '../../assets/index.css';
    .scroll-wrap {
        width: 100%;
        height: 50px;
        /* text-align: center; */
        /* border: 1px solid blue; */
        overflow: hidden;
    }
    .scroll-content {
        position: relative;
        transition: top 0.5s;
        li {
            line-height: 50px;
            /* text-align: left; */
            font-size: 16px;
            a {
                color: #666;
                &:hover {
                    color: red;
                }
            }
        }
    }
    .text_my {
    font-size: 13px;
    color: #999;
    line-height: 20px;
    padding: 2px;
    line-height: 17px;
    text-indent: 2em;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    /* max-height: 48px; */
    -webkit-line-clamp: 3;
    margin-bottom: 10px;
    -webkit-box-orient: vertical;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    .button {
        padding: 0;
        float: right;
    }
    .image {
        width: 100%;
        display: block;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>