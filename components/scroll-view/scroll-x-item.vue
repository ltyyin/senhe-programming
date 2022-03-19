<template>
	<view class="scroll-course-item">
		
		<view class="image-wrapper">
			<image class="image" :src="courseInfo.info.cover" mode="widthFix"></image>
			<view class="time">
				<text>{{courseInfo.totalTime}}</text>
			</view>
		</view>
		
		<view class="description">
			<view class="title">
				{{courseInfo.info.title}}isFree
			</view>
			
			<view class="info">
				<text class="price">
					<text class="current" v-if="courseInfo.isFree">免费</text>
					<text class="current" v-else>￥{{courseInfo.priceDiscount}}</text>
					<!-- <text class="original">￥34</text> -->
				</text>
				<text class="study">
					<text class="iconfont icon-bofang"></text>
					<text>{{courseInfo.studyTotal}} 在学</text>
				</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:'scroll-course-item',
		props: {
			courseInfo: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	.scroll-course-item {
		$frameWidth: 260rpx;
		$frameHeight: 300rpx;	
		
		box-sizing: border-box;			
		width: $frameWidth;
		height: $frameHeight;	
		background-color: #fff;
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		position: relative;
		
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		
		display: inline-block;
		white-space: initial;		
		
		.image-wrapper {
			position: relative;
			border-radius: 30rpx;
			
			.time {
				position: absolute;
				bottom: 15rpx;
				right: 0;
				background-color: $tag-background-color;
				border-radius: 20rpx;
				padding: 0 10rpx;
				color: $tag-color;
				font-size: 24rpx;
				transform: scale(0.9);
			}
			
			.image {
				width: $frameWidth;
				border-radius: 10rpx 10rpx 0 0;
			}
		}
		
		.description{
			width: $frameWidth;
						
			.title {
				margin-top: 10rpx;
				font-size: 26rpx;
				font-weight: 600;		
				text-overflow:ellipsis;
				overflow:hidden;
				display:-webkit-box;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
			}
			
			.info {
				margin-top: 10rpx;			
				display: flex;
				height: 50rpx;
				align-items: center;
				position: absolute;
				width: $frameWidth;
				bottom: 10rpx;
								
				.price {
					margin-right: auto;
					.current {
						font-size: 28rpx;
						font-weight: 600;
						color: #fe6a00;
						margin-right: 10rpx;
						margin-left: 2rpx;
					}					
					.original {
						font-size: 28rpx;
						text-decoration: line-through;
					}
				}
				
				.study {
					font-size: 20rpx;
					position: relative;
					margin-right: 10rpx;
					color: #cccccc;
					top: 5rpx;
					
					.iconfont {
						left: -30rpx;
						top: 2rpx;
						position: absolute;
						font-size: 25rpx;							
					}
				}
			}
		}
		

	}
</style>
