<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader"  :left-options="{showBack: false}">
            <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/invoice/invoiceDraw')"></x-icon>
            <span style="color:#fff">开具电子发票</span>
        </x-header>
        <flexbox orient="vertical" style="margin-top:30%">
            <flexbox-item style="text-align:center;">
                <div class="flex-demo" style="width:90%;margin:0 auto">
                    <img src="../../../assets/images/invioce_success.png" alt="">
                    <p style="margin:10% 0;color:#999999">操作成功</p>
                    <div style="margin-top:10%">
                        <x-button type="primary" class="success_btn  xButton"  @click.native="success_con">继续开票</x-button>
                        <x-button class="success_btn success_his "  @click.native="success_his">开票历史</x-button>
                    </div>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
import { XHeader, Flexbox, FlexboxItem, XButton,} from 'vux'
    export default {
        components: {
            XHeader,
            Flexbox,
            FlexboxItem,
            XButton,
        },
        data () {
            return {
                name:'',
            }
        },
        created () {
            let vm = this
            vm.name = sessionStorage.getItem('name')
            if (sessionStorage.getItem('token') == null){
                vm.jump('/login')
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
            // 继续开发票
            success_con(){
                this.$router.push({path:'/home/invoice/invoiceDraw'})
            },
            // 跳转到发票列表
            success_his(){
                this.$router.push({path:'/home/invoice/invoiceList'})
            }
        }
    }
</script>
<style scoped>
    .success_btn{
        height: 40px;
    }
    .xButton{
        border-radius:54px;
        line-height: 40px;
    }
    .success_his{
        height: 40px;
        border:1px solid gray !important;
        border-radius:54px;
        line-height: 4px;
    }
</style>
