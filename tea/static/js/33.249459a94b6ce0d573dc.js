webpackJsonp([33],{"4FT7":function(t,e){},l5mx:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("a3Yh"),i=a.n(l),r=a("6iV/"),o=a.n(r),s={methods:{getData:function(){var t,e=this;this.axios.post(this.http+"/interface/pc/personal/pcDistributor/distributoerList",o.a.stringify((t={currentPage:this.currentPage,enterpriseCode:this.enterpriseCode,showCount:this.showCount,legalPersonName:this.legalPersonName,distributorName:this.distributorName,postalAddress:this.postalAddress},i()(t,"distributorName",this.distributorName),i()(t,"distributorCode",this.distributorCode),t))).then(function(t){console.log(JSON.parse(t.data.data)),e.tableData=JSON.parse(t.data.data).data,e.total=JSON.parse(t.data.data).total,e.currentPage=JSON.parse(t.data.data).currentPage})},handleClick:function(t){console.log(t)},handleSizeChange:function(t){console.log(t),this.showCount=t,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()},search:function(){this.getData()},statusFmt:function(t,e){return 1==t.status?"已激活":"未激活"},distributor_getExcel:function(){this.axios.post(this.http+"/interface/pc/personal/pcDistributor/templateDown",o.a.stringify({templateName:"distributor"})).then(function(t){location.href=JSON.parse(t.data.data)})},distributorRelation_getExcel:function(){this.axios.post(this.http+"/interface/pc/personal/pcDistributor/templateDown",o.a.stringify({templateName:"distributorRelation"})).then(function(t){location.href=JSON.parse(t.data.data)})},handleRemove:function(t,e){console.log(t,e)},handlePreview:function(t){console.log(t)},handleExceed:function(t,e){this.$message.warning("当前限制选择 3 个文件，本次选择了 "+t.length+" 个文件，共选择了 "+(t.length+e.length)+" 个文件")},beforeRemove:function(t,e){return this.$confirm("确定移除 "+t.name+"？")},beforeAvatarUpload:function(t,e){"application/vnd.ms-excel"===t.type||this.$message.error("上传文件只能是 xls 格式!")},errorMsg:function(t,e,a){console.log(t)}},created:function(){this.getData()},data:function(){var t;return t={tableData:[],http:this.$store.state.dialog.http,enterpriseCode:this.$store.state.dialog.enterpriseCode,currentPage:1,showCount:10,legalPersonName:"",distributorName:"",distributorCode:"",postalAddress:"",total:1},i()(t,"currentPage",1),i()(t,"fileList",[]),i()(t,"dialogVisible",!1),i()(t,"dialogVisible2",!1),i()(t,"filename","filename"),i()(t,"filenameRelation","filenameRelation"),i()(t,"moreData",{enterpriseCode:this.$store.state.dialog.enterpriseCode}),t}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-breadcrumb",{staticStyle:{padding:"24px","padding-left":"0"},attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/myCenter/home"}}},[t._v("个人中心")]),t._v(" "),a("el-breadcrumb-item",[t._v("经销商管理")])],1),t._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("经销商编号")]),t._v(" "),a("el-input",{attrs:{clearable:""},model:{value:t.distributorCode,callback:function(e){t.distributorCode=e},expression:"distributorCode"}})],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("经销商名称")]),t._v(" "),a("el-input",{attrs:{clearable:""},model:{value:t.distributorName,callback:function(e){t.distributorName=e},expression:"distributorName"}})],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("法人名称")]),t._v(" "),a("el-input",{attrs:{clearable:""},model:{value:t.legalPersonName,callback:function(e){t.legalPersonName=e},expression:"legalPersonName"}})],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("span",{staticClass:"demonstration"},[t._v("公司地址")]),t._v(" "),a("el-input",{attrs:{clearable:""},model:{value:t.postalAddress,callback:function(e){t.postalAddress=e},expression:"postalAddress"}})],1)])],1),t._v(" "),a("el-row",{staticStyle:{"margin-bottom":"20px"}},[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{attrs:{icon:"el-icon-search",circle:""},on:{click:t.search}}),t._v(" "),a("el-button",{on:{click:function(e){t.distributorCode=t.distributorName=t.legalPersonName=t.postalAddress=""}}},[t._v("重置")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:t.distributor_getExcel}},[t._v("经销商模板下载")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:t.distributorRelation_getExcel}},[t._v("经销商关系模板下载")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:function(e){t.dialogVisible=!0}}},[t._v("经销商导入")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:function(e){t.dialogVisible2=!0}}},[t._v("经销商关系导入")])],1)])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"distributorCode",label:"经销商编号",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"distributorName",label:"经销商名称",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"legalPersonName",label:"法人",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"legalPersonIdentityCard",label:"法人身份证",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"是否对公账户",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v("是")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"phoneNumber",label:"联系电话",width:"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"postalAddress",label:"公司地址",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"province",label:"省份"}}),t._v(" "),a("el-table-column",{attrs:{prop:"city",label:"城市"}}),t._v(" "),a("el-table-column",{attrs:{prop:"region",label:"地区"}}),t._v(" "),a("el-table-column",{attrs:{prop:"superiorDealerCode",label:"上级经销商编号",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"superiorDealerName",label:"上级经销商",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"unifiedSocialCreditCode",label:"统一社会信用代码",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"businessLicense",label:"营业执照",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"taxRegistrationCertificate",label:"税务登记证",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"organizationCode",label:"组织机构码",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",formatter:t.statusFmt,label:"审核状态"}})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:"经销商导入",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-upload",{attrs:{action:"https://ent.teaexs.com/platform/interface/pc/personal/pcDistributor/importDistributor","on-preview":t.handlePreview,"on-remove":t.handleRemove,"before-remove":t.beforeRemove,limit:1,name:t.filename,"on-exceed":t.handleExceed,"on-error":t.errorMsg,"file-list":t.fileList,data:t.moreData,"before-upload":t.beforeAvatarUpload}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("经销商导入")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传xls文件")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"经销商关系导入",visible:t.dialogVisible2,width:"30%"},on:{"update:visible":function(e){t.dialogVisible2=e}}},[a("el-upload",{attrs:{action:"https://ent.teaexs.com/platform/interface/pc/personal/pcDistributor/importDistributorRelation","on-preview":t.handlePreview,"on-remove":t.handleRemove,"before-remove":t.beforeRemove,limit:1,name:t.filenameRelation,"on-exceed":t.handleExceed,"on-error":t.errorMsg,"file-list":t.fileList,"before-upload":t.beforeAvatarUpload}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("经销商关系导入")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传xls文件")])],1)],1)],1)},staticRenderFns:[]};var c=a("vSla")(s,n,!1,function(t){a("4FT7")},null,null);e.default=c.exports}});