<template>
	<view class="scroll-y-item-container">		
		
		<view class="left-content">
			<image class="img" :src="courseInfo.mockImage" mode="heightFix"></image>
			<view class="play-count">
				<text class="iconfont icon-bofang"></text>
				<text>{{courseInfo.studyTotalFloat}}K</text>
			</view>
		</view>
		
		<view class="right-content">
			<view class="title">
				{{courseInfo.info.title}}
			</view>
			
	
			<view class="info">
				<text class="price">
					<text class="current">￥{{courseInfo.priceDiscount}}</text>
					<text class="original">{{courseInfo.priceOriginal}}</text>
				</text>
				
				<text class="author">
					<text class="iconfont icon-My"></text>
					<text class="name">{{courseInfo.nickName}}</text>
				</text>
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
	@mixin hiddenWord() {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.scroll-y-item-container {		
		display: flex;
		background-color: #FFFFFF;
		margin: 0 30rpx;
		white-space: normal;
		
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		
		.left-content {
			$width: 250rpx;
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
			
			.play-count {
				position: absolute;
				bottom: 5rpx;
				right: 5rpx;
				background-color: $tag-background-color;
				border-radius: 20rpx;
				padding: 0 10rpx;
				color: $tag-color;
				font-size: 24rpx;
				transform: scale(0.9);
				width: 80rpx;
				text-align: center;
				@include hiddenWord;
				
				.iconfont {
					font-size: 24rpx;
					margin-right: 5rpx;
				}
			}
		}
		
		.right-content {
			$rightWidth:  410rpx;
			width: $rightWidth;
			position: relative;
			
			.title {
				font-weight: 600;
				font-size: 30rpx;				
				text-overflow:ellipsis;
				overflow:hidden;
				display:-webkit-box;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
			}
			
			
			.info {		
				display: flex;
				height: 50rpx;
				align-items: center;
				position: absolute;
				width: $rightWidth;
				bottom: 0;
				align-items: center;
								
				.price {
					margin-right: 60rpx;
					.current {
						font-size: 30rpx;
						font-weight: 600;
						color: #fe6a00;
						margin-right: 10rpx;
					}					
					.original {
						font-size: 26rpx;
						text-decoration: line-through;
						color: #afafaf;
						position: absolute;
						top: 10rpx;
						left: 90rpx;
					}
				}
				
				.author {
					@include hiddenWord;
					font-size: 25rpx;
					color: #b6b6b6;
					width: 200rpx;					
					position: absolute;
					top: 8rpx;
					right: 10rpx;
				}				
			}		
		}		
	}
</style>