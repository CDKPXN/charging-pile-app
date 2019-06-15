<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click="jump('/home/mineV')"></x-icon>
            <span style="color:#000">设置</span>
            <!-- <a slot="right" style="color:#0dbc79" @click="show4 = true">分享</a> -->
        </x-header>
        <group>
            <cell title="个人信息" link="/home/user/info/modify" is-link></cell>
            <!--<cell title="修改密码" is-link></cell>
            <cell title="版本检测"  is-link></cell>
            <cell title="关于" is-link></cell>-->
        </group>
        <x-button  type="primary" class="bottomBtn" style="border-radius:99px;width:90%;height:36px;bottom:20px;background:#1AAD19;margin-left:5%" @click.native="OutAuth()">退出登录</x-button>
        <!-- <x-button type="primary"  class="bottomBtn" @click.native="OutAuth()">退出登录</x-button> -->
    </div>
</template>

<script>
import store from '../../../config/store.js'
import { XHeader , Group, Cell, XButton} from 'vux'
    export default {
        components: {
            XHeader,
            Group,
            Cell,
            XButton
        },
        data () {
            return {
                data: []
            }
        },
        created () {

        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
            OutAuth () {
                
                sessionStorage.removeItem('token')
                localStorage.removeItem('token')
                store.UserMsg = []
                this.jump('/home/mineV')
            },
        }
    }
</script>
