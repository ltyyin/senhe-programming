<template>
	<view class="course-play-container">
		<!-- #ifndef APP-PLUS -->
		<video id="videoPlayer" style="width: 750rpx; height: 423rpx;" :poster="poster" :src="src"></video>
		<!-- #endif -->
		
		<view class="list-wrapper" v-if="isShowList">
			<view class="course-title">
				<text class="content">{{courseSummary}}</text>
				<view class="right-detail">
					<text class="detail">详情</text>
					<text class="iconfont icon-arrow-right"></text>
				</view>
			</view>
			
			<view class="course-list">
				<view class="item-wrapper" v-for="(chapter,chapterIndex) of chapterList" :key="chapter.id">
					<view class="chapter-name">{{chapter.title}}</view>
					<view class="course-item" v-for="(section,sectionIndex) of chapter.sectionList" 
						:key="section.id" 
						@click="switchPlay(chapterIndex, sectionIndex, section.videoUrl,section.courseName)" 
						:class="{active: chapterIndex === currentChapter && sectionIndex === currentSection}"
					>
						<text class="iconfont icon-24gf-playCircle play"></text>
						<text class="text">{{section.courseName}}</text>
						<text class="time">({{section.duration}})</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sliderBar from './subNvue/slider-bar.nvue'
	// import videoPlayer from './components/video-player.vue'
	import api from '@/api/course-detail.js'
	let videoContext = null 
	export default {
		components: {
			sliderBar
		},
		data() {
			return {
				value: 0,
				poster: '',
				src: '',
				// 课程的描述
				courseSummary: '',
				chapterList: [],
				isShowList: false,
				currentChapter: 0,
				currentSection: 0
			}
		},
		async onLoad(options) {
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			eventChannel.on('chapterList', params => {
				this.chapterList = params.chapterList
				this.courseSummary = params.courseSummary
				// 点击观看视频后，判断这个视频是否收费或者免费，收费的视频是否已经进行了购买
				if(params.isBuy || params.isFree){
					this.isShowList = true
					// 更新当前的播放中的列表
					this.updatePlayList(params.chapterIndex,params.sectionIndex)
				}else {
					if(params.isSee){
						// 更新当前的播放中的列表
						this.updatePlayList(params.chapterIndex,params.sectionIndex)
					}else {
						const currentIndex = this.findFireTryCourse()
						eventChannel.emit('changePlayIndex',currentIndex)
					}
				}
			})
		
			// 接收nvue文件传递过来的播放下一节视频事件
			// #ifdef APP-PLUS
			uni.$on('nextSection',()=> {
				// 1. 获取当前章的下一节课，有一下课，则播放一下节
				let nextCourse = this.chapterList[this.currentChapter].sectionList[this.currentSection + 1]
				if(nextCourse){
					this.updatePlayList(this.currentChapter,++this.currentSection)
				}else {
					let nextChapter = this.chapterList[this.currentChapter + 1]
					if(nextChapter) {
						// 2. 当前章没有一下节课，播放下一章第一节课
						this.currentSection = 0
						this.updatePlayList(++this.currentChapter,this.currentSection)
					}else {
						// 3. 没有一下章节(末尾)，暂停视频，提示：已观看最后一节课
						uni.showToast({
							title: '已是最后一节课',
							icon: 'none'
						})
					}
				}
			})
			// #endif
		},
		onReady() {
			// #ifndef APP-PLUS
			videoContext = uni.createVideoContext('videoPlayer',this)
			// #endif
		},
		// #ifdef APP-PLUS
		onUnload() {
			uni.$off('nextSection')
		},
		// #endif
		methods: {
			switchPlay(chapterIndex, sectionIndex, videoUrl, courseName) {
				this.currentChapter = chapterIndex
				this.currentSection = sectionIndex
				this.src = videoUrl
				// 更新课程标题
				uni.setNavigationBarTitle({
					title: courseName
				})
				uni.$emit('courseIndexChange',{chapterIndex: this.currentChapter, sectionIndex: this.currentSection, notJump: true})
				this.updatePlayList(this.currentChapter, this.currentSection)
				
				// #ifndef APP-PLUS
				setTimeout(()=>{
					videoContext.play()
				},500)
				// #endif
			},
			findFireTryCourse() {
				// 查询当前播放的为那个试看课程
				let sectionIndex = null
				const chapterIndex = this.chapterList.findIndex(chapter => {
					sectionIndex = chapter.sectionList.findIndex(section => {
						return section.isTry === 1
					})
					return sectionIndex >= 0
				})
				
				const selectChapter = this.chapterList[chapterIndex]
				const selectSection = selectChapter.sectionList[sectionIndex]
				
				// #ifndef APP-PLUS
				uni.setNavigationBarTitle({
					title: selectSection.courseName
				})
				this.poster = 'https://atts.w3cschool.cn/attachments/cover/cover_applied_visual_design_camp.png?t=1583118575'
				this.src = selectSection.videoUrl			
				// #endif
				// #ifdef APP-PLUS
				uni.$emit('videoNvue',selectSection)
				// #endif				
				return {chapterIndex, sectionIndex}
			},
			// 更新当前播放的列表
			updatePlayList(chapterIndex, sectionIndex) {
				this.currentChapter = chapterIndex || 0
				this.currentSection = sectionIndex || 0
				let currentCourse = this.chapterList[this.currentChapter].sectionList[this.currentSection]
				// #ifndef APP-PLUS
				this.poster = 'https://atts.w3cschool.cn/attachments/cover/cover_applied_visual_design_camp.png?t=1583118575'
				uni.setNavigationBarTitle({
					title: currentCourse.courseName
				})
				this.src = currentCourse.videoUrl
				// #endif
				// #ifdef APP-PLUS
				uni.$emit('videoNvue',currentCourse)
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	// /deep/ .uni-slider-thumb {
	// 	width: 18rpx !important;
	// 	height: 18rpx !important;
	// }
	.course-play-container {
		background-color: #FFFFFF;
		.list-wrapper {
			padding: 0 20rpx;
			.course-title {
				border-bottom: 2rpx solid #ebebeb;
				font-weight: 600;
				padding: 30rpx 0;
				@include flex-layout($alignItems: center,$justifyContent: space-between);
				.content {
					@include text-ellipsis(2);
					padding-right: 20rpx;
				}
				.right-detail {
					@include flex-layout($alignItems: center);
					.detail {
						min-width: 70rpx;
					}
					.iconfont {
						font-size: 38rpx;
					}
				}
			}
		}
		.course-list {
			.item-wrapper {
				.chapter-name {
					font-weight: 600;
					padding-top: 40rpx;
				}
				.course-item {
					color: #959595;
					padding: 30rpx 20rpx;
					border-bottom: 2rpx solid #ebebeb;
					.text {
						margin: 0 20rpx;
					}
				}
				.active {
					color: $senhe-theme-color;
				}
			}
		}
	}
</style>
