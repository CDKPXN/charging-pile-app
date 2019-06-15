<template>
  <!-- 问答评论 -->
  <div>
    <x-header
      class="xHeader"
      :left-options="{showBack: false}"
    >
      <!--  头部样式 -->
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click.native="jump('/home/invoice/invoiceDraw')"
      ></x-icon>
      <span style="color:#fff">开具电子发票</span>
    </x-header>
    <div style="height:40px;position:relative">
      <p class="detail_title" style="color:#999999;position:absolute;bottom:0">发票详情</p>
    </div>
    <flexbox orient="vertical" :gutter="0">
      <flexbox-item class="detail_list">
        <div class="flex-demo">
          <span style="display:inline-block;margin-left:4.5%">抬头类型</span>
          <check-icon :value.sync="one">企业单位</check-icon>
          <check-icon :value.sync="two">个人/非企业</check-icon>
        </div>
      </flexbox-item>
      <flexbox-item class="detail_list">
        <div class="flex-demo">
          <x-input
            title="发票抬头"
            @on-blur="ver_header()"
            name="invoice_header"
            v-model="invoice_header"
            placeholder="填写发票抬头"
          ></x-input>
        </div>
      </flexbox-item>
      <flexbox-item class="detail_list" v-if="one">
        <div class="flex-demo">
          <x-input
            title="税号"
            class="draw_input"
            @on-blur="ver_number()"
            name="invoice_number"
            v-model="invoice_number"
            placeholder="填写纳税人识别号"
          ></x-input>
        </div>
      </flexbox-item>
      <flexbox-item class="detail_list">
        <div class="flex-demo">
          <x-input title="发票内容" name="invoice_other" disabled placeholder="供电*生活服务"></x-input>
        </div>
      </flexbox-item>
      <flexbox-item class="detail_list">
        <div class="flex-demo">
          <x-input title="发票金额" v-model="invoice_money" disabled placeholder="20.00元"></x-input>
        </div>
      </flexbox-item>
      <flexbox-item class="detail_list">
        <div class="flex-demo">
          <x-input title="更多信息" v-model="invoice_remarks" placeholder="填写备注，地址（非必填）"></x-input>
        </div>
      </flexbox-item>
    </flexbox>
    <div style="height:40px;position:relative">
      <p class="detail_title" style="color:#999999;position:absolute;bottom:0">接收方式</p>
    </div>
    <flexbox orient="vertical" :gutter="0">
      <flexbox-item class="detail_list">
        <div class="flex-demo">
          <x-input
            title="电子邮箱"
            name="invoice_email"
            @on-blur="ver_change()"
            v-model="invoice_email"
            placeholder="用于向您发送电子发票"
          ></x-input>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox orient="vertical" style="margin-top:20%">
      <flexbox-item>
        <div class="flex-demo" style="width:90%;margin:0 auto">
          <div>
            <x-button type="primary"     class="success_btn success_con xButton" @click.native="submit_ver">提交</x-button>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
    <!-- 提交提示框 -->
    <!-- <div v-transfer-dom>
            <alert v-model="submitShow" title="提示">请填写完整的信息</alert>
    </div>-->
    <div v-transfer-dom>
      <confirm v-model="show" :title="title" @on-cancel="onCancel" @on-confirm="onConfirm">
        <p style="text-align:center;">确定提交吗?</p>
      </confirm>
    </div>
    <toast
      v-model="showPositionValue"
      type="text"
      :time="800"
      is-show-mask
      :text="toastMsg"
      position="middle"
    ></toast>
  </div>
</template>

<script>
import $ from "jquery";
import {
  XHeader,
  Flexbox,
  Toast,
  Confirm,
  FlexboxItem,
  XInput,
  XButton,
  CheckIcon,
  Alert,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Flexbox,
    FlexboxItem,
    XInput,
    XButton,
    CheckIcon,
    Alert,
    Confirm,
    Toast
  },
  data() {
    return {
      name: "",
      // 抬头类型
      one: true,
      two: false,
      type: 0,
      // 发票提交内容
      invoice_id: [],
      invoice_header: "",
      invoice_number: "",
      invoice_other: "",
      invoice_money: "",
      invoice_remarks: "",
      invoice_email: "",
      // 提示
      submitShow: false,
      issubmit: true,
      title: "操作提示",
      show: false,
      toastMsg: "",
      showPositionValue: false
    };
  },
  watch: {
    //   由于控件的样式原因，数据监听暂时这样蠢操作
    one(val) {
      let vm = this;
      vm.type = 0;
      if (val) vm.two = false;
    },
    two(val) {
      let vm = this;
      vm.type = 1;
      if (val) vm.one = false;
    }
  },
  created() {
    let vm = this;
    vm.name = sessionStorage.getItem("name");
    if (sessionStorage.getItem("token") == null) {
      vm.jump("/login");
    }
    // 获取到	子单据id
    this.invoice_id = JSON.parse(this.$route.query.id);
    // 获取到  开票金额
    this.invoice_money = parseFloat(this.$route.query.money).toFixed(2) ;
  },
  methods: {
    jump(url) {
      this.$router.push(url);
    },
    // 验证
    ver_header() {
      if (this.invoice_header == "") {
        $("input[name='invoice_header']")
          .attr("placeholder", "*请填写发票抬头")
          .addClass("Verification_style");
      }
    },
    ver_number() {
      if (this.invoice_number == "") {
        $("input[name='invoice_number']")
          .attr("placeholder", "*请填写税号")
          .addClass("Verification_style");
      }
    },
    // ver_other(){
    //     if(this.invoice_other == ''){
    //         $("input[name='invoice_other']").attr('placeholder','*请填写发票内容').addClass('Verification_style')
    //     }
    // },
    ver_change() {
      var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (this.invoice_email == "") {
        $("input[name='invoice_email']")
          .attr("placeholder", "*请填写邮箱地址")
          .addClass("Verification_style");
      } else if (!pattern.test(this.invoice_email)) {
        this.invoice_email = "";
        $("input[name='invoice_email']")
          .attr("placeholder", "*邮箱格式错误")
          .addClass("Verification_style");
      }
    },
    onConfirm() {
      let vm = this;
      vm.$ajax({
        method: "post",
        url: "/app/orderdata",
        headers: { token: sessionStorage.getItem("token") },
        data: {
          IDS: vm.invoice_id,
          GFMC: vm.invoice_header,
          GFSH: vm.invoice_number,
          BZ: vm.invoice_remarks,
          EMAIL: vm.invoice_email
        }
      }).then(res => {
        if (res.data.code == 200) {
          console.log("结果", res.data);
          vm.jump("/home/invoice/invoiceSuccess");
        } else {
          vm.showPositionValue = true;
          vm.toastMsg = "提交失败";
          setTimeout(()=>{
          vm.jump("/home/invoice/invoiceInformation");
          }, 1200);
        }
      });
      this.issubmit = false;
    },
    onCancel() {
      this.issubmit = true;
      this.show = false;
    },
    // 提交开发票请求验证
    submit_ver() {
      // 如果返回成功,条状成功界面
      let vm = this;
      if (vm.invoice_header == "" || vm.invoice_email == "") {
        vm.ver_header();
        vm.ver_change();
        return;
      }
      if (vm.one) {
        if (vm.invoice_number == "") {
          vm.ver_number();
          return;
        }
      }
      if (this.issubmit) {
        this.show = true;
      } else {
      }

      // if(vm.two){
      //     if((vm.one == false && vm.two == false) || vm.invoice_header == '' || vm.invoice_email == ''){
      //         vm.ver_header();vm.ver_number();vm.ver_change()
      //     }else{
      //         this.$router.push({path:'/home/invoice/invoiceSuccess'})
      //     }
      // }else{
      //     if((vm.one == false && vm.two == false) || vm.invoice_header == '' || vm.invoice_number == ''  || vm.invoice_email == ''){
      //         vm.ver_header();vm.ver_number();vm.ver_change()
      //     }else{
      //         this.$router.push({path:'/home/invoice/invoiceSuccess'})
      //     }
      // }
    }
  }
};
</script>
<style  lang="less" scoped>
.xHeader{
  background-color:  @background-color;
}
.xButton{
  background-color:  @background-color;
   border-radius:54px;
   line-height: 40px;
}
.draw_input > .weui-cell__hd > label {
  width: 5em !important;
}
.Verification_style::-webkit-input-placeholder {
  /*Chrome/Safari*/
  color: #deacac !important;
}
.Verification_style::-moz-placeholder {
  /*Firefox*/
  color: #deacac !important;
}
.Verification_style::-ms-input-placeholder {
  /*IE*/
  color: #deacac !important;
}

</style>
<style>
.vux-check-icon > .weui-icon-success:before,.vux-check-icon > .weui-icon-success-circle:before{
  color: #f05225 !important;
}
</style>
