<template>
	<view>
		<!-- 显示自己的头像和昵称 -->
		<view class="head">
			<image class="head_img" :src="user.headSrc"></image>
			<view class="head_name">{{user.name}}</view>
		</view>
		<!-- 自己发表的信息 -->
		<view style="margin: 10rpx;">
			<view v-for="(mypublish,index) in mypublishs" :key="index">
				<navigator class="publish" :url="'../communityInfo?id='+mypublish.id">
					<view class="publis_content">
					<view class="pulish_img">
						<image mode="aspectFit" style="width: 100%;height: 100%;" :src="mypublish.img"></image>
					</view>
					<view class="publish_title">
						{{mypublish.title}}
					</view>
					</view>
					<view class="publish_time">发表时间：{{mypublish.time | dateStr('YYYY年MM月DD日')}}</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userId: '',
				imagesList: [],
				user:{
					headSrc: '',
					name: ''
				},
				mypublishs:[]
			}
		},
		onUnload () {
		    wx.reLaunch({
		      url: '../me'
		    })
		},
		onLoad() {
			uni.getStorage({
			    key: 'wxUserInfo',
			    success: (res) => {
					this.user.name =res.data.nickName
					this.user.headSrc = res.data.avatarUrl
			    }
			});
			uni.getStorage({
			    key: 'userData',
			    success: (res) => {
					this.userId =res.data.id
			    }
			});
			this.getmypublish()
		},
		methods:{
			getmypublish(){
				this.request({
					url: this.$Url+'/publish/mypublish',
					data: this.userId,
					method: "POST"
				}).then(result=>{
					if(result.data.length > 1){
						this.mypublishs = result.data
					}
				})
			}
		}
	}
</script>

<style scoped>
	
	.head{
		display: flex;
		flex-wrap: wrap;
		height: 80rpx;
		border-bottom: 1rpx solid #ccc;
		margin: 20rpx 10rpx;
	}
	.head_img{
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		margin: 5rpx;
	}
	.head_name{
		margin: 5rpx;
		font-size: 40rpx;
	}
	.publish{
		border: 1rpx solid #CDC5BF;
		padding: 10rpx;
		border-radius: 10rpx;
	}
	.publis_content{
		display: flex;
	}
	.pulish_img{
		width: 300rpx;
		height: 300rpx;
	}
	.publish_title{
		flex-wrap: wrap;
		font-size: 50rpx;
		width: 350rpx;
	}
	.publish_time{
		text-align: right;
		font-size: 30rpx;
		color: #CDC9C9;
	}
</style>
