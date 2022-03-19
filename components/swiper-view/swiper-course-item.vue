<template>
	<view class="swiper-course-item-container">
		<view class="left-content">
			<image class="img" :src="courseInfo.info.cover" mode="widthFix"></image>
			<view class="tag">
				<text class="iconfont icon-tag"></text>
				<text class="browser">{{courseInfo.browserCount}}</text>
			</view>
		</view>
		
		<view class="right-content">
			<view class="title">
				{{courseInfo.info.title}}
			</view>
			<view class="description">
				{{courseInfo.info.description}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			courseInfo: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	.swiper-course-item-container {
		display: flex;
		background-color: #FFFFFF;
		
		.left-content {
			$width: 230rpx;
			$height: 140rpx;
			
			width: $width;
			height: $height;
			margin-right: 20rpx;
			position: relative;
			
			.img {
				width: $width;
				height: $height;
				border-radius: 10rpx;
			}
			
			.tag {
				position: absolute;
				color: $tag-color;
				background-color: $tag-background-color;
				font-size: 22rpx;				
				padding: 0 10rpx;
				border-radius: 20rpx;
				bottom: 15rpx;
				right: 0;
				transform: scale(0.8);
				width: 100rpx;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				
				.iconfont {
					font-size: 16rpx;
					margin-right: 5rpx;
				}
			}
		}
		
		.right-content {
			width: 410rpx;
			
			.title {
				font-weight: 600;
				margin-bottom: 10rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 30rpx;
			}
			
			.description {
				color: #a2a2a2;
				font-size: 24rpx;
				text-overflow:ellipsis;
				overflow:hidden;
				display:-webkit-box;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
			}
		}
	}
</style>
