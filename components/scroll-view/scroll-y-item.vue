<template>
	<view class="scroll-y-item-container" @click="navTo">
		<view class="left-content">
			<image class="img" :src="courseInfo.coverImage" mode="heightFix"></image>
			<view class="play-count">
				<text class="iconfont icon-bofang"></text>
				<text>{{courseInfo.studyTotalFloat}}K</text>
			</view>
		</view>
		
		<view class="right-content">
			<view class="title">
				{{courseInfo.info.title}}
			</view>
			
	
			<view class="info">
				<view class="price">
					<template v-if="courseInfo.isFree">
						<text class="current">免费</text>
					</template>
					<template v-else>
						<text class="current">￥{{courseInfo.priceDiscount}}</text>
						<text class="original">{{courseInfo.priceOriginal}}</text>
					</template>					
				</view>
				<view class="author">
					<text class="iconfont icon-My"></text>
					<text class="name">{{courseInfo.nickName}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			courseInfo: {
				type: Object,
				required: true
			}
		},
		methods: {
			navTo() {
				uni.navigateTo({
					url: `/pages/course/details`,
					success: (res)=> {
					  res.eventChannel.emit('params', {
							id: this.courseInfo.id,
							isFree: this.courseInfo.isFree
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin hiddenWord() {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.scroll-y-item-container {		
		display: flex;
		background-color: #FFFFFF;
		white-space: normal;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		
		.left-content {
			$width: 250rpx;
			$height: 140rpx;
			
			width: $width;
			height: $height;
			margin-right: 20rpx;
			position: relative;
			
			.img {
				width: $width;
				height: $height;
				border-radius: 10rpx;
			}
			
			.play-count {
				position: absolute;
				bottom: 5rpx;
				right: 5rpx;
				background-color: $tag-background-color;
				border-radius: 20rpx;
				padding: 0 10rpx;
				color: $tag-color;
				font-size: 24rpx;
				transform: scale(0.9);
				width: 80rpx;
				text-align: center;
				@include hiddenWord;
				
				.iconfont {
					font-size: 24rpx;
					margin-right: 5rpx;
				}
			}
		}
		
		.right-content {
			$rightWidth:  380rpx;
			min-width: $rightWidth;
			.title {
				font-weight: 600;
				font-size: 30rpx;
				min-height: 80rpx;
				@include text-ellipsis(2)
			}
			
			.info {	
				@include flex-layout($alignItems: center);
				margin-top: 10rpx;
				width: 100%;
				.price {
					flex: 1;
					min-width: 270rpx;
					.current {
						font-size: 30rpx;
						font-weight: 600;
						color: #fe6a00;
						margin-right: 10rpx;
					}					
					.original {
						font-size: 26rpx;
						text-decoration: line-through;
						color: #afafaf;
					}
				}
				
				.author {
					@include hiddenWord;
					flex: 1;
					font-size: 25rpx;
					color: #b6b6b6;
					width: 160rpx;
				}				
			}		
		}		
	}
</style>