const KEY = 'userInfo'

export function setUserInfo(userInfo) {
  return uni.setStorageSync(KEY, userInfo)
}

export function getUserInfo() {
  return uni.getStorageSync(KEY)
}