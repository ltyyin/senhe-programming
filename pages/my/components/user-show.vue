<template>
	<view class="user-show-container"
		hover-class="active"
	>
		<view class="left-content">
			<image 
				style="width: 100rpx; height: 100rpx; border-radius: 50%;"
				:src="image" mode="aspectFit"
			></image>
		</view>
		<view class="middle-content">
			<template v-if="!token">
				<text class="login-register">登录/注册</text>
			</template>
			<template v-else>
				<view class="user-info">
					<view>{{name}}</view>
					<view v-if="grade">成长等级 LV.{{grade}}</view>
					<view v-else>登录过期，请重新登录</view>
				</view>
			</template>
		</view>
		<view class="right-content">
			<text v-if="token" class="text">个人主页</text>
			<uni-icons custom-prefix="iconfont" color="#bbb"
				type="icon-arrow-right" size="46rpx">
			</uni-icons>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			defaultAvatar: 'https://ask.dcloud.net.cn/account/identicon/e6154e37c69939a26a28fb252a3e9628.png'
		}
	},
	computed: {
		...mapState('user',['token','name', 'avatar','grade']),
		image() {
			return this.token ? this.avatar : this.defaultAvatar
		}
	},
	mounted() {
		// console.log(this.avatar);
	}
}
</script>

<style lang="scss" scoped>	
.user-show-container {
	@include flex-layout($justifyContent: space-between,	$alignItems: center);
	transition: 0.2s;
	// margin: 20rpx 0;
	background-color: #FFFFFF;
	padding: 20rpx 30rpx;
	height: 100rpx;
	.middle-content {
		height: 100%;
		flex: 1;
		padding-left: 30rpx;
		@include flex-layout($alignItems: center);
		.login-register {
			font-size: 40rpx;
		}
		.user-info {
			view:first-child {
				font-size: 36rpx;
			}
			view:last-child {
				font-size: 24rpx;
				color: #999;
			}
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
.active {
	background-color: #F1F1F1;
}
</style>
