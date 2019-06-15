<template>
  <!-- 充电站详情 -->
  <div>
    <x-header class="xHeader" :left-options="{showBack: false}">
      <!--  头部样式 -->
      <x-icon
        type="ios-arrow-back"
        size="20"
        style="position:absolute;left:14px;top:14px"
        @click="jump(Exhibition)"
      ></x-icon>
      <span style="color:#fff">站点信息</span>
      <rater slot="right" v-model="collection" :max="1" active-color="#66cc90" :font-size="26"></rater>
    </x-header>
    <div>
      <tab :line-width="2" active-color="#04be02" v-model="index">
        <tab-item class="vux-center" :selected="demo2 === '详情'" @click="demo2 = '详情'">详情</tab-item>
        <tab-item class="vux-center" :selected="demo2 === '状态'" @click="demo2 = '状态'">状态</tab-item>
        <!-- <tab-item class="vux-center" :selected="demo2 === '评价'"  @click="demo2 = '评价'" >评价</tab-item> -->
      </tab>

      <swiper v-model="index" height="800px" :show-dots="false">
        <swiper-item :key="0" style="margin-top:10px">
          <!-- 引入tabdetails组件 -->
          <div class="tab-swiper">
            <TabDetails/>
          </div>
        </swiper-item>
        <swiper-item :key="1">
          <div class="tab-swiper">
            <TabStatic/>
          </div>
        </swiper-item>
        <!-- <swiper-item :key="2">
                    <div class="tab-swiper">
                        <TabComment />
                    </div>
        </swiper-item>-->
      </swiper>
    </div>
    <toast
      v-model="showPositionValue"
      type="text"
      :time="800"
      is-show-mask
      :text="toastMsg"
      position="bottom"
    ></toast>
  </div>
</template>

<script>
//数组去重
function uniq(arr) {
  var temp = []; //一个新的临时数组
  for (var i = 0; i < arr.length; i++) {
    if (temp.indexOf(arr[i]) == -1) {
      temp.push(arr[i]);
    }
  }
  return temp;
}
import {
  XHeader,
  Tab,
  TabItem,
  Rater,
  Toast,
  Swiper,
  SwiperItem,
  Flexbox,
  FlexboxItem
} from "vux";
import TabDetails from "./tabDetails.vue";
import TabStatic from "./tabStatic.vue";
import TabComment from "./tabComment.vue";
import store from "../../vuex/store.js";
let collectionIdArr = [];
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    Rater,
    Toast,
    Swiper,
    SwiperItem,
    TabDetails,
    TabStatic,
    TabComment,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      data: [],
      collection: 0,
      toastMsg: "",
      showPositionValue: false,
      del: true,
      com: false,
      transitionName: "slide-left",
      Exhibition: "",
      list2: ["详情", "状态"],
      demo2: "详情",
      index: 0,
      cid:0,
    };
  },
  mounted() {
    console.log(localStorage.getItem("CollectionArray"));
    // this.GetChargeMsg();
    this.StarIndex();
    this.cid=parseInt(this.$route.query.id);

  },
  watch: {
    index(val) {
      console.log(val);
      let vm = this;
      if (val == 0) {
        vm.demo2 = "详情";
      } else if (val == 1) {
        vm.demo2 = "状态";
      }
      // else if (val == 2) {
      //     vm.demo2 = '评价'
      // }
    },
    collection(val) {
      let vm = this;
      if (val == 1) {
        if (localStorage.getItem("collectionIdArr") == null) {
          vm.showPositionValue = true;
          vm.toastMsg = "收藏成功";
          // console.log("第一个收藏的电站");
          // console.log("他的id是", this.cid);
          collectionIdArr.push(this.cid);
          localStorage.setItem(
            "collectionIdArr",
            JSON.stringify(collectionIdArr)
          );
        } else {
          // local = JSON.parse(localStorage.getItem("collectionIdArr"));
          // console.log("当前id", this.cid);
          collectionIdArr.push(this.cid);
          collectionIdArr = uniq(collectionIdArr);
          //判断传过来的id在id数组里面有没有,没有就弹出
          let arr = JSON.parse(localStorage.getItem("collectionIdArr"));
          if(arr.indexOf(this.cid)==-1){
             vm.showPositionValue = true;
              vm.toastMsg = "收藏成功";
          }
               
          localStorage.setItem(
            "collectionIdArr",
            JSON.stringify(collectionIdArr)
          );
          // console.log("本地的id数组", localStorage.getItem("collectionIdArr"));
           
     
        }
      } else {
        vm.toastMsg = "取消收藏";
        vm.showPositionValue = true;
        collectionIdArr = uniq(
          JSON.parse(localStorage.getItem("collectionIdArr"))
        );
        for (let i = 0; i < collectionIdArr.length; i++) {
          if (collectionIdArr[i] == this.cid) {
            collectionIdArr.splice(i, 1);
            // console.log("删除后的数组", collectionIdArr);
          }
        }
        //  localStorage.removeItem("collectionIdArr")
        localStorage.setItem(
          "collectionIdArr",
          JSON.stringify(collectionIdArr)
        );
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "slide-left";
    }
    this.$router.isBack = false;
    next();
  },
  created() {
    this.getComment();
    this.GetChargeMsg();
    if (this.$route.query.comment == 1) {
      // 判断时候跳转的评论或者是详情，高亮头部导航
      this.com = true;
      this.del = false;
    } else {
      this.com = false;
      this.del = true;
    }
    this.Exhibition = this.$route.query.Exhibition;
  },
  methods: {
    // OnItemClick (url) {
    //     this.jump(url,{'id':this.cid})
    // },
    getComment() {
      // this.$ajax({
      //     method:"get",
      //     url:'/api/commont/site/'+this.cid+'?page=1&size=5999'
      // })
      // .then(res=>{
      //     // this.data = res.data.data.list.length
      //     console.log(this.data)
      // })
    },
    GetChargeMsg() {
      // 获取电站详情
      let vm = this;
      vm.$ajax("/app/chargingNet/" + vm.$route.query.id).then(res => {
        // console.log("电站详情：");
        // console.log(res);
        vm.data.push({
          name: res.data.data.name,
          addr: res.data.data.addr,
          id: res.data.data.id
        });
        console.log("020202156", vm.data);
      });
    },
    StarIndex() {
      let arr = [];
      let vm = this;
       //localStorage.removeItem("collectionIdArr")
      // if (localStorage.getItem("CollectionArray") !== null) {
      arr = JSON.parse(localStorage.getItem("collectionIdArr"));
     
      if (arr != null) {
        let array = uniq(arr); //id数组去重
        // console.log("eeeeeeeeeeee", array);
        for (var i = 0; i < array.length; i++) {
          console.log("进入循环");
          console.log(i);
          if (array[i] == vm.$route.query.id) {
            console.log("存在");
            vm.collection = 1;
          }
        }
      }
    }
  }
};
</script>
<style>
/* .vux-flexbox-item{
  margin-left: -70px !important;
} */
</style>


