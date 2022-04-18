<template>
	<view class="info-container">
		<view class="card">
			<cell title="头像" @click.native="handlerAvatar">
				<template v-slot:right>
					<image
						style="width: 80rpx; height: 80rpx; border-radius: 50%;"
						:src="avatar" mode="aspectFit"
					></image>
				</template>
			</cell>
			<cell title="用户名" @click.native="handlerUserName">
				<view slot="right">{{name}}</view>
			</cell>
			<cell title="手机号" @click.native="handlerBindPhone">
				<view slot="right">{{phone ? phone : '绑定'}}</view>
			</cell>
		</view>
		
		<view class="card">
			<cell title="性别" @click.native="showPicker = true">
				<!-- 0 未知， 1 男性， 2 女性 -->
				<view slot="right">{{genderCom}}</view>
			</cell>
			<cell title="生日" @click.native="handlerBirthday">
				<view slot="right">{{birthday | customFormatTime('YYYY-MM-DD')}}</view>
			</cell>
		</view>
		
		<button type="default" hover-class="btn-active"
			@click="handlerLogout"
		>退出登录</button>
		
		<!-- 修改昵称的弹出框 -->
		<u-popup :show="showPopup" mode="bottom"  @close="close" @open="open"
			:overlay="false"
		>
			<view :style="{height: `${windowHeight}px`}">
				<view class="navbar f-sb-c">
					<view @click="cancelEdit">取消</view>
					<view @click="confirmEdit">确认</view>
				</view>
				<view class="textarea">
					<u--textarea v-model="newName" placeholder="请输入内容" count
						maxlength='10' height='150'
					></u--textarea>
				</view>
			</view>
		</u-popup>
		<!-- 修改性别的弹出框 -->
		<u-picker :show="showPicker" :columns="columns"	@cancel="showPicker=false"
			@confirm="confirmGander" confirmColor="#42b983"
			:defaultIndex="[gender]"
		></u-picker>
		
		<!-- 修改时间 -->
		<u-datetime-picker
			:show="showDateTime"
			v-model="newBirthday"
			mode="date"
			closeOnClickOverlay
			@confirm="confirmDateTime"
			@cancel="showDateTime = false"
			confirmColor="#42b983"
		></u-datetime-picker>
	</view>
</template>

<script>
import cell from '@/components/cell.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
	components: {
		cell
	},
	computed: {
		...mapState('user',[ 'name','avatar', 'phone', 'gender', 'birthday']),
		genderCom() {
			switch(this.gender){
				case 0:
					return '保密'
					break;
				case 1:
					return '男'
					break;
				case 2:
					return '女'
					break;
			}
		}
	},
	data() {
		return {
			showPopup: false,
			showPicker: false,
			showDateTime: false,
			windowHeight: null,
			newName: '',
			columns: [['保密','男', '女']],
			newBirthday: Number(new Date()),
		}
	},
	onLoad() {
		const system = uni.getSystemInfoSync()
		// #ifndef MP
		this.windowHeight = system.screenHeight
		// #endif
		// #ifdef MP
		this.windowHeight = system.safeArea.height - system.safeArea.top
		// #endif
	},
	methods: {
		...mapMutations('user',{
			setAvatar: 'SET_AVATAR',
			setName: 'SET_NAME',
			setGender: 'SET_GENDER',
			setBirthday: 'SET_BIRTHDAY'
		}),
		...mapActions('user', ['logout']),
		close() {
			console.log('关闭')
			this.showPopup = false
		},
		open() {
			console.log('打开')
		},
		cancelEdit() {
			this.showPopup = false
		},
		confirmEdit() {
			// this.showModel = true
			console.log(this.newName);
			if(this.newName === this.name) {
				uni.showToast({
					title: '昵称不能重复',
					icon: 'none'
				})
				return
			}
			uni.showLoading({
				title: '提交中...'
			})
			setTimeout(()=> {
				this.setName(this.newName)
				uni.hideLoading()
				this.showPopup = false
			},2000)
		},
		confirmGander(e) {
			this.setGender(e.indexs[0])
			this.showPicker = false
		},
		confirmDateTime(e) {
			this.setBirthday(e.value)
			this.showDateTime = false
		},
		handlerAvatar() {
			uni.chooseImage({
				count: 1,
				// sizeType: ['original', 'compressed'],
				// sourceType: ['album'], //从相册选择
				success: (res)=> {
					this.setAvatar(res.tempFilePaths[0])
				}
			});
		},
		handlerUserName() {
			this.showPopup = true
			this.newName = this.name
		},
		handlerBindPhone() {
			uni.navigateTo({
				url: `/pages/login/bind-phone?phone=${this.phone}`	
			})
		},
		handlerBirthday() {
			this.showDateTime = true
		},
		handlerLogout() {
			uni.showModal({
				title: '提示',
				content: '确定要进行退出吗',
				confirmColor: '#42b983',
				success: (res)=> {
					if(res.confirm) {
						uni.navigateBack()
						this.logout()
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
page {
	background-color: $pageBackgroundColor;
}
uni-modal {
	z-index: 19999;
}
</style>
<style lang="scss" scoped>
.info-container {
	.card {
		margin-top: 20rpx;
	}
	button {
		margin-top: 40rpx;
		background-color: #FFFFFF;
		&:active {
			border: initial;
		}
	}
	.btn-active {
		background-color: #f8f8f8;
	}
	
	.navbar {
		padding: 0 30rpx;
		height: 80rpx;
		view:last-child {
			color: $darkGreen;
		}
	}
	
	.textarea {
		padding: 10rpx 30rpx;
	}
}
</style>