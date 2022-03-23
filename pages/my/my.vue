<template>
	<view>
		<button type="default" @click="sendNet">发起网路请求</button>
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
			async	sendNet() {
				try{
					const result = await request()
					msg({title: '请求成功!'})
					console.log(result)
				}catch(e){
					console.log(e)
				}
			}
		}
	}
</script>

<style>

</style>
