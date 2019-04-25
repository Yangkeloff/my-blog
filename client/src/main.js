import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MetaInfo from 'vue-meta-info'
import api from './axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(MetaInfo)
Vue.use(iView)

Vue.prototype.$http = api

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
