<template>
    <div class="ju_body">
        <img src="../../assets/images/join/233463328466736714_01.png" alt="" class="img">
        <img src="../../assets/images/join/233463328466736714_02.png" alt="" class="img">
        <img src="../../assets/images/join/233463328466736714_03.png" alt="" class="img">
        <img src="../../assets/images/join/233463328466736714_04.png" alt="" class="img">
        <img src="../../assets/images/join/233463328466736714_05.png" alt="" class="img">
        <img src="../../assets/images/join/233463328466736714_06.png" alt="" class="img">
        <img src="../../assets/images/join/233463328466736714_07.png" alt="" class="img">
        <img src="../../assets/images/join/233463328466736714_08.png" alt="" class="img">
        <img src="../../assets/images/join/233463328466736714_09.png" alt="" class="img">
        <div class="content">
          <div class="wrapper">
            <label>
              <span class="left">公司或门店名称</span>
              <input type="text" v-model="companyName">
            </label>
            <br>
            <label>
              <span class="left">公司地址</span>
              <input type="text" v-model="companyAddress">
            </label>
            <br>
            <label>
              <span class="left">法人姓名</span>
              <input type="text" v-model="legalName">
            </label>
            <br>
            <label>
              <span class="left">联系电话</span>
              <input type="text" v-model="phone">
            </label>
            <br>
            <label>
              <span class="left">推荐人手机号</span>
              <input type="text" v-model="phoneNumber" maxlength="11" @change='getRecommendName()'>
            </label>
            <br>
            <label>
              <span class="left">推荐人姓名</span>
              <input type="text" disabled v-model="recommendName">
            </label>
            <br>
            <div class="checkbox">
              <div class="left">经营范围</div>
              <div class="right">
                <div>
                  <img src="../../assets/images/right.png" class="tip" v-if="range==1">
                  <img src="../../assets/images/false.png" class="tips" v-if="range!=1" @click="range=1"> 
                  <span>茶叶及茶制品（品牌<input type="text" class="underline" v-model="brand" :disabled="range!=1">）</span>
                </div>
                <div>
                  <img src="../../assets/images/right.png" class="tip" v-if="range==2">
                  <img src="../../assets/images/false.png" class="tips" @click="range=2" v-if="range!=2"> 
                  <span>其他<input type="text" class="underline" v-model="rangeElse" :disabled="range!=2"></span>
                </div>
              </div>
            </div>
            <br>
            <div class="checkbox">
              <div class="left">经营场所</div>
              <div class="right">
                <div>
                  <img src="../../assets/images/right.png" class="tip" v-if="address==1">
                  <img src="../../assets/images/false.png" class="tips" @click="address = 1" v-if="address!=1"> 
                  <span>门店；</span>
                  <img src="../../assets/images/right.png" class="tip" v-if="address==2">
                  <img src="../../assets/images/false.png" class="tips" @click="address = 2" v-if="address!=2"> 
                  <span>专柜；</span>
                  <img src="../../assets/images/right.png" class="tip" v-if="address==3">
                  <img src="../../assets/images/false.png" class="tips" @click="address = 3" v-if="address!= 3"> 
                  <span>办公房</span>
                </div>
                <div>
                  <img src="../../assets/images/right.png" class="tip" v-if="address==4">
                  <img src="../../assets/images/false.png" class="tips" @click="address = 4" v-if="address!=4"> 
                  <span>其他<input type="text" class="underline short" :disabled="address!=4" v-model="addressElse">；面积<input type="text" class="underline short" v-model="area">平方米</span>
                </div>
              </div>
            </div>
            <button class="now" @click="validater()">立即申请</button>
          </div>
        </div>
        <div class="mask" v-if="result">
          <div class="fixed">
            <div class="title"></div>
            <div class="placeholder">您已申请成功！工作人员将在3-5个工作日内对您的资料进行审核，请您耐心等待，谢谢！</div>
            <div class="back"><button @click='$router.openPage("/")'>确定</button></div>
          </div>
        </div>
        <div class="mask" v-if="plc">
          <div class="fixed">
            <div class="title">提示</div>
            <div class="placeholder"  style="text-align: center;">{{ message }}</div>
            <div class="back"><button @click="plc=false">确定</button></div>
          </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      recommendName:"",
      companyName: "",
      companyAddress: "",
      legalName: "",
      phone:'',
      http: this.$store.state.dialog.http,
      phoneNumber: "",
      brand: "",
      range: 1,
      address: 1,
      area: "",
      rangeElse: "",
      addressElse: "",
      message: "",
      result: false,
      plc: false
    };
  },
  methods: {
    getRecommendName(){
      if(this.phoneNumber.length==11){
        this.axios
        .post(
          this.http + "/interface/login/disInformationByPhone",
          qs.stringify({
            phone:this.phoneNumber,
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.recommendName = JSON.parse(res.data.data).distributorName;
          } else {
            this.$message({
              type: "warning",
              message: res.data.message
            });
          }
        })
      }
    },
    validater() {
      if (!this.companyName) {
        this.message = "请填写公司名称";
        this.plc = true;
        return;
      } else if (!this.companyAddress) {
        this.message = "请填写公司地址";
        this.plc = true;
        return;
      } else if (!this.legalName) {
        this.message = "请填写法人名称";
        this.plc = true;
        return;
      } else if (!this.phone) {
        this.message = "请填写联系电话";
        this.plc = true;
        return;
      }else if (!this.area) {
        this.message = "请填写面积";
        this.plc = true;
        return;
      }
      this.axios
        .post(
          this.http + "/interface/pc/login/applyLogistics",
          qs.stringify({
            companyName:this.companyName,
            companyAddress:this.companyAddress,
            legalPersonName:this.legalName,
            contactPhone:this.phone,
            refereeCellPhonenum:this.phonenumber,
            scopeOfOperation:this.range,
            scopeOfOperationContent:this.range==1?this.brand:this.rangeElse,
            placeOfBusiness:this.address,
            placeOfBusinessContent:this.address==4?this.addressElse:"",
            area:this.area,
            storePicture:"",
            businessLicensePicture:""
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.result = true;
          } else {
            this.$message({
              type: "warning",
              message: "提交失败"
            });
          }
        }).catch(res=>{
          this.$message({
              type: "warning",
              message: "提交失败"
            });
        });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return arr[2];
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang='less'>
.ju_body {
  width: 100%;
  .img {
    width: 100%;
    min-width: 1190px;
    display: block;
  }
  .content {
    width: 100%;
    min-width: 1190px;
    box-sizing: border-box;
    padding: 20px;
    background: #ededed;
    font-size: 18px;
    color: #675457;
    .wrapper {
      width: 1000px;
      margin: 0 auto;
      label {
        display: block;
        width: 100%;
        margin: 0 auto;
        padding-bottom: 15px;
      }

      label > input[type="text"] {
        font-size: 18px;
        padding: 5px;
        color: #675457;
        text-indent: 10px;
        display: inline-block;
        margin-left: 2%;
        width: 75%;
        border: 1px solid #675457;
        outline: none;
        background: #ededed;
      }

      .left {
        line-height: 18px;
        display: inline-block;
        width: 15%;
        text-align: right;
      }

      .checkbox {
        width: 100%;
        margin: 0 auto;
        padding-bottom: 15px;
        display: flex;
        .left {
          display: block;
          height: 50px;
          line-height: 25px;
        }
        .tip {
          margin-top: -2px;
          display: inline-block;
          width: 18px;
          height: 18px;
          vertical-align: middle;
        }

        .tips {
          margin-top: -2px;
          display: inline-block;
          width: 18px;
          height: 18px;
          vertical-align: middle;
        }
        .right {
          height: 50px;
          display: block;
          width: 60%;
          margin-left: 2.5%;
          text-align: left;
        }

        .underline {
          border: none;
          outline: none;
          line-height: 18px;
          width: 250px;
          background: #ededed;
          color: #675457;
          border-bottom: 1px solid #675457;
          font-size: 18px;
          position: relative;
          top: -1px;
        }

        .short {
          line-height: 20px;
          width: 180px;
        }
      }

      button {
        display: block;
        background: #675457;
        color: white;
        outline: none;
        border: none;
        width: 25%;
        margin: 0 auto;
        border-radius: 10px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
      }
      .now {
        margin-bottom: 20px;
        margin-top: 40px;
      }
    }
  }
  .fixed {
    position: fixed;
    top: 25%;
    left: 10%;
    height: 300px;
    width: 80%;
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(255, 255, 255, 0.1);
  }
  .title {
    background: #630;
    width: 500px;
    margin: 0 auto;
    height: 50px;
    font-size: 25px;
    text-indent: 20px;
    line-height: 50px;
    color: white;
  }
  .placeholder {
    padding: 20px;
    box-sizing: border-box;
    width: 500px;
    margin: 0 auto;
    font-size: 20px;
    letter-spacing: 1px;
    line-height: 40px;
    background: white;
    color: #630;
    font-weight: bold;
  }
  .back {
    width: 500px;
    margin: 0 auto;
    background: white;
    padding-bottom: 20px;
  }
  button {
    display: block;
    background: #675457;
    color: white;
    outline: none;
    border: none;
    width: 25%;
    margin: 0 auto;
    border-radius: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
  }
}
</style>
