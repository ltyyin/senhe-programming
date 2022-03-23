<template>
	<view class="question-item-container">
		<view class="title">{{questionInfo.title}}</view>
		<view class="question-info">
			<view class="question-count">
				<text class="iconfont icon-huifu1"></text>
				<text>{{questionInfo.questionCount}}</text>
			</view>
			<view class="browser-count">
				<text class="iconfont icon-liulan"></text>
				<text>{{questionInfo.viewCount}}</text>
			</view>
			<view class="author">{{questionInfo.nickName}}</view>
			<view class="symbol iconfont icon-dian"></view>
			<view class="date">{{	questionInfo.createDate | customFormatTime('YYYY/MM/DD')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			questionInfo: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	.question-item-container {
		border-bottom: 2rpx solid #F1F1F1;
		
		.title {
			font-weight: 600;
			font-size: 32rpx;
			max-height: 88rpx;
			@include text-ellipsis(2);
		}
		padding: 20rpx 30rpx;
		.question-info {
			@include flex-layout;
			padding: 15rpx 0;
			font-size: 28rpx;
			color: #828282;
			height: 40rpx;
			.iconfont {
				margin-right: 5rpx;
			}			
			.question-count {
				.iconfont {
					font-size: 30rpx;
				}
			}			
			.browser-count {
				margin-left: 20rpx;
				margin-right: auto;
			}
			.symbol {
				font-size: 28rpx;
				line-height: 40rpx;
			}
		}
	}
</style>
