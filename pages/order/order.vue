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
							<radio style="transform: scale(0.8);" value="wxpay"
								:checked="provider === 'wxpay'"
							/>
						</view>
					</label>
					<!-- #ifndef MP-WEIXIN -->
					<label class="payment-selecte">
						<view class="payment-item">
							<image class="img" src="/static/pay/alipay.png"></image>
							<text class="text">支付宝</text>
							<radio style="transform: scale(0.8);" value="alipay"
								:checked="provider === 'alipay'"
							/>
						</view>
					</label>
					<!-- #endif -->
				</radio-group>
				<view v-else class="ios-money">
					<text>余额:</text>
					<text class="platform">0.00</text>
					<text style="color: #fe6a00; font-size: 30rpx;">元宝</text>
					<button type="default" class="recharge" size="mini"
						@click="rechargeTo" hover-class="recharge-active"
					>
							去充值
						</button>
				</view>
			</view>
			
			<view class="goods-price">
				<view class="total-amount">
					<text>总金额</text>
					<text style="text-decoration: line-through;">
						￥{{comPrice.priceOriginal}}
					</text>
				</view>
				<view class="preferential-price">
					<text>优惠价</text>
					<text>￥{{comPrice.priceDiscount}}</text>
				</view>
			</view>		
		</view>
		
		<view class="commit-wrapper">
			<view class="commit-order">
				<view class="pay-price">
					<text>实付金额:</text>
					<text style="color: #fe6a00; font-weight: 600;">
						￥{{comPrice.priceDiscount}}
					</text>
				</view>
				<button
					:loading="isLoading"
					:disabled="isLoading"
					class="btn"
					type="default"
					size="mini"
					hover-class="payment-active"
					@click="commitOrder"
				>
					提交支付
				</button>
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
				isIos: false,
				comPrice: {priceOriginal: 0, priceDiscount: 0}
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
				this.courseOrderList = info
				const result = info.reduce((pre, cur)=> {
					if(cur.isFree) {
						cur.priceOriginal = 0
						cur.priceDiscount = 0
					}
					return {
						priceOriginal: 
							pre.priceOriginal += parseFloat(cur.priceOriginal),
						priceDiscount:
							pre.priceDiscount += parseFloat(cur.priceDiscount)
					}
				}, this.comPrice)
				// 避免出现很多为小数，所以只抓取两位小数
				this.comPrice = {
					priceOriginal: (result.priceOriginal).toFixed(2),
					priceDiscount: (result.priceDiscount).toFixed(2),
				}
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
				if(this.provider === ''){
					uni.showModal({
						title: "提示",
						content: "请选择一个支付方式",
						showCancel: false,
						confirmText: "确定"
					})
					return
				}
				// #ifdef H5
					uni.showModal({
						title: "提示",
						content: "请移至小程序和APP端完成支付",
						showCancel: false,
						confirmText: "确定"
					})
					return
				// #endif
				
				// 开启按钮的loading状态
				this.isLoading = true
				
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
						// provider: this.provider,
						// orderInfo,
						provider: 'wxpay',
						timeStamp: "1414561699",
						nonceStr: "5K8264ILTKCH16CQ2502SI8ZNMTM67VS",
						package: "prepay_id=wx201410272009395522657a690389285100",
						signType: "RSA",
						paySign: "oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ\/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq\/xDg==",
						success: ()=> {
							uni.navigateTo({
								url: '/pages/order/my-order',
								success: ()=> {
									uni.showToast({
										title: '支付成功',
										icon: 'none'
									})
								}
							});
						},
						fail: (err)=> {
							console.log(err);
							uni.navigateTo({
								url: '/pages/order/my-order',
								success: ()=> {
									uni.showToast({
										title: '支付失败，请重试',
										icon: 'none'
									})
								}
							});
						},
						complete: ()=> {
							// 支付完成或失败都关闭按钮的loading状态
							this.isLoading = false
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
					@include flex-layout($alignItems: center);
					height: 80rpx;
					.text {
						margin-right: auto;
						margin-left: 15rpx;
					}
				}
			}
			
			.ios-money {
				@include flex-layout($alignItems: center);
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
				}
				.recharge-active {
					background-color: #15a886;
				}
			}
		}
			
		// 价格
		.goods-price{
			.total-amount,.preferential-price {
				height: 80rpx;
				@include flex-layout($alignItems: center,$justifyContent: space-between);
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
			@include flex-layout($alignItems: center,$justifyContent: space-between);
			background-color: #FFFFFF;
			height: 100rpx;
			.btn {
				margin: unset;
				// background-color: $senhe-theme-color;
				background-color: #ed732f;
				border-color: #1ac69e;
				color: #FFFFFF;
				line-height: 70rpx;
				border-radius: 60rpx;	
			}
			.payment-active {
				background-color: #f29d6e;
			}
		}
	}	
}
</style>
