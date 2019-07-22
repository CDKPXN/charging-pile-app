<template>
<!-- 问答评论 -->
    <div>
        <x-header class="xHeader"  :left-options="{showBack: false}">
            <!--  头部样式 -->
            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="jump('/home/invoice/invoiceDetail')"></x-icon>
            <span style="color:#fff">电子开票详情</span>
        </x-header>
        <flexbox orient="vertical" :gutter="0">
            <flexbox-item class="detail_list" style="margin-top:4%">
                <div class="flex-demo">
                    <x-input title="电子邮箱" name="invoice_email" @on-blur="ver_change()" v-model="invoice_email" placeholder="65354824698@qq.com"></x-input>
                </div>
            </flexbox-item>
            <flexbox-item style="margin:6% 0">
                <div class="flex-demo">
                    <p style="margin-left:4%;color:#999999">说明 : 输入邮箱后，再点击提交，系统会自动给你发送电子发票。</p>
                </div>
            </flexbox-item>
        </flexbox>
        <flexbox orient="vertical">
            <flexbox-item>
                <div class="flex-demo" style="width:92%;margin:0 auto">
                    <div>
                        <x-button  class="success_btn success_con"  @click.native="submit_ver">提交</x-button>
                    </div>
                </div>
            </flexbox-item>
        </flexbox>
        <toast v-model="show" type="text">{{message}}</toast>
    </div>
</template>

<script>
import $ from 'jquery';
import { XHeader, Flexbox, FlexboxItem, XInput, XButton,Toast} from 'vux'
    export default {
        components: {
            XHeader,
            Flexbox,
            FlexboxItem,
            XInput,
            XButton,
            Toast
        },
        data () {
            return {
                name:'',
                // 重新发票提交内容
                invoice_djhm:'',
                invoice_email:'',
                show:false,
                message:''
            }
        },
        created () {
            let vm = this
            vm.name = sessionStorage.getItem('name')
            if (sessionStorage.getItem('token') == null){
                vm.jump('/login')
            }
            vm.invoice_djhm = vm.$route.query.djhm
        },
        methods:{
            jump (url) {
                this.$router.push(url)
            },
            // 验证
            ver_change(){
                var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(this.invoice_email == ''){
                    $("input[name='invoice_email']").attr('placeholder','*请填写邮箱地址').addClass('Verification_style')
                }else if(!pattern.test(this.invoice_email)){
                    this.invoice_email = ''
                    $("input[name='invoice_email']").attr('placeholder','*邮箱格式错误').addClass('Verification_style')
                }
            },
            // 提交开发票请求验证
            submit_ver(){
                // 如果返回成功,条状成功界面
                let vm = this
                if(vm.invoice_email != ''){
                    vm.$ajax({
                        method:'post',
                        url:'/app/invoice/sendMail',
                        headers:{'token':sessionStorage.getItem('token')},
                        data:{
                            djhm:vm.invoice_djhm,
                            email:vm.invoice_email
                        }
                    }).then(res => {
                        console.log("sss",res)
                        if(res.data.code == 200){
                             console.log("提交成功")
                            vm.$router.push({path:'/home/invoice/invoiceSuccess'})
                        }else{
                           this.show=true;
                           this.message=res.data.message;
                        }
                    })
                }else{
                    vm.ver_change()
                    return false;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.xHeader{
    background-color:  @background-color;
}
    .draw_input > .weui-cell__hd > label{
        width: 5em !important;
    }
    .Verification_style::-webkit-input-placeholder {/*Chrome/Safari*/
        color:#deacac !important;
    }
    .Verification_style::-moz-placeholder {/*Firefox*/
        color:#deacac !important;
    }
    .Verification_style::-ms-input-placeholder {/*IE*/
        color:#deacac !important;
    } 
    .success_btn{
        background-color: @background-color;
        color: #fff;
    }
</style>
