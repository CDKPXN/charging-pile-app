<template>
<!-- 提交订单 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
            <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click="jump('/home/mineV')"></x-icon>
            <span style="color:#000">提交订单</span>
        </x-header>
        <group>
            <flexbox style="text-align:center;margin-bottom:50px;" >
                <flexbox-item>
                    <div>
                        <img src="../../../assets/images/overOrder.png" style="width:30%;height:30%" alt="">
                    </div>
                    <div style="margin-top:30px;">
                        <span style="font-size:18px;color:#333333">支付成功</span>
                    </div>
                    <div style="margin-top:10px;">
                        <span style="font-size:16px;color:#999999">感谢您使用蓉E充，祝你生活愉快！</span>
                    </div>
                </flexbox-item>
            </flexbox>
            <flexbox class="subStyle">
                <flexbox-item style="padding:0 10px;">
                    <div class="clearStyle">
                        <span class="PositLeft">消费金额 :</span><span class="PositRight">¥120.00</span>
                    </div>
                    <hr style="height:1px;background:#CCCCCC;border:none;margin:-5px 0 10px 0;">
                    <div class="clearStyle">
                        <span class="PositLeft">开始时间 :</span><span class="PositRight">2017-01-21 14:06:36</span>
                    </div>
                    <div class="clearStyle">
                        <span class="PositLeft">结束时间 :</span><span class="PositRight">2017-01-21 14:06:36</span>
                    </div>
                    <div class="clearStyle">
                        <span class="PositLeft">充电电站 :</span><span class="PositRight">天泉充电站</span>
                    </div>
                    <div class="clearStyle">
                        <span class="PositLeft">充电地址 :</span><span class="PositRight">天泉路200号</span>
                    </div>
                     <div class="clearStyle">
                        <span class="PositLeft">充电桩号 :</span><span class="PositRight">03号桩</span>
                    </div>
                    <div class="clearStyle">
                        <span class="PositLeft">充电电量 :</span><span class="PositRight">130度</span>
                    </div>
                </flexbox-item>
            </flexbox>
        </group>
        <!-- <flexbox>
            <flexbox-item>
                <x-button  type="primary" class="bottomBtn" style="border-radius:99px;height:36px;width:90%;bottom:20px;background:#1AAD19;margin-left:5%" @click.native="subOreder()">提交订单</x-button>
            </flexbox-item>
        </flexbox> -->
    </div>
</template>
<script>
import store from '../../../config/store.js'
import { XHeader , Group, Cell, XButton, Flexbox, FlexboxItem, PopupPicker, Alert, TransferDomDirective as TransferDom} from 'vux'
    export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            Group,
            Cell,
            XButton,
            Flexbox,
            FlexboxItem,
            PopupPicker,
            Alert
        },
        data () {
            return {
                
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
            subOreder(){
                this.jump('/home/user/recharge/payOrder')
            },
        },
    }
</script>
<style>
 .subStyle{
    width:90%;
    margin-top:36px;
    margin-left:5%;
    font-size:16px;
 }
 .clearStyle{
    position: relative;
    font-size: 16px;
    height: 40px;
 }
 .PositLeft{
     position: absolute;
     left:0
 }
 .PositRight{
     position: absolute;
     right: 0;
 }
</style>
