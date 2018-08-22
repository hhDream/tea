<template>
    <div class="wire">
        <el-row>
            <el-col style="min-width:1190px;margin:20px auto;float: none;" :span="16">
                <div class="cent">
                    <div class="wire_tx">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>公告列表</el-breadcrumb-item>
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
                                        <a @click="$router.openPage('/teaMallNotice',{id:item.id})">{{item.title}}</a>
                                        <em>{{item.releaseTime}}</em>
                                    </span>
                                    <p style="word-break:break-all;"   v-html="item.abstractContent"> </p>
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
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import qs from 'qs';
    export default ({
        data() {
            return {
                currentPage: 1,
                noticeList: [{
                        title: "正在加载",
                    },
                ],
                http:this.$store.state.dialog.http
                ,
                pageSize:5,
                total:1
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize=val
            this.getList()

            },
            handleCurrentChange(val) {
                this.currentPage=val
            this.getList()

            },
            getList() {
                this.axios.post(this.http + '/interface/pc/bulltin/list', qs.stringify({
                    currentPage: this.currentPage,
                    bulletinType: 1,
                    pageSize: this.pageSize
                })).then(res => {
                    if(res.data.code == 200){
                        this.noticeList = JSON.parse(res.data.data).bulltinList;
                        this.total=JSON.parse(res.data.data).total;
                    }
                })
            }
        }
    })
</script>
<style lang = 'less' scoped>
    @import '../../assets/notice.css';
</style>