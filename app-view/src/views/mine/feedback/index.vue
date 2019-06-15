<template>
    <div class="newend">
        <h2 class="vx-header vx-size-24" style="margin-top: 25px">意见反馈</h2>
        <group>
            <x-textarea :max="200" name="detail" placeholder="请填写详细信息" :show-counter="false" v-model="feedback"></x-textarea>
        </group>
        <box gap="10px 10px 10px 10px">
            <x-button type="primary" @click.native="sendFeedback">提交</x-button>
            <!--<x-button type="primary" @click.native="backToMine">返回</x-button>-->
        </box>
        <toast v-model="show" type="text">{{message}}</toast>
    </div>
</template>
<script>
    import { XButton, Box,Toast,XTextarea, Group } from 'vux'
    import URL from '../../../config/url.js'
    import {format} from '../../../config/format.js'
    import store from '../../../vuex/store.js'
    import axios from 'axios'

    export default {
        components: {
            XButton,
            Box,
            Toast,
            XTextarea,
            Group
        },
        methods: {
            sendFeedback(){
            	
            	console.log(this.feedback)
            	const _this = this;
					
				var qs = require('qs');

				axios.post(URL.feedback, qs.stringify({phoneNumber: _this.phone, content:_this.feedback}),  
				{headers: {'Content-Type': 'application/x-www-form-urlencoded'},}).then(function(response) {
					
					if(response.data.errcode == "SUCCESS"){
						_this.show = true
					}

				}).catch(function(error) {
					console.log(error);
				})
            },
            backToMine(){
                this.$router.push('/home/mine')
            }
        },
        data () {
            return {
                balance:'XXX',
                show:false,
                message:'提交成功',
                feedback:'',
                phone:store.getters.getPhone,
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
    .vx-color-blue{
        color:blue;
    }
</style>