
<template>
<!-- 充电扫二维码 -->
    <div class="newend" style="background:#fff">
        <!--<div id="app-1">
            <x-header class="xHeader" :left-options="{showBack: false}">
                <span style="color:#000">充电</span>
            </x-header>
            <flexbox orient="vertical">
                <flexbox-item>
                    <div class="flex-demo prompt">
                        扫描充电桩上的二维码开启充电
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo promptSmall">
                        <x-icon type="ios-location-outline" size="16"></x-icon>
                        定位中可以查找电桩
                        <x-icon type="ios-arrow-right" size="14"></x-icon>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item style="text-align:center">
                    <div @click="Scanning">
                        <img src="../../assets/images/scanne.gif" style="width:60%;margin-top:40%">
                    </div>
                    <div class="flex-demo recharge">
                        请点击上方图标扫描充电桩对应二维码
                    </div>
                </flexbox-item>  
            </flexbox>
            
        </div>-->
        <confirm v-model="show"  title="提示">
            <p style="text-align:center;">请扫描正确的充电桩二维码</p>
        </confirm>
    </div>
</template>


<script>


	import axios from 'axios'
	import {  XButton, Box, GroupTitle, Flexbox, FlexboxItem, Divider , Cell,Toast,Confirm,TransferDomDirective as TransferDom } from 'vux'

	import url from '../../config/url.js'
    import { XHeader } from 'vux'

	
	
	export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader, // 头部
            XButton,
            Box,
            GroupTitle,
            Flexbox,
            FlexboxItem,
            Divider,
            Cell,
            Toast,
            Confirm
        },
        data () {
	        return {
                data: '',
                show: false,
                token:''
	        }
	    },
        
        created() {
            
			let vm = this
            vm.token = sessionStorage.getItem('token')
            this.$ajax({
                method:'get',
                url:'app/charging',
                headers:{'token':vm.token}
            })
            .then(res=>{
                
                if(res.data.code==400){
                    console.log(res.data)
                    vm.Scanning()
                }else if(res.data.code==200){
                    console.log(res.data)
                    vm.jump('/home/user/order')
                }
            })
        },
		methods: {
            jump (url) {
                this.$router.push(url)
            },
            Scanning () {
                if(sessionStorage.getItem('token')==null){
                    this.jump('/login')
                }else{
                    // 调用cordova的扫描二维码
                    let vm = this
                    // cordova.plugins.barcodeScanner.scan(
                    //     function (result) {
                    //         if (result.text !== '') {
                    //             vm.chargeSet(result.text)
                    //         } else {
                    //             vm.$router.push('/home/bmapV')
                    //         }
                            
                    //     },
                    //     function (error) {
                    //         alert("Scanning failed: " + error);
                    //     }
                    // )
                    vm.chargeSet("802")

                }
            },
            chargeSet (text) {  // 获取二维码点桩中的id，去设置充电类型
                this.$router.push({
                    path: '/chargeSetting',
                    query:{
                        chargeId:text
                    }
                })
            }
        }
	}

</script>
<style lang="less" scoped>
    .xHeader{
        background:@background-color !important;
        font-family: '微软雅黑';
    }
    .prompt{
        font-weight: 500;
        font-size:16px;
        text-align:center;
        margin-top:4%
    }
    .promptSmall{
        font-weight: 300;
        font-size: 14px;
        text-align:center;
    }
    .balance{
        font-weight: 300;
        font-size: 12px;
        text-align:center;
    }
    .recharge{
        color:#0f9b67;
        font-weight: 300;
        font-size: 12px
    }
    .vux-x-icon {
        fill: #0f9b67;
    }
</style>