<template>
    <div class="newend">
        <h2 class="vx-header vx-size-24">充值失败</h2>
        <h2 class="vx-size-16 vx-color-red ">失败原因：
            <span class="vx-size-16 vx-color-black">{{reason}}</span>
        </h2>
        <box gap="30px 10px 10px 10px">
            <x-button @click.native="backToAccount">返回我的账户</x-button>
        </box>
    </div>
</template>
<script>
    import { XButton, Box } from 'vux'
    import URL from '../../../config/url.js'
    import {format} from '../../../config/format.js'
    import store from '../../../vuex/store.js'
    import axios from 'axios'

    export default {
        components: {
            XButton,
            Box,
        },
        methods: {
            backToAccount(){
                this.$router.push('/home/user/account')
            },
            change (value) {
                console.log('change:', value)
            }
        },
        data () {
            return {
                reason:'XXX'
            };
        },
    }
</script>
<style>
    .vx-header{
        display: block;
        text-align: center;
        font-family: 微软雅黑;
        margin-top: 5px;
    }
    .vx-size-16{
        font-size: 16px;
    }
    .vx-size-32{
        font-size: 32px;
    }
    .vx-size-24{
        font-size: 24px;
    }
    .vx-color-black{
        color:black;
    }
    .vx-color-red{
        color: red;
    }
    .vx-color-blue{
        color:blue;
    }
</style>