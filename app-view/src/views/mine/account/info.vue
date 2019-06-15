<template>
    <div class="newend">
        <img src="../../../assets/images/coin.png" style="display: block;margin: auto;margin-top: 25px">
        <box gap="20px 10px 30px 10px " style="height:25px">
            <h2 class="vx-title vx-width-33 vx-size-16 vx-bgColor-logo vx-height-38px">账户余额</h2>
            <h2 class="vx-cost vx-width-33 vx-size-24 vx-color-red vx-height-38px">{{balance}}</h2>
            <h2 class="vx-unit vx-width-33 vx-size-16 vx-height-38px">易充币</h2>
        </box>
        <box gap="30px 10px 10px 10px">
            <x-button type="primary" @click.native="linkToCharge" >充值</x-button>
            <x-button @click.native="linkToLog" type="primary">充值记录</x-button>
        </box>
    </div>
</template>
<script>
    import { XButton, Box ,Cell, Group} from 'vux'
    import URL from '../../../config/url.js'
    import {format} from '../../../config/format.js'
    import store from '../../../vuex/store.js'
    import axios from 'axios'


    export default {
        components: {
            XButton,
            Box,
            Group,
            Cell
        },
        mounted: function () {
        	var _this = this
        	
			const getUserAccountUrl = format(URL.getUserAccount, _this.phone)
			
			axios.get(getUserAccountUrl).then(function(response) {
			
				console.log(response.data);
				var receiveData = response.data.content
				if(receiveData != ""){
					_this.balance = receiveData.balance
				}
				
			}).catch(function(error) {
				console.log(error);
			})

		},
        methods: {
            linkToLog(){
                this.$router.push('/home/user/account/recharge_log')
            },
            linkToCharge(){
                this.$router.push('/home/pay')
            }
        },
        data () {
            return {
                balance:'XXX',
                phone:store.getters.getPhone,
            };
        },
    }
</script>
<style>
    .vx-header{
        display: block;
        text-align: center;
        font-family: '微软雅黑';
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
    .vx-height-38px{
        height: 38px;
        line-height: 38px;
    }
</style>