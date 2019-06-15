<template>
  <div class="container" >
    <x-header
      class="xHeader"
     
      :left-options="{showBack: false}"
    >
      <!--  头部样式 -->
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click.native="jump('/home/user/orderList')"
      ></x-icon>
      <span style="color:#fff;" >开具发票</span>
    </x-header>

    <div>
      <cell :title="title1" is-link  @click.native="jump('/home/invoice/invoiceDraw')" ></cell>
    </div>
    <div>
         <cell :title="title2" is-link  @click.native="jump('/home/invoice/invoiceList')"></cell>
    </div>
    <div>
         <cell :title="title3" is-link   @click.native="jump('/home/invoice/invoiceRulus')"></cell>
    </div>
    <div>
         <cell :title="title4" is-link   @click.native="jump('/home/invoice/invoiceHelp')"></cell>
    </div>
    <!-- <div >
      <confirm
      v-model="isreadshow"
      :show-cancel-button="false"
      :title="title"
      @on-confirm="onConfirm">
        <p style="text-align:center;">1.180天以内的充电订单可开具电子发票</p>
        <p style="text-align:center;">2.开票内容针对充电订单中的充值消费金额开具，活动消费金额不在开票范围内</p>
      </confirm>
    </div> -->
  </div>
</template>


<script>
import { Cell, Group,XHeader} from "vux";
export default {
  components: {
    Group,
    Cell,
    XHeader,
    
  },
  data() {
    return {
      title1:"发票列表",
      title2:'开票历史',
      title3:"开票规则",
      title4:"发票帮助",
    };
  },
  methods:{
        jump(url){
                this.$router.push(url)
            },
          // onConfirm(msg){
          //   sessionStorage.setItem('isread',true)
          // }
  },
  created(){
    let isread=localStorage.getItem('isread')
    console.log('read',isread)
    if(isread==null){
        this.$router.push("/home/user/invoiceProtocol")
    }
   
  }
};
</script>

<style  lang="less" scoped >
.xHeader{
  background-color: @background-color;
  height: 46px;
  color: black;
}
 /* .container{
     background-color: grey;
 }   */
 div{
     height: 40px;
 }
</style>
