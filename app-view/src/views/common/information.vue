<template>
<!-- 暂时无用 -->
    <div class="newend">
        <panel header="资讯" :list="list"></panel>
    </div>
</template>
<script>
		import Vue from 'vue'
    import {  Group ,Panel,XButton, FormPreview} from 'vux'
    import URL from '../../config/url.js'
    import {format} from '../../config/format.js'
    import store from '../../vuex/store.js'
    import axios from 'axios'


    
    export default {
        components: {
            Group,
            Panel,
        },
        data () {
            return {
                list: []
            }
        },
        mounted: function () {
						this.$nextTick(function () {
		        		var _this = this;
			        	const getNewsUrl = format(URL.getNews)
					
								axios.get(getNewsUrl).then(function(response) {
											
										console.log(response.data);
										
										var receiveData = response.data.content
										
										if(response.data.errcode == "SUCCESS"){
												receiveData.forEach(function(val,index,arr){
														console.log(val);
														_this.list[index] = {
																src : val.imgUrl,
																title : val.title,
																desc : val.abstact,
																url : val.hyperlink
														}
				
												    Vue.set(_this.list, index, _this.list[index])
												})
										}
										console.log(123)
										console.log(_this.list)
									      	
							  }).catch(function(error) {
										console.log(error);
								})
		        })
						
        }
    }
</script>