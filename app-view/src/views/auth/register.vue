<template>
  <div>
    <x-header class="xHeader" :left-options="{showBack: false}">
      <!--  头部样式 -->
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click="jump('/home/mineV')"
      ></x-icon>
      <span style="color:#fff">注册</span>
    </x-header>
    <div
      style="width:80px;height:80px;border-radius:12px;position:relative;left:50%;margin-left:-40px;top:40px"
    >
      <img  style="width:80px;height:80px;"   src="../../assets/logo1.png" alt>
    </div>
    <group class="loginBody" style="margin-top:25%;">
      <x-input
        style="font-size:12px;"
        is-type="china-mobile"
        ref="input01"
        required
        v-model="phone"
        keyboard="number"
        placeholder="请输入您的手机号"
      >
        <img
          slot="label"
          style="padding-right:10px"
          src="../../assets/user.png"
          width="26"
          height="26"
        >
      </x-input>

      <!-- <x-input style="font-size:12px"  title="验证码" placeholder="请输入验证码" class="weui_vcode" v-model="inputSmsCode">
				<x-button slot="right" style="background:#C2C2C2;border-radius:33px;font-size:12px" type="primary" mini @click.native="sendVCode" :disabled="disable001">{{btn}}</x-button>
      </x-input>-->
      <x-input
        style="font-size:12px;"
        class="weui_vcode"
        v-model="inputSmsCode"
        keyboard="number"
        placeholder="请输入验证码"
      >
        <img
          slot="label"
          style="padding-right:10px"
          src="../../assets/yanzhengma.png"
          width="26"
          height="26"
        >
        <x-button
          slot="right"
          style="background:#CCCCCC;border-radius:33px;font-size:10px;height:26px;line-height:25px;color:#FFFFFF"
          type="primary"
          mini
          @click.native="sendVCode"
          :disabled="disable001"
        >{{btn}}</x-button>
      </x-input>

      <x-input style="font-size:12px;" type="password" v-model="passWord" placeholder="请输入密码">
        <img
          slot="label"
          style="padding-right:10px;"
          src="../../assets/password.png"
          width="26"
          height="26"
        >
      </x-input>
      <!-- <x-input style="font-size:12px"  title="手机号码" keyboard="number" placeholder="请输入手机号码" is-type="china-mobile" ref="input01" required v-model="phone" ></x-input>
			<x-input style="font-size:12px"  title="验证码" placeholder="请输入验证码" class="weui_vcode" v-model="inputSmsCode">
				<x-button slot="right" style="background:#C2C2C2;border-radius:33px;font-size:12px" type="primary" mini @click.native="sendVCode" :disabled="disable001">{{btn}}</x-button>
			</x-input>
      <x-input style="font-size:12px" v-model="passWord" type="password" placeholder="请输入密码"></x-input>-->
    </group>
 
    <x-button
      @click.native="modifyPassword()" 
      style="border-radius:99px;width:90%;margin:4% 0 0 5%;color:#fff"
        class="xButton"
    >立即注册</x-button>

    <div class="agreement" type="plain" style="width:90%;margin:4% 0 0 5%;">
      <a style="font-size:10px;color:#BFBFBF">注册即代表您同意</a>
      <a style="font-size:10px;color:#4EBB6A" @click="jump('/home/registerProtocol')" >《充电桩APP用户使用协议》</a>
    </div>

    <toast v-model="toastShow.showCancel" type="cancel">{{toastShow.cancel_msg}}</toast>
    <toast v-model="toastShow.showSuccess" type="success">{{toastShow.success_msg}}</toast>
  </div>
</template>

<script>
import { Group, Cell, XInput, XButton, Box, Toast, XHeader } from "vux";
import URL from "../../config/url.js";
import axios from "axios";

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    Box,
    Toast,
    XHeader
  },
  created: function() {},
  data() {
    return {
      phone: "",
      smsCode: "",
      inputSmsCode: "",
      show: false,
      toastShow: {
        showCancel: false,
        cancel_msg: "",
        showSuccess: false,
        success_msg: ""
      },
      inputphone: "",
      disable001: false,
      btn: "获取验证码",
      passWord: ""
    };
  },
  methods: {
    jump(path) {
      this.$router.push(path);
    },
    sendSmscode(codeid, message) {
      let vm = this;

      var qs = require("qs");
      vm.inputphone = vm.phone;
      axios
        .post(
          URL.sendSmsCode,
          qs.stringify({
            codeid: codeid,
            action: "code",
            username: 302605782,
            userpass: 302605782,
            mobiles: vm.phone,
            content: message
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(function(response) {
          console.log(response.data);
          vm.toastShow.success_msg = "验证码发送成功";
          vm.toastShow.showSuccess = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getSmscode() {
      var Num = "";
      for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
      }
      return Num;
    },
    sendVCode() {
      var countdown = 60;
      var vm = this;
      this.smsCode = this.getSmscode();
      console.log(this.phone);
      var reg = new RegExp(
        "^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\\d{8}$"
      );
      console.log(this.$refs.input01.valid);
      if (this.$refs.input01.valid) {
        this.disable001 = true;
        console.log(this.smsCode);
        this.sendSmscode(4774, this.smsCode);
        this.disable001 = true;
        var interval = setInterval(function() {
          if (countdown > 0) {
            vm.btn = "重新发送(" + countdown + ")";
            countdown--;
          } else {
            vm.disable001 = false;
            vm.btn = "发送验证码";
            clearInterval(interval);
          }
        }, 1000);
      } else {
        vm.toastShow.cancel_msg = "请输入正确的手机号码！";
        vm.toastShow.showCancel = true;
      }
    },
    modifyPassword() {
      let vm = this;
      if (vm.inputphone !== vm.phone) {
        vm.toastShow.cancel_msg = "手机号码已更换 请重新发送验证码";
        vm.toastShow.showCancel = true;
      } else if (vm.smsCode == "") {
        vm.toastShow.cancel_msg = "请输入验证码";
        vm.toastShow.showCancel = true;
      } else if (vm.inputSmsCode == vm.smsCode) {
        console.log("xiugaimima");
        //修改密码

        let vm = this;

        axios({
          method: "post",
          url: URL.LOCALSRC + "/app",
          data: {
            phone: vm.phone,
            password: vm.passWord
          }
        }).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            let vm = this;
            vm.$ajax({
              method: "post",
              url: "/app/auth",
              data: {
                phone: vm.phone,
                // password: md5.hex_md5(vm.passWord)
                password: vm.passWord
              }
            })
              .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  sessionStorage.setItem("token", res.data.data);
                  sessionStorage.setItem("name", vm.phone);
                  // vm.$router.push('home/bmapV')
                  this.$router.push({
                    path: "/home/user/car/index",
                    query: {
                      name: vm.phone
                    }
                  });
                  vm.toastShow.showSuccess = true;
                } else if (res.data.code == 400) {
                  vm.toastShow.showCancel = true;
                  vm.toastShow.cancel_msg = res.data.message;
                } else {
                  vm.toastShow.showCancel = true;
                  vm.toastShow.cancel_msg = "内部错误";
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            vm.toastShow.showCancel = true;
            vm.toastShow.cancel_msg = res.data.message;
          }
        });
      } else {
        vm.toastShow.cancel_msg = "验证码输入错误";
        vm.toastShow.showCancel = true;
      }
    }
  }
};
</script>

<style >
.loginBody{
  margin-top: 10%;
  font-size: 12px;
}
input::-webkit-input-placeholder {
  font-size: 12px;
}
.agreement{
  margin-left: 10px;
  margin-top: 2%;
  font-size: 10px;
}
input:-webkit-autofill {
  background-color: #fff;
  color: #000;
}
.weui-btn:after {
  border: 0;
 
 
}
</style>

















