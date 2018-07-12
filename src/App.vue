<template>
  <div id="app">
    <el-row style="background:#F8F8F8">
    <!-- <el-row style="background:#F8F8F8" v-if="top_sw"> -->
      <!-- <el-col :span="4">&nbsp;</el-col> -->

      <el-col style="min-width:1190px;margin:0 auto;float: none;" :span="16">
        <div class="head">
          <div class="clearfix box">
            <div class="fl" v-if="this.$store.state.dialog.cookie==true">
              <span>您好！</span>
              <span>{{phone}}</span>
              <a class="a3" href="javascript:;" @click="delCookie('JSESSIONID')">退出</a>
            </div>
            <div class="fl" v-else>
              <span>欢迎来到茶企通!</span>
              <a class="a3" href="javascript:;" @click="$router.openPage('/login');">登陆</a>
              <a class="a2" href="register:;" @click="$router.openPage('/register')">注册</a>
            </div>
            <div class="fr" v-if="this.$store.state.dialog.cookie==true">
              <a href="#" @click="$router.openPage('/myCenter/home')">个人中心</a>
              <a href="#" @click="$router.openPage('/myCenter/message')">我的消息</a>
            </div>
            <div class="fr" v-else>
              <a href="#" @click="$router.openPage('/')">首页</a>
            </div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="4">&nbsp;</el-col> -->

    </el-row>
    <el-row>
      <!-- <el-col :span="4">&nbsp;</el-col> -->
      <el-col style="min-width:1190px;margin:0 auto;float: none;"  :span="16">
        <div class="top-side">
          <div class="clearfix top-side-box">
            <div class="fl logo">
              <a class="img" @click="$router.openPage('/')"></a>
            </div>
            <div v-if="this.$store.state.dialog.toLogin==true" class="fl search-box">
              <div class="dropdown">
                <a id="dLabel" data-target="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  <span class="active">商品</span>
                </a>
              </div>
              <div class="input">
                <input type="text" placeholder="普洱茶" id="searchText">
              </div>
              <button type="button" onclick="doSearch()"></button>
            </div>
            <div class="fr phone-box" v-if="this.$store.state.dialog.toLogin==true">
              <p>24小时全国服务热线</p>
              <h4>4009286990</h4>
            </div>
            <div v-if="this.$store.state.dialog.toLogin==true" class="fl menu-box">
              <ul class="fl nav">
                <li :class="{active:this.$store.state.index.isShow==0}" ><a @click="$router.openPage('/');addClass(0)">首页</a></li>
                <li :class="{active:this.$store.state.index.isShow==1}"><a @click="$router.openPage('/teaMallShop');addClass(1)">品牌商城</a></li>
                <li :class="{active:this.$store.state.index.isShow==2}"><a @click="$router.openPage('/teaMallRush');addClass(2)">新茶抢购</a></li>
                <!-- <li :class="{active:this.$store.state.index.isShow==3}"><a @click="$router.openPage('/');addClass(3)">服务保障</a></li> -->
                <li :class="{active:this.$store.state.index.isShow==4}"><a @click="$router.openPage('/teaMallTeaExperts');addClass(4)">茶评专家</a></li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :span="4">&nbsp;</el-col> -->
    </el-row>
    <el-row>
      <el-col :span="24">
        <router-view
        v-loading.fullscreen.lock="this.$store.state.index.loading"
        v-if="isRouterAlive"></router-view>
      </el-col>
      <!-- <transition name="bounce" enter-active-class="fadeInDown" leave-active-class=""> -->
      <!-- </transition> -->
    </el-row>
    <el-row>
      <el-col style="min-width:1190px;margin:0 auto;float: none;" :span="24">
        <!-- <div class="grid-content bg-purple-dark"> -->
          <div class="foot" id="foot">
            <div class="clearfix box">
              <ul class="fl">
                <li class="l1">
                  <h5>网站指南</h5>
                  <a @click="$router.openPage('/zczn')">注册指南</a>
                  <a @click="$router.openPage('/yssm')">隐私说明</a>
                  <a @click="$router.openPage('/zcxy')">注册协议</a>
                  <a @click="$router.openPage('/qgsm')">抢购说明</a>
                  <a @click="$router.openPage('/fpbz')">发票帮助</a>
                </li>
                <li class="l3">
                  <h5>支付与仓储</h5>
                  <a @click="$router.openPage('/zffwxy')">支付服务协议</a>
                  <a @click="$router.openPage('/ccfwxy')">仓储服务协议</a>
                </li>
                <li class="L4">
                  <h5>关于我们</h5>
                  <a @click="$router.openPage('/gsyyzz')">工商营业执照</a>
                  <a @click="$router.openPage('/cqtptjj')">平台简介</a>
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
          <!-- </div> -->
        </div>
      </el-col>
    </el-row>
<!-- <div class="scrollTop" @click="toTop">
</div> -->
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },            
    props: {
                toBottom: {
                    type: Number,
                    default: 0
                }
            },
    data() {
      return {
        transitionName: 'slide-fade',
        isCollapse: false,
        phone: this.$store.state.dialog.phone,
        isRouterAlive: true,
        isShow:0
      }
    },
    methods: {                
      toTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
                },
      addClass(i){
        this.$store.commit('changeIsShow',i)
      },
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
    mounted() {
        // document.querySelector('.scrollTop').style.bottom = this.toBottom;
    },
    created() {
      // console.log('kkkkk'+this.toLogin);
    }
  }
</script>

<style lang="less">
  @import "./assets/teamall.css";
  @import "./assets/styleIndex.css";
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  #app{
    transition: all 1s linear
  }
 .scrollTop{
   width: 75px;
   height: 75px;
   position: fixed;
 }
  a:hover {
    text-decoration: none;
  }
  .block {
    margin: 10px 0!important;
    text-align: right;
  }
  .content {
    margin: 0 auto;
    width: 100%;
    color: #646464;
    font-size: 13px;
    line-height: 30px;
    padding: 20px 0;
    // margin-left: 320px;
        min-height: 498px;
        img{
          width: 100%;
        }

  }
  .font_bold {
    font-weight: bold;
  }
  .wrap {
    background-color: #fff
  }
  .search-box button {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 100%;
    padding: 0;
    border: 0 none;
    background: #db4b29 url('./assets/search.png') no-repeat center center;
  }
  
    a:visited { 
    text-decoration: none; 
    }
</style>
