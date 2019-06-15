<template>
<!-- 个人信息展示 -->
    <div class="newend">
        <x-header class="xHeader" :left-options="{showBack: false}">
        <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/mineV')"></x-icon>
            <span style="color:#fff">个人信息</span>
            <a slot="right" style="color:#fff" v-if="isTrue" @click="updateUserName()">保存</a>
        </x-header>
        <group id="eee">
            <!-- <cell title="头像" value="value" is-link>
                <img src="../../../assets/user.jpg" alt="" style="border-radius:50%">
            </cell> -->
            <x-input title="手机号码" placeholder="" readonly="readonly" v-model="phone"></x-input>
            <x-input title="昵称" placeholder="请输入昵称" v-model="name"  @on-focus="onFocus"></x-input>
            <popup-picker :title="title" :data="list" popup-title="请选择" v-model="value" @on-change="onChange" placeholder="请选择"></popup-picker>
            <popup-picker popup-title="请选择" :title="title" :data="list1" v-model="value1" @on-change="onChange1" placeholder="请选择">
                <template slot="title" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
                <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
                    <span style="vertical-align:middle;">车辆型号</span>
                </span>
                </template>
            </popup-picker>
            <!-- <x-input title="是否购买新能源汽车" value="value">{{car ==''?'未购买':'已购买'}}</x-input> -->
            <!-- <x-input title="品牌型号" value="value" is-link>{{car}}</x-input> -->
        </group>
        <div>
            <!-- <x-button  type="primary" class="bottomBtn" style="border-radius:99px;height:36px;width:40%;bottom:20px;left:5%" @click.native="updateUserName()">确认修改</x-button> -->
            <x-button  type="primary" class="xButton" style="border-radius:99px;width:90%;height:36px;margin-top:20px;line-height: 36px;" @click.native="OutAuth()">退出登录</x-button>
        </div>
        <toast v-model="showSuccess" :time="1000">修改成功</toast>
    </div>
</template>
<script>
    import { XHeader, Cell, Group, XButton  ,XInput, Toast ,PopupPicker,TransferDomDirective as TransferDom} from 'vux'
    import {format} from '../../../config/format.js'
    import store from '../../../config/store.js'
    import Car from '../../../config/car.js'
    
    export default {
        components: { Group, XHeader, Cell, XButton ,XInput , Toast ,PopupPicker,},
        data () {
            return {
                name:'',
                email:'',
                carType:'',
                sex:'',
                show:false,
                isTrue:false,
                // 用户信息
                phone: '',
                car: '',
                showSuccess:false,
                title: '车辆品牌',
                list: [],
                list1: [],
                value: [],
                value1: [],
            }
        },
        created () {
            let vm = this
            if (sessionStorage.getItem('token') == null) {
                vm.jump('/login')
            } else {
                vm.GetUserMsg()
            }
            store.obj()
            this.list = Car.CarName
        },
        // watch:{
        //     value(){
        //         this.isTrue = true
        //     },
        //     value1(){
        //         this.isTrue = true
        //     }
        // },
        methods: {
            updateUserName () {
                let vm = this
                let vehicleType = vm.value[0] +'--'+ vm.value1[0]
                console.log(vehicleType)
                vm.$ajax({
                    method:'put',
                    url:'/app/personalCenter',
                    headers:{'token':sessionStorage.getItem('token')},
                    data:{
                        name: vm.name,
                        vehicleType:vehicleType,
                    }
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        vm.showSuccess = true
                        store.UserMsg = res.data.data
                        setTimeout(
                        　　function(){
                                vm.jump('/home/mineV')
                            },1000
                        )
                    }
                })
            },
            GetUserMsg () {
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/personalCenter',
                    headers:{'token':sessionStorage.getItem('token')}
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        vm.phone = res.data.data.phone;
                        vm.name = res.data.data.name;
                        vm.car = res.data.data.vehicleType;
                        var vehicle = vm.car.split('--')
                        vm.value.push(vehicle[0])
                        vm.value1.push(vehicle[1])
                        store.UserMsg = res.data.data
                        console.log(store.UserMsg)
                    }
                })
            },
            ViewData () {
                let vm = this
                vm.phone = store.UserMsg.phone;
                vm.name = store.UserMsg.name;
                vm.car = store.UserMsg.vehicleType;
                var vehicle = vm.car.split('--')
                vm.value.push(vehicle[0])
                vm.value1.push(vehicle[1])
            },
            onChange (val) {
                this.value1 = []
                this.list1 = Car.CarType(val[0])                
                this.isTrue = true
            },
            onChange1 (val) {
                this.isTrue = true
            },
            //退出登陆
            OutAuth () {
                sessionStorage.removeItem('token')
                localStorage.removeItem('token')
                store.UserMsg = []
                this.jump('/home/mineV')
            },
            onFocus(val, $event){
                this.isTrue = true
                console.log('on focus', val, $event)
            }
        }
    }
</script>
<style  lang="less" scoped>
.xHeader{
    background-color:  @background-color;
}
.xButton{
  background-color: @background-color ;
}
    .demo1-item {
        border: 1px solid #ececec;
        padding: 5px 15px;
    }
    .demo1-item-selected {
        border: 1px solid green;
    }
    .sex-title{
        width: 50px;
        padding-top: 10px;
        padding-left: 15px;
        float: left;
        display: flex;
        font-size: 17px;
    }
    .vux-checker-box{
        padding-top: 4px;
        padding-bottom: 4px;
    }
    .userBtn{
        position: absolute;
        bottom:48px;
        height:46px;
        font-size:14px
    }
    #eee{
        height: 230px;
    }
   
</style>
<style>
   #eee>.vux-no-group-title{
        height: 100%;
    }
</style>

