webpackJsonp([60],{GXQA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("6iV/"),s=a.n(i),n={data:function(){return{total:1,currentPage:1,http:this.$store.state.dialog.http,pageSize:5,noticeList:[{title:"正在加载"}]}},methods:{handleSizeChange:function(t){this.pageSize=t,this.getNewsList()},handleCurrentChange:function(t){this.currentPage=t,this.getNewsList()},getNewsList:function(){var t=this;this.axios.post(this.http+"/interface/pc/bulltin/list",s.a.stringify({currentPage:this.currentPage,bulletinType:3,pageSize:this.pageSize})).then(function(e){console.log(e.data),t.noticeList=JSON.parse(e.data.data).bulltinList,t.total=JSON.parse(e.data.data).total})}},created:function(){this.getNewsList()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wire"},[a("el-row",[a("el-col",{staticStyle:{"min-width":"1190px",margin:"20px auto",float:"none"},attrs:{span:16}},[a("div",{staticClass:"cent"},[a("div",{staticClass:"wire_tx"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",[t._v("新闻中心")])],1),t._v(" "),a("div",{staticClass:"article-list",attrs:{id:"aaa"}},t._l(t.noticeList,function(e,i){return a("dl",{key:i},[a("dt",[a("em",[a("img",{staticClass:"left_imgz",attrs:{src:e.cover,width:"206px",height:"126px"}})])]),t._v(" "),a("dd",[a("span",{staticStyle:{"word-break":"break-all"}},[a("a",{on:{click:function(a){t.$router.openPage("/teaMallNew",{id:e.id})}}},[t._v(t._s(e.title))]),t._v(" "),a("em",[t._v("2018-03-07 09:35:03")])]),t._v(" "),a("p",{staticStyle:{"word-break":"break-all"}},[t._v(" "+t._s(e.abstractContent))])])])})),t._v(" "),a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":t.currentPage,"page-sizes":[5,10,15,20],"page-size":t.pageSize,total:t.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),a("div",{staticClass:"fenye"},[a("div",{staticClass:"page"},[a("div",{staticClass:"page-css",attrs:{id:"Pagination"}})])])],1)])])],1)],1)},staticRenderFns:[]};var l=a("vSla")(n,r,!1,function(t){a("QemP")},"data-v-35463d85",null);e.default=l.exports},QemP:function(t,e){}});