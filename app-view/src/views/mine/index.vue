<template >
    <div  >
        <x-header class="xHeader" :left-options="{showBack: false}" style="background-color: #f05225 !important;">

            <x-icon type="ios-arrow-back" size="20" style="position:absolute;left:14px;top:14px" @click.native="back()"></x-icon>
            <span style="color:#fff">我的</span>
        </x-header>
        <!-- 已登录的显示 -->
        <div class="user_card"  v-show="showUserMsg">
            <flexbox style="display;flex;" >
                <flexbox-item class="center">
                    <div>
                        <img src="../../assets/user.jpg" class="user_img" alt="暂无图片"  @click="GotoInfo">
                    </div>
                </flexbox-item>
                <flexbox-item class="center" >
                    <div>
                        <span style="float: left;padding-top: 30px;margin-left: -20%;color:#fff" @click="GotoInfo">{{name}}</span>
                    </div>
                </flexbox-item>
            </flexbox>
            <!-- <flexbox>
                <flexbox-item class="center" style="padding-top:5px;font-size:26px">
                    {{name}}
                </flexbox-item>
            </flexbox> -->
            <flexbox>
                <flexbox-item class="center" style="padding-top:5px;font-size:22px">
                    <p style="font-size:22px">余额</p>
                    <p style="font-size:22px">{{balance}}&nbsp;元</p>
                </flexbox-item>
                <flexbox-item class="center">
                    <p  style="font-size:22px">红包</p>
                    <p  style="font-size:22px">{{r_num}}&nbsp;个</p>
                </flexbox-item>
            </flexbox>
        </div>
        <!-- 未登录显示 -->
        <div class="user_card" style="display:flex"  v-show="!showUserMsg">
            <flexbox>
                <flexbox-item :span="12" style="text-align:center;position:relative">
                    <!-- <div style="margin-top:50px">您还没有登录</div> -->
                     <img  style="position:absolute;top:-62px;left:66px"  src="../../assets/user.jpg" class="user_img" alt="暂无图片">
                </flexbox-item>
            </flexbox>
            
            <div style="margin-top:20px;width:220px">
                <flexbox style="width:220px;marginTop:30%;marginLeft:10%"  >
                    <flexbox-item :span="6" style="text-align:right;flex: 0 0 100%" >
                        <!-- <x-button mini class="loginBtn" @click.native="GotoLogin">登录</x-button> -->
                        <span  style="backgroundColor:transparent"  class="loginBtn" @click="GotoLogin">未登录点击登录</span>
                    </flexbox-item>
                    <!-- <flexbox-item :span="6" style="text-align:left">
                        <x-button mini class="loginBtn" @click.native="GotoRegister">注册</x-button>
                    </flexbox-item> -->
                </flexbox>
            </div>
        </div>
        <!-- 个人列表功能 -->
        <div style="margin-top:10px;">
            <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="3">
                <!-- 测试禁用 -->
                <grid-item  class="mine"  link="/home/user/appCash" label="账户充值">
                    <img slot="icon" src="../../assets/5.png">
                </grid-item>
                <grid-item  class="mine" link='/home/user/order' label="实时状态">
                    <img slot="icon" src="../../assets/4.png">
                </grid-item>
                 <grid-item   class="mine" link='/home/user/orderList' label="充电记录">
                    <img slot="icon" src="../../assets/2.png">
                </grid-item>
            
                <grid-item class="mine"  link='/home/user/rechargeList' label="充值记录">
                    <img slot="icon" src="../../assets/3.png">
                </grid-item>
                                 <grid-item  class="mine" link="/home/user/collection" label="我的收藏">
                    <img slot="icon" src="../../assets/1(1).png">
                </grid-item>
                  <grid-item  class="mine"  link='/home/user/appCash/chooseRedEnvelopes' label="红包">
                    <img slot="icon" src="../../assets/hongbao.png">
                </grid-item>
                <grid-item  class="mine"  link='/home/notice/notice' label="系统公告">
                    <img slot="icon" src="../../assets/gongao.png">
                </grid-item>
           

                 <grid-item  class="mine" link="/home/user/info/modify" label="设置">
                    <img slot="icon" src="../../assets/set.png">
                </grid-item>
                <!--<grid-item link='/home/invoice/invoiceList' label="开具发票">
                    <img slot="icon" src="../../assets/icons/invoice.png">
                </grid-item>-->
                <grid-item  class="mine" link='/home/user/index' label="帮助">
                    <img slot="icon" src="../../assets/help.png">
                </grid-item>
                <grid-item  class="mine" link='/home/about/index' label="关于我们">
                    <img slot="icon" src="../../assets/aboutus.png">
                </grid-item>
            </grid>

            <!--<cell  title="我的信息"
                link="/home/user/info/modify" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/account.png">
            </cell>-->
            <!-- <cell  title="账户充值"
                link="/home/user/appCash" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/money.png">
            </cell>
            <cell title="实时状态"
                link='/home/user/order' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/account.png">
            </cell> -->
             <!--<cell style="font-size:12px" title="我的收藏" link='/home/user/orderList' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/collection.png">
            </cell>
             <cell style="font-size:12px" title="离线地图" link='/home/user/orderList' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/collection.png">
            </cell> -->
            <!-- <cell title="充电记录" 
                link='/home/user/orderList' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/list.png">
            </cell>

            <cell title="充值记录" 
                link='/home/user/rechargeList' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/rechargeList.png">
            </cell>

            <cell title="关于我们" 
                link='/home/about/index' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/aboutE.png">
            </cell>
            <cell title="设置" 
                link='/home/set/index' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/setting.png">
            </cell> -->
            <!-- 测试用的 start-->
            <!-- </cell>
               <cell title="支付订单" 
                link='/home/user/recharge/payOrder' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/setting.png">
            </cell>
            </cell>
               <cell title="提交订单" 
                link='/home/user/recharge/subOrder' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/setting.png">
            </cell>
            </cell>
               <cell title="完成订单" 
                link='/home/user/recharge/comOrder' is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../assets/icons/setting.png">
            </cell> -->
            <!-- over -->
            <Tabbar />
        <toast position="bottom" type="text" v-model="showtoast">再按一次退出</toast>
        </div>
    </div>
</template>
<script>
    import { Cell, Group ,Box,XButton, Flexbox, FlexboxItem, XHeader, Grid, GridItem,Toast} from 'vux'
    import Tabbar from "../charge/components/tabbar"
    import URL from '../../config/url.js'
    import store from '../../vuex/store.js'
    import {format} from '../../config/format.js'
    import axios from 'axios'

    export default {
        components: {
            XButton,Box,Group,Cell,Flexbox,FlexboxItem,XHeader,Grid,GridItem,Tabbar,Toast
        },
        data () {
            return {
                name:'未填写',
                sex:'未填写',
                email:'未填写',
                carType:'未填写',
                phone:store.getters.getPhone,
                balance:'XXX',
                r_num:'XXX',
                showUserMsg:false,
                showtoast:false,
              backClick:0,
              time: new Date(),
            }
        },
        created () {
            let vm=this;
            console.log(new Date())
            if(sessionStorage.getItem('token')==null){
                this.showUserMsg = false
            }else{
                this.showUserMsg = true
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/personalCenter',
                    headers:{'token':sessionStorage.getItem('token')}
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        vm.balance = (res.data.data.balance+res.data.data.hdBalance)/100;
                        vm.name = res.data.data.name;
                        vm.car = res.data.data.vehicleType;
                        store.UserMsg = res.data.data
                        console.log(store.UserMsg)
                    }
                })
            }
            this.getEnvelopes()
      
            document.addEventListener("backbutton", this.EBackButton, false);
            
        },
        beforeDestroy: function() {
         document.removeEventListener("backbutton", this.EBackButton, false);
        },
        mounted () {
            console.log(new Date())
        },
        methods:{
        //   hongbao(event){
        //       this.$router.push('/home/user/appCash/chooseRedEnvelopes');
        //       window.event? window.event.cancelBubble = true : e.stopPropagation();//组织冒泡事件       
        //   },
           back(){
               this.$router.go(-1)
           },
            GotoInfo (url) {
               console.log('进来了')
                if(sessionStorage.getItem('token')==null){
                    this.jump('/login')
                }else{
                    this.jump('/home/user/info/modify')
                }
            },
            GotoLogin () {
                this.jump('/login')
            },
            GotoRegister () {
                this.jump('/register')
            },
            // 获取红包个数
            getEnvelopes(){
                let vm = this
                vm.$ajax({
                    method:'get',
                    url:'/app/activity/unusedRedPacket',
                    headers:{'token':sessionStorage.getItem('token')},
                }).then(res => {
                    if(res.data.code == 200){
                        vm.r_num = res.data.data.length
                    }
                })
            },
           EBackButton() { 
          if (this.backClick > 0 && Date.parse(new Date()) - this.time < 2000) {
            // 不为0时
            this.backClick = 0;
            navigator.app.exitApp(); // app退出
          } else {
            this.showtoast = true; // 提示信息
            if (Date.parse(new Date()) - this.time < 2000) {
              // 小于2s,退出程序    
              this.backClick++;
            } else {
              // 大于2s，重置时间戳，
              this.time = Date.parse(new Date());
              this.backClick = 0;
            }
          }   
      
    },  
        }
    }
</script>
<style scoped>
 
    *{
        font-family: '微软雅黑';
    }
    p{
        font-size: 14px;
    }
    .userImg{
        width:60%;
        border-radius: 50%;
        margin-top:4%
    }
    .userName{
        color:#272525;
        font-size:16px;
    }
    .userMsg{
        color:#7a7878;
        font-size: 10px;
    }
    .center{
        text-align:center;
    }
    .num{
        font-size:14px;
        font-weight: bold
    }
    .numMsg{
        font-weight: 400;
        font-size: 12px
    }
    .user_card{
        margin:auto;
        margin-top:20px;
        background:linear-gradient(90deg,#f05225 0%,#f05225 100%);
        /* background-color:#66cc90; */
        height:190px;
        width:86%;
        color:#ffffff;
        border-radius: 10px;
    }
    .user_img {
        margin-top:30px;
        width:60px;
        border-radius: 50%;
    }
    .center {
        text-align:center;
        font-size:24px;
    }
    .loginBtn {
        
        color:#ffffff;
        width:20px;
        margin-right: 40%
    }
    .weui-grid__label{
        color: #333333 !important;
    }
    #noshow>.vux-flexbox-item{
        margin-top: 40%;
    }
    .weui-grid:after{
        border: none;
    }
    .weui-grids:before{
        border: none;
    }
     .weui-grid{
        padding: 10px 10px !important;
    }
</style>
<style >

.mine>.weui-grid__icon{
        width: 24% ;
        height: auto;
    }
  
</style>

