<template>
    <div class="myNews"> 
    <el-breadcrumb style='padding:24px;padding-left:0' separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >我的账号</el-breadcrumb-item>
      <el-breadcrumb-item >我的消息</el-breadcrumb-item>
    </el-breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商城消息" name="1"></el-tab-pane>
            <el-tab-pane label="物流消息" name="2"></el-tab-pane>
            <el-tab-pane label="交易消息" name="3"></el-tab-pane>
        </el-tabs>
        <el-table  :header-cell-style="getRowClass" slot="empty" border :data="tableData">
            <el-table-column prop="isHasBeenRead" align="center" label="状态">
                <template slot-scope="scope">
                    <span v-if='scope.row.isHasBeenRead==1'>已读</span> 
                    <span v-else style="color:red">未读</span> 
                </template>
            </el-table-column>
            <el-table-column prop="content" align="center" label="类型" >
                <template slot-scope="scope">
                    <span v-if='messageType==1'>商城消息</span> 
                    <span v-else-if='messageType==2'>物流消息</span>
                    <span v-else>交易消息</span>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip align="center" label="内容" width="380">
                <template slot-scope="scope">
                    <img class='detail_img' :src="scope.row.coverOfGoods" alt="">
                    <a href="javascript:;" @click="$router.openPage('myNewsDetail_user',{id:scope.row.id,param:scope.row.param1})">{{scope.row.content}}</a> 
                </template>
            </el-table-column>
            <el-table-column prop="beginTime" align="center" label="时间">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div> 
</template>

<script>
import qs from 'qs'
export default ({
    data(){
        return{
            activeName:'1',
            total:1,
            pagesize:10,
            currentPage:1,
            tableData:[],
            http:this.$store.state.dialog.http,
            currentPage:1,
            showCount:10,
            account:this.$getcookie('LOGIN_PHONE'),
            userIdentity:this.$getcookie('STATUS'),
            messageType:1
        }
    },
    mounted() {
        this.getData();
    },
    methods:{
        handleClick(val){
            console.log(val)
            this.messageType=val.name;
            this.getData()
        },
        handleSizeChange(val){
            this.pagesize=val;
            this.getData();
        },
        handleCurrentChange(val){
            this.currentPage=val;
            this.getData()
        },
        getRowClass({ row, column, rowIndex, columnIndex }) {
				if (rowIndex == 0) {
					return 'background:#E9E9E9'
				} else {
					return ''
				}
        },
        getData(){
            this.axios.post(this.http+'/interface/pc/distributor/pcSystemmessage/getMessageList',qs.stringify({
                currentPage:this.currentPage,
                showCount:this.showCount,
                account:this.account,//登陆手机号
                userIdentity:this.userIdentity,//身份类别
                messageType:this.messageType//消息类型* 1:商城消息* 2:物流消息* 3:交易消息
            })).then(res=>{
                if(res.data.code==200){
                    this.tableData=JSON.parse(res.data.data).list;
                    this.total=JSON.parse(res.data.data).total;
                    this.currentPage=JSON.parse(res.data.data).currentPage;
                }
                console.log(JSON.parse(res.data.data));
            })
        }
    }
})
</script> 
<style lang = 'less' >
.myNews{
.detail_img{
    width: 50px;
    height: 50px;
}
a{
    color: #000;
}
.el-pagination{
    text-align: right;
}
}


</style>