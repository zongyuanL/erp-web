import Vue from 'vue'
import store from './store/'
import ElementUI from 'element-ui'
import './assets/css/style.scss'
import router from './router/'
import Config from './config/app'
import {isLogin} from './utils/dataStorage'

import App from './App.vue'


import Mock from './mock'; // 引入mock模块

import vConsole from '@/assets/js/vConsole.js'


Vue.prototype.$Config = Config;

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title?to.meta.title+'-'+Config.siteName:Config.siteName;

  if (!isLogin() && to.path != '/login') {
    next({path: '/login'});
  } else {
    next();
  }
});
router.afterEach(transition => {

});


new Vue({
  el: '#app',
  router,
  store,
  mounted (

  ){
      window.startMoc = this.startMoc;
      window.endMoc = this.endMoc;
  },
  methods: {
      startMoc(){
        Mock.start(); //并且执行初始化函数
      },
      endMoc(){
        Mock.end(); //并且执行初始化函数
      },

  },
  render: h => h(App)

});




