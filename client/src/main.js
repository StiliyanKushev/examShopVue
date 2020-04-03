import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import './plugins/toasts';
import './plugins/cookies';
import router from './plugins/router';

Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router

}).$mount('#app')
