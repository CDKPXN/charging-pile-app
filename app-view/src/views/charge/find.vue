<template>
    <div >
        <x-header class="xHeader" :left-options="{showBack: false}" style="background-color: #f05225 !important;
">
      <!--  头部样式 -->
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px;"
        @click="jump('/home/index')"
      ></x-icon>
      <span style="color:#fff">发现</span>
    </x-header>
    <!-- tab -->
    <tab :animate="false" active-color='#f05225' >
      <tab-item selected @on-item-click='itemclick'>精选活动</tab-item>
      <!-- <tab-item   @on-item-click='itemclick'>资讯</tab-item> -->
      <!-- <tab-item  @on-item-click='itemclick'>全部订单</tab-item> -->
    </tab>
    <div style="position:relative" v-show="index==0">
            <div style="position:absolute;margin-top:30%;left:50%;margin-left:-125px;">
                <img src="../../assets/icons/No_record.png" width="250px" alt="">
                <div style="text-align:center;margin-top:10%">
                    <span style="color:#999999;font-size:14px">暂无更多活动</span>
                </div>
             
            </div>
    </div>
      <div style="position:relative" v-show="index==1">
            <div style="position:absolute;margin-top:30%;left:50%;margin-left:-125px;">
                <img src="../../assets/icons/No_record.png" width="250px" alt="">
                <div style="text-align:center;margin-top:10%">
                    <span style="color:#999999;font-size:14px">暂无更多资讯</span>
                </div>
             
            </div>
    </div>              
    <tabbar />
     <toast position="bottom" type="text" v-model="showtoast">再按一次退出</toast>
     
    </div>
</template>

<script>
import {  XHeader,Toast,Tab,TabItem} from 'vux'
import Tabbar from "../charge/components/tabbar.vue"

export default {
    components:{
       XHeader,Tabbar,Toast,Tab,TabItem
    },
    data(){
        return {
              showtoast:false,
              backClick:0,
              time: new Date(),
              index:''
        }
    },
    created(){
        document.addEventListener("backbutton", this.EBackButton, false);
    },
    mounted(){
        
        
    },
    beforeDestroy: function() {
     document.removeEventListener("backbutton", this.EBackButton, false);
  },
    methods:{
      itemclick(index){
       this.index=index;
      },
        jump(url){
           this.$router.push(url)
        },
        EBackButton() {   
          if (this.backClick > 0 && Date.parse(new Date()) - this.time < 2000) {
            // 不为0时
            this.backClick = 0;
            navigator.app.exitApp(); // app退出
          } else {
            this.showtoast = true; // 提示信息
            if (Date.parse(new Date()) - this.time < 2000) {
              // 小于2s,退出程序
              this.backClick++;
            } else {
              // 大于2s，重置时间戳，
              this.time = Date.parse(new Date());
              this.backClick = 0;
            }
          }
      
       
    },
    }

}
</script>

<style>

</style>
