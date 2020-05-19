import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import getApi from '@/api/index'
import utils from '@/utils/utils'
import '@/assets/styles/reset.css'
import '@/assets/styles/common.css'
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
Vue.use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(MenuItemGroup)
Vue.config.productionTip = false

Vue.prototype.$api = getApi
Vue.prototype.utils = utils

// button阻止重复点击
Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
