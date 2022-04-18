<template>
	<view class="login-container">
		<view class="title">
			<text>手机绑定认证</text>
			<text>首次登录需要绑定手机认证</text>
		</view>
		
		<view class="input-frame">
			<u-input
				type="number" placeholder="请输入手机号" border="bottom" clearable
				:value="phoneNum" @change="handlerPhoneNum" maxlength="11"
			/>
			<u-input
				type="number" placeholder="请输入手机号" border="bottom"
				:value="verifyCode" @change="handlerVerifyCode" maxlength="6"
			>
				<template slot="suffix">
					<u-code	ref="uCode" @change="codeChange" 
						seconds="60" keep-running start-text="获取验证码" keepRunning 
						@end="countDownEnd" uniqueKey="bindPhoneCountDown"
					/>
					<text @tap="getCode" :text="tips" class="countdown"
						:class="{highLight: isSend}"
					>
						{{tips}}
					</text>
				</template>
			</u-input>
		</view>
		
		<button type="default" hover-class="active" @click="commitBind"
			:disabled="isDisabled" :class="{disabled: isDisabled}"
		>
			提交绑定
		</button>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				phoneNum: '',
				verifyCode: '',
				tips: '',
				isAgree: false,
				isDisabled: true,
				isSend: false,
				pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
				isValidity: false,
				oldPhone: ''
			}
		},
		watch: {
			isSend(val) {
				if(!val) this.isDisabled = true
			}
		},
		
		onLoad(option) {
			if(option.phone) this.oldPhone = option.phone
		},
		
		methods: {
			...mapMutations('user',{
				setPhone: 'SET_PHONE'
			}),
			
			// 手机号
			handlerPhoneNum(num) {
				this.phoneNum = num
				if(num.length === 11) {
					this.isSend = true
					if(this.verifyCode.length > 0) {
						this.isDisabled = false
					}
				}else {
					this.isSend = false
				}
			},
			// 验证码
			handlerVerifyCode(num) {
				if(num.length > 0 && this.phoneNum.length === 11) this.isDisabled = false
				if(num.length === 0) this.isDisabled = true
				this.verifyCode = num
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(!this.isSend) return
				
				if(!this.pattern.test(this.phoneNum)) {
					this.$toast('请输入正确手机号')
					return
				}
				
				if(this.phoneNum === this.oldPhone) {
					this.$toast('手机号码不能重复')
					return
				}
				
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						this.isValidity = true
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						// this.$toast('验证码已发送')
						uni.showToast({
							title: '验证码已发送'
						})
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				}
			},
			// 登录按钮处理函数
			commitBind() {
				if(!this.isValidity) {
					uni.showModal({
						title: '提示',
						content: '请输入有效验证码',
						showCancel: false,
						confirmColor: '#42b983'
					})
					return
				}
				
				uni.showLoading({
					title: '提交中...',
					mask: true,
				})
				this.setPhone(this.phoneNum)
				
				setTimeout(()=> {
					uni.hideLoading()
					uni.navigateBack()
				},2000)
			},
			// 倒计时结束的回调
			countDownEnd() {
				this.isValidity = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.login-container {
	padding: 60rpx 40rpx 0;
	.title {
		@include flex-layout($direction: column,$justifyContent: space-between);
		height: 110rpx;
		text:first-child {
			font-size: 42rpx;
			font-weight: 600;
		}
		text:last-child {
			font-size: 24rpx;
			color: #999999;
		}
	}
	
	.input-frame {
		margin-top: 40rpx;
		/deep/ .u-input {
			padding: 35rpx 18rpx 14rpx!important;
		}
		.countdown {
			color: #999999;
		}
		.highLight {
			color: $darkGreen;
		}
	}
	// 按钮样式
	button {
		margin-top: 50rpx;
		color: #FFFFFF;
		background-color: #42b983;
	}
	.active {
		background-color: #328c62;
	}
	.disabled {
		background-color: #90dab8;
	}
}
</style>
