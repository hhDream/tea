webpackJsonp([34],{"5oeG":function(e,t){},ReO8:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("a3Yh"),r=a.n(l),o=(a("6iV/"),{inject:["reload"],methods:{search:function(){},getquotalist_getExcel:function(){},handleClick:function(){},handleSizeChange:function(){},handleCurrentChange:function(){}},data:function(){var e;return e={takeOrderNum:"",goodsName:"",value:"",times:"",releaseBeginTime:"",http:this.$store.state.dialog.http,enterpriseCode:this.$store.state.dialog.enterpriseCode,total:1,currentPage:1,showCount:10,total2:1,currentPage2:1,showCount2:10,dialogTableVisible:!1,innerVisible:!1,distributorId:"",distributorName:"",distributorLevel:"",activeName:"first",tableData:[{takeOrderNum:"201807031618141262057",goodsName:"商品1",takeNum:"100",unit:"盒",applicationTime:"2018-07-03 16:18:15",store:"张三的店",takePattern:"提货方式1",warehousingFee:"200.0元",courierFee:"200.0元",currentState:"已取消",action:"操作1"},{takeOrderNum:"201807031618141262058",goodsName:"商品2",takeNum:"200",unit:"千克",applicationTime:"2018-07-03 16:28:15",store:"李四的店",takePattern:"提货方式2",warehousingFee:"220.0元",courierFee:"220.0元",currentState:"已取消",action:"操作2"}],takeIt:!1,showIt:!1,options:[{value:"",label:"全部"},{value:"1",label:"代付费"},{value:"2",label:"已付款"},{value:"3",label:"出库中"},{value:"4",label:"已到店"},{value:"5",label:"已发货"},{value:"6",label:"待取货"},{value:"7",label:"已完成"},{value:"8",label:"已取消"}],optionsIn:[{value:"",label:"全部"},{value:"JXSLEVEL001",label:"一级"},{value:"JXSLEVEL002",label:"二级"},{value:"JXSLEVEL003",label:"三级"}],optionsEdit:[{value:"1",label:"增加配额"},{value:"2",label:"减少配额"}],quotasType:"",quotasNumber:""},r()(e,"value",""),r()(e,"gridData",[]),r()(e,"distributorLevel",""),r()(e,"rowId",""),r()(e,"comfirmStatus",""),r()(e,"pickerOptions2",""),r()(e,"optionsEditSearch",[{value:"",label:"全部"},{value:"0",label:"待配售"},{value:"1",label:"已配售"},{value:"2",label:"减少配额待确认"},{value:"3",label:"增加配额待确认"},{value:"4",label:"尾款待结"},{value:"5",label:"已确认"},{value:"6",label:"已结束"}]),e}}),n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{staticStyle:{padding:"24px","padding-left":"0"},attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/myUserCenter/userHome"}}},[e._v("个人中心")]),e._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:""}}},[e._v("提货管理")]),e._v(" "),a("el-breadcrumb-item",[e._v("提货明细")])],1),e._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("提货单号")]),e._v(" "),a("el-input",{attrs:{clearable:""},model:{value:e.takeOrderNum,callback:function(t){e.takeOrderNum=t},expression:"takeOrderNum"}})],1)]),e._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("商品名称")]),e._v(" "),a("el-input",{attrs:{clearable:""},model:{value:e.goodsName,callback:function(t){e.goodsName=t},expression:"goodsName"}})],1)]),e._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("当前状态")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)])],1),e._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[e._v("时间")]),e._v(" "),a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",format:"yyyy 年 MM 月 dd 日","picker-options":e.pickerOptions2},model:{value:e.times,callback:function(t){e.times=t},expression:"times"}})],1)]),e._v(" "),a("el-col",{staticStyle:{"margin-left":"10px"},attrs:{span:10}},[a("el-button",{staticStyle:{"margin-top":"19px"},attrs:{icon:"el-icon-search",circle:""},on:{click:e.search}}),e._v(" "),a("el-button",{on:{click:function(t){e.takeOrderNum=e.goodsName=e.value=e.times=""}}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{type:"success"},on:{click:e.getquotalist_getExcel}},[e._v("导出EXCEL")])],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"takeOrderNum",label:"提货单号",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"商品名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"takeNum",label:"提货数量"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.takeNum?t.row.takeNum:0)+" "+e._s(t.row.unit))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"applicationTime",label:"申请时间",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"store",label:"门店"}}),e._v(" "),a("el-table-column",{attrs:{prop:"takePattern",label:"提货方式"}}),e._v(" "),a("el-table-column",{attrs:{prop:"warehousingFee",label:"仓储费"}}),e._v(" "),a("el-table-column",{attrs:{prop:"courierFee",label:"快递费"}}),e._v(" "),a("el-table-column",{attrs:{prop:"currentState",label:"当前状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"action",label:"操作"}})],1),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var s=a("vSla")(o,n,!1,function(e){a("5oeG")},null,null);t.default=s.exports}});