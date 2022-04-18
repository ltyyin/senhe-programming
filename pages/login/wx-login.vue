<template>
	<view class="wx-login-container">
		<view class="logo f-col-c-c" >
			<image src="/static/logo/logo.png" mode="aspectFill"></image>
			<text>一切皆有可能</text>
		</view>
		
		<view>
			<button type="default" hover-class="active" 
				@click="handlerLogin" 
			>
				<uni-icons custom-prefix="iconfont" color="#FFF"
					type="icon-zhengpinbaozhangduigou" size="32rpx">
				</uni-icons>
				<text style="margin-left: 10rpx;">微信用户一键登录</text>
			</button>
		</view>
		
		<view class="agreement f-c-c">
			<checkbox-group @change="boxChange">
				<label class="checkbox f-c-c">
					<checkbox value="1" color="#42b983" style="transform:scale(0.7)"/>
						我已阅读并同意《<text>用户服务协议</text>》
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex'
import { setUserInfo, getUserInfo } from '@/common/utils/user.js'
import { mapActions } from 'vuex'

export default { 
	data() {
		return {
			isAgree: false
		}
	},
	methods: {
		...mapMutations('user',{
			setName: 'SET_NAME',
			setAvatar: 'SET_AVATAR',
			setGander: 'SET_GENDER'
		}),
		...mapActions('user',['login','getInfo']),
		
		boxChange(e) {
			this.isAgree = e.detail.value[0] ? true : false
		},
		
		getUserInfo() {
			uni.login({
			  provider: 'weixin',
			  success: async ({code})=> {
					await this.login({code})
					const res = await this.getInfo()
					console.log(res);
					// 判断是否已近绑定手机号
					if(!res.phone) {
						uni.redirectTo({
							url: '/pages/login/bind-phone'
						})
					}else {
						uni.navigateBack()
					}
			  }
			});
		},
		
		handlerLogin() {
			if(!this.isAgree) {
				this.$toast('请先阅读并同意《用户服务协议》')
				return
			}
			uni.getUserProfile({
				desc: '获取用户头像',
				success: (res)=> {
					let userInfo = res.userInfo
					setUserInfo({
						name: userInfo.nickName,
						gender: userInfo.gender,
						avatar: userInfo.avatarUrl
					})
					this.setName(userInfo.nickName)
					this.setAvatar(userInfo.avatarUrl)
					this.setGander(userInfo.gender)
					this.getUserInfo()
				},
				fail(err) {
					console.log(err);
				}
			})
		},
		getuserinfo(e) {
			console.log(e);
		}
	}
}
</script>

<style lang="scss" scoped>
.wx-login-container {
	padding: 0 40rpx;
	.logo {
		padding: 120rpx 0;
		image {
			width: 200rpx;
			height: 200rpx;
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
	// 协议
	.agreement {
		color: #999999;
		font-size: 30rpx;
		margin: 50rpx 0;
		text {
			color: $darkGreen;
		}
	}
}
</style>
