
<template>
<!-- 支付订单 -->
 <div :style="{height:height+'px'}">
    <x-header class="xHeader" :left-options="{showBack: false}">
        <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/mineV')"></x-icon>
        <span style="color:#000">支付订单</span>
    </x-header>
    <!--  头部样式 -->
    <flexbox style="margin:36px 0;height:180px;">
        <flexbox-item style="text-align:center;color:#999999;font-size:20px;">
            <div>
                <span>
                    剩余支付时间 {{time}}
                </span>
            </div>
            <div>
                <span style="color:#333333;font-size:30px">
                    ¥{{money}}
                </span>
            </div>
            <div>
                <span style="font-size:16px">
                    订单号:{{order_Num}}
                </span>
            </div>
        </flexbox-item>
    </flexbox>
    

    <!-- <div class="msg">选择充值方式</div> -->
    <!--<flexbox class="rowType">
        <flexbox-item>
            <img src="../../../assets/images/weixin.png" class="img" alt="">
            <span class="font">&nbsp;&nbsp;微信支付</span>
        </flexbox-item>
      <flexbox-item class="checkRight"><check-icon :value.sync="one"></check-icon></flexbox-item>
    </flexbox> -->

    <flexbox class="rowType">
        <flexbox-item>
            <img src="../../../assets/images/zhifubao.png" class="img" alt="">
            <span class="font">&nbsp;&nbsp;支付宝支付</span>
        </flexbox-item>
        <flexbox-item class="checkRight" style="margin-right:25px"><check-icon :value.sync="two"></check-icon></flexbox-item>
    </flexbox>

    <flexbox class="rowType">
        <flexbox-item>
            <img src="../../../assets/images/yinlian.png" style="width:30px" class="img" alt="">
            <span class="font">&nbsp;银联支付</span>
        </flexbox-item>
      <flexbox-item class="checkRight" style="margin-right:25px"><check-icon :value.sync="three"></check-icon></flexbox-item>
    </flexbox>
    
    <flexbox style="position:absolute;bottom:20px;width:100%">
        <flexbox-item style="text-align:center">
            <span style="font-size:22px;">共计:</span><span style="font-size:30px">￥{{money}}</span>
        </flexbox-item>
        <flexbox-item>
            <x-button type="primary" style="border-radius:30px;height:40px;line-height:40px;margin-left:-10px" @click.native="pay">确认支付</x-button>
        </flexbox-item>
    </flexbox>
    <!-- <flexbox style="margin-top:10px">
        <flexbox-item style="text-align:center;font-size:12px">
            点击立即充值,即代表您已同意<span style="color:#1aad19">《充值协议》</span>
        </flexbox-item>
    </flexbox> -->
    <toast v-model="showSwitch" type="text">{{msgSwitch}}</toast>
 </div>
</template>
<style>
 
</style>
<script>
import { TransferDom, Actionsheet, Group, CellBox, XSwitch, Toast, XHeader, CheckIcon, XButton,Checker,CheckerItem ,Flexbox, FlexboxItem } from 'vux'
import axios from 'axios'
import $ from 'jquery'
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
    Flexbox, FlexboxItem
  },
  directives: {
    TransferDom
  },
  data () {
    return {
        time:'15:30',
        money: 120,
        order_Num:'1235036506',
        loading: false,
        html: '',
        url: {
            required: true
        },
        one:false,
        two:false,
        three:false,
        height:'',
        showSwitch:false,
        msgSwitch:''
    }
  },
  watch: {
    //   由于控件的样式原因，数据监听暂时这样蠢操作
    one (val) {
        let vm = this
        if (val) vm.two = false,vm.three = false
    },
    two (val) {
        let vm = this
        if (val) vm.one = false,vm.three = false
    },
    three (val) {
        let vm = this
        if (val) vm.one = false,vm.two = false
    }
  },
  created () {
        let vm = this
        vm.height = document.documentElement.clientHeight
        if (sessionStorage.getItem('token') == null){
            vm.jump('/login')
        }
        console.log(123)
  },
  methods: {
    pay () {
        let vm = this
        if (vm.Verification()) {
            if (vm.three) vm.unionPayPayment()
            if (vm.one) vm.weChatPayment()
            if (vm.two) vm.alipayPayment()
        }
    },
    unionPayPayment () { // 银联支付 跳转内置浏览器
        let vm = this
        var options = "location=yes,hidden=yes";
        var url = 'http://106.75.154.242:9090/#/?token='+sessionStorage.getItem('token')+'&moneyRmb='+vm.money+'&type=1'
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
    weChatPayment () {  // 微信支付
        let vm = this
        vm.placeAnOrder(2)
    },
    alipayPayment () {  // 支付宝支付
        let vm = this
        vm.placeAnOrder(3)
    },
    placeAnOrder (type) {
        let vm = this
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
        var url = "http://106.75.173.82:8082/api/h5pay/h5pay?amount="+vm.money*100+"&mode="+type+"&token="+sessionStorage.getItem('token')
        
        window.location.href = url; 
    },
    close () {
        this.$router.push('/home/mineV')
    },
    Verification () { // 验证支付数据
        let vm = this
        console.log(vm.one+vm.two+vm.three)
        if (vm.money=='') {
            vm.showSwitch = true
            vm.msgSwitch = '请选择充值金额'
        } else if (vm.one==false && vm.two==false && vm.three==false){
            vm.showSwitch = true
            vm.msgSwitch = '请选择充值方式'
        } else return true
    }
  }
}
</script>

<style scoped>
    .msg {
        color:#8b8b8b;
        font-size:16px;
        margin-top:16px;
        margin-bottom:10px;
        margin-left:10px
    }
    .img {
        width:20px;
        margin-bottom:-4px
    }
    .font {
        font-size:20px;
        font-weight: 200;
    }
    .checkRight {
        text-align:right;
        margin-right:16px
    }
    .rowType {
        margin-top:8px;
        margin-left:16px;
    }
    .demo5-item {
        width: 150px;
        height: 38px;
        line-height: 26px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
        margin-top:6px
    }
    .demo5-item-selected {
        background: #ffffff url(../../../assets/icons/moneyOk.png) no-repeat right bottom;
        border-color: #ff4a00;
    }
</style>
