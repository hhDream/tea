<template>
    <div class="center_style">
        <el-row>
            <!-- <el-col :span="4">&nbsp;</el-col> -->
            <el-col class="box_style " :span="16">
                <div class="main-side" style="width:100%">
                    <div class=" main-cont-mall">
                        <!-- <div class="location h26px">
                            <div class="lh26px fl">
                                <span>所有分类</span>&gt;</div>
                            <ul class="fl" id="selected">
                            </ul>
                        </div> -->
                        <div class="classification">
                            <div class="classification-brand">
                                <div class="fl mr30px">品牌：</div>
                                <div class="fl w830px" id="brand_area">
                                    <a  v-for="(item,index) in brandList" :key="index" :class="{active_1:brand==index}" @click="changeBrand(index)">{{item.name}}</a>
                                    <!-- <a :class="{active_1:brand==0}" @click="changeBrand(1)">不限</a>
                                    <a :class="{active_1:brand==1}" @click="changeBrand(1)">茶企通</a>
                                    <a :class="{active_1:brand==2}" @click="changeBrand(2)">津乔普洱</a>
                                    <a :class="{active_1:brand==3}" @click="changeBrand(3)">其他</a>
                                    <a :class="{active_1:brand==4}" @click="changeBrand(4)">下关沱茶</a>
                                    <a :class="{active_1:brand==5}" @click="changeBrand(5)">臻字号</a> -->
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="line-dashed"></div>
                            <!-- <div class="m0px30px lh50px">
                                <div class="fl mr30px">品种：</div>
                                <div class="fl" id="craft_area">
                                    <a :class="{active_2:typ==0}" @click="changeType(0)">不限</a>
                                    <a :class="{active_2:typ==1}" @click="changeType(1)">混合</a>
                                    <a :class="{active_2:typ==2}" @click="changeType(2)">生茶</a>
                                    <a :class="{active_2:typ==3}" @click="changeType(3)">熟茶</a>
                                    <a :class="{active_2:typ==4}" @click="changeType(4)">普洱生熟包装茶</a>
                                    <a :class="{active_2:typ==5}" @click="changeType(5)">花草茶</a>
                                    <a :class="{active_2:typ==6}" @click="changeType(6)">滇红茶</a>
                                    <a :class="{active_2:typ==7}" @click="changeType(7)">普洱熟茶</a>
                                    <a :class="{active_2:typ==8}" @click="changeType(8)">普洱生茶</a>
                                    <a :class="{active_2:typ==9}" @click="changeType(9)">生熟搭配</a>
                                    <a :class="{active_2:typ==10}" @click="changeType(10)">红茶</a>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="line-dashed"></div> -->
                            <div class="m0px30px lh50px">
                                <div class="fl mr30px">产地：</div>
                                <div id="origin_area" style="padding-left: 70px;">
                                    <a v-for="(item,index) in placeOriginList" :key="index" :class="{active_3:where==index}" @click="changeWhere(index)">{{item.name}}</a>
                                    <!-- <a :class="{active_3:where==0}" @click="changeWhere(0)">不限</a>
                                    <a :class="{active_3:where==1}" @click="changeWhere(1)">云南</a>
                                    <a :class="{active_3:where==2}" @click="changeWhere(2)">南京</a>
                                    <a :class="{active_3:where==3}" @click="changeWhere(3)">勐库地区</a>
                                    <a :class="{active_3:where==4}" @click="changeWhere(4)">其他茶区</a>
                                    <a :class="{active_3:where==5}" @click="changeWhere(5)">普洱茶区</a>
                                    <a :class="{active_3:where==6}" @click="changeWhere(6)">勐腊茶区</a>
                                    <a :class="{active_3:where==7}" @click="changeWhere(7)">临沧茶区</a>
                                    <a :class="{active_3:where==8}" @click="changeWhere(8)">勐海茶区</a> -->
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="sort">
                            <a id="sort-default" :class="{'c-orange':sort==0}" @click="changeS(0)">默认</a>
                            <a id="sort-historySaleCount" :class="{'c-orange':sort==1}" @click="changeS(1)">成交量</a>
                            <a id="sort-saleNo" :class="{'c-orange':sort==2}" @click="changeS(2)">可买量</a>
                            <!-- <a id="sort-buyNo" :class="{'c-orange':sort==3}" @click="changeS(3)">求购量</a> -->
                            <a id="sort-listTime" :class="{'c-orange':sort==4}" @click="changeS(4)">上市时间</a>
                        </div>
                        <div class="productList">
                            <ul id="product">
                                <a v-for="(Sp,index) in SpList" :key="index">
                                    <li>
                                        <div>
                                            <img @click="$router.openPage('/teaMallShopProduct',{id:Sp.goodsCode,releaseCode:Sp.releaseCode})" class="productList-img" :src="Sp.pcSmallPicture">
                                        </div>
                                        <h6 style="height:35px;">{{Sp.goodsName}}</h6>
                                        <div class="productList-leaf">
                                            <span class="icon-leaf"></span>
                                            <span class="icon-leaf"></span>
                                            <span class="icon-leaf"></span>
                                            <span class="icon-leaf"></span>
                                            <span class="icon-leaf-half"></span>
                                        </div>
                                        <div class="productList-time c-yellow">
                                            <span class="fl">上市时间：{{Sp.releaseBeginTime.split(' ')[0]}}</span>
                                            <span class="fr">生产年份：2017</span>
                                        </div>
                                        <div class="productList-quantity">
                                            <span>
                                                <div>{{Sp.param3}}{{Sp.benchmarkingUnit3}}</div>
                                                <div class="fs12px">成交量</div>
                                            </span>
                                            <span>
                                                <div>{{+Sp.param2 - +Sp.param3}}{{Sp.benchmarkingUnit3}}</div>
                                                <div class="fs12px">可买量</div>
                                            </span>
                                            <span class="br-none">
                                                <div>0{{Sp.benchmarkingUnit3}}</div>
                                                <div class="fs12px">求购量</div>
                                            </span>
                                        </div>
                                    </li>
                                </a>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <el-pagination style="text-align: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[8, 16, 24, 48]" :page-size=pageSize layout="total, sizes, prev, pager, next, jumper" :total=total>
                        </el-pagination>
                    </div>
                </div>
            </el-col>
            <el-row>
                <!-- <el-col :span="4">&nbsp;</el-col> -->
            </el-row>
        </el-row>
    </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      SpList: [
        {
          src: require("../../assets/images/c8d587de-d95b-4805-ac75-cbbc59427661.png"),
          name: "茉莉绿茶",
          releaseBeginTime: "2018-12-12 10:00:00"
        }
      ],
      pageSize: 10,
      currentPage: 1,
      total: 20,
      where: 0, //地区搜索条件
      typ: 0, //类型搜索条件
      brand: 0, //品牌搜索条件
      http: this.$store.state.dialog.http,
      sort: 0,
      brandList: ["正在加载"],
      placeOriginList: ["正在加载"]
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    changeWhere(i) {
      this.where = i;
      this.getList();
    },
    changeType(i) {
      this.typ = i;
      this.getList();
    },
    changeBrand(i) {
      this.brand = i;
      this.getList();
    },
    changeS(i) {
      this.sort = i;
      this.getList();
    },
    getList() {
      this.axios
        .post(
          this.http + "/interface/pc/allotment/shoppingMall",
          qs.stringify({
            sort: this.sort,
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            brand: "",
            placeOrigin: "",
            goodsName: this.$route.query.brand
          })
        )
        .then(res => {
          this.SpList = JSON.parse(res.data.data).allotmentList;
          this.brandList = [{ name: "不限" }].concat(
            JSON.parse(res.data.data).brandList
          );
          this.placeOriginList = [{ name: "不限" }].concat(
            JSON.parse(res.data.data).placeOriginList
          );
          this.total = JSON.parse(res.data.data).total;
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang = 'less' scoped>
@import "../../assets/mall.css";
.center_style {
  background-color: #f6f6f6;
}
.box_style {
  background-color: #fff;
  min-width: 1190px;
  float: none;
  margin: 30px auto;
  box-shadow: #999 0px 3px 7px;
  padding: 25px;
  padding-left: 4%;
}
.active_1 {
  color: #db4b29 !important;
  border: 1px solid #db4b29;
  padding: 5px;
  box-sizing: border-box;
}
.active_2 {
  color: #db4b29 !important;
  border: 1px solid #db4b29;
  padding: 5px;
  box-sizing: border-box;
}
.active_3 {
  color: #db4b29 !important;
  border: 1px solid #db4b29;
  box-sizing: border-box;
  padding: 5px;
}
</style>