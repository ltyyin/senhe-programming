<template>
	<view class="user-show-container"
		:hover-class="active ? 'active': ''"
		:class="{'border-bottom': border}"
	>
		<view class="left-content" v-if="icon">
			<uni-icons custom-prefix="iconfont"
				:type="icon" size="36rpx" color="#1a1a1a">
			</uni-icons>
		</view>
		<view class="middle-content">
			<slot>{{title}}</slot>
		</view>
		<view class="right-content">
			<slot name="right"></slot>
			<uni-icons v-if="showArrow" custom-prefix="iconfont"
				type="icon-arrow-right" size="46rpx">
			</uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Cell',
	props: {
		icon: {
			type: String,
			default: ''
		},
		showArrow: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: ''
		},
		border: {
			type: Boolean,
			default: true
		},
		active: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
		}
	}
}
</script>

<style lang="scss" scoped>
.user-show-container {
	@include flex-layout($justifyContent: space-between,	$alignItems: center);
	transition: 0.2s;
	background-color: #FFFFFF;
	padding: 0 30rpx;
	height: 105rpx;
	
	.left-content {
		padding-right: 20rpx;
		.iconfont {
			font-size: 38rpx;
		}
	}
	
	.middle-content {
		height: 100%;
		flex: 1;
		@include flex-layout($alignItems: center);
		.login-register {
			font-size: 40rpx;
		}
	}
	.right-content {
		height: 100%;
		@include flex-layout($alignItems: center);
		color: #bbb;
		.iconfont {
			font-size: 42rpx;
		}
	}
}
.active {
	background-color: #F1F1F1;
}

.border-bottom {
	border-bottom: $underline;
}
</style>
