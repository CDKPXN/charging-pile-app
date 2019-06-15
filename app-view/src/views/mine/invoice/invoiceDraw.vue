<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader"  :left-options="{showBack: false}">
            <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/invoice/invoiceInformation')"></x-icon>
            <span >开具电子发票</span>
        </x-header>
        <scroller lock-x scrollbar-y :height="height">
            <div>
                <flexbox orient="vertical">
                    <flexbox-item  v-for="(item,index) in data" class="drawList_main" style="margin-top:5% !important;">
                        <div>
                            <div class="drawList_choose">
                                <input type="checkbox" class="tui-checkbox" @click="checkit" :value='item.id' :data-money="item.cost" name="iv">
                            </div>
                            <div class="drawList_content" style="width:80%;margin-left:20%">
                                <p style="position:relative;width:60%;display:inline-block;">开票金额 : ¥{{item.cost}}
                                    <img src="../../../assets/gantanhao.png" @click="showTip(index)" class="imgBtn" style="width:20px;height:20px;position:absolute;right:-11%;top:50%;margin-top:-10px;" alt="">
                                </p>
                                <!-- <p>
                                    <popover placement="bottom" style="margin-left: 40%;float:right;margin-top:-30px">
                                        <div slot="content" style="background-color:white;color:black" class="popover-demo-content">
                                            <p>12121212132</p>
                                            <p>12121212132</p>
                                        </div>
                                        <img src="../../../assets/icons/invioceTip.png" alt="">
                                    </popover>
                                </p> -->
                                <p class="tip">
                                    <img src="../../../assets/icons/invoiceDialog.png" style="display:none;width: 55%;position:absolute;margin-left:23%;margin-top:-2%" alt="">
                                </p>
                                <p>开始时间 : {{item.begin_time}}</p>
                                <p>结束时间 : {{item.end_time}}</p>
                                <p>充电电量: {{item.electric_quantity}}度</p>
                                <p>充电电站: {{item.sitename}}</p>
                                <p>充值赠送金额消费:{{item.cost-item.cz/100}}</p>
                                <p>充值金额消费: {{item.cost}}元</p>
                            </div>
                        </div>
                    </flexbox-item>
                    
                </flexbox>
            </div>
        </scroller>

        <flexbox orient="vertical" style="position:absolute;bottom:0;z-index:99 !important">
            <flexbox-item>
                <div style="height:80px;line-height:80px;box-shadow:0px 0px 10px 0px rgba(25,29,44,0.3);">
                    <div style="width:90%;margin:0 auto;height:80px;position:relative">
                        <input type="checkbox" class="tui-checkbox" value="1" style="left：4%" id="all" name="">
                        <span style="color：#333333;font-size:18px;">&nbsp;全选</span>
                        <button class="submit_next xButton" @click="submit_next">下一步</button>
                    </div>
                </div>
            </flexbox-item>
        </flexbox>
        <!-- 下一步提示框 -->
        <div v-transfer-dom>
            <alert v-model="nextShow" title="提示">请选择需开具的发票</alert>
        </div>
        <!-- 最多只能选50个 -->
        <div v-transfer-dom>
      <alert v-model="show" title="提示" >最多只能选50个发票</alert>
        </div>
    </div>
</template>

<script>
import { XHeader , Group, Cell, Scroller , Flexbox, FlexboxItem, XButton, Alert ,TransferDomDirective as TransferDom, CheckIcon,Popover } from 'vux';
import $ from 'jquery';
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
            Alert ,
            CheckIcon,
            Popover 
        },
        data () {
            return {
                name:'',
                data: [],
                invoiceIdList:[],  //选中的子单据id
                invoiceMoney:0, //选中子单据的开票金额
                height:'',
                nextShow:false,
                show:false
            }
        },
        mounted () {

            let Height = window.innerHeight - 134
            this.height =Height+'px'

            // 给全选绑定事件
            document.getElementById("all").addEventListener("click", checkall, false);
            // 全选方法
            function checkall() {
                var num = document.getElementsByName("iv").length
                
                for (var i = 0; i < num; i++) {
                    if (document.getElementById("all").checked == true) {
                        document.getElementsByName("iv")[i].checked = true;
                    } else {
                        document.getElementsByName("iv")[i].checked = false;
                    }
                }
            } 


        },
        created () {
            let vm = this
            vm.name = sessionStorage.getItem('name')
            if (sessionStorage.getItem('token') == null){
                vm.jump('/login')
            } else {
                this.Get_invoiceList()
            }
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
            // 单个选时，当选中个数等于全部的个数就选中全选，或者就取消选中的全选按钮
            checkit() {
                var num = document.getElementsByName("iv").length;
                var n = 0;
                for (var i = 0; i < num; i++) {
                    if (document.getElementsByName("iv")[i].checked == true) {
                        n = n + 1;
                    }
                    //当选择超过50个,就不可选
                    if(n>50){
                        if(document.getElementsByName("iv")[i].checked==true){
                           document.getElementsByName("iv")[i].checked==false;
                           this.show=true;  
                    }
                }
                }
              
                if (n == num) {
                    document.getElementById("all").checked = true;
                } else {
                    document.getElementById("all").checked = false;
                }
            },
            Get_invoiceList () {
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/invoice/uninvoicedOrders',
                    headers:{'token':localStorage.getItem('token')},
                })
                .then(res=>{
                    if(res.data.code == 200){
                        vm.data = res.data.data
                        vm.data.map(item => {
                            item.cost = item.cost / 100
                        })
                    }
                })
            },
            // 下一步操作
            submit_next(){
                this.next = false
                this.invoiceIdList = []
                var iv = document.getElementsByName("iv");
                for(var i = 0;i < iv.length;i++){
                    if(iv[i].checked != false){
                        this.invoiceIdList.push(iv[i].value)
                        this.invoiceMoney = parseFloat(this.invoiceMoney) + parseFloat(iv[i].getAttribute("data-money"))
                    }
                }
                if(this.invoiceIdList.length == 0){
                    this.nextShow = true
                }else{
                    let strId = JSON.stringify(this.invoiceIdList)
                    this.$router.push({path:'/home/invoice/invoiceDrawDetail',query:{id:strId,money:this.invoiceMoney}})
                }
            },
            // 提示淡入淡出
            showTip(index){
                //当前被点击的提示框显示,其他隐藏
                var num = $(".tip").children("img").length
                for(var i = 0 ; i< num ; i++){
                    if(i == index){
                        $(".tip").children("img").eq(i).fadeToggle()
                    }else{
                        $(".tip").children("img").eq(i).fadeOut()
                    }
                }
                //对document绑定一个隐藏提示框方法
                $(document).click(function(){
                    $(".tip").children("img").fadeOut();
                })

                event.stopPropagation(); //阻止事件向上冒泡

                $(".tip").children("img").click(function(event) {
                    event.stopPropagation(); //阻止事件向上冒泡
                });
            }
        }
    }
</script>
<style  lang="less" scoped>
.xHeader{
 background-color: @background-color !important; 
}

    .drawList_main{
        height:200px;
        box-shadow:0px 1px 20px 0px rgba(7,0,2,0.2);
        border-bottom:1px solid rgba(7,0,2,0.2)
    }
    .drawList_choose{
        width:20%;
        margin-top: -3%;
        text-align:center;
        float:left;
        height:200px;
        
    }
    .drawList_content{
        height: 150px;
        color:#666666
    }
    .drawList_content p:first-child{
        color: black;
        font-size: 1.1rem;
        margin-top: 4%;
        margin-bottom: 2%;
    }
    .submit_next{
         background-color:  @background-color;
        border-radius:54px;
        border: 0;
        font-size: 18px;
        color: white;
        height: 50px;
        width: 40%;
        position: absolute;
        right: 0;
        top:50%;
        outline: none;
        z-index: 1;
        margin-top: -25px;
    }
    .tui-checkbox:checked {
        background:@background-color;
        top: 50%;
        margin-top: -15px;
        outline: none;
        border:0
    }
    .tui-checkbox {
        width:30px;
        height:30px;
        background-color:#ffffff;
        border:solid 1px #999999;
        -webkit-border-radius:50%;
        border-radius:50%;
        font-size:0.8rem;
        top: 50%;
        margin-top: -15px;
        padding:0;
        outline: none;
        position:relative;
        display:inline-block;
        vertical-align:top;
        cursor:default;
        -webkit-appearance:none;
        -webkit-user-select:none;
        user-select:none;
        -webkit-transition:background-color ease 0.1s;
        transition:background-color ease 0.1s;
    }
    .tui-checkbox:checked::after {
        content:'';
        top:7px;
        left:8px;
        position:absolute;
        background:transparent;
        border:#fff solid 2px;
        border-top:none;
        border-right:none;
        height:8px;
        width:12px;
        -moz-transform:rotate(-45deg);
        -ms-transform:rotate(-45deg);
        -webkit-transform:rotate(-45deg);
        transform:rotate(-45deg);
    }
</style>
