<template>
	<view class="evaluate-container">
			<view class="grade">
				<text>课程评分：</text>
				<uni-rate class="rate" allow-half v-model="rate"  size="28"/>
				<text>{{rate}}分</text>
			</view>
			
			<textarea class="textarea" 
				placeholder="写下你对课程的评价..."
				placeholder-style="font-size:28rpx;"
			/>
			
			<button type="default"
				hover-class="active"
				@click="commitComment"
				:disabled="isDisabled"
			>
				提交
			</button>
	</view>
</template>

<script>
import api from '@/api/course-detail.js'
export default {
	data() {
		return {
			rate: 5,
			content: '',
			isDisabled: false
		}
	},
	methods: {
		commitComment() {
			this.isDisabled = true
			uni.showToast({
				title: "提交中",
				icon: "loading",
				duration: 5000,
				mask: true,
				success: async () => {
					await api.commitComment()
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.evaluate-container {
		padding: 0 40rpx;
		.grade {
			@include flex-layout($alignItems: center);
			height: 100rpx;
			font-weight: 600;
			.rate {
				margin-right: 20rpx;
			}
		}
		
		.textarea {
			box-sizing: border-box;
			border: 2rpx solid #D8D8D8;
			width: 100%;
			border-radius: 10rpx;
			padding: 20rpx;
			margin-top: 20rpx;
		}
		
		button {
			margin-top: 60rpx;
			color: #FFFFFF;
			background-color: #42b983;
		}
		.active {
			background-color: #328c62;
		}
	}
</style>
