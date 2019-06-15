<template>
<!-- 充电帮助 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/chargeV')"></x-icon>
            <span style="color:#000">充电帮助</span>
            <a slot="right" style="color:#0dbc79" @click.native="showConfirm">我的反馈</a>
        </x-header>
        <group>
            <cell title="常见问题"></cell>
            <cell title="怎么使用充电桩APP" is-link></cell>
            <cell title="红包使用规则有哪些"is-link></cell>
            <cell title="订单结算时扣款规则是怎样的？" is-link></cell>
        </group>
        <flexbox class="footerMsg">
            <flexbox-item>
                <span>客服工时间:工作日 09:00-18:00</span>
            </flexbox-item>
        </flexbox>
        <flexbox class="helpFooter">
            <flexbox-item>
                <x-button  @click.native="showConfirm">联系客户</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button>意见反馈</x-button>
            </flexbox-item>
        </flexbox>
        <confirm v-model="show"  title="反馈">
            <p style="text-align:center;">暂无反馈</p>
        </confirm>
    </div>
</template>

<script>
    import {XHeader, Cell, Group, XButton, Flexbox, FlexboxItem, Confirm, TransferDom} from 'vux'
    export default {
        components:{
            XHeader,
            Cell,
            Flexbox,
            Group,
            XButton,
            Confirm,
            FlexboxItem
        },
        data () {
            return {
                show:false
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
            showConfirm () {
                this.show = true
            }
        }
    }
</script>

<style>
    .helpFooter{
        position: absolute;
        bottom: -46px;
    }
    .footerMsg{
        position: absolute;
        bottom: 0px;
        left: 24%;
        font-size:14px;
        color:#252424
    }
</style>

