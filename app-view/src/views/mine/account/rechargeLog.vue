<template>
    <div class="newend">
        <div style="margin-top: 25px"></div>
        <h1 style="font-size: 18px;margin-top: -10px;text-align: center;margin-bottom: 10px;">充值记录</h1>

		<form-preview v-for="recharge in rechargelist" :header-label="'充值金额'" :header-value=recharge.amount :body-items="recharge.desc">
			
		</form-preview>
    	

    </div>
</template>
<script>
	import Vue from 'vue'
    import {  Group ,Panel,XButton, FormPreview} from 'vux'
    import URL from '../../../config/url.js'
    import {format} from '../../../config/format.js'
    import store from '../../../vuex/store.js'
    import axios from 'axios'
    export default {
        components: {
            Group,
            Panel,
            XButton,
            FormPreview
        },
        data () {
            return {
                phone:store.getters.getPhone,
                rechargelist: [],
            }
        },
        mounted: function () {
        	this.$nextTick(function () {
        		var _this = this;
	        	console.log(_this.phone);
	        	const getRechargeRecordUrl = format(URL.getRechargeRecord, _this.phone)
			
				axios.get(getRechargeRecordUrl).then(function(response) {
					
					
				
					console.log(response.data);
					var receiveData = response.data.content
					if(response.data.errcode == "SUCCESS"){
						receiveData.forEach(function(val,index,arr){
							 console.log(val);
							_this.rechargelist[index] = {
								amount : "",
								desc : []
							}
							_this.rechargelist[index].amount = val.amount
						   	
						   	_this.rechargelist[index].desc = [
						   		{
						   			label : "",
						   			value : ""
						   		},
						   		{
						   			label : "",
						   			value : ""
						   		}
						   	]
						   	
						    _this.rechargelist[index].desc[0].label = "充值方式： "
						    _this.rechargelist[index].desc[0].value = val.mode
						    
						    _this.rechargelist[index].desc[1].label = "充值时间： "
						    _this.rechargelist[index].desc[1].value = val.time
						    
						    Vue.set(_this.rechargelist, index, _this.rechargelist[index])
						})
					}
					console.log(_this.rechargelist)
			      	
			   	}).catch(function(error) {
					console.log(error);
				})
        	})
	      	
			
		},
        methods: {
            
            
            backToAccount(){
                this.$router.push('/home/user/account')
            }
        }
    }
</script>
<style>
    /*.newend{*/
        /*overflow-x: scroll;*/
    /*}*/
    .weui-form-preview__hd .weui-form-preview__value{
        font-size: 1em;
    }
    .weui-form-preview__hd{
        padding:0 15px;
    }
</style>