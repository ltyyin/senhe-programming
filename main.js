import App from './App'
import store from './store'
// UI组件库
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

// 提示框
Vue.prototype.$toast = (title) => {
	uni.showToast({
		title,
		icon: 'none'
	})
}


// dayjs 时间处理
import './common/utils/dayjs.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif