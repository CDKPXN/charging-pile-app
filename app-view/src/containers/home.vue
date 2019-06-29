<template>
  <div>
      <router-view></router-view>
    <!--<div >
      <!-- <tabbar style="position: fixed">

        <tabbar-item link='/home/bmapV' id="location">
          <img v-show="show_home" slot="icon" src="../assets/icons/home_default.png">
          <img v-show="!show_home"slot="icon" src="../assets/icons/home_index.png">
          <span slot="label">定位</span>
        </tabbar-item>

        <tabbar-item link='/home/chargeV' id="charge">
          <img v-show="show_charge"  slot="icon" src="../assets/icons/charge_default.png">
          <img v-show="!show_charge"  slot="icon" src="../assets/icons/charge_index.png">
          <span slot="label">充电</span>
        </tabbar-item>

         <tabbar-item link='/home/mineV' id="mine">
          <img v-show="show_user"  slot="icon" src="../assets/icons/user_default.png">
          <img v-show="!show_user"  slot="icon" src="../assets/icons/user_index.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar> 
    </div>-->
  </div>
</template>


<script>

    import { Tabbar, TabbarItem ,Popup, Group, XSwitch } from 'vux'
    import store from '../vuex/store.js'
    import router from '../router'
		import axios from 'axios'
		import wx from 'weixin-js-sdk'
		import URL from '../config/url.js'
		import {format} from '../config/format.js'
    
    export default {
        components: {
            Tabbar, TabbarItem, Popup, Group, XSwitch
        },
        data () {
          return {
            height:'',
            transitionName: 'slide-left',
            show_home:true,
            show_charge:true,
            show_user:true
          }
        },
        watch:{
          $route (to,form) {
            console.log(location.hash)
            
          }
        },
        updated () {
          let vm = this
            switch (location.hash) {
              case '#/home/chargeV':
              vm.show_charge = false
              vm.show_home = true
              vm.show_user = true
              return 

              case '#/home/bmapV':
              vm.show_charge = true
              vm.show_home = false
              vm.show_user = true
              return 

              case '#/home/mineV':
              vm.show_charge = true
              vm.show_home = true
              vm.show_user = false
              return 
            }
        },
         beforeRouteUpdate (to, from, next) {  
          let isBack = this.$router.isBack  
          if (isBack) {  
            this.transitionName = 'slide-right'  
          } else {  
            this.transitionName = 'slide-left'  
          }  
          this.$router.isBack = false  
          next()  
        },  
        methods: {
          ResetScroller () {
              this.$refs.scroller.reset();
          }
        },
        created () {
          let vm = this
          this.height = window.screen.height-53
          console.log(this.height)
          var token = localStorage.getItem('token')
          // console.log('token: ' + token)
          if(token != null){
            console.log("set token")
            sessionStorage.setItem('token',token)
          }
          
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

  /* .weui-bar__item_on .vux-x-icon{
    fill: #4b9fd0
  }
  .slide-left-enter, .slide-right-leave-active {  
    opacity: 0;  
    -webkit-transform: translate(100%, 0);  
    transform: translate(100%, 0);  
  }  
  .slide-left-leave-active, .slide-right-enter {  
    opacity: 0;  
    -webkit-transform: translate(-100%, 0);  
    transform: translate(-100%, 0);  
  }   */
</style>




