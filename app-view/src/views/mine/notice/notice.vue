<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader"  :left-options="{showBack: false}">
                    <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/mineV')"></x-icon>
            <span style="color:#fff">系统公告</span>
        </x-header>
        <div style="position:relative" v-if="isTrue">
            <div style="position:absolute;margin-top:50%;left:50%;margin-left:-125px;">
                <img src="../../../assets/icons/No_record.png" width="250px" alt="">
                <div style="text-align:center;margin-top:10%">
                    <span style="color:#999999;font-size:14px">暂无系统公告~</span>
                </div>
            </div>
        </div>
        <scroller lock-x scrollbar-y :height="height">
            <div>
                <div v-if="!isTrue" v-for="tmp in data" style="height:120px;border-bottom:1px solid lightgray;position:relative">
                    <div style="width:90%;position:absolute;left:50%;margin-left:-45%;height:100px;top:50%;margin-top:-50px">
                        <p style="color:#333333;word-break:break-all;">{{tmp.content}}</p>
                        <p style="color:#333333">客服电话：028-88888888</p>
                        <p style="color:#666666;font-size:12px;text-align:right">{{tmp.startTime}}</p>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import { XHeader , Group, Cell,Scroller} from 'vux'
    export default {
        components: {
            XHeader,
            Group,
            Cell, 
            Scroller
        },
        data () {
            return {
                name:'',
                height:'',
                isTrue:false,
                data: [],
                list: [],
            }
        },
        mounted () {
            let Height = window.innerHeight - 90
            this.height =Height+'px'
        },
        created () {
            let vm = this
            vm.name = sessionStorage.getItem('name')
            if (sessionStorage.getItem('token') == null){
                vm.jump('/login')
            } else {
                this.Get_order_list()
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
            Get_order_list () {
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/annunciate',
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res=>{
                    if(res.data.code == 200){
                        vm.data = res.data.data
                        vm.data.map(item => {
                            item.startTime = item.startTime.slice(0,10)
                        })
                        if(res.data.data.length == 0){
                            this.isTrue = true
                        }
                    }
                })
            },
        }
    }
</script>
<style  lang="less" scoped>
.xHeader{
    background-color:  @background-color;
}
</style>
