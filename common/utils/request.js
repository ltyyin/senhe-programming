// const BASIS_URL = 'http://192.168.1.12:5000'
const BASIS_URL = 'http://192.168.0.100:5000'
// const BASIS_URL = 'http://50874734dw.qicp.vip'

const request = function(options = {}) {
	return	new Promise((resolve,reject)=>{
			uni.request({
				url: BASIS_URL + (options.url || '' ),
				method: options.method || 'GET',
				data: options.data || {},
				success:(res)=> {
					resolve({statusCode: res.statusCode, data: res.data, errMsg: res.errMsg})
				},
				fail: (err)=> {
					reject(err)
				}
			})
	})
}

export default request