import { getRefreshToken } from "./auth.js"

const BASIS_URL = 'http://192.168.0.101:5000/api'

function refreshRequest() {
	return	new Promise((resolve,reject)=>{
			uni.request({
				url: BASIS_URL + '/auth/refresh/token',
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + getRefreshToken()
				},
				success:(res)=> {
					if(res.statusCode === 401){
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

export default refreshRequest