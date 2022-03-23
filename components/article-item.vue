<template>
	<view class="article-item-container">
		<view class="article-wrapper">		
			<view class="article-content">				
				<view class="title">{{articleInfo.title}}</view>
				<view class="main">
					<view class="left-text">
						<view class="author-time">
							<text class="author">{{articleInfo.nickName}}</text>
							<text class="icon-line">|</text>
							<text class="time">{{articleInfo.updateDate | relativeTime}}</text>
						</view>							
						<view class="summary">{{articleInfo.summary}}</view>
					</view>						
					<view class="right-img" v-if="articleInfo.imageUrl">
						<image class="img" :src="articleInfo.imageUrl" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		
			<view class="article-info">
				<text class="praise">
					<text class="iconfont icon-31dianzan"></text>
					<text>{{articleInfo.praiseCount}}</text>
				</text>
				<text class="comment">
					<text class="iconfont icon-pinglun"></text>
					<text>{{articleInfo.commentCount}}</text>
				</text>
				<text class="tag">{{articleInfo.tag}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			articleInfo: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	.article-item-container {
		padding: 20rpx 40rpx;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid #F1F1F1;
		.article-wrapper {			
			.article-content {
				.title {
					max-height: 90rpx;
					@include text-ellipsis(2);
					color: #000000;
					font-weight: 600;
					line-height: 45rpx;
					font-size: 30rpx;
				}
				
				.main {
					@include flex-layout($justifyContent: space-between);					
					.left-text {
						.author-time {
							font-size: 26rpx;
							color: #898d8f;
							padding: 6rpx 0;
							.icon-line {
								padding: 0 20rpx;
								color: #8b8a8f;
							}							
						}						
						.summary {
							height: 75rpx;
							@include text-ellipsis(2);
							font-size: 28rpx;
							color: #565a5f;
						}
					}					
					.right-img {
						$size: 180rpx;
						width: $size;
						.img {
							width: $size;
							height: 120rpx;
							border-radius: 10rpx;
						}
					}
				}
			}
			
			.article-info {
				@include flex-layout;
				color: #889096;
				font-size: 26rpx;
				margin-top: 10rpx;
				$icon-interval: 8rpx;
				.praise {
					.iconfont {
						margin-right: $icon-interval;
					}
				}
				.comment {
					margin-left: 42rpx;
					margin-right: auto;
					.iconfont {
						margin-right: $icon-interval;
						font-size: 24rpx;
					}
				}
				.tag {
					background-color: #f4f4f4;
					padding: 5rpx 10rpx;
					border-radius: 5rpx;
				}
			}
		}		
	}	
</style>
