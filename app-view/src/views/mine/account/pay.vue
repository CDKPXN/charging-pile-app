<template>
    <div class="newend">
        <img src="../../../assets/images/coin.png" style="display: block;margin: auto;margin-top: 25px">
        <h2 class="vx-header vx-size-24">充值方式</h2>
        <!--<h2 class="vx-header vx-size-24">openid : {{openid}}</h2>-->
        <group>
            <radio :options="chargeWay" v-model="chargeWayValue"></radio>
        </group>
        <box gap="30px 0px 10px 0px">
            <h2 class="vx-header vx-size-24">充值金额（易充币）</h2>
            <p style="text-align: center;;">1元=100易充币</p>
            <x-input v-model="chargeSum" type="text" placeholder="请输入充值金额" :equal-with="chargeSum"></x-input>
        </box>
        <box gap="30px 10px 10px 10px">
            <x-button type="primary" @click.native="createCharge">支付</x-button>
            <x-button @click.native="linkToAccount" type="primary">取消并返回</x-button>
        </box>
        <toast v-model="show">充值成功</toast>
    </div>
</template>
<script>
    import { XButton, Box,Radio ,Group,Toast,XInput} from 'vux'
    import URL from '../../../config/url.js'
    import {format} from '../../../config/format.js'
    import store from '../../../vuex/store.js'
    import axios from 'axios'

    export default {
        components: {
            XButton,
            Box,
            Group,
            Radio,
            Toast,
            XInput
        },
        methods: {
            linkToAccount(){
                this.$router.push('/home/mine')
            },
            createCharge(){
                let qs = require('qs');
                let pingpp = require('pingpp-js');
                let router = this.$router;

                //oT1t9s7Z7PjKQY6-6EP3gpIL2lU4
    
                //alert(this.$store.getters.getPhone);

                axios.post(URL.createCharge, qs.stringify({channel : 'wx_pub', amount : this.chargeSum, openid : this.$store.getters.getOpenid, phone : this.$store.getters.getPhone})).then(function(response) {
					console.log(response.data)
                    let charge = response.data;
                    pingpp.createPayment(charge, function(result, err){
                        console.log(result)
                        if (result == "success") {
                            // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                            router.push('/home/user/account');
                        } else if (result == "fail") {
                            // charge 不正确或者微信公众账号支付失败时会在此处返回
                            router.push('/home/user/account/charge/error');
                        } else if (result == "cancel") {
                            // 微信公众账号支付取消支付
                            //router.push('/user/account');
                        }
                    });
				}).catch(function(error) {
					console.log(error);
				})
         
            }
        },
        data () {
            return {
                balance:'XXX',
                //chargeWay:['微信','支付宝'],
                chargeWay:['微信'],
                show:false,
                chargeWayValue:'微信',
                openid: store.getters.getOpenid,
                chargeSum:'',
            };
        },
    }
</script>
<style>
    .vx-header{
        display: block;
        text-align: center;
        font-family: 微软雅黑;
        margin-top: 5px;
    }
    .vx-size-16{
        font-size: 16px;
    }
    .vx-size-32{
        font-size: 32px;
    }
    .vx-size-24{
        font-size: 24px;
    }
    .vx-color-black{
        color:black;
    }
    .vx-color-red{
        color: red;
    }
</style>