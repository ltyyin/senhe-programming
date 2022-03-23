<template>
	<view class="show-list-container" v-if="info">
		<view class="img-wrapper">
			<image class="img" :src="info.mainCover"></image>
		</view>
		
		<view class="course-list">
			<scroll-y-item v-for="(item,index) of info.records" :key="index" :course-info="item"></scroll-y-item>
		</view>
	</view>
</template>

<script>
	import api from '@/api/course.js'
	import scrollYItem from '@/components/scroll-view/scroll-y-item.vue'
	
	export default {
		data() {
			return {
				info: null
			}
		},
		components: {
			scrollYItem
		},
		async onLoad(option) {
			const params = JSON.parse(decodeURIComponent(option.params))
			uni.showLoading({
				title: '加载中...'
			})
			uni.setNavigationBarTitle({
				title: params.title
			});
			
			if(params.title === '免费好课') {
				const res = await api.getFreeCourses({count: 10})
				this.info = res.data
			}else {
				const res = await api.getChoicest()
				this.info = res.data
			}			
			uni.hideLoading()
		}
	}
</script>

<style lang="scss">
	.show-list-container {
		.img-wrapper {
			.img {
				width: 100%;
				height: 200rpx;
			}
		}
		
		.course-list {
			padding: 20rpx 0;
		}
	}
</style>
