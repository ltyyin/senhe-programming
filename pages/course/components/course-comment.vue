<template>
	<view class="course-comment-container">
		
		<u-empty
		  mode="list"
		  icon="http://cdn.uviewui.com/uview/empty/list.png"
			textSize="30rpx"
			width="350rpx"
			height="80rpx"
			text="暂无评价"
			:show="recommendList.lenght === 0"
		>
		</u-empty>
		
		<template >
			<view class="comprehensive-score">
				<text class="text">综合评分</text>
				<text class="score">{{goodRate || 5}}</text>
				<uni-rate class="star" readonly allow-half :value="goodRate || 5" size="34rpx" />
			</view>
			<view class="comment-wrapper">
				<!-- 这里循环 -->
				<view class="comment" v-for="(recommend,index) of recommendList" :key="recommend.id">
					<view class="left-content">
						<image class="img" :src="recommend.userImage" mode="aspectFit"></image>
					</view>
					<view class="right-content">
						<view class="nick-name">
							<text class="name">{{recommend.nickName}}</text>
							<uni-rate class="star" readonly allow-half :value="recommend.isGood" size="28rpx" />
						</view>
						<view class="main-content">
							{{recommend.content}}
						</view>
						<view class="date">{{recommend.createDate}}</view>
						
						<view class="reply" v-if="recommend.children">
							<text>讲师回复：</text>
							<text>{{recommend.children.content}}</text>
						</view>
					</view>
				</view>
				<view class="bottom-tip">
					<u-loadmore status="nomore" height="80rpx" fontSize="30rpx" line/>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			goodRate: null,
			recommendList: {
				type: Array,
			}
		}
	}
</script>

<style lang="scss">
	.course-comment-container {
		padding: 20rpx 30rpx;
		.comprehensive-score {
			@include flex-layout($alignItem: center);
			background-color: #f8f8f8;
			padding: 25rpx 20rpx;
			border-radius: 10rpx;
			.text {
				width: 60rpx;
				font-size: 28rpx;
				line-height: 32rpx;
			}
			.score {
				font-size:50rpx;
				font-weight: 600;
				margin: 0 20rpx;
			}
		}
		.comment-wrapper {
			margin-top: 20rpx;			
			border-top: 2rpx solid #f5f5f5;
			.comment {
				@include flex-layout;
				border-bottom: 2rpx solid #f5f5f5;
				padding-bottom: 26rpx;
				padding-top: 40rpx;
				.left-content {
					$size: 100rpx;
					margin-right: 20rpx;
					.img {
						width: $size;
						height: $size;
						border-radius: 50%;
					}
				}
				.right-content {
					flex: 1;
					font-size: 26rpx;
					.nick-name {
						@include flex-layout($alignItem: center,$justifyContent: space-between);
						font-size: 32rpx;
					}
					.main-content {
						padding: 10rpx 0;
					}					
					.reply {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: #808388;
						background-color: #f9f9fb;
						padding: 15rpx;
					}
				}
			}
		}
	}
</style>
