<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/mineV')"></x-icon>
            <span style="color:#fff">充值记录</span>
            <!-- <a slot="right" style="color:#0dbc79" @click="show4 = true">分享</a> -->
        </x-header>
        <div style="position:relative" v-if="isTrue">
            <div style="position:absolute;margin-top:30%;left:50%;margin-left:-125px;">
                <img src="../../../assets/icons/No_record.png" width="250px" alt="">
                <div style="text-align:center;margin-top:10%">
                    <span style="color:#999999;font-size:14px">暂无充值记录~</span>
                </div>
                <div style="text-align:center;margin-top:6%;position:relative;z-index:9999">
                    <button @click="goCharge" id="charge">去充值</button>
                </div>
            </div>
        </div>
        <scroller lock-x scrollbar-y :height="height">
            <div>
                <cell v-if="!isTrue" v-for="tmp in data" style="height:175px;width:80%;margin-left:6%;margin-top:15px;border-radius:4px;box-shadow:0px 1px 20px 0px rgba(7,0,2,0.2);">
                    <div style="margin-top:-80px;width:90%;position:absolute;left:5%;text-align:left">
                        <div style="font-size:0.85em;margin-top:12px;color:#4D4D4D">
                            <div style="margin-bottom:20px;">
                                <div>
                                    <span>充值金额 : </span><span>¥ {{tmp.amount / 100}}</span>
                                    <span v-if="tmp.status==1" style="float:right;color:#FF5959">未支付</span>
                                    <span v-if="tmp.status==2" style="float:right;color:#66CC90">已完成</span>
                                </div>
                            </div>
                            <div style="margin-bottom:20px;">
                                <span>订单编号 : </span><span>{{tmp.id}}</span><br/>
                                <span>用 &nbsp;户&nbsp;名 :  </span><span>{{tmp.name}}</span><br/>
                                <span>手机号码 : </span><span>{{tmp.phone}}</span><br/>
                                <span>充值方式 : </span>
                                <span v-if="tmp.mode==1">银联</span>
                                <span v-if="tmp.mode==2">微信</span>
                                <span v-if="tmp.mode==3">支付宝</span>
                            </div>
                            <div>
                                <span style="float:right;color:#808080;font-size:0.7em">{{tmp.ctime}}</span>
                            </div>
                        </div>
                    </div>
                </cell>
            </div>
        </scroller>
    </div>
</template>

<script>
import { XHeader , Group, Cell,Scroller} from 'vux'
    export default {
        components: {
            XHeader,
            Group,
            Cell, 
            Scroller
        },
        data () {
            return {
                name:'',
                height:'',
                isTrue:false,
                data: [],
                list: [],
            }
        },
        mounted () {
            let Height = window.innerHeight - 90
            this.height =Height+'px'
            console.log("height2",Height)
        },
        created () {
            let vm = this
            vm.name = sessionStorage.getItem('name')
            if (sessionStorage.getItem('token') == null){
                vm.jump('/login')
            } else {
                this.Get_order_list()
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
           
            Get_order_list () {
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/personalCenter/rechargeOrder/list?page=1&size=1000',
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res=>{
                    if(res.data.code == 200){
                        vm.data = res.data.data.list
                        if(vm.data.length == 0){
                            this.isTrue = true
                        }
                    }
                })
            },
            // 去充值
            goCharge(){
                console.log(13)
                this.$router.push({path:"/home/user/appCash"})
            }
        }
    }
</script>
<style  lang="less" scoped >
.xHeader{
    background-color: @background-color;
}

</style>
