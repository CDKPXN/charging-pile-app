<template>
  <div>
    <div class="user_main_content" style="height:50px">
      <img src="../../assets/icons/user_new.png" class="user_main_img" @click="GoMine" alt>
      <div style="width:70%;position:relative; margin-left: 16%;height: 100%;line-height: 50px;">
       
          <!-- <search
            id="ww"
            v-model="searchSite"
            ref="search"
            placeholder="输入目的地或充电站"
            @on-focus="jump('/home/SiteListV')"
            cancel-text=" "
            :auto-fixed="false"
            style="width:90%"
          ></search> -->
             <icon type="search" style="position:absolute;left:8px;top:18px;"></icon>
             <input type="text"  placeholder="输入目的地或充电站"   style="height:28px;border-radius:24px;border:0px;width:80%;padding-left:30px;" v-model="value" @click="jump('/home/SiteListV')">
        
      </div>
      <img
        src="../../assets/icons/map1.png"
        class="user_main_img"
        @click="GoSiteList"
        style="right:5%"
        alt
      >
    </div>
    <scroller lock-x scrollbar-y :height="height">
      <div>
        <flexbox v-for="(item,index) in searchArr" :key="index"  v-show="item.is_del==0" style="height:120px;color:#333333;"  >
          <flexbox-item style="height:120px;position:relative"  @click.native="ChargeMsg(item.id)">
            <div
              style="text-align:center;position:absolute;left:50%;top:50%;margin-top:-50px;margin-left:-50px"
            
            >
              <img
                style="width:100px"
                width="100px"
                height="100px"
                :src='item.src'
                alt
              >
            </div>
          </flexbox-item>
          <flexbox-item style="margin-left:-0.4%" @click.native="ChargeMsg(item.id)">
            <div style="width:500px">
              <span
                style="font-size:14px;display:inline-block;width:156px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap"
              >{{item.name}}</span>
            </div>
            <div
              style="font-size:12px;color:#999999;width:160%;margin-bottom:5%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;"
            >
              <span
                style="display:inline-block;width:154px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap"
              >{{item.addr}}</span>
            </div>
            <div style="font-size:14px;width:500px;margin-bottom:5%">
              <span>
                电费
                <span style="color:#F98B1C">{{item.eprice / 100}}</span>
              </span>&nbsp;&nbsp;&nbsp;
              <span>
                服务费
                <span style="color:#F98B1C">{{item.sprice / 100}}</span>
              </span>
            </div>
            <div style="font-size:14px;width:500px">
              <span>
                快充 {{item.fast}}/
                <span style="color:#66CC8F">{{item.fastLeisure}}</span>
              </span>&nbsp;&nbsp;&nbsp;
              <span>
                慢充 {{item.slow}}/
                <span style="color:#66CC8F">{{item.slowLeisure}}</span>
              </span>
            </div>
          </flexbox-item>
          <flexbox-item style="position:relative">
            <div
              style="text-align:center;position:absolute;left:50%;top:50%;margin-top:-30px;margin-left:-15px"
              @click="Navigation(item.name,item.latitude,item.longitude)"
            >
              <img src="../../assets/icons/siteNav.png" width="30px" height="30px" alt>
              <span
                style="color:#7F7F7F;font-size:12px;display:inline-block;margin-top:20%"
              >{{item.distance}}&nbsp;km</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </scroller>

    <popup
      v-model="selectMap"
      :show-mask="false"
      :hide-on-blur="true"
      style="background:#fff;position:absolute;bottom:0;width:100%;height:110px"
    >
      <flexbox>
        <flexbox-item @click.native="NavigationGaode">
          <div class="flex-demo msgHeader">高德地图</div>
        </flexbox-item>
      </flexbox>
      <hr class="hrMargin border">
      <flexbox>
        <flexbox-item @click.native="NavigationBaidu">
          <div class="flex-demo msgHeader">百度地图</div>
        </flexbox-item>
      </flexbox>
    </popup>
  
  </div>
</template>
<script>
import store from "../../config/store.js";
import url from "../../config/url.js";

import {
  XHeader,
  Group,
  Cell,
  Scroller,
  XButton,
  Flexbox,
  FlexboxItem,
  Popup,
  Search,
  XInput,
  Icon,
  Toast
} from "vux";
import axios from "axios";
export default {
  components: {
    XHeader,
    Group,
    Cell,
    Scroller,
    XButton,
    Flexbox,
    FlexboxItem,
    Popup,
    Search,
    XInput,
    Icon,
    Toast
  },
  data() {
    return {
      data: [],
      selectMap: false,
      center: { lng: 0, lat: 0 },
      autoLocationPoint: { lng: 0, lat: 0 },
      distance: "",
      name: "",
      height: "",
      searchSite: "",
      searchArr: [],
      src:'',
      value:'',
      
    };
  },
  watch: {
    value( ) {
      let vm = this;
      vm.searchArr = [];
      var reg = new RegExp(this.value, "g");
      this.data.map(m => {
        var nameFilter = reg.test(m.name);
        var addrFilter = reg.test(m.addr);
        if (nameFilter || addrFilter) {
          vm.searchArr.push(m);
        }
      });
    }
  },
  mounted() {
    let Height = window.innerHeight - 50;
    this.height = Height + "px";
  },
  methods: {
    jump(url) {
      this.$router.push(url);
    },
    // 跳转到我的
    GoMine() {
      this.selectMap = false;
      this.$router.push("/home/mineV");
    },
    // 跳转到地图显示
    GoSiteList() {
      this.selectMap = false;
      this.$router.push("/home/bmapV");
    },
    //获取电价
    ChargeMsg(chargeId) {
      let data = [];
      let Time = new Date();
      this.$ajax({
        method: "get",
        url: "/api/rate/" + chargeId,
        headers: { token: sessionStorage.getItem("token") }
      }).then(res => {
        if (res.data.code == 200) {
          let tableDataTime = [
            "00:30",
            "01:00",
            "01:30",
            "02:00",
            "02:30",
            "03:00",
            "03:30",
            "04:00",
            "04:30",
            "05:00",
            "05:30",
            "06:00",
            "06:30",
            "07:00",
            "07:30",
            "08:00",
            "08:30",
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
            "23:00",
            "23:30",
            "24:00"
          ];
          let ePriceArr = [];
          let fPriceArr = [];
          let arr = eval("(" + res.data.data.rate + ")"); // JSON字符串转JSON对象
          for (var j = 0; j < arr.length; j++) {
            let ePrice = arr[j].ePrice / 100;
            let sPrice = arr[j].sPrice / 100;
            ePriceArr.push({
              time: tableDataTime[j],
              value: ePrice,
              type: "电费"
            });
            fPriceArr.push({
              time: tableDataTime[j],
              value: sPrice,
              type: "服务费"
            });
          }
          data = ePriceArr.concat(fPriceArr);
          let dataStr = JSON.stringify(data); // JSON对象转JSON字符串
          this.$router.push({
            path: "/chargeDetails",
            query: {
              id: chargeId,
              price: dataStr,
              Exhibition: "/home/SiteListV"
            }
          });
        }
      });
    },
    //经纬度转换成三角函数中度分表形式。
    Rad(d) {
      return (d * Math.PI) / 180.0;
    },
    //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
    GetDistance(lat1, lng1, lat2, lng2) {
      // console.log("22222",lat1, lng1, lat2, lng2)
      var radLat1 = this.Rad(lat1);
      var radLat2 = this.Rad(lat2);
      var a = radLat1 - radLat2;
      var b = this.Rad(lng1) - this.Rad(lng2);
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137; // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000; //输出为公里
      return s;
    },
    // 地图导航
    Navigation(name, deslat, deslon) {
      let vm = this;
      this.selectMap = false;
      setTimeout(function() {
        vm.selectMap = true;
      }, 1000);
      this.name = name;
      this.center.lng = deslon;
      this.center.lat = deslat;
    },
    // 高德
    NavigationGaode() {
      let vm = this;
      var scheme = this.getScheme("iosamap://", "com.autonavi.minimap");
      appAvailability.check(
        scheme, // URI Scheme or Package Name
        function() {
          // Success callback
          var transurl =
            "http://api.map.baidu.com/geoconv/v1/?coords=" +
            vm.center.lng +
            "," +
            vm.center.lat +
            "&from=5&to=3&ak=W9FCHNpFQ7vOg3ISfH8rIakScfPGWOZ5";
          axios
            .get(transurl)
            .then(function(response) {
              if (scheme == "iosamap://") {
                //ios
                var url =
                  "iosamap://path?sourceApplication=蓉E充&sid=BGVIS1&did=BGVIS2&dlat=" +
                  response.data.result[0].y +
                  "&dlon=" +
                  response.data.result[0].x +
                  "&dname=" +
                  vm.name +
                  "&dev=0&t=0";
                window.location.href = url;
                return;
              }

              //var url = "androidamap://navi?sourceApplication=蓉E充&lat="+response.data.result[0].y+ "&lon="+ response.data.result[0].x+ "&dev=0"
              var url =
                "amapuri://route/plan/?sid=BGVIS1&slat=" +
                vm.autoLocationPoint.lat +
                "&slon=" +
                vm.autoLocationPoint.lng +
                "&sname=我的位置&did=BGVIS2&dlat=" +
                response.data.result[0].y +
                "&dlon=" +
                response.data.result[0].x +
                "&dname=" +
                vm.name +
                "&dev=0&t=0";

              window.location.href = url;
            })
            .catch(function(error) {
              console.log(error);
            });
        },
        function() {
          // Error callback
          var url = "http://daohang.amap.com/";
          window.location.href = url;
        }
      );
    },
    // 百度
    NavigationBaidu() {
      let vm = this;
      var scheme = this.getScheme("baidumap://", "com.baidu.BaiduMap");
      appAvailability.check(
        scheme, // URI Scheme or Package Name
        function() {
          // Success callback

          if (scheme == "baidumap://") {
            //ios
            var url =
              "baidumap://map/marker?location=" +
              vm.center.lat +
              "," +
              vm.center.lng +
              "&title=我的位置&content=" +
              vm.name +
              "&src=ios.baidu.openAPIdemo";
            window.location.href = url;
            return;
          }

          var url =
            "bdapp://map/direction?region=" +
            vm.region +
            "&origin=" +
            vm.autoLocationPoint.lat +
            "," +
            vm.autoLocationPoint.lng +
            "&destination=name:" +
            vm.name +
            "|latlng:" +
            vm.center.lat +
            "," +
            vm.center.lng +
            "&mode=driving&src=andr.baidu.openAPIdemo";
          window.location.href = url;
        },
        function() {
          // Error callback
          console.log(" Error callback");
          var url = "http://map.baidu.com/zt/client/index/";
          window.location.href = url;
        }
      );
    },

    getScheme(schemeIos, schemeAndroid) {
      // Don't forget to add the org.apache.cordova.device plugin!
      if (device.platform === "iOS") {
        return schemeIos;
      } else if (device.platform === "Android") {
        return schemeAndroid;
      }
    },
    getSiteList() {
      let vm = this;
      vm.$ajax({
        method: "get",
        url: "/app/chargingNet?page=1&size=5999"
      }).then(res => {
        if (res.data.code == 200) {
          vm.data = res.data.data;
          vm.data.map(item => {
            vm.center.lng = item.longitude;
            vm.center.lat = item.latitude;
            if(item.src!==null){
               item.src=url.LOCALSRC+'/'+item.src;
            }else{
               item.src=url.LOCALSRC+'/'+'no_img.jpg';
            }
            var distance = vm.GetDistance(
              vm.center.lat,
              vm.center.lng,
              vm.autoLocationPoint.lat,
              vm.autoLocationPoint.lng
              
            );
            vm.distance = distance.toFixed(2);
            item.distance = vm.distance;
          });
          // 对站点从近到远排列
          var compare = function(prop) {
            return function(obj1, obj2) {
              var val1 = obj1[prop];
              var val2 = obj2[prop];
              if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
              }
              if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }
            };
          };
          vm.data.sort(compare("distance"));
          vm.searchArr = vm.data;     
        }
                 
      });
    },
   
    
  
  },
  created() {
    let vm = this;
       vm.autoLocationPoint = eval(
      "(" + sessionStorage.getItem("autoLocationPoint") + ")"
    ); // JSON字符串转JSON对象
    vm.getSiteList(); 
  
  }
};
</script>
<style lang="less"scoped>
 input::-webkit-input-placeholder {
   text-align: center;
   }
.user_main_img {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  margin-left: 5%;
}
.user_main_header {
  position: absolute;
  top: 50%;
  margin-top: -16px;
  font-size: 20px;
  left: 50%;
  font-weight: 500;
  margin-left: -20px;
}

.user_main_content {
  /* background:white; */
  background: -webkit-linear-gradient(
    left,
    #f05225,
    #f05225
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #f05225,
    #f05225
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #f05225,
    #f05225
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    #f05225,
    #f05225
  ); /* 标准的语法（必须放在最后） */
  height: 40px;
  position: relative;
}
.msgHeader {
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  font-family: "serif";
  margin-top: 10px;
  margin-bottom: 6px;
}
</style>
<style>
#ww > .weui-search-bar {
  background-color: #f05225 !important;
}
.weui-search-bar:after {
  border-bottom: none;
}
</style>

