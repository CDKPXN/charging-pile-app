<template>
<!-- 问答列表 -->
    <div class="newend">
        <div class="topHeader">
            <x-header class="xHeader " :left-options="{showBack: false}">
                        <!--  头部样式 -->
                <x-icon type="ios-search" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/search')"></x-icon>
                <span style="color:#000">互助</span>
                <a slot="right" style="color:#0dbc79" @click.native="jump('/home/toBeAnswered')">待会回答的问题</a>
            </x-header>
        </div>
        <div style="overflow-y: scroll;height:800px">
            <Panel style='margin-top:-6px' type="4" :list="list" size='15' class="stateBody"></Panel>
        </div>
    </div>
</template>
<script>
    import { XButton, Box, Panel, XHeader } from 'vux'
    import URL from '../../config/url.js'
    import store from '../../vuex/store.js'
    import axios from 'axios'

    export default {
        components: {
            XButton,
            Box,
            Panel,
            XHeader
        },
        data () {
            return {
                list: [
                    {
                        src: 'http://somedomain.somdomain/x.jpg',
                        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '充电桩App使用常见问题',
                        desc: '1.如何退款？点击我的页面中的余额在我的余额页面上角。。。。blablabla',
                        url: '/home/stateDetail',
                    }, 
                    {
                        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '老是显示充电桩未与车未连接',
                        desc: '好的。谢谢了',
                        url: {
                            path: '/home/stateDetail',
                            replace: false
                        },
                        meta: {
                            source: '0赞同',
                            date: '待回答',
                            other: '关注问题'
                        }
                    }
                    // {
                    //     src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    //     title: '我的充电桩用不了是怎么回事？',
                    //     desc: '不够具体啊',
                    //     url: {
                    //         path: '/home/stateDetail',
                    //         replace: false
                    //     },
                    //     meta: {
                    //         source: '0赞同',
                    //     }
                    // },
                    // {
                    //     src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    //     title: '成都金牛区哪里有充电桩',
                    //     desc: '在定位地图中可以找到',
                    //     url: {
                    //         path: '/home/stateDetail',
                    //         replace: false
                    //     },
                    //     meta: {
                    //         source: '0赞同',
                    //         date: '2关注',
                    //         other: '关注问题'
                    //     }
                    // },
                    // {
                    //     src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    //     title: '请问退款的钱一般几天能到账？怎么查询？',
                    //     desc: '两天肯定到',
                    //     url: {
                    //         path: '/home/stateDetail',
                    //         replace: false
                    //     },
                    //     meta: {
                    //         source: '0赞同'
                    //     }
                    // },
                    // {
                    //     src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    //     title: '停车费怎么算的',
                    //     desc: '两天肯定到',
                    //     url: {
                    //         path: '/home/stateDetail',
                    //         replace: false
                    //     },
                    //     meta: {
                    //         source: '待回答'
                    //     }
                    // },
                    // {
                    //     src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    //     title: '停车费怎么算的',
                    //     desc: '两天肯定到',
                    //     url: {
                    //         path: '/home/stateDetail',
                    //         replace: false
                    //     },
                    //     meta: {
                    //         source: '待回答'
                    //     }
                    // },
                    // {
                    //     src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    //     title: '停车费怎么算的',
                    //     desc: '两天肯定到',
                    //     url: {
                    //         path: '/home/stateDetail',
                    //         replace: false
                    //     },
                    //     meta: {
                    //         source: '待回答'
                    //     }
                    // },
                    // {
                    //     src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    //     title: '停车费怎么算的',
                    //     desc: '两天肯定到',
                    //     url: {
                    //         path: '/home/stateDetail',
                    //         replace: false
                    //     },
                    //     meta: {
                    //         source: '待回答'
                    //     }
                    // },
                    // {
                    //     src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                    //     title: '停车费怎么算的',
                    //     desc: '两天肯定到',
                    //     url: {
                    //         path: '/home/stateDetail',
                    //         replace: false
                    //     },
                    //     meta: {
                    //         source: '待回答'
                    //     }
                    // }
                ]
            }
        },
		methods: {
            jump (url) {
                this.$router.push(url)
            }
        }
    }

</script>
