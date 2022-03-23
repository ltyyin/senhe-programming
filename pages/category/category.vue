<template>
	<view class="category-index-container">			
		
		<!-- 页面左边的分类列表 -->
		<view class="content-wrapper">
			<scroll-view scroll-y class="left-content onScorll" :style="{height:height}">
				<view class="title">
					<view v-for="(item,index) of categoryList" :key="item.id" :class="{active: index === currentIndex}" @click="switchCategory(item,index)">{{item.name}}</view>
				</view>
			</scroll-view>
			
			<!-- 分类右边的tag内容 -->
			<scroll-view scroll-y class="right-content onScorll" :style="{height:height}">
				<view class="tag">
					<view class="tag-item" v-for="(item,index) of labelList" :key="index" @click.stop="labelTo(item)">
						<view class="img-wrapper center">
							<image class="img" :src="item.tag.cover" mode="scaleToFill"></image>
						</view>
						<view class="text">
							<text class="title">{{item.tag.title}}</text>
							<text class="description">{{item.tag.description}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import searchInput from '@/components/search-input.vue'
	import apiCategory from '@/api/category.js'
	import mixin from '@/common/mixin/mixin.js'
		
	export default {
		mixins: [mixin],
		components: {
			searchInput,
		},
		data() {
			return {
				height: 0,
				currentIndex: 0,
				categoryList: [],
				labelList: []
			}
		},
		async onLoad() {
			this.height = uni.getSystemInfoSync().windowHeight + 'px'
			
			const { data } = await apiCategory.getCategoryList()
			this.categoryList = data
			this.labelList = data[this.currentIndex].labelList
		},
		
		methods:{
			switchCategory(item,index){
				this.currentIndex = index
				this.labelList = this.categoryList[this.currentIndex].labelList
			},
			
			labelTo(item){
				let params = { labelId: item.id, title: item.tag.title, activeIndex: this.currentIndex }
				this.navTo(`/pages/search/search?params=${encodeURIComponent(JSON.stringify(params))}`)				
			}
		},
		
		onNavigationBarButtonTap(taget) {
			if(taget.index === 0) this.navTo('/pages/search/search')
		}
	}
</script>

<style lang="scss">
	/deep/ .uni-nav-bar-text {
		font-size: 34rpx;
	}
	
	.category-index-container {
		.content-wrapper {
			@include flex-layout;			
			.left-content {
				background-color: #f7f8fa;
				width: 320rpx;
				.title {
					view {
						padding: 30rpx 0 30rpx 26rpx;
						position: relative;						
						color: #62656b;
						transition: 0.3s;
					}
					.active::before {
						content: '';
						height: 30rpx;
						width: 8rpx;
						margin: auto 0;
						background-color: $senhe-theme-color;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
					}
					.active {
						background-color: #fff;
						color: $senhe-theme-color;
					}
				}
			}
		
			.right-content {
				background-color: #FFF;				
				.tag {
					.tag-item {
						display: flex;
						height: 150rpx;
						border-bottom: 1rpx solid #ececec;
						.img-wrapper {
							width: 160rpx;
							padding: 0 20rpx;
							.img {
								$size: 100rpx;
								width: $size;							
								height: $size;
								border-radius: 10rpx;
							}
						}
						.text {
							@include flex-layout($direction: column,$justifyContent: center)
							.title {
								font-size: 26rpx;
								padding: 10rpx 0;
								@include text-overflow;
							}
							.description {
								font-size: 24rpx;								
								color: #a1a1a1;
								@include text-ellipsis(2);
							}
						}
					}
				}
			}
		}
	}
</style>
