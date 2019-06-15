<template>
  <div>
    <x-header class="xHeader" :left-options="{showBack: false}">
      <!--  头部样式 -->
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click="jump('/login')"
      ></x-icon>
      <span style="color:#fff">忘记密码</span>
    </x-header>
    <group class="loginBody">
      <x-input
        style="font-size:12px"
        title="手机号码"
        keyboard="number"
        placeholder="请输入手机号码"
        is-type="china-mobile"
        ref="input01"
        required
        v-model="phone"
      ></x-input>
      <x-input
        style="font-size:12px"
        title="验证码"
        placeholder="请输入验证码"
        class="weui_vcode"
        v-model="inputSmsCode"
      >
        <x-button
          class="xButton"
          slot="right"
          type="primary"
          mini
          @click.native="sendVCode"
          :disabled="disable001"
        >{{btn}}</x-button>
      </x-input>
      <x-input style="font-size:12px" v-model="passWord" type="password" placeholder="请输入新密码"></x-input>
    </group>

    <x-button
      @click.native="modifyPassword()"
      type="primary"
      style="font-size:16px;margin-top:4%;padding"
        class="xButton"
    >确定修改</x-button>

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
      btn: "发送验证码",
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
      let vm = this;
      var countdown = 60;
      this.smsCode = this.getSmscode();

      if (this.$refs.input01.valid) {
        vm.$ajax({
          method: "get",
          url: "/app/personalCenter/validate",
          params: {
            phone: vm.phone
          }
        }).then(result => {
          if (result.data.code != 200) {
            vm.toastShow.cancel_msg = "手机号未注册";
            vm.toastShow.showCancel = true;
          } else {
            vm.disable001 = true;
            console.log(vm.smsCode);
            vm.sendSmscode(4774, vm.smsCode);
            vm.disable001 = true;
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
          }
        });
      } else {
        vm.toastShow.cancel_msg = "请输入正确的手机号码！";
        vm.toastShow.showCancel = true;
      }
    },
    modifyPassword() {
      let vm = this;

      if (vm.inputphone != vm.phone) {
        vm.toastShow.cancel_msg = "手机号码已更换 请重新发送验证码";
        vm.toastShow.showCancel = true;
      } else if (vm.smsCode == "") {
        vm.toastShow.cancel_msg = "请输入验证码";
        vm.toastShow.showCancel = true;
      } else if (vm.inputSmsCode == vm.smsCode) {
        console.log("xiugaimima");
        //修改密码

        vm.$ajax({
          method: "put",
          url: "/app/personalCenter/password/update",
          data: {
            phone: vm.phone,
            // password: md5.hex_md5(vm.passWord)
            password: vm.passWord
          }
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              vm.toastShow.success_msg = "密码修改成功";
              vm.toastShow.showSuccess = true;
              setTimeout(function() {
                vm.jump("/login");
              }, 1000);
            } else {
              vm.toastShow.showCancel = true;
              vm.toastShow.cancel_msg = "修改失败";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        vm.toastShow.cancel_msg = "验证码输入错误";
        vm.toastShow.showCancel = true;
      }
    }
  }
};
</script>
