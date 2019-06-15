<template>
  <div>
    <x-header style="background:#ffffff" :left-options="{showBack: false}">
                <!--  底部菜单 -->
        <a slot="left" style="color:#000" @click="jump('/home/toBeAnswered')">
            <img style="width:30%" src="../../../assets/images/Navigation.png" alt=""> 
            导航
        </a>
        <span style="color:#000;font-size:14px">
            <img style="width:30%" src="../../../assets/images/correction.png" alt=""> 
            纠错
        </span>
        <a slot="right"style="color:#000" @click="jump('/home/toBeAnswered')">
            <img style="width:20%" src="../../../assets/images/talk.png" alt=""> 
            发表评论
        </a>
    </x-header>
  </div>
</template>


<script>

    import { XHeader } from 'vux'
    export default {
        name:'ChargeTabbar',
        components: {
            XHeader
        },
        data () {
          return {
            height:''
          }
        },
        methods: {
            resetScroller () {
                this.$refs.scroller.reset();
            },
        },
        created () {
          this.height = window.screen.height-50
          console.log(this.height)
        }
    }
</script>
<style>
  .weui_bar_item_on{
    background: #05b3f3
  }
  .weui_bar_item_on>p>span{
    color:white;
  }
  .weui_btn_primary{
    background: #05b3f3!important;
    border-radius:0!important;
  }

  .weui-bar__item_on .vux-x-icon{
    fill: #4b9fd0
  }
  .routerStyle{
    width: 100%;
    border: 1px solid #ddd
  }
</style>




