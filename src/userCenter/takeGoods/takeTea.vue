<template>
    <div>
        <el-row>
            <el-col :span="2" style="margin-top:0">商品代码</el-col>
            <el-col :span="22" style="margin-top:0">{{ product.goodscode }}</el-col>
            <el-col :span="2">商品名称</el-col>
            <el-col :span="22">{{ product.goodsname }}</el-col>
            <el-col :span="2">可提数量</el-col>
            <el-col :span="22">{{ product.stockcount }}{{ product.transactionSpecification3 }}</el-col>
            <el-col :span="2" style="margin-top:40px">提货数量</el-col>
            <el-col :span="22" style="margin-top:30px">
                <el-input v-model="num" placeholder="请输入数量" style="width:200px" @change="getStoreCost()"></el-input>
            </el-col>
            <el-col :span="2">商品规格</el-col>
            <el-col :span="22">{{ specifications.benchmarkingUnitCount1 / specifications.benchmarkingUnitCount2 }}{{ specifications.transactionSpecification2 }}/{{ specifications.transactionSpecification1 }}, {{ specifications.benchmarkingUnitCount2 / specifications.benchmarkingUnitCount3 }}{{ specifications.transactionSpecification3 }}/{{ specifications.transactionSpecification2 }}, {{ specifications.benchmarkingUnitCount3 }}{{ specifications.benchmarkingUnit3
 }}/{{ specifications.transactionSpecification3 }}</el-col>
            <el-col :span="2">提货方式</el-col>
            <el-col :span="22">
                <el-radio v-model="radio" label="1">快递物流</el-radio>
                <el-radio v-model="radio" label="2" v-if="withInSystem!=1">自提</el-radio>
                <div style="margin-top:20px">
                    收货地址<span v-if="radio==1">( <span style="color:#409EFF;cursor:pointer;" @click="$router.openPage('/myUserCenter/userAddress')">+添加收货地址</span>  )</span>
                </div>
                <div v-if="radio==2"><el-radio v-model="radio3" label="" style="margin-top:20px">详细地址：{{ product.postalAddress }}  手机：{{ phone }}</el-radio><br></div>
                <div v-if="radio==1" v-for="(v,i) of address" :key='i'><el-radio v-model="radio2" :label="v.id" style="margin-top:20px" >收货人：{{ v.receiver }} 详细地址：{{ v.region }}  手机：{{ v.phoneNumber }}</el-radio><br></div>
            </el-col>
            <el-col :span="2">仓储费</el-col>
            <el-col :span="22">
                {{ cost.storageCost?cost.storageCost:0 }}元
                &nbsp;&nbsp;&nbsp;&nbsp;<a style="color:#409EFF" @click="changeState()">仓储收费标准</a>
                <br><span style="font-size:12px;color:#8c8c8c;position:relative;top:10px" v-if="show">免费仓储周期：{{ cost.freeETime }} 至 {{ cost.freeSTime }}</span>
            </el-col>
            <el-col :span="2">快递费</el-col>
            <el-col :span="22">
                {{ cost.expressFee?cost.expressFee:0 }}元
                &nbsp;&nbsp;&nbsp;&nbsp;<a style="color:#409EFF" @click="changeState2()">快递收费标准</a>
                <div style="margin-top:20px" v-if="show2">提货门店运费收费标准</div>                
                <el-table :data="[{}]" border style="width: 100%;margin-top:15px" v-if="show2">
                    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="首重" width="220">
                    <template slot-scope="scope">
                        <span>{{ cost.sz?cost.sz:0 }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="首重金额">
                    <template slot-scope="scope">
                        <span>{{ cost.szje?cost.szje:0 }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="续重" width="220">
                    <template slot-scope="scope">
                        <span>{{ cost.xz?cost.xz:0 }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column prop="goodsCode" show-overflow-tooltip align="center" label="续重金额">
                    <template slot-scope="scope">
                        <span>{{ cost.xzje?cost.xzje:0 }}</span>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="22" :offset="2">
                <el-button type="danger" style="width:120px" @click="sureGetTea()">确认提货</el-button>
                <el-button type="danger" @click="goBack()" style="background:white;color:red;width:120px">取消</el-button>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      radio3:'',
      phone: this.getCookie("LOGIN_PHONE"),
      http: this.$store.state.dialog.http,
      num: "",
      radio: "1",
      radio2: "",
      show: false,
      show2: false,
      withInSystem: "",
      specifications: {},
      product: {},
      address: {},
      cost: {}
      //   status:this.getCookie('STATUS')
    };
  },
  methods: {
    getStoreCost() {
      if (+this.num && +this.num > 0 && +this.num <= +this.product.stockcount) {
        this.axios
          .post(
            this.http + "/interface/pc/distributor/pcTeaStore/getStoreCost",
            qs.stringify({
              teaStoreId: this.$route.query.id,
              phone: this.phone,
              rushId: this.product.rushbyid,
              takeTeaCount: this.num,
              status: 1,
              takeType: this.radio
            })
          )
          .then(res => {
            if (res.data.code == 200) {
              this.cost = JSON.parse(res.data.data);
            }
          });
      }else{
          this.$message({
              type:'error',
              message:'请输入正确的数量'
          })
      }
    },
    sureGetTea() {
      this.axios
          .post(
            this.http + "/interface/pc/distributor/pcTeaStore/createTakeTeaOrder",
            qs.stringify({
              teaStoreId: this.$route.query.id,
              distributorCode: this.getCookie("distributorCode"),
              phone: this.phone,
              rushId: this.product.rushbyid,
              takeTeaCount: this.num,
              status: 2,
              takeType: this.radio,
              receiveId:this.radio2
            })
          )
          .then(res => {
            if (res.data.code == 200) {
              console.log(res)
            }
          });
    },
    goBack() {
      this.$router.go(-1);
    },
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/distributor/pcTeaStore/myHolderStockInfo",
          qs.stringify({
            id: this.$route.query.id,
            distributorCode: this.getCookie("distributorCode")
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.product = JSON.parse(res.data.data).holderStock;
            this.specifications = JSON.parse(res.data.data).specifications;
            this.withInSystem = JSON.parse(res.data.data).withInSystem;
          }
        });
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcCustomer/myAddress",
          qs.stringify({
            loginPhone: this.phone,
            type:1
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.address = JSON.parse(res.data.data).list;
            if(JSON.parse(res.data.data).list.length >0 ){
              this.radio2 = JSON.parse(res.data.data).list[0].id;
            }
          }
        });
    },
    changeState() {
      this.show = !this.show;
    },
    changeState2() {
      this.show2 = !this.show2;
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
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.el-col-2 {
  text-align: right;
  margin-top: 30px;
  font-weight: 600;
}
.el-col-22 {
  padding-left: 20px;
  box-sizing: border-box;
  margin-top: 30px;
}
</style>
