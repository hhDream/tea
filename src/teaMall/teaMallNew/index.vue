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
                        <h1 id="notice_title" style="word-break:break-all;">关于茶企通春节放假公告</h1>
                        <div class="fontsize" id="notice_publishTime">2018-03-07 10:00:01&nbsp;&nbsp; 字体： <a  @click="size=20">大</a> | <a  @click="size=16">中</a> | <a @click="size=12">小</a> &nbsp;&nbsp; 茶企通官方平台</div>
                        <div id="text" :style="{wordBreak:'break-all',fontSize:size+'px'}">
                            <p>尊敬的客户：
                                <br> &nbsp; &nbsp; 您好！春节将至，感谢大家2017年对茶企通的大力支持。
                                <br> &nbsp; &nbsp;
                                <br> &nbsp; &nbsp; 春节放假通知：
                                <br> &nbsp; &nbsp; 自腊月二十五（2月10日）起茶企通平台正式休假，期间只接单不发货，一切售后延长至正月初七（2月22日），不周之处敬请谅解。正月初七（2月22日）正常营业。
                                <br> &nbsp; &nbsp;&nbsp;
                                <br> &nbsp; &nbsp; 再次感谢大家对茶企通的关注与支持。我的id是<span style="font-size:20px;color:red">{{this.$store.state.index.newId}}</span> 
                                <br> &nbsp; &nbsp;&nbsp;
                                <br> &nbsp; &nbsp; 茶企通全体员工恭祝大家新年快乐！狗年吉祥</p>
                            <p>&nbsp;</p>
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
                size: 12
            }
        },
        methods: {},
        created() {
            console.log("ssss", this.id);
        },
    })
</script>
<style lang = 'less' scoped>
    /* @import url(../../assets/notice.css); */
    @import "../../assets/notice.css";
</style>