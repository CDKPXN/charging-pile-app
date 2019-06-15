<template >
  <!--<div style=" height: calc(100% - 54px);width:100%;position: fixed;margin-bottom: 53px">-->
  <div :style="{height:height}">
    <!-- <router-view></router-view> -->
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
    </router-view>
    </keep-alive>

     <router-view v-if="!$route.meta.keepAlive">
    <!-- 这里是不被缓存的视图组件，比如 page3 -->
     </router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      height:this.minHeight+"px",
    }
  },
  create(){
    
  },
  mounted(){

  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
