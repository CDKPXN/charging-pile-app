<template>
<!-- 待回答问题列表 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/stateV')"></x-icon>
            <span style="color:#000">待回答的问题</span>
        </x-header>
        <!-- 问题主体 -->
        <Panel style='margin-top:-6px' type="4" :list="list" size=“15”></Panel>
    </div>
</template>

<script>   
import {XHeader, Panel} from 'vux' 
    export default {
        components:{
            XHeader,
            Panel
        },
        data () {
            return {
                list: [
                    {
                        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '余额退款已经7天了，怎么还不退',
                        url: {
                            path: '/home/stateDetail',
                            replace: false
                        },
                        meta: {
                            source: '1关注',
                            other: '关注问题'
                        }
                    },
                    {
                        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '停车费怎么算的',
                        url: {
                            path: '/home/stateDetail',
                            replace: false
                        },
                        meta: {
                            source: '1关注',
                            other: '关注问题'
                        }
                    },
                    {
                        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '厂家领到国家补贴的证明什么时候能下来？',
                        url: {
                            path: '/home/stateDetail',
                            replace: false
                        },
                        meta: {
                            source: '1关注',
                            other: '关注问题'
                        }
                    },
                    {
                        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '请问退款的钱一般几天能到账？怎么查询？',
                        url: {
                            path: '/home/stateDetail',
                            replace: false
                        },
                        meta: {
                            source: '1关注',
                            other: '关注问题'
                        }
                    },
                    {
                        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '怎么办电卡',
                        url: {
                            path: '/home/stateDetail',
                            replace: false
                        },
                        meta: {
                            source: '1关注',
                            other: '关注问题'
                        }
                    },
                    {
                        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '支持哪些充电app',
                        url: {
                            path: '/home/stateDetail',
                            replace: false
                        },
                        meta: {
                            source: '1关注',
                            other: '关注问题'
                        }
                    }
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