<template>
    <div>
        <div style="height:44px;display:flex;background-color:#f05225">
               <p  style="height:100%;line-height: 44px;width:12%;margin-left: 30px; margin-right: 10px;text-align: center; " class="nav-bar-font" >成都</p>
               <div  style="width:70%;position:relative">
                   <search
                     v-model="value"
                      ref="search"
                      placeholder="输入目的地或充电站"
                      @on-focus="jump('/home/SiteListV')"
                      >
                  </search>
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
    </div>
</template>

<script>
import { Scroller,Search} from 'vux'
import Tabbar from "../charge/components/tabbar.vue"
import url from "../../config/url.js"
export default {
   components: {
     Scroller,
     Tabbar, 
     Search,
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
              show2:false
            }
        },
        created(){
       let vm=this;
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
        },
     methods:{
              jump (url) {
                this.$router.push(url)
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
</style>
<style>
.weui-tabbar__icon{
     width: 40px;
     height: 40px;
 }
 .weui-search-bar{
     background-color:  #f05225 !important;
 }
 .weui-search-bar__label{
     /* border-radius: 20px !important; */
     background-color: #EFEFF4 !important;
 }
 .vux-search-fixed{
     left:20% !important;
 }
 .weui-search-bar:before{
     border: none !important;
 }
</style>
