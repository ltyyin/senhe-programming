<template>
	<view class="news-container">
		<view class="news-inner">
			<image class="news-icon" src="/static/iconImages/news.png" mode="aspectFit"></image>	
			<swiper
				class="swiper-text"
				disable-touch autoplay
				:touchable="false"
				:interval="3000"
				:duration="1000"
				circular vertical
			>
				<swiper-item class="swiper-item" v-for="(item,index) of newsList" :key="index">
					<text>{{item.content}}</text>
				</swiper-item>
			</swiper>				
		</view>
	</view>
</template>

<script>
	export default {
		name:'news',
		props:{
			newsList:{
				type: Array,
				default: () => ([
					{
						id:1,
						content:'新闻1'
					},
					{
						id:2,
						content:'新闻2'
					},
					{
						id:3,
						content:'新闻3'
					}
				])
			}
		}
	}
</script>

<style lang="scss">	
	.news-container {
		background-color: #FFFFFF;
		height: 80rpx;
		display: flex;
		align-items: center;
		
		.news-inner {
			width: 100%;			
			display: flex;
			align-items: center;
			height: 60rpx;
			margin: 0 25rpx 0 35rpx;
			
			.news-icon {
				width: 60rpx;
				margin-right: 15rpx;
				height: 100%;
			}		
			
			.swiper-text{
				flex: 1;
				height: 100%;				
				overflow: hidden;
				.swiper-item{
					display: flex;
					align-items: center;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
