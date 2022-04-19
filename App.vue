<script>
	const tip = ()=> {
		uni.showModal({
			title: '提示',
			content: '登录已过期，是否重新进行登录？',
			confirmColor: '#42b983',
			success: (e)=> {
				if(e.confirm) {
					uni.navigateTo({
						// #ifndef MP
						url: '/pages/login/login'
						// #endif
						// #ifdef MP
						url: '/pages/login/wx-login'
						// #endif
					})
				}
			}
		})
	}
	
	export default {
		async onLaunch() {
			if(this.$store.state.user.token) {
				const res = await this.$store.dispatch('user/getInfo', false)
				if(res.code === 50008) {
					tip()
				}
			}
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	
	@import "@/common/css/common.css";
	
	/* #ifndef APP-NVUE || MP */
	/*每个页面公共css */
	// @import '@/static/iconfont/iconfont.css';
	@import url('https://at.alicdn.com/t/font_3247714_kjmr5gps1zj.css');
	/* #endif */
	
	/* #ifdef MP */
	@import '@/static/iconfont/iconfont.css';
	/* #endif */
	
	/* #ifndef APP-NVUE */
	page {
		font-family: "Microsoft YaHei Light";
		font-size: 32rpx;
	}
	.uni-btn-icon {
		overflow: visible !important;
	}
	/* #endif */
	
	/* 修改H5的 搜索框样式 */
	.uni-page-head-search {
		margin: 0 40rpx;
	}
	.uni-page-head__title {
		font-size: 28rpx !important;
	}
</style>
