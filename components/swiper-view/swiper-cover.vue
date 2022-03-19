<template>
	<view class="swiper-cover-container">
		<view class="recommend-cover">
			<image class="cover-img" :src="coverImg" mode="aspectFill"></image>
			
			<view class="details">
				<text>详情</text>
				<text class="iconfont icon-arrow-right"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'swiper-cover',
		props: {
			coverImg: {
				type: String,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	.swiper-cover-container {
		.recommend-cover {
			$width: 696rpx;
			$height: 180rpx;
			width: $width;
			height: $height;
			margin-bottom: 20rpx;
			position: relative;
			
			.cover-img {
				width: $width;				
				height: $height;
				border-radius: 15rpx;				
			}
			
			.details {
				position: absolute;
				bottom: 10rpx;
				right: 10rpx;
				font-size: 24rpx;
				color: $tag-color;
				background-color: $tag-background-color;
				padding: 5rpx 5rpx 5rpx 20rpx;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
