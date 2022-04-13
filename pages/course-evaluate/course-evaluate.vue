<template>
	<view class="evaluate-container">
			<view class="grade">
				<text>课程评分：</text>
				<uni-rate class="rate" allow-half v-model="rate"  size="28"/>
				<text>{{rate}}分</text>
			</view>
			
			<textarea class="textarea" placeholder="写下你对课程的评价..." placeholder-style="font-size:28rpx;"/>
			
			<button class="btn" type="default">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rate: 5,
				content: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.evaluate-container {
		padding: 0 40rpx;
		.grade {
			@include flex-layout($alignItem: center);
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
		
		.btn {
			margin-top: 60rpx;
		}
	}
</style>
