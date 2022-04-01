<script>
	export default {
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	
	/* #ifndef APP-NVUE */
	/*每个页面公共css */
	@import '@/static/iconfont/iconfont.css';
	/* #endif */
	@import url("@/common/css/common.css");
	
	/* #ifndef APP-NVUE */
	page {
		font-family: "Microsoft YaHei Light";
		font-size: 32rpx;
	}
	
	.uni-btn-icon {
		overflow: visible !important;
	}
	/* #endif */
	
	.uni-page-head {
		/* border-bottom: 1rpx solid #f3f3f3; */
	}
	
	.uni-page-head-search {
		margin: 0 40rpx;
	}

	.uni-page-head__title {
		font-size: 28rpx !important;
	}
</style>
