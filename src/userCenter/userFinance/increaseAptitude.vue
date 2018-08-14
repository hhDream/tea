<template>
    <div>
    <el-breadcrumb style='padding:24px 0' separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '' }">财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>增票资质</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName">
        <el-tab-pane label="增票资质" name="first">
            <el-row style='padding:0 24px;border:1px solid #efefef;width:100%;box-sizing:border-box'>
                <el-col :span="24">我们会在三个工作日内完成审核工作。</el-col>
                <el-col :span="24">1）注意有效增值税专用发票开票资质仅为一个。</el-col>
                <el-col :span="24">2）发票常见问题查看发票帮助。</el-col>
                <el-col :span="24">3）本页面信息仅供增值税专用发票-资质审核使用，切勿进行支付相关业务，谨防上当受骗。</el-col>
                <el-col :span="24">
                    <div style="background:#ffece7;height:62px;padding:20px;border:1px solid #ffb7a6">
                        <i class='el-icon-warning'></i>
                        <span>您的增票资质： 未添加</span>
                        <el-button type="danger" style="height:20px;line-height:0px;margin-left:20px">增加增票资质</el-button>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div style="background:#ffece7;height:62px;padding:20px;border:1px solid #ffb7a6">
                        <i class='el-icon-warning'></i>
                        <span>您的增票资质： 已审核通过</span>
                        <el-button type="danger" class="change">修改</el-button>
                        <el-button type="danger" class="delete">删除</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row style='padding:24px;background:#efefef;width:100%;margin-top:20px'>
                <el-col :span="24"><b>增票资质信息</b></el-col>
                <el-col :span="24">单位名称：</el-col>
                <el-col :span="24">纳税人识别码：</el-col>
                <el-col :span="24">注册地址：</el-col>
                <el-col :span="24">注册电话：</el-col>
                <el-col :span="24">开户银行：</el-col>
                <el-col :span="24">银行账户：</el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="发票帮助" name="second">
            <el-row style='padding:0 24px;border:1px solid #efefef;width:100%;box-sizing:border-box;font-weight:700'>
                <el-col :span="24">1、您在订单信息确认过程中可以选择是否开具发票，将根据您的选择开具发票，将在3-5个工作日内为您邮寄。</el-col>
                <el-col :span="24">2、纸质发票可作为单位报销的凭证，也可作为享受售后服务的凭证，请妥善保管。</el-col>
                <el-col :span="24">3、发票原则上将随单为您开具和配送，其中部分卖家将在您点击确认收货后5-7个工作日内为您邮寄；如您未及时收到发票，欢迎来电或联系在线客服咨询。</el-col>
                <el-col :span="24">4、发票内容您可以选择为食品，明细或者茶叶，发票金额为您购买商品实际的付款金额。-资质审核使用，切勿进行支付相关业务，谨防上当受骗。</el-col>
                <el-col :span="24">5、请在订单提交前确认好您所需开具的发票抬头，订单生成后发票抬头将无法修改，给您带来不便请您谅解。</el-col>
                <el-col :span="24">6、若您下单时选择暂不开发票，事后需要发票，须在订单完成后、订单日期60天内在购买订单详情页面中申请补开发票。</el-col>
                <el-col :span="24">7、如需开具增值税专用发票，请先登录PC端申请专用发票资质，申请后平台将在1-2个工作日内审核，审核通过后您即可以开具增值税专用发票。</el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
export default {
  data() {
    return {
      input: "1101**********007X",
      activeName:"first",
      user:""
    };
  }
};
</script>

<style lang="less" scoped>
label {
  color: #000;
  font-weight: normal;
}
.el-col-24 {
  margin: 10px 0;
}
.el-form-item {
  margin: 0;
}
.change{
height:20px;line-height:0px;margin-left:20px;background:white;color: red;
}
.delete{
height:20px;line-height:0px;margin-left:20px
}
</style>
