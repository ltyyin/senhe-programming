<template>
	<view class="top-bar-container" :style="{height:topBarHeight + 'rpx'}">
		<view class="navigator-bar" :style="{height:`${navBarHeight}rpx`,marginTop:`${statusBarHeight}rpx`}">
			
			<!-- #ifdef MP -->	
			<view class="search-frame">
				<text class="iconfont icon-search"></text>
				<text class="line"></text>
				<text>搜索</text>
			</view>
			<view class="title">
				森和编程
			</view>
			<!-- #endif -->
			
			<!-- #ifdef APP-PLUS || H5 -->
			<view class="search-frame">
				<text class="iconfont icon-search"></text>
				<text class="word">探索知识的海洋</text>
			</view>
			<!-- #endif -->
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-input",
		created() {
			this.$emit('navHeight',this.topBarHeight)
		},
		// #ifdef APP-PLUS || H5
		props:{
			navBarHeight:{
				type:Number,
				default: 72
			}
		},
		// #endif
		computed:{
			statusBarHeight(){
				// #ifdef MP
					return uni.getSystemInfoSync().statusBarHeight * 2
				// #endif
				
				// #ifdef APP-PLUS
					return (uni.getSystemInfoSync().statusBarHeight + 5) * 2
				// #endif
					
				// #ifdef H5
					return 10
				// #endif
			},
			
			/* 单一导航栏的高度 */
			// #ifdef MP	
			navBarHeight(){
				// 计算状态栏的高度（最主要是适配刘海屏问题）
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect()		
				// 计算出胶囊菜单和状态栏之间的距离
				let  menuInterval = (menuButtonInfo.top * 2) - this.statusBarHeight
				// 最终的navBar高度等于 胶囊菜单高度 + 胶囊菜单与状态栏间隔*2
				return (menuInterval * 2) + (menuButtonInfo.height * 2)				
			},
			// #endif
			
			/* 整个顶部topBar的高度，加 20rpx 是因为要隔离下面的banner轮播图 */
			topBarHeight(){
				return this.statusBarHeight + this.navBarHeight 
			}
		}	
	}
</script>

<style lang="scss">
	.top-bar-container {
		position: sticky;
		z-index: 999;
		box-sizing: border-box;
		width: 100%;
		top: 0;
		background-color: #fff;
		overflow: hidden;
			
		.navigator-bar {
			/* #ifdef MP */
			display: flex;
			align-items: center;
			justify-content: center;
			.search-frame {
				position: absolute;
				left: 30rpx;
				height: 55rpx;
				width: 150rpx;
				border-radius: 40rpx;
				background-color: #f3f3f3;
				font-size: 25rpx;
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				color: #6d6d6d;
							
				.line {
					width: 1rpx;
					height: 60%;
					background-color: #bdbdbd;
				}			
			}
			.title {
				font-size: 33rpx;
				font-weight: 600;
				letter-spacing: 2rpx;
			}
			/* #endif */
		
			/* #ifdef APP-PLUS || H5 */
			.search-frame {
				background-color: #f3f3f3;
				height: 60rpx;
				box-sizing: border-box;
				margin: 0 40rpx;
				border-radius: 10rpx;
				color: #999999;
				display: flex;
				align-items: center;
				padding-left: 20rpx;
				.iconfont {
					font-size: 46rpx;
					margin-right: 10rpx;
				}
				
			}
			/* #endif */
		}
	}
</style>
