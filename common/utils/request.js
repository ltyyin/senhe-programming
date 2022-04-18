import { getToken } from "./auth.js"
// const BASIS_URL = 'http://192.168.1.12:5000'
const BASIS_URL = 'http://192.168.0.101:5000/api'

const request = function(options = {}) {
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