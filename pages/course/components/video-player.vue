<template>
	<view>
		<video ref="videoPlayer" class="video-js"></video>
	</view>
</template>

<script>
	import videojs from 'video.js';

	export default {
		name: "videoPlayer",
		props: {
			options: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data() {
			return {
				player: null
			}
		},
		mounted() {
			console.log(videojs);
			this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
				console.log('onPlayerReady', this);
			})
		},
		beforeDestroy() {
			if (this.player) {
				this.player.dispose()
			}
		}
	}
</script>
