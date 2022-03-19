<template>
	<view class="web-view-container">
		<web-view  :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:null,
			}
		},
		onLoad(option) {
			this.url = option.url
		}
	}
</script>

<style lang="scss">
	.web-view-container {
		
	}
</style>
