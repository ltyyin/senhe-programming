<template>
	<uni-nav-bar fixed class="nav-bar" height="82rpx">
		<view class="search-frame" @click="navTo('/pages/search/search')" slot="left" style="margin-top:25px;">
			<text class="iconfont icon-search"></text>
			<text class="line"></text>
			<text>搜索</text>
		</view>
		
		<view class="title" style="margin-top:25px;">
			森和编程
		</view>
	</uni-nav-bar>
</template>

<script>
	import mixin from '@/common/mixin/mixin.js'
	
	export default {
		name:"search-input",
		mixins:[ mixin ],
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight * 2,
			}
		}
	}
</script>

<style lang="scss">
	.search-frame {
		position: absolute;
		left: 30rpx;
		height: 55rpx;
		width: 150rpx;
		border-radius: 40rpx;
		background-color: #f3f3f3;
		font-size: 25rpx;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		color: #6d6d6d;
					
		.line {
			width: 1rpx;
			height: 60%;
			background-color: #bdbdbd;
		}			
	}
	.title {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 2rpx;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
