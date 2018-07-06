<template>
    <div>
        <el-row>
            <!-- <el-col :span="4">&nbsp;</el-col> -->
            <el-col  style="min-width:1190px;margin:0 auto;float: none;" :span="16">
                <div class="page-cover-paylimit">
                    <div class="instructions">
                        <div class="title">限额说明</div>
                        <div class="tip"><span>温馨提示</span>限额仅做参考，具体请以收银台页面显示为准，若支付时收银台页面无限额提示，超限后会进行提示。</div>
                        <div class="list-wrap">
                            <div class="header clearfix">
                                <p class="name">储蓄卡</p>
                                <p class="info">额度</p>
                            </div>
                            <ul class="bank-list clearfix">
                                <li>
                                    <p class="name">工商银行</p>
                                    <p class="info">单笔5万、单日5万</p>
                                </li>
                                <li>
                                    <p class="name">农业银行</p>
                                    <p class="info">单笔20万、单日20万</p>
                                </li>
                                <li>
                                    <p class="name">中国银行</p>
                                    <p class="info">单笔5万、单日20万</p>
                                </li>
                                <li>
                                    <p class="name">建设银行</p>
                                    <p class="info">单笔5万、单日100万</p>
                                </li>
                                <li>
                                    <p class="name">交通银行</p>
                                    <p class="info">单笔0.99万、单日50万</p>
                                </li>
                                <li>
                                    <p class="name">中信银行</p>
                                    <p class="info">单笔5,000元 单日5,000元</p>
                                </li>
                                <li>
                                    <p class="name">光大银行</p>
                                    <p class="info">单笔5万、单日5万</p>
                                </li>
                                <li>
                                    <p class="name">民生银行</p>
                                    <p class="info">单笔5万、单日5万</p>
                                </li>
                                <li>
                                    <p class="name">广发银行</p>
                                    <p class="info">单笔100万、单日100万</p>
                                </li>
                                <li>
                                    <p class="name">平安银行</p>
                                    <p class="info">单笔5万、单日100万</p>
                                </li>
                                <li>
                                    <p class="name">兴业银行</p>
                                    <p class="info">单笔5万、单日5万</p>
                                </li>
                                <li>
                                    <p class="name">浙商银行</p>
                                    <p class="info">单笔2万、单日2万</p>
                                </li>
                                <li>
                                    <p class="name">上海银行</p>
                                    <p class="info">单笔5,000元 单日5,000元</p>
                                </li>
                                <li>
                                    <p class="name">北京银行</p>
                                    <p class="info">单笔5万、单日100万</p>
                                </li>
                                <li>
                                    <p class="name">各城市商业银行</p>
                                    <p class="info">以收银台显示为准</p>
                                </li>
                            </ul>
                        </div>
                        <div class="btn-close-paylimit">关闭</div>
                    </div>
                </div>
            </el-col>
            <!-- <el-col :span="4">&nbsp;</el-col> -->
        </el-row>
    </div>
</template>
<style>
    .page-cover-paylimit ul,
    .page-cover-paylimit li,
    .page-cover-paylimit p {
        margin: 0;
        padding: 0;
    }
    .page-cover-paylimit {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url("../../../assets/images/mark.png")/*tpa=https://www.teaexs.com/images/mark.png*/
        ;
        z-index: 999;
    }
    .page-cover-paylimit .instructions {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 760px;
        height: 620px;
        padding: 20px;
        margin: -310px 0 0 -380px;
        background: #fff;
    }
    .page-cover-paylimit .instructions .title {
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        line-height: 36px;
        border-bottom: 1px solid #e1e1e1;
    }
    .page-cover-paylimit .instructions .tip {
        padding-top: 20px;
        padding-left: 32px;
        color: #666;
        font-size: 14px;
        line-height: 24px;
        /* background: url("../../../assets/images/icon-tip-large.png") */
        /* no-repeat; */
        background-position: 0 20px;
        background-size: 24px 24px;
    }
    .page-cover-paylimit .instructions .list-wrap {
        width: 720px;
        height: 406px;
        margin-top: 20px;
        border: 1px solid #e1e1e1;
    }
    .page-cover-paylimit .instructions .list-wrap .header {
        height: 44px;
        line-height: 44px;
        background: #f1f1f1;
    }
    .page-cover-paylimit .instructions .list-wrap .header p {
        float: left;
        width: 330px;
        height: 100%;
        padding-left: 50px;
        color: #211d1d;
        font-size: 18px;
        font-weight: bold;
    }
    .page-cover-paylimit .instructions .list-wrap .header p:first-child {
        width: 280px;
        padding-left: 0;
        text-align: center;
    }
    .page-cover-paylimit .instructions .bank-list {
        width: 100%;
        height: 360px;
        overflow: auto;
    }
    .page-cover-paylimit .instructions .bank-list li {
        height: 53px;
        list-style: none;
        border-top: 1px solid #e1e1e1;
    }
    .page-cover-paylimit .instructions .bank-list li p {
        float: left;
        width: 330px;
        height: 100%;
        padding-left: 50px;
        color: #333;
        font-size: 14px;
        line-height: 52px;
    }
    .page-cover-paylimit .instructions .bank-list li p:first-child {
        width: 280px;
        padding-left: 0;
        text-align: center;
    }
    .page-cover-paylimit .instructions .btn-close-paylimit {
        margin: 20px auto 0;
        width: 150px;
        height: 30px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        background: #db4b29;
    }
</style>


<script>

</script>