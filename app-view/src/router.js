/**
 * Created by toplan on 16/4/11.
 */

var Vue = require('vue')
var Router = require('vue-router')
// install router
Vue.use(Router)

// create router
var router = new Router({
    linkActiveClass: 'active',
    mode: 'hash',
    routes: [
        { path: '/', redirect : "/home"},
        { path: '/home', component: require('./containers/home.vue'),
            children: [

                //{ path: '', redirect : "/home/bmapV"},
                { path: '', redirect : "/home/registerProtocol"},
                { path: '/home/registerProtocol', component: require('./views/charge/RegisterProtocol.vue')},
                { path: '/home/chargeV', component: require('./views/scanne/charge.vue')},
                // { path: '/home/location', component: require('./components/charge/location.vue')},   // 老地图暂时不用
                { path: '/home/index', component: require('./views/charge/index.vue')},
                { path: '/home/bmapV', component: require('./views/charge/BMap.vue'),meta:{ keepAlive: true,isBack:false, }},//此组件需要被缓存 //用于判断上一个页面是哪个
                { path: '/home/find', component: require('./views/charge/find.vue')},
                { path: '/home/stateV', component: require('./views/help/state.vue')},
                { path: '/home/mineV', component: require('./views/mine/index.vue')},
            
                { path: '/home/stateDetail', component: require('./views/help/stateDetail.vue')},  // 帮助列表
                { path: '/home/search', component: require('./views/help/search.vue')},      // 查询帮助列表
                { path: '/home/answer', component: require('./views/help/answer.vue')},  // 回答帮助 
                { path: '/home/toBeAnswered', component: require('./views/help/toBeAnswered.vue')},

                { path: '/home/user/account', component: require('./views/mine/account/info.vue') },
                { path: '/home/user/account/recharge_log', component: require('./views/mine/account/rechargeLog.vue') },
                { path: '/home/user/account/charge/error', component: require('./views/mine/account/chargeError.vue') },

                { path: '/home/user/feedback', component: require('./views/mine/feedback/index.vue') },
                { path: '/home/user/info', component: require('./views/mine/info/index.vue') },

                { path: '/home/aboutV', component: require('./views/common/about.vue') },  // 发现
                { path: '/home/information', component: require('./views/common/information.vue')},

                { path: '/home/pay', component: require('./views/mine/account/pay.vue') },
                { path: '/home/site/Cash', component: require('./views/charge/price.vue') },
                { path: '/home/SiteListV', component: require('./views/charge/siteList.vue') },  // 站点列表
            ]
        },
        // 以下是不在home主菜单框架内的组件  -- 五行之外
        { path: '/login', component: require('./views/auth/login.vue') },  // 登陆
        { path: '/bind',name:"bind", component: require('./views/auth/bind.vue') },  // 登陆
        { path: '/register', component: require('./views/auth/register.vue') },  // 注册
        { path: '/forget', component: require('./views/auth/forget.vue') },  // 忘记密码
        { path: '/chargeSetting', component: require('./views/scanne/chargeSetting.vue')},   //  充电设置
        { path: '/chargeHelp', component: require('./views/help/chargeHelp.vue')},      // 充电帮助
        { path: '/home/user/info/modify', component: require('./views/mine/info/modify.vue')},  // 个人信息

        { path: '/home/user/collection', component: require('./views/mine/collection/index.vue')},

        { path: '/home/user/car/index', component: require('./views/mine/car/index.vue')},  // 添加车辆信息
        // { path: '/home/user/recharge/payOrder', component: require('./views/mine/recharge/payOrder.vue')},  // 支付订单
        // { path: '/home/user/recharge/subOrder', component: require('./views/mine/recharge/subOrder.vue')},  // 提交订单
        // { path: '/home/user/recharge/comOrder', component: require('./views/mine/recharge/comOrder.vue')},  // 完成订单

        { path: '/chargeDetails/chargeList', component: require('./views/charge/chargeList.vue') },  // 充电记录列表
        { path: '/chargeDetails', component: require('./views/charge/chargeDetails.vue'),  // 充电站信息
            children: [
                { path: '', redirect : "/chargeDetails/tabDetails"},
                { path: '/chargeDetails/tabDetails', component: require('./views/charge/tabDetails.vue'),name:'tabDetails'},
                { path: '/chargeDetails/tabStatic', component: require('./views/charge/tabStatic.vue')},
                { path: '/chargeDetails/tabComment', component: require('./views/charge/tabComment.vue')}
            ]
        },  
        { path: '/home/user/orderList', component: require('./views/mine/order/orderList.vue') },  // 充电订单

        { path: '/home/user/rechargeList', component: require('./views/mine/rechargeList/rechargeList.vue') },  // 充值订单

        { path: '/home/user/index', component: require('./views/mine/help/index.vue')},  // 帮助

        { path: '/home/user/appCash', component: require('./views/mine/recharge/appCash.vue') }, // 选择充值方式 
        { path: '/home/user/rechargeProtocol', component: require('./views/mine/recharge/rechargeProtocol.vue') }, // 充值协议
        { path: '/home/user/invoiceProtocol', component: require('./views/mine/invoice/invoiceProtocol.vue') }, // 不知道啥协议
      
        { path: '/home/user/appCash/chooseRedEnvelopes', component: require('./views/mine/recharge/redEnvelopes/chooseRedEnvelopes.vue') }, // 选择充值方式 
        { path: '/home/set/index', component: require('./views/mine/set/index.vue') },  // 设置主页
        { path: '/home/about/index', component: require('./views/mine/about/index.vue') },  // 关于我们
        { path: '/home/notice/notice', component: require('./views/mine/notice/notice.vue') },  // 系统公告
        { path: '/home/invoice/invoiceList', component: require('./views/mine/invoice/invoiceList.vue') },  // 已开发票列表
        { path: '/home/invoice/invoiceDetail', component: require('./views/mine/invoice/invoiceDetail.vue') },  // 发票详情
        { path: '/home/invoice/invoiceReset', component: require('./views/mine/invoice/invoiceReset.vue') },  // 重新开票
        { path: '/home/invoice/invoiceDraw', component: require('./views/mine/invoice/invoiceDraw.vue') },  // 需开发票列表
        { path: '/home/invoice/invoiceInformation', component: require('./views/mine/invoice/invoiceInformation.vue') },//开发票信息
        { path: '/home/invoice/orderList', component: require('./views/mine/invoice/orderList.vue') },//一个发票对应的几个订单
        { path: '/home/invoice/invoiceRulus', component: require('./views/mine/invoice/invoiceRulus.vue') },//开票规则
        { path: '/home/invoice/invoiceHelp', component: require('./views/mine/invoice/invoiceHelp.vue') },//开票帮助
        { path: '/home/invoice/invoiceDrawDetail', component: require('./views/mine/invoice/invoiceDrawDetail.vue') },  // 开具电子发票提交详情
        { path: '/home/invoice/invoiceSuccess', component: require('./views/mine/invoice/invoiceSuccess.vue') },  // 开具电子发票成功
        { path: '/home/user/order', component: require('./views/mine/order/index.vue') },  // 充电状态
    ]
})

import URL from './config/url.js'

// router.beforeEach((to, from, next) => {
    
//     //1)检查state中login信息;2)如果符合,next,否则重写向登陆

// 	console.log(to)
//     if(to.path == '/login'){

// 		if(to.query.openid == "" || to.query.openid == undefined){
			
			
// 			location.href = URL.Auth;
// 		}else{
// 			console.log(to.query.openid)
//         	next();
// 		}
		
//     } else{
//     	//-----------------------跳过微信授权-------------------------------------//
// 			// router.app.$store.commit('setPhone', "15196615983");
// 			// router.app.$store.commit('setOpenid', "oT1t9s6-BogrdYopAOE2myRQ6yqM");

// 		//-----------------------------------------------------------------------//
    	
//     	console.log(123)
//     	console.log(router.app.$store)
// 	    var storeOpenid = router.app.$store.getters.getOpenid;
// 	    var queryOpenid = to.query.openid
	   	
// 	   	var storephone = router.app.$store.getters.getPhone;
// 	    var queryphone = to.query.phoneNumber
	   	
// 		console.log(storeOpenid)
// 		console.log(queryOpenid)
		
// 	    // if((storeOpenid == '') && (queryOpenid == "" || queryOpenid == undefined)){
	    	
// 	    // 	location.href = URL.Auth;
// 	    // }else if((storephone == '') && (queryphone == "" || queryphone == undefined)){
// 	    // 	var openid = (storeOpenid == '')?queryOpenid:storeOpenid
// 	    // 	router.push('/login?openid=' + openid)
// 	    // }else{
// 	    // 	next();
// 	    // }
    	
    // }

// })



module.exports = router
