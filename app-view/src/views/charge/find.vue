<template>
    <div>
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
    </div>
</template>

<script>
import {  XHeader} from 'vux'
import Tabbar from "../charge/components/tabbar.vue"
export default {
    components:{
       XHeader,Tabbar
    },
    methods:{
        jump(url){
           this.$router.push(url)
        }
    }

}
</script>

<style>

</style>
