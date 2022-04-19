<template>
	<view class="user-info-container">
		<view class="left-content">
			<image 
				style="width: 70rpx; height: 70rpx; border-radius: 50%;"
				:src="image" mode="aspectFit"
			></image>
		</view>
		<view class="middle-content">
			<slot name="middle"></slot>
		</view>
		<view class="right-content">
			<slot name='right'></slot>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: ['userImage'],
	data() {
		return {
			defaultAvatar: 'https://ask.dcloud.net.cn/account/identicon/e6154e37c69939a26a28fb252a3e9628.png'
		}
	},
	computed: {
		image() {
			return this.userImage ? this.userImage : this.defaultAvatar
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>	
.user-info-container {
	@include flex-layout($justifyContent: space-between,	$alignItems: center);
	transition: 0.2s;
	// margin: 20rpx 0;
	background-color: #FFFFFF;
	padding: 20rpx 0;
	height: 100rpx;
	.middle-content {
		height: 100%;
		flex: 1;
		padding-left: 30rpx;
		@include flex-layout($alignItems: center);
		.login-register {
			font-size: 40rpx;
		}
	}
	.right-content {
		height: 100%;
		@include flex-layout($alignItems: center);
		color: #bbb;
		font-size: 30rpx;
		.text {
			margin-right: 5rpx;
		}
	}
}
</style>
