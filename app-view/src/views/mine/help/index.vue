<template>
    <div>
        <x-header class="xHeader" :left-options="{showBack: false}">
            <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/mineV')"></x-icon>
            <span style="color:#fff">帮助</span>
        </x-header>
        <scroller lock-x scrollbar-y :height="height">
            <div> 
                    <div  >
                        <div class="help_step" >
                            <div style="height:730px">
                                <img src='../../../assets/help/one.jpg' width="100%" alt="">
                            </div>
                        </div>
                        <div class="help_step" >
                             <div style="height:730px">
                                <img src='../../../assets/help/two.jpg' width="100%" alt="">
                            </div>
                        </div>
                        <div class="help_step" >
                            <div style="height:730px">
                                <img src='../../../assets/help/three.jpg' width="100%" alt="">
                            </div>
                        </div>
                        <div class="help_step" >
                            <div style="height:755px">
                                <img src='../../../assets/help/four.jpg' width="100%" alt="">
                            </div>
                        </div>
                         <div class="help_step" >
                            <div style="height:755px">
                                <img src='../../../assets/help/five.jpg' width="100%" alt="">
                            </div>
                        </div>
                         <div class="help_step" >
                            <div style="height:955px">
                                <img src='../../../assets/help/six.jpg' width="100%" alt="">
                            </div>
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
                height:'',
                isTrue:false,
            }
        },
        created () {
            let Height = window.innerHeight
            console.log("ggggg",Height)
            this.height =Height+'px'
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
             
        }
    }
</script>
<style lang="less" scoped>
.xHeader{
    background-color:  @background-color;
}
</style>
<style>

</style>

