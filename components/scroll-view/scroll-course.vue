<template>
	<!-- onScorll -->
	<view class="scroll-course-container onScorll">		
		<scroll-view class="scroll-view " :scroll-x="scrollX" :scroll-y="scrollY">		
			<slot>
				<view class="scroll-item-wrapper" :style="{width:`${scrollWrapperWidth}rpx`}">
					<scroll-x-item v-for="item in courseList" :courseInfo="item" :key="item.id"></scroll-x-item>
				</view>	
			</slot>	
		</scroll-view>
	</view>
</template>

<script>
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
			courseList:{
				type: Array,
				default: () => []
			}
		},
		components: {
			scrollXItem
		},
		computed:{
			scrollWrapperWidth(){
				return 280 * this.courseList.length
			}
		}
	}
</script>

<style lang="scss">
	.scroll-course-container{
		.scroll-view {			
			white-space: nowrap;
			
			.scroll-item-wrapper{
				height: 320rpx;
				padding-left: 30rpx;
				padding-right: 20rpx;
			}
		}
	}
</style>
