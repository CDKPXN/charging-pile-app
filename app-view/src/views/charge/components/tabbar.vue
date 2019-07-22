<template>
    <div>  
     <tabbar  >         
      <tabbar-item link="/home/index"   :selected="$route.path=='/home/index'" >
        <img  style="width:30px;height:30px"  slot="icon" src="../../../assets/index1.png" >
         <img  style="width:30px;height:30px"  slot="icon-active" src="../../../assets/index.png"  >
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/home/find"   :selected="$route.path=='/home/find'">
        <img  style="width:30px;height:30px" slot="icon" src="../../../assets/find1.png">
         <img  style="width:30px;height:30px" slot="icon-active" src="../../../assets/find.png">
        <span slot="label">发现</span>
      </tabbar-item>
      <!-- <tabbar-item   id="test" @click.native="Scanning">
        <img  style="width: 60px;height: 60px;border-radius: 50%;"   slot="icon" src="../../../assets/saomio.png">
      </tabbar-item> -->
        <div   id="test" @click="Scanning">
          <img  style="width: 60px;height: 60px;border-radius: 50%;"   slot="icon" src="../../../assets/saomio.png">
      </div>
      <tabbar-item link="/home/bmapV"  :selected="$route.path=='/home/bmapV'">
        <img  style="width:30px;height:30px" slot="icon" src="../../../assets/map1.png">
        <img  style="width:30px;height:30px" slot="icon-active" src="../../../assets/map.png">
        <span slot="label">地图</span>
      </tabbar-item>
      
      <tabbar-item link="/home/mineV"  :selected="$route.path=='/home/mineV'">    
        <img  style="width:30px;height:30px" slot="icon" src="../../../assets/my1.png">
         <img  style="width:30px;height:30px" slot="icon-active" src="../../../assets/my.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
   components: {
    Tabbar,
    TabbarItem
  },
  data(){
      return{
         index:0
      }
   
  },
 
  methods:{
      //扫码充电
    Scanning() {
      if (sessionStorage.getItem("token") == null) {
        this.$router.push("/login");
      } else {
        let vm = this;
        vm.token = sessionStorage.getItem("token");
        this.$ajax({
          method: "get",
          url: "app/charging",
          headers: { token: vm.token }
        }).then(res => {
          if (res.data.code == 400) {
            // 调用cordova的扫描二维码
            // cordova.plugins.barcodeScanner.scan(
            //     function (result) {
            //         if (result.text !== '') {
            //             vm.chargeSet(result.text)
            //         } else {
            //             vm.$router.push('/home/bmapV')
            //         }
            //     },
            //     function (error) {
            //         alert("Scanning failed: " + error);
            //     }
            // )

            //vm.chargeSet("2")
            cloudSky.zBar.scan(
              {
                text_title: "", // Android only
                text_instructions: "请把相机中的红线对准二维码", // Android only
                camera: "back", // defaults to "back"
                flash: "auto", // defaults to "auto". See Quirks
                drawSight: true //defaults to true, create a red sight/line in the center of the scanner view.
              },
              function(s) {
                if (s !== "") {
                  vm.chargeSet(s);
                } else {
                  vm.$router.push("/home/bmapV");
                }
              },
              function(s) {
                console.log("扫码失败：", s);
              }
            );
          } else if (res.data.code == 200) {
            
            console.log(res.data);
            vm.$router.push("/home/user/order");
          }
        });
        //vm.chargeSet("802")
      }
    },
     chargeSet(text) {
      // 获取二维码点桩中的id，去设置充电类型
      this.$router.push({
        path: "/chargeSetting",
        query: {
          chargeId: text
        }
      });
    },
  }
}
</script>

<style scoped>
#test{   
    width: 60px;
    height: 60px;
    margin: -20px auto 0;
    text-align: center;
}
.weui-tabbar:before{
  border: none;
}
</style>
