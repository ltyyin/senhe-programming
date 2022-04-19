<template>
	<view class="inpute-container">
		<u--textarea v-model.trim="content" placeholder="请输入内容..." count 
			maxlength="100" height="200"
		>
		</u--textarea>
		
		<button type="default"
			hover-class="active"
			@click="commitComment"
			:disabled="isDisabled"
		>提交</button>
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
		commitComment() {
			if(!this.content) {
				this.$toast('内容不能为空')
				return
			}
			
			this.isDisabled = true			
			uni.showModal({
				title: '提示',
				content: `确定当前提交的内容吗?`,
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
	.inpute-container {
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
