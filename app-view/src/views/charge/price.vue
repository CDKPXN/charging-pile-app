<template>
    
</template>
<script>
//此页面的作用是重新刷新首页 加载定位
    import { Cell, Group ,Box,XButton, Flexbox, FlexboxItem, XHeader} from 'vux'

    import URL from '../../config/url.js'
    import store from '../../vuex/store.js'
    import {format} from '../../config/format.js'
    import axios from 'axios'

    export default {
        components: {
            XButton,Box,Group,Cell,Flexbox,FlexboxItem,XHeader
        },
        data () {
            return {
                
            }
        },
        created () {
            

        },
        mounted () {
            console.log(new Date())
        },
        methods:{
            
            GotoInfo (url) {
                
            },
            GotoLogin () {
                
            },
            GotoRegister () {
                
            }
        }
    }
</script>
<style>
    *{
        font-family: '微软雅黑';
    }
    p{
        font-size: 14px;
    }
    .userImg{
        width:60%;
        border-radius: 50%;
        margin-top:4%
    }
    .userName{
        color:#272525;
        font-size:16px;
    }
    .userMsg{
        color:#7a7878;
        font-size: 10px;
    }
    .center{
        text-align:center;
    }
    .num{
        font-size:14px;
        font-weight: bold
    }
    .numMsg{
        font-weight: 400;
        font-size: 12px
    }
    /* .user_card{
        margin:auto;
        margin-top:20px;
        background-color:#66cc90;
        height:200px;
        width:86%;
        color:#ffffff;
        border-radius: 10px;
    } */
    .user_img {
        margin-top:30px;
        width:60px;
        border-radius: 50%;
    }
    .center {
        text-align:center;
        font-size:24px;
    }
    .loginBtn {
        background:#afaeae;
        color:#ffffff;
        width:20px
    }
</style>