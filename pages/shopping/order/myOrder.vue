<template>
	<view class="order">
		<!-- 头部显示自己的头像和昵称 -->
		<view class="head">
			<image class="head_img" :src="user.headSrc"></image>
			<view class="head_name">{{user.name}}</view>
		</view>
		
		<!-- 自己订单的信息 -->
		<view class="mid">
			<view v-for="(myorder,index) in myorders" :key="index">
				<view class="mid_content">
					<view class="mid-content_img">
						<image mode="aspectFit" style="width: 200rpx;height: 200rpx;border-radius: 5rpx;" 
						:src="myorder.img"></image>
					</view>
					<view class="mid_title">{{myorder.title}}</view>
					<view class="mid_price">
						￥{{myorder.price}}
					</view>
				</view>
				<view v-if="myorder.swith === 0">
					<view class="price">总计：￥{{myorder.totalPrice}}元</view>
					<view class="trading">交易中</view>
					<view class="bottom" @click="confirmReceipt(myorder)">
						确认收货
					</view>
				</view>
				<view v-else>
					<view class="price">总计：￥{{myorder.totalPrice}}元</view>
					<view class="trading">交易成功</view>
					<view class="delete_order" @click="deleteorder(myorder)">
						删除订单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userId:'',
				user:{
					headSrc: '',
					name: ''
				},
				myorders: []
			}
		},
		methods:{
			confirmReceipt(myorder){
				
				myorder.swith = 1
				this.request({
					url: this.$Url+'/order/receiptgoods',
					data: myorder,
					method: "POST"
				}).then(result=>{
					if(result.data){
						this.getmyorder()
					}
				})
				
				
			},
			deleteorder(myorder){
				
				this.request({
					url: this.$Url+'/order/deleteorder',
					data: myorder.id,
					method: "POST"
				}).then(result=>{
					if(result.data){
						this.getmyorder()
					}
				})
			},
			getmyorder(){
				this.request({
					url: this.$Url+'/order/myorder',
					data: this.userId,
					method: "POST"
				}).then(result=>{
					if(result.data.length > 1){
						this.myorder = result.data
					}
				})
			}
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
			this.getmyorder();
		},
		onUnload () {
		    wx.reLaunch({
					url: '../../me/me'
		    })
		}
	}
</script>

<style scoped>
	.order{
		margin: 10rpx;
		padding: 10rpx;
		border-radius: 10rpx;
	}
	.mid{
		display: flex;
		flex-wrap: wrap;
		border: 1rpx solid #CDC9C9;
		padding: 10rpx;
		margin: 10rpx;
		border-radius: 10rpx;
	}
	.head{
		display: flex;
		flex-wrap: wrap;
		height: 80rpx;
		border-bottom: 1rpx solid #ccc;
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
	.mid_content{
		display: flex;
		flex-wrap: nowrap;
		width: 700rpx;
		margin: 20rpx 0;
	}
	.mid-content_img{
		margin: 10rpx;
		width: 200rpx
	
	}
	.mid_title{
		margin: 10rpx;
		width: 350rpx;
		font-size: 30rpx;
	}
	.mid_price{
		margin: 10rpx;
		width: 80rpx;
		font-size: 24rpx;
	}
	.price{
		font-size: 35rpx;
		text-align: right;
		margin-right: 20rpx;
		color: #8B8682;
	}
	.trading{
		font-size: 35rpx;
		color: #FF4500;
	}
	.bottom{
		margin-left: 500rpx;
		width: 180rpx;
		height: 50rpx;
		font-size: 35rpx;
		text-align: center;
		border: 1rpx solid #FF4500;
		border-radius: 20rpx;
		color: #FF4500;
	}
	.delete_order{
		margin-left: 500rpx;
		width: 180rpx;
		height: 50rpx;
		font-size: 35rpx;
		text-align: center;
		border: 1rpx solid #838B8B;
		border-radius: 20rpx;
		color: #838B8B;
	}
</style>
