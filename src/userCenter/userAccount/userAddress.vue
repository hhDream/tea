<template>
    <div>
    <el-breadcrumb style='padding:24px 0' separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/myUserCenter/userHome' }">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/myUserCenter/userInfo' }">我的账号</el-breadcrumb-item>
        <el-breadcrumb-item>我的地址</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收货地址" name="1" >
                <el-row style="padding-bottom: 12px;">
                    <el-button type="danger" @click="addAddressVisible = true">新增收货地址</el-button>
                    <span style="margin-left: 20px;">您已创建<span style="color: #f78989"> {{ list.length }} </span>个收货地址</span>
                </el-row>
                <el-col :span="7" class="container_box" v-for="(v,i) of list" :key="i">
                    <el-col class="box_dashed">
                        <b v-if="v.isDefaultAddress == 1">默认地址</b>
                        <a @click="changeDefault(v.id)" style="color: #409EFF" v-if="v.isDefaultAddress == 2">默认地址</a>
                        <a style="margin-left: 18px;color: #409EFF" @click="modAddress(v)">编辑</a>
                        <a style="margin-left: 18px;color: #409EFF" @click="deleteAddress(v.id)">删除</a>
                    </el-col>
                    <el-col>收货人：{{ v.receiver }}</el-col>
                    <el-col>所在地区：{{ v.region }}</el-col>
                    <el-col>地址：{{ v.detailAddress }}</el-col>
                    <el-col>手机：{{ v.phoneNumber }}</el-col>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="提货门店" name="2" >
                <el-row class="container_box">
                    <el-col :span="24" class="box_dashed">
                        <b>所属门店：默认提货门店</b>
                    </el-col>
                    <el-col :span="24">门店名称：{{ takeTeaAddress.distributorName }}</el-col>
                    <el-col :span="24">所在地区：{{ takeTeaAddress.province }} {{ takeTeaAddress.city }} {{ takeTeaAddress.region }}</el-col>
                    <el-col :span="24">详细地址：{{ takeTeaAddress.protalAddress }}</el-col>
                    <el-col :span="24">联系电话：{{ takeTeaAddress.loginPhone }}</el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>

    <el-dialog title="新增收货地址" :visible.sync="addAddressVisible" center>
        <el-form>
            <el-form-item label="收货人" :label-width="formLabelWidth">
                <el-input v-model="username" auto-complete="off" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="选择地区" :label-width="formLabelWidth">
                <el-select v-model="provinceIndex" placeholder="请选择省份" style="width: 120px;" @change="getProvince()">
                    <el-option :label="v.name" :value='i' v-for="(v,i) in province"  :key='i'></el-option>
                </el-select>
                <el-select v-model="cityIndex" placeholder="请选择地市" style="width: 120px;" @change="getCity()">
                    <el-option :label="v.name" :value='i' v-for="(v,i) in city" :key='i'></el-option>
                </el-select>
                <el-select v-model="regionIndex" placeholder="请选择区县" style="width: 120px;">
                    <el-option :label="v" :value='i' v-for="(v,i) in region" :key="i" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input v-model="detailAddress" auto-complete="off" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth">
                <el-input v-model="phone" auto-complete="off" style="width: 300px;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: -36px; padding-bottom: 20px;">
            <el-button type="primary" @click="save(2)">保存</el-button>
            <el-button type="primary" @click="save(1)">保存为默认地址</el-button>
            <el-button @click="addAddressVisible = false;changeAble = 1;">取 消</el-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import add from "../../components/address.js";
export default {
  inject: ["reload"],
  data() {
    return {
      id: "",
      province: add,
      provinceIndex: "",
      city: [],
      cityIndex: "",
      region: [],
      regionIndex: "",
      list: [],
      http: this.$store.state.dialog.http,
      activeName: "1",
      addAddressVisible: false,
      username: "",
      detailAddress: "",
      phone: "",
      formLabelWidth: "120px",
      changeAble: 1,
      takeTeaAddress:{}
    };
  },
  methods: {
    changeDefault(id) {
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcCustomer/editIsDefaultAddress",
          qs.stringify({
            userPhone: this.getCookie("LOGIN_PHONE"),
            id: id
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.reload();
          } else {
            this.$message({
              type: "error",
              message: "修改失败"
            });
          }
        });
    },
    modAddress(obj) {
      this.id = obj.id;
      this.addAddressVisible = true;
      this.username = obj.receiver;
      var temp = obj.region.split(" ");
      this.provinceIndex = temp[0];
      this.cityIndex = temp[1];
      this.regionIndex = temp[2];
      this.detailAddress = obj.detailAddress;
      this.phone = obj.phoneNumber;
      this.changeAble = 2;
    },
    deleteAddress(id) {
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcCustomer/deleteAddress",
          qs.stringify({
            id: id
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.reload();
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        });
    },
    save(num) {
      if (!this.username) {
        this.$message({
          type: "info",
          message: "请填写收货人姓名"
        });
        return;
      }
      if (this.provinceIndex == "" && this.provinceIndex != "0") {
        this.$message({
          type: "info",
          message: "请填写地区"
        });
        return;
      }
      if (!this.detailAddress) {
        this.$message({
          type: "info",
          message: "请填写详细地址"
        });
        return;
      }
      if (!(this.phone && this.phone.length == 11)) {
        this.$message({
          type: "info",
          message: "请填写联系电话"
        });
        return;
      }
      this.axios
        .post(
          this.http +
            (this.changeAble == 2
              ? "/interface/pc/customer/pcCustomer/editAddress"
              : "/interface/pc/customer/pcCustomer/addAddress"),
          qs.stringify({
            userPhone: this.getCookie("LOGIN_PHONE"),
            phoneNumber: this.phone,
            receiver: this.username,
            region:
              Number(this.provinceIndex).toString() == "NaN"
                ? this.provinceIndex +
                  " " +
                  this.cityIndex +
                  " " +
                  this.regionIndex
                : this.province[this.provinceIndex].name +
                  " " +
                  this.city[this.cityIndex].name +
                  " " +
                  this.region[this.regionIndex],
            detailAddress: this.detailAddress,
            isDefaultAddress: num,
            id: this.id
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.changeAble = 1;
            this.reload();
          } else {
            this.$message({
              type: "error",
              message: "添加失败"
            });
          }
        });
    },
    getProvince() {
      if (this.provinceIndex != "" || this.provinceIndex == "0") {
        this.city = this.province[this.provinceIndex].city;
        this.region = this.city[0].area;
        this.regionIndex = 0;
        this.cityIndex = 0;
      } else {
        this.city = [];
        this.region = [];
        this.regionIndex = "";
        this.cityIndex = "";
      }
    },
    getCity() {
      if (this.cityIndex != "" || this.provinceIndex == "0") {
        this.region = this.city[this.cityIndex].area;
        this.regionIndex = 0;
      } else {
        this.region = [];
      }
    },
    handleClick() {

      
    },
    getData() {
      this.axios
        .post(
          this.http + "/interface/pc/customer/pcCustomer/myAddress",
          qs.stringify({
            loginPhone: this.getCookie("LOGIN_PHONE"),
            type: 1,
            pageSize: 1000,
            currentPage: 1
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            console.log(JSON.parse(res.data.data))
            this.list = JSON.parse(res.data.data).list;
          } else {
          }
        });


        this.axios
        .post(
          this.http + "/interface/pc/customer/pcCustomer/myAddress",
          qs.stringify({
            loginPhone: this.getCookie("LOGIN_PHONE"),
            type: 2,
            pageSize: 1000,
            currentPage: 1
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.takeTeaAddress = JSON.parse(res.data.data);
          } else {
          }
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
  },
  mounted() {
    this.getData();
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
.container_box {
  padding: 24px;
  margin-right: 20px;
  margin-bottom: 12px;
  border: 1px solid #efefef;
}
.el-col-24 {
  margin-top: 20px;
}
.box_dashed {
  border-bottom: 2px dashed #efefef;
  margin: 0;
  padding-bottom: 10px;
}

.title_tabs .el-tabs__item {
  color: #db4b29 !important;
  font-weight: 700;
  padding: 0 0 15px 0;
  font-size: 18px;
  border-bottom: 2px solid #db4b29;
  margin-bottom: 10px;
}
</style>
