<template>
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
        @click.native="jump('/home/invoice/invoiceInformation')"
      ></x-icon>
      <span >开票规则</span>
    </x-header>
   <div class="container-margins">
    <br>
    <p> 1.开票目前仅支持电费、充电服务费。</p>
    <br>
    <p >2. 开票列表仅展示近六个月的消费订单，每个消费订单仅可开票一次。</p>
    <br>
    <p>3.发票申请处理时效为7个工作日内。</p>
    <br>
    <p>4.同一个用户的多个订单可以合并开票，合并开票最多不超过50个订单。</p>
    <br>
    <p>5.开票方式仅支持电子发票，发票类型为“增值税电子普通发票”。</p>
    <br>
    <p>6.根据国家税务相关政策，开具的增值税电子普通发票，如用于企业报销，需填写完整的开票信息，请咨询单位财务部门获取相关信息；如您的单位是非企业性质或您要求开具个人名义抬头，则无需填写纳税人识别号。</p>
    <br>
    <p>7.消费订单金额中包含的充值奖励、优惠券等优惠部分均不支持开票。</p>
    
  
    </div>
    </div>
</template>

<script>
import {XHeader } from "vux";
export default {
    components: {
    XHeader
  },
}
</script>

<style lang="less" scoped>
.xHeader{
    background-color:  @background-color;
}
// .container-margins{
//   margin-left:@container-margins;
//   margin-right:@container-margins;
// }
</style>
