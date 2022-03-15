<template>
	<view class="home-container">
		<!-- #ifdef MP -->
		<mp-search-input></mp-search-input>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef MP
	import mpSearchInput from './components/mp-search-input.vue'
	// #endif
	
	export default {
		components:{
			// #ifdef MP
			mpSearchInput
			// #endif
		}
	}
</script>

<style>
</style>
