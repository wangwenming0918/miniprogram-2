<template>
	<view>
		<!-- 收货地址模块 -->
		<view class="head">
			<view class="img">
				<image style="width: 100%;height: 100%;border-radius: 50rpx;" src="../../../static/images/map.png"></image>
			</view>
			
			<view class="content">
				<view class="text" style="margin-right: 20rpx;">{{address.name}}</view>
				<view class="text">{{address.phone}}</view>
				<view class="text">{{address.adress}}</view>
			</view>
		</view>
		
		<!-- 商品模块 -->
		<view class="mid">
			<view class="mid_head">
				<image class="mid_head_img" :src="shoppingInfo.headSrc"></image>
				<view class="mid_head_name">{{shoppingInfo.name}}</view>
			</view>
			<view class="mid_content">
				<view class="mid-content_img">
					<image mode="widthFix" style="width: 200rpx;border-radius: 5rpx;" 
					:src="shoppingInfo.img"></image>
				</view>
				<view class="mid_title">{{shoppingInfo.title}}</view>
				<view class="mid_price">
					￥{{shoppingInfo.price}}
				</view>
			</view>
			<view >
				<view class="mid_comment">购买数量
					<view class="count_button" @click="reduce"> - </view>{{count}}<view class="count_button" @click="add"> + </view>
				</view>
				<view class="mid_comment">
					备注
					<input class="input" type="text" />
				</view>
				<view class="mid_comment">
					合计：
					<view class="totalPrice">￥{{totalPrice}}元</view>
				</view>
			</view>
		</view>
		
		<!-- 提交按钮 -->
		<view style="margin: 10rpx;">
			<button style="background-color: #FF7F00; color: #fff;" @click="submit">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				count:1,
				userId: '',
				totalPrice: 0,
				address: {
					id: '',
					name: '',
					phone: '',
					adress: ''
				},
				shoppingInfo:{
					id:'',
					name: '',
					headSrc: '',
					title:'',
					img: '',
					price: 0
				},
				myorder:{
					userId: '',
					title: '',
					img: '',
					price: 0,
					totalPrice: 0,
					swith: 0
				}
			}
		},
		methods: {
			reduce(){
				if(this.count>1){
					this.count--
					this.totalPrice = this.count * this.shoppingInfo.price
				}
				
			},
			add(){
				this.count++
				this.totalPrice = this.count * this.shoppingInfo.price
			},
			submit(){
				this.myorder.userId = this.userId
				this.myorder.title = this.shoppingInfo.title
				this.myorder.img = this.shoppingInfo.img
				this.myorder.price = this.shoppingInfo.price
				this.myorder.totalPrice = this.totalPrice
				this.request({
					url: this.$Url+'/order/addmyorder',
					data: this.myorder,
					method: "POST"
				}).then(result=>{
					uni.redirectTo({
						url: 'myOrder'
					})
				})
			},
			getshoppingInfo(){
				this.request({
					url: this.$Url+'/shopping/shoppinginfo',
					data: this.id,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						this.shoppingInfo = result.data
						this.totalPrice = this.shoppingInfo.price * this.count
					}else{
						uni.showToast({
						    title: '获取数据失败',
						    duration: 2000
						});
					}
					
				}).catch(err =>{
					uni.showToast({
					    title: '获取数据失败',
					    duration: 2000
					});
				})
			},
			getaddress(){
				this.request({
					url: this.$Url+'/address/myaddress',
					data: this.userId,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						this.address = result.data
					}else{
						uni.showToast({
						    title: '获取地址失败',
						    duration: 2000
						});
					}
					
				}).catch(err =>{
					uni.showToast({
					    title: '获取地址失败',
					    duration: 2000
					});
				})
			}
		},
		onLoad(option) {
			if(option !== null) {
				this.id = option.id
				// console.log(option.id)
			}
			uni.getStorage({
			    key: 'userData',
			    success: (res) => {
					this.userId =res.data.id
			    }
			});
			this.getaddress()
			this.getshoppingInfo()
		}
	}
</script>

<style scoped>
	.head{
		display: flex;
		margin: 10rpx;
		border: 1rpx solid #CDC9C9;
		border-radius: 10rpx;
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
	}
	.mid{
		display: flex;
		flex-wrap: wrap;
		border: 1rpx solid #CDC9C9;
		padding: 10rpx;
		margin: 10rpx;
		border-radius: 10rpx;
	}
	.mid_head{
		display: flex;
		flex-wrap: wrap;
		height: 80rpx;
		
	}
	.mid_head_img{
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		margin: 5rpx;
	}
	.mid_head_name{
		margin: 5rpx;
		font-size: 40rpx;
	}
	.mid_content{
		display: flex;
		flex-wrap: nowrap;
		width: 700rpx;
		margin: 10rpx 0;
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
	.input{
		margin-left: 20rpx;
		border-bottom: 1rpx solid #ccc;
	}
	.mid_comment{
		display: flex;
		flex-wrap: nowrap;
		margin: 10rpx 0;
		font-size: 37rpx;
	}
	.count_button{
		display: flex;
		justify-content: center;
		width: 50rpx;
		border: 1rpx solid  #CDC9C9;
		border-radius: 6rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.totalPrice{
		color: #FF4500;
	}
</style>
