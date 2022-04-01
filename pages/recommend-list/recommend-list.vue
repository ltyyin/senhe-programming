<template>
	<view class="recommend-list-container">
		<detail-head :detailInfo="detailInfo">
			<view class="title">爬虫系列课程</view>
			<view class="course-info">
				<text class="course-package">课程包</text>
				<text>共2门课程</text>
				<text class="iconfont icon-dian"></text>
				<text>69人参与</text>
			</view>
		</detail-head>
		
		<view class="show-list">
			<view class="summary">精选好课，让你学的轻松自如</view>
			
			<view class="recommend-course">
				<view class="left-content">
					<image class="img" src="https://atts.w3cschool.cn/attachments/cover/cover_kudac.png?t=1606375501" mode="heightFix"></image>
				</view>
				<view class="right-content">
					<view class="title">新手入门课程包</view>
					<view class="price">
						<text class="exclusive">套餐专享价</text>
						<text class="current">￥666.98</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import detailHead from '@/pages/course/components/detail-head.vue'
	export default {
		components: {
			detailHead
		},
		data() {
			return {
				detailInfo: {
					isFree: 1,
					mainImage: 'https://atts.w3cschool.cn/attachments/cover/cover_kudac.png?t=1606375501'
				}
			}
		}
	}
</script>

<style lang="scss">
	.recommend-list-container {
		/deep/ .img {
			height: 280rpx;
		}
		.course-info {
			margin-top: 30rpx;
			font-size: 28rpx;
			.course-package {
				margin-right: 30rpx;
			}
		}
		
		.show-list {			
			padding: 20rpx 30rpx;
			.summary {
				@include flex-layout($justifyContent: center, $alignItem: center);
				height: 80rpx;
				font-size: 30rpx;
				color: #7d7d7d;
			}
			
			.recommend-course {
				@include flex-layout;
				padding: 20rpx 0;
				.left-content {
					.img {
						width: 280rpx;
						height: 150rpx;
						border-radius: 10rpx;
					}
				}
				.right-content {
					margin-left: 30rpx;					
					.price {
						padding-bottom: 20rpx;
						.exclusive {
							background-color: #f2d8b5;
							color: #5a401b;
							padding: 8rpx 10rpx;
							border-radius: 10rpx;
							font-size: 24rpx;
						}
						.current {
							margin-left: 10rpx;
							color: #fe6a00;
							font-size: 30rpx;
						}
					}
					@include flex-layout($direction: column, $justifyContent: space-between);
					
				}
			}
		}
	}
</style>
