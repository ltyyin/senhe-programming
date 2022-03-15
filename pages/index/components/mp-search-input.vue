<template>
	<view class="top-bar" :style="{marginTop:statusBarHeight+'px',height:titleBarHeight+'px'}">
		<view class="search-frame">
			<text class="iconfont icon-search"></text>
			<text class="line"></text>
			<text>搜索</text>
		</view>
		<view class="title">
			森和社区
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-input",
		data() {
			return {
				// #ifdef MP-WEIXIN
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight
				// #endif
			};
		},
		computed:{
			// #ifdef MP-WEIXIN
			titleBarHeight(){
				// 计算状态栏的高度（最主要是适配刘海屏问题）
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect()				 
				return (menuButtonInfo.top - this.statusBarHeight) * 2 + menuButtonInfo.height
			}
			// #endif
		},
	}
</script>

<style lang="scss">
/* #ifdef MP-WEIXIN */
.top-bar{
	background-color: #fff;
	display: flex;
	align-items: center;
	position: relative;
	justify-content: center;
	.search-frame{
		position: absolute;
		left: 15px;
		height: 55rpx;
		width: 150rpx;
		border-radius: 20px;
		background-color: #eeeeee;
		font-size: 25rpx;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		color: #6d6d6d;
		.iconfont{
			font-size: 30rpx;
		}
		.line{
			width: 1rpx;
			height: 60%;
			background-color: #bdbdbd;
		}			
	}
	.title{
		font-size: 33rpx;
		font-weight: 500;
		letter-spacing: 2rpx;
	}
}
/* #endif */
</style>
