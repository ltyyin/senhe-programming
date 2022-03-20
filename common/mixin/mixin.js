export default	{
	methods: {
		navTo(url, options={} ) {
			if(!url) return
			if(options.login && !this.$store.getters.hasLogin) {
				url = '/pages/auth/login';
			}
			
			uni.navigateTo({
				url
			})
		},
		
		navBack(delta = 1) {
			uni.navigateBack({
				delta
			})
		}
	}
}