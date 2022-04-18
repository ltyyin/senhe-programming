<template>
	<view class="my-course-container">
		<view class="course-wrapper f-sb-c" 
			v-for="(course, index) of courseList" :key="course.id"
			@click="natToDetail(course)"
			>
			<view class="left">
				<view class="title">{{course.info.title}}</view>
				<view class="count">
					<text>共{{course.section}}节</text>
					<text>|</text>
					<text>已学{{course.learnedSection}}节</text>
				</view>
				<view class="progress f-sb-c">
					<u-line-progress :percentage="course.progress" activeColor="#42b983"  height="13"
						:showText="false"
					/>
					<view class="text">{{course.progress}}%</view>
				</view>
			</view>
			<view class="right">
				<view class="imgage">
					<image class="img" :src="course.coverImage" mode="heightFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getMyCourse } from '@/api/user.js'
	export default {
		data() {
			return {
				cover: 'https://atts.w3cschool.cn/attachments/cover/cover_vuecourse.jpeg?t=1634191646',
				courseList: []
			}
		},
		async onLoad() {
			const { data } = await getMyCourse()
			this.courseList = data
		},
		methods: {
			natToDetail(course) {
				uni.navigateTo({
					url: `/pages/course/details`,
					success: (res)=> {
					  res.eventChannel.emit('params', {
							id: course.id,
							isFree: course.isFree
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-course-container {
	padding: 0 40rpx;
	.course-wrapper {
		margin: 20rpx 0;
		height: 170rpx;
		.left {
			flex: 1;
			margin-right: 30rpx;
			height: 100%;
			.title {
				// font-size: 32rpx;
				min-height: 86rpx;
				@include text-ellipsis(2);
			}
			.count {
				font-size: 24rpx;
				color: #808080;
				text:nth-child(2){
					margin: 0 10rpx;
				}
			}
			.progress {
				.text {
					margin-left: 10rpx;
					font-size: 26rpx;
				}
			}
		}
		.right {
			.img {
				width: 220rpx;
				height: 160rpx;
				border-radius: 15rpx;
			}
		}
	}
}
</style>
