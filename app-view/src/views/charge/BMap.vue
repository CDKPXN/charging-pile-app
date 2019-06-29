<template>
  <!-- 地图 -->
  <div>
    <!-- <button @click="check">wechat login</button> -->
    <!-- <div class="user_main_content">
            <img src="../../assets/user.jpg" class="user_main_img" @click="GoMine" alt="">
            <span class="user_main_header">蓉E充</span>
    </div>-->
    <div class="user_main_content" style="height:50px">
      <!-- <img src="../../assets/icons/L-user.png" class="user_main_img" @click="GoMine" alt> -->
       <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click.native="jump('/home/index')"
      ></x-icon>
      <span class="user_main_header" style="color:#fff" >蓉E充</span>
      <img
        src="../../assets/icons/siteList.png"
        class="user_main_img"
        @click="GoSiteList"
        style="right:5%"
        alt
      >
    </div>
    <!-- <div class="Sweep_yard" @click="Scanning">
            <span slot="label" style="color:white;font-size:16px;">扫码充电</span>
    </div>-->
    <!-- <div class="Sweep_yard" @click="Scanning">
      <img src="../../assets/icons/btn-scan.png" style="right:5%" alt>
    </div> -->
    <div id="mapContainer"></div>

    <baidu-map
      :scroll-wheel-zoom="true"
      :center="center"
      :zoom="zoom"
      @ready="Handler"
      class="bm-view map"
      :style="{height:height+'px'}"
      @click="CloseProp"
    >
      <!-- :icon = "{url: require('../../../static/icon3.png'), size: {width: 30, height: 30}}" -->
      <!-- 地图上面的站点的点 -->
      <bm-marker
        v-for="tmp in data"
        :key="tmp.id"
        :autoPan="true"
        :position="{lng: tmp.longitude, lat: tmp.latitude}"
        :icon="{url: require('../../../static/site.svg'), size: {width: 31, height: 37.5}}"
        :dragging="false"
        @click="Popups(tmp)"
      ></bm-marker>
          
      <bm-marker
        :position="autoLocationPoint"
        :icon="{url: require('../../../static/user.svg'), size: {width: 20, height: 20}}"
        v-if="initLocation"
      ></bm-marker>

      <!--<bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
       <!-- 定位图标 -->
      <bm-control :style="geolocationIco" >
        <img src="../../assets/geolocation.svg" alt @click="iosSelfPosition" width="35" height="35">
      </bm-control>

      <!--<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>-->
    </baidu-map>

    <div v-transfer-dom>
      <loading :show="showLoading" text></loading>
    </div>
    <!-- 电站弹窗详情 -->
    <div v-transfer-dom>
      <popup
        v-model="showPopup"
        :show-mask="false"
        :hide-on-blur="true"
        height="160px"
        position="bottom"
        width="100%"
        style="background:#fff;"
      >
        <div style="width:90%;margin-left:5%;color:#333333">
          <div style="width:100%;height: 12px;position: relative;" >
                 <x-icon type="ios-arrow-down" size="20"   class="icon"  @click.native="iconclose"></x-icon>
          </div>
          
          <div style="font-size:18px;font-weight:900px;color:#000000;margin-top:2%;">
            <span>{{name}}</span>
          </div>
          <div style="margin-top:4%;font-size:14px;">
            <span>
              电费
              <span style="color:#F98B1C;font-size:21px;">{{eprice}}</span> 元/度
            </span>&nbsp;&nbsp;&nbsp;
            <span>
              服务费
              <span style="color:#F98B1C;font-size:21px;">{{sprice}}</span> 元/度
            </span>
          </div>
          <div style="margin-top:4%;display:flex;justify-content: space-between;font-size:14px;">
            <div>
              <span>快充&nbsp;{{fastNum}}</span>
            </div>
            <div>
              <span>空闲&nbsp;{{fLeisure}}</span>
            </div>
            <div>
              <span>慢充&nbsp;{{slowNum}}</span>
            </div>
            <div>
              <span>空闲&nbsp;{{sLeisure}}</span>
            </div>
            <div>
              <button
                @click="ChargeMsg"
                style="border:1px solid #6AE2A7;color:#6AE2A7;background:transparent;padding:2px 5px;outline:none"
              >详情</button>
            </div>
          </div>
          <div style="position:absolute;top:-25px;right:5%" @click="Navigation">
            <div>
              <img src="../../assets/icons/navigation.png" style="width:50px;height:50px;" alt>
              <span
                style="font-size:12px;color:#7F7F7F;position:absolute;left:50%;margin-left:-25px;margin-top:8%"
              >{{distance}}&nbsp;&nbsp;km</span>
            </div>
          </div>
        </div>
      </popup>

      <popup
        v-model="selectMap"
        :show-mask="false"
        :hide-on-blur="true"
        height="110px"
        position="bottom"
        width="100%"
        style="background:#fff"
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

    <toast position="bottom" type="text" v-model="showtoast">再按一次退出</toast>

    <!-- 公告 -->
    <div v-if="noticeShow" class="NoticeBox">
      <img src="../../assets/icons/notice.png" class="imgNotice" alt="通知">
      <div
        style="width:75%;float:left;overflow:hidden"
        class="box"
        id="animateNotice"
        @click="jumpNotice"
      >
        <span
          style="display:inline-block;width:500px"
          class="scroll"
          key="noticeList"
        >{{noticeList.content}}</span>
      </div>
      <img src="../../assets/icons/noticeClose.png" class="imgClose" alt="关闭" @click="closeNotice">
    </div>
    <!-- 升级提示框 -->
    <!-- <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur id="upgrade_main">
        <div class="img-box">
          <img src="../../assets/images/upgrade.png" style="max-width:80%">
          <div id="upgrade_content">
            <p>升级到新版本！</p>
            <p>1.修复了若干bug</p>
            <p>2.增加公告栏</p>
            <p>3.适配更多机型，优化若干细节</p>
          </div>
          <div id="upgrade_btn">
            <button @click="upgradeApp">立即升级</button>
          </div>
        </div>
        <div @click="showHideOnBlur=false"  id="updateclose">
          <span class="vux-close close_dialog">x</span>
        </div>
      </x-dialog>
    </div> -->
    <Tabbar />
     
  </div>
</template>

<script>

import {
  Popup,
  TransferDom,
  Loading,
  Flexbox,
  FlexboxItem,
  Rater,
  dateFormat,
  Toast,
  XDialog,
  Alert
} from "vux";
import { setInterval, clearInterval } from "timers";
import axios from "axios";

import $ from "jquery";
import upGradeData from "../../config/upGrade.js"; // 版本号js
import Vue from "vue";
import * as locationUtil from '../../config/locationUtil.js'
import Tabbar from "../charge/components/tabbar"
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Loading,
    Flexbox,
    FlexboxItem,
    Rater,
    dateFormat,
    Toast,
    XDialog,
    Tabbar,
    Alert
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 18,
      markerIcon: "./static/1.png",
      showPopup: false,
      showLoading: false,
      selectMap: false,
      chargeId: "", // 发送详情的id
      data: [], // 充电站数据
      // 充电站详情数据 快充 慢充 和空闲
      eprice: "",
      sprice: "",
      fastNum: "",
      fLeisure: "",
      slowNum: "",
      sLeisure: "",
      name: "",
      district: "",
      data5: 3,
      commentLength: "",
      height: "",
      autoLocationPoint: { lng: 0, lat: 0 },
      initLocation: false,
      region: "",
      distance: "",
      backClick: 0,
      time: '',
      showtoast: false,
      // app升级提示框
      showHideOnBlur: false,
      // 公告显示
      noticeShow: false,
      noticeList: [],
      timer: "",
      refresh: "",
      geolocationIco: {},
      show:false,
     
    };
  },
//   // 设置缓存不让当前地图刷新
  beforeRouteEnter(to, from, next) { 
      if(from.name=='tabDetails'){
          to.meta.isBack=true;
          console.log('缓存哦')        
          //判断是从哪个路由过来的，
          //如果是tabDetails过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }
      next();
    },
  activated() {
  if(this.$route.meta.isBack){
    this.showPopup=true;
  }
    this.init();
  
  this.$route.meta.isBack=false;
  
},
  created() {
    this.init();
  },
  // beforeDestroy: function() {
   
  //   console.log("destroy");
    
  // },
  beforeRouteLeave(to,from,next){
     clearInterval(this.timer);
     document.removeEventListener("backbutton", this.EBackButton, false);
     next();
  },
  updated() {
  },
  mounted() {
    this.height = window.innerHeight;
    let vm = this;

    // if (navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(function(position){
    //         //onSuccees
    //         //alert("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude)
    //     } ,function(){
    //         //onError
    //         //alert("error!")
    //     } ,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    // }else{
    //     alert("不支持获取地理位置。")
    // }
  },
  methods: {
    init(){
       console.log('进入了created')
    let vm = this;
    let arr = [];
    URL.token = sessionStorage.getItem("token");
    this.backClick = 0;
    this.time=new Date(); 
    init();
    function init() {
    
      // setTimeout(function() {
        document.addEventListener("backbutton", vm.EBackButton, false);
      // }, 1000);
      vm.GetMarker();
      // vm.getApp();
      vm.getNotice();
    }

    if (!vm.token) {
      console.log("token是否存在:", vm.token);
      return;
    }
    // localStorage.removeItem("finalOrderID")
    //判断是否从状态页跳出过，跳出过则不判断是否有最后订单
    vm.$ajax({
      method: "get",
      url: "app/user/orders/finalOrder",
      headers: { token: vm.token }
    }).then(function(res) {
      if (res.data.code == 200) {
        var order = res.data.data;
        var finalOrderID = localStorage.getItem("finalOrderID");
        if (!order) {
          console.log("最近24小时内无未记录的新订单");
          return;
        }
        if (finalOrderID) {
          console.log("最后次存储的订单ID：", finalOrderID);
          if (order.id != finalOrderID) {
            clearInterval(vm.timer);
            vm.$router.push("/home/user/order");
            return;
          }
        } else {
          console.log("无最后次存储的订单ID：");
          clearInterval(vm.timer);
          vm.$router.push("/home/user/order");
        }
      }
    });
    },
    isAndroid() {
      var u = navigator.userAgent;
      var Android = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      console.log(u);
      if (Android) {
        console.log("安卓机！");
        this.isAndroid = true;
        return true;
      }
      if (isIOS) {
        console.log("苹果机！");
         this.isAndroid = false;
          return false;
      }
      console.log("不是android也不是ios");
      return false;
    },
    androidSelfPosition(map) {
    
      //定位图标的位置
       this.geolocationIco = {
        marginLeft: (this.minWidth * 88) / 100 + "px",
        marginTop: (this.minHeight * 68) / 100 + "px"
      };
      //屏蔽掉安卓定位
      // this.geolocationIco = {
      //   display: "none"
      // };
      // var optsgeo = {
      //   offset: new BMap.Size(15, 150),
      //   anchor: BMAP_ANCHOR_BOTTOM_RIGHT
      // };
      // let geolocationControl = new BMap.GeolocationControl(optsgeo);

      // map.addControl(geolocationControl);
    
      let vm = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      var geolocation = new BMap.Geolocation();
        
   
          geolocation.getCurrentPosition(
        function(r) {
          console.log("android定位成功", r);
          vm.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
          vm.autoLocationPoint = { lng: r.longitude, lat: r.latitude }; // 自定义覆盖物
        
          vm.initLocation = true;
          vm.region = r.address.city;
          console.log("center:", vm.center); // 如果这里直接使用this是不行的
          // alert( "center:");
          sessionStorage.setItem(
            "autoLocationPoint",
            JSON.stringify(vm.autoLocationPoint)
          );
        },
        { enableHighAccuracy: true }
      );
       
    
    },
    //定位方法
    iosSelfPosition() {
       let vm = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；

      if(this.isAndroid){
     
      var geolocation = new BMap.Geolocation();

      geolocation.getCurrentPosition(
        function(r) { 
          vm.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
          vm.autoLocationPoint = { lng: r.longitude, lat: r.latitude }; // 自定义覆盖物
          vm.initLocation = true;
          vm.region = r.address.city;
          // console.log("center:", vm.center); // 如果这里直接使用this是不行的
       
          sessionStorage.setItem(
            "autoLocationPoint",
            JSON.stringify(vm.autoLocationPoint)
          );
        
         
        },
        { enableHighAccuracy: true }
      );

      }else{

      
      console.log("ios开始定位")
      this.geolocationIco = {
        marginLeft: (this.minWidth * 88) / 100 + "px",
        marginTop: (this.minHeight * 68) / 100 + "px"
      };
      let vm = this;
      this.center = { lng: this.lng, lat: this.lat };      
      var onSuccess = function(position) {
        console.log('position',position)
        console.log("ios定位成功");
        var lng =  position.coords.longitude;
        var lat = position.coords.latitude;
        console.log("QQQQ",lng,lat)
      
        var point = locationUtil.wgs84tobd09(lng,lat);
        lng = point[0];
        lat = point[1];
         console.log(lng,lat)
        vm.center = {
          lng: lng,
          lat: lat
        };
        console.log("center:", vm.center); // 如果这里直接使用this是不行的
        vm.center = {
          lng: lng,
          lat: lat
        }; // 设置center属性值

        vm.autoLocationPoint = {
          lng: lng,
          lat: lat
        }; // 自定义覆盖物
        vm.initLocation = true;
        
        console.log("zoom",vm.zoom)
        console.log("center:", vm.center); // 如果这里直接使用this是不行的
        // alert( "center:");
        sessionStorage.setItem(
          "autoLocationPoint",
          JSON.stringify(vm.autoLocationPoint)
        );
      };
     
      function onError(error) {
         console.log("ios定位失败");
        alert(
          "code: " + error.code + "\n" + "message: " + error.message + "\n"
        );
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
     
      }
      
    },
    Handler({ BMap, map }) {
      this.center.lng = 104.0723725172;
      this.center.lat = 30.6633976913;
      this.zoom = 18;

      if (this.isAndroid()) {
        this.androidSelfPosition(map);
      } else {
     
        this.iosSelfPosition();
      }
    },
    iconclose(){
      this.showPopup=false;
    },
    Popups(data) {
      // 充电站详情的弹窗

      let vm = this;
      this.showPopup = false;
      this.showLoading = true;
      this.selectMap = false;
      this.$ajax({
        method: "get",
        url: "/app/chargingNet/" + data.id
      }).then(res => {
        if (res.data.code == 200) {
          vm.center.lng = data.longitude;
          vm.center.lat = data.latitude;
          vm.eprice = data.eprice / 100;
          vm.sprice = data.sprice / 100;
          vm.name = data.name;
          vm.district = data.district;
          vm.fastNum = data.fast;
          vm.fLeisure = data.fastLeisure;
          vm.slowNum = data.slow;
          vm.sLeisure = data.slowLeisure;
          vm.chargeId = data.id;
          vm.showPopup = true;
          vm.showLoading = false;
          console.log("juli");
          var distance = vm.GetDistance(
            vm.center.lat,
            vm.center.lng,
            vm.autoLocationPoint.lat,
            vm.autoLocationPoint.lng
          );
          vm.distance = distance.toFixed(2);
          vm.GetCommentLength(vm.chargeId);
        }
      });
    },
    ChargeMsg() {
      //获取电价
      let data = [];
      let Time = new Date();

      this.$ajax({
        method: "get",
        url: "/api/rate/" + this.chargeId,
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
          console.log("arr:" + res.data.data.rate);

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
              id: this.chargeId,
              price: dataStr,
              Exhibition: "/home/bmapV"
            }
          });
        }
      });
    },
    Rad(d) {
      return (d * Math.PI) / 180.0; //经纬度转换成三角函数中度分表形式。
    },
    //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
    GetDistance(lat1, lng1, lat2, lng2) {
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
      //s=s.toFixed(4);
      return s;
    },
    EBackButton() {
     
        if (
          this.showPopup == false &&
          this.showLoading == false &&
          this.selectMap == false
        ) {
          if (this.backClick > 0 && Date.parse(new Date()) - this.time < 2000) {
            // 不为0时
            this.backClick = 0;
            navigator.app.exitApp(); // app退出
          } else {
            this.showtoast = true; // 提示信息
            if (Date.parse(new Date()) - this.time < 2000) {
              // 小于2s,退出程序
              this.backClick++;
            } else {
              // 大于2s，重置时间戳，
              this.time = Date.parse(new Date());
              this.backClick = 0;
            }
          }
        } else {
          this.showPopup = false;
          this.showLoading = false;
          this.selectMap = false;
        }
       
    },
    JumpComment() {
      this.$router.push("/chargeDetails/tabComment", {
        id: this.chargeId,
        comment: 1
      });
    },
    CloseProp() {
      this.showPopup = false;
      this.showLoading = false;
      this.selectMap = false;
    },
    GetCommentLength(id) {
      // this.$ajax({
      //     method:"get",
      //     url:'/api/commont/site/'+id+'?page=1&size=5999'
      // })
      // .then(res=>{
      //     if(res.data.code==200){
      //         this.commentLength = res.data.data.list.length
      //     }
      // })
    },
    GetMarker() {
     console.log('重新获取了点')
      this.$ajax({
        method: "get",
        url: "/app/chargingNet?page=1&size=5999"
      }).then(res => {
        
        this.data=res.data.data
        this.slb(this.data);
      });
    },
    Navigation() {
      console.log(1);

      this.showPopup = false;
      this.showLoading = false;
      this.selectMap = true;
    },
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
    NavigationBaidu() {
      let vm = this;
      var scheme = this.getScheme("baidumap://", "com.baidu.BaiduMap");
      appAvailability.check(
        scheme, // URI Scheme or Package Name
        function() {
          if (scheme == "baidumap://") {
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
          // Success callback
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
    // 跳转到我的
    GoMine() {
      this.$router.push("/home/mineV");
      //console.log(Date.parse(new Date()))
    },
    // 跳转到电站列表
    GoSiteList() {
      let dataStr = JSON.stringify(this.autoLocationPoint); // JSON对象转JSON字符串
      this.$router.push({
        path: "/home/SiteListV"
      });
    },
    //扫码充电
    Scanning() {
      if (sessionStorage.getItem("token") == null) {
        this.$router.push("/login");
      } else {
        let vm = this;
        vm.token = sessionStorage.getItem("token");
        this.$ajax({
          method: "get",
          url: "app/charging",
          headers: { token: vm.token }
        }).then(res => {
          if (res.data.code == 400) {
            // 调用cordova的扫描二维码
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

            //vm.chargeSet("2")
            cloudSky.zBar.scan(
              {
                text_title: "", // Android only
                text_instructions: "请把相机中的红线对准二维码", // Android only
                camera: "back", // defaults to "back"
                flash: "auto", // defaults to "auto". See Quirks
                drawSight: true //defaults to true, create a red sight/line in the center of the scanner view.
              },
              function(s) {
                if (s !== "") {
                  vm.chargeSet(s);
                } else {
                  vm.$router.push("/home/bmapV");
                }
              },
              function(s) {
                console.log("扫码失败：", s);
              }
            );
          } else if (res.data.code == 200) {
            console.log(res.data);
            vm.$router.push("/home/user/order");
          }
        });
        //vm.chargeSet("802")
      }
    },
    chargeSet(text) {
      // 获取二维码点桩中的id，去设置充电类型
      this.$router.push({
        path: "/chargeSetting",
        query: {
          chargeId: text
        }
      });
    },
    // // 获得app版本
    // getApp() {
      
    //   let vm = this;
    //   let upGrade = sessionStorage.getItem("upGrade");
    //   // sessionStorage.removeItem("upGrade");
    //   if (upGrade !== null) {
    //     console.log("upGradeData=========" + upGrade);
    //     return;
    //   }
    //   vm.$ajax({
    //     method: "get",
    //     url: "/app/version",
    //     headers: { token: vm.token }
    //   }).then(res => {      
    //     if (res.data.code == 200) {
    //       let data = res.data.data;
    //       console.log("获取到的版本",data)
    //       var serverVersion = parseInt(data.replace(/\./g, ""));
    //       var locatVersion = parseInt(upGradeData.upGrade.replace(/\./g, ""));
    //       console.log("服务器：" + serverVersion + ",app版本：" + locatVersion);
    //       if (locatVersion < serverVersion) {
    //         this.showHideOnBlur = true;
    //         sessionStorage.setItem("upGrade", true);
    //       } else {
    //         this.showHideOnBlur = false;
    //       }
    //     }
    //   });
    // },
    // 升级App
    // upgradeApp() {
    //   // 跳转到应用市场升级

    //   var url = "http://chargingpile.companiontek.com/appd/index.html";
    //   window.location.href = url;
    //   this.showHideOnBlur = false;
    // },
    //获取公告列表
    getNotice() {
      let vm = this;
      vm.$ajax({
        method: "get",
        url: "/app/annunciate",
        headers: { token: sessionStorage.getItem("token") }
      }).then(res => {
        if (res.data.code == 200) {
          vm.noticeList = res.data.data[res.data.data.length - 1];
          if (res.data.data.length == 0) {
            this.noticeShow = false;
          } else {
            let get_content = sessionStorage.getItem("noticeContent");
            // if( get_content != '' && get_content != null){
            //     this.noticeShow = false
            // }else{
            //     this.noticeShow = true
            // }
            let noticeFlag = sessionStorage.getItem("noticeFlag");
            vm.noticeShow = noticeFlag ? false : true;
          }
          // console.log("hahah")
          // console.log(vm.noticeList)
          // console.log("hahah")
        }
        let num = Vue.prototype.minWidth - 100;

        function goMarginLeft() {
          if (num <= -vm.noticeList.content.length * 13) {
            num = Vue.prototype.minWidth - 100;
          }
          num -= 1;

          $(".scroll").css({
            "margin-left": num
          });
        }
        //设置滚动速度
        clearInterval(vm.timer);
        if (vm.noticeList.content) {
          vm.timer = setInterval(goMarginLeft, 80);
        }
      });
    },
    /**
     * 关闭公告和跳转公告都保存sessionStorage,用于created钩子函数加载时判断公告是否显示 */
    // 点击内容跳转到系统公告
    jumpNotice() {
      sessionStorage.setItem("noticeContent", "isContent");
      this.flag = false;
      this.$router.push({
        path: "/home/notice/notice"
      });
    },
    // 关闭系统公告
    closeNotice() {
      this.noticeShow = false;
      sessionStorage.setItem("noticeContent", "isContent");
      sessionStorage.setItem("noticeFlag", true);
    }
  }
};
</script>

<style scoped>
.icon{
  position: absolute;
  top:1%;
  left:50%;
}
.bm-view {
  /** 地图大小样式 */
  width: 100%;
}
.map {
  width: 100%;
}
.msgHeader {
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  font-family: "serif";
  margin-top: 10px;
  margin-bottom: 6px;
}
.msgBody {
  font-size: 12px;
  font-weight: 400;
  text-align: center;
}
.msgBody img {
  position: relative;
  top: 3px;
}
.hrMargin {
  margin: 10px;
}
.number {
  font-size: 18px;
  font-weight: 500;
}
.border {
  border: solid 0.5px #c7c3c3;
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
/* .Sweep_yard{
    height:150px;
    width:150px;
    background:#ff5500;
    border:none;
    line-height:42px;
    text-align:center;
    border-radius:100%;
    width:30%;
    position:fixed;
    z-index: 99;
    left:35%;
    bottom:75px;
} */
.Sweep_yard {
  border: none;
  text-align: center;
  position: fixed;
  z-index: 99;
  left: 25%;
  width: 50%;
  bottom: 35px;
}
.Sweep_yard img {
  height: 50%;
  width: 50%;
}
.vux-popup-dialog {
  overflow-y: visible;
  box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.5);
}
/* 升级样式 */
#upgrade_main .weui-dialog {
  background-color: transparent !important;
  padding: 0 15px !important;
}
.close_dialog {
  color: white;
  right: 2px;
  font-size: 28px;
  height: 30px;
  width: 30px;
  background: rgba(0, 0, 0, 0.452);
  text-align: center;
  line-height: 21px;
  border-radius: 100%;
  top: 3%;
  right: 3%;
  position: absolute;
  z-index: 9999 !important;
}
#upgrade_content {
  position: absolute;
  top: 40%;
  left: 15%;
  text-align: left;
  color: #333333;
}
#upgrade_content p:first-child {
  font-size: 20px;
  padding-bottom: 10px;
}
#upgrade_btn {
  position: absolute;
  bottom: 30px;
  width: 100%;
  left: 0;
  outline: none;
}
#upgrade_btn button {
  height: 40px;
  width: 70%;
  color: white;
  font-size: 18px;
  background: rgba(111, 225, 160, 1);
  border-radius: 40px;
  border: 0;
}
/* 顶部公告样式 */
.NoticeBox {
  position: absolute;
  z-index: 99;
  top: 50px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  width: 100%;
  height: 30px;
  line-height: 32px;
  font-size: 14px;
}
.NoticeBox img {
  height: 14px;
  width: 14px;
}
.imgNotice {
  float: left;
  margin: 2.3% 4% 0 5%;
}
.imgClose {
  float: right;
  margin: 2.3% 4% 0 0;
}
</style>
