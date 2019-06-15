<template>
    <div >
        <!-- <search
      v-model="value"
     
     
    
      ref="search">
      </search> -->
        <scroller lock-x scrollbar-y :height="height">
            <div>
           <swiper loop auto :list="demo_list" :index="demo_index" @on-index-change="demo_onIndexChange" ></swiper>

           <section  class="section" >
               <div>
                     <img src="../../assets/scanning.png" alt="">
                     <span style=" text-align: center;font-size:14px" >电站搜索</span>
               </div>
                <div>
                     <img src="../../assets/scanning.png" alt="">
                     <span style=" text-align: center;font-size:14px">电站搜索</span>
               </div>
                <div>
                     <img src="../../assets/scanning.png" alt="">
                     <span style=" text-align: center;font-size:14px">电站搜索</span>
               </div>
                <div>
                     <img src="../../assets/scanning.png" alt="">
                     <span style=" text-align: center;font-size:14px">电站搜索</span>
               </div>
                <div>
                     <img src="../../assets/scanning.png" alt="">
                     <span style=" text-align: center;font-size:14px">电站搜索</span>
               </div>
                <div>
                     <img src="../../assets/scanning.png" alt="">
                     <span style=" text-align: center;font-size:14px">电站搜索</span>
               </div>
                <div>
                     <img src="../../assets/scanning.png" alt="">
                     <span style=" text-align: center;font-size:14px">电站搜索</span>
               </div>
                <div>
                     <img src="../../assets/scanning.png" alt="">
                     <span style=" text-align: center;font-size:14px">电站搜索</span>
               </div>
           </section>
           <!-- 分界线 -->
         <divider>3</divider>
         <section  class="section-2">
             <div  style="display:flex;justify-content: space-between" >
                 <span >新权益审计</span>
                 <span style="font-size:14px;color:gray" >新权益神级</span>
             </div>
             <div>
                 <img src="../../assets/scanning.png" alt="">
             </div>
         </section>
         <section  style="display:flex;justify-content: space-between;padding: 0 20px;" >
             <span>想充电</span>
             <span  style="font-size:14px;color:gray" >官方自营</span>
         </section>
         <section  class="section-4" >
             <div style="display: flex;padding-left:20px" >
                 <section  style="width:50%;display:flex; flex-direction: column;justify-content: space-between;" >
                     <div style="display: flex; flex-direction: column;margin-top:10px" >
                         <span  >充电桩系列</span>
                         <span  style="font-size:14px;color:gray;" >快充慢充</span>
                     </div>
                     <div  style="margin-bottom:10px">
                         <span >随心挑选</span>
                     </div>
                 </section>
                 <section  style="width:50%">
                     <img  style="width:100%;height:100%"  src="../../assets/scanning.png" alt="">
                 </section>
             </div>
             <div style="display: flex;padding-right:20px" >
                 <section  style="width:50%;display:flex; flex-direction: column;justify-content: space-between;" >
                     <div style="display: flex; flex-direction: column;margin-top:10px" >
                         <span  >充电桩系列</span>
                         <span  style="font-size:14px;color:gray;" >快充慢充</span>
                     </div>
                     <div  style="margin-bottom:10px">
                         <span >随心挑选</span>
                     </div>
                 </section>
                 <section  style="width:50%">
                     <img  style="width:100%;height:100%"  src="../../assets/scanning.png" alt="">
                 </section>
             </div>
         </section>
         <section style="display: flex;justify-content: space-between;padding:0 20px" >
             <span>享红利</span>
             <span  style="font-size:14px;color:gray" >抢先机</span>
         </section>
         <section style="width:100%;height:100px" >
             <img style="width:100%;height:100px" src="../../assets/scanning.png" alt="">
         </section>
           <section style="display: flex;justify-content: space-between;padding:0 20px" >
             <span>享买车</span>
             <span  style="font-size:14px;color:gray" >专注电动</span>
         </section>
         <section  style="width:100%;display:flex;justify-content: space-between;margin-top: 10px;" >
             <div style="width:50%;display:flex;flex-direction: column;align-items: center;" >
             <span>大客户专享</span>
             <span   style="font-size:14px;color:gray">政府企业</span>
             <img style="width:60px;height:60px" src="../../assets/scanning.png" alt="">
             <span>专享通道</span>
             </div>
             <div style="width:50%;">
                 <div style="display:flex;justify-content: space-between;">
                     <div style="display:flex;flex-direction: column;" >
                         <span>全国网校</span>
                         <span style="font-size:14px;color:gray">网上购车</span>
                         <span>零售</span>
                     </div>
                     <div>
                          <img style="width:70px;height:70px" src="../../assets/scanning.png" alt="">
                     </div>
                 </div>
                  <div style="display:flex;justify-content: space-between;">
                     <div style="display:flex;flex-direction: column;" >
                         <span>全国网校</span>
                         <span style="font-size:14px;color:gray">网上购车</span>
                         <span>零售</span>
                     </div>
                     <div>
                          <img style="width:70px;height:70px" src="../../assets/scanning.png" alt="">
                     </div>
                 </div>
             </div>
         </section>
           <section style="display: flex;justify-content: space-between;padding:0 20px;margin-top:20px;margin-bottom:10px;" >
             <span>最新动态</span>
             <span  style="font-size:14px;color:gray" >更多动态＞</span>
         </section>
         <divider>3</divider>
       <section style="display: flex;justify-content: space-between;width:100%;padding:10px 20px;" >
           <div style="display: flex;flex-direction: column;width:50%;justify-content: space-around;">
               <span>五四青年节,与梦想同行</span>
               <div>
                   <span style="font-size:14px;color:gray">特来电动态</span>
                   <span style="font-size:14px;color:gray">2109.0504</span>
               </div>
           </div>
           <div style="width:30%;" >
               <img  style="width:90px;height:90px" src="../../assets/scanning.png" alt="">
           </div>
       </section>
         <hr style="border:1 dashed #987cb9" width="100%" color=#a1a0a0 SIZE=1>
          <section style="display: flex;justify-content: space-between;width:100%;padding:10px 20px;" >
           <div style="display: flex;flex-direction: column;width:50%;justify-content: space-around;">
               <span>五四青年节,与梦想同行</span>
               <div>
                   <span style="font-size:14px;color:gray">特来电动态</span>
                   <span style="font-size:14px;color:gray">2109.0504</span>
               </div>
           </div>
           <div style="width:30%;" >
               <img  style="width:90px;height:90px" src="../../assets/scanning.png" alt="">
           </div>
       </section>
        <hr style="border:1 dashed #987cb9" width="100%" color=#a1a0a0 SIZE=1>
          <section style="display: flex;justify-content: space-between;width:100%;padding:10px 20px;" >
           <div style="display: flex;flex-direction: column;width:50%;justify-content: space-around;">
               <span>五四青年节,与梦想同行</span>
               <div>
                   <span style="font-size:14px;color:gray">特来电动态</span>
                   <span style="font-size:14px;color:gray">2109.0504</span>
               </div>
           </div>
           <div style="width:30%;" >
               <img  style="width:90px;height:90px" src="../../assets/scanning.png" alt="">
           </div>
       </section>
        </div>
        </scroller>
        <!-- tabbar -->
         <tabbar>
      <tabbar-item>
        <img slot="icon" src="../../assets/scanning.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item >
        <img slot="icon" src="../../assets/scanning.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item  id="test">
        <img  style="width: 80px;height: 80px;border-radius: 50%;"   slot="icon" src="../../assets/scanning.png">
      </tabbar-item>
      <tabbar-item link="/component/demo">
        <img slot="icon" src="../../assets/scanning.png">
        <span slot="label">社区</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../../assets/scanning.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
    </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider,Scroller, Tabbar, TabbarItem,Search} from 'vux'

// const baseList = [{
//   url: 'javascript:',
//   img: '../../assets/scanning.png',
//   title: '送你一朵fua'
// }, {
//   url: 'javascript:',
//   img: '../../assets/marker.png',
//   title: '送你一辆车'
// }, {
//   url: 'javascript:',
//   img: '../../assets/marker.png', // 404
//   title: '送你一次旅行',
// //   fallbackImg: '../../assets/marker.png'
// }]
const baseList=[
    require('../../assets/marker.png'),
     require('../../assets/scanning.png'),
      require('../../assets/user.jpg')
];
const urlList = baseList.map((item, index) => ({
  url: 'javascript',
  img: item,
//   fallbackImg: item.fallbackImg,
//   title: `(可点击)${item.title}`
}))
export default {
    components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider,
    Scroller,
     Tabbar, 
     TabbarItem,
     Search
  },
  
  data(){
      return{
        demo_list: urlList,
        demo_index: 0,
        height:'',
        value:''
      }
      
  },
   mounted () {
            let Height = window.innerHeight-10
            this.height =Height+'px'
            console.log("height",Height)
        },
  methods:{
    demo_onIndexChange (index) {
        // console.log("index",index)
      this.demo_index = index
    },
  }
}
</script>

<style scoped >
.section{
    margin-top: 10px;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    /* border: 1px solid red; */
}
.section>div{
    width: 25%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.section>div>img{
    width: 50px;
    height: 50px;
   
}
.section-2{
    padding: 0 20px;
}
.section-2>div:nth-of-type(2)>img{
    width: 100%;
    height: 100px;
}
.section-4{
    margin-top: 10px;
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: space-between;
}
.section-4>div{
    width: 50%;
}
#test{
    position: fixed;
    bottom: 2%;
    left: 35%;
    width: 80px;
    height: 80px;
    /* background-color:rgba（0,0,0,0）; */
}
#test>div{
    width: 80px;
    height: 80px;
}
</style>
