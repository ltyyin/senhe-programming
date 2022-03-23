<template>
	<view class="down-bar-container row" @touchmove.stop.prevent="()=> {}">		
		<view class="sort-title" v-for="(sort,index) of downBarList" :key="sort.id">
			<view class="text center" @click="switchSort(index)">
				<text>{{sort.title}}</text>
				<text class="iconfont icon-triangle"></text>
			</view>
						
			<view class="sort-item" v-if="isShowSortItem" @touchmove.stop.prevent="closeShowSort">
				<template v-if="index === sortIndex">
					<view class="item" v-for="(item,itemIndex) of sort.list" :key="item.id" @click="switchSortItem(sort,item)">
						<text class="item-title">{{item.name}}</text>
						<text class="iconfont icon-right" v-if="sort.title === item.name"></text>					
					</view>
				</template>
			</view>
		</view>
		
		<view class="cover" v-if="isShowSortItem" @touchend.stop.prevent="closeShowSort"></view>		
	</view>	
</template>

<script>
	export default {
		props: {
			downBars: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				sortIndex: 0,
				isShowSortItem: false,
				clickCount: 0,
				downBarList: []
			}
		},
		created() {
			this.downBarList = this.downBars
		},
		methods: {
			switchSort(index) {
				if(!this.isShowSortItem) this.isShowSortItem = true	
				if(index === this.sortIndex) {
					if(this.clickCount === 0){
						this.clickCount += 1						
						return
					}
					this.isShowSortItem = false
					this.clickCount = 0
				}else {
					this.sortIndex = index
					this.clickCount += 1
				}
			},			
			switchSortItem(sort,item) {
				this.isShowSortItem = false
				this.clickCount = 0
				if(sort.title === item.name) return
				sort.title = item.name
				this.$emit('search',{ [sort.name]:item.name })
				uni.showLoading({
					title: '更新中...'
				})
			},
			closeShowSort() {
				if(this.isShowSortItem){
					 this.isShowSortItem = false
					 this.clickCount = 0
				}
			}
		}
	}
</script>

<style lang="scss">
	.down-bar-container {
		position: sticky;
		// top: var(--window-top);
		$height: 80rpx;
		z-index: 100;
		height: $height;
		background-color: #FFFFFF;			
		border-bottom: 1rpx solid #ebebeb;
		justify-content: space-around;
		
		
		.sort-title {
			line-height: $height;
			font-size: 28rpx;
			color: #868686;
			.text {
				display: flex;
				.iconfont {
					margin-left: 15rpx;
					font-size: 24rpx;
					color: #d9d9d9;
					transform: scale(0.9);
				}					
			}
			
			.sort-item {
				position: absolute;
				top: $height + 1rpx;
				background-color: #FFFFFF;
				left: 0;
				right: 0;
				padding: 0 40rpx;				
				z-index: 100;
				
				.item {
					padding: 15rpx 0;
					display: flex;
					.item-title {
						margin-right: auto;
					}
					.iconfont {
						color: $senhe-theme-color;
					}
				}					
			}
		}
		
		.cover {
			position: fixed;
			background-color: #000000;
			opacity: 0.2;
			left: 0;
			right: 0;
			top: calc(var(--window-top) + 270rpx);
			bottom: 0;
			z-index: -100;
		}
	}
</style>
