import { getToken } from "./auth.js"
const BASIS_URL = 'http://192.168.1.12:5000/api'
// const BASIS_URL = 'http://192.168.0.100:5000/api'
import store from '@/store/index.js'

const request = function(options = {},isAuth = false ) {
	/* 阻止H5端在没有登录的情况下直接输入url进行路由跳转 */
	if(isAuth && !store.state.user.authStatus) {
		uni.navigateTo({
			// #ifdef MP
			url: '/pages/login/wx-login'
			// #endif
			// #ifndef MP
			url: '/pages/login/login'
			// #endif
		})
		return
	}
	
	return	new Promise((resolve,reject)=>{
			uni.request({
				url: BASIS_URL + (options.url || '' ),
				method: options.method || 'GET',
				data: options.data || {},
				header: {
					Authorization: 'Bearer ' + getToken()
				},
				success:(res)=> {
					if(res.statusCode === 403){
						reject(res.data)
						return
					}
					resolve({statusCode: res.statusCode, data: res.data, errMsg: res.errMsg})
				},
				fail: (err)=> {
					reject(err)
				}
			})
	})
}

export default request