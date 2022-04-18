<template>
	<view class="course-info-container" v-if="detailInfo.id">
		<view class="author-info">
			<view class="avatar">
				<image class="img" lazy-load :src="detailInfo.userImage" mode="aspectFit"></image>
			</view>
			<view class="text">
				<view class="nick-name">{{detailInfo.nickName}}</view>
				<view class="summary">{{detailInfo.userSummary}}</view>
			</view>
		</view>
		 
		<view class="details-text">
			<!-- <rich-text :nodes="content" :selectable="false"></rich-text> -->
			<u-parse :tagStyle="style" :content="detailInfo.detailContent"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			detailInfo: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				content: `
				<div class="courseinfo-intro content-intro"><h3><span style="font-family: inherit; font-size: 20px;">小编有话说</span><br></h3><p>本课程是学习WEB开发的第一站，html+css一起学习，更容易理解和掌握，讲师风趣幽默的教学风格，你一定会喜欢上这门课程。</p><p>学习本门课程的同时，建议大家结合W3Cschool的html和css的手册和微课，学习效果更佳。</p><h2>html和css简介</h2><p>html、css和JavaScript是前端工程师的三驾马车，也是最基础的部分。html5和css3是最主流的版本。</p><p>前端工作就如同“神笔”马良在画一只乌龟，首先需要使用html将大体结构画出来，再使用css勾勒出整个网页的排版和色彩，最后通过JavaScript让网页动起来。</p><p style="text-align: center; "><img src="https://www.w3cschool.cn/attachments/image/20181208/1544257669332994.jpg" alt="6767" class=""></p><p><span style="font-family: inherit; font-size: 16px; font-weight: 600;">为什么学习html和css？</span><br></p><p>1. html和css是前端工程师最基础的知识，不掌握它们，将无法胜任前端工作；</p><p>2. html和css简单易学，甚至不出1天的时间，你就可以掌握它们的基础知识；</p><p>&nbsp;<span style="font-family: inherit; font-size: 16px; font-weight: 600;">课程特点</span></p><p>1. 讲师讲课风格幽默，整个学习过程轻松有趣，不枯燥、不乏味；</p><p>2. 以就业为导向，与实战相结合，满足大部分学员的学习需求；</p><p>&nbsp;<span style="font-family: inherit; font-size: 16px; font-weight: 600;">学习建议</span></p><p>1. 学完每一节课程，动手将代码打一遍；</p><p>2. 多多举一反三，学完每节课程，思考一下它的应用场景；</p><p>3. 完成本门课程，试着自己做一个简易版的W3Cschool官网首页；</p><h2>适宜人群</h2><p>1.零基础学员；</p><p>2.前端爱好者；</p><h2>购买须知</h2><p>1.&nbsp;本课程为视频课程，共28节。</p><p>2. 在课程学习中，如有任何使用上的问题，请联系客服微信号：<b>bcshi666</b></p><p>（加微信可进相关交流群，与更多小伙伴讨论问题）。</p><p><br></p></div>
				`,
				style: {
					img: 'width: 100%;',
					h1: 'padding:25rpx 0;',
					h3: 'padding:20rpx 0;',
					h3: 'padding:15rpx 0;',
					p: 'padding:10rpx 0; font-size: 30rpx;',
				}
			}
		}
	}
</script>

<style lang="scss">
	.course-info-container {
		padding: 20rpx 30rpx;
		// height: 500px;
		.author-info {
			@include flex-layout($alignItems: center);
			font-size: 28rpx;
			padding: 15rpx 0;
			border-bottom: 1rpx solid #efefef;
			
			.avatar {
				.img {
					$size: 80rpx;
					width: $size;
					height: $size;
					border-radius: 50%;
					margin-right: 30rpx;
				}
			}
			
			.text {
				.summary {
					@include text-overflow;
					font-size: 26rpx;
					color: #8a8a8a;
				}
			}
		}
		.details-text {
			// @include text-ellipsis(2);
			img {
				width: 100%;
			}
		}
	}
</style>
