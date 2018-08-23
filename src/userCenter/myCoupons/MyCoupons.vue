<template>
    <div>
    <el-breadcrumb style='padding:24px 0' separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>我的优惠券</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">我的优惠券</div>
    <el-row v-if="couponList.length==0" style='padding:24px;background:#efefef;width:100%;height:400px;position:relative'>
      <el-col :span="12">
        <img src="../../assets/images/coupon.png" class="bank_tip">
      </el-col>
      <el-col :span="12">
        <div class="bank_place">
            <span style="font-size:18px;color:#666">您尚未获取优惠券哦～</span><br>
        </div> 
      </el-col>  
    </el-row>
        <div v-else class="card" v-for="(item,index) in couponList" :key="index"> 
          <div class="card_top" :style="{'background':item.effective!=1?'#CCCCCC':''}"> <span class="dw">¥</span><span class="money">{{item.couponFaceValue}}</span>
          <div class="detil">[ 每满{{item.fullReducedAmount}}元抵扣{{item.couponFaceValue}}元 ]</div>
          <div class="time"><span>{{item.startTime}}</span> 至 <span>{{item.endTime}}</span></div>
          
          </div>
          <div class="card_bottom">
            <div class="ball_row">
              <div class="ball" style="margin-left:2px"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball"></div><div class="ball" style="margin-right:0"></div>
            </div>
            <div>
            券&nbsp;编&nbsp;号&nbsp;: <span>{{item.couponId}}</span>
            </div>
            <div>
            使用对象: <span>{{item.goodsName}}</span>
            </div>
            <div class="yz"> <img v-if='item.effective==1' src="../../assets/images/icon/yx.svg" alt=""> <img v-else src="../../assets/images/icon/gq.svg" alt=""></div>
          </div>
        </div>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
    </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      couponList:[],
        phone:this.$getcookie('LOGIN_PHONE'),
      http:this.$store.state.dialog.http,
      pageSize:6,
      currentPage:1,
      total:1
    };
  },
  created() {
    this.getData();
  },
  methods:{
    getData(){
      this.axios.post(this.http+'/interface/pc/distributor/pcBank/myCoupon',qs.stringify({
        phone:this.phone,
        pageSize:this.pageSize,
        currentPage:this.currentPage
      })).then(res=>{
        if(res.data.code==200){
        this.total=JSON.parse(res.data.data).total;
        this.pageSize=JSON.parse(res.data.data).showCount;
        this.couponList=JSON.parse(res.data.data).list;
        }


      })
    },
    handleCurrentChange(val){
      this.currentPage=val;
      this.getData()
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  color: #db4b29;
  font-weight: 700;
  padding: 0 0 15px 0;
  font-size: 18px;
  border-bottom: 2px solid #db4b29;
  margin-bottom: 10px;
}
.bank_tip{
  position: absolute;
  left: 50%;
  top: 110px;
  margin-left: -225px;
}
.bank_place{
    position: absolute;
    left: 50%;
    top: 178px;
    margin-left: 10px;
}
.card{
    width: 30%;
    text-align: center;
    box-sizing: border-box;
    line-height: 40px;
    padding-bottom: 40px;
    background: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    display: inline-block;
    margin-right: 3%;
    margin-top: 20px;
    .dw{
      font-size: 30px;
    color: #fff;
    font-family: unset;
    margin-right: 10px;
    }
    .money{
          font-size: 75px;
    color: #fff;
    font-family: fantasy;
    letter-spacing: 5px;
    }
 .detil{
   color: #fff;
   font-size: 16px;
 }
 .card_top{
    padding: 40px;
    width: 100%;
    background: -moz-linear-gradient(90deg, #F57E20 30%, #E05627 100%);/* FF3.6+ */
    background: -webkit-gradient(linear, 90deg, color-stop(30%, F57E20), color-stop(100%, E05627));/* Chrome,Safari4+ */
    background: -webkit-linear-gradient(90deg, #F57E20 30%, #E05627 100%);/* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(90deg, #F57E20 30%, #E05627 100%);/* Opera 11.10+ */
    background: -ms-linear-gradient(90deg, #F57E20 30%, #E05627 100%);/* IE10+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1301FE', endColorstr='#F4F60C', GradientType='1'); /* for IE */
    background: linear-gradient(90deg, #F57E20 30%, #E05627 100%);/* W3C */
    border-radius: 10px 10px 0 0;
    padding-bottom: 10px;
    position: relative;
    &::after{
      display: block;
      width: 15px;
      height: 15px;
      content: '';
      position: absolute;
      background: #fff;
      border-radius: 50%;
      left: 0;
      top: 35%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      z-index: 10;
    }
    &::before{
      display: block;
      width: 15px;
      height: 15px;
      content: '';
      position: absolute;
      background: #fff;
      border-radius: 50%;
      right: 0;
      top: 35%;
      -webkit-transform: translateX(50%);
      z-index: 10;
      transform: translateX(50%);
    }
    .time{
      font-size: 17px;
    }
 }
 .card_bottom{
   text-align: left;
   background: #F9F9F9;
    padding: 10px 20px;
    color: #8B8B8B;
    position: relative;
    box-sizing: border-box;
    border-bottom: 2px dashed #E9E9E9;
        &::after{
      display: block;
      width: 15px;
      height: 15px;
      content: '';
      position: absolute;
      background: #fff;
      border-radius: 50%;
      left: 0;
      bottom: 0;
      z-index: 10;
      transform: translate(-50%,50%);
    }
    &::before{
      display: block;
      width: 15px;
      height: 15px;
      content: '';
      position: absolute;
      background: #fff;
      border-radius: 50%;
      right: 0;
      bottom: 0;
      z-index: 10;
            transform: translate(50%,50%);
    }
    .yz{
          position: absolute;
    right: -20px;
    bottom: -82px;
    img{
      width: 131px;
      height: 120px;
    }
    }

 }
 .ball_row{
   width: 100%;
    position: absolute;
    top: -10px;
    left: 0;
    height: 26px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    div{
      margin: 0 4px;
      display: inline-block;
    }
    &::last-child{
      margin-right: 0;
    }
 }
 .ball{
   width: 5px;
    height: 5px;
    border-radius:50%; 
    background-color: #F9F9F9;
 }
}
</style>
