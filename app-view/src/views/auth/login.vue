<template>
  <!-- 登录 -->
  <div>
    <x-header class="xHeader" :left-options="{showBack: false}">
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click="Jump('/home/mineV')"
      ></x-icon>
      <span style="color:#fff">登录</span>
    </x-header>

    <div class="loginBody">
      <div
        style="width:80px;height:80px;border-radius:12px;position:relative;left:50%;margin-left:-40px;top:40px"
      >
        <img   style="width:80px;height:80px;"   src="../../assets/logo1.png" alt>
      </div>
      <x-input style="font-size:16px;margin-top:80px" v-model="phone" placeholder="请输入您的手机号"  type='tel' is-type="china-mobile" >
        <img
          slot="label"
          style="padding-right:10px;display:block;"
          src="../../assets/user.png"
          width="26"
          height="26"
        >
      </x-input>

      <x-input style="font-size:16px;" type="password" v-model="passWord" placeholder="请输入密码">
        <img
          slot="label"
          style="padding-right:10px;display:block;"
          src="../../assets/password.png"
          width="26"
          height="26"
        >
      </x-input>
    </div>

    <x-button  style="width:80%" class="submit_btn " @click.native="NewLogin">登录</x-button>

    <x-header  style="background-color: #fff;" :left-options="{showBack: false}">
      
      <span slot="left" class="register" @click="Jump('/forget')">忘记密码?</span>
      <span slot="right" class="register" @click="Jump('/register')">立即注册</span>
    </x-header>
    <div :style="{position:'absolute',top:height}">
      <divider>
        <span class="thire-login-span">第三方登录</span>
      </divider>
      <div class="third-login">
        <flexbox>
          <flexbox-item :style="{display:qqShow}">
            <div class="thire-login-item">
              <div>
                <img
                  slot="icon"
                  src="../../assets/images/login-qq.png"
                  @click="check(2)"
                  class="thire-login-img"
                >
              </div>
              <div class="thire-login-span">QQ</div>
            </div>
          </flexbox-item>
          <flexbox-item :style="{display:wechatShow}">
            <div class="thire-login-item">
              <div>
                <img
                  slot="icon"
                  src="../../assets/images/login-chart.png"
                  @click="check(1)"
                  class="thire-login-img"
                >
              </div>
              <div class="thire-login-span">微信</div>
            </div>
          </flexbox-item>
          <flexbox-item :style="{display:alipayShow}">
            <div class="thire-login-item">
              <div>
                <img
                  slot="icon"
                  src="../../assets/images/login-ant.png"
                  @click="check(3)"
                  class="thire-login-img"
                >
              </div>
              <div class="thire-login-span">支付宝</div>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>

    <toast v-model="toastShow.showCancel" type="cancel">{{toastShow.cancel_msg}}</toast>
    <toast v-model="toastShow.showSuccess" type="success">{{toastShow.success_msg}}</toast>
  </div>
</template>

<script>
import {
  Group,
  Cell,
  XButton,
  Box,
  Toast,
  Divider,
  Flexbox,
  FlexboxItem
} from "vux";
import { XHeader, XInput } from "vux";
import URL from "../../config/url.js";
import { format } from "../../config/format.js";
import store from "../../vuex/store.js";
import axios from "axios";
import md5 from "../../assets/js/md5.js";

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    Box,
    Toast,
    XHeader,
    XInput,
    Divider,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      alipayShow: "none",
      qqShow: "none",
      wechatShow: "none",
      height: "0px",
      smsCode: "",
      inputSmsCode: "",
      show: false,
      message: "",
      openid: "",
      inputphone: "",
      disable001: false,
      btn: "发送验证码",
      phone: "",
      passWord: "",
      showBtn: true,
      toastShow: {
        showCancel: false,
        cancel_msg: "",
        showSuccess: false,
        success_msg: "成功登录"
      }
    };
  },
  created() {
    this.height = this.util.heightPoint(75);
   let vm = this;
    YCQQ.checkClientInstalled(function(){
      vm.qqShow="";
      console.log('client is installed');
    },function(){
      // if installed QQ Client version is not supported sso,also will get this error
      console.log('client is not installed');
    });
    Wechat.isInstalled(function (installed) {
      // alert("Wechat installed: " + (installed ? "Yes" : "No"));
        vm.wechatShow="";
  }, function (reason) {
      console.log("Failed: " + reason);
  });


  },
  methods: {
    check(type) {
      let vm = this;

      //            let bind = {type: type, unionid: "oWcaX1I-J1xrEmq69cw8JmvX0Z7o" };
      //            vm.$router.push({name:"bind",params:bind});
      // return;
      switch (type) {
        case 1:
          //  vm.devConfirm();
          vm.wechatLogin();
          break;
        case 2:
          //  vm.devConfirm();
          vm.qqLogin();
          break;
        case 3:
          vm.devConfirm();
          //   vm.alipayLogin();
          break;
      }
    },

    devConfirm() {
      let vm = this;
      vm.$vux.confirm.show({
        title: "提示",
        content: "开发中，敬请期待",
        confirmText: "确认",
        showCancelButton: false,
        onConfirm() {}
      });
    },
    oauth(type, code) {
      let vm = this;
      vm.$ajax({
        method: "post",
        url: "/app/oAuth",
        data: {
          type: type,
          code: code
        }
      })
        .then(res => {
          var data = res.data.data;
          if (data.code == 1) {
            sessionStorage.setItem("token", data.message);
            localStorage.setItem("token", data.message);
            vm.$vux.confirm.show({
              title: "提示",
              content: "登录成功，将跳转到首页",
              confirmText: "确认",
              showCancelButton: false,
              onConfirm() {
                vm.$router.push("home/index");
              }
            });
          } else if (data.code == 2) {
            vm.$vux.confirm.show({
              title: "提示",
              content: "登录失败，请重新登录",
              confirmText: "确认",
              showCancelButton: false
            });
          } else if (data.code == 3) {
            vm.$vux.confirm.show({
              title: "提示",
              content: "未绑定手机号，请绑定手机号",
              confirmText: "确认",
              showCancelButton: true,
              onCancel() {},
              onConfirm() {
                let bind = { type: type, unionid: data.message };
                vm.$router.push({ name: "bind", params: bind });
              }
            });
          }
        })
        .catch(res => {
          let message = JSON.stringify(res);
          vm.$vux.confirm.show({
            title: "提示",
            content: "请求异常，请稍微再试:",
            confirmText: "确认",
            showCancelButton: false
          });
        });
    },
    qqLogin() {
      let vm = this;
      var checkClientIsInstalled = 1; //default is 0,only for iOS
      YCQQ.ssoLogin(
        function(args) {
        //  alert(args.access_token);
        //  alert("userid:"+args.userid);
          vm.oauth(2, args.userid);
        },
        function(failReason) {
          console.log(failReason);
        },
        checkClientIsInstalled
      );
    },
    alipayLogin() {
      let vm = this;
      var scope = "snsapi_userinfo",
        state = "_" + +new Date();
      var scope = "snsapi_userinfo";
      Wechat.auth(
        scope,
        function(response) {
          // you may use response.code to get the access token.
          vm.oauth(1, response.code);
        },
        function(reason) {
          // alert("Failed: " + reason);
        }
      );
    },

    wechatLogin() {
      let vm = this;
      var scope = "snsapi_userinfo",
        state = "_" + +new Date();
      var scope = "snsapi_userinfo";
      Wechat.auth(
        scope,
        function(response) {
          // you may use response.code to get the access token.
          vm.oauth(1, response.code);
        },
        function(reason) {
          // alert("Failed: " + reason);
        }
      );
    },

    Jump(url) {
      // 快速注册
      this.$router.push(url);
    },
    NewLogin() {
      // 登录
      let vm = this;
      if(vm.passWord.trim()&&vm.phone.trim()!==''){
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
           localStorage.setItem("name", vm.phone);
            localStorage.setItem("token", res.data.data);
            vm.$router.push("home/index");
          } else if (res.data.code == 400) {
            vm.toastShow.showCancel = true;
            vm.toastShow.cancel_msg = res.data.message;
          } else {
            vm.toastShow.showCancel = true;
            vm.toastShow.cancel_msg = "用户名或密码错误";
          }
        })
      
      }else{
        vm.toastShow.showCancel = true;
        vm.toastShow.cancel_msg = "请输入用户名和密码";
      }
     
    }
  }
};
</script>

<style lang="less" scoped >
.xHeader{
    background-color:  @background-color;
}
.loginBody {
  width: 80%;
  margin: auto;
}
.register {
  color: #666666;
  font-size: 14px;
  margin:0  32px;
}
input::-webkit-input-placeholder {
  background-color: #ffffff;
}
input:-webkit-autofill {
  color: #000;
}
.submit_btn {
  font-size: 0.8rem;
  margin-top: 24px;
  height: 36px;
  line-height: 36px;
  width: 296px;
  border-radius: 30px;
  background-color: @background-color;
  color: #FEFEFE;
}

/* 第三方登录样式 */
.third-login {
  width: 90%;
  margin: 0 auto;
}
.thire-login-item {
  text-align: center;
  margin-top: 10px;
}
.thire-login-img {
  width: 30px;
  display: inline-block;
  vertical-align: middle;
}
.thire-login-span {
  margin-top: 5px;
  color: #666666;
  font-size: 14px;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #B3B3B3;
  font-size: 14px;
}
</style>
