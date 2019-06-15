<template>
    <scroller lock-x scrollbar-y :height="height">
        <div>
            <div v-for="tmp in chargeStatic" style="height:100px;border-bottom:1px solid #cccccc">
                <div class="tabStatic">
                    <img src="../../assets/icons/Idle.png" v-if="tmp.status==0" alt="">
                    <img src="../../assets/icons/Idle.png" class=""v-if="tmp.status==1" alt="">
                    <img src="../../assets/icons/Idle.png" v-if="tmp.status==2" palt="">
                    <img src="../../assets/icons/charging.png" v-if="tmp.status==3" alt="">
                    <img src="../../assets/icons/fault.png" v-if="tmp.status==4" alt="">
                    <img src="../../assets/icons/locking.png" v-if="tmp.status==5" alt="">
                    <img src="../../assets/icons/Idle.png" v-if="tmp.status==6" alt="">
                </div>
                <div style="height:100px;position:relative">
                    <div class="static_Content">
                        <p>桩编号:{{tmp.name}}</p>
                        <p>
                            <span v-if='tmp.type == 0'>快充</span>
                            <span v-else>慢充</span> | <span v-if="tmp.ctype == 0">交流</span><span v-if="tmp.ctype == 1">30kw</span><span v-if="tmp.ctype == 2">40kw</span><span v-if="tmp.ctype == 3">60kw</span><span v-if="tmp.ctype == 4">120kw</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </scroller>
</template>

<script>
    import { Cell, Flexbox, FlexboxItem, Scroller} from 'vux'
    export default {
        components:{
            Cell,
            Flexbox,
            FlexboxItem,
            Scroller
        },
        data () {
            return {
                chargeStatic:[],
                height:''
            }
        },
        mounted () {
            let Height = window.innerHeight - 90
            this.height =Height+'px'
        },
        created () {
            let vm = this
            vm.$ajax({
                method:"get",
                url:'/api/pile/site/'+this.$route.query.id+'?page=1&size=100',
            })
            .then(res=>{
                console.log('狀態：')
                console.log(res)
                if(res.data.code==200){
                    vm.chargeStatic = res.data.data.list
                    console.log(res.data.data.list)
                }
                console.log(666)
                console.log(vm.chargeStatic)
                console.log(666)
            })
        }
    }
</script>
<style>
.tabStatic{
    width:100px;
    height:100px;
    float:left;
    position:relative;
}
.tabStatic img{
    width: 50px;
    height: 60px;
    position:absolute;top:50%;
    margin-top:-30px;
    left:50%;
    margin-left:-25px;
}
.static_Content{
    position:absolute;
    left:110px;
    top:50%;
    margin-top:-30px
}
.static_Content p:last-child{
    color:#808080;
    margin-top:10px
}
</style>
