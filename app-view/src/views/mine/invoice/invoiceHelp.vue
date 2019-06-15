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
      <span >开票帮助</span>
    </x-header>
  <div class="container-margins">
    <br>
    <p> 1. 进入发票列表，选择订单（多选）开具发票</p>
    <br>
    <p >2. 选择企业或个人，填写表单并提交</p>
     <br>
    <p> 3. 开票申请成功，等待系统生成电子发票</p>
    <br>
    <p >4. 可在开票历史中查看已开票历史记录</p> <br>
    <p> 5. 开票历史中选择开票记录可查看开票结果</p>
    <br>
    <p >6. 可在开票详情中选择重新发送己开具电子发票</p>
  
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
</style>
