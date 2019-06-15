
//引入相关文件

var Vue = require('vue')
var Vuex = require('vuex')

Vue.use(Vuex)


//定义初始化变量
//
const state = {
    phone : '',//用户电话，唯一标示
    qrcode : '',//扫码充电的二维码
    openid : '',
    collection: []  // 收藏
}
// Vue.set(state,'shopCardatas',{});

//定义动作(将新数据添加到shopCardatas中，如果goodsid对应的值已经存在key,则更新)
const mutations = {//模仿ajax获取新数据后 动态更新data
    //触发语句为：this.$store.commit('setPhone', phone);
    ["setPhone"](state, phone){
        state.phone = phone;
    },
    ["clearPhone"](state){
        state.phone = '';    
    },
    ["setQrcode"](state, qrcode){
        state.qrcode = qrcode;
    },
    ["clearQrcode"](qrcode){
        state.qrcode = '';    
    },
    ["setOpenid"](state, openid){
        state.openid = openid;
    },
    ["clearOpenid"](state){
        state.openid = '';    
    },
}

/*
 定义getters，在app.vue中,可以通过计算属性获取到
 computed:{
     goodscount: function(){
     return this.$store.getters.getPhone;  //获取到shopCarCount的值
     }
 }
* */
const getters = {
    getPhone : state =>{
        return state.phone;
    },
    getQrcode : state =>{
        return state.qrcode;
    },
    getOpenid : state =>{
        return state.openid;
    }
};

//actions (通知订阅者)
const actions = {
//  "setPhone":function({commit}, phone){
//      commit('setPhone', phone);//触发上面mutations中的方法
//  }
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})