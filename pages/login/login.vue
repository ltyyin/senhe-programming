<template>
	<view class="login-container">
		<view class="title">
			<text>欢迎登录森和编程</text>
			<text>未注册过的手机号将自动创建账号</text>
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
						@end="countDownEnd" uniqueKey="loginCountDown"
					/>
					<text @tap="getCode" :text="tips" class="countdown"
						:class="{highLight: isSend}"
					>
						{{tips}}
					</text>
				</template>
			</u-input>
		</view>
		
		<view class="agreement">
			<checkbox-group @change="boxChange">
				<label class="radio">
					<checkbox value="1" color="#42b983" style="transform:scale(0.7)"/>
						我已阅读并同意《<text>用户服务协议</text>》
				</label>
			</checkbox-group>
		</view>
		
		<button type="default" hover-class="active" @click="handlerLogin"
			:disabled="isDisabled" :class="{disabled: isDisabled}"
		>
			立即登录
		</button>
		
		<!-- #ifndef H5 -->
		<view class="other-way">
			<view>其他方式登录</view>
			<view class="image">
				<image src="/static/login/weChat.png" mode="aspectFit"
					@click="thirdPartyLogin('weixin')"
				></image>
				<!-- #ifndef MP-WEIXIN -->
				<image src="/static/login/qq.png" mode="aspectFit"
					@click="thirdPartyLogin('qq')"
				></image>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
import { mapActions } from 'vuex'
	
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
			isValidity: false
		}
	},
	watch: {
		isSend(val) {
			if(!val) this.isDisabled = true
		}
	},
	methods: {
		...mapActions('user',['login','getInfo']),
		
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
			
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码',
					mask: true
				})
				setTimeout(() => {
					this.isValidity = true
					
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					// this.$toast('验证码已发送')
					uni.showToast({
						title: '验证码已发送',
						mask: true
					})
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 2000);
			}
		},
		// 协议的状态改变
		boxChange(e) {
			this.isAgree = e.detail.value[0] ? true : false
		},
		// 登录按钮处理函数
		async handlerLogin() {
			if(!this.isAgree) {
				this.$toast('请先阅读并同意《用户服务协议》')
				return
			}
			if(!this.isValidity || this.verifyCode.length !== 6) {
				uni.showModal({
					title: '提示',
					content: '请输入有效验证码',
					showCancel: false,
					confirmColor: '#42b983'
				})
				return
			}
			this.isDisabled = true
			uni.showLoading({
				title: '登录中...',
				mask: true,
				success: async () => {
					await this.login({phoneNum: this.phoneNum, verifyCode: this.verifyCode})
					await this.getInfo()
					uni.hideLoading()
					uni.navigateBack({delta: 1})
					this.$refs.uCode.reset()
				}
			});
			
		},
		// 倒计时结束的回调
		countDownEnd() {
			console.log('end');
			this.isValidity = false
		},
		// #ifndef H5
		thirdPartyLogin(provider) {
			uni.login({
				provider,
				success: function (loginRes) {
					console.log(loginRes);
					// 获取用户信息
					// uni.getUserInfo({
					//   provider,
					//   success: function (infoRes) {
					//     console.log(infoRes);
					//   }
					// });
				}
			});
		}
		// #endif
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
	// 协议
	.agreement {
		color: #999999;
		font-size: 30rpx;
		margin: 50rpx 0;
		text {
			color: $darkGreen;
		}
	}
	// 按钮样式
	button {
		color: #FFFFFF;
		background-color: #42b983;
	}
	.active {
		background-color: #328c62;
	}
	.disabled {
		background-color: #90dab8;
	}
	/* #ifndef H5 */
	// 其他登录方式
	.other-way {
		@include flex-layout($direction: column,$alignItems: center);
		position: absolute;
		bottom: calc(env(safe-area-inset-bottom) + 130rpx);
		left: 0;
		right: 0;
		padding: 0 40rpx;
		view {
			// @include flex-layout($justifyContent: center);
			// display: flex;
			// justify-content: center;
		}
		.image {
			margin-top: 40rpx;
			image {
				/* #ifndef MP-WEIXIN */
				&:first-child {
					margin-right: 60rpx;
				}
				/* #endif */
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
	/* #endif */
}
</style>
