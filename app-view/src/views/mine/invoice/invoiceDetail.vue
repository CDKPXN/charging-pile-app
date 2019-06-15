<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader"  :left-options="{showBack: false}">
            <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/invoice/invoiceList')"></x-icon>
            <span >电子开票详情</span>
        </x-header>
        <flexbox orient="vertical" :gutter="0"> 
            <flexbox-item class="detail_list"> 
                <div class="flex-demo" > 
                   <!-- <span class="detail_title" style="color:#999999">发票信息</span>  -->
                    <group id="test">
                           <cell :title="voicetitle" is-link  @click.native="showvoice1"></cell>
                    </group>
                     <div v-transfer-dom>
                            <x-dialog v-model="showvoice" class="dialog-demo">
                             <div class="img-box">
                                <!-- <img src="http://106.75.173.82/data/pdf/test.pdf" alt=""> -->
                                <iframe :src="pdfFile" width="100%" height="100%" ></iframe>                                                             
                            </div>
                           <div  style="width:100%;height:40px;display:flex; align-items:flex-end;"  @click="showvoice=false">
                              <span class="vux-close">×</span>
                           </div>
                           </x-dialog>
                     </div>
                 </div>
            </flexbox-item> 
        </flexbox> 
        <flexbox orient="vertical" :gutter="0">
            <flexbox-item class="detail_list">
                <div class="flex-demo">
                    <span class="detail_title">发票抬头</span>
                    <span class="detail_content">{{data.gfmc}}</span>
                </div>
            </flexbox-item>
            <flexbox-item class="detail_list">
                <div class="flex-demo">
                    <span class="detail_title">税号</span>
                    <span class="detail_content">{{data.gfsh}}</span>
                </div>
            </flexbox-item>
            <flexbox-item class="detail_list">
                <div class="flex-demo">
                    <span class="detail_title">发票金额</span>
                    <span class="detail_content"> {{ parseFloat( data.jshj/100)}}元</span>
                </div>
            </flexbox-item>
            <flexbox-item class="detail_list">
                <div class="flex-demo">
                    <span class="detail_title">申请时间</span>
                    <span class="detail_content">{{data.ctime}}</span>
                </div>
            </flexbox-item>
              <flexbox-item class="detail_list"   @click.native="jump('/home/invoice/orderList')">
                <div class="flex-demo" style="display: flex;justify-content: space-between;padding-right:5%;"> 
                    <div style="display:flex;height: 80px;flex-direction: column;padding-left: 5%;">
                             <span style="height:50%">一张发票</span>
                             <span style="height:50%">{{data.count}}个订单</span>
                    </div>
                     <!-- <span class="detail_content" style="margin-left:-86%;" >{{data.hjje}}</span> -->
                     <!-- <span style="display:flex; align-items: center;font-size:18px;color: #b2b2b2;" >＞</span> -->
                     <div style="display:flex; align-items: center;">
                          <x-icon type="ios-arrow-right"   size="18"></x-icon>
                     </div>
                       
                </div>
            </flexbox-item>
        </flexbox>
        <flexbox orient="vertical" :gutter="0">
            <flexbox-item>
                <div class="flex-demo" style="width:90%;margin:0 auto;text-align:center;">
                   <x-button type="primary" class="detail_btn" @click.native="reset_invoice">重发电子发票</x-button>
                   <!-- <p style="margin-top:5%" @click="customer_hotline">客服热线</p> -->
                </div>
            </flexbox-item>
        </flexbox>
        <!-- 客服热线 -->
        <div v-transfer-dom>
            <confirm v-model="show"
            title="操作提示"
            @on-confirm="onConfirm">
            <p style="text-align:center;">是否立即拨打客服热线？</p>
            <p style="text-align:center;">028-88888888</p>
            </confirm>
        </div>
    </div>
</template>

<script>
import { XHeader,Group, Cell,Calendar, Scroller , Flexbox, FlexboxItem, XButton, Confirm,XDialog, XSwitch,TransferDomDirective as TransferDom} from 'vux'

   export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            Group,
            Cell, 
            Scroller,
            Flexbox,
            FlexboxItem,
            XButton,
            Confirm,
             XSwitch,
             XDialog ,
             Calendar,
        },
        data () {
            return {
                name:'',
                data: {},
                djhm:'',
                testdjhm:"",
                show:false,
                showvoice:false,
                voicetitle:'发票信息',
                showToast: false,
                invoiceId:"",
                pdfFile:''
            }
        },
        created () {
            let vm = this
            //vm.djhm是上个页面传下来的id
            vm.djhm = vm.$route.query.invoiceId
            if(!vm.djhm){
               vm.djhm=sessionStorage.getItem("invoicedjhm")   
            }else{
                sessionStorage.setItem("invoicedjhm",vm.djhm) 
            }
           
            vm.name = sessionStorage.getItem('name')
            if (sessionStorage.getItem('token') == null){
                vm.jump('/login')
            } else {
                this.Get_invoice_detail()
            }    
        },
        methods:{
            jump (url) {
                this.$router.push({path:url,query:{'testdjhm':this.testdjhm}})
            },
            showvoice1(){
                this.showvoice=true;
            },
            Get_invoice_detail () {
                let vm = this
             
                
           
                vm.$ajax({
                    method:'get',
                    url:'/app/invoice/'+vm.djhm,
                    headers:{'token':sessionStorage.getItem('token')},
                })
                .then(res=>{
                    if(res.data.code == 200){
                        vm.data = res.data.data
                        vm.invoiceId=res.data.data.id
                        vm.testdjhm=res.data.data.djhm
                        vm.pdfFile=this.nomalURL.nomalURL+"/data/pdf/"+res.data.data.djhm+".pdf"                    
                        console.log("详情")
                        console.log(vm.data)
                        console.log("详情")
                        sessionStorage.setItem("voiceid",this.testdjhm)  
                    }
                })
            },
            // 重发电子发票
            reset_invoice(){
                this.$router.push({path:'/home/invoice/invoiceReset',query:{"djhm":this.testdjhm}})
            },
            // 显示拨打客服热线提示框
            customer_hotline(){
                this.show = true
            },
            onConfirm () {
                // 发起拨打客服热线的请求
                console.log('发起拨打客服热线的请求')
            }
        }
    }
</script>
<style lang="less" >
.xHeader{
    background-color:  @background-color;
}
    .detail_list{
        height:50px;
        line-height:50px;
    }
    .detail_title{
        display:inline-block;
        margin-left:5%;
        font-size:16px;
        width:30%;
        color:#333333
    }
    .detail_content{
        font-size:14px;
        color:#999999;
    }
    .detail_btn{
        background: @background-color;
        border-radius:54px;
        margin-top: 20%
    }
    
   #test>.weui-cells {
        margin-top: 0px ;
        height: 50px ;
    }
    .weui-cell{
        height: 36px;
        padding: 10px 5%;
    }
    .img-box {
    height: 350px;
    overflow: hidden;
    }
     .vux-close {
    display: inline-block;
    width: 100%;
    height: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 34px;
    }
    .vux-cell-bd>p{
        font-size: 16px;
    }
    .weui-cells:after{
        border-bottom: none;
    }
</style>
