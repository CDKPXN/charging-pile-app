<template>
  <!-- 充电实时状态 -->
  <div>
    <x-header class="xHeader" :left-options="{showBack: false}">
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click.native="jump('/home/mineV')"
      ></x-icon>
      <span style="color:#fff">实时充电状态</span>
      <x-icon
        type="ios-ionic-outline"
        size="30"
        style="position:absolute;right:14px;top:10px"
        @click.native="$refs.demo.rerender()"
      ></x-icon>
    </x-header>

    <div class="pileBgColor" :style="{height:height+'px'}">
      <div class="titleMsg">{{sname}} | {{pname}}</div>
      <div>
        <v-chart id="qqqqq" ref="demo" prevent-render @on-render="renderChart"></v-chart>
      </div>
      <div class="container">
        <div class="msgCard">
          <span class="num" >{{power}}度</span>
          <span class="info" >充电电量</span>
        </div>
        <div class="msgCard">
          <span class="num">{{duration}}分钟</span>
          <span class="info">充电时间</span>
        </div>
        <div class="msgCard">
          <span class="num">{{cost}}元</span>
          <span class="info">充电金额</span>
        </div>
        <div class="msgCard">
          <span class="num">{{parking_fee}}元</span>
          <span class="info">停车费</span> 
          </div>
      </div>

      <x-button class="xButton" @click.native="stopCharge()" :disabled="stopenable">停止充电</x-button>
    </div>
  </div>
</template>
<script>
import {
  XHeader,
  VChart,
  VLine,
  VArea,
  VTooltip,
  VLegend,
  VBar,
  VPie,
  VGuide,
  VScale,
  XButton
} from "vux";
import url from "../../../config/url.js";
import { format } from "../../../config/format.js";
import store from "../../../vuex/store.js";
import axios from "axios";
import $ from "jquery";

export default {
  components: {
    XHeader,
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    VPie,
    VGuide,
    VScale,
    XButton
  },
  data() {
    return {
      height: 0,
      soc: 0,
      sname: "",
      pname: "",
      power: 0,
      duration: 0,
      cost: 0,
      stopenable: true,
      parking_fee: 0,
      refresh: "",
      fullMessage:true
    };
  },
  beforeDestroy: function() {
    console.log("order statu destroy");
    clearInterval(this.refresh);
  },
  
watch:{
    soc(val){
      let vm = this;
     console.log(vm.soc)
              if(vm.soc > 95 && vm.fullMessage){
                vm.$vux.confirm.show({
                                    title: "提示",
                                    content:
                                      "电池电量超过95%后电桩将不能进行最大功率充电",
                                    confirmText: "确认",
                                    showCancelButton: false,
                                    onConfirm() {
                                      vm.fullMessage=false;
                                    }
                                  });
              }
    }
  }
  ,
  created() {
    this.token = sessionStorage.getItem("token");
    if (sessionStorage.getItem("token") == null) {
      this.jump("/login");
    }
    this.height = document.documentElement.clientHeight;
    let vm = this;
vm.refreshOrderStatus()
    $(function() {
      function refresh() {
        console.log("refresh");
        // vm.$refs.demo.rerender();
            vm.refreshOrderStatus()
      }
      vm.refresh = setInterval(refresh, 15000);
    });
  },
  watch:{
    soc(){
       this.$refs.demo.rerender();
    }
  },
  mounted() {},
  methods: {
    
    jump(path) {
      if (path == "/home/mineV") {
        sessionStorage.setItem("isBack", true);
      }
      clearInterval(this.refresh);
      this.$router.push(path);
    },
    stopChargeMine(){
      //自己平台停止充电
      console.log("自己平台停止充电");
       let vm = this;
        vm.$ajax({
          method: "put",
          url: "/app/charging/mode/1",
          headers: { token: vm.token }
        }).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            // alert("充电结束");
            // vm.jump("/home/mineV");
            vm.isShow = true;
            vm.$vux.confirm.show({
              title: "提示",
              content: "请确认电桩己停止充电,订单将在电枪复位后结算。",
              confirmText: "确认",
              showCancelButton: false,
              onConfirm() {
                vm.$vux.loading.show({
                  text: "结算中,请等待!"
                });
              }
            });
          } else {
            console.log("停止充电失败，电桩失去连接");
            vm.$vux.confirm.show({
              title: "提示",
              content: res.data.message,
              confirmText: "确认",
              showCancelButton: false
            });
          }
        });
    },
    stopChargePlatform(){
      let vm = this;
      let _url = url.PLATFORM + "/evcs/20160701/end_charging";
      let token = localStorage.getItem("token");
        var oid = localStorage.getItem("platformOID");
        console.log("oid:",oid)
        axios({
          method:"post",
          url:_url,
          headers:{
            token:token
          },
          data:{
            oid:oid
          }
        }).then(res=>{
          console.log("平台停止充电返回")
          console.log(res)
        });
    }
    ,
    stopCharge() {
      let flag = localStorage.getItem("platform");
      if (flag == "tled") {
        this.stopChargePlatform();
      }else{
        this.stopChargeMine();
      }
    
    },
    platformRefreshOrder() {
      console.log("请求平台刷新订单")
      let flag = localStorage.getItem("platform");
      if (flag == "tled") {
        var _url = url.PLATFORM + "/evcs/20160701/charging";
        var token = localStorage.getItem("token");
        var oid = localStorage.getItem("platformOID");
        if (!oid) {
          return;
        }
        console.log("刷新订单："+oid)
        axios({
          method: "post",
          url: _url,
          headers: {
            token: token
          },
          data: {
            oid: oid
          }
        }).then(res => {
          console.log(res)
          if (res.data.code != 200) {
            localStorage.removeItem("platformOID");
          }
        });
      }
    },
    refreshOrderStatus(){
      this.platformRefreshOrder();
      let vm = this;
      this.$ajax({
        method: "get",
        url: "app/charging",
        headers: { token: vm.token }
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 400) {
          vm.power = 0;
          vm.duration = 0;
          vm.cost = 0;
          vm.stopenable = true;
          vm.soc = 0;
          vm.parking_fee = 0;
          vm.$vux.loading.hide();
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
              console.log("获取到的最后订单：", order);
              if (!finalOrderID) {
                console.log("无最后次存储的订单ID");
                orderModal(order);
                return;
              }
              console.log("最后次存储的订单ID：", finalOrderID);
              if (order.id != finalOrderID) {
                orderModal(order);
                return;
              }
              function orderModal(order) {
                var cost = order.cprice + order.sprice + order.parkingFee;
                if (cost == 0) {
                  vm.$vux.confirm.show({
                    title: "提示",
                    content:
                      "您最后次的消费金额为：0。<br>充电前，请确认电枪和您的爱车己正常连接。",
                    confirmText: "确认",
                    showCancelButton: false,
                    onConfirm() {
                      localStorage.setItem("finalOrderID", order.id);
                      sessionStorage.removeItem("isBack");
                      vm.$router.push("/home/bmapV");
                    }
                  });
                } else {
                  vm.$vux.confirm.show({
                    title: "提示",
                    content:
                      "您最后次的消费账单：<br>充电电量：" +
                      order.electricQuantity +
                      " 度 <br>电费：" +
                      (order.cprice / 100).toFixed(2) +
                      " 元<br>服务费：" +
                      (order.sprice / 100).toFixed(2) +
                      " 元<br>停车费：" +
                      (order.parkingFee / 100).toFixed(2) +
                      " 元",
                    confirmText: "确认",
                    showCancelButton: false,
                    onConfirm() {
                      localStorage.setItem("finalOrderID", order.id);
                      sessionStorage.removeItem("isBack");
                      vm.$router.push("/home/bmapV");
                    }
                  });
                }
              }
            }
          });
        } else if (res.data.code == 200) {
          vm.sname = res.data.data.sname;
          vm.pname = res.data.data.pname;
          vm.power = res.data.data.amount;
          vm.duration = parseInt(res.data.data.duration / 60);
          vm.cost = res.data.data.cost / 100;
          vm.parking_fee = res.data.data.parking_fee / 100;
          vm.stopenable = false;
          vm.soc = parseInt(res.data.data.soc);
        }

  
      });
    },
 

  renderChart ({ chart }) {
    console.log("图表请求刷新")
      const data = [ { x: '1', y: 0 } ]
      chart.source(data, {
        y: {
          max: 100,
          min: 0
        }
      })
      chart.axis(false)
      chart.tooltip(false)
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.8,
        radius: 0.85
      })
      chart.guide().arc({
        start: [ 0, 0 ],
        end: [ 1, 99.98 ],
        top: false,
        style: {
          lineWidth: 20,
          stroke: "#f05225"
        }
      })
      chart.guide().text({
        position: [ '50%', '50%' ],
        content: '电池电量'+this.soc+'%',
        style: {
          fontSize: 20,
          fill: "#f05225"
        }
      })
      chart.interval()
        .position('x*y')
        .size(20)
        .animate({
          appear: {
            duration: 1200,
            easing: 'cubicIn'
          }
        })
      chart.render()
    },

    // renderChart({ chart }) {
    //   //定时刷新状态
    //   //请求其他平台上报充电数据
    //  this.platformRefreshOrder();
    //  //获取订单状态消息
    //   setTimeout(this.getChargerStatu({ chart }),10000);
     
    // }
  }
};
</script>

<style lang="less" scoped>
.xHeader{
  background-color:  @background-color;
}
.center {
  text-align: center;
}
.titleMsg {
  text-align: center;
  font-size: 18px;
  padding-top: 10px;
  font-weight: 100;
}
.msgCard {
  /* background: #ade5c8; */
  /* color: #37815d; */
  width: 36%;
  height: 60px;
  font-weight: 200;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-bottom: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.xButton {
  height: 50px;
  border-radius: 45px;
  width: 80%;
  margin-top: 14%;
  background-color:  @background-color;
  color: #fffefe;
}
.pileBgColor {
  /* background: -webkit-linear-gradient(#66cca8 ); 
	background: -o-linear-gradient(#66cca8 ); 
	background: -moz-linear-gradient(#66cca8); 
	background: linear-gradient(#66cca8);  */
  /* background: #66cca8; */
  /* color: #ffffff; */
}
.num{
  color: #333333;
  font-size: 20px;
  font-weight: inherit;
}
.info{
  color: #999999;
  font-size: 12px;
}
.container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
}
</style>