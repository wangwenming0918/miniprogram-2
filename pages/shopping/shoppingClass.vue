<template>
	<view>
		<view class="topnav">
			<!-- 搜索框 -->
			<view>
				<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
			</view>
		</view>
		<view style="margin-top: 150rpx;">
			<view class="content">
				<p class="title">宠物</p>
				<view class="heizi">
					<view v-for="(pet,index) in pets" :key="index">
						<view class="content1" @click="jump(pet)"><p class="title1">{{pet.name}}</p></view>
					</view>
				</view>
				
			</view>
			<view class="content">
				<p class="title">食品和日用品</p>
				<view class="heizi">
					<view v-for="(food,index) in foods" :key="index">
						<view class="content1" @click="jump(pet)"><p class="title1">{{food.name}}</p></view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		components:{uniSearchBar},
		data() {
			return {
				searchValue:'',
				pets:[
					{
						id:1,
						name:'幼犬1'
					},
					{
						id:2,
						name:'幼犬2'
					},
					{
						id:3,
						name:'幼犬3'
					},
					{
						id:4,
						name:'幼犬4'
					},
					{
						id:5,
						name:'幼犬5'
					},
				],
				foods:[],
			}
		},
		onLoad() {
			// this.getPetDate()
			// this.getFoodDate()
		},
		methods:{
			getPetDate(){
				this.request({
						url: this.$Url+'/shopping/shoppingPet',
						data: this.searchValue,
						method: "GET"
				}).then(result=>{
						if(result.data.length>1){
							this.pets = result.data
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
			getFoodDate(){
				this.request({
						url: this.$Url+'/shopping/shoppingfood',
						data: this.searchValue,
						method: "GET"
				}).then(result=>{
						if(result.data.length>1){
							this.foods = result.data
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
			search(res) {
				this.searchValue=res.value
				// this.getPetDate()
				// this.getFoodDate()
			},
			jump(obj){
				uni.navigateTo({url:"./shopping?name="+obj.name})
			}
		}
	}
</script>

<style>
	/* 头部固定 */
	.topnav{
	  position: fixed;
	  top: 0rpx;
	  left: 0;
	  z-index:99;
	  background: #fff;
	  padding: 3%;
	  width: 94%;
	  z-index:999;
	}
	.content{
		margin: 25rpx 10rpx 25rpx 10rpx;
	}
	.content1{
		margin: 3rpx;
		border: 1rpx solid #CCCCCC;
		width: 170rpx;
		height: 145rpx;
		align-content: center;
	}
	.title{
		padding-left: 10rpx;
		font-size: 40rpx;
		border-bottom: 1rpx solid #ccc;
	}
	.heizi{
		margin: 10rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.title1{
		font-size: 30rpx;
		text-align: center;
		padding-top: 50rpx;
	}
</style>
