<template>
  <div class="protocol" :style="{height:height}">
    <div class="head">
      <br>
      <h2 style="text-align: center;">发票规则</h2>
    </div>
    <div class="content">
      <p style=" margin-left: 5%;margin-right: 5%;">
        1&nbsp;&nbsp;开票目前仅支持电费、充电服务费。
        <br>
      </p>
      <br>
       <p style=" margin-left: 5%;margin-right: 5%;">
        2&nbsp;&nbsp;开票列表仅展示近六个月的消费订单，每个消费订单仅可开票一次。
        <br>
      </p>
      <br>
        <p style=" margin-left: 5%;margin-right: 5%;">
        3&nbsp;&nbsp;发票申请处理时效为7个工作日内。
        <br>
      </p>
       <br>
        <p style=" margin-left: 5%;margin-right: 5%;">
        4&nbsp;&nbsp;同一个用户的多个订单可以合并开票，合并开票最多不超过50个订单。
        <br>
      </p>
       <br>
        <p style=" margin-left: 5%;margin-right: 5%;">
        5&nbsp;&nbsp;开票方式仅支持电子发票，发票类型为“增值税电子普通发票”。
          <br>
        </p>
        <br>
        <p style=" margin-left: 5%;margin-right: 5%;">
        6&nbsp;&nbsp;根据国家税务相关政策，开具的增值税电子普通发票，如用于企业报销，需填写完整的开票信息，请咨询单位财务部门获取相关信息；如您的单位是非企业性质或您要求开具个人名义抬头，则无需填写纳税人识别号。
          <br>
        </p>
         <br>
        <p style=" margin-left: 5%;margin-right: 5%;">
        7&nbsp;&nbsp;消费订单金额中包含的充值奖励、优惠券等优惠部分均不支持开票。
          <br>
        </p>
    </div>
    <div class="foot" >
      <div >
        <check-icon :value.sync="isagree">我已阅读并且同意以上协议</check-icon>    
        <div style="display: flex;justify-content: flex-end;margin-right: 10%;">
               <x-button @click.native="angre"  style="width:25%;font-size: 0.8rem;display:inline;color:#fff;" class="xButton registerProtocolbutton" >下一步</x-button>
        </div>
        
      </div>
    
    </div>
  </div>
</template>
<script>
import { XButton,CheckIcon  } from "vux";

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
 
    angre() {
      if(!this.isagree){
         this.$vux.confirm.show({
        content: "您需同意《蓉E充发票规则》方可使用本软件",
        confirmText: "确认",
        showCancelButton: false
      });
      }else{
           localStorage.setItem("isread", true);
           this.$router.push("/home/invoice/invoiceInformation");
      }
     
    }
  }, 
  created() {
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
  bottom: 3%;
  // margin-left: 11%;
  // margin-right: 11%;
}
.registerProtocolbutton{
  margin: 0px !important;
}
</style>


