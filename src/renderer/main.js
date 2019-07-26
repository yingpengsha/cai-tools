import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import splitPane from 'vue-splitpane';
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component('split-pane', splitPane);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
