webpackJsonp([61],{"8L71":function(a,t){},AaGp:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=["食品","茶叶","明细"],r={data:function(){return{radio:"普通发票",rationType:"",checkboxGroup1:"食品",cities:o,radio2:"",radio3:""}}},l={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",[a._m(0),a._v(" "),e("el-row",{staticStyle:{background:"#f5f5f5","margin-top":"30px",padding:"24px"}},[e("el-col",{attrs:{span:24}},[e("el-radio-group",{model:{value:a.radio,callback:function(t){a.radio=t},expression:"radio"}},[e("el-radio",{attrs:{label:"普通发票"}}),a._v(" "),e("el-radio",{attrs:{label:"增值税发票"}})],1)],1),a._v(" "),"普通发票"==a.radio?e("el-col",{attrs:{span:3}},[a._v(" \n            发票抬头：\n        ")]):a._e(),a._v(" "),"普通发票"==a.radio?e("el-col",{attrs:{span:21}},[e("el-input",{staticStyle:{width:"300px"},model:{value:a.rationType,callback:function(t){a.rationType=t},expression:"rationType"}})],1):a._e(),a._v(" "),"普通发票"==a.radio?e("el-col",{attrs:{span:3}},[a._v(" \n            纳税人识别码：\n        ")]):a._e(),a._v(" "),"普通发票"==a.radio?e("el-col",{attrs:{span:21}},[e("el-input",{staticStyle:{width:"300px"},model:{value:a.rationType,callback:function(t){a.rationType=t},expression:"rationType"}})],1):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:3}},[a._v(" \n            单位名称：\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{attrs:{span:21}},[a._v(" \n            奥体1\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:3}},[a._v(" \n            纳税人识别码：\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{attrs:{span:21}},[a._v(" \n            121431\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:3}},[a._v(" \n            注册地址：\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{attrs:{span:21}},[a._v(" \n            奥体1\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:3}},[a._v(" \n            注册电话：\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{attrs:{span:21}},[a._v(" \n            025*****6781\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:3}},[a._v(" \n            开户银行：\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{attrs:{span:21}},[a._v(" \n            招商1\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:3}},[a._v(" \n            银行账户：\n        ")]):a._e(),a._v(" "),"增值税发票"==a.radio?e("el-col",{attrs:{span:21}},[a._v(" \n            13**61\n        ")]):a._e(),a._v(" "),e("el-col",{attrs:{span:3}},[a._v(" \n            发票内容：\n        ")]),a._v(" "),e("el-col",{attrs:{span:21}},[e("el-radio-group",{model:{value:a.checkboxGroup1,callback:function(t){a.checkboxGroup1=t},expression:"checkboxGroup1"}},a._l(a.cities,function(t){return e("el-radio-button",{key:t,attrs:{label:t}},[a._v(a._s(t))])}))],1),a._v(" "),e("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:3}},[a._v(" \n            收货地址：\n        ")]),a._v(" "),e("el-col",{attrs:{span:21}},[e("el-radio",{attrs:{label:"安徽省 马鞍山市 当涂县 新街口(胡静) 联系方式：18205190171（默认地址）"},model:{value:a.radio2,callback:function(t){a.radio2=t},expression:"radio2"}}),e("br"),a._v(" "),e("el-radio",{attrs:{label:"安徽省 马鞍山市 当涂县 新街口(胡静) 联系方式：18205190172"},model:{value:a.radio2,callback:function(t){a.radio2=t},expression:"radio2"}}),e("br"),a._v(" "),e("el-radio",{attrs:{label:"安徽省 马鞍山市 当涂县 新街口(胡静) 联系方式：18205190173"},model:{value:a.radio2,callback:function(t){a.radio2=t},expression:"radio2"}}),e("br")],1),a._v(" "),e("el-col",{staticStyle:{"margin-top":"20px"},attrs:{span:3}},[a._v(" \n            寄送方式：\n        ")]),a._v(" "),e("el-col",{attrs:{span:21}},[e("el-radio",{attrs:{label:"到付"},model:{value:a.radio3,callback:function(t){a.radio3=t},expression:"radio3"}}),a._v(" "),e("el-radio",{attrs:{label:"快递物流"},model:{value:a.radio3,callback:function(t){a.radio3=t},expression:"radio3"}})],1)],1),a._v(" "),a._m(1),a._v(" "),e("div",{staticStyle:{"text-align":"right","margin-top":"20px"}},[e("el-button",{staticStyle:{width:"150px",background:"#dc2b01",color:"white"}},[a._v("提交订单")])],1)],1)},staticRenderFns:[function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticStyle:{"font-size":"20px"}},[t("b",[this._v("补开发票")])])},function(){var a=this.$createElement,t=this._self._c||a;return t("div",{staticStyle:{"text-align":"right","margin-top":"20px"}},[t("b",[this._v("实付款："),t("span",{staticStyle:{color:"#dc2b01","font-size":"25px"}},[this._v("￥100.00元")])])])}]};var n=e("vSla")(r,l,!1,function(a){e("8L71")},"data-v-3384af3b",null);t.default=n.exports}});