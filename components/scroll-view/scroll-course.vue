<template>
	<!-- onScorll -->
	<view class="scroll-course-container">
		<template v-if="scrollY">
			<view class="scroll-view-y">
				<scroll-y-item v-for="(item,index) of courseList" :key="index" :course-info="item"></scroll-y-item>
			</view>
		</template>
		<template v-else>
			<scroll-view class="scroll-view-x onScorll" :scroll-x="scrollX" :scroll-y="scrollY">
				<view class="scroll-item-wrapper" :style="{width:`${courseList.length * 280}rpx`}">
					<scroll-x-item v-for="item of courseList" :key="item.id" :course-info="item"></scroll-x-item> 
				</view>	
			</scroll-view>		
		</template>	
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
	.scroll-course-container{
		.scroll-view-y {
			margin: 0 30rpx;
		}
		
		.scroll-view-x {
			white-space: nowrap;			
			.scroll-item-wrapper{
				height: 320rpx;
				padding-left: 30rpx;
				// padding-right: 20rpx;
			}
		}
	}
</style>
