<template>
	<view class="order-container" :style="{height: `${height}px`}">
		<view class="order-wrapper">
			<view class="goods-wrapper">
				<view class="title">商品信息</view>
				<template v-for="(item,index) of courseOrderList">
					<course-item  :key="item.id" :courseInfo="item" />
				</template>
			</view>
			
			<view class="payment"> 
				<view class="title">支付方式</view>
				<radio-group @change="radioChange" v-if="!isIos">
					<label class="payment-selecte">
						<view class="payment-item">
							<image class="img" src="/static/pay/wxpay.png"></image>
							<text class="text">微信支付</text>
							<radio style="transform: scale(0.8);" value="wxpay" :checked="provider === 'wxpay'"/>
						</view>
					</label>
					<!-- #ifndef MP-WEIXIN -->
					<label class="payment-selecte">
						<view class="payment-item">
							<image class="img" src="/static/pay/alipay.png"></image>
							<text class="text">支付宝</text>
							<radio style="transform: scale(0.8);" value="alipay" :checked="provider === 'alipay'"/>
						</view>
					</label>
					<!-- #endif -->
				</radio-group>
				<view v-else class="ios-money">
					<text>余额:</text>
					<text class="platform">0.00</text>
					<text style="color: #fe6a00; font-size: 30rpx;">元宝</text>
					<button type="default" class="recharge" size="mini" @click="rechargeTo">去充值</button>
				</view>
			</view>
			
			<view class="goods-price">
				<view class="total-amount">
					<text>商品金额</text>
					<text>￥888.88</text>
				</view>
				<view class="preferential-price">
					<text>优惠价</text>
					<text>￥699.88</text>
				</view>
			</view>		
		</view>
		
		<view class="commit-wrapper">
			<view class="commit-order">
				<view class="pay-price">
					<text>实付金额:</text>
					<text style="color: #fe6a00; font-weight: 600;">￥699.88</text>
				</view>
				<button :loading="isLoading" :disabled="isLoading" class="btn" type="default" size="mini" @click="commitOrder">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import courseItem from '@/components/scroll-view/scroll-y-item.vue'
	import { fetchWxpay, fetchAlipay } from '@/api/order.js'
	export default {
		components: {
			courseItem
		},
		data() {
			return {
				height: 0,
				courseOrderList: [],
				// payment: [{icon: '/static/pay/wxpay.png',title: '微信支付', value: 'wechat'},{icon: '/static/pay/alipay.png',title: '支付宝', value: 'alipay'}],
				provider: '',
				isLoading: false,
				isIos: false
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			this.provider = 'wxpay'
			// #endif
			
			let systemInfo = uni.getSystemInfoSync()
			this.height = systemInfo.windowHeight
			
			// #ifdef APP-PLUS
			if(systemInfo.platform === 'ios') {
				this.isIos = true
			}
			// #endif
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('detailInfo',info => {
				this.courseOrderList.push(...info)
			})
		},
		methods: {
			radioChange(e) {
				this.provider = e.detail.value
			},
			rechargeTo() {
				uni.navigateTo({
					url: '/pages/order/recharge'
				})
			},
			async commitOrder() {
				let orderInfo = null
				if(this.provider === 'wxpay'){
					let { data } = await fetchWxpay()
					orderInfo = data
				}else {
					let { data } = await fetchAlipay()
					orderInfo = data
				}
				if(orderInfo){
					uni.requestPayment({
						provider: this.provider,
						orderInfo,
						success: ()=> {
							console.log('成功');
						},
						fail: (err)=> {
							console.log(err);
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .scroll-y-item-container {
		margin: 10rpx 0;
		// margin: 0;
	}
	
	/* #ifdef MP */
	.scroll-y-item-container {
		margin: 10rpx 0;
	}
	/* #endif */
	
	.order-container {
		background-color: #f6f6f6;
		.order-wrapper {
			padding: 0 20rpx;
			overflow: auto;
			
			// 商品列表
			.goods-wrapper, .payment, .goods-price{
				box-sizing: border-box;
				margin-top: 30rpx;
				padding: 20 0rpx;
				border-radius: 10rpx;
				background-color: #FFFFFF;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #efefef;
				padding: 20rpx;
				
				.title {
					// margin-bottom: 20rpx;
				}
			}			
			
			
			// 支付方式
			.payment {
				.payment-selecte {
					.img {
						width: 60rpx;
						height: 60rpx;
					}
					.payment-item {
						@include flex-layout($alignItem: center);
						height: 80rpx;
						.text {
							margin-right: auto;
							margin-left: 15rpx;
						}
					}
				}
				
				.ios-money {
					@include flex-layout($alignItem: center);
					height: 50rpx;
					margin-top: 10rpx;
					.platform {
						margin:0 10rpx;
						color: #fe6a00;
					}
					.recharge {
						margin-right: unset;
						background-color: $senhe-theme-color;
						color: #FFFFFF;
						padding:0 10rpx;
						border-color: #1ac69e;
						line-height: 54rpx;
						&:active {
							background-color: #15a886;
						}
					}
				}
			}
				
			// 价格
			.goods-price{
				.total-amount,.preferential-price {
					height: 80rpx;
					@include flex-layout($alignItem: center,$justifyContent: space-between);
				}
			}
		}
		
		
		// 提交订单
		.commit-wrapper {
			box-sizing: border-box;
			bottom: 0;
			position: fixed;
			background-color: #FFFFFF;
			width: 100%;
			padding: 0 20rpx;
			padding-bottom: env(safe-area-inset-bottom);
			.commit-order {
				@include flex-layout($alignItem: center,$justifyContent: space-between);
				background-color: #FFFFFF;
				height: 100rpx;
				.btn {
					margin: unset;
					background-color: $senhe-theme-color;
					border-color: #1ac69e;
					color: #FFFFFF;
					line-height: 70rpx;
					border-radius: 60rpx;			
					&:active {
						background-color: #15a886;
					}				
				}
			}
		}
	}
</style>
