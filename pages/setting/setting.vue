<template>
	<view class="setting-container">
		<view class="card">
			<cell v-for="(cell,index) of cellList"
				:title="cell.title"	:showArrow="false"
				:active="false" :key="index"
			>
				<template v-slot:right>
					<switch @change="switchChange(cell, $event)"
						color="#42b983"
						:checked="cell.switch === '' ? false : cell.switch" />
				</template>
			</cell>
		</view>
		
		<view class="card">
			<cell title="清除缓存" :showArrow="false"
				:border="false" @click.native="clearStorage"
			>
				<template v-slot:right>
					<view style="margin-right: 20rpx; color: #808080;">
						{{storage}}
					</view>
				</template>
			</cell>
		</view>
	</view>
</template>

<script>
import cell from '@/components/cell.vue'

const whiteList = ['wifi_play','wifi_download','auto_play','userInfo', 'senhe_refresh_token']
export default {
	components: {
		cell
	},
	data() {
		return {
			cellList: [
				{
					title: '允许非WIFI网络播放',
					key: 'wifi_play',
					switch: uni.getStorageSync('wifi_play'),
				},
				{
					title: '允许非WIFI网络缓存',
					key: 'wifi_download',
					switch: uni.getStorageSync('wifi_download'),
				},
				{
					title: '视频自动连续播放',
					key: 'auto_play',
					switch: uni.getStorageSync('auto_play')
				}
			],
			currentSize: uni.getStorageInfoSync().currentSize,
		}
	},
	computed: {
		storage() {
			const currentSize = this.currentSize
			return currentSize < 1024 ? 
				`${currentSize}KB` :
				`${(currentSize/1024.00).toFixed(2)}MB`
		}
	},
	methods: {
		switchChange(cell,event) {
			uni.setStorage({
				key: cell.key,
				data: event.detail.value,
				success:	()=> {
					cell.switch = uni.getStorageSync(cell.key)
				}
			});
		},
		// 清除缓存处理函数
		clearStorage() {
			uni.showModal({
				title: '清除缓存',
				content: '清除缓存后，你的手机可用存储空间会增加',
				success: (res)=> {
					if(res.confirm){
						const result = uni.getStorageInfoSync().keys.filter( key => {
							return !whiteList.includes(key)
						})
						result.forEach(key => {
							uni.removeStorageSync(key)
						})
						this.currentSize = uni.getStorageInfoSync().currentSize
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
page {
	background-color: $pageBackgroundColor;
}
	
.setting-container {
	padding-top:  20rpx;
	.card:last-child {
		margin-top: 20rpx;
		// border-top: $underline;
		border-bottom: $underline;
	}
}
</style>
