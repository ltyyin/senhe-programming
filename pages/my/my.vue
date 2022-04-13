<template>
	<view>
		<button type="default" @click="myOrder">我的订单</button>
	</view>
</template>

<script>
	import request from '@/common/utils/request.js'
	import { msg } from '@/common/utils/tip.js'
	
	export default {
		data(){
			return {
				name: 'lisa'
			}
		},
		onNavigationBarButtonTap(event) {
			if(event.index === 0) {
				uni.scanCode({
					success:(res) => {
						msg({title: '请求成功！'})
					},
					fail:() => {
						msg({title: '扫码失败！'})
					}
				})
			}
		},
		methods: {
			myOrder() {
				uni.navigateTo({
					url: '/pages/order/my-order'
				})
			}
		}
	}
</script>

<style>

</style>
