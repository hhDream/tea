webpackJsonp([43],{Z9Lh:function(e,t){},wllR:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("6iV/"),s=r.n(a),o={data:function(){var e=this;return{name:"某某",number:"738818146221",IDCard:"1404**********6773",type:"个人用户",nickname:"",sex:"0",birth:"",phone:"130****9890",email:"",dealer:"江苏南京小行路小型店",storeAddress:"江苏省 南京市 雨花台区 小行路58号和润精品茶城",http:this.$store.state.dialog.http,imgCodeUrl:"",ruleForm2:{pass:"",checkPass:"",imageCode:"",phoneCode:""},rules2:{pass:[{validator:function(t,r,a){""===r||r.length<8?a(new Error("请输入8位以上密码")):(""!==e.ruleForm2.checkPass&&e.ruleForm2.checkPass.length>=8&&e.$refs.ruleForm2.validateField("checkPass"),a())},trigger:"blur"}],checkPass:[{validator:function(t,r,a){""===r?a(new Error("请再次输入密码")):r!==e.ruleForm2.pass?a(new Error("两次输入密码不一致!")):a()},trigger:"blur"}],imageCode:[{validator:function(e,t,r){""===t?r(new Error("不能为空")):r()},trigger:"blur"}],phoneCode:[{validator:function(t,r,a){if(""===r)return a(new Error("不能为空")),!1;e.validateCode(function(e){if(0==e)return a(new Error("图形验证码或手机验证码错误")),!1;a()})},trigger:"blur"}]}}},mounted:function(){this.changeCode()},methods:{sendMsg:function(){var e=this;e.isDisabled=!0;var t=window.setInterval(function(){e.buttonName=e.time+"秒后重新发送",--e.time,e.time<0&&(e.buttonName="重新发送",e.time=10,e.isDisabled=!1,window.clearInterval(t))},1e3)},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log(e),t.$message("请按照提示修改字段"),!1;t.editPassWord(),t.$message("修改中")})},resetForm:function(e){this.$refs[e].resetFields()},changeCode:function(){this.imgCodeUrl=this.http+"/code.do?t="+(new Date).getTime()},getPhoneCode:function(){this.sendMsg(),this.axios.post(this.http+"/interface/pc/personal/pcEnterprise/sendCode",s.a.stringify({phone:this.phone})).then(function(e){console.log(e)})},editPassWord:function(){var e=this;this.axios.post(this.http+"/interface/pc/personal/pcEnterprise/editPassword",s.a.stringify({loginPhone:this.phone,loginPassword:this.ruleForm2.pass})).then(function(t){200==t.data.code?(e.clearCookie(),e.$message({type:"success",message:"即将跳回登陆页!"}),location.reload()):e.$message({type:"info",message:"修改失败!"}),console.log(t)})},clearCookie:function(){this.setCookie("JSESSIONID","",-1),this.setCookie("ENTER_ID","",-1),this.setCookie("LOGIN_PHONE","",-1)},setCookie:function(e,t,r){var a=new Date;a.setDate(a.getDate()+r),document.cookie=e+"="+escape(t)+(null==r?"":";expires="+a.toGMTString())},validateCode:function(e){this.axios.post(this.http+"/interface/pc/personal/pcEnterprise/validateCode",s.a.stringify({phone:this.phone,pictureCode:this.ruleForm2.imageCode,code:this.ruleForm2.phoneCode})).then(function(t){200==t.data.code?(console.log(t.data),e(!0)):e(!1)})},tips:function(){var e=this;this.$confirm("此操作将修改您的密码, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.validateCode()}).catch(function(){e.$message({type:"info",message:"已取消修改"})})}}},n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box"},[r("el-breadcrumb",{staticStyle:{padding:"24px"},attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/myUserCenter/userHome"}}},[e._v("个人中心")]),e._v(" "),r("el-breadcrumb-item",{attrs:{to:{path:""}}},[e._v("我的账号")]),e._v(" "),r("el-breadcrumb-item",[e._v("个人信息")])],1),e._v(" "),r("el-form",{ref:"ruleForm2",staticStyle:{"background-color":"#F6F6F6","padding-bottom":"10px"},attrs:{model:e.ruleForm2,"status-icon":"",rules:e.rules2,"label-width":"140px"}},[r("span",{staticClass:"title"},[e._v("个人信息")]),e._v(" "),r("el-form-item",{attrs:{label:"会员名称：",prop:"name"}},[r("el-col",{attrs:{span:11}},[r("span",[e._v(e._s(e.name))])])],1),e._v(" "),r("el-form-item",{attrs:{label:"会员编号：",prop:"number"}},[r("el-col",{attrs:{span:11}},[r("span",[e._v(e._s(e.number))])])],1),e._v(" "),r("el-form-item",{attrs:{label:"身份证号：",prop:"IDCard"}},[r("el-col",{attrs:{span:11}},[r("span",[e._v(e._s(e.IDCard))])])],1),e._v(" "),r("el-form-item",{attrs:{label:"会员类型：",prop:"type"}},[r("el-col",{attrs:{span:11}},[r("span",[e._v(e._s(e.type))])])],1),e._v(" "),r("el-form-item",{attrs:{label:"昵称：",prop:"nickname"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{clearable:""},model:{value:e.ruleForm2.nickname,callback:function(t){e.$set(e.ruleForm2,"nickname",t)},expression:"ruleForm2.nickname"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"性别：",prop:"sex"}},[r("el-radio-group",{model:{value:e.sex,callback:function(t){e.sex=t},expression:"sex"}},[r("el-radio",{attrs:{label:"1",name:"sex"}},[e._v("男")]),e._v(" "),r("el-radio",{attrs:{label:"2",name:"sex"}},[e._v("女")]),e._v(" "),r("el-radio",{attrs:{label:"0",name:"sex"}},[e._v("保密")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"生日：",prop:"birth"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{clearable:""},model:{value:e.birth,callback:function(t){e.birth=t},expression:"birth"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号码：",prop:"phone"}},[r("el-col",{attrs:{span:3}},[r("span",[e._v(e._s(e.phone))])]),e._v(" "),r("span",{staticStyle:{color:"#409EFF"}},[e._v("修改")])],1),e._v(" "),r("el-form-item",{attrs:{label:"常用邮箱：",prop:"email"}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{clearable:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"所属经销商：",prop:"dealer"}},[r("el-col",{attrs:{span:11}},[r("span",[e._v(e._s(e.dealer))])])],1),e._v(" "),r("el-form-item",{attrs:{label:"门店地址：",prop:"storeAddress"}},[r("el-col",{attrs:{span:11}},[r("span",[e._v(e._s(e.storeAddress))])])],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm2")}}},[e._v("保存信息")])],1)],1)],1)},staticRenderFns:[]};var i=r("vSla")(o,n,!1,function(e){r("Z9Lh")},"data-v-69a9f8b6",null);t.default=i.exports}});