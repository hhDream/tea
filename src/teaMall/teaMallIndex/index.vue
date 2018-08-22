<template>
    <div>
        <div style="min-width:1190px;margin:0 auto;float: none;">
            <el-carousel height="350px">
                <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                    <a href="" :style="{ 'background': 'url(' + item.url + ') center top no-repeat','display':'block','width':'100%','height':'100%' }"></a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-row style="border-bottom:1px solid #ddd;margin-bottom:70px">
            <!-- <el-col :span="4">&nbsp;</el-col> -->
            <el-col style="min-width:1190px;margin:10px auto;float: none;" :span="16">
                <div class="scroll-wrap" style="position:relative">
                    <ul class="scroll-content" :style="{ top }">
                        <li v-for="(item,index) in prizeList" :key="index" @mouseenter="stopInterval" @mouseleave="intervalStart">
                            <img style="width:30px;height:30px;margin-right:30px" src="../../assets/images/icon/gg.svg" alt="">
                            <a href="#" @click="$router.openPage('/teaMallNotice',{id:item.id})">{{item.title}}</a>
                        </li>
                    </ul>
                    <a href="#" style="position: absolute;right: 0;top: 17px;font-size: 17px;" @click="$router.openPage('/teaMallMoreNotice');">查看更多...</a>
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
                        <a href="#" @click="$router.openPage('/teaMallRush');">
                            <img style="width:100%" :src="item.url" alt="">
                        </a>
                    </el-carousel-item>
                </el-carousel>
                <div style="margin-bottom:80px;">
                    <div class="notice-information clearfix">
                        <div id="newsImg" class="fl img"><img :src="firstImg"></div>
                        <div class="fr list">
                            <div class="title">
                                <div class="tit"><span>新闻</span>中心</div>
                                <div class="en">News</div>
                                <a class="more" id="moreInformationLink" @click="$router.openPage('/teaMallNews')">MORE&gt;</a>
                            </div>
                            <ul id="newsUL" v-for="(item,index) in newsList" :key="index">
                                <li v-if="index==0" @click="$router.openPage('/teaMallNew',{id:item.id})" class="first clearfix">
                                    <a>
                                        <div class="fr">
                                            <div class="tit">{{item.title}}
                                                <div class="bottom"></div>
                                            </div>
                                            <div class="detail">{{item.abstractContent}}</div>
                                        </div>
                                        <div class="fl">
                                            <div class="day">{{item.releaseTime.substring(8,10)}}</div>
                                            <div class="month">{{item.releaseTime.substring(0,7)}}</div>
                                        </div>
                                    </a>
                                </li>
                                <li v-else><a href="#" @click="$router.openPage('/teaMallNew',{id:item.id})" :title="item.title">●&nbsp;&nbsp;{{item.title}}</a><span class="time">02-09</span></li>
                                <!-- <li><a href="" title="春节快递停发公告">●&nbsp;&nbsp;春节快递停发公告</a><span class="time">02-07</span></li>
                                        <li><a href="" title="关于强暴雪天气延误快递服务的公告">●&nbsp;&nbsp;关于强暴雪天气延误快递服务的公告</a><span class="time">01-30</span></li>
                                        <li><a href="" title="【新品上市】佩紫饼茶，茶者，紫为上">●&nbsp;&nbsp;【新品上市】佩紫饼茶，茶者，紫为上</a><span class="time">01-18</span></li>
                                        <li><a href="" title="2018，年轻群体或成茶叶消费新突破点！">●&nbsp;&nbsp;2018，年轻群体或成茶叶消费新突破点！</a><span class="time">12-28</span></li> -->
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- <div>
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
                    </div> -->
                <div class="brand-image">
                    <div class="tit"><img src="../../assets/images/brand-title.png"></div>
                    <div class="clearfix tab-list">
                        <div class="tab-list-con" style="display: block;">
                            <div class="active active-l"><span class="img"><img src="../../assets/images/brand-head4-img01.jpg"></span></div>
                            <div class="active active-m"><span class="img"><img src="../../assets/images/brand-head4-img02.jpg"></span><span class="txts">
                                        <h4>岁月知味</h4>
                                        <p>岁月知味茶业由资深茶人郑少烘先生创办于2005年,公司一直以“纯正易武茶”的传承者为己任，尊重人文历史和自然法则，弘扬古法制茶工艺，以“匠心与品质”为企业主旨，经过十年沉积，已成为易武茶区经营规模及老茶存量皆具说服力的代言企业，并拥有易武千亩古茶园有机认证。岁月知味用了很多时间去读懂易武，从2005年生产出第一款【易武正山古树】始，到2008年细分出易武各村寨小产区，再到2010年建立易武四大古树茶基地，并在2012年获得有机认证至今，公司所生产的每一款产品都是心血的结晶和品质的见证。</p>
                                    </span></div>
                            <div class="active active-r"><span class="img"><img src="../../assets/images/brand-head4-img03.jpg"></span></div>
                        </div>
                        <em class="loading" style="display: none;"></em>
                    </div>
                    <div class="clearfix tab-nav">
                        <ul class="clearfix">
                            <li style="display: inline-block!important;" class="active-3"><img src="../../assets/images/brand-head-img01.png"><span>下关沱茶</span>
                                <div class="tab-con">
                                    <div class="img-l"><img src="../../assets/images/brand-head1-img01.jpg"></div>
                                    <div class="img-m"><img src="../../assets/images/brand-head1-img02.jpg"></div>
                                    <div class="img-r"><img src="../../assets/images/brand-head1-img03.jpg"></div>
                                    <div class="txts">
                                        <h4>下关沱茶</h4>
                                        <p>云南下关沱茶（集团）股份有限公司位于风景秀丽、气候宜人的大理市下关，苍山洱海优良的生态环境，大理地区悠久精湛的制茶技艺，为下关沱茶的优良品质提供了得天独厚的条件。 下关沱茶集团公司产品是以下关沱茶、饼茶、砖茶等各种紧压茶为主的云南普洱茶，也包括部分绿茶、特种茶、袋泡茶等共200多个品种。 下关沱茶集团拥有8项桂冠：农业产业化国家级重点龙头企业、国家扶贫龙头企业、全国民族特需商品定点生产企业、国家边销茶原料储备企业、国家茶叶加工技术研发分中心、中华老字号、下关沱茶制作技艺入选国务院公布的第三批非物质文化遗产名录、“下关”商标认定为
                                            “中国驰名商标”。
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li style="display: inline-block!important;" class="active-2"><img src="../../assets/images/brand-head-img02.png"><span>臻味号</span>
                                <div class="tab-con">
                                    <div class="img-l"><img src="../../assets/images/brand-head2-img01.jpg"></div>
                                    <div class="img-m"><img src="../../assets/images/brand-head2-img02.jpg"></div>
                                    <div class="img-r"><img src="../../assets/images/brand-head2-img03.jpg"></div>
                                    <div class="txts">
                                        <h4>臻味号</h4>
                                        <p>在花开四季的云南，在地处热带的西双版纳，在常有云雾升起的高山、群山之间，有傣人、布朗人、拉祜人、爱尼人的家园、几百年来，他们仰俯大地，以茶为生，守望着历史悠久的古树茶园。臻味号和这片土地结缘，和守望土地的人们结缘。臻味号以虔诚之心，扎根这片土地；阅读这片土地；拣选最好的古树茶，以古法精心加工，利于越陈越香。尊重土地、尊重传统的人、尊重原生古茶。真味、真实、真地道。</p>
                                    </div>
                                </div>
                            </li>
                            <li style="display: inline-block!important;" class="active-1"><img src="../../assets/images/brand-head-img03.png"><span>老同志</span>
                                <div class="tab-con">
                                    <div class="img-l"><img src="../../assets/images/brand-head3-img01.jpg"></div>
                                    <div class="img-m"><img src="../../assets/images/brand-head3-img02.jpg"></div>
                                    <div class="img-r"><img src="../../assets/images/brand-head3-img03.jpg"></div>
                                    <div class="txts">
                                        <h4>老同志</h4>
                                        <p>云南海湾茶业有限公司于2002年成立，位于昆明国家经济技术开发区，建筑面积5200平方米。作为与国内外客户的贸易合作桥梁，它不仅是海湾茶业的销售窗口，而且是茶叶研究、开发的中心。 云南海湾茶业不仅重视生产技术，还聚集了一大批专业的市场营销人员，公司自2002年成立，2003年取得进出口经营权以来，每年的普洱茶出口量在800吨左右,位居云南普洱茶出口的前列，为亚洲出口，欧美出口，专业市场内销，大众市场营销等提供优质的普洱茶产品，满足市场需求，为客户创造价值。</p>
                                    </div>
                                </div>
                            </li>
                            <li style="display: inline-block!important;" class="active"><em class="b-line"></em><img src="../../assets/images/brand-head-img04.png"><span>岁月知味</span>
                                <div class="tab-con">
                                    <div class="img-l"><img src="../../assets/images/brand-head4-img01.jpg"></div>
                                    <div class="img-m"><img src="../../assets/images/brand-head4-img02.jpg"></div>
                                    <div class="img-r"><img src="../../assets/images/brand-head4-img03.jpg"></div>
                                    <div class="txts">
                                        <h4>岁月知味</h4>
                                        <p>岁月知味茶业由资深茶人郑少烘先生创办于2005年,公司一直以“纯正易武茶”的传承者为己任，尊重人文历史和自然法则，弘扬古法制茶工艺，以“匠心与品质”为企业主旨，经过十年沉积，已成为易武茶区经营规模及老茶存量皆具说服力的代言企业，并拥有易武千亩古茶园有机认证。岁月知味用了很多时间去读懂易武，从2005年生产出第一款【易武正山古树】始，到2008年细分出易武各村寨小产区，再到2010年建立易武四大古树茶基地，并在2012年获得有机认证至今，公司所生产的每一款产品都是心血的结晶和品质的见证。</p>
                                    </div>
                                </div>
                            </li>
                            <!--<li><img src="../../assets/images/brand-head-img05.png"><span>斗记茶业</span>-->
                            <!--<div class="tab-con">-->
                            <!--<div class="img-l"><img src="../../assets/images/brand-head5-img01.jpg"></div>-->
                            <!--<div class="img-m"><img src="../../assets/images/brand-head5-img02.jpg"></div>-->
                            <!--<div class="img-r"><img src="../../assets/images/brand-head5-img03.jpg"></div>-->
                            <!--<div class="txts">-->
                            <!--<h4>斗记茶业</h4>-->
                            <!--<p>云南西双版纳易武正山茶业有限公司是一家以传统制作理念为基石，实施现代化管理的知名普洱茶企业。公司成立至今一直秉持“用心做茶，做好茶”的企业理念，精选云南境内澜沧江流域的优质大叶种普洱茶原料 ，遵循传统制作工艺，以纯手工石磨压制传统普洱茶。 经过多年对原料及工艺的不停探索，2006年“斗记”品牌正式诞生。凭借完善生产技术 、优化产品包装 、推介冲泡方法、推广普洱茶知识的多重营销策略，斗记茶品逐渐形成了其独有的风格特色，更是赢得广大茶友的喜爱和称道。</p>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</li>-->
                            <li style="display: inline-block!important;" class="active-1"><img src="../../assets/images/brand-head-img06.png"><span>六大茶山</span>
                                <div class="tab-con">
                                    <div class="img-l"><img src="../../assets/images/brand-head6-img01.jpg"></div>
                                    <div class="img-m"><img src="../../assets/images/brand-head6-img02.jpg"></div>
                                    <div class="img-r"><img src="../../assets/images/brand-head6-img03.jpg"></div>
                                    <div class="txts">
                                        <h4>六大茶山</h4>
                                        <p>云南六大茶山茶业有限公司于2002年在昆明成立，是一家专业生产和销售精品系列普洱茶的茶叶企业。公司在凤庆、勐海两个云南茶叶主产地建有完全符合食品生产标准的现代化茶厂，拥有位于西双版纳勐海县的贺开16200亩有机古茶原料基地及位于临沧凤庆县的岔河10000多亩有机茶园原料基地，年生产能力50000吨，并在全国二十多个省（市、自治区）与1000余家机构（个人）建立了合作伙伴关系。公司主要生产和销售以普洱茶为主的各种茶叶珍品：包括六大茶山野生茶系列的饼茶、砖茶、沱茶、竹筒茶，以及上等的各级有机生态茶系列品。公司生产的精品系列普洱茶不仅得到国内同行的好评，而且受到海外茶人的认可和赞誉，近年来在各种茶叶评奖活动中公司产品多次获奖，“六大茶山”正成为普洱茶的强势品牌。
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <!--<li><img src="../../assets/images/brand-head-img07.png"><span>云南普洱茶</span>-->
                            <!--<div class="tab-con">-->
                            <!--<div class="img-l"><img src="../../assets/images/brand-head7-img01.jpg"></div>-->
                            <!--<div class="img-m"><img src="../../assets/images/brand-head7-img02.jpg"></div>-->
                            <!--<div class="img-r"><img src="../../assets/images/brand-head7-img03.jpg"></div>-->
                            <!--<div class="txts">-->
                            <!--<h4>云南普洱茶（集团）有限公司</h4>-->
                            <!--<p>云南普洱茶（集团）有限公司位于驰名中外的“普洱茶都”——云南省普洱市宁洱县（原古普洱府）的普洱山下、龙潭池畔，其前身为成立于1975年4月的“普洱茶厂”，其历史可追溯到雍正七年（1729年）。现在该公司是云南农业产业化重点龙头企业，是一家历史悠久从事茶叶种植、加工技术推广、茶文化传播及茶叶营销的专业化集团公司。现有五个子公司、四个分公司、六大生态茶园基地和九个茶叶制所。其中，板山基地为清代皇家贡茶园，原始森林内生长着大量古茶树和古茶树群落。</p>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--<li><img src="../../assets/images/brand-head-img08.png"><span>祥源茶业</span>-->
                            <!--<div class="tab-con">-->
                            <!--<div class="img-l"><img src="../../assets/images/brand-head8-img01.jpg"></div>-->
                            <!--<div class="img-m"><img src="../../assets/images/brand-head8-img02.jpg"></div>-->
                            <!--<div class="img-r"><img src="../../assets/images/brand-head8-img03.jpg"></div>-->
                            <!--<div class="txts">-->
                            <!--<h4>祥源茶业股份有限公司</h4>-->
                            <!--<p>西双版纳祥源易武茶业有限公司(以下简称祥源易武公司)是祥源茶业股份有限公司旗下成员企业,成立于2013年9月,位于云南普洱茶源头地区、驰名中外的普洱茶六大古茶山核心所在地——西双版纳州勐腊县易武乡。2014年5月,祥源易武茶厂正式落成,总投资4500万元,总建筑面积10000平方米,是易武茶区目前最大的现代化、专业化精品普洱茶生产加工中心,也是易武茶叶产业化发展的标志性平台。 </p>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--<li><img src="../../assets/images/brand-head-img09.png"><span>祥源茶业</span>-->
                            <!--<div class="tab-con">-->
                            <!--<div class="img-l"><img src="../../assets/images/brand-head9-img01.jpg"></div>-->
                            <!--<div class="img-m"><img src="../../assets/images/brand-head9-img02.jpg"></div>-->
                            <!--<div class="img-r"><img src="../../assets/images/brand-head9-img03.jpg"></div>-->
                            <!--<div class="txts">-->
                            <!--<h4>祥源茶业股份有限公司</h4>-->
                            <!--<p>西双版纳祥源易武茶业有限公司(以下简称祥源易武公司)是祥源茶业股份有限公司旗下成员企业,成立于2013年9月,位于云南普洱茶源头地区、驰名中外的普洱茶六大古茶山核心所在地——西双版纳州勐腊县易武乡。2014年5月,祥源易武茶厂正式落成,总投资4500万元,总建筑面积10000平方米,是易武茶区目前最大的现代化、专业化精品普洱茶生产加工中心,也是易武茶叶产业化发展的标志性平台。 </p>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</li>-->
                        </ul>
                    </div>
                </div>
            </el-col>
            <!-- <el-col :span="4">&nbsp;</el-col> -->
        </el-row>
        <el-dialog title="经销商协议" :visible.sync="dialogVisible" width="80%" center>
            <div class="modal-body content" id="protocolDiv">
                <div class="font_bold">·提示条款</div>
                <span class="font_bold">【审慎阅读】</span>您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。
                <span class="font_bold font_underline">请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以粗体下划线标识，您应重点阅读。</span>如您对协议有任何疑问，可向茶企通平台客服咨询。
                <br>
                <br>
                <span class="font_bold">【签约动作】</span>当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与淘宝达成一致，成为茶企通平台“用户”。
                <span class="font_bold font_underline">阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</span>
                <br>
                <br>
                <div class="font_bold" style="color: #646464;">本协议是您与茶企通平台（简称本站，网址：<span style="color: #c77405">https://ent.teaexs.com/tea/index.html</span>）所有者（以下简称为茶企通）之间就茶企通网站服务等相关事宜所订立的契约，请您仔细阅读本注册协议，您点击提交注册按钮后，本协议即构成对双方有约束力的法律文件。仓储服务管理请详见《仓储服务管理协议》。</div>
                <div class="font_bold">一、 协议范围</div>
                <div class="font_bold">1.签约主体</div>
                <span class="font_bold">【平等主体】</span>本协议由您与茶企通经营者共同缔结，本协议对您与茶企通经营者均具有合同效力。
                <br>
                <span class="font_bold">【主体信息】</span>茶企通经营者是指经营茶企通的各法律主体， 您可随时查看茶企通各网站首页底部公示的证照信息以确定茶企通主体。本协议项下，茶企通经营者可能根据业务调整而发生变更，变更后的茶企通经营者与您共同履行本协议并向您提供服务，茶企通经营者的变更不会影响您本协议项下的权益。茶企通经营者还有可能因为提供新的茶企通服务而新增，如您使用新增的茶企通服务的，视为您同意新增的茶企通经营者与您共同履行本协议。发生争议时，您可根据您具体使用的服务及对您权益产生影响的具体行为对象确定与您履约的主体及争议相对方。
                <br>
                <div class="font_bold">2.补充协议</div>
                由于互联网高速发展，您与茶企通经营者签署的本协议列明的条款并不能完整罗列并覆盖双方所有权利与义务，现有的约定也不能保证完全符合未来发展的需求。因此，茶企通法律声明及隐私权政策、茶企通规则均为本协议的补充协议，与本协议不可分割且具有同等法律效力。若补充协议与本协议不一致，则以补充协议为准。您使用茶企通服务，即视为同意上述补充协议。
                <br>
                <div class="font_bold">二、 账户注册与使用</div>
                <div class="font_bold">1.用户资格</div>
                您确认，在您开始注册程序使用茶企通服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。
                <br> 此外，您还需确保您不是任何国家、国际组织或者地域实施的贸易限制、制裁或其他法律、规则限制的对象，否则您可能无法正常注册及使用茶企通服务。
                <br>
                <div class="font_bold">2.账户说明</div>
                <span class="font_bold">【账户获得】</span>当您按照茶企通的应用提示在注册页面填写信息、阅读并同意本协议且完成全部注册程序后，即可获得茶企通账户并成为茶企通用户。
                <br> 茶企通只允许您使用一个茶企通账户。如有证据证明或茶企通有理由相信您存在不当注册或不当使用多个茶企通账户的情形，为维护您和茶企通经营者的共同利益，茶企通有权采取冻结或关闭账户、取消订单、拒绝提供服务等措施以减少损失。同时，您可在茶企通经营者采取上述行为后向茶企通客服提出合理异议，异议复核期间不影响茶企通维持上述措施。如因您的不当注册或不当使用给茶企通经营者及相关方造成损失的，您还应承担赔偿责任。
                <br>
                <span class="font_bold">【账户使用】</span>您有权使用自己设置或确认的茶企通会员名、手机号码（以下简称“账户名称”）及设置的密码（账户名称及密码合称“账户”）登录茶企通。
                <br> 任何通过您的茶企通账户所做出的行为都默认为您做出，同时由于您的茶企通账户关联您本人的个人信息及茶企通商业信息，您的茶企通账户仅限您本人使用，请妥善保管，严禁向任何第三方泄露任何您的账户名称及密码。未经茶企通同意，您直接或间接授权第三方使用您的茶企通账户或获取您账户名下信息的行为给您（或茶企通、任何第三方）造成的一切损失及法律风险，概由您自行承担。如茶企通判断您的茶企通账户的使用可能危及您的账户安全及/或茶企通信息安全的，茶企通可拒绝提供相应服务或终止本协议。同时，您可在茶企通采取上述行为后向茶企通客服提出合理异议，异议复核期间不影响茶企通维持上述措施。
                <br>
                <span class="font_bold">【实名认证】</span>作为茶企通经营者，为使您更好地使用茶企通的各项服务，保障您的账户安全，茶企通有权要求您按公司要求及我国法律规定完成实名认证。
                <br>
                <span class="font_bold">【不活跃账户回收】</span>如您的账户同时符合以下条件，将被定义为不活跃账户，茶企通可回收相关账户，被收回的账户将不能再登录本平台，相应服务同时终止：
                <br> （一）未绑定通过实名认证的银行卡账户；
                <br> （二）连续二十四个月未登录平台；
                <br> （三）不存在未到期的有效业务。
                <br>
                <div class="font_bold">3.注册信息管理</div>
                <span class="font_bold">【信息真实】</span>在使用茶企通服务时，您应当按茶企通页面的提示准确完整地提供您信息（包括您的姓名、联系电话等），以便茶企通或其他用户与您联系。客户了解并同意，您有义务保证您提供信息的真实性及有效性，当您的个人信息发生变更时，您应当在24小时内在茶企通上同步更新，因未及时更新所导致的损失将由您自行承担。
                <br>
                <span class="font_bold">【会员名的合法性】</span>您设置的茶企通会员名不得违反国家法律法规及茶企通规则中关于会员名的管理规定，否则茶企通可回收不符合规定的茶企通会员名并有权随机设置您的会员名。茶企通会员名的回收不影响您以手机号码登录茶企通并使用茶企通服务。
                <br>
                <div class="font_bold">4.更新维护</div>
                您应当及时更新其提供的信息，在法律有明确规定要求茶企通作为平台服务提供者必须对您的信息进行核实的情况下，茶企通将依法不时地对您的信息进行检查核实，您应当配合提供最新、真实、完整、有效的信息。
                <br> 如茶企通按您最后一次提供的信息与之联系未果、您未按茶企通的要求及时提供信息、您提供的信息存在明显不实或行政司法机关核实您提供的信息无效的，您将承担因此对自身、他人及茶企通造成的全部损失与不利后果。茶企通有权向您发出询问或要求整改的通知，并要求您进行重新认证，甚至中止、终止对您提供部分或全部茶企通服务，茶企通对此不承担责任。
                <br>
                <div class="font_bold">5.账户安全规范</div>
                <span class="font_bold">【账户安全保管义务】</span>您的账户为您自行设置并由您自行保管，茶企通任何时候均不会主动要求您提供其账户密码。因此，特别提醒，请务必保管好您的账户， 并确保您在每个上网时段结束以正确步骤退出登录。
                <br> 账户因您自己泄露或因您个人原因遭受他人攻击、诈骗等行为导致的损失及后果，茶企通对此不承担责任，您应自行通过司法、行政等途径向侵权行为人追偿。
                <br>
                <span class="font_bold">【账户行为责任自负】</span>除茶企通存在过错外，您应对其个人账户项下的所有行为结果（包括但不限于在线签署各类协议、发布信息、购买商品及服务及披露信息等）负责。
                <br>
                <span class="font_bold">【日常维护须知】</span>您如发现任何未经授权使用本人账户登录茶企通或其他可能导致本人账户遭窃、遗失的情况，建议您立即通知茶企通，并授权茶企通将该信息同步给相关支付平台。您理解茶企通对您的任何请求采取行动均需要合理时间，且茶企通应您请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除茶企通存在法定过错外，茶企通不承担责任。
                <br>
                <div class="font_bold">三、 茶企通服务及规范</div>
                <span class="font_bold">【商品及/或服务的购买】</span>当您在茶企通购买商品及/或服务时，请您务必仔细确认所购商品的品名、价格、数量、型号、规格、尺寸或服务的时间、内容、限制性要求等重要事项，并在下单时核实您的联系地址、电话、收货人等信息。如您填写的收货人非您本人，则该收货人的行为和意思表示产生的法律后果均由您承担。
                <br> 您的购买行为应当基于真实的消费需求，不得存在对商品及/或服务实施恶意购买、恶意维权等扰乱茶企通正常交易秩序的行为。基于维茶企通交易秩序及交易安全的需要，茶企通发现上述情形时可主动执行关闭相关交易订单等操作。
                <br>
                <span class="font_bold">【商城自由交易】</span>经销商在未提货的情况下，可在茶企通商城继续销售所购买的新茶。在茶企通平台享受管理、商品及/或服务的销售与推广、商品及/或服务的购买、交易争议处理等服务。通过自由商城发布产品信息和价格，需遵循茶企对产品的指导信息及指导价格，经销商不得对产品进行恶意炒作。如经查实，将取消发布资格。
                <br>
                <div class="font_bold">1.新茶抢购</div>
                <span class="font_bold">【抢购公告】</span>新茶抢购开始前15天，平台会发布新茶抢购公告，抢购期限、抢购新茶的品种、数量和价格。
                <br>
                <span class="font_bold">【抢购期限】</span>新茶抢购期限一般为3天。您可在抢购期限内通过茶企通平台购买新茶。抢购期届满，新茶抢购结束。
                <br>
                <span class="font_bold">【成交规则】</span>您在茶企通平台完成下单、付款后新茶抢购订单即为成交。
                <br>
                <span class="font_bold">【茶数量】</span>您通过抢购订单交易的茶品将在抢购订单成交、茶品入库后由茶企通系统自动根据交易数量自动划拨为您的账号名下的新茶数量。
                <br>
                <span class="font_bold">【原仓储存】</span>新茶储存严格按片区集中存储。如您需在茶企通商城继续销售所购买的新茶，需将新茶继续存储在原来的仓库中。如在茶企通购买的新茶进行过提货操作，则不能在茶企通平台进行二次销售。
                <br>
                <div class="font_bold">2.交易规范</div>
                <span class="font_bold">【禁止销售范围】</span>您应当确保您对您在茶企通平台上发布的商品及/或服务享有相应的权利，您不得在茶企通平台上销售以下商品及/或提供以下服务：
                <br> （一）国家禁止或限制的；
                <br> （二）侵犯他人知识产权或其它合法权益的；
                <br> （三）茶企通平台规则、公告、通知或各平台与您单独签署的协议中已明确说明不适合在茶企通平台上销售及/或提供的。
                <br>
                <span class="font_bold">【交易秩序保障】</span>您应当遵守诚实信用原则，确保您所发布的商品及/或服务信息真实、与您实际所销售的商品及/或提供的服务相符，并在交易过程中切实履行您的交易承诺。
                <br> 您应当维护茶企通平台市场良性竞争秩序，不得贬低、诋毁竞争对手，不得干扰茶企通平台上进行的任何交易、活动，不得以任何不正当方式提升或试图提升自身的信用度，不得以任何方式干扰或试图干扰茶企通平台的正常运作。
                <br>
                <span class="font_bold">【依法纳税】</span>依法纳税是每一个公民、企业应尽的义务，您应对销售额/营业额超过法定免征额部分及时、足额地向税务主管机关申报纳税。
                <br>
                <div class="font_bold">3.交易争议处理</div>
                <span class="font_bold">【交易争议处理途径】</span>您在茶企通交易过程中与交易另一方发生争议的（包括但不限于产品销售争议、产品质量争议或产品侵权争议），您应先与争议对方进行协商处理，协商未果时争议双方均有权选择以下途径解决： （一）提请茶企通提供争议调处服务； （二）请求消费者协会或者其他依法成立的调解组织调解； （三）向有关行政部门投诉； （四）根据与争议相对方达成的仲裁协议（如有）提请仲裁机构仲裁； （五）向人民法院提起诉讼。
                <br>
                <span class="font_bold">【平台调处服务】</span>您依据茶企通规则使用茶企通的争议调处服务，则表示您认可并愿意履行茶企通的客服作为独立的第三方根据其所了解到的争议事实并依据茶企通规则所做出的调处决定（包括调整相关订单的交易状态、判定将争议款项的全部或部分支付给交易一方或双方等）。在茶企通调处决定做出前，您可选择上述（二）、（三）、（四）、（五）途径（下称“其他争议处理途径”）解决争议以中止茶企通的争议调处服务，并将最终的争议处理结果在24小时内告知茶企通客服。
                <br> 如您对茶企通调处决定不服，可采取其他争议处理途径解决争议，但通过其他争议处理途径未取得终局决定前，您仍应先按调处决定履行相关义务。
                <br>
                <div class="font_bold">4.费用结算与发票</div>
                <span class="font_bold">【自由商城交易】</span> 在该模式下，您应当向茶企通平台支付与销售金额相关的支付服务费，支付服务费结算方式为按每笔交易成功的订单总金额的1%计收，该费用在消费者下单确认支付后，由您授权茶企通平台在每笔销售货款中直接扣除相应的支付服务费，每笔费用的详细结算数据以茶企通平台账单记录为准。茶企通平台有权根据第三方支付机构支付服务费费率调整以及行业发展等情况单方面调整支付服务费费率及/或结算方式并在平台上予以公布，自公布之日起适用新的费率标准及/或结算方式。
                <br> 交易成功后，如果消费者发生退货及/或退款的情况，您已支付的服务费，茶企通平台将不予退还。
                <br>
                <span class="font_bold">【新茶抢购及其他模式】</span> 茶企通平台暂时不向您收取任何服务费用。但茶企通平台保留收取相关费用的权利，具体收费标准将以平台公告及\或新茶抢购通知等形式发布。如未来茶企通针对现有业务或者新建业务需要收取合理费用，茶企通会采取合理途径并以足够合理的期限提前通过法定程序并以本协议约定的方式通知您，确保您有充分选择的权利。
                <br>
                <span class="font_bold">【服务费发票开具说明】</span> 如您需要对收取的交易服务费开具发票，请于每月末前5个工作日联系茶企通平台提交服务费开票申请。茶企通平台在对您已支付的交易服务费核实无误后，将根据申请表及实际已支付的交易服务费金额为您开具服务费发票。若因您提供的开票信息有误造成开票错误或开票延迟等，相关责任由您自行承担。
                <br>
                <div class="font_bold">5.责任限制</div>
                <span class="font_bold">【不可抗力及第三方原因】</span>茶企通依照法律规定履行基础保障义务，但对于下述原因导致的合同履行障碍、履行瑕疵、履行延后或履行内容变更等情形，茶企通并不承担相应的违约责任： （一）因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素； （二）因电力供应故障、通讯网络故障等公共服务因素或第三人因素； （三）在茶企通已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全等因素；
                （四）其他非茶企通可以预见或控制等因素。
                <br>
                <span class="font_bold">【海量信息】</span>茶企通仅向您提供茶企通平台服务，您知道并谅解茶企通上的信息系各方自行发布，且可能存在风险和瑕疵。
                <br> 鉴于茶企通具备存在海量信息及信息网络环境下信息与实物相分离的特点，茶企通无法逐一审查商品及/或服务的信息，无法逐一审查交易所涉及的商品及/或服务的质量、安全以及合法性、真实性、准确性，对此买方您应基于自身丰富的生活经验加以谨慎判断。
                <br>
                <span class="font_bold">【退货限制】</span>为保障交易双方的利益及交易秩序，请您注意经茶企通达成的交易若出现质量问题仅能予以换货。若您收到的茶品有数量不符、茶品霉变等重大质量瑕疵情况，应在确认收货前或者系统默认的收货确认时间前联系茶企通客服协调卖方申请补足数量或更换合格茶品。
                <br>
                <span class="font_bold">【调处决定】</span>您理解并同意，在争议调处服务中，茶企通的客服并非专业人士，仅能以普通人的认知对您提交的凭证进行判断。因此，除存在故意或重大过失外，调处方对争议调处决定免责。
                <br>
                <div class="font_bold">四、 您信息的保护及授权</div>
                1.用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且茶企通保留终止用户使用茶企通各项服务的权利。
                <br> 2.用户在本站进行浏览、下单购物等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。
                <br> 3.用户注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定改变您的密码。用户应谨慎合理的保存、使用其用户名和密码。用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通知本站并向公安机关报案。
                <br> 4.用户同意，茶企通拥有通过邮件、短信电话等形式，向在本站注册、购物用户、收货人发送订单信息、促销活动等告知信息的权利。
                <br> 5.用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。
                <br> 6.用户同意，茶企通有权使用用户的注册信息、用户名、密码等信息，登录进入用户的注册账户，进行证据保全，包括但不限于公证、见证等。
                <br>
                <div class="font_bold">五、用户依法言行义务</div>
                本协议依据国家相关法律法规规章制定，用户同意严格遵守以下义务：
                <br> （1）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；
                <br> （2）从中国大陆向境外传输资料信息时必须符合中国有关法规；
                <br> （3）不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；
                <br> （4）不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；
                <br> （5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；
                <br> （6）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；
                <br> （7）不得教唆他人从事本条所禁止的行为；
                <br> （8）不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；
                <br> 用户应不时关注并遵守本站不时公布或修改的各类合法规则规定。
                <br>
                <span class="font_bold">本站保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。若用户未遵守以上规定的，本站有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。</span>
                <br>
                <div class="font_bold">六、 协议的变更</div>
                根据国家法律法规变化及网站运营需要，茶企通有权对本协议条款不时地进行修改，修改后的协议一旦被张贴在本站上即生效，并代替原来的协议。用户可随时登录查阅最新协议；
                <span class="font_bold">用户有义务不时关注并阅读最新版的协议及网站公告。如用户不同意更新后的协议，可以且应立即停止接受茶企通网站依据本协议提供的服务；如用户继续使用本网站提供的服务的，即视为同意更新后的协议。茶企通建议您在使用本站之前阅读本协议及本站的公告。</span> 如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。
                <br>
                <div class="font_bold">七 通知</div>
                您在注册成为茶企通用户，并接受茶企通服务时，应该向茶企通提供真实有效的联系方式（包括电子邮件地址、联系电话、联系地址等），对于联系方式发生变更的，您有义务在24小时内更新有关信息，并保持可被联系的状态。
                <br> 茶企通将向您的上述联系方式的其中之一或其中若干向您送达各类通知，而此类通知的内容可能对您的权利义务产生重大的有利或不利影响，请您务必及时关注。
                <br>
                <div class="font_bold">八、 法律适用、管辖</div>
                本协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区适用之有效法律（但不包括其冲突法规则）。 如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其它有效条款继续有效。 如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向有管辖权的中华人民共和国大陆地区法院提起诉讼。
                <br>
                <div class="font_bold">九、其他</div>
                1.茶企通网站所有者是指在政府部门依法许可或备案的茶企通网站经营主体。
                <br>
                <span class="font_bold"> 2.茶企通尊重用户和消费者的合法权利，本协议及本网站上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户和消费者提供服务。本站欢迎用户和社会各界提出意见和建议，茶企通将虚心接受并适时修改本协议及本站上的各类规则。
                  <br> 3.本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请用户着重阅读。
                  <br> 4.您点击本协议下方的;同意并继续;按钮即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容
                </span>
            </div>
            <span slot="footer" class="dialog-footer" style="text-align:center">
                    <el-button type="primary" @click="dialogVisible = false">阅读并同意</el-button>
                    <el-button @click="dialogVisible = false">拒绝</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      firstImg:"",
      dialogVisible: false,
      newsList: [
        // {
        //   abstractContent: "照耀",
        //   author: "admin",
        //   bulletinType: "SYSINFO",
        //   cover:
        //     "https://ent.teaexs.com/picture/3abeaa42a93b447dab44b960ab94bd23.png",
        //   id: 62,
        //   isHasBeenRead: null,
        //   label: "标签",
        //   lastUpdateTime: null,
        //   param1: null,
        //   param2: null,
        //   param3: null,
        //   param4: null,
        //   param5: null,
        //   releaseTime: "2018-07-26 19:07:44",
        //   source: "MINIWECHAT,APP",
        //   status: null,
        //   title: "测试"
        // }
      ],
      teaText: {
        title: "下关沱茶",
        text:
          "云南下关沱茶（集团）股份有限公司位于风景秀丽、气候宜人的大理市下关，苍山洱海优良的生态环境，大理地区悠久精湛的制茶技艺，为下关沱茶的优良品质提供了得天独厚的条件。 下关沱茶集团公司产品是以下关沱茶、饼茶、砖茶等各种紧压茶为主的云南普洱茶，也包括部分绿茶、特种茶、袋泡茶等共200多个品种。 下关沱茶集团拥有8项桂冠：农业产业化国家级重点龙头企业、国家扶贫龙头企业、全国民族特需商品定点生产企业、国家边销茶原料储备企业、国家茶叶加工技术研发分中心、中华老字号、下关沱茶制作技艺入选国务院公布的第三批非物质文化遗产名录、“下关”商标认定为“中国驰名商标”。"
      },
      interval: "",
      // merchantList: [
      //   {
      //     src: require("../../assets/images/brand-head1-img01.jpg"),
      //     title: "下关沱茶",
      //     text:
      //       "云南下关沱茶（集团）股份有限公司位于风景秀丽、气候宜人的大理市下关，苍山洱海优良的生态环境，大理地区悠久精湛的制茶技艺，为下关沱茶的优良品质提供了得天独厚的条件。 下关沱茶集团公司产品是以下关沱茶、饼茶、砖茶等各种紧压茶为主的云南普洱茶，也包括部分绿茶、特种茶、袋泡茶等共200多个品种。 下关沱茶集团拥有8项桂冠：农业产业化国家级重点龙头企业、国家扶贫龙头企业、全国民族特需商品定点生产企业、国家边销茶原料储备企业、国家茶叶加工技术研发分中心、中华老字号、下关沱茶制作技艺入选国务院公布的第三批非物质文化遗产名录、“下关”商标认定为“中国驰名商标”。"
      //   },
      //   {
      //     src: require("../../assets/images/brand-head2-img01.jpg"),
      //     title: "臻味号",
      //     text:
      //       "在花开四季的云南，在地处热带的西双版纳，在常有云雾升起的高山、群山之间，有傣人、布朗人、拉祜人、爱尼人的家园、几百年来，他们仰俯大地，以茶为生，守望着历史悠久的古树茶园。臻味号和这片土地结缘，和守望土地的人们结缘。臻味号以虔诚之心，扎根这片土地；阅读这片土地；拣选最好的古树茶，以古法精心加工，利于越陈越香。尊重土地、尊重传统的人、尊重原生古茶。真味、真实、真地道。"
      //   },
      //   {
      //     src: require("../../assets/images/brand-head3-img02.jpg"),
      //     title: "老同志",
      //     text:
      //       "云南海湾茶业有限公司于2002年成立，位于昆明国家经济技术开发区，建筑面积5200平方米。作为与国内外客户的贸易合作桥梁，它不仅是海湾茶业的销售窗口，而且是茶叶研究、开发的中心。 云南海湾茶业不仅重视生产技术，还聚集了一大批专业的市场营销人员，公司自2002年成立，2003年取得进出口经营权以来，每年的普洱茶出口量在800吨左右,位居云南普洱茶出口的前列，为亚洲出口，欧美出口，专业市场内销，大众市场营销等提供优质的普洱茶产品，满足市场需求，为客户创造价值。"
      //   },
      //   {
      //     src: require("../../assets/images/brand-head4-img01.jpg"),
      //     title: "岁月知味",
      //     text:
      //       "岁月知味茶业由资深茶人郑少烘先生创办于2005年,公司一直以“纯正易武茶”的传承者为己任，尊重人文历史和自然法则，弘扬古法制茶工艺，以“匠心与品质”为企业主旨，经过十年沉积，已成为易武茶区经营规模及老茶存量皆具说服力的代言企业，并拥有易武千亩古茶园有机认证。岁月知味用了很多时间去读懂易武，从2005年生产出第一款【易武正山古树】始，到2008年细分出易武各村寨小产区，再到2010年建立易武四大古树茶基地，并在2012年获得有机认证至今，公司所生产的每一款产品都是心血的结晶和品质的见证。"
      //   },
      //   {
      //     src: require("../../assets/images/brand-head6-img03.jpg"),
      //     title: "六大茶山",
      //     text:
      //       "云南六大茶山茶业有限公司于2002年在昆明成立，是一家专业生产和销售精品系列普洱茶的茶叶企业。公司在凤庆、勐海两个云南茶叶主产地建有完全符合食品生产标准的现代化茶厂，拥有位于西双版纳勐海县的贺开16200亩有机古茶原料基地及位于临沧凤庆县的岔河10000多亩有机茶园原料基地，年生产能力50000吨，并在全国二十多个省（市、自治区）与1000余家机构（个人）建立了合作伙伴关系。公司主要生产和销售以普洱茶为主的各种茶叶珍品：包括六大茶山野生茶系列的饼茶、砖茶、沱茶、竹筒茶，以及上等的各级有机生态茶系列品。公司生产的精品系列普洱茶不仅得到国内同行的好评，而且受到海外茶人的认可和赞誉，近年来在各种茶叶评奖活动中公司产品多次获奖，“六大茶山”正成为普洱茶的强势品牌。"
      //   }
      // ],
      bannerList: [
        {
          src: 'https://mini.teaexs.com/picture/pcbanner1.jpg'
        },
        {
          src: 'https://mini.teaexs.com/picture/pcbanner2.jpg'
        },
        {
          src: 'https://mini.teaexs.com/picture/pcbanner3.jpg'
        }
      ],
      SPbannerList: [
        {
          src: require("../../assets/images/sp1.png")
        },
        {
          src: require("../../assets/images/sp2.png")
        }
      ],
      JSbannerList: [
        {
          src: require("../../assets/images/brand-head1-img01.jpg")
        },
        {
          src: require("../../assets/images/brand-head1-img02.jpg")
        },
        {
          src: require("../../assets/images/brand-head1-img03.jpg")
        }
      ],
      prizeList: [
        {
          name: "【新品上市】一念间·小粒茶和红柑丸"
        },
        {
          name: "一念间·小粒茶"
        },
        {
          name: "【新品上市】一念间·小粒茶和红柑丸"
        },
        {
          name: "一念间·小粒茶"
        },
        {
          name: "【新品上市】一念间·小粒茶和红柑丸"
        }
      ],
      activeIndex: 0,
      http: this.$store.state.dialog.http
    };
  },
  computed: {
    top() {
      return -this.activeIndex * 50 + "px";
    }
  },
  mounted() {
    this.intervalStart();
    var $brand = $(".brand-image");
    this.ani(); //首页底部动画
    this.getList(); //公告列表
    this.getNewsList(); //咨询列表
    this.getPicture();
  },
  methods: {
    getPicture() {
      this.axios
        .post(
          this.http + "/interface/pc/startpage/getStartPagePictures",
          qs.stringify({
            source: "PCSHOPPINGMALL",
            displayArea: "STARTPAGE"
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.firstImg = res.data.data[0].url;
          }
        });
        this.axios
        .post(
          this.http + "/interface/pc/startpage/getStartPagePictures",
          qs.stringify({
            source: "PCSHOPPINGMALL",
            displayArea: "INDEXPAGE"
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.SPbannerList = res.data.data;
          }
        });
        this.axios
        .post(
          this.http + "/interface/pc/startpage/getStartPagePictures",
          qs.stringify({
            source: "PCSHOPPINGMALL",
            displayArea: "HOMEPAGE"
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.bannerList = res.data.data;
          }
        });
    },
    ani() {
      $(function() {
        var classname,
          index,
          active_index,
          code,
          $brand = $(".brand-image"),
          $tab_ul = $(".brand-image .tab-nav ul"),
          $tab_list_con = $(".brand-image .tab-list-con"),
          $active_l = $(".brand-image .active-l"),
          $active_m = $(".brand-image .active-m"),
          $active_r = $(".brand-image .active-r"),
          $loading = $(".brand-image .tab-list .loading"),
          length = $tab_ul.children("li").length;
        //初始化
        var init = ".brand-image .tab-nav li.active";
        $tab_ul
          .children("li")
          .eq(0)
          .addClass("active-3");
        $tab_ul
          .children("li")
          .eq(1)
          .addClass("active-2");
        $tab_ul
          .children("li")
          .eq(2)
          .addClass("active-1");
        $tab_ul
          .children("li")
          .eq(3)
          .addClass("active")
          .prepend("<em class='b-line'></em>");
        $tab_ul
          .children("li")
          .eq(4)
          .addClass("active-1");
        $tab_ul
          .children("li")
          .eq(5)
          .addClass("active-2");
        $tab_ul
          .children("li")
          .eq(6)
          .addClass("active-3");
        tab_list(init); ////头像上部添加内容
        //点击头像
        $tab_ul.on("click", "li:not(.active)", function() {
          code = "";
          index = $(this).index();
          active_index = $tab_ul.children("li.active").index();
          $tab_list_con.hide(); //头像上部内容隐藏
          $loading.fadeIn("fast"); //loading显示
          $(this)
            .siblings(".active")
            .find(".b-line")
            .remove();
          $(this)
            .removeClass()
            .addClass("active")
            .prepend("<em class='b-line'></em>");
          if (index > active_index) {
            //如果点击的是active后面
            $tab_ul.children("li:lt(" + (index - 3) + ")").removeClass(); //移除active左起3个li之前的class
            //重置active之前的3个li
            $tab_ul
              .children("li")
              .eq(index - 1)
              .removeClass()
              .addClass("active-1");
            $tab_ul
              .children("li")
              .eq(index - 2)
              .removeClass()
              .addClass("active-2");
            $tab_ul
              .children("li")
              .eq(index - 3)
              .removeClass()
              .addClass("active-3");
            for (var i = 0; i < index - active_index; i++) {
              //需要后置的li标签
              code +=
                "<li>" +
                $tab_ul
                  .children("li")
                  .eq(i)
                  .html() +
                "</li>";
            }
            $tab_ul.children("li:gt(" + (index + 3) + ")").removeClass(); //移除active右起3个li之前的class
            $tab_ul.append(code); //前面的li后置
            //重置active之后的3个li
            $tab_ul
              .children("li")
              .eq(index + 1)
              .removeClass()
              .addClass("active-1");
            $tab_ul
              .children("li")
              .eq(index + 2)
              .removeClass()
              .addClass("active-2");
            $tab_ul
              .children("li")
              .eq(index + 3)
              .removeClass()
              .addClass("active-3");
            $tab_ul.children("li:lt(" + (index - active_index) + ")").remove(); //移除最前面的指定数量li标签
          } else if (index < active_index) {
            //如果点击的是active前面
            $tab_ul.children("li:gt(" + (index + 3) + ")").removeClass(); //移除active右起3个li之后的class
            //重置active之后的3个li
            $tab_ul
              .children("li")
              .eq(index + 1)
              .removeClass()
              .addClass("active-1");
            $tab_ul
              .children("li")
              .eq(index + 2)
              .removeClass()
              .addClass("active-2");
            $tab_ul
              .children("li")
              .eq(index + 3)
              .removeClass()
              .addClass("active-3");
            for (
              var i = length - 1 - (active_index - index) + 1;
              i < length;
              i++
            ) {
              //需要前置的li标签
              code +=
                "<li>" +
                $tab_ul
                  .children("li")
                  .eq(i)
                  .html() +
                "</li>";
            }
            $tab_ul
              .children("li:gt(" + (length - 1 - (active_index - index)) + ")")
              .remove(); //移除最后面的指定数量li标签
            $tab_ul.prepend(code); //后面的li前置
            //重置active之前的3个li
            $tab_ul
              .children("li")
              .eq(0)
              .removeClass()
              .addClass("active-3");
            $tab_ul
              .children("li")
              .eq(1)
              .removeClass()
              .addClass("active-2");
            $tab_ul
              .children("li")
              .eq(2)
              .removeClass()
              .addClass("active-1");
          }
          tab_list(this); //头像上部内容变化
        });
        //点击头像上部内容右边
        var active_l_img,
          active_l_txts,
          active_m_img,
          active_m_txts,
          active_r_img,
          active_r_txts;
        $brand.on("click", ".active-r", function() {
          //存储内容
          code_save();
          //文字隐藏处理
          txts_hide();
          //右边动画
          $active_r.css("z-index", "1").animate(
            {
              width: "480px",
              height: "364px",
              marginTop: "0",
              top: "0",
              left: "50%",
              marginLeft: "-240px",
              opacity: "1"
            },
            "fast"
          );
          $active_r.find("img").animate(
            {
              width: "480px",
              height: "364px"
            },
            "fast"
          );
          //中间动画
          $active_m.css("z-index", "auto").animate(
            {
              width: "329px",
              height: "232px",
              marginTop: "-116px",
              top: "50%",
              left: "0",
              marginLeft: "0",
              opacity: "0.65"
            },
            "fast"
          );
          $active_m.find("img").animate(
            {
              width: "329px",
              height: "232px"
            },
            "fast"
          );
          //左边动画
          $active_l.css("z-index", "auto").animate(
            {
              width: "329px",
              height: "232px",
              marginTop: "-116px",
              top: "50%",
              left: "678px",
              marginLeft: "0",
              opacity: "0.65"
            },
            "fast"
          );
          $active_l.find("img").animate(
            {
              width: "329px",
              height: "232px"
            },
            "fast",
            function() {
              //动画完毕配置内容
              code_reset("active-r");
            }
          );
        });
        //点击头像上部内容左边
        $brand.on("click", ".active-l", function() {
          //存储内容
          code_save();
          //文字隐藏处理
          txts_hide();
          //左边动画
          $active_l.css("z-index", "1").animate(
            {
              width: "480px",
              height: "364px",
              marginTop: "0",
              top: "0",
              left: "50%",
              marginLeft: "-240px",
              opacity: "1"
            },
            "fast"
          );
          $active_l.find("img").animate(
            {
              width: "480px",
              height: "364px"
            },
            "fast"
          );
          //中间动画
          $active_m.css("z-index", "auto").animate(
            {
              width: "329px",
              height: "232px",
              marginTop: "-116px",
              top: "50%",
              left: "678px",
              marginLeft: "0",
              opacity: "0.65"
            },
            "fast"
          );
          $active_m.find("img").animate(
            {
              width: "329px",
              height: "232px"
            },
            "fast"
          );
          //右边动画
          $active_r.css("z-index", "auto").animate(
            {
              width: "329px",
              height: "232px",
              marginTop: "-116px",
              top: "50%",
              left: "0",
              marginLeft: "0",
              opacity: "0.65"
            },
            "fast"
          );
          $active_r.find("img").animate(
            {
              width: "329px",
              height: "232px"
            },
            "fast",
            function() {
              //动画完毕配置内容
              code_reset("active-l");
            }
          );
        });
        //定义函数
        function tab_list(obj) {
          //头像上部内容变化
          var img_code = $(obj)
              .find(".img-m")
              .html(),
            img_code_l = $(obj)
              .find(".img-l")
              .html(),
            img_code_r = $(obj)
              .find(".img-r")
              .html(),
            txts_code = $(obj)
              .find(".txts")
              .html();
          $active_l.children(".img").html(img_code_l);
          $active_m.children(".img").html(img_code);
          $active_r.children(".img").html(img_code_r);
          $active_m.children(".txts").html(txts_code);
          setTimeout(function() {
            $loading.hide(); //loading隐藏
            $tab_list_con.fadeIn("fast"); //头像上部内容显示
          }, 500);
        }
        function code_save() {
          //代码内容存储
          active_l_img = $active_l.children(".img").html();
          active_m_img = $active_m.children(".img").html();
          active_r_img = $active_r.children(".img").html();
          active_m_txts = $active_m.children(".txts").html();
        }
        function txts_hide() {
          //文字隐藏处理
          $active_m.children(".txts").fadeOut("fast");
        }
        function code_reset(obj) {
          //动画完毕配置内容
          $active_l.removeAttr("style");
          $active_l.find("img").removeAttr("style");
          $active_m.removeAttr("style");
          $active_m.find("img").removeAttr("style");
          $active_r.removeAttr("style");
          $active_r.find("img").removeAttr("style");
          if (obj == "active-r") {
            $active_l.children(".img").html(active_m_img);
            $active_m.children(".img").html(active_r_img);
            $active_r.children(".img").html(active_l_img);
          } else if (obj == "active-l") {
            $active_l.children(".img").html(active_r_img);
            $active_m.children(".img").html(active_l_img);
            $active_r.children(".img").html(active_m_img);
          }
          $active_m.children(".txts").fadeIn("slow");
        }
      });
    },
    stopInterval() {
      clearInterval(this.interval);
    },
    intervalStart() {
      this.interval = setInterval(_ => {
        if (this.activeIndex < this.prizeList.length - 1) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 2000);
    },
    getList() {
      this.axios
        .post(
          this.http + "/interface/pc/bulltin/list",
          qs.stringify({
            currentPage: 1,
            bulletinType: 1,
            pageSize: 5
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.prizeList = JSON.parse(res.data.data).bulltinList;
          }
        });
    },
    getNewsList() {
      this.axios
        .post(
          this.http + "/interface/pc/bulltin/list",
          qs.stringify({
            currentPage: 1,
            bulletinType: 3,
            pageSize: 5
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.newsList = JSON.parse(res.data.data).bulltinList;
          }
        });
    }
  }
};
</script>
<style lang = 'less'>
@import "../../assets/index.css";
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
  padding: 2px;
  line-height: 17px;
  text-indent: 2em;
  /* text-overflow: ellipsis; */
  /* -o-text-overflow: ellipsis; */
  overflow: hidden;
  display: block;
  max-height: 53px;
  /* -webkit-line-clamp: 3; */
  margin-bottom: 10px;
  position: relative;
  /* -webkit-box-orient: vertical; */
}
.text_my::after {
  content: "...";
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 20px;
  background: url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png)
    repeat-y;
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
  clear: both;
}
</style>