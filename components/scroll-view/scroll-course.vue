<template>
	<!-- onScorll -->
	<view class="scroll-course-container">		
		<scroll-view class="scroll-view onScorll" :scroll-x="scrollX" :scroll-y="scrollY">
			
			<template v-if="scrollY">
				<scroll-y-item v-for="(item,index) of courseList" :key="index" :course-info="item"></scroll-y-item>				
			</template>
			
			<template v-else>
				<view class="scroll-item-wrapper" :style="{width:`${courseList.length * 280}rpx`}">
					<scroll-x-item v-for="item of courseList" :key="item.id" :course-info="item"></scroll-x-item> 
				</view>	
			</template>
			
		</scroll-view>
	</view>
</template>

<script>
	import scrollYItem from '@/components/scroll-view/scroll-y-item.vue'
	import scrollXItem from '@/components/scroll-view/scroll-x-item.vue'
	
	export default {
		name:'scroll-course',
		props: {
			scrollX: {
				type: Boolean,
				default: false
			},
			scrollY: {
				type: Boolean,
				default: false,
			},
			courseList: {
				type:Array,
				required: true
			}
		},
		components: {
			scrollXItem,
			scrollYItem
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP-MP-WEIXIN || APP-PLUS */
	.onScorll ::-webkit-scrollbar {
		display: none;
	}
	/* #endif */
	
	/* 解决 H5 滚动条 */
	/* #ifdef H5 */
	.onScorll ::-webkit-scrollbar{
		width: 0 !important;
		height: 0 !important;
		display: none;
	}
	/* #endif */
	
	
	.scroll-course-container{
		.scroll-view {
			white-space: nowrap;
			
			.scroll-item-wrapper{
				height: 320rpx;
				padding-left: 30rpx;
				// padding-right: 20rpx;
			}
		}
	}
</style>
