<template>
    <div>
        <div style="height:44px;display:flex;background-color:#f05225">
               <p  style="height:100%;line-height: 44px;width:12%;margin-left: 10px; margin-right: 10px;text-align: center; " class="nav-bar-font" >成都</p>
               <div  style="width:70%;position:relative;line-height: 44px;">
                   <!-- <search
                     v-model="value"
                      ref="search"
                      placeholder="输入目的地或充电站"
                      @on-focus="jump('/home/SiteListV')"
                      
                      >
                  </search> -->
                   <icon type="search" style="position:absolute;left:8px;top:16px;"></icon>
                  <input type="text"  placeholder="输入目的地或充电站"   style="height:28px;border-radius:24px;border:0px;width:80%;" v-model="value" @click="jump('/home/SiteListV')">
               </div>      
        </div>
        <scroller  lock-x scrollbar-y :height="height">   
             <div>      
            <section>
             <a  v-if="!show1"> <img   style="width:100%;height:200px;" :src="src1" alt="" ></a>   
              <a :href="href1"  v-if="show1"> <img   style="width:100%;height:200px;" :src="src1" alt="" ></a>                       
            </section>   
             <section   class="section2" >
                 <div @click="jump('/home/user/collection')" >
                     <img src="../../assets/1(1).png" alt="">
                     <span style=" text-align: center;font-size:14px" >我的收藏</span>
                 </div>
                  <div @click="jump('/home/user/orderList')" >
                     <img src="../../assets/2.png" alt="">
                     <span style=" text-align: center;font-size:14px" >充电记录</span>
                 </div>
                  <div @click="jump('/home/user/rechargeList')">
                     <img src="../../assets/3.png" alt="">
                     <span style=" text-align: center;font-size:14px" >充值记录</span>
                 </div>
                  <div  @click="jump('/home/user/appCash')">
                     <img src="../../assets/5.png" alt="">
                     <span style=" text-align: center;font-size:14px" >账户充值</span>
                 </div>
                  <div  @click="jump('/home/user/order')">
                     <img src="../../assets/4.png" alt="">
                     <span style=" text-align: center;font-size:14px" >实时状态</span>
                 </div>
             </section>
              <section style="margin-top:20px" >
                  <a  v-if="!show2">  <img    style="width:100%;height:200px;" :src="src2" alt=""></a>   
                  <a :href="href2" v-if="show2">  <img    style="width:100%;height:200px;" :src="src2" alt=""></a>   
              </section>
             </div>
        </scroller>  
    <Tabbar></Tabbar>
      <toast position="bottom" type="text" v-model="showtoast">再按一次退出</toast>
               <!-- 升级提示框 -->
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur id="upgrade_main">
        <div class="img-box">
          <img src="../../assets/images/upgrade.png" style="max-width:80%;">
          <div id="upgrade_content">
            <p>升级到新版本！</p>
            <!-- <p>1.修复了若干bug</p>
            <p>2.增加公告栏</p>
            <p>3.适配更多机型，优化若干细节</p> -->
            <p  v-for="item in updateData">{{item}}</p>
          </div>
          <div id="upgrade_btn">
            <button @click="upgradeApp">立即升级</button>
          </div>
        </div>
        <div @click="showHideOnBlur=false"  id="updateclose">
          <span class="close_dialog">x</span>
        </div>
      </x-dialog>
    </div>
    </div>
</template>

<script>
import { Scroller,Search,XDialog,TransferDom, Toast,Icon} from 'vux'
import Tabbar from "../charge/components/tabbar.vue"
import url from "../../config/url.js"
import upGradeData from "../../config/upGrade.js"; // 版本号js
export default {
    directives: {
    TransferDom
  },
   components: {
     Scroller,
     Tabbar, 
     Search,
     XDialog,
      Toast,
      Icon
  },
    mounted () {
            let Height = window.innerHeight-10
            this.height =Height+'px'
           
        },
     data(){
            return{
              height:'',
              value:'',
              src1:'',
              src2:'',
              href1:'',
              href2:'',
              show1:false,
              show2:false,
               // app升级提示框
              showHideOnBlur: false,
              showtoast:false,
              backClick:0,
              time: new Date(),
              updateData:[],  
            }
        },
        created(){
       let vm=this;
         vm.$ajax({
              method:'get',
              url:"upload.json",
               }).then(res=>{
                    this.updateData=res.data
                })
       vm.$ajax({
              method:'get',
              url:"/file/record/1",
              headers:{'token':sessionStorage.getItem('token')},
               }).then(res=>{
                    if(res.data.code==200){ 
                      if(res.data.data.href!==''||null){
                          this.show1=true;
                          this.href1=res.data.data.href;
                      }                    
                      this.src1=url.LOCALSRC+'/'+res.data.data.rname;
                      
                    }
                })
          
           vm.$ajax({
              method:'get',
              url:"/file/record/2",
              headers:{'token':sessionStorage.getItem('token')},
               }).then(res=>{
                    if(res.data.code==200){  
                        if(res.data.data.href!==''||null){
                            this.show2=true;
                            this.href2=res.data.data.href;  
                        }             
                      
                     this.src2=url.LOCALSRC+'/'+res.data.data.rname;
                    }
                })
           vm.getApp();   
        document.addEventListener("backbutton", this.EBackButton, false);    
   },
    beforeDestroy: function() {
    document.removeEventListener("backbutton", this.EBackButton, false);
  },
     methods:{
              jump (url) {
                this.$router.push(url)
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
            // 升级App
    upgradeApp() {
      // 跳转到应用市场升级

      var url = "http://chargingpile.companiontek.com/appd/index.html";
      window.location.href = url;
      this.showHideOnBlur = false;
    },
    // 获得app版本
    getApp() {
      
      let vm = this;
      let upGrade = sessionStorage.getItem("upGrade");
      // sessionStorage.removeItem("upGrade");
      if (upGrade !== null) {
        console.log("upGradeData=========" + upGrade);
        return;
      }
      vm.$ajax({
        method: "get",
        url: "/app/version",
        headers: { token: vm.token }
      }).then(res => {      
        if (res.data.code == 200) {
          let data = res.data.data;
          console.log("获取到的版本",data)
          var serverVersion = parseInt(data.replace(/\./g, ""));
          var locatVersion = parseInt(upGradeData.upGrade.replace(/\./g, ""));
          console.log("服务器：" + serverVersion + ",app版本：" + locatVersion);
          if (locatVersion < serverVersion) {
            this.showHideOnBlur = true;
            sessionStorage.setItem("upGrade", true);
          } else {
            this.showHideOnBlur = false;
          }
        }
      });
    }, 
        }
}
</script>

<style lang="css" scoped>
.section2{
    margin-top: 20px;
    margin-bottom: 30px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.section2>div{
    width: 20%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.section2>div>img{
    width: 30px;
    height: 30px;
   
}

/* #test>div{
    width: 80px;
    height: 80px;
} */
/* .weui-tabbar__item  /deep/ .weui-tabbar__icon{
     width: 40px;
     height: 40px;
 } */
 .vux-search-box{
     width:80%;
 }
 .vux-search-box{
     right:0px;
 }
 input::-webkit-input-placeholder {
   text-align: center;
   }
</style>
<style>
.weui-tabbar__icon{
     /* width: 40px;
     height: 40px; */
 }
 .weui-search-bar{
     /* background-color:  #f05225 !important; */
 }
 .weui-search-bar__label{
     /* border-radius: 20px !important; */
     /* background-color: #fff !important; */
 }
 .vux-search-fixed{
     /* left:20% !important; */
 }
 .weui-search-bar:before{
     border: none !important;
 }
 
</style>
<style scoped>
/* 升级样式 */
#upgrade_main .weui-dialog {
  background-color: transparent !important;
  padding: 0 15px !important;
}
#upgrade_content {
  position: absolute;
  top: 40%;
  left: 15%;
  text-align: left;
  color: #333333;
}
#upgrade_content p:first-child {
  font-size: 20px;
  padding-bottom: 10px;
}
#upgrade_btn {
  position: absolute;
  bottom: 30px;
  width: 100%;
  left: 0;
  outline: none;
}
#upgrade_btn button {
  height: 40px;
  width: 70%;
  color: white;
  font-size: 18px;
  background: rgba(111, 225, 160, 1);
  border-radius: 40px;
  border: 0;
}
.close_dialog {
  color: white;
  right: 2px;
  font-size: 28px;
  height: 30px;
  width: 30px;
  background: rgba(0, 0, 0, 0.452);
  text-align: center;
  line-height: 21px;
  border-radius: 100%;
  top: 3%;
  right: 3%;
  position: absolute;
  z-index: 9999 !important;
}
</style>

