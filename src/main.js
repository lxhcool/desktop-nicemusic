import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import getApi from '@/api/index'
import utils from '@/utils/utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import infiniteScroll from 'vue-infinite-scroll'
import Loading from '@/components/common/loading/Index.vue'
import 'swiper/css/swiper.css'
import '@/assets/styles/reset.styl'
import '@/assets/styles/common.css'
import '@/assets/font/PingFangSCMedium.css'
import {
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Image,
  Icon,
  InfiniteScroll,
  Pagination,
  MessageBox,
  Message,
  Notification,
  Table,
  TableColumn,
  Popover
} from 'element-ui'
Vue.use(Avatar)
  .use(Image)
  .use(Icon)
  .use(Pagination)
  .use(InfiniteScroll)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Table)
  .use(TableColumn)
  .use(Popover)
Vue.config.productionTip = false
Vue.prototype.$api = getApi
Vue.prototype.utils = utils
Vue.use(VueAwesomeSwiper)
Vue.use(infiniteScroll)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.component('Loading', Loading)
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
