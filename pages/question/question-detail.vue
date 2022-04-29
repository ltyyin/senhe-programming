<template>
	<view class="question-detail-container">
		<view class="question-wrapper">
			<view class="title">{{question.title}}</view>
			<user-info :userImage="question.userImage">
				<view class="user-info" slot="middle">
					<view>{{question.nickName}}</view>
					<view>{{question.isFollow | relativeTime}} · 阅读 {{question.pageViews}}w</view>
				</view>
				<template v-slot:right>
					<button type="default" size="mini" style="transform: scale(0.8);"
						@click="handlerFollow"
					>
						{{question.isFollow ? '关注' : '已关注'}}
					</button>
				</template>
			</user-info>
			
			<view class="markdown-body">
				<u-parse :content="question.content" :selectable="true" :tagStyle="style"></u-parse>
			</view>
		</view>
		
		<!-- 评论回复的列表 -->
		<view class="comment-wrapper">
			<view class="comment-title">热门回复</view>
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
				<text>回复</text>
			</view>
		</view>
		</veiw>
	</view>
</template>

<script>
	import { getQuestionDetail, getQuestionCommentById } from '@/api/question.js'
	import userInfo from '@/pages/read/components/user-info.vue'
	import { mapState } from 'vuex'
	
	export default {
		components: {
			userInfo
		},
		computed: {
			...mapState('user',['authStatus'])
		},
		data() {
			return {
				questionId: null,
				question: {},
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
			const id = option.id
			this.questionId = id
			this.getQuestionDetail(id)
			this.getQuestionCommentById(id)
		},
		methods: {
			handlerFollow() {
				if(!this.authStatus) return this.$loginTip()
			
				if(this.question.isFollow === 0) {
					this.question.isFollow = 1
					return
				}
				this.question.isFollow = 0
			},
			handlerComment() {
				if(!this.authStatus) return this.$loginTip()
				
				uni.navigateTo({
					url: `/pages/inpute/inpute?${this.questionId}`
				})
			},
			async getQuestionDetail(id) {
				const { data } = await getQuestionDetail(id)
				this.question = data
			},
			async getQuestionCommentById(id) {
				const { data } = await getQuestionCommentById(id) 
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
	
	.question-detail-container {
		background-color: $pageBackgroundColor;
		.question-wrapper {
			background-color: #FFFFFF;
			padding: 40rpx 30rpx;
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
		z-index: 20;
		bottom: 0;
		height: calc(50px + env(safe-area-inset-bottom));
		padding-bottom: env(safe-area-inset-bottom);
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
