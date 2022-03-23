<template>
	<view class="top-bar-container" :style="{height:topBarHeight + 'rpx'}">
		<view class="navigator-bar" :style="{height:`${navBarHeight}rpx`,marginTop:`${statusBarHeight}rpx`}">
			<view class="search-frame" @click="navTo('/pages/search/search')">
				<text class="iconfont icon-search"></text>
				<text class="line"></text>
				<text>搜索</text>
			</view>
			<view class="title">
				森和编程
			</view>
		</view>
	</view>
</template>

<script>
	import mixin from '@/common/mixin/mixin.js'
	export default {
		name:"search-input",
		mixins:[ mixin ],
		created() {
			this.$emit('navBarHeight',this.topBarHeight)
		},
		computed:{
			statusBarHeight(){
				return uni.getSystemInfoSync().statusBarHeight * 2
			},
			
			/* 单一导航栏的高度 */
			navBarHeight(){
				// 计算状态栏的高度（最主要是适配刘海屏问题）
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect()		
				// 计算出胶囊菜单和状态栏之间的距离
				let  menuInterval = (menuButtonInfo.top * 2) - this.statusBarHeight
				// 最终的navBar高度等于 胶囊菜单高度 + 胶囊菜单与状态栏间隔*2
				return (menuInterval * 2) + (menuButtonInfo.height * 2)				
			},
			
			/* 整个顶部topBar的高度，加 20rpx 是因为要隔离下面的banner轮播图 */
			topBarHeight(){
				return this.statusBarHeight + this.navBarHeight 
			}
		}	
	}
</script>

<style lang="scss">
	.top-bar-container {
		position: fixed;
		z-index: 999;
		box-sizing: border-box;
		width: 100%;
		top: 0;
		background-color: #fff;
		overflow: hidden;
			
		.navigator-bar {
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
		}
	}
</style>
