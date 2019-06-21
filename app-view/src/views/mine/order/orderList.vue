<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/mineV')"></x-icon>
            <span  style="color:#fff">充电订单</span>
            <a slot="right" style="color:#fff;font-size:14px;" @click="jump('/home/invoice/invoiceInformation')">开发票</a>
        </x-header>
        <div style="position:relative" v-if="isTrue">
            <div style="position:absolute;margin-top:30%;left:50%;margin-left:-125px;">
                <img src="../../../assets/icons/No_record.png" width="250px" alt="">
                <div style="text-align:center;margin-top:10%">
                    <span style="color:#999999;font-size:14px">暂无充电记录~</span>
                </div>
                <div style="text-align:center;margin-top:6%;position:relative;z-index:9999">
                    <button @click="goCharge" id="charge">去充电</button>
                </div>
            </div>
        </div>
        <scroller lock-x scrollbar-y :height="height">
            <div>
                <cell v-if="!isTrue"  v-for="tmp in data" style="height:210px;width:80%;margin-left:6%;margin-top:20px;border-radius:4px;box-shadow:0px 1px 20px 0px rgba(7,0,2,0.2);">
                    <div style="margin-top:-80px;width:90%;position:absolute;left:5%;text-align:left">
                        <div style="color:rgb(12, 11, 11);">
                            <span>{{tmp.sitename}}</span><span style="float:right">充电费用:¥{{tmp.cost / 100}}</span>
                        </div>
                        <div style="font-size:0.8em;margin-top:10px;">
                            <div>
                                <span>{{tmp.begin_time}}</span> &nbsp;至&nbsp;<span>{{tmp.end_time}}</span>
                            </div>
                            <div>
                                <span>订单编号 : </span><span>{{tmp.id}}</span><br/>
                            </div>
                            <div>
                                <span>电费 : </span><span>¥ {{tmp.cprice / 100}}</span><br/>
                            </div>
                            <div>
                                <span>服务费 : </span><span>¥ {{tmp.sprice / 100}}</span><br/>
                            </div>
                            <div>
                                <span>停车费 : </span><span>¥ {{tmp.parking_fee / 100}}</span><br/>
                            </div>
                            <div>
                                <span>充电电量 : </span><span>{{tmp.electric_quantity}}度</span><br/>
                            </div>
                            <div>
                                <span>充电时长 : </span><span>{{tmp.duration}}</span><br/>
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
            }
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
        mounted () {
            let Height = window.innerHeight - 90
            this.height =Height+'px'
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
           
            Get_order_list () {
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/user/orders?page=1&size=100',
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res=>{
                    vm.data = res.data.data.list
                    if(vm.data.length == 0){
                        this.isTrue = true
                    }
                    vm.data.map(item => {
                        var Hours = parseInt(item.duration / 3600)
                        var Minutes = parseInt(parseInt(item.duration % 3600) / 60)
                        var Seconds = parseInt(parseInt(item.duration % 3600) % 60)
                        item.cost = item.cost.toFixed(0);
                        item.cprice = item.cprice.toFixed(0);
                        item.sprice = item.sprice.toFixed(0);
                        item.parking_fee = item.parking_fee.toFixed(0)
                        item.duration = Hours+"小时"+Minutes+"分钟"+Seconds+"秒"
                    })
                })
            },
            // 去充电
            goCharge(){
                this.$router.push({path:'/home/bmapV'})
            }
        }
    }
</script>
<style  lang="less" scoped>
.xHeader{
    background-color: @background-color;
}
#charge{
    width:120px;
    height:40px;
    border: transparent;
    background:linear-gradient(90deg,rgba(92,230,184,1) 0%,rgba(112,224,159,1) 100%);
    border-radius:30px;
    color: white;
    outline: none;
    font-size: 16px;
}
</style>
