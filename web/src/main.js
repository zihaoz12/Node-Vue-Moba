import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false

import './style.scss'

new Vue({
  render: h => h(App),
}).$mount('#app')
