<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
            <!--  头部样式 -->
            <!-- <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click="jump('/home/mineV')"></x-icon> -->
            <span style="color:#fff">选择车型</span>
        </x-header>
        <group>
            <popup-picker :title="title" :data="list" popup-title="请选择" v-model="value" @on-show="onShow" @on-hide="onHide" @on-change="onChange" placeholder="请选择"></popup-picker>
            <popup-picker popup-title="请选择" :title="title" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" placeholder="请选择">
                <template slot="title" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
                <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
                    <span style="vertical-align:middle;">车辆型号</span>
                </span>
                </template>
            </popup-picker>
        </group>
        <div v-transfer-dom>
            <alert v-model="show" title="提示" content="请选择车辆品牌和车辆型号"></alert>
        </div>
        <flexbox>
            <flexbox-item>
                <x-button  type="primary" class="bottomBtn xButton" style="border-radius:99px;height:36px;width:40%;bottom:20px;margin-left:5%" @click.native="Choose()">确认选择</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button  type="primary" class="bottomBtn xButton" style="border-radius:99px;height:36px;width:40%;bottom:20px;margin-left:5%" @click.native="pass()">跳过</x-button>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
import store from '../../../config/store.js'
import Car from '../../../config/car.js'
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
                show:false,
                title: '车辆品牌',
                list: [],
                list1: [],
                value: [],
                value1: [],
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
            onShow () {
                console.log('on show')
            },
            onChange (val) {
                this.value1 = []
                this.list1 = Car.CarType(val[0])
            },
            onHide (type) {
                console.log('on hide', type)
            },
            Choose(){
                if(this.value.length == 0 || this.value1.length == 0){
                    this.show = true
                }else{
                    let vm = this
                    let name = this.$route.query.name
                    let vehicleType = this.value[0] + "--" + this.value1[0]
                    vm.$ajax({
                        method:'put',
                        url:'/app/personalCenter',
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            name: name,
                            vehicleType: vehicleType,
                        }
                    })
                    .then(res=>{
                        if(res.data.code==200){
                            setTimeout(
                            　　function(){
                                    vm.jump('/home/bmapV')
                                },1000
                            )
                        }
                    })
                }
            },
            pass(){
                this.jump('/home/bmapV')
            }
        },
        created () {
            this.list = Car.CarName
        }
    }
</script>
