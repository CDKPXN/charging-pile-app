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
    功能开发中,敬请期待
    <tabbar />
     <toast position="bottom" type="text" v-model="showtoast">再按一次退出</toast>
     
    </div>
</template>

<script>
import {  XHeader,Toast} from 'vux'
import Tabbar from "../charge/components/tabbar.vue"

export default {
    components:{
       XHeader,Tabbar,Toast
    },
    data(){
        return {
              showtoast:false,
              backClick:0,
              time: new Date(),
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
