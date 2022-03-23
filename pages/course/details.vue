<template>
	<view class="details-container">
		<!-- 主图和基本信息 -->
		<detail-head></detail-head>
		
		<view class="swiper-wrapper">
			<me-tabs v-model="tabIndex" :height="70" :tabs="tabs"></me-tabs>
			<swiper :duration="500" :current="tabIndex" @change="change">
				<swiper-item class="swiper-item" v-for="(item,index) of 4" :key="index">{{index}}</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import detailHead from './components/detail-head.vue'
	export default {
		components: {
			detailHead
		},
		data() {
			return {
				tabs: [{name:'详情'}, {name:'章节'}, {name:'评论'}, {name:'套餐'}],
				tabIndex: 0 ,// 当前tab的下标
			}
		},
		methods: {
			change(e) {
				this.tabIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
	.details-container {
		background-color: $page-background-color;
	}
</style>
