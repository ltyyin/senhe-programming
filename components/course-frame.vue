<template>
	<view class="course-frame-container">
		<view class="recommend-title">
			<view class="left-text">
				{{titleName}}
			</view>
			<view class="right-text">
				<text>更多</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>	
		</view>
		
		<slot></slot>
		
	</view>
</template>

<script>
	export default {
		name:'course-frame',
		props:{
			titleName:{
				type:String,
				default:'推荐课程'
			}
		}
	}
</script>

<style lang="scss">
	.course-frame-container {
		background-color: #FFF;		
		margin: 20rpx 0;
		
		.recommend-title {
			padding-left: 30rpx;
			display: flex;
			height: 80rpx;
			align-items: center;
			
			.left-text {
				margin-right: auto;
				font-weight: 500;
				font-size: 35rpx;
				color: #333333;
			}
			
			.right-text {
				padding-right: 30rpx;
				color: #606060;
				font-size: 25rpx;
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
