<template>
	<view class="recharge-container">
		<view class="account-balance">
			<text class="balance">0.00元宝</text>
			<text class="text">账户余额</text>
		</view>
		
		<view class="recharge-selecte">
			<view class="title">
				<text>请选择充值金额</text>
				<text class="help">ios支付帮助></text>
			</view>
			<view class="option">
				<template v-for="(item,index) of gather">
					<view  @click="switchPrice(item,index)" :key="item.id" 
						class="option-item" :class="{active: index === current}"
					>{{item.price}}元宝</view>
				</template>
			</view>
			<view class="actually-paid">支付金额: {{payment}}元</view>
			<button type="default" @click="commitPayment">确认支付</button>			
		</view>
		
		<view class="space-bar"></view>
		
		<view class="recharge-explain">
			<view class="title">充值说明:</view>
			<view class="docs">
				<view>本次支付为虚拟服务，暂不支持退款，敬请期待。</view>
				<view>1、充值的余额仅适用于课程的购买，在IOS设备的APP要进行充值后，使用虚拟元宝消费。</view>
				<view>2、1元宝=1元，元宝须通过IOS系统支付购买，IOS与非IOS设备余额不能互通使用。</view>
				<view>3、元宝为虚拟币，充值后不会过期，但是无法提现及转赠他人；</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				gather: [
					{ price: 6, id: 1},
					{ price: 30, id: 2},
					{ price: 68, id: 3},
					{ price: 108, id: 4},
					{ price: 268, id: 5},
					{ price: 698, id: 6},
				]
			}
		},
		computed: {
			payment() {
				return this.gather[this.current].price
			}
		},
		methods: {
			switchPrice(item,index) {
				this.current = index
			},
			commitPayment() {
				uni.showModal({
					title: '提示',
					content: '确定要进行充值吗',
					confirmColor: '#42b983',
					success: (res)=> {
						if(res.confirm) {
							uni.showLoading({
								title: '充值中...',
								mask: true
							})
							setTimeout(()=> {
								uni.hideLoading()
								uni.navigateBack()
							},2000,)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.recharge-container {
		// 账户余额
		.account-balance {
			background-color: #f6f6f6;
			@include flex-layout($direction: column, $alignItems: center);
			padding: 40rpx 0;
			.balance {
				font-weight: 600;
				font-size: 34rpx;
				margin-bottom: 10rpx;
			}
			.text {
				font-size: 28rpx;
				color: #626262;
			}
		}
		// 选择充值金额
		.recharge-selecte {
			padding: 0 30rpx 20rpx;
			.title {
				padding: 20rpx 0;
				margin-bottom: 10rpx;
				@include flex-layout($alignItems: center,$justifyContent: space-between);
				.help {
					font-size: 26rpx;
					color: #626262;
				}
			}
			.option {
				@include flex-layout($alignItems: center,$justifyContent:space-between);
				flex-wrap: wrap;
				&>view {
					box-sizing: border-box;
					width: 210rpx;
					// margin-right: 20rpx;
					border: 2rpx solid #dcdcdc;
					text-align: center;
					line-height: 100rpx;
					border-radius: 10rpx;
					margin-bottom: 20rpx;
				}
				.active {
					border-color: $darkGreen;
				}
			}
			.actually-paid {
				text-align: center;
				line-height: 80rpx;
				color: #fe6a00;
			}
			
			button {
				line-height: 75rpx;
				background-color: $senhe-theme-color;
				color: #FFFFFF;
				&:active {
					background-color: #15a886;
				}
			}
		}
		// 隔离带
		.space-bar {
			height: 20rpx;
			width: 750rpx;
			background-color: #f6f6f6;
		}
		
		// 充值说明
		.recharge-explain {
			padding: 0 30rpx;
			.title {
				line-height: 80rpx;
			}
			.docs {
				color: #747474;
				font-size: 26rpx;
				line-height: 40rpx;
			}
		}
	}
</style>
