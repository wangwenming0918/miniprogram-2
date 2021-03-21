<template>
	<view>
		<view class="head" v-for="(item, index) in addressinfo" :key='index'>
			<view class="img">
				<image style="width: 100%;height: 100%;border-radius: 50rpx;" src="../../../static/images/map.png"></image>
			</view>
			<!-- 地址信息的显示 -->
			<view class="content">
				<view class="text" style="margin-right: 20rpx;">{{item.name}}</view>
				<view class="text">{{item.phone}}</view>
				<view class="text">{{item.address}}</view>
			</view>
			<view style="width: 100rpx;">
				<navigator style="padding-top: 30rpx;" 
				:url="'updateAddress/updateAddress?item='+JSON.stringify(item)">编辑</navigator>
			</view>
		</view>
		<button type="primary" @click="address">添加地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressinfo:[],
				userId: ''
			}
		},
		methods: {
			address(){
				uni.navigateTo({
					url: 'updateAddress/updateAddress'
				})
			},
			getaddress(){
				this.request({
					url: this.$Url+'/address/myaddress',
					data: this.userId,
					method: "POST"
				}).then(result=>{
					if(result.data.length > 1){
						this.addressinfo = result.data
					}else{
						uni.showToast({title:"获取数据失败", icon:"none"});
					}
				})
			}
		},
		onLoad() {
			uni.getStorage({
			    key: 'userData',
			    success: (res) => {
					this.userId =res.data.id
			    }
			});
			this.getaddress()
		},
		created(){
			
		},
		// onBackPress(e) {
		// 		uni.switchTab({
		// 			url: '../me'
		// 		});
		// 		return true;
		// },
		onUnload () {
		    wx.reLaunch({
		      url: '../me'
		    })
		}
	}
</script>

<style scoped>
	.head{
		display: flex;
		margin: 10rpx;
	}
	.content{
		display: flex;
		flex-wrap: wrap;
	}
	.img{
		width: 120rpx;
		height: 100rpx;
		
		margin: 10rpx;
	}
	.text{
		font-size: 35rpx;
		color: #CDC9C9;
	}
</style>
