import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VuePreview from 'vue-preview'
import VCharts from 'v-charts'

Vue.use(ElementUI);
Vue.use(VuePreview)
Vue.use(VCharts)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
