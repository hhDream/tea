<template>
  <div id="app">
    <el-row>
      <el-col v-if="top_sw" :span="24">
        <div class="head">
          <div class="clearfix box">
            <div class="fl"><span>您好！</span><span>{{phone}}</span><a class="a3" href="javascript:;"  @click="delCookie('JSESSIONID')">退出</a></div>
            <div class="fr">
              <a href="#" @click="$router.openPage('/myCenter/message')">我的消息</a>
              <!--<a>网站导航</a>-->
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="top-side">
          <div class="clearfix top-side-box">
            <div class="fl logo">
              <a class="img" href="#"></a>
            </div>
            <!-- <ul class="fl nav">
                      <li><a href="#">首页</a></li>
                      <li><a href="#">品牌商城</a></li>
                      <li><a href="#">新茶抢购</a></li>
                  </ul> -->
            <div class="fr phone-box">
              <p>24小时全国服务热线</p>
              <h4>4009286990</h4>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>

      <!-- <transition name="bounce" enter-active-class="fadeInDown" leave-active-class=""> -->
        <router-view v-if="isRouterAlive"></router-view>
      <!-- </transition> -->
      </el-row>
<el-row>
  <el-col :span="24">
    <div class="grid-content bg-purple-dark">
            <div class="foot" id="foot">
            <div class="clearfix box">
                <ul class="fl">
                    <li class="l1">
                        <h5>网站指南</h5>
                        <a href="#">注册指南</a>
                        <a href="#">隐私说明</a>
                        <a href="#">注册协议</a>
                        <a href="#">抢购说明</a>
                        <a href="#">发票帮助</a>
                    </li>
                    <li class="l3">
                        <h5>支付与仓储</h5>
                        <a href="#">支付服务协议</a>
                        <a href="#">仓储服务协议</a>
                    </li>
                    <li class="L4">
                        <h5>关于我们</h5>
                        <a href="#">工商营业执照</a>
                        <a href="#">平台简介</a>
                    </li>
                </ul>
                <div class="fr phone-box">
                    <p>24小时全国服务热线</p>
                    <h4>4009286990</h4>
                </div>
                <div class="fl copyright">
                    <p>西双版纳璟泰茶业有限公司 版权所有<br>网站备案/许可证号：滇ICP备17005249号-1</p>
                </div>
            </div>
        </div>
    </div>
    </el-col>
</el-row>
  </div>
</template>

<script>
  // import axios from 'axios'
  export default {

    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        transitionName: 'slide-fade',
        isCollapse: false,
        phone: this.$store.state.dialog.phone,
        isRouterAlive: true,
        top_sw:this.$store.state.dialog.cookie,
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //删除cookie
      delCookie(name) {
          var exp = new Date();
          exp.setTime(exp.getTime() - 1);
          var cval = this.getCookie(name);
          if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
          this.$router.openPage('/login')
          location.reload()
      },
      //读取cookie，需要注意的是cookie是不能存中文的，如果需要存中文，解决方法是后端先进行编码encode()，前端取出来之后用decodeURI('string')解码。（安卓可以取中文cookie，IOS不行）
      getCookie(name) {
          var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
          if (arr = document.cookie.match(reg)) {
              return true;
              // return (arr[2]);
          } else {
              return false
          }
      },
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    },
    created(){
    }
  }
</script>

<style lang="less">
  @import "./assets/teamall.css";
  @import "./assets/bootstrap.css";
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  a:hover {
    text-decoration: none;
  }
  .block{
  margin:10px 0!important;
  text-align: right;
}
</style>
