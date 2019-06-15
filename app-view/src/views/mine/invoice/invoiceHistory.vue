<template>     
    <div>
        <x-header
      class="xHeader"
      style="background:linear-gradient(90deg,rgba(92,230,184,1) 0%,rgba(112,224,159,1) 100%) !important;"
      :left-options="{showBack: false}"
    >
      <!--  头部样式 -->
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click.native="jump('/home/invoice/invoiceInformation')"
      ></x-icon>
      <span style="color:#fff">开票历史</span>
    </x-header>
        开票历史
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

<style>

</style>
