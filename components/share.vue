<template>
	<u-action-sheet @touchmove.native.stop.prevent="" round="20rpx" safeAreaInsetBottom :show="show" @close="close" cancelText="取消">
		<view class="share-wrapper">
			<view class="item-wrapper">
				<view class="icon-item" v-for="(provider,index) of providerList" :key="index" @click="share(provider)">
					<!-- #ifdef APP-PLUS -->
					<image class="img" :src="provider.appPath" mode="aspectFit"></image>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<image class="img" :src="provider.h5Path" mode="aspectFit"></image>
					<!-- #endif -->
					<text>{{provider.name}}</text>
				</view>
			</view>
			<view class="copy-link" @click="copyLink">
				<view class="content">
					<text>复制链接</text>
				</view>
			</view>
		</view>
	</u-action-sheet>
</template>

<script>
	import { url } from '@/common/utils/url.js'
	export default {
		props: {
			isShowShare: {
				type: Boolean,
				default: false
			},
			detailInfo: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				title: 'share',
				shareText: '',
				href:	"",
				image: '',
				shareType:	1,
				providerList: []
			}
		},
		watch: {
			detailInfo: {
				immediate: true,
				handler(val) {
					this.shareText = val.title					
					this.image = val.coverImage
					
					// 获取当前的路由地址
					let pages = getCurrentPages();
					let page = pages[pages.length - 1]
					// #ifdef APP-PLUS
					let currentWebview = page.$getAppWebview()
					this.href = `${currentWebview.__uniapp_route}?id=${val.id}`
					// #endif
					// #ifndef APP-PLUS
					this.href = `${page.route}?id=${val.id}`
					// #endif
				}
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
					let data = []
					e.provider.forEach(provider => {
						switch (provider) {
							case 'qq':
								data.push({
									name: 'QQ',
									id: 'qq',
									sort: 0,
									appPath: '/static/app-plus/shareIcon/qq.png',
									h5Path: '/static/h5/shareIcon/qq.png'
								})
								break;
							case 'weixin':
								data.push({
									name: '微信',
									id: 'weixin',
									sort: 1,
									appPath: '/static/app-plus/shareIcon/weChat.png',
									h5Path: '/static/h5/shareIcon/weChat.png'
								})
								data.push({
									name: '朋友圈',
									id: 'weixin',
									type:'WXSenceTimeline',
									sort: 2,
									appPath: '/static/app-plus/shareIcon/pengyouquan.png',
									h5Path: '/static/h5/shareIcon/pengyouquan.png'
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '微博',
									id: 'sinaweibo',
									sort: 3,
									appPath: '/static/app-plus/shareIcon/weibo.png',
									h5Path: '/static/h5/shareIcon/weibo.png'
								})
								break;							
							default:
								break;
						}
					})
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
			},
			// 复制链接
			copyLink() {
				uni.setClipboardData({
					data: `${url}/${this.href}`,
					showToast: false,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'none'
						})
					},
					complete: () => {
						this.$emit('update:isShowShare',false)
					}
				})
			},
			async share(provider) {
				// #ifdef APP-PLUS
				let shareOPtions = {
					provider: provider.id,
					scene: provider.type && provider.type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel:false
						})
						this.$emit('update:isShowShare',false)
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel:false
						})
					},
					complete:function(){
						console.log('分享操作结束!')
					}
				}
				
				switch (this.shareType){
					case 0:
						shareOPtions.summary = this.shareText;
						shareOPtions.imageUrl = this.image;
						shareOPtions.title = '欢迎体验uniapp';
						shareOPtions.href = 'https://uniapp.dcloud.io';
						break;
					case 1:
						shareOPtions.summary = this.shareText;
						break;
					case 2:
						shareOPtions.imageUrl = this.image;
						break;
					case 5:
						shareOPtions.imageUrl = this.image ? this.image : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png'
						shareOPtions.title = '欢迎体验uniapp';
						shareOPtions.miniProgram = {
							id:'gh_33446d7f7a26',
							path:'/pages/tabBar/component/component',
							webUrl:'https://uniapp.dcloud.io',
							type:0
						};
						break;
					default:
						break;
				}
				
				if(!this.shareText && (this.shareType === 1 || this.shareType === 0)){
					uni.showModal({
						content:'分享内容不能为空',
						showCancel:false
					})
					return;
				}
				if(!this.image && (this.shareType === 2 || this.shareType === 0)){
					uni.showModal({
						content:'分享图片不能为空',
						showCancel:false
					})
					return;
				}				
				
				if(shareOPtions.type === 0 && plus.os.name  === 'iOS'){//如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if(shareOPtions.type === 1 && shareOPtions.provider === 'qq'){//如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = 'https://uniapp.dcloud.io';
					shareOPtions.title = '欢迎体验uniapp';
				}
				uni.share(shareOPtions);
				// #endif
			},
			
			//压缩图片 图文分享要求分享图片大小不能超过20Kb
			compress(){
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					// 注意：这是上传的是本地的图片，如果图片是外部引用资源的话，这要进行下载
					// var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					// console.log('after' + localPath);
					
					uni.downloadFile({
						url: this.image,
						success: (res)=> {
							// 压缩size
							plus.io.resolveLocalFileSystemURL(res.tempFilePath, (entry) => {
								entry.file((file) => {// 可通过entry对象操作图片 
									console.log('getFile:' + JSON.stringify(file));
									if(file.size > 20480) {// 压缩后size 大于20Kb
										plus.zip.compressImage({
											src: img,
											dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
											width: '10%',
											height: '10%',
											quality: 1,
											overwrite: true
										}, (event) => {
											console.log('success zip****' + event.size);
											let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
											res(newImg);
										}, function(error) {
											uni.showModal({
												content:'分享图片太大,需要请重新选择图片!',
												showCancel:false
											})
										});
									}
								});
							}, (e) => {
								console.log('Resolve file URL failed: ' + e.message);
								uni.showModal({
									content:'分享图片太大,需要请重新选择图片!',
									showCancel:false
								})
							});
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.share-wrapper {
		padding: 0 20rpx;
		.item-wrapper {
			@include flex-layout($alignItems: center, $justifyContent: space-around);
			/* #ifdef APP-PLUS */
			height: 200rpx;
			/* #endif */
			/* #ifdef H5 */
			height: 40rpx;
			/* #endif */
			$size: 80rpx;
			.icon-item {
				@include flex-layout($direction: column, $alignItems: center);
				font-size: 30rpx;
				width: 130rpx;
				.img {
					width: $size;
					height: $size;
					margin: 10rpx 0;
				}
				transition: 0.3s;
				&:active {
					background-color: #f3f3f3;
				}
			}
		}
		.copy-link {
			@include flex-layout($alignItems: center, $justifyContent: space-around);
			background-color: #eeeeee;
			margin-bottom: 50rpx;
			margin-top: 20rpx;
			height: 90rpx;
			border-radius: 10rpx;
			transition: 0.3s;
			&:active {
				background-color: #dfdfdf;
			}
		}
	}
</style>
