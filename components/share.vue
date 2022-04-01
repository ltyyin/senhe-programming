<template>
	<u-action-sheet @touchmove.native.stop.prevent="" round="20rpx" safeAreaInsetBottom :show="show" @close="close" cancelText="取消">
		<view class="share-wrapper">
			<view class="item-wrapper">
				<view class="icon-item" v-for="(item,index) of iconList" :key="index">
					<!-- #ifdef APP-PLUS -->
					<image class="img" :src="item.appPath" mode="aspectFit"></image>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<image class="img" :src="item.h5Path" mode="aspectFit"></image>
					<!-- #endif -->
					<text>{{item.text}}</text>
				</view>
			</view>
			<view class="copy-link">
				<view class="content">
					<text>复制链接</text>
				</view>
			</view>
		</view>
	</u-action-sheet>
</template>

<script>
	export default {
		props: {
			isShowShare: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				iconList: [
					{text: 'QQ', appPath: '/static/app-plus/shareIcon/qq.png', h5Path: '/static/h5/shareIcon/qq.png'},
					{text: '微信', appPath: '/static/app-plus/shareIcon/weChat.png', h5Path: '/static/h5/shareIcon/weChat.png'},
					{text: '朋友圈', appPath: '/static/app-plus/shareIcon/pengyouquan.png', h5Path: '/static/h5/shareIcon/pengyouquan.png'},
					{text: '微博', appPath: '/static/app-plus/shareIcon/weibo.png', h5Path: '/static/h5/shareIcon/weibo.png'},
				],
				title: 'share',
				shareText: 'uni-app可以同时发布成原生App、小程序、H5，邀请你一起体验！',
				href:"https://uniapp.dcloud.io",
				image: '',
				shareType:1,
				providerList: []
			}
		},
		computed: {
			show: {
				get() {
					return this.isShowShare
				},
				set(val) {
					this.$emit('update:isShowShare',val)
				}
			}
		},
		created() {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					// console.log('success', e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin',
									sort:0
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									sort:1
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '分享到新浪微博',
									id: 'sinaweibo',
									sort:2
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq',
									sort:3
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					uni.showModal({
						content:'获取分享通道失败',
						showCancel:false
					})
				}
			});
		},
		methods: {
			close() {
				this.$emit('update:isShowShare',false)
				uni.showToast({
					title: '分享取消',
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	.share-wrapper {
		padding: 0 20rpx;
		.item-wrapper {
			@include flex-layout($alignItem: center, $justifyContent: space-around);
			height: 200rpx;
			$size: 80rpx;
			.icon-item {
				@include flex-layout($direction: column, $alignItem: center);
				font-size: 30rpx;
				width: 130rpx;
				.img {
					width: $size;
					height: $size;
					margin: 10rpx 0;
				}
			}
		}
		.copy-link {
			@include flex-layout($alignItem: center, $justifyContent: space-around);
			background-color: #eeeeee;
			margin-bottom: 50rpx;
			margin-top: 20rpx;
			height: 90rpx;
			border-radius: 10rpx;
		}
	}
</style>
