webpackJsonp([37],{mC6A:function(e,t){},sccQ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("a3Yh"),r=a.n(l),n=(a("6iV/"),{inject:["reload"],methods:{search:function(){},getquotalist_getExcel:function(){},handleClick:function(){},handleSizeChange:function(){},handleCurrentChange:function(){}},data:function(){var e;return e={orderNum:"",takeGoodsNum:"",fundDirection:"",feeType:"",times:"",releaseBeginTime:"",pickerOptions2:"",http:this.$store.state.dialog.http,enterpriseCode:this.$store.state.dialog.enterpriseCode,total:1,currentPage:1,showCount:10,total2:1,currentPage2:1,showCount2:10,dialogTableVisible:!1,innerVisible:!1,distributorId:"",distributorName:"",distributorLevel:"",activeName:"first",tableData:[{settleTime:"2018-07-03 16:18:15",orderNum:"201807031618141262057",takeGoodsNum:"1123456789",feeType:"充值",fundDirection:"支出",szAmount:"2000"},{settleTime:"2018-07-06 16:18:15",orderNum:"201807031618141262058",takeGoodsNum:"2123456789",feeType:"充值",fundDirection:"收入",szAmount:"1000"}],takeIt:!1,showIt:!1,fundOptions:[{value:"",label:"全部"},{value:"1",label:"收入"},{value:"2",label:"支出"}],feeOptions:[{value:"",label:"全部"},{value:"1",label:"违约金"},{value:"2",label:"贷款"},{value:"3",label:"交易手续费"},{value:"4",label:"仓储费"},{value:"5",label:"运费"},{value:"6",label:"充值"},{value:"7",label:"提现"},{value:"8",label:"调货提成"},{value:"9",label:"发票递送费"},{value:"10",label:"折扣费用"}],optionsEdit:[{value:"1",label:"增加配额"},{value:"2",label:"减少配额"}],quotasType:"",quotasNumber:"",value:"",gridData:[]},r()(e,"distributorLevel",""),r()(e,"rowId",""),r()(e,"comfirmStatus",""),r()(e,"optionsEditSearch",[{value:"",label:"全部"},{value:"0",label:"待配售"},{value:"1",label:"已配售"},{value:"2",label:"减少配额待确认"},{value:"3",label:"增加配额待确认"},{value:"4",label:"尾款待结"},{value:"5",label:"已确认"},{value:"6",label:"已结束"}]),e}}),o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{staticStyle:{padding:"24px","padding-left":"0"},attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/myUserCenter/userHome"}}},[e._v("个人中心")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:""}}},[e._v("财务管理")]),e._v(" "),a("el-breadcrumb-item",[e._v("账单查询")])],1),e._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("订单编号")]),e._v(" "),a("el-input",{attrs:{clearable:""},model:{value:e.orderNum,callback:function(t){e.orderNum=t},expression:"orderNum"}})],1)]),e._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("提货单号")]),e._v(" "),a("el-input",{attrs:{clearable:""},model:{value:e.takeGoodsNum,callback:function(t){e.takeGoodsNum=t},expression:"takeGoodsNum"}})],1)]),e._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("资金方向")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.fundDirection,callback:function(t){e.fundDirection=t},expression:"fundDirection"}},e._l(e.fundOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)]),e._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("费用类型")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.feeType,callback:function(t){e.feeType=t},expression:"feeType"}},e._l(e.feeOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)])],1),e._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("结算时间")]),e._v(" "),a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",format:"yyyy 年 MM 月 dd 日","picker-options":e.pickerOptions2},model:{value:e.times,callback:function(t){e.times=t},expression:"times"}})],1)]),e._v(" "),a("el-col",{staticStyle:{"margin-left":"10px"},attrs:{span:10}},[a("el-button",{staticStyle:{"margin-top":"19px"},attrs:{icon:"el-icon-search",circle:""},on:{click:e.search}}),e._v(" "),a("el-button",{on:{click:function(t){e.orderNum=e.takeGoodsNum=e.fundDirection=e.feeType=e.times=""}}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{type:"success"},on:{click:e.getquotalist_getExcel}},[e._v("导出EXCEL")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"settleTime",label:"结算时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"orderNum",label:"订单编号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"takeGoodsNum",label:"提货单号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"feeType",label:"费用类型"}}),e._v(" "),a("el-table-column",{attrs:{prop:"fundDirection",label:"资金方向"}}),e._v(" "),a("el-table-column",{attrs:{prop:"szAmount",label:"收支金额"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.szAmount?t.row.szAmount:0)+" 元")])]}}])})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var s=a("vSla")(n,o,!1,function(e){a("mC6A")},null,null);t.default=s.exports}});