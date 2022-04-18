<template>
	<view class="details-container">
		<view class="loading" v-if="!detailInfo.id"></view>
				
		<!-- 主图和基本信息 -->
		<detail-head :detailInfo="detailInfo"></detail-head>
		<view class="swiper-wrapper">
			<template v-if="detailInfo.id">
				<me-tabs @touchmove.native.stop.prevent="" v-model="tabIndex" :height="70" :tabs="tabs"></me-tabs>
				<swiper :style="{height: `${height}px`}" :duration="500"  :current="tabIndex" @change="change">
					<swiper-item v-for="(item,index) of 4" :key="index">
						<scroll-view upper-threshold="5" @scrolltoupper="scrolltoupper" :scroll-y="enableScroll" style="height: 100%;">
							<view class="scroll-wrapper">
								<course-info v-if="index === 0" :detail-info="detailInfo" />
								<course-dir v-if="index === 1" :chapter-list="chapterList" :is-free="detailInfo.isFree" :current-chapter="currentChapter" :current-section="currentSection" />
								<course-comment v-if="index === 2" :recommend-list="recommendList" :good-rate="detailInfo.goodRate" />
								<course-recommend v-if="index === 3" />
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</template>
		</view>
		
		<!-- 购物tabBar -->
		<view class="safe-bottom"></view>
		<uni-goods-nav class="goods-nav" :fill="true"  :options="options" :button-group="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		
		<!-- #ifndef MP -->
		<!-- 分享层 -->
		<share v-if="detailInfo.id" :isShowShare.sync="isShowShare" :detail-info="detailInfo"></share>
		<!-- #endif -->
		
		<!-- 评论编写按钮 -->
		<view class="write-commont-btn" v-if="tabIndex === 2" @click="navToEvaluate">
			<text class="iconfont icon-creation"></text>
		</view>
	</view>
</template>

<script>
	import detailHead from './components/detail-head.vue'
	import courseInfo from './components/course-info.vue'
	import courseDir from './components/course-dir.vue'
	import courseComment from './components/course-comment.vue'
	import courseRecommend from './components/course-recommend.vue'
	import share from '@/components/share.vue'
	// 导入api请求
	import api from '@/api/course-detail.js'
	import mixin from '@/common/mixin/mixin.js'
	import { url } from '@/common/utils/url.js'
	
	export default {
		mixins: [mixin],
		components: {
			detailHead,
			courseInfo,
			courseDir,
			courseComment,
			courseRecommend,
			share
		},
		data() {
			return {
				tabs: [{name:'详情'}, {name:'章节'}, {name:'评论'}, {name:'推荐'}],
				tabIndex: 0 ,// 当前tab的下标
				height: 0,
				// 在预览窗口点击跳转详情后携带的参数
				queryParams: null,
				detailTop: null,
				enableScroll: false,
				statusBarHeight: 0,
				detailInfo: {},
				chapterList: [],
				recommendList: [],
				options: [{
					icon: 'icon-zixun',
					text: '客服'
				},
				{
					icon: 'icon-shoucang',
					text: '收藏',
					infoBackgroundColor:'#007aff',
					infoColor:"red"
				}],
				isCollect: false,
				// 是否显示分享面板
				isShowShare: false,
				// 用户当前或之前所观看的章节记录(这个数据一般是后台返回来的)
				currentChapter: null,
				currentSection: null
			}
		},
		computed: {
			buttonGroup() {
				if(this.detailInfo.isFree || this.detailInfo.isBuy) {
					return [
					{ text: '开始学习', backgroundColor: '#f2b352', color: '#fff'}
					]
				}else {
					return [
					{ text: '免费试学', backgroundColor: '#fce6d4', color: '#ee7734'},
					{ text: '立即购买', backgroundColor: '#ed732f', color: '#fff' }
					]
				}				
			}
		},
		async onLoad(option) {
			// #ifndef APP-PLUS
			let pages = getCurrentPages();
			console.log(pages[pages.length - 1].route);
			// #endif
			
			uni.showLoading({
				title: '加载中...'
			})
			
			// 监听course-play视频列表的改变
			uni.$on('courseIndexChange', params => {
				this.currentChapter = params.chapterIndex
				this.currentSection = params.sectionIndex
				if(!params.notJump){
					// 没有锁的表面这个视频一定能看
					params.navTo && this.routerTo(true)
				}				
			})
			
			const systemInfo =  uni.getSystemInfoSync()
			// #ifdef H5
			this.height = systemInfo.windowHeight - 44 - uni.upx2px(70)
			// #endif
			// #ifdef MP
			this.height = systemInfo.windowHeight  - parseInt(uni.upx2px(70))
			// #endif
			// #ifdef APP-PLUS
			this.height = systemInfo.windowHeight - 44  - uni.upx2px(70) - systemInfo.statusBarHeight
			this.statusBarHeight = systemInfo.statusBarHeight
			// 禁用点击状态栏回到顶部
			const currentWebView = this.$mp.page.$getAppWebview()
			currentWebView.setStyle({scrollsToTop: false})
			// #endif
			
			/* 路由跳转到该页面后所传递的参数 */
			// #ifdef APP-NVUE
				const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			  const eventChannel = this.getOpenerEventChannel();
			// #endif
			/* 正式接收 */
			eventChannel.on('params', async (data)=> {
				this.queryParams = data
				
				await this.getCourseDetailSummary()
				uni.hideLoading()
				await this.getChapterSection()
				await this.getCourseRecommend()
			})
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(`.swiper-wrapper`)
			.boundingClientRect(data => {
				// #ifdef H5
					this.detailTop = data.top - 44
				// #endif
				// #ifdef	MP
					this.detailTop = data.top
				// #endif
				// #ifdef APP-PLUS
					this.detailTop = data.top - 44 - this.statusBarHeight
				// #endif
			}).exec();
		},
		onPageScroll(e) {
			if( !this.enableScroll && parseInt(this.detailTop - e.scrollTop) <= 2) {
				this.enableScroll = true
			}
		},
		
		onNavigationBarButtonTap(e) {
			if(e.type === 'share' && !this.isShowShare) {
				this.isShowShare = true
			}
		},
		
		// 小程序端分享（onLoad)
		onShareAppMessage(res) {
			// 获取当前的路由地址
			let pages = getCurrentPages();
			let route = pages[pages.length - 1].route
			return {
				title: this.detailInfo.title,
				path: `/${route}?id=${this.detailInfo.id}`
			}
		},
		
		methods: {
			change(e) {
				this.tabIndex = e.detail.current
				uni.pageScrollTo({
					scrollTop: this.detailTop,
					duration: 300
				})
			},
			scrolltoupper(){
				if(this.enableScroll){
					this.enableScroll = false
				}
			},
			
			async getCourseDetailSummary() {
				const { data } = await api.getCourseDetailSummary(
					this.queryParams.id,
					this.queryParams.isFree
				)
				this.detailInfo = data
				uni.setNavigationBarTitle({
					title: this.detailInfo.title
				})
			},			
			async getChapterSection() {
				const { data } = await api.getChapterSection(this.queryParams.id)
				this.chapterList = data
			},			
			async getCourseRecommend() {
				const { data } = await api.getCourseRecommend(this.queryParams.id)
				this.recommendList = data
			},
			
			onClick (e) {
				if(e.index === 1){
					if(!this.isCollect){
						this.isCollect = true
						this.options[e.index].icon = 'icon-daohangshoucangyishoucang'
						this.options[e.index].text = '已收藏'
					}else {
						this.isCollect = false
						this.options[e.index].icon = 'icon-shoucang'
						this.options[e.index].text = '收藏'
					}
					
				}
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick (e) {
				if(e.index === 0) {					
					this.routerTo()
				}
				if(e.index === 1) {
					// 这里应该判断一下是否已经进行了登录
					uni.navigateTo({
						url: '/pages/order/order',
						success: (res)=> {
							let info = this.detailInfo
							if(info.id) {
								let infoObj = {
									coverImage: info.coverImage,
									studyTotalFloat: info.studyTotalFloat,
									info:{title: info.title},
									isFree: 0,
									priceDiscount: info.priceDiscount,
									priceOriginal: info.priceOriginal,
									nickName: info.nickName,
								}
								res.eventChannel.emit('detailInfo', [infoObj])
							}				
						}
					})
				}
			},			
			routerTo(isSee = false) {
				uni.navigateTo({
					url: `/pages/course/course-play?id=${this.courseId}`,
					events: {
						changePlayIndex: playIndex => {
							this.currentChapter = playIndex.chapterIndex
							this.currentSection = playIndex.sectionIndex
						}
					},
					success: res => {
						// 通过eventChannel向被打开页面传送数据
						let params = {
							chapterList:this.chapterList,
							courseSummary: this.detailInfo.courseSummary,
							isBuy:this.detailInfo.isBuy, 
							isFree: this.detailInfo.isFree, 
							isSee,
							chapterIndex: this.currentChapter,
							sectionIndex: this.currentSection
						}
						res.eventChannel.emit('chapterList', params)
					}
				})
			},
			// 跳转到课程评价页面
			navToEvaluate() {
				uni.navigateTo({
					url: '/pages/course-evaluate/course-evaluate'
				})
			}
		},
		destroyed() {
			uni.$off('courseIndexChange')
		}
	}
</script>

<style lang="scss">
	.details-container {
		background-color: #FFFFFF;
		.loading {
			position: fixed;
			z-index: 999;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #FFFFFF;
		}
						
		.scroll-wrapper {
			padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);
		}
		
		.goods-nav {
			position: fixed;
			bottom: 0;
			width: 100%;
			// 设置
			padding-bottom: env(safe-area-inset-bottom);
			background-color: #FFFFFF;
		}
		
		// 评论按钮
		.write-commont-btn {
			@include flex-layout($alignItems: center,$justifyContent: center);
			position: fixed;
			right: 20rpx;
			z-index: 9999;
			bottom: calc(130rpx + env(safe-area-inset-bottom));
			background-color: #fadec1;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50rpx;
			.iconfont {
				color: #de6f35;
				font-size: 40rpx;
			}
			transition: 2s;
		}
	}
</style>
