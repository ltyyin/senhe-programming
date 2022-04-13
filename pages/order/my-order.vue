<template>
	<div>

	</div>
</template>

<script>
	import courseItem from '@/components/scroll-view/scroll-y-item.vue'
	import { myOrder } from '@/api/user.js'
	
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
	
		async	onLoad() {
			const { data } = await myOrder()
			this.orderList.push(...data)
			
			// #ifdef APP-PLUS
			// 保证ios平台上的app
			this.isIOS = uni.getSystemInfoSync().platform === 'ios'
			// #endif
		},
	
</script>

<style scoped>

</style>