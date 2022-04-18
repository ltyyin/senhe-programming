<template>
	<view class="tradeOrder-container">
		<view class="tradeOrder" v-for="order of orderList" :key="order.id">
			<view class="order-header">
				<text>订单号:{{order.orderId}}</text>
				<text>{{order.createDate}}</text>
			</view>
			
			<view class="order-courses">
				<course-item
					v-for="course of order.courseList"
					:courseInfo="course"
					:key="course.id"
				></course-item>
			</view>
			
			<view class="paid-in">实付：<text>￥{{order.priceDiscount}}</text></view>
			
			<!-- 订单状态：1待支付，2交易成功，3交易关闭 -->
			<view class="order-status">
				<template v-if="order.status === 1">
					<view  class="status" style="color: red;">待支付</view>
					<button type="default" size="mini" 
						@click="cancalTradeOrder(order.orderId)"
					>
						取消订单
					</button>
					<button type="default" size="mini" class="payment-btn" 
						@click="goPayment(order.courseList)"
					>
						去支付
					</button>
				</template>
				
				<template
					v-if="order.status === 2 || order.status === 3"
					class="status"
				>
					<view v-if="order.status === 2" class="status" style="color: #333333;">交易完成</view>
					<view v-if="order.status === 3" class="status">交易关闭</view>
					<button type="warn" size="mini" @click="delTradeOrder(order.orderId)">删除订单</button>
				</template>
				
			</view>
		</view>
	</view>
</template>

<script>
	import courseItem from '@/components/scroll-view/scroll-y-item.vue'
	import { fetchTradeOrder, cancelTradeOrder, delTradeOrder } from '@/api/order.js'
	export default {
		components: {
			courseItem
		},
		data() {
			return {
				orderList: [], // 订单列表数据
				isShow: false, //是否显示ios支付窗口
				isIOS: false, // 是否为APP端的IOS设备
				loading: false, // 是否点击了ios弹窗中的按钮
				balance: 0, //余额
				order: {}, //立即支付的订单数据
			}
		},

		computed: {
			isPay() { // 余额是否足够支付
				return this.balance >= (this.order.priceDiscount || this.order.pricePayable)
			}
		},

		async onLoad() {
			this.fetchOrderList()
			// #ifdef APP-PLUS
			// 保证ios平台上的app
			this.isIOS = uni.getSystemInfoSync().platform === 'ios'
			// #endif
		},
		
		methods: {
			async	fetchOrderList() {
				const { data } = await fetchTradeOrder()
				this.orderList = data
			},
			// 提示框
			showModal(title, method, orderId) {
				uni.showModal({
					title: '提示',
					content: `确认${title}订单吗？`,
					success: async (res)=> {
						if (res.confirm) {
							try{
								const res = await method(orderId)
								uni.showToast({
									title: `${title}订单成功`,
									icon: 'none'
								})
								this.fetchOrderList()
							}catch(e){
								uni.showToast({
									title: `${title}订单失败`,
									icon: 'none'
								})
							}
						} 
					}
				})
			},
			
			// 取消订单
			cancalTradeOrder(orderId) {
				this.showModal('取消', cancelTradeOrder, orderId)
			},
			// 删除订单
			delTradeOrder(orderId) {
				this.showModal('删除', delTradeOrder, orderId)
			},
			// 去支付
			goPayment(courseList) {
				uni.navigateTo({
				  url: '/pages/order/order',
				  events: {
						
				  },
				  success:(res)=> {
				    // 通过eventChannel向被打开页面传送数据
				    res.eventChannel.emit('detailInfo', courseList)
				  }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.tradeOrder-container {
	background-color: #f6f6f6;
	padding: 25rpx 0;
	
	.tradeOrder {
		margin-bottom: 25rpx;
		&:last-child {
			margin-bottom: 0;
		}
		padding: 20rpx 30rpx 10rpx;
		background-color: #FFFFFF;
		.order-header {
			@include flex-layout($justifyContent: space-between,$alignItems: center);
			height: 70rpx;
			
			text:last-child {
				font-size: 28rpx;
			}
		}
		.paid-in {
			@include flex-layout($justifyContent: flex-end);
			text {
				color: #fe6a00;
				font-weight: 600;
			}
		}
		.order-status {
			@include flex-layout($alignItems: center);
			margin-top: 10rpx;
			height: 100rpx;
			.status {
				margin-right: auto;
				font-size: 28rpx;
			}
			button {
				margin: 0;
				// padding: 0 16rpx;
				margin-left: 10px;
			}
			.payment-btn {
				color: #FFFFFF;
				background-color: #ed732f;
				&:active {
					background-color: #f29d6e;
				}		
			}
		}
	}
}
</style>
