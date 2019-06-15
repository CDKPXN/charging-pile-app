<template>
<!-- 回答 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <a slot="left" style="color:#0dbc79" @click.native="jump('/home/state')">取消</a>
            <span style="color:#000">回答</span>
            <a slot="right" style="color:#0dbc79" @click.native="jump('/home/state')">提交</a>
        </x-header>
        <div>
            <x-textarea style="margin-right:-10px" placeholder="请填写问题相关的回答"></x-textarea>
        </div>
    </div>
</template>

<script>
import {XHeader, XTextarea} from 'vux'

    export default {
        components: {
            XHeader,
            XTextarea
        },
        data () {
            return {

            }
        },
        methods:{
            jump (url) {
                this.$router.push('/home/stateDetail')
            }
        }
    }
</script>