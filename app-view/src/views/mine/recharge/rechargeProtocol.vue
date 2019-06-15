<template>
  <div class="protocol" :style="{height:height}">
    <div class="head">
      <br>
      <h2 style="text-align: center;">充值协议</h2>
    </div>
    <div class="content" style=" margin-left: 5%;margin-right: 5%;">
      <br>
     <h3>尊敬的用户，为保障您的合法权益，请您在充值之前仔细阅读、理解并接受本规则；如果您是未成年人，请在监护人的陪同和帮助下阅读本规则所有条款。当您在继续点击“立即充值”按钮后，即视为您已全部阅读且完全理解本规则，并同意按本协议约定的规则执行。如您不接受协议的部分或全部，请您不要点击“立即充值”按键。</h3>
      <br>
<h3>1、充值方式</h3>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您可登录蓉E充APP账号在线充值，通过第三方支付进行：如微信、支付宝及银行卡支付或蓉E充APP认可的其他充值方式。
<br><br>
<h3>2、充值金额、赠送金额（如有）及账户余额</h3>
<p>&nbsp;&nbsp;2.1&nbsp;&nbsp;充值金额指您通过蓉E充APP进行在线充值并且通过第三方支付如微信、支付宝及银行卡支付等方式实际充值支付的金额（人民币），不包括赠送的金额。</p><br>
<p>&nbsp;&nbsp;2.2&nbsp;&nbsp;赠送金额指您参与的蓉E充APP不时推出的“红包”或“返利”等其他类似性质的活动赠与您的金额。</p><br>
<p>&nbsp;&nbsp;2.3&nbsp;&nbsp;账户余额指您APP账户中当前显示的余额。账户余额一般通过充值金额、“红包”或“返利”及其他赠送或补偿的金额获得。账户余额仅可用于支付本APP平台提供的服务。账户余额不设有效期，不能转移、转赠，且不能退还。请根据自己的消费情况充值，蓉E充APP对充值次数不设限制。</p><br>
<p>&nbsp;&nbsp;2.4&nbsp;&nbsp;赠送金额在如下情况下会失效，或被蓉E充APP收回或取消：</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）您主动注销您的注册账号；</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）您利用或者蓉E充APP合理怀疑您利用您的注册账号从事作弊行为以获取不正当经济利益的情形；</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）因您违反服务协议、相关说明或规则导致您的注册账号被冻结或关闭；</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）其它根据服务协议、相关说明或规则导致蓉E充APP无法向您提供服务的情形。</p><br>
<h3>3、发票</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您可根据服务页面提示以申请相关的发票，蓉E充APP根据申请发票金额开具对应税率的增值税普通发票（具体内容参照蓉E充APP开票说明）。</p><br>
<h3>4、特别说明</h3>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1您在充值过程中，若由于您操作不当或第三方支付平台的原因，给您造成任何不便或财产损失，蓉E充APP不予承担责任。</p><br>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.2蓉E充APP有权根据法律法规和政策的变化或运营需要，不时对本协议进行修订，一旦本协议的内容发生变动，蓉E充APP会在服务页面内予以公布，
  该等修订由此即享有公示效力，无需另行单独通知您；若您在该等修订公布后继续充值，则表示您已充分阅读、完全理解并接受经该等修订后的本协议的全部内容，也将遵循该等内容的约定使用本服务；若您不同意该等经修订后的本协议的任何内容，您即应选择放弃充值同时停止使用本服务。</p><br>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.3在法律、法规允许的范围内，蓉E充APP保留对本协议项下充值方式、充值金额、赠送金额及账户余额使用规则等解释的权利。</p>





    </div>
    <div class="foot">
      <div   >
        <!-- <x-button @click.native="cancle" style="width:30%;display:inline; margin-right:8%" plain>取消</x-button> -->
           <check-icon :value.sync="isagree">我已阅读并且同意以上协议</check-icon> 
           <div  style="display: flex;justify-content: flex-end;margin-right: 10%;">
                 <x-button @click.native="angree"  style="width:25%;font-size: 0.8rem;display:inline;color:#fff;" class="xHeader rechargeProtocolbutton">下一步</x-button>
           </div>
       
      </div>
    </div>
  </div>
</template>
<script>
import { XButton,CheckIcon } from "vux";

export default {
  components: {
    XButton,
    CheckIcon
  },
  data() {
    return {
      height: "0px",
      footHeight: "0px",
      isagree:false
    };
  },
  methods: {
    // cancle() {
    //   let vm = this;
    //   vm.$vux.confirm.show({
    //     content: "您需同意《充值协议》方可进行充值",
    //     confirmText: "确认",
    //     showCancelButton: false,
    //     onConfirm:function(){
    //       vm.$router.push("/home/mineV");
    //         localStorage.removeItem("rechargeProtocol");
    //     }
    //   });
 
    // },
    angree() {
      if(!this.isagree){
        this.$vux.confirm.show({
        content: "您需同意《蓉E充充值协议》方可使用本软件",
        confirmText: "确认",
        showCancelButton: false
      });
      }else{
           localStorage.setItem("rechargeProtocol", true);
           this.$router.push("/home/user/appCash");
      }
    
    }
  }, 
  created() {
    this.isagree=JSON.parse(localStorage.getItem('rechargeProtocol'));
    this.height = this.minHeight + "px";
    this.footHeight = (this.minHeight / 100) * 88 + "px";
  }
};
</script>

<style lang="less" scoped>
.protocol {
  margin-left: 3%;
  margin-right: 3%;
}
.head {
  height: 16%;
  margin-left: 25%;
  margin-right: 25%;
}
.content {
  height: 70%;
  overflow: auto;
}
.foot {
  position: absolute;
  width: 100%;
  // margin-left: 11%;
  // margin-right: 11%;
}
.rechargeProtocolbutton{
  margin: 0px !important;
}
</style>


