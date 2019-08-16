// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import vuex from './vuex/vuex.js';
import store from './vuex/vuex.js' // 使用vuex
import './common/js/rem.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/base.css';
import epFn from './common/js/common.js';

import ep from './common/js/epsdk'
Vue.prototype.$ep = ep

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import {
  MessageBox
} from 'mint-ui';

import axios from 'axios' // 使用axios请求
import './utils/axios.js' //拦截器配置

import * as filters from "./utils/filter"


// import Icon from 'vue-svg-icon/Icon.vue';
// Vue.component('icon',Icon);
import './icons';
// main.js

import 'c-swipe/dist/swipe.css'; // 引入 c-swipe 主文件
import {
  Swipe,
  SwipeItem
} from 'c-swipe';

// 引入mintUI
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// 使用utils
import Util from './utils/util'
Vue.prototype.util = Util;



// Vue.use(vConsole)

// 全局注册组件
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);
// 全局组件
import GlobalComponent from './common/js/globalComponents'
Vue.use(GlobalComponent);

import '../node_modules/swiper/dist/css/swiper.css'
import {
  nextTick
} from 'q';
Vue.use(ElementUI)



Vue.prototype.epFn = epFn
Vue.prototype.$axios = axios
Vue.config.productionTip = false;
if (process.env.NODE_ENV == 'development') {
  Vue.prototype.$isSdk = true
} else {
  Vue.prototype.$isSdk = true

}

Object.keys(filters).forEach(key => { //过滤器
  Vue.filter(key, filters[key])
})


dd.ready({
  developer: 'daip@dtdream.com',
  usage: [
    'dd.biz.user.getUserType', //获取用户类型
  ],
  remark: '获取用户登录类型'
},
() => {

})
// ### 对象的深拷贝
// this.menuFrom = Object.assign({}, res.data.result.sysFunction)

// 获取Android参数
// created(){
//   window.getAndroid = this.getAndroid;
// },
// methods:{
//   getAndroid(dataStr) {
//     this.id = dataStr.pageSize;
//   },
// }


// 公共请求模板
// this.$axios.post('url',{parmas}).then((resData) => {
//   cosole.log(resData)
// }).catch((error) => {
//   console.log(error)
// })

// 调用IOS方法传参              (方法名字)
// window.webkit.messageHandlers.Scan.postMessage(1);
// 调用安卓方法
// window.dzsb.back('H5message');

// 原生调用我的方法
// window.setOrderList = this.setOrderList

// vuex 储存数据方法
// this.$store.dispatch('minusPriceAsync', 30); 

// Svg 图片
{
  /* <svg-icon icon-class="1"  className = "Svg" /> */
}
/* eslint-disable no-new */


// 路由传参
// this.$router.push({
//   name: 'TreatmentReimbursement',
//   params: {
//       id: 1
//   }
// })
// 子组件过去参数
// this.$route.params.id

// 判断终端
// var u = navigator.userAgent;
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

function paramStr(name) {
  var url = window.location.href || window.location.hash
  var after = url.split("?")[1];
  if (after) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = after.match(reg);
    if (r != null) {
      var a = '8afac8196b0b9ab2016b46f1c6e36c4e-ticket#/';
      var str1 = decodeURIComponent(r[2])
      var str = ''
      if (str1.substr(str1.length - 2, 2) == '#/') {
        str = str1.substr(0, str1.length - 2)
        return str
      } else {
        return decodeURIComponent(r[2])
      }
    } else {
      return null;
    }
  }
}

function ApiUrl() {
  // return 'http://10.85.159.203:13030' // 吴学文
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  if (process.env.NODE_ENV == 'development') {
    return 'http://47.98.48.185:8000/api/api' //服务器
    // return 'http://192.168.1.189:13030' //吴学文
  } else {
    return ''
  }
}



console.log('------欢迎进入APP首页main.js---20190715__01---')
import Vconsole from 'vconsole';
var vConsole = new Vconsole()
export default vConsole;

// 1  网新恩普包  2  浙理办包
Vue.prototype.$build = "2"
const isShow = false


console.log('ddddddd', dd)



console.log("------正在注册浙理办SDK组件-------")
if (isShow) {
 // 控制路由跳转

   // 引用浙理办SDK获取用户登录类型
 dd.biz.user.getUserType({
   onSuccess: (data) => {
     // 成功回调 保存到session
     sessionStorage.setItem("userType", data.userType)
     console.log("data获取用户类型", data)
     // 如果是0 或者1 那么是个人登录
     if (data.userType == '0' || data.userType == '1') {
       // url事项配置截取url参数方法  ------开始
       var sp = paramStr('sp')
       console.log(sp == undefined)
       if (sp != "" && sp != undefined && sp != null) {
         const arr1 = sp.split("|")
         let obj = {}
         arr1.map((item, index) => {
           console.log(item.split("=")[0] + '------' + item.split("=")[1])
           console.log()
           obj[item.split("=")[0]] = item.split("=")[1]
         })
         console.log('obj---', obj)
          // url事项配置截取url参数方法  ------结束 如果有存入对象

         sessionStorage.setItem("globalConfigObj", JSON.stringify(obj))
       } else {
         // 如果没有 对象存空
         sessionStorage.setItem("globalConfigObj", JSON.stringify({}))
       }
       // ------------事项url配置截取sp分成对象保存到session里面---------end
       console.log('---globalConfigObj---',sessionStorage.getItem("globalConfigObj"))
       sessionStorage.setItem("iflegal", data.userType)
       //--------------------------- 单点登录逻辑开始-----------------
       const code = 'yibaozs';
       console.log('code', code)
       // var ticket = paramStr("ticket") || "8afac0cc6b84c4aa016b8e7fb4662798-ticket";
       var ticket = paramStr("ticket");
       console.log('ticket-------------', ticket)
       var token = sessionStorage.getItem("getToken")
       console.log('token-------------', token)
       //如果有token直接请求用户信息

       if (token != "" && token != undefined && token != null) {
         axios.post(ApiUrl() + "/H5/jy2005/info", {
           "token": token,
           "tradeCode": "2005"
         }).then(result2 => {
           console.log(6)
           console.log('result2-----------------', result2)
           if (result2.result == "0") {
             sessionStorage.setItem("userName", result2.username)
             sessionStorage.setItem("idCard", result2.idnum)
             console.log('userName', result2.username)
             console.log('idCard', result2.idnum)
           } else {
             MessageBox.alert(result2.errmsg);
             return;
           }
         })
       } else {
         // 如果有ticket 直接用ticket 换取token  再用token 获取用户信息
         if (ticket != "" && ticket != undefined && ticket != null) {
           console.log(4)
           axios.post(ApiUrl() + "/H5/jy2004/info", {
             "st": ticket,
             "tradeCode": "2004"
           }).then(result0 => {
             console.log('result0----------------------', result0)

             if (result0.result == "0") {
               sessionStorage.setItem("getToken", result0.token)
             } else {
               MessageBox.alert(result0.errmsg);
               return;
               // return;
             }
             axios.post(ApiUrl() + "/H5/jy2005/info", {
               "token": result0.token,
               "tradeCode": "2005"
             }).then(result1 => {
               console.log(5)
               console.log('result1------------------', result1)
               if (result1.result == "0") {
                 sessionStorage.setItem("userName", result1.username)
                 sessionStorage.setItem("idCard", result1.idnum)

                 console.log('userName', result1.username)
                 console.log('idCard', result1.idnum)
               
               } else {
                 MessageBox.alert(result1.errmsg);
               }
             })
           });
         } else {
           console.log(3)
           // return;
           // 如果没有ticket 跳入易和获取ticket
           window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=" + code;
           return;
         }
       }

       sessionStorage.setItem("iflegal", data.userType)

     } else if (data.userType == '2') {
       // 如果 userType = 2 那么是法人登录
       // ----------------------获取事项配置url开始---------------------
       console.log('法人登录')
       console.log("window.location.href", window.location.href)
       var arr = window.location.href.split("?")
       if (window.location.href.indexOf("ssoToken") != -1) {
         console.log('----', arr)
         const arr1 = arr[1].split("&")
         let obj = {}
         arr1.map((item, index) => {
           console.log(item.split("=")[0] + '------' + item.split("=")[1])
           obj[item.split("=")[0]] = item.split("=")[1]
         })
         console.log('obj---', obj)
         // ----------------------获取事项配置url结束---------------------
         sessionStorage.setItem("globalConfigObj", JSON.stringify(obj))
       } else {
         sessionStorage.setItem("globalConfigObj", JSON.stringify({}))
       }
       var ssoToken = paramStr("ssoToken");

       console.log('ssoToken', ssoToken)
       if (ssoToken != "" && ssoToken != undefined && ssoToken != null) {
         sessionStorage.setItem("ssoToken", ssoToken);
        
       } else {
         window.location.href = 'https://esso.zjzwfw.gov.cn/opensso/spsaehandler/metaAlias/sp?spappurl=https://ybj.zjzwfw.gov.cn/api/H5/jy2009/info?goto=?epsoft=1'
         return;
       }
     }
   },
   onFail: (error) => {
     console.log("data获取用户类型", error)
   }
 })


} else {
 console.log("######-----", dd)


  dd.biz.user.getUserType({
    onSuccess: (data) => {
      console.log("获取用户类型------", data.userType)
      sessionStorage.setItem("userType", data.userType)
     
    },
    onFail: (error) => {
      console.log("data获取用户类型", error)
    }
  })
}

// 1 个人登录 2 法人登录
// if (isShow) {
//   // 控制路由跳转
//   router.beforeEach((to, from, next) => { 
//     // 引用浙理办SDK获取用户登录类型
//   dd.biz.user.getUserType({
//     onSuccess: (data) => {
//       // 成功回调 保存到session
//       sessionStorage.setItem("userType", data.userType)
//       console.log("data获取用户类型", data)
//       // 如果是0 或者1 那么是个人登录
//       if (data.userType == '0' || data.userType == '1') {
//         // url事项配置截取url参数方法  ------开始
//         var sp = paramStr('sp')
//         console.log(sp == undefined)
//         if (sp != "" && sp != undefined && sp != null) {
//           const arr1 = sp.split("|")
//           let obj = {}
//           arr1.map((item, index) => {
//             console.log(item.split("=")[0] + '------' + item.split("=")[1])
//             console.log()
//             obj[item.split("=")[0]] = item.split("=")[1]
//           })
//           console.log('obj---', obj)
//            // url事项配置截取url参数方法  ------结束 如果有存入对象

//           sessionStorage.setItem("globalConfigObj", JSON.stringify(obj))
//         } else {
//           // 如果没有 对象存空
//           sessionStorage.setItem("globalConfigObj", JSON.stringify({}))
//         }
//         // ------------事项url配置截取sp分成对象保存到session里面---------end
//         console.log('---globalConfigObj---',sessionStorage.getItem("globalConfigObj"))
//         sessionStorage.setItem("iflegal", data.userType)
//         //--------------------------- 单点登录逻辑开始-----------------
//         const code = 'yibaozs';
//         console.log('code', code)
//         // var ticket = paramStr("ticket") || "8afac0cc6b84c4aa016b8e7fb4662798-ticket";
//         var ticket = paramStr("ticket");
//         console.log('ticket-------------', ticket)
//         var token = sessionStorage.getItem("getToken")
//         console.log('token-------------', token)
//         //如果有token直接请求用户信息

//         if (token != "" && token != 'undefined' && token != null) {
//           axios.post(ApiUrl() + "/H5/jy2005/info", {
//             "token": token,
//             "tradeCode": "2005"
//           }).then(result2 => {
//             console.log(6)
//             console.log('result2-----------------', result2)
//             if (result2.result == "0") {
//               sessionStorage.setItem("userName", result2.username)
//               sessionStorage.setItem("idCard", result2.idnum)
//               console.log('userName', result2.username)
//               console.log('idCard', result2.idnum)
//               next()
//             } else {
//               MessageBox.alert(result2.errmsg);
//               return;
//             }
//           })
//         } else {
//           // 如果有ticket 直接用ticket 换取token  再用token 获取用户信息
//           if (ticket != "" && ticket != undefined && ticket != null) {

//             console.log(4)
//             axios.post(ApiUrl() + "/H5/jy2004/info", {
//               "st": ticket,
//               "tradeCode": "2004"
//             }).then(result0 => {
//               console.log('result0----------------------', result0)

//               if (result0.result == "0") {
//                 sessionStorage.setItem("getToken", result0.token)
//               } else {
//                 MessageBox.alert(result0.errmsg);
//                 return;
//                 // return;
//               }
//               axios.post(ApiUrl() + "/H5/jy2005/info", {
//                 "token": result0.token,
//                 "tradeCode": "2005"
//               }).then(result1 => {
//                 console.log(5)
//                 console.log('result1------------------', result1)
//                 if (result1.result == "0") {
//                   sessionStorage.setItem("userName", result1.username)
//                   sessionStorage.setItem("idCard", result1.idnum)

//                   console.log('userName', result1.username)
//                   console.log('idCard', result1.idnum)
//                   next()
//                 } else {
//                   MessageBox.alert(result1.errmsg);
//                 }
//               })
//             });
//           } else {
//             console.log(3)
//             // return;
//             // 如果没有ticket 跳入易和获取ticket
//             window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=" + code;
//           }
//         }

//         sessionStorage.setItem("iflegal", data.userType)

//       } else if (data.userType == '2') {
//         // 如果 userType = 2 那么是法人登录
//         // ----------------------获取事项配置url开始---------------------
//         console.log('法人登录')
//         console.log("window.location.href", window.location.href)
//         var arr = window.location.href.split("?")
//         if (window.location.href.indexOf("ssoToken") != -1) {
//           console.log('----', arr)
//           const arr1 = arr[1].split("&")
//           let obj = {}
//           arr1.map((item, index) => {
//             console.log(item.split("=")[0] + '------' + item.split("=")[1])
//             obj[item.split("=")[0]] = item.split("=")[1]
//           })
//           console.log('obj---', obj)
//           // ----------------------获取事项配置url结束---------------------
//           sessionStorage.setItem("globalConfigObj", JSON.stringify(obj))
//         } else {
//           sessionStorage.setItem("globalConfigObj", JSON.stringify({}))
//         }
//         var ssoToken = paramStr("ssoToken");

//         console.log('ssoToken', ssoToken)
//         if (ssoToken != "" && ssoToken != undefined && ssoToken != null) {
//           sessionStorage.setItem("ssoToken", ssoToken);
//           next()
//         } else {
//           window.location.href = 'https://esso.zjzwfw.gov.cn/opensso/spsaehandler/metaAlias/sp?spappurl=https://ybj.zjzwfw.gov.cn/api/H5/jy2009/info?goto=?epsoft=1'
//         }
//       }
//     },
//     onFail: (error) => {
//       console.log("data获取用户类型", error)
//     }
//   })
// } )

// } else {
//   console.log("######-----", dd)
//   router.beforeEach((to, from, next) => {
//     dd.biz.user.getUserType({
//       onSuccess: (data) => {
//         console.log("获取用户类型------", data.userType)
//         sessionStorage.setItem("userType", data.userType)
//         next()
//       },
//       onFail: (error) => {
//         console.log("data获取用户类型", error)
//       }
//     })
//    })

// }
// document.addEventListener('JSBridgeReady',function() {
  new Vue({
    el: '#app',
    store,
    router,
    components: {
      App
    },
    template: '<App/>'
  })
// },false)


