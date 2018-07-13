<template>
  <div v-loading="loading">
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myCenter/home' }">个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的账户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row v-if="noCard1">
      <el-col :span="24">
        <div class="unbind-card" id="whenNoneCard">
          <img src="../../assets/images/unbind-account.png">
          <div>您尚未绑定账户～</div>
          <el-button type="danger" class="bindCard" @click="noCard2=true;noCard1=false">绑定账户</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="noCard2">
      <el-col class="outFromBox" :span="24">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="选择营业执照类型" prop="corpLicenseType">
            <el-select :disabled="disabled" style="width:217px" v-model="ruleForm.corpLicenseType" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择企业类型" prop="corpType">
            <el-select :disabled="disabled" style="width:217px" v-model="ruleForm.corpType" filterable placeholder="请选择">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="ruleForm.corpLicenseType=='01030101'" label="统一社会信用代码" prop="socialCreditCode">
            <el-input :disabled="disabled" v-model="ruleForm.socialCreditCode"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.corpLicenseType!='01030101'" label="营业执照注册号" prop="businessCode">
            <el-input :disabled="disabled" v-model="ruleForm.businessCode"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.corpLicenseType!='01030101'" label="组织机构代码" prop="institutionCode">
            <el-input :disabled="disabled" v-model="ruleForm.institutionCode"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.corpLicenseType!='01030101'" label="税务登记证号" prop="taxCode">
            <el-input :disabled="disabled" v-model="ruleForm.taxCode"></el-input>
          </el-form-item>
          <el-form-item label="企业的公司全称" prop="corpName">
            <el-input :disabled="disabled" v-model="ruleForm.corpName"></el-input>
          </el-form-item>

          <el-form-item label="经营地址" prop="corpBusinessAddress">
            <el-input :disabled="disabled" v-model="ruleForm.corpBusinessAddress"></el-input>
          </el-form-item>
          <el-form-item label="注册地址" prop="corpRegAddress">
            <el-input :disabled="disabled" v-model="ruleForm.corpRegAddress"></el-input>
          </el-form-item>
          <el-form-item label="企业的固定电话" prop="corpFixedTelephone">
            <el-input :disabled="disabled" v-model="ruleForm.corpFixedTelephone"></el-input>
          </el-form-item>
          <el-form-item label="经营范围" prop="businessScope">
            <el-input :disabled="disabled" v-model="ruleForm.businessScope"></el-input>
          </el-form-item>
          <el-form-item label="法人姓名" prop="legalName">
            <el-input :disabled="disabled" v-model="ruleForm.legalName"></el-input>
          </el-form-item>
          <el-form-item label="身份证件类型" prop="legalCertType">
            <el-select :disabled="disabled" style="width:217px" v-model="ruleForm.legalCertType" filterable placeholder="请选择">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="legalCertId">
            <el-input :disabled="disabled" placeholder="与证件类型对应" v-model="ruleForm.legalCertId"></el-input>
          </el-form-item>

          <el-form-item label="法人手机号码" prop="legalMobile">
            <el-input :disabled="disabled" v-model="ruleForm.legalMobile"></el-input>
          </el-form-item>
          <el-form-item label="企业联系人姓名" prop="contactName">
            <el-input :disabled="disabled" v-model="ruleForm.contactName"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号码" prop="contactMobile">
            <el-input :disabled="disabled" v-model="ruleForm.contactMobile"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱地址" prop="contactEmail">
            <el-input :disabled="disabled" v-model="ruleForm.contactEmail"></el-input>
          </el-form-item>
          <el-form-item label="企业开户银行账户名" prop="bankAcctName">
            <el-input :disabled="disabled" placeholder="需与企业名称保持一致" v-model="ruleForm.bankAcctName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="开户银行代号" prop="bankId">
            <el-input v-model="ruleForm.bankId"></el-input>
          </el-form-item> -->
          <el-form-item label="企业开户银行账号" prop="bankAcctNo">
            <el-input :disabled="disabled" v-model="ruleForm.bankAcctNo"></el-input>
          </el-form-item>
          <el-form-item label="开户银行名称" prop="bankBranch">
            <el-select :disabled="disabled" v-model="ruleForm.bankId" filterable placeholder="请选择">
              <el-option v-for="item in bankList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行支行名称" prop="bankBranch">
            <el-input :disabled="disabled" v-model="ruleForm.bankBranch"></el-input>
          </el-form-item>
          <el-form-item label="银行卡开户地区" prop="addrs">
            <el-cascader :disabled="disabled" expand-trigger="hover" :options="address" v-model="ruleForm.addrs">
            </el-cascader>
          </el-form-item>
          <el-form-item label="营业证照起止日期" prop="licenseDate">
            <el-date-picker :disabled="disabled" style="width: 599px" v-model="ruleForm.licenseDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyyMMdd" format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="证件起止日期" prop="legalCertDate">
            <el-date-picker :disabled="disabled" style="width:599px" v-model="ruleForm.legalCertDate" type="daterange" align="right" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyyMMdd" format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="display:block;text-align:center">
            <el-button type="primary" :disabled="disabled" @click="submitForm('ruleForm')">{{text}}</el-button>
            <el-button :disabled="disabled" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row  v-if="noCard3">
      <el-col :span="24">
        <div class="unbind-card" id="whenNoneCard">
          <img src="../../assets/images/unbind-account.png">
          <div>账户状态: {{text}}</div>
          <el-button type="danger" class="bindCard" @click="noCard2=true;noCard1=false;noCard3=false">查看历史表单</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs'
  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
        var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (reg.test(value) === false) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      var validatePhone2 = (rule, value, callback) => {
        var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (reg.test(value) === false) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      var validateEmail = (rule, value, callback) => {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (reg.test(value) === false) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      };
      var validateTyxy = (rule, value, callback) => {
        var reg = /[0-9A-Z]{18}/;
        if (reg.test(value) === false) {
          callback(new Error('请输入正确的编码!'));
        } else {
          callback();
        }
      };
       var validateBankCard = (rule, value, callback) => {
         
         this.axios.post(this.$store.state.dialog.http+'/interface/pc/personal/pcEnterprise/bankCardType',qs.stringify({
           cardNum:value
         })).then(res=>{
           console.log(res);
           if (res.data.code==200) {
         callback()
             
           }
         })
         console.log(this.ruleForm.bankAcctNo,'//////validateBankCard');

        // if (reg.test(value) === false) {
        //   callback(new Error('请输入正确的编码!'));
        // } else {
        //   callback();
        // }
      };
      return {
        loading:true,
        phone: this.$store.state.dialog.phone,
        http: this.$store.state.dialog.http,
        enterpriseCode: this.$store.state.dialog.enterpriseCode,
        disabled:false,
        noCard2: false,
        noCard1: true,
        noCard3:true,
        text:'立即开户',
        address: [{
            value: "0011",
            label: "北京",
            children: [{
              value: "1100",
              label: "北京"
            }]
          },
          {
            value: "0012",
            label: "天津",
            children: [{
              value: "1200",
              label: "天津"
            }]
          },
          {
            value: "0013",
            label: "河北",
            children: [{
                value: "1301",
                label: "石家庄"
              },
              {
                value: "1302",
                label: "保定"
              },
              {
                value: "1303",
                label: "沧州"
              },
              {
                value: "1304",
                label: "承德"
              },
              {
                value: "1305",
                label: "邯郸"
              },
              {
                value: "1306",
                label: "衡水"
              },
              {
                value: "1307",
                label: "廊坊"
              },
              {
                value: "1308",
                label: "秦皇岛"
              },
              {
                value: "1309",
                label: "唐山"
              },
              {
                value: "1310",
                label: "邢台"
              },
              {
                value: "1311",
                label: "张家口"
              }
            ]
          }, {
            value: "0014",
            label: "山西",
            children: [{
                value: "1401",
                label: "太原"
              },
              {
                value: "1402",
                label: "长治"
              },
              {
                value: "1403",
                label: "大同"
              },
              {
                value: "1404",
                label: "晋城"
              },
              {
                value: "1405",
                label: "离石"
              },
              {
                value: "1406",
                label: "临汾"
              },
              {
                value: "1407",
                label: "朔州"
              },
              {
                value: "1408",
                label: "忻州"
              },
              {
                value: "1409",
                label: "阳泉"
              },
              {
                value: "1410",
                label: "榆次"
              },
              {
                value: "1411",
                label: "运城"
              },
              {
                value: "1412",
                label: "晋中"
              },
              {
                value: "1413",
                label: "吕梁"
              }
            ]
          },
          {
            value: "0015",
            label: "内蒙古",
            children: [{
                value: "1501",
                label: "呼和浩特"
              },
              {
                value: "1502",
                label: "包头"
              },
              {
                value: "1503",
                label: "阿拉善"
              },
              {
                value: "1504",
                label: "巴彦淖尔"
              },
              {
                value: "1505",
                label: "赤峰"
              },
              {
                value: "1506",
                label: "呼伦贝尔"
              },
              {
                value: "1507",
                label: "乌海"
              },
              {
                value: "1508",
                label: "乌兰察布"
              },
              {
                value: "1509",
                label: "锡林郭勒"
              },
              {
                value: "1510",
                label: "兴安"
              },
              {
                value: "1511",
                label: "鄂尔多斯"
              },
              {
                value: "1512",
                label: "通辽"
              }
            ]
          },
          {
            value: "0021",
            label: "辽宁",
            children: [{
                value: "2101",
                label: "沈阳"
              },
              {
                value: "2102",
                label: "大连"
              },
              {
                value: "2103",
                label: "鞍山"
              },
              {
                value: "2104",
                label: "本溪"
              },
              {
                value: "2105",
                label: "朝阳"
              },
              {
                value: "2106",
                label: "丹东"
              },
              {
                value: "2107",
                label: "抚顺"
              },
              {
                value: "2108",
                label: "阜新"
              },
              {
                value: "2109",
                label: "葫芦岛"
              },
              {
                value: "2110",
                label: "锦州"
              },
              {
                value: "2111",
                label: "辽阳"
              },
              {
                value: "2112",
                label: "盘锦"
              },
              {
                value: "2113",
                label: "铁岭"
              },
              {
                value: "2114",
                label: "营口"
              }
            ]
          },
          {
            value: "0022",
            label: "吉林",
            children: [{
                value: "2201",
                label: "长春"
              },
              {
                value: "2202",
                label: "白城"
              },
              {
                value: "2203",
                label: "白山"
              },
              {
                value: "2204",
                label: "吉林"
              },
              {
                value: "2205",
                label: "辽源"
              },
              {
                value: "2206",
                label: "四平"
              },
              {
                value: "2207",
                label: "松原"
              },
              {
                value: "2208",
                label: "通化"
              },
              {
                value: "2209",
                label: "延边"
              }
            ]
          },
          {
            value: "0042",
            label: "湖北",
            children: [{
                value: "4212",
                label: "孝感"
              },
              {
                value: "4213",
                label: "神农架"
              },
              {
                value: "4214",
                label: "天门"
              },
              {
                value: "4215",
                label: "宜昌"
              },
              {
                value: "4216",
                label: "三峡"
              }
            ]
          },
          {
            value: "0043",
            label: "湖南",
            children: [{
                value: "4301",
                label: "长沙"
              },
              {
                value: "4302",
                label: "常德"
              },
              {
                value: "4303",
                label: "郴州"
              },
              {
                value: "4304",
                label: "衡阳"
              },
              {
                value: "4305",
                label: "怀化"
              },
              {
                value: "4306",
                label: "娄底"
              },
              {
                value: "4307",
                label: "邵阳"
              },
              {
                value: "4308",
                label: "湘潭"
              },
              {
                value: "4309",
                label: "湘西"
              },
              {
                value: "4310",
                label: "益阳"
              },
              {
                value: "4311",
                label: "永州"
              },
              {
                value: "4312",
                label: "岳阳"
              },
              {
                value: "4313",
                label: "张家界"
              },
              {
                value: "4314",
                label: "株洲"
              }
            ]
          },
          {
            value: "0044",
            label: "广东",
            children: [{
                value: "4401",
                label: "广州"
              },
              {
                value: "4402",
                label: "深圳"
              },
              {
                value: "4403",
                label: "潮州"
              },
              {
                value: "4404",
                label: "东莞"
              },
              {
                value: "4405",
                label: "佛山"
              },
              {
                value: "4406",
                label: "惠州"
              },
              {
                value: "4407",
                label: "江门"
              },
              {
                value: "4408",
                label: "揭阳"
              },
              {
                value: "4409",
                label: "茂名"
              },
              {
                value: "4410",
                label: "梅州"
              },
              {
                value: "4411",
                label: "清远"
              },
              {
                value: "4412",
                label: "汕头"
              },
              {
                value: "4413",
                label: "汕尾"
              },
              {
                value: "4414",
                label: "韶关"
              },
              {
                value: "4415",
                label: "阳江"
              },
              {
                value: "4416",
                label: "云浮"
              },
              {
                value: "4417",
                label: "湛江"
              },
              {
                value: "4418",
                label: "肇庆"
              },
              {
                value: "4419",
                label: "中山"
              },
              {
                value: "4420",
                label: "河源"
              },
              {
                value: "4421",
                label: "珠海"
              }
            ]
          },
          {
            value: "0045",
            label: "广西",
            children: [{
                value: "4501",
                label: "南宁"
              },
              {
                value: "4502",
                label: "百色"
              },
              {
                value: "4503",
                label: "北海"
              },
              {
                value: "4504",
                label: "桂林"
              },
              {
                value: "4505",
                label: "河池"
              },
              {
                value: "4506",
                label: "柳州"
              },
              {
                value: "4507",
                label: "梧州"
              },
              {
                value: "4508",
                label: "玉林"
              },
              {
                value: "4509",
                label: "崇左"
              },
              {
                value: "4510",
                label: "防城港"
              },
              {
                value: "4511",
                label: "贵港"
              },
              {
                value: "4512",
                label: "贺州"
              },
              {
                value: "4513",
                label: "来宾"
              },
              {
                value: "4514",
                label: "钦州"
              }
            ]
          },
          {
            value: "0046",
            label: "海南",
            children: [{
                value: "4601",
                label: "海口"
              },
              {
                value: "4602",
                label: "三亚"
              },
              {
                value: "4603",
                label: "白沙"
              },
              {
                value: "4604",
                label: "保亭"
              },
              {
                value: "4605",
                label: "昌江"
              },
              {
                value: "4606",
                label: "澄迈"
              },
              {
                value: "4607",
                label: "儋州"
              }
            ]
          }, {
            value: "0023",
            label: "黑龙江",
            children: [{
                value: "2301",
                label: "哈尔滨"
              },
              {
                value: "2302",
                label: "大庆"
              },
              {
                value: "2303",
                label: "大兴安岭"
              },
              {
                value: "2304",
                label: "鹤岗"
              },
              {
                value: "2305",
                label: "黑河"
              },
              {
                value: "2306",
                label: "鸡西"
              },
              {
                value: "2307",
                label: "佳木斯"
              },
              {
                value: "2308",
                label: "牡丹江"
              },
              {
                value: "2309",
                label: "七台河"
              },
              {
                value: "2310",
                label: "齐齐哈尔"
              },
              {
                value: "2311",
                label: "双鸭山"
              },
              {
                value: "2312",
                label: "绥化"
              },
              {
                value: "2313",
                label: "伊春"
              }
            ]
          },
          {
            value: "0031",
            label: "上海",
            children: [{
              value: "3100",
              label: "上海"
            }]
          },
          {
            value: "0032",
            label: "江苏",
            children: [{
                value: "3201",
                label: "南京"
              },
              {
                value: "3202",
                label: "常州"
              },
              {
                value: "3203",
                label: "淮安"
              },
              {
                value: "3204",
                label: "连云港"
              },
              {
                value: "3205",
                label: "南通"
              },
              {
                value: "3206",
                label: "苏州"
              },
              {
                value: "3207",
                label: "宿迁"
              },
              {
                value: "3208",
                label: "泰州"
              },
              {
                value: "3209",
                label: "无锡"
              },
              {
                value: "3210",
                label: "徐州"
              },
              {
                value: "3211",
                label: "盐城"
              },
              {
                value: "3212",
                label: "扬州"
              },
              {
                value: "3213",
                label: "镇江"
              },
              {
                value: "3214",
                label: "胥浦"
              }
            ]
          },
          {
            value: "0033",
            label: "浙江",
            children: [{
                value: "3301",
                label: "杭州"
              },
              {
                value: "3302",
                label: "宁波"
              },
              {
                value: "3303",
                label: "湖州"
              },
              {
                value: "3304",
                label: "嘉兴"
              },
              {
                value: "3305",
                label: "金华"
              },
              {
                value: "3306",
                label: "绍兴"
              },
              {
                value: "3307",
                label: "台州"
              },
              {
                value: "3308",
                label: "温州"
              },
              {
                value: "3309",
                label: "舟山"
              },
              {
                value: "3310",
                label: "衢州"
              },
              {
                value: "3311",
                label: "丽水"
              }
            ]
          },
          {
            value: "0034",
            label: "安徽",
            children: [{
                value: "3401",
                label: "合肥"
              },
              {
                value: "3402",
                label: "安庆"
              },
              {
                value: "3403",
                label: "蚌埠"
              },
              {
                value: "3404",
                label: "巢湖"
              },
              {
                value: "3405",
                label: "池州"
              },
              {
                value: "3406",
                label: "滁州"
              },
              {
                value: "3407",
                label: "阜阳"
              },
              {
                value: "3408",
                label: "淮北"
              },
              {
                value: "3409",
                label: "淮南"
              },
              {
                value: "3410",
                label: "黄山"
              },
              {
                value: "3411",
                label: "六安"
              },
              {
                value: "3412",
                label: "马鞍山"
              },
              {
                value: "3414",
                label: "铜陵"
              },
              {
                value: "3415",
                label: "芜湖"
              },
              {
                value: "3416",
                label: "宣城"
              },
              {
                value: "3417",
                label: "亳州"
              },
              {
                value: "3418",
                label: "宿州"
              }
            ]
          },
          {
            value: "0035",
            label: "福建",
            children: [{
                value: "3501",
                label: "福州"
              },
              {
                value: "3502",
                label: "厦门"
              },
              {
                value: "3503",
                label: "龙岩"
              },
              {
                value: "3504",
                label: "南平"
              },
              {
                value: "3505",
                label: "宁德"
              },
              {
                value: "4608",
                label: "定安"
              },
              {
                value: "4609",
                label: "东方"
              },
              {
                value: "4610",
                label: "乐东"
              },
              {
                value: "4611",
                label: "临高"
              },
              {
                value: "4612",
                label: "陵水"
              },
              {
                value: "4613",
                label: "琼海"
              },
              {
                value: "4614",
                label: "琼中"
              },
              {
                value: "4615",
                label: "屯昌"
              },
              {
                value: "4616",
                label: "万宁"
              },
              {
                value: "4617",
                label: "文昌"
              },
              {
                value: "4618",
                label: "五指山"
              },
              {
                value: "4619",
                label: "洋浦"
              }
            ]
          },
          {
            value: "0050",
            label: "重庆",
            children: [{
                value: "5000",
                label: "重庆"
              },
              {
                value: "5101",
                label: "成都"
              },
              {
                value: "5102",
                label: "巴中"
              },
              {
                value: "5103",
                label: "达州"
              },
              {
                value: "5104",
                label: "德阳"
              },
              {
                value: "5105",
                label: "广安"
              },
              {
                value: "5106",
                label: "广元"
              },
              {
                value: "5107",
                label: "乐山"
              },
              {
                value: "5108",
                label: "凉山"
              },
              {
                value: "5109",
                label: "眉山"
              },
              {
                value: "5110",
                label: "绵阳"
              },
              {
                value: "5111",
                label: "南充"
              },
              {
                value: "5112",
                label: "内江"
              },
              {
                value: "5113",
                label: "攀枝花"
              },
              {
                value: "5114",
                label: "遂宁"
              },
              {
                value: "5115",
                label: "雅安"
              },
              {
                value: "5116",
                label: "宜宾"
              },
              {
                value: "5117",
                label: "自贡"
              },
              {
                value: "5118",
                label: "泸州"
              },
              {
                value: "5119",
                label: "阿坝"
              },
              {
                value: "5120",
                label: "甘孜"
              },
              {
                value: "5121",
                label: "资阳"
              }
            ]
          },
          {
            value: "0052",
            label: "贵州",
            children: [{
                value: "5201",
                label: "贵阳"
              },
              {
                value: "5202",
                label: "安顺"
              },
              {
                value: "5203",
                label: "毕节"
              },
              {
                value: "5204",
                label: "六盘水"
              },
              {
                value: "5205",
                label: "铜仁"
              },
              {
                value: "5206",
                label: "遵义"
              },
              {
                value: "5207",
                label: "黔东南"
              },
              {
                value: "5208",
                label: "黔南"
              },
              {
                value: "5209",
                label: "黔西南"
              }
            ]
          },
          {
            value: "0053",
            label: "云南",
            children: [{
                value: "5301",
                label: "昆明"
              },
              {
                value: "5302",
                label: "西双版纳"
              },
              {
                value: "5303",
                label: "保山"
              },
              {
                value: "5304",
                label: "楚雄"
              },
              {
                value: "5305",
                label: "大理"
              },
              {
                value: "5306",
                label: "德宏"
              },
              {
                value: "5307",
                label: "红河"
              },
              {
                value: "5308",
                label: "丽江"
              },
              {
                value: "5309",
                label: "临沧"
              },
              {
                value: "5310",
                label: "怒江"
              },
              {
                value: "5311",
                label: "曲靖"
              },
              {
                value: "5312",
                label: "思茅"
              },
              {
                value: "5313",
                label: "文山"
              },
              {
                value: "5314",
                label: "玉溪"
              },
              {
                value: "5315",
                label: "昭通"
              },
              {
                value: "5316",
                label: "中甸"
              },
              {
                value: "5317",
                label: "迪庆州"
              }
            ]
          },
          {
            value: "0054",
            label: "西藏",
            children: [{
              value: "5401",
              label: "拉萨"
            }]
          },
          {
            value: "0035",
            label: "福建",
            children: [{
                value: "3506",
                label: "莆田"
              },
              {
                value: "3507",
                label: "泉州"
              },
              {
                value: "3508",
                label: "三明"
              },
              {
                value: "3509",
                label: "漳州"
              }
            ]
          },
          {
            value: "0036",
            label: "江西",
            children: [{
                value: "3601",
                label: "南昌"
              },
              {
                value: "3602",
                label: "抚州"
              },
              {
                value: "3603",
                label: "赣州"
              },
              {
                value: "3604",
                label: "吉安"
              },
              {
                value: "3605",
                label: "景德镇"
              },
              {
                value: "3606",
                label: "九江"
              },
              {
                value: "3607",
                label: "萍乡"
              },
              {
                value: "3608",
                label: "上饶"
              },
              {
                value: "3609",
                label: "新余"
              },
              {
                value: "3610",
                label: "宜春"
              },
              {
                value: "3611",
                label: "鹰潭"
              }
            ]
          },
          {
            value: "0037",
            label: "山东",
            children: [{
                value: "3701",
                label: "济南"
              },
              {
                value: "3702",
                label: "青岛"
              },
              {
                value: "3703",
                label: "滨州"
              },
              {
                value: "3704",
                label: "德州"
              },
              {
                value: "3705",
                label: "东营"
              },
              {
                value: "3706",
                label: "菏泽"
              },
              {
                value: "3707",
                label: "济宁"
              },
              {
                value: "3708",
                label: "莱芜"
              },
              {
                value: "3709",
                label: "聊城"
              },
              {
                value: "3710",
                label: "临沂"
              },
              {
                value: "3711",
                label: "日照"
              },
              {
                value: "3712",
                label: "泰安"
              },
              {
                value: "3713",
                label: "威海"
              },
              {
                value: "3714",
                label: "潍坊"
              },
              {
                value: "3715",
                label: "烟台"
              },
              {
                value: "3716",
                label: "枣庄"
              },
              {
                value: "3717",
                label: "淄博"
              }
            ]
          },
          {
            value: "0041",
            label: "河南",
            children: [{
                value: "4101",
                label: "郑州"
              },
              {
                value: "4102",
                label: "安阳"
              },
              {
                value: "4103",
                label: "焦作"
              },
              {
                value: "4104",
                label: "鹤壁"
              },
              {
                value: "4105",
                label: "开封"
              },
              {
                value: "4106",
                label: "洛阳"
              },
              {
                value: "4107",
                label: "南阳"
              },
              {
                value: "4108",
                label: "平顶山"
              },
              {
                value: "4109",
                label: "三门峡"
              },
              {
                value: "4110",
                label: "商丘"
              },
              {
                value: "4111",
                label: "新乡"
              },
              {
                value: "4112",
                label: "信阳"
              },
              {
                value: "4113",
                label: "许昌"
              },
              {
                value: "4114",
                label: "周口"
              },
              {
                value: "4115",
                label: "驻马店"
              },
              {
                value: "4116",
                label: "漯河"
              },
              {
                value: "4117",
                label: "濮阳"
              },
              {
                value: "4118",
                label: "济源"
              }
            ]
          },
          {
            value: "0042",
            label: "湖北",
            children: [{
                value: "4201",
                label: "武汉"
              },
              {
                value: "4202",
                label: "鄂州"
              },
              {
                value: "4203",
                label: "恩施"
              },
              {
                value: "4204",
                label: "黄冈"
              },
              {
                value: "4205",
                label: "黄石"
              },
              {
                value: "4206",
                label: "荆门"
              },
              {
                value: "4207",
                label: "荆州"
              },
              {
                value: "4208",
                label: "十堰"
              },
              {
                value: "4209",
                label: "随州"
              },
              {
                value: "4210",
                label: "咸宁"
              },
              {
                value: "4211",
                label: "襄樊"
              }
            ]
          },
          {
            value: "0054",
            label: "西藏",
            children: [{
                value: "5402",
                label: "阿里"
              },
              {
                value: "5403",
                label: "昌都"
              },
              {
                value: "5404",
                label: "林芝"
              },
              {
                value: "5405",
                label: "那曲"
              },
              {
                value: "5406",
                label: "日喀则"
              },
              {
                value: "5407",
                label: "山南"
              }
            ]
          },
          {
            value: "0061",
            label: "陕西",
            children: [{
                value: "6101",
                label: "西安"
              },
              {
                value: "6102",
                label: "安康"
              },
              {
                value: "6103",
                label: "宝鸡"
              },
              {
                value: "6104",
                label: "汉中"
              },
              {
                value: "6105",
                label: "商洛"
              },
              {
                value: "6106",
                label: "铜川"
              },
              {
                value: "6107",
                label: "渭南"
              },
              {
                value: "6108",
                label: "咸阳"
              },
              {
                value: "6109",
                label: "延安"
              },
              {
                value: "6110",
                label: "榆林"
              }
            ]
          },
          {
            value: "0062",
            label: "甘肃",
            children: [{
                value: "6201",
                label: "兰州"
              },
              {
                value: "6202",
                label: "白银"
              },
              {
                value: "6203",
                label: "定西"
              },
              {
                value: "6204",
                label: "东风"
              },
              {
                value: "6205",
                label: "合作"
              },
              {
                value: "6206",
                label: "嘉峪关"
              },
              {
                value: "6207",
                label: "金昌"
              },
              {
                value: "6208",
                label: "酒泉"
              },
              {
                value: "6209",
                label: "矿区"
              },
              {
                value: "6210",
                label: "临夏"
              },
              {
                value: "6211",
                label: "陇南"
              },
              {
                value: "6212",
                label: "平凉"
              },
              {
                value: "6213",
                label: "庆阳"
              },
              {
                value: "6214",
                label: "天水"
              },
              {
                value: "6215",
                label: "武威"
              },
              {
                value: "6216",
                label: "张掖"
              },
              {
                value: "6217",
                label: "甘南州"
              }
            ]
          },
          {
            value: "0063",
            label: "青海",
            children: [{
                value: "6301",
                label: "西宁"
              },
              {
                value: "6302",
                label: "海东"
              },
              {
                value: "6401",
                label: "银川"
              },
              {
                value: "6402",
                label: "中卫"
              },
              {
                value: "6403",
                label: "固原"
              },
              {
                value: "6404",
                label: "石嘴山"
              },
              {
                value: "6405",
                label: "吴忠"
              }
            ]
          },
          {
            value: "0065",
            label: "新疆",
            children: [{
                value: "6501",
                label: "乌鲁木齐"
              },
              {
                value: "6502",
                label: "阿克苏"
              },
              {
                value: "6503",
                label: "阿勒泰"
              },
              {
                value: "6504",
                label: "巴州"
              },
              {
                value: "6505",
                label: "博州"
              },
              {
                value: "6506",
                label: "昌吉"
              },
              {
                value: "6507",
                label: "哈密"
              },
              {
                value: "6508",
                label: "和田"
              },
              {
                value: "6509",
                label: "喀什"
              },
              {
                value: "6510",
                label: "克拉玛依"
              },
              {
                value: "6511",
                label: "马兰"
              },
              {
                value: "6512",
                label: "石河子"
              },
              {
                value: "6513",
                label: "塔城"
              },
              {
                value: "6514",
                label: "吐鲁番"
              },
              {
                value: "6515",
                label: "伊犁"
              },
              {
                value: "6516",
                label: "克州"
              },
              {
                value: "6517",
                label: "阿拉尔"
              },
              {
                value: "6518",
                label: "五家渠"
              }
            ]
          },
          {
            value: "2001",
            label: "香港",
            children: [{
              value: "9901",
              label: "香港"
            }]
          },
          {
            value: "2002",
            label: "澳门",
            children: [{
              value: "9902",
              label: "澳门"
            }]
          },
          {
            value: "2003",
            label: "台湾",
            children: [{
              value: "9903",
              label: "台湾"
            }]
          }
        ],
        options: [{
          value: '01030100',
          label: '普通营业执照企业'
        }, {
          value: '01030101',
          label: '三证合一企业'
        }],
        options2: [{
          value: '01030000',
          label: '普通企业'
        }, {
          value: '01030001',
          label: '个体户'
        }],
        options3: [{
          value: '01020100',
          label: '身份证'
        }, {
          value: '01020101',
          label: '护照'
        }, {
          value: '01020102',
          label: '军官证'
        }, {
          value: '01020103',
          label: '士兵证'
        }, {
          value: '01020104',
          label: '回乡证'
        }, {
          value: '01020105',
          label: '警官证'
        }, {
          value: '01020106',
          label: '台胞证'
        }, {
          value: '01020107',
          label: '其他'
        }, ],
        bankList:[{
          value: '03090000',
          label: '兴业银行'
        }, {
          value: '03040000',
          label: '华夏银行'
        }, {
          value: '03130011',
          label: '北京银行'
        }, {
          value: '03080000',
          label: '招商银行'
        }, {
          value: '01020000',
          label: '中国工商银行'
        }, {
          value: '01050000',
          label: '中国建设银行'
        }, {
          value: '01030000',
          label: '中国农业银行'
        }, {
          value: '03030000',
          label: '光大银行'
        }, {
          value: '04020011',
          label: '北京农村商业银行'
        }, {
          value: '01040000',
          label: '中国银行'
        }, {
          value: '04030000',
          label: '中国邮政储蓄银行'
        }, {
          value: '03133201',
          label: '南京银行'
        }, {
          value: '03133301',
          label: '杭州银行'
        }, {
          value: '03160000',
          label: '浙商银行'
        }, {
          value: '03130031',
          label: '上海银行'
        }, {
          value: '03180000',
          label: '渤海银行'
        }, {
          value: '04020031',
          label: '上海农村商业银行'
        }, {
          value: '03060000',
          label: '广东发展银行'
        }, {
          value: '03050000',
          label: '民生银行'
        },{
          value: '03100000',
          label: '浦东发展银行'
        },{
          value: '03134402',
          label: '平安银行'
        },{
          value: '03133307',
          label: '浙江民泰商业银行'
        },{
          value: '03020000',
          label: '中信银行'
        },{
          value: '03010000',
          label: '交通银行'
        }],
        ruleForm: {
          
          addrs: [], //地区
          licenseDate: '', //营业证照起止日期
          legalCertDate: '', //证件起止日期
          corpLicenseType: '', //企业类型
          corpType: '', //企业类型
          contactName: '', //企业联系人姓名
          socialCreditCode: '', //统一社会信用代码
          businessCode: '', //营业执照注册号
          institutionCode: '', //组织机构代码
          taxCode: '', //税务登记证号
          corpName: '', //企业的公司全称
          licenseStartDate: '',
          licenseEndDate: '',
          corpBusinessAddress: '', //经营地址
          corpRegAddress: '', //注册地址
          corpFixedTelephone: '', //企业的固定电话
          businessScope: '', //经营范围
          // controllingShareholder:'',//控股股东
          legalName: '', //法人姓名
          legalCertType: '', //身份证件类型
          legalCertId: '', //证件号码
          legalCertStartDate: '',
          legalCertEndDate: '',
          legalMobile: '', //法人手机号码
          contactMobile: '', //联系人手机号码
          contactEmail: '', //联系人邮箱地址
          bankAcctName: '', //企业开户银行账户名
          bankId: '', //开户银行代号
          bankAcctNo: '', //企业开户银行账号
          bankBranch: '', //企业开户银行的支行名称
          bankProv: '', //银行卡开户省份
          bankArea: '', //银行卡开户城市
        },
        rules: {
          addrs: [{
            required: true,
            message: '请选择地区',
            trigger: 'change'
          }],
          corpLicenseType: [{
            required: true,
            message: '请选择营业执照类型',
            trigger: 'change'
          }],
          corpType: [{
            required: true,
            message: '请选择企业类型',
            trigger: 'change'
          }],
          contactName: [{

            required: true,
            message: '请输入企业联系人姓名',
            trigger: 'blur'
          }],
          socialCreditCode: [{
            required: true,
            message: '请输入统一社会信用代码',
            trigger: 'blur'
          },
          {
              validator: validateTyxy,
              trigger: 'blur'
            }],
          businessCode: [{
            required: true,
            message: '请输入营业执照注册号',
            trigger: 'blur'
          }],
          institutionCode: [{
            required: true,
            message: '请输入组织机构代码',
            trigger: 'blur'
          }],
          taxCode: [{
            required: true,
            message: '请输入税务登记证号',
            trigger: 'blur'
          }],
          corpName: [{
            required: true,
            message: '请输入企业的公司全称',
            trigger: 'blur'
          }],
          licenseDate: [{
            required: true,
            message: '请选择营业证照起止日期',
            trigger: 'change'
          }],
          corpBusinessAddress: [{
            required: true,
            message: '请输入经营地址',
            trigger: 'blur'
          }],
          corpRegAddress: [{
            required: true,
            message: '请输入注册地址',
            trigger: 'blur'
          }],
          corpFixedTelephone: [{
            required: true,
            message: '请输入企业的固定电话',
            trigger: 'blur'
          }],
          businessScope: [{
            required: true,
            message: '请输入经营范围',
            trigger: 'blur'
          }],
          legalCertType: [{
            required: true,
            message: '请选择身份证件类型',
            trigger: 'change'
          }],
          legalName: [{
            required: true,
            message: '请输入法人名称',
            trigger: 'blur'
          }],
          legalCertDate: [{
            required: true,
            message: '请输入证件起止日期',
            trigger: 'change'
          }],
          legalCertId: [{
            required: true,
            message: '请输入证件号码',
            trigger: 'blur'
          }],
          legalMobile: [{
              required: true,
              message: '请输入法人手机号码',
              trigger: 'blur'
            },
            {
              validator: validatePhone,
              trigger: 'blur'
            }
          ],
          contactMobile: [{
            required: true,
            message: '请输入联系人手机号码',
            trigger: 'blur'
          }
          ,
            {
              validator: validatePhone2,
              trigger: 'blur'
            }],
          contactEmail: [{
            required: true,
            message: '请输入联系人邮箱地址',
            trigger: 'blur'
          },
            {
              validator: validateEmail,
              trigger: 'blur'
            }],
          bankAcctName: [{
            required: true,
            message: '请输入企业开户银行账户名',
            trigger: 'blur'
          }],
          bankId: [{
            required: true,
            message: '请选择开户银行',
            trigger: 'change'
          }],
          bankAcctNo: [{
            required: true,
            message: '请输入企业开户银行账号',
            trigger: 'blur'
          }],
          bankBranch: [{
            required: true,
            message: '请输入企业开户银行的支行名称',
            trigger: 'blur'
          }],
          bankProv: [{
            required: true,
            message: '请选择银行卡开户省份',
            trigger: 'blur'
          }],
          bankArea: [{
            required: true,
            message: '请输入分支行城市',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
       this.getData();
       
    },
    methods: {
      getData() {
        this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/businessOpeningInfo", qs.stringify({
          enterpriseCode: this.enterpriseCode
        })).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.ruleForm = JSON.parse(res.data.data);
            this.ruleForm.addrs=[]
            this.ruleForm.licenseDate=[]
            this.ruleForm.legalCertDate=[]
            this.ruleForm.addrs[0]=this.ruleForm.bankProv
            this.ruleForm.addrs[1]=this.ruleForm.bankArea
            this.ruleForm.licenseDate[0]=this.ruleForm.licenseStartDate
            this.ruleForm.licenseDate[1]=this.ruleForm.licenseEndDate
            this.ruleForm.legalCertDate[0]=this.ruleForm.legalCertStartDate
            this.ruleForm.legalCertDate[1]=this.ruleForm.legalCertStartDate//数据回显
            if(this.ruleForm.state == '01' || this.ruleForm.state=='03' || this.ruleForm.state=='04'){
              console.log(this.ruleForm.respDesc);
              this.disabled=true;
              this.text=this.ruleForm.respDesc;

            }else if(this.ruleForm.state == '02'){
              this.noCard3=false;
              this.noCard2=true;
              this.disabled=false;

            }else{
              this.noCard3=false;

            }
            this.noCard1=false;
            this.loading=false
          } else {
            this.$message({
              type: 'error',
              text:` '查询信息失败'`
            })
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.binding()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      change(e) {
        console.log(e.split(','));
        this.ruleForm.bankCode = e.split(',')[1];
        this.ruleForm.branchcardName = e.split(',')[0];
      },
      binding() {
        this.axios.post(this.http + "/interface/pc/personal/pcEnterprise/openEnterprise", qs.stringify({
          enterpriseCode: this.enterpriseCode,
          contactName: this.ruleForm.contactName,
          corpLicenseType: this.ruleForm.corpLicenseType,
          corpType: this.ruleForm.corpType,
          socialCreditCode: this.ruleForm.socialCreditCode,
          businessCode: this.ruleForm.businessCode,
          institutionCode: this.ruleForm.institutionCode,
          taxCode: this.ruleForm.taxCode,
          corpName: this.ruleForm.corpName,
          licenseStartDate: this.ruleForm.licenseDate[0].replace("-", "").replace("-", ""),
          licenseEndDate: this.ruleForm.licenseDate[1].replace("-", "").replace("-", ""),
          corpBusinessAddress: this.ruleForm.corpBusinessAddress,
          corpRegAddress: this.ruleForm.corpRegAddress,
          corpFixedTelephone: this.ruleForm.corpFixedTelephone,
          businessScope: this.ruleForm.businessScope,
          controllingShareholder: this.ruleForm.controllingShareholder,
          legalName: this.ruleForm.legalName,
          legalCertType: this.ruleForm.legalCertType,
          legalCertId: this.ruleForm.legalCertId,
          legalCertStartDate: this.ruleForm.legalCertDate[0].replace("-", "").replace("-", ""),
          legalCertEndDate: this.ruleForm.legalCertDate[1].replace("-", "").replace("-", ""),
          legalMobile: this.ruleForm.legalMobile,
          contactMobile: this.ruleForm.contactMobile,
          contactEmail: this.ruleForm.contactEmail,
          bankAcctName: this.ruleForm.bankAcctName,
          bankId: this.ruleForm.bankId,
          bankAcctNo: this.ruleForm.bankAcctNo,
          bankBranch: this.ruleForm.bankBranch,
          bankProv: this.ruleForm.addrs[0],
          bankArea: this.ruleForm.addrs[1],
        })).then(res => {
          // console.log(JSON.parse(res.data.data));
          var r = JSON.parse(res.data.data);
          this.axios.post('https://bird.ioliu.cn/v1?url=' + 'http://mertest.chinapnr.com/npay/merchantRequest', qs.stringify({
          // this.axios.post('/apis', qs.stringify({
            cmd_id: r.cmdId,
            mer_cust_id : r.merCustId,
            check_value: r.sign,
            version: r.version
          })).then(res => {

            console.log('内部res', res,$('#box'));
            // $('#box').html(res.data)
          })
        })
      }
    }
  }
</script>

<style lang='less'>
  .unbind-card {
    position: relative;
    height: 434px;
    background: #f6f6f6;
    border-radius: 5px;
    img {
      position: absolute;
      left: 220px;
      top: 140px;
      width: 205px;
      height: 132px;
    }
    div {
      position: absolute;
      left: 460px;
      top: 180px;
      color: #666;
      font-size: 18px;
    }
    .bindCard {
      position: absolute;
      left: 460px;
      top: 220px;
      width: 150px;
    }
  }
  .outFromBox {
    padding: 60px 20px;
    border: 1px solid #ddd;
    input {
      width: 217px;
    }
    .el-select {
      input {
        width: 100%;
      }
    }
  }
</style>
