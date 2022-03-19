const msg = function(options) {
	uni.showToast({
		title: options.title || 'title',
		icon: options.icon || 'none',
		mask: options.mask || false
	})
}

export { msg }