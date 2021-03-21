<template>
	<view class="cont">
		<!-- <navigator class="hospital" url="hospital/hospital">附近宠物医院</navigator>
		<navigator class="memorandum" url="memorandum/memorandum">备忘录</navigator>
		<navigator class="varieties" url="varieties/varieties">品种查询</navigator> -->
		<button class="button hospital" @click="hospital">附近宠物医院</button>
		<button class="button memorandum" @click="memorandum">备忘录</button>
		<button class="button varieties" @click="varieties">品种查询</button>
	</view>
</template>

<script>
	import Map from '../../components/ms-openMap/openMap.js'
	export default {
		data() {
			return {
				latitude: 24.880014,
				longitude: 102.83297
			}
		},
		methods: {
			hospital(){
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log(res)
						this.latitude = res.latitude,
						this.longitude = res.longitude
					},
				})
				// uni.navigateTo({url:"hospital/hospital"})
				Map.openMap(this.latitude, this.longitude, '宠物店', 'gcj02')
			},
			memorandum(){
				uni.navigateTo({url:"memorandum/memorandum"})
			},
			varieties(){
				uni.navigateTo({url:"varieties/varieties"})
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped>
	.cont{
		margin: 30rpx 15rpx;
		background-color: #F0FFFF;
		
	}
	.button{
		margin-bottom: 30rpx;
		border-radius: 20rpx;
		font-size: 50rpx;
		color: #FFFAFA;
		border: 2rpx solid #fff;
	}
	.hospital{
		background-color: #FF0000;
	}
	.memorandum{
		background-color: #00FF00;
	}
	
	.varieties{
		background-color: #0000FF;
	}
</style>
