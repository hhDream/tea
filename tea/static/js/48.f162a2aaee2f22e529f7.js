webpackJsonp([48],{"2JvS":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("a3Yh"),l=a.n(n),r=a("6iV/"),o=a.n(r),s={inject:["reload"],methods:{getData:function(){var t=this;this.axios.post(this.http+"/interface/pc/personal/pcAllotment/pcAllotmentList",o.a.stringify({releaseEnterpriseId:this.enterpriseCode,currentPage:this.currentPage,showCount:this.showCount,goodsName:this.goodsName,releaseBeginTime:this.releaseBeginTime,releaseStatus:this.value})).then(function(e){console.log(JSON.parse(e.data.data).data),t.tableData=JSON.parse(e.data.data).data,t.total=JSON.parse(e.data.data).total,t.currentPage=JSON.parse(e.data.data).currentPage}).catch(function(e){t.open(e)})},open:function(t){var e=this;this.$alert("网络错误请求失败!","错误",{confirmButtonText:"确定",callback:function(a){e.$message({type:"info",message:"错误原因: "+t})}})},rationCountFmt:function(t,e){return t.rationCount=t.rationCount+t.benchmarkingUnit3},distributorLevelFmt:function(t,e){return"JXSLEVEL001"==t.distributorLevel?"一级":"JXSLEVEL002"==t.distributorLevel?"二级":"三级"},comfirmStatusFmt:function(t,e){return 1==t.comfirmStatus?"已配售":2==t.comfirmStatus?"减少配额待确认":3==t.comfirmStatus?"增加配额待确认":4==t.comfirmStatus?"待支付尾款":5==t.comfirmStatus?"已确认":6==t.comfirmStatus?"已完成":0==t.comfirmStatus?"待配售":""},rushBuyTypeFmt:function(t,e){return 1==t.rushBuyType?"被动配售":"主动订货"},releaseTypeFmt:function(t,e){return 1==t.releaseType?"封闭":"公开"},releaseStatusFmt:function(t,e){return 1==t.releaseStatus?"待配售":2==t.releaseStatus?"已配售":5==t.releaseStatus?"已发行":6==t.releaseStatus?"待结算":7==t.releaseStatus?"已结束":""},getInData:function(t){var e=this;this.axios.post(this.http+"/interface/pc/personal/pcAllotment/distributorrationInfo",o.a.stringify({allotmentId:t.releaseCode,currentPage:this.currentPage2,showCount:this.showCount2})).then(function(t){console.log("元数据",t.data,JSON.parse(t.data.data)),e.gridData=JSON.parse(t.data.data).pd,e.total2=JSON.parse(t.data.data).total})},getquotalistin_getExcel:function(){location.href="https://ent.teaexs.com/platform/interface/pc/personal/pcAllotment/distributorrationExprot?allotmentId="+this.row.releaseCode},inDataSearch:function(){var t=this;this.axios.post(this.http+"/interface/pc/personal/pcAllotment/distributorrationInfo",o.a.stringify({allotmentId:this.allotmentId,distributorId:this.distributorId,distributorName:this.distributorName,distributorLevel:this.distributorLevel,comfirmStatus:this.comfirmStatus,currentPage:this.currentPage2,showCount:this.showCount2})).then(function(e){console.log("内部",JSON.parse(e.data.data)),t.gridData=JSON.parse(e.data.data).pd})},editData:function(){var t=this;if(this.$message("正在修改,请稍等..."),""==this.quotasNumber&&this.quotasNumber<0)return this.$message("请填写大于零且不为空的值"),!1;this.axios.post(this.http+"/interface/pc/personal/pcDistributor/editDistributorrationCount",o.a.stringify({distributorrationId:this.rowId,quotasType:this.quotasType,quotasNumber:this.quotasNumber})).then(function(e){console.log(e),200==e.data.code&&t.$alert("修改成功!","成功",{confirmButtonText:"确定",callback:function(e){t.reload,t.$message({type:"info",message:"修改成功,数据将会更新!"}),t.innerVisible=!1,t.dialogTableVisible=!1}})})},inpChange:function(){1==this.quotasType?(this.newNumber=+this.e.rationCount+ +this.quotasNumber,this.newNumber<0&&(this.newNumber=0)):2==this.quotasType?(this.newNumber=+this.e.rationCount-+this.quotasNumber,this.newNumber<0&&(this.newNumber=0)):this.$message("请选择类型")},editClick:function(t){console.log(t.id),this.rowId=t.id,this.e=t},handleClick:function(t){console.log("数据行",t),this.dialogTableVisible=!0,console.log(this.dialogTableVisible),"5"!=t.releaseStatus&&"6"!=t.releaseStatus&&"7"!=t.releaseStatus&&"1"!=t.releaseStatus&&(this.takeIt=!0),1!=t.rushBuyType&&(this.showIt=!0),this.allotmentId=t.releaseCode,this.row=t,this.getInData(t)},handleSizeChange:function(t){console.log(t),this.showCount=t,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},handleSizeChange2:function(t){console.log(t),this.showCount2=t,this.getInData(this.row)},handleCurrentChange2:function(t){this.currentPage2=t,this.getInData(this.row)},search:function(){this.getData()},getquotalist_getExcel:function(){location.href=this.http+"/interface/pc/personal/pcAllotment/allotmentExprot?releaseEnterpriseId="+this.enterpriseCode},getSummaries:function(t){var e=t.columns,a=t.data,n=[];return e.forEach(function(t,e){if(0!==e)if(3!==e&&4!==e&&6!==e){var l=a.map(function(e){return Number(e[t.property])});l.every(function(t){return isNaN(t)})?n[e]="":(n[e]=l.reduce(function(t,e){var a=Number(e);return isNaN(a)?t:t+e},0),n[e]+="")}else n[e]="";else n[e]="合计"}),n}},created:function(){this.getData()},data:function(){var t;return t={goodsName:"",releaseBeginTime:"",http:this.$store.state.dialog.http,enterpriseCode:this.$store.state.dialog.enterpriseCode,total:1,currentPage:1,showCount:10,total2:1,currentPage2:1,showCount2:10,dialogTableVisible:!1,innerVisible:!1,distributorId:"",distributorName:"",distributorLevel:"",tableData:[],takeIt:!1,showIt:!1,newNumber:"",e:"",options:[{value:"",label:"全部"},{value:"1",label:"待配售"},{value:"2",label:"已配售"},{value:"5",label:"已发行"},{value:"6",label:"待结算"},{value:"7",label:"已结束"}],optionsIn:[{value:"",label:"全部"},{value:"JXSLEVEL001",label:"一级"},{value:"JXSLEVEL002",label:"二级"},{value:"JXSLEVEL003",label:"三级"}],optionsEdit:[{value:"1",label:"增加配额"},{value:"2",label:"减少配额"}],quotasType:"",quotasNumber:"",value:"",gridData:[]},l()(t,"distributorLevel",""),l()(t,"rowId",""),l()(t,"comfirmStatus",""),l()(t,"optionsEditSearch",[{value:"",label:"全部"},{value:"0",label:"待配售"},{value:"1",label:"已配售"},{value:"2",label:"减少配额待确认"},{value:"3",label:"增加配额待确认"},{value:"4",label:"尾款待结"},{value:"5",label:"已确认"},{value:"6",label:"已结束"}]),t}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-breadcrumb",{staticStyle:{padding:"24px","padding-left":"0"},attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/myCenter/home"}}},[t._v("个人中心")]),t._v(" "),a("el-breadcrumb-item",[t._v("我的抢购")])],1),t._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("商品名")]),t._v(" "),a("el-input",{attrs:{clearable:""},model:{value:t.goodsName,callback:function(e){t.goodsName=e},expression:"goodsName"}})],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("开始日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",format:"yyyy 年 MM 月 dd 日","value-format":"yyyy-MM-dd"},model:{value:t.releaseBeginTime,callback:function(e){t.releaseBeginTime=e},expression:"releaseBeginTime"}})],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("活动状态")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{staticStyle:{"margin-top":"19px"},attrs:{icon:"el-icon-search",circle:""},on:{click:t.search}}),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:t.getquotalist_getExcel}},[t._v("导出EXCEL")])],1)])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{sortable:"",fixed:"",prop:"id",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"releaseCode",label:"活动编码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"releaseType",formatter:t.releaseTypeFmt,label:"活动类型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"商品名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"goodsCode",label:"商品代码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"warehousingCount",label:"库存总量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.warehousingCount?e.row.warehousingCount:0)+" "+t._s(e.row.benchmarkingUnit33))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"releaseCount",label:"配订货总量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.releaseCount?e.row.releaseCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"shlfRetentionCount",label:"自留总量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.shlfRetentionCount?e.row.shlfRetentionCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"partakeAllomentCount",label:"抢购总量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.partakeAllomentCount?e.row.partakeAllomentCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"releasePrice",label:"抢购价格"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.releasePrice?e.row.releasePrice:0)+" 元")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"rushBuyType",formatter:t.rushBuyTypeFmt,label:"配售规则"}}),t._v(" "),a("el-table-column",{attrs:{prop:"transferCount",label:"已售数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.transferCount?e.row.transferCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"releaseBeginTime",label:"活动开始时间",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"releaseEndTime",label:"活动结束时间",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"releaseStatus",formatter:t.releaseStatusFmt,label:"确认状态"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.row)}}},[t._v("查看")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"活动管理",width:"80%",visible:t.dialogTableVisible},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("经销商编号:")]),t._v(" "),a("el-input",{attrs:{clearable:""},model:{value:t.distributorId,callback:function(e){t.distributorId=e},expression:"distributorId"}})],1)])]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("经销商名称:")]),t._v(" "),a("el-input",{attrs:{clearable:""},model:{value:t.distributorName,callback:function(e){t.distributorName=e},expression:"distributorName"}})],1)])]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("经销商等级:")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.distributorLevel,callback:function(e){t.distributorLevel=e},expression:"distributorLevel"}},t._l(t.optionsIn,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("确认状态:")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.comfirmStatus,callback:function(e){t.comfirmStatus=e},expression:"comfirmStatus"}},t._l(t.optionsEditSearch,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)])],1),t._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{staticStyle:{"margin-top":"19px"},attrs:{icon:"el-icon-search",circle:""},on:{click:t.inDataSearch}}),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:t.getquotalistin_getExcel}},[t._v("导出")])],1)])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%","margin-top":"20px"},attrs:{"show-summary":"","summary-method":t.getSummaries,data:t.gridData,border:""}},[a("el-table-column",{attrs:{fixed:"",align:"center",prop:"distributorId",label:"经销商编号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"distributorName",label:"经销商名称"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"distributorLevel",formatter:t.distributorLevelFmt,label:"经销商等级"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"distributorLevelRank",label:"信用系数"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"distributorSettlementPrice",label:"结算价"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.distributorSettlementPrice?e.row.distributorSettlementPrice:0)+" 元")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"goodsName",label:"商品名称"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"comfirmStatus",formatter:t.comfirmStatusFmt,label:"确认状态"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"bondAmount",label:"已支付定金"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.bondAmount?e.row.bondAmount:0)+" 元")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"rationCount",label:"订货总量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.rationCount?e.row.rationCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"jcCount",label:"基础订货数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.jcCount?e.row.jcCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),t.showIt?a("el-table-column",{attrs:{align:"center",prop:"fdCount",label:"浮动订货数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.fdCount?e.row.fdCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}):t._e(),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"shlfRetentionCount",label:"自留数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.shlfRetentionCount?e.row.shlfRetentionCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"partakeAllomentCount",label:"抢购数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.partakeAllomentCount?e.row.partakeAllomentCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"soldCount",label:"已售数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.soldCount?e.row.soldCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"customerCount",label:"购买商品的客户数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.customerCount?e.row.customerCount:0)+" ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"inCount",label:"被调货数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.inCount?e.row.inCount:0)+" "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"outCount",label:"调货数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.outCount?e.row.outCount:0)+"  "+t._s(e.row.benchmarkingUnit3))])]}}])}),t._v(" "),t.takeIt?a("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[5==e.row.comfirmStatus&&2==e.row.releaseStatus?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.innerVisible=!0,t.editClick(e.row)}}},[t._v("\n          修改")]):t._e()]}}])}):t._e()],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage2,"page-sizes":[10,20,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total2},on:{"size-change":t.handleSizeChange2,"current-change":t.handleCurrentChange2}})],1),t._v(" "),a("el-dialog",{attrs:{width:"30%",title:"修改配额",visible:t.innerVisible,"append-to-body":""},on:{"update:visible":function(e){t.innerVisible=e}}},[a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:5}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("修改类型:")])])]),t._v(" "),a("el-col",{attrs:{span:15}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.quotasType,callback:function(e){t.quotasType=e},expression:"quotasType"}},t._l(t.optionsEdit,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)])],1),t._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:5}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("修改数量:")])])]),t._v(" "),a("el-col",{attrs:{span:15}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-input",{attrs:{type:"number",width:"60",clearable:""},on:{input:t.inpChange},model:{value:t.quotasNumber,callback:function(e){t.quotasNumber=e},expression:"quotasNumber"}})],1)])],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:10}},[t._v("修改后总量为:     "+t._s(t.newNumber))])],1),t._v(" "),a("el-row",{staticStyle:{"text-align":"right"},attrs:{gutter:20}},[a("el-col",{attrs:{span:20}},[a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.editData()}}},[t._v("提交")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var u=a("vSla")(s,i,!1,function(t){a("Vdr9")},null,null);e.default=u.exports},Vdr9:function(t,e){}});