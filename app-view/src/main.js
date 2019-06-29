// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import store from './vuex/store.js'
import router from './router'
import App from './App'
import BaiduMap from 'vue-baidu-map'
import VueAMap from 'vue-amap';
import axios from 'axios'
import url from './config/url.js'
import "./assets/less/theme.less"

import VueScroller from 'vue-scroller'
import Fastclick from 'Fastclick'
import  { ConfirmPlugin ,LoadingPlugin } from 'vux'
import * as util from './config/util';

Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

Vue.prototype.util=util;
Vue.prototype.nomalURL=url;
// const fastclick = require('fastclick');
Fastclick.attach(document.body);
// 封装一个全局跳转
Vue.prototype.jump = function () {
  if (arguments.length == 1) {
    this.$router.push(arguments[0])
  } else {
    this.$router.push({
      path: arguments[0],
      query: arguments[1]
    })
  }
  if (arguments.length > 2) {
    console.error('参数超过封装好的jump方法')
  }
}

// 封装定义请求的地址
let ajax = axios.create({
  baseURL: url.LOCALSRC,
  timeout: 20000,
  // headers: {'Header': url.token}
})

Vue.prototype.$ajax = ajax
Vue.prototype.token = url.TOKEN

Vue.prototype.slb = function (msg) {  // 全局console.log调试
  console.log(msg)
}
Vue.use(VueScroller)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'h1F6CgQ4MVXXL2smfer6DL0RrKUyyeO0'//ios ak
  
  // ak: 'cT9pk8FfbzTsI2hWhkgMdqfB2xQPO5yF'
})

Vue.prototype.minHeight = document.documentElement.clientHeight;
Vue.prototype.minWidth = document.documentElement.clientWidth;


// 引入vue-amap
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   // 高德的key
//   key: '77856287e0245f953790e60bdcfac9a6',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 高德 sdk 版本，默认为 1.4.4
//   v: '1.4.4'
// })
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')



