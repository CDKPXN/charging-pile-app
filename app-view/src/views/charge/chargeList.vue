<template>
    <div>
        <!-- 头部 -->
        <x-header 
            class="xHeader" 
            style="z-index:1000" 
            :left-options="{showBack: false}">
            <x-icon 
                type="ios-arrow-back" 
                size="20" 
                style="position:absolute;left:14px;top:14px" 
                @click="Back"></x-icon>
            <span style="color:#000">车主充电记录</span>
        </x-header>

        <!-- 主体 -->
        <scroller 
            style="padding-top: 30px"
            ref="my_scroller">
            <panel type="5" :list="list"></panel>
        </scroller>

        <!-- 底部弹窗 -->
        <actionsheet 
            v-model="showProp" 
            :menus="menus2"  
            show-cancel>
            <p slot="header">
                在这充电怎么样，和大家一起分享一下吧~
            </p>
            <p slot="header" 
                style="margin-top:20px">
                <img 
                    @click="pileok"
                    src="../../assets/icons/pileok.png" 
                    class="imgPile" 
                    alt="图片出错啦!">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img 
                    @click="PileFail" 
                    src="../../assets/icons/pilefail.png" 
                    class="imgPile" 
                    alt="图片出错啦!">
            </p>
        </actionsheet>

        <actionsheet 
            v-model="showFail" 
            :menus="menus1" 
            show-cancel 
            @on-click-menu-menu1="SubmitList">
            <p slot="header">
                充电失败原因
            </p>
            <p slot="header">
                <checker 
                    v-model="demo1" 
                    default-item-class="demo1-item" 
                    selected-item-class="demo1-item-selected">
                    <checker-item value="充电桩故障">充电桩故障</checker-item>
                    <checker-item value="油车占位">油车占位</checker-item>
                    <checker-item value="管理人员不让进去">管理人员不让进去</checker-item>
                    <checker-item value="没有找到站点">没有找到站点</checker-item>
                </checker>
            </p>
            <p slot="header">
                <group>
                    <x-textarea 
                        :max="20" 
                        placeholder="请输入其他的原因" 
                        v-model="failMsg"></x-textarea>
                </group>
            </p>
        </actionsheet>

        <x-button type="primary" class="bottomBtn" @click.native="ShareChargeList">共享我的充电记录</x-button>
    </div>
</template>

<script>
    import { XHeader, Cell, XButton, Panel, Grid, GridItem, Actionsheet, Checker, CheckerItem, XTextarea, Group  } from 'vux'
    export default {
        components:{
            XHeader,
            Cell,
            XButton,
            Panel,
            Grid,
            GridItem,
            Actionsheet,
            Checker,
            CheckerItem,
            XTextarea,
            Group 
        },
        data () {
            return {
                failMsg:'',
                demo1: '',
                menus2: null,
                menus1 :{
                    menu1: '提交'
                },
                showProp: false,
                showFail: false,
                data: new Array(),
                list: new Array(),
            }
        },
        created () {    

            // 创建初期获取充电桩充电记录
            this.GetMsg()
        },
        methods:{

            Back () {   
                // 返回充电桩详情
                this.$router.push({
                    path:'/chargeDetails/tabDetails',
                    query:{
                        id:this.$route.query.id
                    }
                })
            },

            ShareChargeList () {  
                // 共享充电记录-新增充电记录
                let vm = this
                if (sessionStorage.getItem('token')==null) {
                    vm.$router.push('/login')
                } else {
                    vm.showProp = true
                }
            },

            GetMsg () {  
                // 获取充电记录数据
                let vm = this
                vm.$ajax({
                    method:"get",
                    url:'app/siteAuxiliary/site/'+vm.$route.query.id+'/chargingRecord',
                    headers:{'token':vm.token}
                })
                .then(res=>{
                    if(res.data.code==200){
                        vm.data = res.data.data.list
                        vm.data.map((x)=>{
                            vm.list.push(
                                {
                                    src: 'http://img4.duitang.com/uploads/item/201408/12/20140812102945_anHrL.jpeg',
                                    title: x.status == 0?'成功':'失败',
                                    desc: x.content,
                                    meta: {
                                        source: x.name,
                                        date: x.ctime,
                                        other: '其他信息'
                                    }
                                }
                            )
                            vm.list.reverse()
                        })
                    }
                })
            },

            PileFail () {  
                // 失败原因填写
                let vm = this
                vm.showProp = false
                vm.showFail = true
            },

            Post (id,status,content) {
                let vm = this
                vm.$ajax({
                    method: 'post',
                    url: '/app/siteAuxiliary/site/chargingRecord',
                    headers:{'token':sessionStorage.getItem('token')},
                    data: {
                        sid: id,
                        status: status,
                        content: content
                    }
                })
                .then(res=>{
                    if (res.data.code ==200){
                        vm.showProp = false
                        vm.showFail = false
                        vm.GetMsg()
                    }
                }).catch(err=>{console.log(err)})
            },

            pileok () {
                // 充电成功
                let vm = this
                vm.Post(vm.$route.query.id,0,null)
            },

            SubmitList () { 
                //充电失败提交
                console.log(132)
                let vm = this
                vm.Post(vm.$route.query.id,1,vm.failMsg)
            }
        }
    }
</script>

<style>
.bottomBtn{
    font-size:14px;
    position: absolute;
    bottom:0px
}
.weui-media-box__thumb {
    border-radius: 50%
}
.imgPile {
    width:50px
}
</style>