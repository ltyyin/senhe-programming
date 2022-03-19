<template>
	<view class="swipter-course-container">
		
		<slot></slot>
		
		<!-- touchable -->
		<swiper class="swiper-view"  :duration="300" next-margin="50rpx" @change="change" :current="currentIndex">			
			<swiper-item class="swiper-item" v-for="(row,rowIn) of computedRows" :key="rowIn">
				<swiper-course-item v-for="(item,itemIn) of courseList.slice( rowIn * rows, (rowIn+1) * rows)" :key="itemIn" :course-info="item"></swiper-course-item>
			</swiper-item>
		</swiper>
		
		<view class="swiper-dots">
			<view class="dots-item" v-for="(item,index) of computedRows" :key="index" :class="{'dots-active': currentIndex===index}" @click="switchSwiper(index)">
			</view>
		</view>
	</view>
</template>

<script>
	import swiperCourseItem from '@/components/swiper-view/swiper-course-item.vue'
	import courseList from '@/common/localData/swiper-course.js'
	
	export default {
		props: {
			rows: {
				type: Number,
				default: 2
			},
			courseList: {
				type: Array,
				default: courseList
			}
		},
		components:{
			swiperCourseItem
		},
		computed: {
			computedRows(){
				return this.courseList.length / this. rows
			}
		},
		data(){
			return {
				currentIndex: 0
			}
		},
		methods:{
			change(event){
				this.currentIndex = event.detail.current
			},
			switchSwiper(index){
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss">
	.swipter-course-container {
		padding-left: 30rpx;
		
		.swiper-view {
			.swiper-item {
				// background-color: skyblue;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
		
		.swiper-dots {
			display: flex;
			justify-content: center;
			height: 40rpx;
			// margin-top: 10rpx;
			.dots-item {
				width: 20px;
				height: 8rpx;
				background-color: #dfe2e5;
				margin: 0 10rpx;
				border-radius: 20rpx;
				transition: 1s;
			}
			
			.dots-active {
				background-color: #b8bbbe;
			}
		}
	}
</style>
