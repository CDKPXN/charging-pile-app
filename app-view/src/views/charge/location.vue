<template>
<!-- 地图 -->
    <div class="newend" style="height: 100%;">
    	<!--<h2 class="vx-header vx-size-24">phone : {{phone}}</h2>
    	<h2 class="vx-header vx-size-24">openid : {{openid}}</h2>-->
       	<b-map-component></b-map-component>
    </div>
</template>

<script>
	import BMapComponent from './BMapComponent.vue'
	import store from '../../vuex/store.js'
	
	export default {
        components:{
            BMapComponent
        },
        data () {
			return {
				phone: '',
				openid: ""
			}
		}, 
        created: function () {
        	console.log(this.$route.query.openid)
        	console.log(this.$route.query.phoneNumber)
     		
        	this.openid = store.getters.getOpenid
			if(this.openid == undefined || this.openid == ""){
				store.commit('setOpenid', this.$route.query.openid);
				this.openid = this.$route.query.openid
			}
			
	      	this.phone = store.getters.getPhone
			if(this.phone == undefined || this.phone == ""){
				store.commit('setPhone', this.$route.query.phoneNumber);
				this.phone = this.$route.query.phoneNumber
			}
			
			
//			location.href="http://api.map.baidu.com/direction?origin=38.89778,115.709684&destination=39.89778,116.709684&mode=driving&region=北京&output=html";  
        }
    }
	

	
</script>