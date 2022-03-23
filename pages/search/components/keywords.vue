<template>
	<view class="key-words-container">
		<view class="title">热门搜索</view>
		<view class="tag-list">
			<view class="tag-item" v-for="(tag,index) of hotList" :key="index" @click="clickTagHandler(tag.title)" >{{tag.title}}</view>
		</view>
		
		<view class="record-title title">
			<text class="search-text">搜索记录</text>
			<text class="clear" @click="$emit('clearHistoryList')">清除</text>
		</view>
		<view class="tag-list">
			<view  class="tag-item" v-for="(tag,index) of historyList" :key="index"  @click="clickTagHandler(tag)">{{tag}}</view>
		</view>
	</view>
</template>

<script>
	import apiSearch from '@/api/search.js'
	
	export default {
		name: 'keyWords',
		props: {
			historyList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				hotList: []
			}
		},
		async created() {
			const { data } = await apiSearch.getHotSearchList()
			this.hotList = data
		},
		
		methods: {
			clickTagHandler(tag) {
				// #ifdef APP-PLUS
				const currentWebView = this.$mp.page.$getAppWebview()
				console.log(currentWebView);
				currentWebView.setTitleNViewSearchInputText(tag)
				// #endif
				
				this.$emit('doSearch',{value:tag})
			}	
		}
	}
</script>

<style lang="scss">
	.key-words-container {
		margin-top: 15rpx;
		background-color: #FFF;
		padding: 20rpx 36rpx 0;
		// height: 100%;
		
		.title {
			color: #2b2b2b;
		}
		
		.tag-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 10rpx;
			
			.tag-item {
				padding: 8rpx 20rpx;
				background-color: #f4f5f7;
				border-radius: 10rpx;
				color: #767779;
				font-size: 28rpx;
				margin: 10rpx 15rpx;
			}
		}
		
		.record-title {
			margin-top: 50rpx;
			display: flex;
			align-items: center;
			
			.search-text {
				margin-right: auto;
			}
			
			.clear {
				color: #5c5c5c;
				font-size: 30rpx;
			}
		}
		
	}
</style>
