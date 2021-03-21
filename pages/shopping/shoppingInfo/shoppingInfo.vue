<template>
	<view>
		<!-- 轮播图 -->
		<view>
			<swiper  indicator-dots autoplay interval="2000" duration="500">
			    <swiper-item v-for="(img,index) in shoppingInfo.carousels" :key="index">
			        <image :src="img.src"></image>
			    </swiper-item>
			</swiper>
		</view>
		
		<!-- 名称 -->
		<view class="title">
			{{shoppingInfo.title}}
		</view>
		<!-- 价格 -->
		<view class="price">
			<text style="color: #FF3030;">￥{{shoppingInfo.price}}</text>
			<view class="button" @click="clickgoods">点击购买</view>
		</view>
		
		<!-- 参数模块 -->
		<view class="parameter">
			<view class="parameter_title">
				参数>>
			</view>
			<view class="parameter_info">
				<view>名字：{{shoppingInfo.parameter.name}}</view>
				<view>毛色：{{shoppingInfo.parameter.coatColor}}</view>
				<view>年龄：{{shoppingInfo.parameter.age}}年</view>
				<view>品种：{{shoppingInfo.parameter.varieties}}</view>
				<view>毛长：{{shoppingInfo.parameter.hairLength}}</view>
				<view>体重：{{shoppingInfo.parameter.weight}}KG</view>
				<view>性别：{{shoppingInfo.parameter.sex}}</view>
				<view>特点：{{shoppingInfo.parameter.trait}}</view>
			</view>
		</view>
		
		<!-- 图片详情模块 -->
		<view class="parameter_title">
			图片详情
		</view>
		<view v-for="(img,index) in shoppingInfo.images" :key="index">
			<image lazy-load="true" :src="img.src"></image>
		</view>
		<!-- 底部模块 -->
		<view class="back_top">
			<text>到底部了</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				nickName: '',
				shoppingInfo:{
					carousels:[],
					title: '',
					price: 0,
					parameter:{
						name:'',
						coatColor: '',
						age: 0,
						varieties: '',
						hairLength: '',
						weight: 0,
						sex: '',
						trait: ''
					},
					images:[]
				}
			}
		},
		methods: {
			clickgoods(){
				if(this.nickName !== ''){
					uni.navigateTo({
						url: '../order/order?id='+this.id
					})
				}else{
					uni.showModal({
					    title: '提示',
					    content: '您还未登录，前往登录！',
					    success: function (res) {
					        if (res.confirm) {
								uni.switchTab({
								    url: '/pages/me/me'
								});
					        } else if (res.cancel) {
					   //          console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			getshoppinginfo(){
				if(this.id !== ''){
					this.request({
						url: this.$Url+'/shopping/shoppinginfo',
						data: this.id,
						method: "POST"
					}).then(result=>{
						if(result.data.length>1){
							this.shoppingInfo = result.data
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
				}else{
					uni.showToast({
						title: '获取数据失败',
						duration: 2000
					});
				}
			}
		},
		onLoad(option) {
			if(option !== null) {
				this.id = option.id
			}
			this.getshoppinginfo()
			// console.log(this.id)
			uni.getStorage({
			    key: 'wxUserInfo',
			    success: (res) => {
			        //console.log(res.data);
					this.nickName =res.data.nickName
			    }
			});
		},
	}
</script>

<style scoped>
	.goumai{
		display: flex;	
	}
	.title{
		padding: 5rpx;
		font-size: 50rpx;
		color: #FFA500;
	}
	.price{
		display: flex;
		flex-wrap: nowrap;
		padding: 10rpx;
	}
	.button{
		margin-left: 300rpx;
		background-color: #FF7F24;
		color: #fff;
		border-radius: 5rpx;
	}
	.parameter_title{
		/* width: 700rpx; */
		display: flex;
		padding: 10rpx;
		background-color: #FFFAFA;
		color: #FFD700;
		font-size: 45rpx;
	}
	.parameter_info{
		/* width: 700rpx; */
		padding: 10rpx;
		border: 1rpx solid #999999;
		color: #999999;
	}
	.back_top{
		border: 1rpx solid #999999;
		color: #CDC9C9;
		text-align: center;
		height: 70rpx;
	}
</style>
