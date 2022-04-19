<template>
	<view class="aiticle-detail-container">
		<view class="article-wrapper">
			<view class="title">{{article.title}}</view>
			<user-info :userImage="article.userImage">
				<view class="user-info" slot="middle">
					<view>{{article.nickName}}</view>
					<view>{{article.isFollow | relativeTime}} · 阅读 {{article.pageViews}}w</view>
				</view>
				<template v-slot:right>
					<button type="default" size="mini" style="transform: scale(0.8);"
						@click="handlerFollow"
					>
						{{article.isFollow ? '关注' : '已关注'}}
					</button>
				</template>
			</user-info>
			
			<view class="markdown-body">
				<u-parse :content="article.content" :selectable="true" :tagStyle="style"></u-parse>
			</view>
		</view>
		
		<!-- 评论回复的列表 -->
		<view class="comment-wrapper">
			<view class="comment-title">热门评论</view>
			<view class="comment" v-for="(comment,index) of commentList" :key="comment.id">
				<user-info :userImage="comment.userImage">
					<view class="user-info" slot="middle">
						<view>{{comment.nickName}}</view>
						<view>{{comment.createDate | relativeTime}}</view>
					</view>
					<template v-slot:right>
						<uni-icons custom-prefix="iconfont"
							type="icon-31dianzan" size="46rpx">
						</uni-icons>
					</template>
				</user-info>
				<view class="content">{{comment.content}}</view>
			</view>
		</view>
	
		<!-- 评论编写按钮 -->
		<view class="footer f-fa-c">
			<view class="comment-btn" @click="handlerComment">
				<text class="iconfont icon-creation"></text>
				<text>写评论</text>
			</view>
		</view>
		</veiw>
	</view>
</template>

<script>
	import { getArticleById, getArticleCommentById } from '@/api/article.js'
	import userInfo from './components/user-info.vue'
	
	export default {
		components: {
			userInfo
		},
		data() {
			return {
				articleId: null,
				article: {},
				commentList: [],
				style: {
					h2: 'font-size: 30rpx;',
					p: 'font-size: 30rpx;',
					ul: 'padding-left: 40rpx;',
					strong: 'margin: 60rpx 0;'
				}
			}
		},
		async onLoad(option) {
			this.getArticleById(option.id)
			this.getArticleCommentById(option.id)
		},
		methods: {
			handlerFollow() {
				if(this.article.isFollow === 0) {
					this.article.isFollow = 1
					return
				}
				this.article.isFollow = 0
			},
			handlerComment() {
				uni.navigateTo({
					url: `/pages/inpute/inpute?${this.articleId}`
				})
			},
			async getArticleById(id) {
				const { data } = await getArticleById(id)  
				this.article = data
			},
			async getArticleCommentById(id) {
				const { data } = await getArticleCommentById(id) 
				this.commentList = data
			}
		}
	}
</script>

<style lang="scss">
	@import url('@/common/css/github-markdown.css');
	@import url('@/common/css/github-min.css');
	
	.user-info {
		view:first-child {
			font-size: 32rpx;
		}
		view:last-child {
			font-size: 22rpx;
			color: #999;
		}
	}
	
	.aiticle-detail-container {
		background-color: $pageBackgroundColor;
		.article-wrapper {
			background-color: #FFFFFF;
			padding: 40rpx 30rpx 0;
			.title {
				font-weight: 600;
				font-size: 38rpx;
			}
		}
		.comment-wrapper {
			margin-top: 30rpx;
			background-color: #FFFFFF;
			padding: 0 30rpx;
			padding-bottom: calc( 50px + env(safe-area-inset-bottom));
			.comment-title {
				padding: 40rpx 0;
				font-weight: 600;
			}
			.comment {
				margin-bottom: 30rpx;
				.content {
					padding-left: 100rpx;
				}
			}
		}
	}
	
	.footer {
		background-color: #FFFFFF;
		padding: 0 40rpx;
		width: 100%;
		position: fixed;
		z-index: 9999;
		height: 50px;
		bottom: calc( 0px + env(safe-area-inset-bottom));
		box-sizing: border-box;
		.comment-btn {
			// width: 200rpx;
			width: 100%;
			padding: 10rpx 20rpx;
			background-color: #f4f4f4;
			color: #cccccc;
			border-radius: 10rpx;
			.iconfont {
				font-size: 28rpx;
				margin-right: 14rpx;
			}
		}
	}
</style>
