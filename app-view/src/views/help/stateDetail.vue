<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/stateV')"></x-icon>
            <span style="color:#000">问答详情</span>
            <a slot="right" style="color:#0dbc79" @click.native="show4 = true">分享</a>
        </x-header>
        <!-- 问答主体 -->
        <div>
            <form-preview header-label="138****0495" header-value="2018-05-16" :body-items="list" :footer-buttons="buttons1"></form-preview>
        </div>
        <div>
            <span class="smallFont">3个回答</span>
        </div>
        <!-- 回答主体 -->
        <div style="margin-top:12px">
            <Panel style='margin-top:-6px' type="4" :list="listPanel" size=“15”></Panel>
        </div>
        <!-- 分享弹窗 -->
        <div> 
            <actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></actionsheet>
        </div>
    </div>
</template>

<script>
import { FormPreview, Panel, XHeader, Actionsheet, Toast } from 'vux'
    export default {
        components: {
            XHeader,
            FormPreview,
            Panel,
            Actionsheet,
            Toast
        },
        data () {
            return {
                show4:false,
                menus1: {
                    menu1: '微信朋友圈',
                    menu2: 'QQ'
                },
                list: [ {  // 问答的数据
                    label: '老是显示充电桩与车未连接'
                }],
                buttons1: [{
                    style: 'primary',
                    text: '关注'
                }, {
                    style: 'primary',
                    text: '回答',
                    link: '/home/answer'
                }],
                listPanel: [  // 回答的数据
                    {
                        title: '138****0495',
                        desc: '好的，谢谢了',
                        url: '/home/stateDetail',
                    },
                    {
                        title: 'Gypsy用户',
                        desc: '换个线',
                        url: '/home/stateDetail',
                    }, 
                    {
                        title: '客户小妹',
                        desc: '您好，车与枪没有连接好，建议换其他桩试试',
                        url: '/home/stateDetail',
                    }, 
                ]
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            }
        }
    }
</script>

<style>
    .smallFont{
        font-size:12px;
        color:rgb(59, 58, 58);
        margin-left:10px
    }
</style>
