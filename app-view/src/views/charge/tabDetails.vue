<template>
   
  <!-- 充电站详情 -->
  
  <scroller lock-x scrollbar-y :height="height">
    <div>
      <flexbox style="display:flex;justify-content:space-between">
        <flexbox-item style="margin-left:6px;">
          <img
            style="width:100px"
            :src="src"
            alt
          >
        </flexbox-item>
        <flexbox-item style="margin-left:-50px">
          <div class="flex-demo">
            <span style="font-size:14px">{{name}}</span>
            <br>
            <span style="font-size:12px">地址：{{addr}}</span>
          </div>
          <!--<rater v-model="data5" star="✩" active-color="#FF9900" disabled :font-size="16" :margin="0"></rater>
          <span style="font-size:14px;color:#ff9900">5分</span>-->
        </flexbox-item>
        <div style="left:50%;top:50%;margin-top:8px;margin-right:10px" @click="Navigation()">
          <img src="../../assets/icons/siteNav.png" width="30px" height="30px" alt>
          <span
            style="color:#7F7F7F;font-size:12px;display:inline-block;margin-top:20%"
          >&nbsp;{{distance}}km</span>
        </div>
      </flexbox>
      <divider>电桩状态</divider>
      <flexbox>
        <flexbox-item>
          <div class="flex-demo msgBody" >
            快充&nbsp;&nbsp;
            <span class="number">{{fastNum}}</span>
            &nbsp;&nbsp;
            空闲&nbsp;&nbsp;
            <span class="number">{{fLeisure}}</span>
          </div>
        </flexbox-item>
        <span>|</span>
        <flexbox-item>
          <div class="flex-demo msgBody">
            慢充&nbsp;&nbsp;
            <span class="number">{{slowNum}}</span>
            &nbsp;&nbsp;
            空闲&nbsp;&nbsp;
            <span class="number">{{sLeisure}}</span>
          </div>
        </flexbox-item>
      </flexbox>
      <divider></divider>
      <cell style="font-size:12px" title="注意" :border-intent="false">充电免费停车两小时，请向停车收费人员出示充电记录</cell>
     
      <group>
        <cell title="电价" value></cell>
        <cell-form-preview :list="priceStr"></cell-form-preview>
      </group>
      <cell style="font-size:12px" title="当前电价" :border-intent="false">{{eprice}}元/度</cell>
      <cell style="font-size:12px" title="服务费" :border-intent="false">{{sprice}}元/度</cell>
      <cell style="font-size:12px" title="开放时间">00:00-24:00</cell>
      <divider></divider>
         
    </div>
    <div > 
    <popup
      v-model="selectMap"
      :show-mask="true"
      :modal-append-to-body="false"
      :hide-on-blur="true"
       v-transfer-dom
      style="background:#fff;position:absolute;bottom:0;width:100%;height:110px"
    >
      <flexbox 
      >
        <flexbox-item @click.native="NavigationGaode">
          <div class="flex-demo msgHeader">高德地图</div>
        </flexbox-item>
      </flexbox>
      <hr class="hrMargin border">
      <flexbox  
      >
        <flexbox-item @click.native="NavigationBaidu">
          <div class="flex-demo msgHeader">百度地图</div>
        </flexbox-item>
      </flexbox>
    </popup>
    </div>
  </scroller>
 
  

</template>
    
<script>
import {
  Cell,
  Group,
  Divider,
  Flexbox,
  FlexboxItem,
  Rater,
  XButton,
  Swiper,
  SwiperItem,
  VChart,
  VLine,
  VArea,
  VTooltip,
  VLegend,
  VScale,
  CellFormPreview,
  Scroller,
  Popup,
  TransferDom
} from "vux";
import ChargeTabbar from "./components/chargeTabbar";
import url from "../../config/url.js";
import axios from "axios";
export default {
  name: "TabDetails",
   directives: {
    TransferDom
  },
  components: {
    Cell,
    Group,
    Divider, //分割线
    Flexbox,
    FlexboxItem,
    Rater,
    XButton,
    ChargeTabbar,
    Swiper,
    SwiperItem,
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VScale,
    CellFormPreview,
    Scroller,
    Popup,
    
  },
  data() {
    return {
      data5: 5,
      name: "",
      fLeisure: "",
      fastNum: "",
      sLeisure: "",
      slowNum: "",
      addr: "",
      eprice: "", //电价
      sprice: "",
      priceStr: [],
      data: [],
      height: "",
      selectMap: false,
      center: { lng: 0, lat: 0 },
      distance: "",
      autoLocationPoint: { lng: 0, lat: 0 },
      src:url.LOCALSRC+'/'+'no_img.jpg',
    };
  },
  watch: {
    data5(val) {
      console.log(val);
    }
  },
  beforeCreate: function() {},
  mounted() {
    let Height = window.innerHeight - 90;
    this.height = Height + "px";
  },
  created() {
    let vm = this;
    vm.autoLocationPoint = eval(
      "(" + sessionStorage.getItem("autoLocationPoint") + ")"
    ); // JSON字符串转JSON对象
    // console.log("电站id");
    // console.log(this.$route.query.id);
    let dataArr = eval("(" + this.$route.query.price + ")"); // JSON字符串转JSON对象
    this.data = dataArr;
    this.getChargeMsg();
    this.getElectricityPrice();
    // console.log("dataArr");
    // console.log(dataArr);
    var timep = { dataArr: dataArr[0], tmp: "00:00" };
    console.log("timep：" + timep);
    for (var i = 1; i < dataArr.length; i++) {
      if (dataArr[i].type == "电费") {
        //console.log("dataArr[i].value:" + dataArr[i].value)
        if (!(timep.dataArr.value == dataArr[i].value)) {
          this.priceStr.push({
            label: timep.tmp + "-" + dataArr[i - 1].time,
            value: timep.dataArr.value + "元/度"
          });
          timep.dataArr = dataArr[i];
          timep.tmp = dataArr[i - 1].time;
        }
        if ("24:00" == dataArr[i].time) {
          this.priceStr.push({
            label: timep.tmp + "-" + dataArr[i].time,
            value: timep.dataArr.value + "元/度"
          });
        }
      }
    }

    for (var i = 0; i < this.priceStr.length; i++) {
      var tmp = this.priceStr[i];
      var f = false;
      for (var j = i + 1; j < this.priceStr.length; j++) {
        if (this.priceStr[i].value == this.priceStr[j].value) {
         
          this.priceStr[i].label += " " + this.priceStr[j].label;
          this.priceStr.splice(j, 1);
        }
      }
    }

    this.$ajax({
      method: "get",
      url: "/app/chargingNet?page=1&size=5999"
    }).then(res => {
      if (res.data.code == 200) {
        this.data = res.data.data;
        this.data.map(item => {
          //取出当前id对应的站点经纬度
          if (item.id == this.$route.query.id) {
            vm.center.lng = item.longitude;
            vm.center.lat = item.latitude;
            // console.log("555555", vm.center.lat);
            var distance = vm.GetDistance(
              vm.center.lat,
              vm.center.lng,
              vm.autoLocationPoint.lat,
              vm.autoLocationPoint.lng
            );
            vm.distance = distance.toFixed(2);
            item.distance = vm.distance;
            if(item.fid!==null){
             vm.$ajax({
               method:'get',
               url:'file/record/'+item.fid,
               headers: { token: sessionStorage.getItem("token") }
                }).then(res=>{
              if(res.data.code==200){
                this.src=url.LOCALSRC+'/'+res.data.data.rname;  
              }
               })
          }
          }      
        });
        
      }
    });
    
  },
  methods: {
    gotoChargeList() {
      this.$router.push({
        path: "/chargeDetails/chargeList",
        query: {
          id: this.$route.query.id
        }
      });
    },

    getChargeMsg() {
      // 获取电站详情
      let vm = this;
      this.$ajax({
        method: "get",
        url: "/app/chargingNet/" + this.$route.query.id
      }).then(res => {
        console.log("res:::::::::::::");
        console.log("787884949", res);
        vm.name = res.data.data.name;
        vm.addr = res.data.data.addr;
        vm.fLeisure = res.data.data.fastLeisure;
        vm.fastNum = res.data.data.fast;
        vm.slowNum = res.data.data.slow;
        vm.sLeisure = res.data.data.slowLeisure;
        vm.sprice = res.data.data.sprice / 100;
        vm.eprice = res.data.data.eprice / 100;
        console.log(res.data.data.sprice);
        console.log(res.data.data.eprice);
      });
    },
    getElectricityPrice() {
      // 获取电价详情
      let vm = this;
      this.$ajax({
        method: "get",
        url: "/api/price/" + this.$route.query.id
      }).then(res => {
        console.log("电价");
        console.log(res.data.data);
        console.log("电价");
        // vm.price = res.data.data.data
        // vm.eprice = res.data.data.data.eprice[0]
      });
    },
    // 地图导航
    Navigation(name, deslat, deslon) {
      let vm = this;
      this.selectMap = false;
      setTimeout(function() {
        vm.selectMap = true;
      }, 1000);
      // this.name = name
      // this.center.lng = deslon
      // this.center.lat = deslat
    },
    // 高德
    NavigationGaode() {
      console.log("搞得");
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
          var url = "http://map.baidu.com/zt/client/index/";
          window.location.href = url;
        }
      );
    },
    //经纬度转换成三角函数中度分表形式。
    Rad(d) {
      return (d * Math.PI) / 180.0;
    },
    //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
    GetDistance(lat1, lng1, lat2, lng2) {
    //   console.log("竟来了", lat1, lng1, lat2, lng2);
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
      s = s * 6378.137; // EARTH_RADIUS;地球半径
      s = Math.round(s * 10000) / 10000; //输出为公里
     
      return s;
    },
    getScheme(schemeIos, schemeAndroid) {


      if (device.platform === "iOS") {
        return schemeIos;
      } else if (device.platform === "Android") {
        return schemeAndroid;
      }
    }
  }
};
</script>

<style >
.weui-cells{
  height:160px
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p {
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.xs-container {
  height: 100%;
}
.msgBody{
  margin-left: 20%;
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
