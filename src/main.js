import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

var vm = new Vue({
  vuetify,
  render: h => h(App)
})

vm.$mount('#app')

export default vm
