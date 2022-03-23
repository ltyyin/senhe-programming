<template>
	<view class="banner-img-container">
		<swiper class="swiper-banner" :indicator-dots="true" indicator-active-color="rgb(255,255,255)" indicator-color="rgb(0,0,0,0.3)" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item class="swiper-item" v-for="(item,index) of bannerList" :key="index">
				<image class="image" :src="item.imageUrl" mode="widthFix" lazy-load @click="navTo(item.advertUrl)"></image>
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
				default:() => ([
					{
						"id": 1,
						"imageUrl": "/static/images/IMG_0004.png",
						"advertUrl": "/pages/course/course-details?id=1"
					},
					{
						"id": 2,
						"imageUrl": "/static/images/IMG_0001.png",
						"advertUrl": "/pages/course/course-details?id=2"
					},
					{
						"id": 3,
						"imageUrl": "/static/images/IMG_0002.png",
						"advertUrl": "/pages/course/course-details?id=3"
					}
				])
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
