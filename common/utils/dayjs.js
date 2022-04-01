/**
 * 初始化 dayjs 相关配置
 */
import Vue from 'vue'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn') // 全局使用

// 使用Vue全局过滤器来处理相对时间问题
Vue.filter('relativeTime', function(value) {
  return dayjs().to(dayjs(value))
  // .replace(' ', '')
})

Vue.filter('customFormatTime', function(time, format) {
  return dayjs(time).format(format)
  // .replace(' ', '')
})

Vue.filter('videoTime', function(time, format) {
	console.log(time);
  return dayjs(time * 1000).format(format)
})


export default function(time, format) {
  return dayjs(time * 1000).format(format)
}