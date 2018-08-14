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
                                        <img class="left_imgz" :src="item.cover" width="206px" height="126px">
                                    </em>
                                </dt>
                                <dd>
                                    <span style="word-break:break-all;">
                                        <a @click="$router.openPage('/teaMallNew',{id:item.id})">{{item.title}}</a>
                                        <em>2018-03-07 09:35:03</em>
                                    </span>
                                    <p style="word-break:break-all;"> {{item.abstractContent}}</p>
                                </dd>
                            </dl>
                        </div>
                        <el-pagination style="margin-top:20px" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" :total='total' layout="total, sizes, prev, pager, next, jumper">
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
import qs from 'qs'
    export default ({
        data() {
            return {
                total:1,
                currentPage: 1,
                http:this.$store.state.dialog.http,
                pageSize:5,
                noticeList: [{
                        title: "正在加载",
                    },
                    
                ]
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize=val;
                this.getNewsList();
            },
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getNewsList();
            },
            getNewsList() {
                this.axios.post(this.http + '/interface/pc/bulltin/list', qs.stringify({
                    currentPage: this.currentPage,
                    bulletinType: 3,
                    pageSize: this.pageSize
                })).then(res => {
                    console.log(res.data);
                    this.noticeList = JSON.parse(res.data.data).bulltinList
                    this.total=JSON.parse(res.data.data).total
                })
            }
        },
        created() {
            this.getNewsList()
        },
    })
</script>
<style lang = 'less' scoped>
    @import '../../assets/notice.css';
</style>