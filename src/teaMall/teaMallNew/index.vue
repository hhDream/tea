<template>
    <div>
        <el-row>
            <el-col :span="16" style="min-width:1190px;margin:0 auto;float: none;">
                <div class="article-cont">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/teaMallNews' }">新闻中心</el-breadcrumb-item>
                    <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="wz_text">
                        <h1 id="notice_title" style="word-break:break-all;">{{newdata.title}}</h1>
                        <div class="fontsize" id="notice_publishTime">2018-03-07 10:00:01&nbsp;&nbsp; 字体： <a  @click="size=20">大</a> | <a  @click="size=16">中</a> | <a @click="size=12">小</a> &nbsp;&nbsp; 茶企通官方平台</div>
                        <div id="text" :style="{wordBreak:'break-all',fontSize:size+'px'}" v-html="newdata.mainBody">
                            正在加载
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
                id: this.$route.query.id,
                size: 12,
                newdata:{},
                http: this.$store.state.dialog.http

            }
        },
        methods: {
            getList() {
                this.axios.post(this.http + '/interface/pc/bulltin/findInformationBulletin', qs.stringify({
                    id: this.id,
                })).then(res => {
                    this.newdata = JSON.parse(res.data.data)
                })
            },
        },
        created() {
            this.getList()
        },
    })
</script>
<style lang = 'less' scoped>
    /* @import url(../../assets/notice.css); */
    @import "../../assets/notice.css";
</style>