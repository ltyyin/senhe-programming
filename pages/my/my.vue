<template>
	<view class="my-container">
		<!-- <button type="default" @click="myOrder">我的订单</button> -->
		<user-show @click.native="handlerLogin"></user-show>
		
		<view class="card">
			<cell icon="icon-dingdan" title="我的订单"
				@click.native="handlerCell('/pages/order/my-order', true)"/>
			<cell icon="icon-bianjiwenzhang_huaban" title="发布文章"
				@click.native="handlerCell('/pages/inpute/editable', true)"/>
			<!-- #ifdef APP-PLUS -->
			<cell v-if="isIos" icon="icon-qianbao" title="我的钱包"
				@click.native="handlerCell('/pages/order/recharge', true)"/>
			<!-- #endif -->
			<cell icon="icon-_kecheng" title="我的课程"
				@click.native="handlerCell('/pages/my-course/my-course', true)"/>
		</view>
		
		<view class="card">
			<cell icon="icon-yijianfankui" title="意见反馈"
				@click.native="handlerCell('/pages/feedback/feedback', true)"/>
			<cell icon="icon-guanyu_o" title="关于我们"
				@click.native="handlerCell('/pages/about/about')"/>
		</view>
		
		<view class="card">
			<cell icon="icon-shezhi" title="设置" border 
				@click.native="handlerCell('/pages/setting/setting')"/>
		</view>
	</view>
</template>

<script>
import request from '@/common/utils/request.js'
import { msg } from '@/common/utils/tip.js'
import userShow from './components/user-show.vue'
import cell from '@/components/cell.vue'
import { mapState } from 'vuex'
export default {
	components: {
		userShow,
		cell
	},
	data(){
		return {
			name: 'lisa',
			isIos: false,
		}
	},
	computed: mapState('user',['authStatus', 'token']),
	onLoad() {
		if(uni.getSystemInfoSync().platform === 'ios') this.isIos = true 
	},
	onNavigationBarButtonTap(event) {
		if(event.index === 0) {
			uni.scanCode({
				success:(res) => {
					msg({title: '请求成功！'})
				},
				fail:() => {
					msg({title: '扫码失败！'})
				}
			})
		}
	},
	methods: {
		myOrder() {
			uni.navigateTo({
				url: '/pages/order/my-order'
			})
		},
		handlerCell(url, check = false) {
			if(check && !this.authStatus) {
				uni.showModal({
					title: '提示',
					content: '请先登录后再进行操作',
					confirmColor: '#42b983',
					success(res) {
						if(res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					}
				})
				return
			}
			uni.navigateTo({
				url,
			})
		},
		navToLogin() {
			uni.navigateTo({
				// #ifdef MP
				url: '/pages/login/wx-login'
				// #endif
				// #ifndef MP
				url: '/pages/login/login'
				// #endif
			})
		},
		handlerLogin() {
			if(this.authStatus) {
				uni.navigateTo({
					url: '/pages/my/info'
				})
				return
			}
			/* 登录过的，但是已经登录过期了的，提醒他重新登录 */
			if(this.token && !this.authStatus) {
				uni.showModal({
					title: '提示',
					content: '登录已过期，请重新登录',
					confirmColor: '#42b983',
					success: (res)=> {
						if(res.confirm) {
							this.navToLogin()
						}
					}
				})
				return
			}
			/* 没有登录过的则直接进行登录 */
			this.navToLogin()
		}
	}
}
</script>

<style lang="scss">
page {
	background-color: $pageBackgroundColor;
}

.my-container {
	padding-top: 20rpx;
	// overflow: auto;
	
	.card {
		margin-top: 20rpx;
	}
}
</style>
