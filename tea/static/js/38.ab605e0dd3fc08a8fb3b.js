webpackJsonp([38],{HLu4:function(t,e){},Y11W:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("6iV/"),n=a.n(i),s={data:function(){return{id:this.$route.query.id,size:12,newdata:{},http:this.$store.state.dialog.http}},methods:{getList:function(){var t=this;this.axios.post(this.http+"/interface/pc/bulltin/findInformationBulletin",n.a.stringify({id:this.id})).then(function(e){console.log(JSON.parse(e.data.data)),t.newdata=JSON.parse(e.data.data)})}},created:function(){this.getList()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-col",{staticStyle:{"min-width":"1190px",margin:"0 auto",float:"none"},attrs:{span:16}},[a("div",{staticClass:"article-cont"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/teaMallNews"}}},[t._v("新闻中心")]),t._v(" "),a("el-breadcrumb-item",[t._v("新闻详情")])],1),t._v(" "),a("div",{staticClass:"wz_text"},[a("h1",{staticStyle:{"word-break":"break-all"},attrs:{id:"notice_title"}},[t._v(t._s(t.newdata.title))]),t._v(" "),a("div",{staticClass:"fontsize",attrs:{id:"notice_publishTime"}},[t._v("2018-03-07 10:00:01   字体： "),a("a",{on:{click:function(e){t.size=20}}},[t._v("大")]),t._v(" | "),a("a",{on:{click:function(e){t.size=16}}},[t._v("中")]),t._v(" | "),a("a",{on:{click:function(e){t.size=12}}},[t._v("小")]),t._v("    茶企通官方平台")]),t._v(" "),a("div",{style:{wordBreak:"break-all",fontSize:t.size+"px"},attrs:{id:"text"},domProps:{innerHTML:t._s(t.newdata.mainBody)}},[t._v("\n                        正在加载\n                    ")])])],1)])],1)],1)},staticRenderFns:[]};var o=a("vSla")(s,r,!1,function(t){a("HLu4")},"data-v-78053400",null);e.default=o.exports}});