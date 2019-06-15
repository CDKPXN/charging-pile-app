
<template>
  <div  :style="{height:height}">
    <x-header class="xHeader" :left-options="{showBack: false}">
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click.native="jump('/home/mineV')"
      ></x-icon>
      <span style="color:#fff">充值方式</span>
    </x-header>
    <!--  头部样式 -->
  <flexbox orient="vertical">
  <flexbox-item style="width: 100%;">
    <div class="msg">充值金额</div>
  </flexbox-item>
    
  <flexbox-item>
    <div style="text-align:center" >
      <checker  
        v-model="money"
        radio-required
        @on-change="changeMoney"
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected"
      >
        
          <checker-item v-for="(i,index) in [10, 20, 50, 100, 200, 300]" :key="i" :value="i">
               
             <div @click="getValue(index)" style="margin-top:6px">￥{{i}}</div>
               
          </checker-item>          
        
      </checker>
    </div>
  </flexbox-item>
    
   
     <!-- 手动输入充值金额  -->
  <flexbox-item>
    <group  id="appCash">
      <x-input  keyboard="number" placeholder="请输入充值金额10元到999元(整数)" v-model="moneyvalue" :min="2" :max="3" @on-change="change"  :is-type="beint"></x-input>
    </group>
  </flexbox-item>
   
  <flexbox-item>
    <div class="msg">选择充值方式</div>
    <!--<flexbox class="rowType">
        <flexbox-item>
            <img src="../../../assets/images/weixin.png" class="img" alt="">
            <span class="font">&nbsp;&nbsp;微信支付</span>
        </flexbox-item>
      <flexbox-item class="checkRight"><check-icon :value.sync="one"></check-icon></flexbox-item>
    </flexbox>-->
    <flexbox class="rowType">
      <flexbox-item>
        <img src="../../../assets/images/weixin.png" class="img" alt>
        <span class="font">&nbsp;&nbsp;微信支付</span>
      </flexbox-item>
      <flexbox-item class="checkRight">
        <check-icon :value.sync="one"></check-icon>
      </flexbox-item>
    </flexbox>

    <flexbox class="rowType">
      <flexbox-item>
        <img src="../../../assets/images/zhifubao.png" class="img" alt>
        <span class="font">&nbsp;&nbsp;支付宝支付</span>
      </flexbox-item>
      <flexbox-item class="checkRight">
        <check-icon :value.sync="two"></check-icon>
      </flexbox-item>
    </flexbox>

    <flexbox class="rowType">
      <flexbox-item>
        <img src="../../../assets/images/yinlian.png" style="width:30px" class="img" alt>
        <span class="font">&nbsp;银联支付</span>
      </flexbox-item>
      <flexbox-item class="checkRight">
        <check-icon :value.sync="three"></check-icon>
      </flexbox-item>
    </flexbox>
  </flexbox-item>
  <flexbox-item>
      <toast v-model="showSwitch" type="text">{{msgSwitch}}</toast>
    <!--  -->
     <cell
      title="红包"
      id="red-envelopes"
      :link="'/home/user/appCash/chooseRedEnvelopes?redIndex='+(redValue+1)+'&money='+money"
      :value="'可用红包'+Red_envelopes+'个'"
      is-link
    ></cell>
    <div style="position:fixed;bottom:20px;width:100%" v-show="hidshow">
      <flexbox>
        <flexbox-item style="text-align:center">
          共计:￥
          <span style="font-size:20px">{{money}}</span>
          <span v-if="r_money != 0">+{{r_money}}(赠)</span>元
        </flexbox-item>
        <flexbox-item style="text-align:center">
          <x-button  style="border-radius:30px;height:40px;color:#fff;" class="xButton" @click.native="pay">立即充值</x-button>
        </flexbox-item>
      </flexbox>
      <flexbox style="margin-top:10px">
            <flexbox-item style="text-align:center;font-size:12px" @click.native="rechargeProtocol()">
               点击立即充值,即代表您已同意<span style="color:#1aad19">《充值协议》</span>
            </flexbox-item>
      </flexbox>
    </div>
  
  </flexbox-item>
  </flexbox>
  </div>
</template>
<style>
</style>
<script>
import {
  TransferDom,
  Actionsheet,
  Group,
  CellBox,
  XSwitch,
  Toast,
  XHeader,
  CheckIcon,
  XButton,
  Checker,
  CheckerItem,
  Flexbox,
  FlexboxItem,
  Cell,
   XInput
} from "vux";
import axios from "axios";
import $ from "jquery";

export default {
  // 使用时请使用 :url.sync=""传值
  components: {
    Actionsheet,
    Group,
    XSwitch,
    Toast,
    XHeader,
    CheckIcon,
    XButton,
    Checker,
    CheckerItem,
    CellBox,
    Flexbox,
    FlexboxItem,
    Cell,
     XInput
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      money: 300,
      commonList: ["支付宝", "微信", "银联"],
      checkType: ["银联"],
      menus1: {
        menu1: "微信支付",
        menu2: "支付宝支付",
        menu3: "银联支付"
      },
      loading: false,
      html: "",
      url: {
        required: true
      },
      one: false,
      two: false,
      three: false,
      height: "",
      showSwitch: false,
      msgSwitch: "",
      Red_envelopes: "", //红包个数
      redValue: 5, //充值可用红包个数
      rid: "", //红包id
      r_money: 0, //红包金额
      moneyvalue:'',
      beint:function(value){
        return {
          valid:Number.isInteger(Number(value)),
          msg:'必须是整数'
        }
      },
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: '0',   //实时屏幕高度
      hidshow:true, //显示或者隐藏footer
    };
  },
  mounted (){
       // window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{   
             this.showHeight = document.body.clientHeight;
        })()
    }
  },
  watch: {
    //由于控件的样式原因，数据监听暂时这样蠢操作
    one(val) {
      let vm = this;
      if (val) (vm.two = false), (vm.three = false);
    },
    two(val) {
      let vm = this;
      if (val) (vm.one = false), (vm.three = false);
    },
    three(val) {
      let vm = this;
      if (val) (vm.one = false), (vm.two = false);
    },
    showHeight:function() {
        if(this.docmHeight > this.showHeight){
            this.hidshow=false
        }else{
            this.hidshow=true
        }
    }
  },
  created() {
    let vm = this;

    vm.height = document.documentElement.clientHeight;
    if (sessionStorage.getItem("token") == null) {
      vm.jump("/login");
    }
     if (localStorage.getItem("rechargeProtocol") == null) {
      vm.$router.push("/home/user/rechargeProtocol")
    }
    if (sessionStorage.getItem("rid") != null) {
      vm.rid = sessionStorage.getItem("rid");
      console.log(vm.rid);
    }
    if (vm.$route.query.r_money != undefined) {
      vm.r_money = vm.$route.query.r_money;
    }
    if (vm.$route.query.c_money != undefined) {
      vm.money = Number(vm.$route.query.c_money);
    }
    if (vm.$route.query.useNum != undefined) {
      vm.redValue = vm.$route.query.useNum;
    }

    vm.getRedEnvelopes(this.redValue);
  },
  methods: {
     rechargeProtocol(){
        console.log("充值协议")
          this.$router.push("/home/user/rechargeProtocol")
    },
    pay() {
      let vm = this;
      if (vm.Verification()) {
        if (vm.three) vm.unionPayPayment();
        if (vm.one) vm.weChatPayment();
        if (vm.two) vm.alipayPayment();
      }  
    },
    change (val) {
      // console.log('on change',val.length)
      if(val==''||!Number.isInteger(Number(val))||val.length==1){
        this.money=0
      }else{
         this.money=val
      }
     
    },
    unionPayPayment() {
      // 银联支付 跳转内置浏览器
      let vm = this;
      //vm.money = vm.money/1000
      var options = "location=yes,hidden=yes";

      var url =
        "http://106.75.154.242:9090/#/?token=" +
        sessionStorage.getItem("token") +
        "&moneyRmb=" +
        vm.money +
        "&type=1" +
        "&rid=" +
        vm.rid;
      // var ref = cordova.InAppBrowser.open(url, '_blank', options);
      // ref.addEventListener('loadstart', Callback);
      // function Callback(event) {

      //     if(event.url.indexOf('baidu')>-1){
      //         ref.close()
      //         this.jump('/home/mineV')
      //     }
      // }
      window.location.href = url;
    },
    weChatPayment() {
      // 微信支付
      let vm = this;
      //vm.money = vm.money/1000
      var url = "/app/recharge/unifiedOrder";
      vm.$ajax({
        method: "post",
        url: url,
        headers: { token: sessionStorage.getItem("token") },
        data: {
          amount: vm.money * 100,
          mode: 2,
          rid: vm.rid
        }
      }).then(res => {
        console.log(res.data.data);
        var obj = JSON.parse(res.data.data);
        console.log(obj);
        if (res.data.code == 200) {
          var params = {
            partnerid: obj.partnerid, // merchant id
            prepayid: obj.prepayid, // prepay id
            noncestr: obj.noncestr, // nonce
            timestamp: obj.timestamp, // timestamp
            sign: obj.sign // signed string
          };
          console.log(params);     
          Wechat.sendPaymentRequest(
            params,
            function() {
              this.$router.push({
                path: "/home/mineV"
              });
            },
            function(reason) {       
              vm.$vux.confirm.show({
                title: "提示",
                content: reason,
                confirmText: "确认",
                showCancelButton: false
              });
            }
          );
        }
      });
    },
    alipayPayment() {
      // 支付宝支付
      let vm = this;
      //vm.money = vm.money/1000
      var url = "/app/recharge/unifiedOrder";
      vm.$ajax({
        method: "post",
        url: url,
        headers: { token: sessionStorage.getItem("token") },
        data: {
          amount: vm.money * 100,
          mode: 3,
          rid: vm.rid
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          console.log(res.data.data);
          var url = res.data.data;

          window.location.href = url;
        }
      });
    },
    // placeAnOrder (type) {
    //     let vm = this
    //     vm.money = vm.money/1000
    // var url = 'http://106.75.154.242:9090/#/?token='+sessionStorage.getItem('token')+'&moneyRmb='+vm.money+'&type='+type
    // var options = "location=yes,hidden=yes";
    // var ref = cordova.InAppBrowser.open(url, '_blank', options);
    // ref.addEventListener('loadstart', Callback);
    // function Callback(event) {

    //     if(event.url.indexOf('baidu')>-1){
    //         ref.close()
    //         this.jump('/home/mineV')
    //     }
    // }
    //     var url = "http://106.75.173.82:8082/api/h5pay/h5pay?amount="+vm.money*100+"&rid="+vm.rid+"&mode="+type+"&token="+sessionStorage.getItem('token')

    //     window.location.href = url;
    // },
    close() {
      this.$router.push("/home/mineV");
    },
    Verification() {
      // 验证支付数据
      let vm = this;
      console.log(vm.one + vm.two + vm.three);
      if (vm.money == "") {
        vm.showSwitch = true;
        vm.msgSwitch = "请选择充值金额";
      } else if (vm.one == false && vm.two == false && vm.three == false) {
        vm.showSwitch = true;
        vm.msgSwitch = "请选择充值方式";
      } else return true;
    },
    // 获取你选择的金额
    getValue(index) {
      // 获取你选择的金额
      this.redValue = index;
      this.getRedEnvelopes(this.redValue);
    },
    getRedEnvelopes(num) {
      let vm = this;
      vm.$ajax({
        method: "get",
        url: "/app/activity/unusedRedPacket",
        headers: { token: sessionStorage.getItem("token") }
      }).then(res => {
        if (res.data.code == 200) {
          //根据你选择充值的金额，来判断你可用的充值红包的个数
          let oneArr = [];
          let twoArr = [];
          res.data.data.map(item => {
            if (item.aid == 2) {
              twoArr.push(item);
            } else {
              oneArr.push(item);
            }
          });
          let sliceArr = twoArr.slice(0, num + 1);
          vm.Red_envelopes = oneArr.concat(sliceArr).length;
        }
      });
    },
    // 充值金额选择变化后重置赠送的金额
    changeMoney() {
      this.r_money = 0;
      sessionStorage.setItem("rid", "");
      this.rid = "";
    }
  }
};
</script>

<style lang="less" scoped>
.xHeader{
  background-color: @background-color;
}
.xButton{
  background-color: @background-color ;
}
.msg {
  color: #333333;
  font-size: px;
  // margin-top: 16px;
  padding-left: 16px;
}
.img {
  width: 20px;
  margin-bottom: -4px;
}
.font {
  font-size: 14px;
  font-weight: 200;
  color: #333333;
}
.checkRight {
  text-align: right;
  margin-right: 16px;
}
.rowType {
  margin-top: 8px;
  margin-left: 16px;
}
.demo5-item {
  width:40%;
  height: 38px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
  margin-top: 6px;
}
.demo5-item-selected {
  background: #ffffff url(../../../assets/icons/moneyOk.png) no-repeat right
    bottom;
  border-color: #ff4a00;
}
#red-envelopes {
  
}
.vux-checker-box{
  // height: 200px;
}
.vux-checker-item {
  margin-top: 15px;
  
}
.vux-flexbox-item {
  padding-right: 12px;
 
}
</style>
<style>
html,body{
  height: 100%;
}
#appCash>.weui-cells{
  height: 56px;
  margin-top:0px;
}
</style>

