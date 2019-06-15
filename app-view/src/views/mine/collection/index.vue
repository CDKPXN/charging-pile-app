<template>
  <div>
    <div class="user_main_content" style="height:50px">
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click.native="jump('/home/mineV')"
      ></x-icon>
      <span style="color:#fff">我的收藏</span>
    </div>
     <!-- 我的收藏 -->
    <scroller lock-x scrollbar-y :height="height">
      <div>
        <flexbox v-for="(item,index) in data" :key="index" style="height:120px;color:#333333;">
          <flexbox-item style="height:120px;position:relative">
            <div
              style="text-align:center;position:absolute;left:50%;top:50%;margin-top:-50px;margin-left:-50px"
              @click="ChargeMsg(item.id)"
            >
              <img
                style="width:100px"
                width="100px"
                height="100px"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530782507271&di=b835a8a6cc6007640222719b83d9b036&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D07b7027d3212b31bd361c569ef605316%2F562c11dfa9ec8a13171dc9dafc03918fa0ecc081.jpg"
                alt
              >
            </div>
          </flexbox-item>
          <flexbox-item style="margin-left:-0.4%">
            <div style="width:500px">
              <span style="font-size:16px;">{{item.name}}</span>
            </div>
            <div
              style="font-size:12px;color:#999999;width:160%;margin-bottom:5%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;"
            >
              <span>{{item.addr}}</span>
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
              <img src="../../../assets/icons/siteNav.png" width="30px" height="30px" alt>
              <span
                style="color:#7F7F7F;font-size:12px;display:inline-block;margin-top:20%"
              >{{item.distance}}&nbsp;km</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </scroller>
    <!-- 分割线 -->
    <divider>
      <span class="thire-login-span">常用站点</span>
   </divider>
    <!-- 常用站点 -->
      <scroller lock-x scrollbar-y :height="height">

      <div>
        <flexbox v-for="(item,index) in overuser" :key="index" style="height:120px;color:#333333;">
          <flexbox-item style="height:120px;position:relative">
            <div
              style="text-align:center;position:absolute;left:50%;top:50%;margin-top:-50px;margin-left:-50px"
              @click="ChargeMsg(item.id)"
            >
              <img
                style="width:100px"
                width="100px"
                height="100px"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530782507271&di=b835a8a6cc6007640222719b83d9b036&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D07b7027d3212b31bd361c569ef605316%2F562c11dfa9ec8a13171dc9dafc03918fa0ecc081.jpg"
                alt
              >
            </div>
          </flexbox-item>
          <flexbox-item style="margin-left:-0.4%">
            <div style="width:500px">
              <span style="font-size:16px;">{{item.name}}</span>
            </div>
            <div
              style="font-size:12px;color:#999999;width:160%;margin-bottom:5%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;"
            >
              <span>{{item.addr}}</span>
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
              <img src="../../../assets/icons/siteNav.png" width="30px" height="30px" alt>
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
import store from "../../../config/store.js";
let collectionIdArr = []; //用于存放收藏站点的id的数组

import {
  XHeader,
  Group,
  Cell,
  Scroller,
  XButton,
  Flexbox,
  FlexboxItem,
  Popup,
  Divider,
} from "vux";
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
    Divider,
  },
  data() {
    return {
      data: [],
      selectMap: false,
      center: { lng: 0, lat: 0 },
      autoLocationPoint: { lng: 0, lat: 0 },
      distance: "",
      distance2:"",
      name: "",
      height: "auto",
      overuser:[]
    };
  },
  created() {
     let vm=this;
    collectionIdArr = JSON.parse(localStorage.getItem("collectionIdArr"));
    vm.autoLocationPoint =  eval('(' + sessionStorage.getItem("autoLocationPoint")+ ')');  // JSON字符串转JSON对象 
    //本地收藏的id数组去重
    function uniq(arr) {
      var temp = []; //一个新的临时数组
      for (var i = 0; i < arr.length; i++) {
        if (temp.indexOf(arr[i]) == -1) {
          temp.push(arr[i]);
        }
      }
      return temp;
    }
    collectionIdArr = uniq(collectionIdArr);
    console.log("去重后的收藏id数组", collectionIdArr);
    this.$ajax({
      method: "post",
      url: "/app/chargingNet/collects",
      data: collectionIdArr,
      headers: { token: sessionStorage.getItem("token") }
    }).then(res => {
      if (res.data.code == 200) {      
        console.log("data------", res.data);
        this.data = res.data.data.collects;
        this.overuser=res.data.data.overuser;
        this.data.map(item =>{
                    vm.center.lng = item.longitude
                    vm.center.lat = item.latitude
                    var distance = vm.GetDistance(vm.center.lat,vm.center.lng,vm.autoLocationPoint.lat,vm.autoLocationPoint.lng)
                    vm.distance = distance.toFixed(2)
                    item.distance = vm.distance
                })
        this.overuser.map(item=>{
                vm.center.lng = item.longitude
                    vm.center.lat = item.latitude
                    var distance2 = vm.GetDistance(vm.center.lat,vm.center.lng,vm.autoLocationPoint.lat,vm.autoLocationPoint.lng)
                     vm.distance2 = distance2.toFixed(2)
                    item.distance = vm.distance2
        })
      }
    });
  },
  methods: {
    jump(url) {
      this.$router.push(url);
    },
     //经纬度转换成三角函数中度分表形式。
        Rad(d){
            return d * Math.PI / 180.0;
        },
    //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
    GetDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = this.Rad(lat1);
      var radLat2 = this.Rad(lat2);
      var a = radLat1 - radLat2;
      var b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
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
    }
  }
};
</script>

<style lang="less" scoped>
.user_main_content {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: @background-color;
}
.thire-login-span {
margin-top: 5px;
color: #a1a0a0;
font-size: 12px;
}
</style>
