<template>
	<view class="banner-img-container">
		<swiper class="swiper-banner" :indicator-dots="true"
			indicator-active-color="rgb(255,255,255)"
			indicator-color="rgb(0,0,0,0.3)"
			:autoplay="true" :interval="3000" :duration="500"
		>
			<swiper-item class="swiper-item" v-for="(item,index) of bannerList" :key="index">
				<image class="image" :src="item.imageUrl" 
					mode="widthFix" lazy-load 
					@click="navTo(item)"
				></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import mixin from '@/common/mixin/mixin.js'
	export default {
		name:'banner-img',
		mixins: [mixin],
		props:{
			bannerList:{
				type:Array,
				required: true
			}
		},
		methods: {
			navTo(item) {
				uni.navigateTo({
					url: `/pages/course/details`,
					success: (res)=> {
					  res.eventChannel.emit('params', {
							id: item.id,
							isFree: 0
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.banner-img-container{
		.swiper-banner{
			height: 280rpx;
			.swiper-item{
				.image{
					width: 100%;
				}
			}
		}
	}
</style>
