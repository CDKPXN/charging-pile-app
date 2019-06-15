<template>
<!-- 暂时无用 -->

		<!--<div id="allmap" style="width: 100%; height: {{mapHeight}}px"></div>-->
		<!--<div id="allmap":style="{width: '100%', height: mapHeight + 'px'}"></div>-->
	<div>
		<!-- <div id="allmap" v-bind:style="mapStyle"></div> -->
		<div class="mapSearch">
			<search 
				@result-click="resultClick"
				@on-change="getResult"
				:results="results"
				v-model="value"
				placeholder="请输入搜索内容"
				position="absolute"
				auto-scroll-to-top
				@on-cancel="onCancel"
				ref="search">
			</search>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import URL from '../../config/url.js'
	import {format} from '../../config/format.js'
	import { Search } from 'vux'
	
	export default {
		components:{
			Search
		},
		data() {
			return {
				mapStyle: {
					width: '100%',
					height: window.innerHeight - 50 + 'px'
					//height: '100%'

				}
			}
		},
		props: {
			// 地图在该视图上的高度
			mapHeight: {
				type: Number,
				default: 1000
			},
			// 经度
			longitude: {
				type: Number,
				default:103.06
			},
			// 纬度
			latitude: {
				type: Number,
				default: 29.67
			},
			description: {
				type: String,
				default: ''
			}
		},
		// mounted: function () {
		// 	this.$nextTick(function () {
		// 		var map = new BMap.Map("allmap");
		// 		var point = new BMap.Point(this.longitude, this.latitude);
        //         map.centerAndZoom(point, 9);
		// 		//显示当前位置
		// 		(function(){
        //             var geolocation = new BMap.Geolocation();
        //             geolocation.getCurrentPosition(function(r){
        //                 if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //                     var myIcon = new BMap.Icon('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAJhJREFUKM9jYBggoM7ggAbV0ZXoM/xgeIAGvzNooyrqYViFYfZqhg5kLiPDI4ZQDEWhQNMYEVwbhq8MXBiKuICiVgjuFIZPDAewwE8MkxGKDjD8Z7jB8BJIIuALhptA8gCyohsMzAyyKIqkgSK3UBW9BCrxRFHkxiDP8ApV0X8ckBxFCzCiZQGqogKGfUBBdOAEFM2jbgIBAOZtYmz0JV2qAAAAAElFTkSuQmCC', new BMap.Size(18,18));
        //                     var mk = new BMap.Marker(r.point,{icon:myIcon});
        //                     map.addOverlay(mk);
        //                     map.panTo(r.point);
        //                     var label = new BMap.Label("您的位置",{offset:new BMap.Size(20,-10)});
        //                     mk.setLabel(label);
        //                     //alert('您的位置：'+r.point.lng+','+r.point.lat);
        //                 }
        //                 else {
        //                     alert('failed'+this.getStatus());
        //                 }
        //             },{enableHighAccuracy: true})
        //         })();
		// 		//在地图上添加充电桩位置
		// 		//调用函数直接添加点
        //         //伪数据
        //         const getCabinetInfoUrl = format(URL.getCabinetInfo)
	
		// 		//  alert(encodeURIComponent(location.href.split('#')[0]))


		// 		axios.get(getCabinetInfoUrl).then(function(response) {

		// 			console.log(response.data)
		// 			var receiveData = response.data.content
	    //             for(var i=0; i<receiveData.length; i++){
	    //                 var point = new BMap.Point(receiveData[i].longitude,receiveData[i].latitude);
	    //                 var marker = new BMap.Marker(point);
	    //                 map.addOverlay(marker);
	    //                 var content = '充电装编号: '+ receiveData[i].cabinetId + '<br/>'+'空闲充电桩数量： ' + receiveData[i].idleNumber + '<br/>' + '<a href="javascript:void(0)" onclick="navigation('+receiveData[i].longitude+','+receiveData[i].latitude+')" style="background-color: #05b3f3;text-align: center;display: block;color: white">导航</a>';
		// 				addClickHandler(content,marker);
	    //             }

		// 		}).catch(function(error) {
		// 			console.log(error);
		// 		})
        //         var opts = {
	    //             width: 250,
	    //             height: 75,
	    //         };                

        //         function addClickHandler(content,marker){
        //             marker.addEventListener("click",function(e){
        //                 openInfo(content,e)}
        //             );
        //         }
        //         function openInfo(content,e){
        //             var p = e.target;
        //             var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        //             var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        //             map.openInfoWindow(infoWindow,point); //开启信息窗口
        //         }
		// 		map.enableScrollWheelZoom(true);
		// 	})
		// },
		methods:{
			onCancel () {
                this.$router.push('/home/state')
            }
		}
	}
</script>
<!--Add"scoped" attribute to limit CSS to this component only -->
<style scoped>
.mapSearch{
	position: absolute;
	top:0px;
	width:100%
}
</style>