<template>
	<view class="tab-bar-container">
		<view class="tab-wrapper">
			<view class="tab" v-for="(tab,index) of tabList" :key="tab.id" :class="{active: activeIndex === index}" @click="switchTag(index)">{{tab.title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		model: {
			prop: 'activeIndex'
		},
		props: {
			activeIndex: {
				type: Number,
				default: 0
			},			
			tabList: {
				type: Array,
				default: () => ([{id: 1, title: '课程'}, {id: 2, title: '文章'}, {id: 3, title: '问答'}])
			}
		},
		methods:{
			switchTag(index) {
				if(index === this.currentIndex) return
				this.$emit('input',index)
			}
		}
	}
</script>

<style lang="scss">
	.tab-bar-container {
		$height: 80rpx;
		height: $height;
		background-color: #FFF;
		margin-top: 15rpx;
		border-bottom: 2rpx solid #ebebeb;
		position: relative;
		z-index: 100;
		
		.tab-wrapper {
			display: flex;			
			.tab {
				flex: 1;
				height: $height;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
			}
			
			.active {
				color: $senhe-theme-color;
				border-bottom: 2rpx solid $senhe-theme-color;
			}
		}
	}
</style>
