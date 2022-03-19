<template>
	<view class="nav-list-container">
		<view class="row" v-for="(row,rowIn) of rows" :key="rowIn">
			<view class="icon-item" v-for="(item,indIn) of navList.slice(rowIn * ind,(rowIn + 1) * ind)" :key="indIn">
				<view class="image-wrap">
					<image class="image" :src="item.category.imageUrl" mode="aspectFit"></image>
				</view>
				<text>{{item.category.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navList from '@/common/localData/nav-list.js'
	export default {
		name:'nav-list',
		props:{
			navList:{
				type:Array,
				default:navList
			},
			rows:{
				type:Number,
				default:2
			},
			ind:{
				type:Number,
				default:5
			}
		}
	}
</script>
	
<style lang="scss">
	.nav-list-container {
		margin: 20rpx 0;
		overflow: hidden;
		background-color: #fff;
		padding: 10rpx 20rpx;
		
		.row {
			display: flex;
			justify-content: space-between;
			
			.icon-item {
				height: 140rpx;
				width: 120rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 23rpx;
				
				.image-wrap {
					display: flex;
					align-items: center;
					justify-content: center;
					$size: 90rpx;
					width: $size;
					height: $size;
					background-color: #f5f5f5;
					border-radius: 50%;
					.image{						
						width: $size - 30;
						height: $size - 30;
					}
				}
			}
		}
	}
</style>
