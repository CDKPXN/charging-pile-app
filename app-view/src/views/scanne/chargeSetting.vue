<template>
  <div>
    <x-header class="xHeader" :left-options="{showBack: false}">
      <!--  头部样式 -->
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click.native="back"
      ></x-icon>
      <span    style="color:#000">充电设置</span>
    </x-header>

    <group>
      <popup-radio title="充电设置方式" :options="options1" v-model="option1">
        <p slot="popup-header" class="vux-1px-b demo3-slot" style="text-align:center">请选则充电类型</p>
      </popup-radio>

      <popup-radio title="充电类型" :options="options3" v-model="option3" v-show="setPhone">
        <p slot="popup-header" class="vux-1px-b demo3-slot" style="text-align:center">请选则充电类型</p>
      </popup-radio>

      <popup-radio :title="typeTitle" :options="options4" v-model="option4" v-show="showTimer">
        <p slot="popup-header" class="vux-1px-b demo3-slot" style="text-align:center">{{radioMsg}}</p>
      </popup-radio>
    </group>

    <!-- <flexbox style="margin-top:40px;">
            <flexbox-item style="text-align:center">
                <img src="../../assets/gif/s.png" style="height:40%;width:40%;border-radius:100%;" @click="takeLine"/>
            </flexbox-item>
        </flexbox>
        <flexbox style="margin-top:40px;">
            <flexbox-item style="text-align:center">
                <img src="../../assets/gif/f.png" style="height:40%;width:40%;border-radius:100%;" @click="palyLine"/>
            </flexbox-item>confirm
        </flexbox>

        <x-button type="primary" class="bottomBtn" @click.native="startCharge" disabled v-show="showStartBtn">提交</x-button>
    <x-button type="primary" class="bottomBtn" @click.native="startCharge" v-show="showStartBtn">提交</x-button> -->
    <x-button
      type="primary"
      class="bottomBtn xButton"
      @click.native="startCharge"
      :disabled="showStartBtn"
    >开始充电</x-button>
    <div v-transfer-dom>
      <confirm v-model="show" @on-confirm="confirm" title="操作提示">
        <p style="text-align:center;">确认设置开始充电</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoading" text="正在为您的爱车发送充电请求"></loading>
    </div>
    <toast v-model="showSuccess" :time="1000">充电成功</toast>
    <toast v-model="showWaring" type="warn">{{dataMsg}}</toast>
  </div>
</template>

<script>
import {
  Toast,
  XHeader,
  Cell,
  XButton,
  PopupRadio,
  Group,
  Flexbox,
  FlexboxItem,
  TransferDomDirective as TransferDom,
  Confirm,
  Loading
} from "vux";
import axios from "axios";
import url from "../../config/url.js";

export default {
  directives: {
    TransferDom
  },
  components: {
    Toast,
    XHeader,
    Cell,
    XButton,
    PopupRadio,
    Group,
    Confirm,
    Loading,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      data: [],
      option3: "",
      options1: ["手机设置"],
      option1: "",
      options3: ["定时", "定电量", "定金额", "自动充满"], // 充电类型
      //options3:['自动充满'],
      option4: "",
      options4: [],
      showStartBtn: false,
      showTimer: false,
      show: false,
      typeTitle: "",
      radioMsg: "",
      type: "",
      setType: "",
      showLoading: false,
      showSuccess: false,
      showWaring: false,
      setPhone: false,
      dataMsg: "",
      pid: "",
      token: ""
    };
  },
  created() {
    let _chargeId = this.$route.query.chargeId;
    //测试代码一行
    // let _chargeId = "hlht://1.123456789/qrcode";

    if (_chargeId == undefined) {
      this.jump("/home/bmapV");
      return;
    }
    this.token = localStorage.getItem("token");
    this.option1 = "手机设置";
    this.option3 = "自动充满";
    if (_chargeId.length <= 6) {
      localStorage.removeItem("platform");
      this.getQrCode();
    } else {
      localStorage.setItem("platform", "tled");
      this.platformQrcode();
    }
  },
  watch: {
    option1(val) {
      console.log(val);
      if (val == "手机设置") {
        this.showStartBtn = true;
        this.setPhone = true;
        this.setType = 0;
      } else {
        this.setType = 1;
        this.setPhone = false;
        this.showTimer = false;
        this.type = "";
        this.option4 = "";
        this.showStartBtn = false;
      }
    },
    option3(val) {
      //  监听选择的充电类型，跟新下拉数据
      if (!val == "") {
        this.showTimer = true;
      }
      if (val == "定时") {
        this.type = 1;
        this.typeTitle = "定时";
        this.radioMsg = "请选则充电时间(单位小时)";
        this.option4 = "";
        this.options4 = ["1", "2", "3", "4"];
        this.showStartBtn = true;
      }
      if (val == "定电量") {
        this.type = 2;
        this.typeTitle = "定电量";
        this.radioMsg = "请选则充电电量(单位千瓦时)";
        this.option4 = "";
        this.options4 = [
          "5",
          "10",
          "15",
          "20",
          "25",
          "30",
          "35",
          "40",
          "45",
          "50"
        ];
        this.showStartBtn = true;
      }
      if (val == "定金额") {
        this.type = 3;
        this.typeTitle = "定金额";
        this.radioMsg = "请选则充电金额(单位元)";
        this.option4 = "";
        this.options4 = ["5", "10", "20", "30", "40", "50", "80", "100"];
        this.showStartBtn = true;
      }
      if (val == "自动充满") {
        this.type = 4;
        this.option4 = 0;
        this.showTimer = false;
        this.showStartBtn = false;
      }
    },
    option4(val) {
      // 监听最后一步。数据完善后显示可点击按钮提交
      if (!val == "") {
        this.showStartBtn = false;
      }
    }
  },
  methods: {
    back() {
      // 返回扫码充电页面
      this.$router.push({
        path: "/home/bmapV"
      });
    },
    jump(path) {
      this.$router.push(path);
    },
    startCharge() {
      // 显示conform
      this.show = true;
    },
    platfromStartCharging(Ctype,value) {
      let vm = this;
      var token = localStorage.getItem("token");
      let _url = url.PLATFORM + "/evcs/20160701/start_charging";
      axios({
        method: "post",
        url: _url,
        headers: { token: token },
        data: {
          model: Ctype,
          value: value,
          QRCode: vm.$route.query.chargeId
        }
      }).then(res => {
        if (res.data.code == 200) {
          vm.showLoading = false;
          vm.showSuccess = true;
          console.log("新建的订单："+res.data.data);
          localStorage.setItem("platformOID", res.data.data);
          setTimeout(function() {
            vm.jump("/home/user/order");
          }, 1000);
        }
      });
    },
    confirm() {
      // 提交充电数据并进行数据反馈
      let vm = this;
      vm.show = false;
      vm.showLoading = true;
      let value = "";
      let Ctype = vm.type;
      if (vm.type == 1) {
        value = vm.option4 * 3600;
      }
      if (vm.type == 2) {
        value = vm.option4;
      }
      if (vm.type == 3) {
        value = vm.option4 * 100;
      }
      if (vm.type == 4) {
        Ctype = 1;
        value = 36000;
      }
      var flag = localStorage.getItem("platform");
      //测试代码1行
      // flag = "tled";
      if (flag == "tled") {
        vm.platfromStartCharging(Ctype,value)
        return;
      }
      //下面是自己平台
      axios({
        method: "post",
        url: url.LOCALSRC + "/app/charging",
        headers: { token: vm.token },
        data: {
          type: vm.setType,
          model: Ctype,
          value: value,
          pid: vm.pid
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          vm.showLoading = false;
          vm.showSuccess = true;
          setTimeout(function() {
            vm.jump("/home/user/order");
          }, 1000);
        } else {
          vm.showLoading = false;
          vm.showWaring = true;
          vm.dataMsg = res.data.message;
          setTimeout(function() {
            vm.jump("/home/bmapV");
          }, 1000);
        }
      });
    },
    platformQrcode() {
      let vm = this;
      let _chargeId = vm.$route.query.chargeId
      //两行测试代码
      // vm.$route.query.chargeId = "hlht://1.123456789/qrcode";
      // let _chargeId = "hlht://1.123456789/qrcode";
      //两行测试代码

      let _url = url.PLATFORM + "/evcs/20160701/charging/qrCode?QRCode=" + _chargeId;
      axios({
        method: "get",
        url: _url,
        headers: { token: vm.token }
      }).then(res => {
        console.log("======================");
        console.log(res);
        if (res.data.code == 200) {
        } else {
          vm.$vux.confirm.show({
            title: "提示",
            content: "此充电桩正在使用或暂时无法使用",
            confirmText: "确认",
            showCancelButton: false
          });

          vm.jump("/home/bmapV");
        }
      });
    },
    getQrCode() {
      // 获取点桩费用显示
      let vm = this;
      console.log(vm.token);
      this.$ajax({
        method: "get",
        url: "app/charging/qrCode?qrCode=" + this.$route.query.chargeId,
        headers: { token: vm.token }
      }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          vm.pid = res.data.data.pid;
          if (vm.pid == undefined) {
            // alert("此充电桩正在使用或暂时无法使用")
            vm.$vux.confirm.show({
              title: "提示",
              content: "此充电桩正在使用或暂时无法使用",
              confirmText: "确认",
              showCancelButton: false
            });

            vm.jump("/home/bmapV");
          }
          console.log(vm.pid + "测试是否有值");
        } else {
          vm.showWaring = true;
          vm.dataMsg = res.data.message;

          setTimeout(function() {
            vm.jump("/home/bmapV");
          }, 1000);
        }
      });
    },
    //收线
    takeLine() {
      let vm = this;
      let pid = Number(vm.$route.query.chargeId);
      vm.$ajax({
        method: "post",
        url: "app/charging/motor",
        headers: { token: vm.token },
        data: {
          pid: pid,
          model: 5
        }
      }).then(res => {
        console.log(res);
      });
    },
    //放线
    palyLine() {
      let vm = this;
      let pid = Number(vm.$route.query.chargeId);
      vm.$ajax({
        method: "post",
        url: "app/charging/motor",
        headers: { token: vm.token },
        data: {
          pid: pid,
          model: 6
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style>
.bottomBtn {
  position: absolute;
  bottom: -46px;
  height: 46px;
  font-size: 20px;
}
</style>