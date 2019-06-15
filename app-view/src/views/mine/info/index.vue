<template>
<!-- 暂时无用 -->
    <div class="newend">
        <box gap="25px 10px 0 10px">
            <h2 class="vx-title vx-width-24 vx-size-16 ">姓名</h2>
            <h2 class="vx-num vx-size-16 vx-width-75">{{name}}</h2>
            <h2 class="vx-title vx-width-24 vx-size-16 ">性别</h2>
            <h2 class="vx-num vx-size-16 vx-width-75">{{sex}}</h2>
            <h2 class="vx-title vx-width-24 vx-size-16 ">邮箱</h2>
            <h2 class="vx-num vx-size-16 vx-width-75">{{email}}</h2>
            <h2 class="vx-title vx-width-24 vx-size-16 ">车型</h2>
            <h2 class="vx-num vx-size-16 vx-width-75">{{carType}}</h2>
        </box>
        <div style="clear: both"></div>
        <box gap="30px 10px 10px 10px">
            <x-button type="primary" @click.native="inputUserMsg">填写/修改个人信息</x-button>
        </box>
    </div>
</template>
<script>
    import { Cell, Group ,XButton, Box} from 'vux'
    import URL from '../../../config/url.js'
    import {format} from '../../../config/format.js'
    import store from '../../../vuex/store.js'
    import axios from 'axios'
    
    export default {
        components: {
            Group,
            Cell,
            XButton,
            Box
        },
        data () {
            return {
                name:'未填写',
                sex:'未填写',
                email:'未填写',
                carType:'未填写',
                phone:store.getters.getPhone,
            }
        },
        mounted: function () {
        	var _this = this;
        	console.log(_this.phone);
        	const getUserInfoUrl = format(URL.getUserInfo, _this.phone)
				
			axios.get(getUserInfoUrl).then(function(response) {
			
				console.log(response.data);
				var receiveData = response.data.content
				if(response.data.errcode == "SUCCESS"){
				    if(receiveData.nickname != ''){
                        _this.name = receiveData.nickname
                    }else _this.name = '未填写'
                    if(receiveData.email != ''){
                        _this.email = receiveData.email
                    }else _this.email = '未填写'
                    if(receiveData.car_models != ''){
                        _this.carType = receiveData.car_models
                    }else _this.carType = '未填写'
	                if(receiveData.gender == 1){
	                	_this.sex = "男"
	                }else{
	                	_this.sex = "女"
	                }
				}
				
			}).catch(function(error) {
				console.log(error);
			})
			
		},
        methods: {
            inputUserMsg(){
                this.$router.push('/home/user/info/modify')
            }
        }
    }
</script>
<style>
    p{
        font-size: 14px;
    }
    .vx-cell-font>p{
        font-size: 14px;
        height:24px;
        color:grey;
    }
    .weui_cell_bd > p{
        width: 100px;
        text-align:justify
    }
</style>