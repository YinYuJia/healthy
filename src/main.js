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

import Vconsole from 'vconsole';
var vConsole = new Vconsole()
export default vConsole;

console.log('------欢迎进入APP首页main.js---20190715__01---')
// 1  网新恩普包  2  浙理办包
Vue.prototype.$build = "2"
  new Vue({
    el: '#app',
    store,
    router,
    components: {
      App
    },
    template: '<App/>'
  })




