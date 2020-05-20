import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import getApi from '@/api/index'
import utils from '@/utils/utils'
import '@/assets/styles/reset.css'
import '@/assets/styles/common.css'
import '@/assets/styles/element-#FCC85F/index.css'
import {
  Input,
  Avatar,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  MessageBox,
  Message,
  Notification,
  Carousel,
  CarouselItem
} from 'element-ui'
Vue.use(Input)
  .use(Avatar)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Carousel)
  .use(CarouselItem)
Vue.config.productionTip = false

Vue.prototype.$api = getApi
Vue.prototype.utils = utils
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

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
