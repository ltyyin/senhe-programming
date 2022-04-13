let url = ''
if(process.env.NODE_ENV === 'development') {
	url = 'http://192.168.1.12:8080'
}else {
	url = 'http://122.112.174.91'
}

export { url }