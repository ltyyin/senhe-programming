<template>
	<view class="course-group-container">
		
		<view class="list-wrapper">
			<view class="list-title">包含改门课程的课程包</view>
			<view class="recommend-course" v-for="item of 5" :key="item" @click="navTo('/pages/recommend-list/recommend-list')">
				<view class="left-content">
					<image class="img" src="https://atts.w3cschool.cn/attachments/cover/cover_kudac.png?t=1606375501" mode="heightFix"></image>
					<view class="icon">课程包</view>
				</view>
				<view class="right-content">
					<view class="title">新手入门课程包</view>
					<view class="course-count">
						<text class="iconfont icon-fenlei1"></text>
						<text>共6门课程</text>
						<text class="iconfont icon-arrow-right"></text>
					</view>
					<view class="price">
						<text class="current">共￥320.98</text>
						<text class="original">￥666.98</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/mixin/mixin.js'
	export default {
		mixins: [mixin]
	}
</script>

<style lang="scss">
	.course-group-container {
		padding: 20rpx 30rpx;
		.list-wrapper {
			.list-title {
				font-weight: 600;
				padding: 20rpx 0;
			}
			.recommend-course {
				@include flex-layout;
				padding: 10rpx 0;
				.left-content {
					position: relative;
					.icon {
						position: absolute;
						top: 0;
						background-color: #f08436;
						color: #FFF;
						font-size: 24rpx;
						padding: 4rpx 8rpx;
						border-radius: 0 0 15rpx 0;
					}
					.img {
						width: 280rpx;
						height: 150rpx;
						border-radius: 10rpx;
					}
				}
				.right-content {
					margin-left: 30rpx;
					flex: 1;
					.title {
						color: black;
						@include text-overflow;
					}
					.course-count {
						@include flex-layout($alignItems: center);
						font-size: 26rpx;
						padding: 12rpx 0;
						color: #919191;
						.icon-fenlei1 {
							margin-right: 12rpx;
						}
						.icon-arrow-right {
							margin-left: auto;
							font-size: 36rpx;
						}
					}
					.price {
						position: relative;
						font-size: 30rpx;
						.current {
							color: #fe6a00;
						}
						.original {
							position: absolute;
							font-size: 26rpx;
							left: 170rpx;
							text-decoration: line-through;
						}
					}
				}
			}
		}
	}
</style>
