const BASIS_URL = 'http://localhost:5000'

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