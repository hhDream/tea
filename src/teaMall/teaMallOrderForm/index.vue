<template>
<div class="order-confirm">
    <el-row>
      <el-col  style="min-width:1190px;margin:20px auto;float: none;background:#fff" :span="16">
        <div class="main-side" data-min-height="true" style="min-height: 586px;">
            <div class="clearfix main-cont">
            <div class="bill-info">
                    <h4>发票信息</h4>
                    <div class="box">
                    <div id="d-invoicetype" class="radio">
                            <el-radio v-model="radio" label="0" border>暂不开票</el-radio>
                            <el-radio v-model="radio" label="1" border>普通发票</el-radio>
                        </div>
					<div id="d-invoice" v-if="radio==1">
						<div id="d-invoice-title">
                        	<table>
	                            <tbody><tr>
	                                <td>发票抬头：</td>
	                                <td>
										<div class="fl tt">
									       <input type="text" id="invoice-title" class="form-control input-sm" style="width:220px;" value="个人">
											 <div id="d-options" class="options" style="width: 650px;display:none;">
												 <ul id="ul-invoice" style="margin:0;padding:0;"></ul>
											 </div>
										</div>
	                                </td>
	                            </tr>
	                            <tr>
	                                <td>纳税人识别码：</td>
	                                <td>
										<div class="fl tt">
									       <input type="text" id="invoice-taxno" maxlength="30" class="form-control input-sm" style="width:220px;" value="">
										</div>
	                                </td>
	                            </tr>
                           </tbody></table>
                      	</div>
                      	<div id="d-invoice-addtaxinfo" style="display:none"></div>
                           <table>
                            <tbody><tr>
                                <td>发票内容：</td>
                                <td>
	                                <div id="d-invoicedetail" class="fl type" style="margin-left: 0px;"><a :class="{active:typ==0}"  @click="typ=0">明细</a><input type="hidden" id="invoice-desc" value="明细"><a :class="{active:typ==1}" @click="typ=1">茶叶</a></div></td>
                            </tr>
                            <tr>
                                <td valign="top">收货地址：</td>
                                <td>
	                                <div style="width: 900px;border:1px solid gray;padding: 10px;background-color: white;" class="clearfix">
	                                	<label style="float: left;"><img src="../../assets/images/icon/address-sign.png"> &nbsp; 寄送至</label>
	                                	<div id="d-invoicedeliverylist" style="float: left; margin-left: 20px;"><div><input type="radio" name="invoiceaddress" value="841" checked="true"> 北京市 市辖区 石景山区 啊(正在)   联系方式：13366666666 <span style="margin-left:120px;">默认地址</span></div><div><input type="radio" name="invoiceaddress" value="843"> 天津市 市辖区 河西区 12(ss)   联系方式：12345678900 </div><div><input type="radio" name="invoiceaddress" value="845"> 天津市 县 静海县 3(33)   联系方式：11223344556 </div></div>
	                                	<div id="d-newaddress" style="text-align: center;"><a style="border:1px; border-style: solid;width: 260px;height: 30px; line-height:30px;border-color: #db4b29;display: inline-block;margin-top: 10px;color: #db4b29;" data-toggle="modal" data-target=".add-address-modal">+ 新增地址</a></div>
	                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>寄送方式：</td>
                                <td>
                                	<div id="d-invoicemailtype"><input id="rd-express" name="invoicemailtype" type="radio" value="EXPRESS" onclick="postagefunc(0)"><span>快递物流</span><div id="d-postagewarn" style="display:none">温馨提示：发票寄送费按卖家默认设置计费</div></div></td>
                            </tr>
                        </tbody></table>
                        </div>
                        </div>
                </div>
                <div class="product-info">
                    <h4>订单信息</h4>
                    <table style="width:100%;">
                        <thead>
                            <tr>
                                <th width="350">商品信息</th>
                                <th>商品代码</th>
                                <th>商品单价</th>
                                <th>商品数量</th>
                                <th>商品总价</th>
                                <th>交易手续费</th>
                                <th>小计</th>
                            </tr>
                        </thead>
                        <tbody id="tb-products"><tr><td><div class="clearfix info"><div class="fl img"><img width="38px" height="38px" src="https://www.teaexs.com/pictures/product/200_ad9652f6-a03e-42e0-97d9-9dd42427401f.png"></div><div class="fl txt">下关标准沱茶(礼盒装)</div></div></td><td>XGTC001</td><td>1150.00元/盒</td><td>1盒</td><td>1,150.00元</td><td>0.00元</td><td>1150.00元</td></tr></tbody>
                    </table>
                </div>
                <div class="fr submit-box">
                    <p class="a" id="p-all-weigth">预计总重量：0.6kg</p>
                    <p class="a" id="p-margin"></p>
                    <p class="b" id="p-discount"></p>
                    <p class="b">实付款：<b>￥</b><b id="b-all-price">1,150.00</b><b>元</b></p>
                    <a class="btn-return" id="sp-back" @click="$router.go(-1)"><em></em>返 回</a><button type="button" class="btn btn-primary" id="bt-confirmOrder">提交订单</button>
                </div>
            </div>
        </div>
      </el-col>
    </el-row>

    </div> 
</template>

<script>
export default ({
    data(){
        return{
            radio:0,
            typ:0,
        }
    }
})
</script> 
<style lang = 'less' scoped >
@import '../../assets/order.css';
</style>