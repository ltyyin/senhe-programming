const TokenKey = "senhe_token";
const RefreshToken = "senhe_refresh_token";

export function getToken() {
  return uni.getStorageSync(TokenKey)
}

export function getRefreshToken() {
  return uni.getStorageSync(RefreshToken)
}

export function setToken(token, refreshToken) {
	uni.setStorageSync(TokenKey, token)
	uni.setStorageSync(RefreshToken, refreshToken)
	return 'OK'
}

export function setRefreshToken(token) {
  return uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
  return uni.removeStorageSync(TokenKey)
}

export function logoutRemoveToken() {
	uni.removeStorageSync(TokenKey)
	uni.removeStorageSync(RefreshToken)
	return 'OK'
}