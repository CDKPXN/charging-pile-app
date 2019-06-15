<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader"  :left-options="{showBack: false}">
            <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/mineV?c_money='+c_money)"></x-icon>
            <span style="color:#fff">红包</span>
        </x-header>
        <divider>可用红包个数</divider>
        <scroller lock-x scrollbar-y :height="height">
            <div>
                <checker
                    v-for="(item,index) in dataEnvelopes"
                    v-model="value"
                    radio-required
                    default-item-class="demo5-item"
                    selected-item-class="demo5-item-selected"
                    >
                    <checker-item :key="index" :value="index"  @on-item-click="chooseSuccess(item.id,item.amount / 100)">
                        <div style="background:#F0F0F0;height:26px;width:12px;border-radius:0 13px 13px 0;position:absolute;top:50%;margin-top:-13px;"></div>
                        <flexbox style="position:absolute;height:100px;top:50%;margin-top:-50px;">
                            <flexbox-item style="padding-left:6%;">
                                <p style="color:#333333;font-size:24px;">通用红包</p>
                                <p style="color:#808080;font-size:12px;">{{item.description}}</p>
                                <!-- <p style="color:#808080;font-size:12px;">有效日期：{{item.ctime.slice(0,10)}}</p> -->
                            </flexbox-item>
                            <flexbox-item style="text-align:right;padding-right:6%">
                                <span style="color:#FB4E44;font-size:35px;"><span style="font-size:14px;">¥</span>{{item.amount / 100}}</span>
                            </flexbox-item>
                        </flexbox>
                        <div style="background:#F0F0F0;height:26px;width:12px;border:1px solid #F0F0F0;border-radius:13px 0 0 13px;position:absolute;top:50%;margin-top:-13px;right:0;"></div>
                    </checker-item>
                </checker>
            </div>
        </scroller>
    </div>
</template>

<script>
import { XHeader , Divider, Scroller , Flexbox, FlexboxItem, Checker, CheckerItem } from 'vux';
import $ from 'jquery';
    export default {
        components: {
            XHeader,
            Divider,
            Scroller,
            Flexbox,
            FlexboxItem,
            Checker, 
            CheckerItem 
        },
        data () {
            return {
                name:'',
                dataEnvelopes: [],
                value:'',
                height:'',
                useNum:0,
                c_money:0,
            }
        },
        mounted () {
            let Height = window.innerHeight - 80
            this.height =Height+'px'
        },
        methods:{
            getRedEnvelopes(){
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/activity/unusedRedPacket',
                    headers:{'token':sessionStorage.getItem('token')},
                }).then(res => {
                    if(res.data.code == 200){
                        //根据你选择充值的金额，来判断你可用的充值红包的个数
                        let oneArr = []
                        let twoArr = []
                        res.data.data.map(item => {
                            if(item.aid == 2){
                                twoArr.push(item)
                            }else{
                                oneArr.push(item)
                            }
                        })
                        let sliceArr = twoArr.slice(0,vm.useNum)
                        vm.dataEnvelopes = oneArr.concat(sliceArr)
                        console.log(vm.dataEnvelopes)
                    }
                })
            },
            chooseSuccess(id,r_money){
                // 可用红包个数
                let useNum = this.$route.query.redIndex - 1
                sessionStorage.setItem('rid',id)
                this.$router.push({path:'/home/user/appCash',query:{r_money:r_money,c_money:this.c_money,useNum:useNum}})
                // this.$router.push({path:'/home/user/appCash',query:{rid:id,r_money:r_money,c_money:this.c_money,useNum:useNum}})
            }
        },
        created () {
            // 获取可使用的红包
            this.useNum = this.$route.query.redIndex
            this.c_money = this.$route.query.money
            this.getRedEnvelopes()
        }
    }
</script>
<style>
    .demo5-item {
        width: 90%;
        height: 130px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #F0F0F0;
        background-color: #fff;
        position: relative;
        box-shadow:0px 2px 8px 0px rgba(26,26,26,0.15);
        margin-left: 5%;
    }
    .demo5-item-selected {
        background: #ffffff url(../../../../assets/icons/redEnveloesOK.png) no-repeat top right;
        /* border-color: #ff4a00; */
    }
</style>
