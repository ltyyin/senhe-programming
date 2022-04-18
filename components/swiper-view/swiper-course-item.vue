<template>
	<view class="swiper-course-item-container" @click="navTo">
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
		},
		methods: {
			navTo() {
				uni.navigateTo({
					url: `/pages/course/details`,
					success: (res)=> {
					  res.eventChannel.emit('params', {
							id: this.courseInfo.id,
							isFree: this.courseInfo.isFree
						})
					}
				})
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
				@include  text-ellipsis;
				
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
				font-size: 30rpx;
				@include text-ellipsis;
			}
			
			.description {
				color: #a2a2a2;
				font-size: 24rpx;
				@include text-ellipsis(2);
			}
		}
	}
</style>
