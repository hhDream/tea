<template>
    <div class="wire">
        <el-row>
            <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
                <div class="cent">
                    <div class="wire_tx">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>新闻中心</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="article-list" id="aaa">
                            <dl v-for="(item,index) in noticeList" :key="index">
                                <dt>
                                            <em>
                                                <img class="left_imgz" src="https://www.teaexs.com/pictures/notice/noticeImage_1726167776143.jpg" width="206px" height="126px">
                                            </em>
                                        </dt>
                                <dd>
                                    <span style="word-break:break-all;">
                                                <a @click="$router.openPage('/teaMallNew');jumbNotice(index)">【2018新品抢购】{{item.name}}</a>
                                                <em>2018-03-07 09:35:03</em>
                                            </span>
                                    <p style="word-break:break-all;"> 津乔茶业新品即将开抢，自3月6日起新用户可获赠108元现金券礼包。小粒茶首发抢购价：208 元/盒（抢购结束恢复市场零售价：260元/盒），红柑丸首发抢购价：128 元/盒（抢购结束恢复市场零售价：160元/盒）</p>
                                </dd>
                            </dl>
                        </div>
                        <el-pagination style="margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                        </el-pagination>
                        <div class="fenye">
                            <div class="page">
                                <div id="Pagination" class="page-css"></div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="tab-news-none">
                            <div>空空如也，暂时没有消息哦～</div>
                            <a class="button-orange" href="/index.html">回首页逛逛</a>
                        </div> -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default ({
        data() {
            return {
                currentPage: 1,
                noticeList: [{
                        name: "一念间·小粒茶和红柑丸",
                    },
                    {
                        name: "一念间·红柑丸",
                    },
                    {
                        name: "一念间·红柑丸和小李茶",
                    }
                ]
            }
        },
        methods: {
            handleSizeChange() {
            },
            handleCurrentChange() {
            },
            jumbNotice(a) {
                this.$store.commit('changeNewId', a)//修改store中newId
            },
        }
    })
</script>
<style lang = 'less' scoped>
    @import '../../assets/notice.css';
</style>