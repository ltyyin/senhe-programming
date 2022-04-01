<template>
	<view class="detail-head-container">
		<image class="img" :src="detailInfo.mainImage" mode="aspectFill"></image>
		<view class="shelter-from">
			<view class="shelter-from-info">
				<slot>
					<view class="title">{{detailInfo.title}}</view>
					<uni-rate class="score-star" readonly allow-half :value="detailInfo.goodRate" size="28rpx" />
					<text class="score">{{detailInfo.goodRate}}</text>
					<view class="course-info">
						<text class="play">
							<text class="iconfont icon-24gf-playCircle"></text>
							<text>视频课程</text>
						</text>
						<text>{{detailInfo.sectionCount}}节</text>
						<text class="iconfont icon-dian"></text>
						<text>{{detailInfo.dot}}个小点</text>
						<text class="iconfont icon-dian"></text>
						<text>{{detailInfo.studyTotal}}人参与</text>
					</view>
				</slot>
			</view>
		</view>	
		
		<view class="price-area">
			<view class="price">
				<template v-if="detailInfo.isFree">
					<text class="discount">免费</text>
				</template>
				<template v-else>
					<text class="discount">￥{{detailInfo.priceDiscount}}</text>
					<text class="original">￥{{detailInfo.priceOriginal}}</text>
				</template>
			</view>
			<view class="service">
				<text class="one">
					<text class="iconfont icon-anquanbaozhang"></text>
					<text>课程服务</text>
				</text>
				<text class="two">退款服务，长期回看</text>
				<text class="iconfont icon-gengduo"></text>
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		props: {
			detailInfo: {
				type: Object,				
			}
		},
		data() {
			return {
				height: 0,
			}
		}
	}
</script>

<style lang="scss">
	.detail-head-container {
		background-color: $page-background-color;
		$height: 330rpx;
		.img {
			width: 100%;
			height: $height;
			vertical-align: top;
		}
		.shelter-from {
			position: absolute;
			top: 0;
			width: 100%;
			height:	$height;
			background-color: rgba(0,0,0,0.6);
			
			.shelter-from-info {
				position: absolute;
				padding: 0 40rpx;
				top: 120rpx;
				color: #FFF;
				.title {
					font-weight: 600;
					
				}
				.score-star {
					margin: 20rpx 0;
					display: inline-block;
				}
				.score {
					font-size: 28rpx;
					margin-left: 10rpx;
					color: #ffca3e;
				}
				.course-info {
					font-size: 26rpx;
					.play {
						margin-right: 20rpx;
						.iconfont {
							font-size: 24rpx;
							margin-right: 5rpx;
						}
					}
					.icon-dian {
						font-size: 24rpx;
					}
				}
			}
		}
	
		.price-area {
			background-color: #FFF;
			position: relative;
			top: -10rpx;
			border-radius: 10rpx 10rpx 0 0;
			padding: 30rpx 20rpx 10rpx;
			.price {
				.discount {
					color: #fe6a00;
					font-weight: 600;
				}
				.original {
					margin-left: 20rpx;
					color: #7f7f7f;
					font-size: 26rpx;
					text-decoration: line-through;
				}
			}
			.service{
				font-size: 28rpx;
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				color: #8c8c8c;
				.one {
					margin-right: auto;
					.iconfont {
						color: #fe6a00;
						margin-right: 5rpx;
					}
				}
				.two {
					font-size: 26rpx;
				}
				.icon-gengduo {
					font-size: 36rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
