<template>
<!-- 暂时无用 -->
    <div class="newend">
        <x-header class="xHeader" :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <span style="color:#000">发现</span>
        </x-header>
        <img src="../../assets/images/minebackground.jpg" width="100%" height="26%" style="display: block;margin: auto">
        <div class="server">
            <span>我们的服务</span>
        </div>
        <grid :show-lr-borders="true" :show-vertical-dividers="true">
            <grid-item>
                <img slot="icon">
                <span slot="label" style="font-size:12px">路径规划</span>
            </grid-item>
            <grid-item>
                <img slot="icon">
                <span slot="label" style="font-size:12px">车主商城</span>
            </grid-item>
            <grid-item>
                <img slot="icon">
                <span slot="label"style="font-size:12px">活动中心</span>
            </grid-item>
        </grid>
        <grid :show-lr-borders="true" :show-vertical-dividers="true">
            <grid-item>
                <img slot="icon">
                <span slot="label" style="font-size:12px">添加新站点</span>
            </grid-item>
            <grid-item>
                <img slot="icon">
                <span slot="label" style="font-size:12px">违章查询缴费</span>
            </grid-item>
            <grid-item>
                <img slot="icon">
                <span slot="label" style="font-size:12px">电车资讯</span>
            </grid-item>
        </grid>
    </div>
</template>
<script>
    import URL from '../../config/url.js'
    import {format} from '../../config/format.js'
    import store from '../../vuex/store.js'
    import axios from 'axios'
    import { XHeader, Grid, GridItem  } from 'vux'
    export default {
        components: {
            XHeader,
            Grid,
            GridItem
        },
        data () {
            return {
                
            }
        },
        methods: {
        }
    }
</script>
<style  lang="less" scoped>
    /* .vx-footer{
        font-size:18px;
        font-weight: bolder;
        color: #a6a6a6;
        text-align: center;
    } */
    .xHeader{
        background:  @background-color !important;
        font-family: '微软雅黑';
    }
    .server{
        font-size:14px;
        padding:10px;
        font-weight: 400
    }
</style>