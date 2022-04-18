<template>
	<view class="feedback-container">
			<radio-group @change="radioChange" class="f-c-c">
				<label v-for="(item, index) in items" :key="item.value">
					<view class="radio">
						<radio color="#42b983" :value="item.value" 
							:checked="index === current" style="transform: scale(0.7);"
						/>
						<text>{{item.name}}</text>
					</view>
				</label>
			</radio-group>
			
			<textarea class="textarea" 
				placeholder="写下您的想法..."
				placeholder-style="font-size:28rpx;"
			/>
			
			<button type="default"
				hover-class="active"
				@click="commitComment"
				:disabled="isDisabled"
			>
				提交
			</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			rate: 5,
			content: '',
			isDisabled: false,
			current: 0,
			items: [{ value: '0', name:'内容意见' }, { value:'1', name:'产品建议'}]
		}
	},
	methods: {
		radioChange(e){
			this.current = e.detail.value
		},
		commitComment() {
			if(this.content) {
				uni.showToast({
					title: '内容不能为空'
				})
				return
			}
			
			this.isDisabled = true			
			uni.showModal({
				title: '提示',
				content: `确定提交当前的${this.items[this.current].name}吗?`,
				confirmColor: '#42b983',
				success: (res)=> {
					if(res.confirm) {
						uni.showLoading({
							title: '提交中...'
						})
						setTimeout(() => {
							uni.hideLoading()
							uni.navigateBack()
						},2000)
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.feedback-container {
		padding: 10rpx 40rpx;
		
		.radio:first-child {
			margin-right: 50rpx;
		}
		
		.textarea {
			box-sizing: border-box;
			border: 2rpx solid #D8D8D8;
			width: 100%;
			border-radius: 10rpx;
			padding: 20rpx;
			margin-top: 40rpx;
		}
		
		button {
			margin-top: 60rpx;
			color: #FFFFFF;
			background-color: #42b983;
		}
		.active {
			background-color: #328c62;
		}
		
		
	}
</style>
