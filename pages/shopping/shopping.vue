<template>
	<view>
		<view class="topnav">
			<!-- 搜索框 -->
			<view v-if="isShow">
				<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
			</view>
			<view v-else class="hide">
				<text>商品展示</text>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="item">
			<navigator style="margin-bottom: 40rpx;" v-for="(goods,index) in commodity" :key="index" :url="'./shoppingInfo/shoppingInfo?id='+goods.id">
				<view class="item1">
					<image lazy-load="true" class="item_img" :src="goods.img"></image>
					<view class="item2">
						<view class="item_title"><p>{{goods.title}}</p></view>
						<view class="item_price">￥{{goods.price}}</view>
					</view>
				</view>
				
			</navigator>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		components:{uniSearchBar},
		data() {
			return {
				commodity: [
				],
				params: {
					limit: 10,
					skip: 0,
					search: ''
				},
				scrollTop: 0,
				isShow: true,
				name: '',
			}
		},
		onPullDownRefresh(){
			this.commodity =[]
			this.params.skip = 0
			uni.showLoading({ title: '正在刷新', mask: true });
			this.getcommodity()
			uni.hideLoading();
			uni.stopPullDownRefresh();	
		},
		onReachBottom(){
			if(this.commodity){
				this.params.skip += this.params.limit
				this.getcommodity()
			}else{
				uni.showToast({
					title:'没有数据了',
					duration: 1000
				})
			}
		},
		onLoad(option) {
			this.name = option.name
			this.params.search =this.name
			this.getcommodity()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.name
			})
		},
		methods: {
			search(res) {
				this.params.search = res.value
				this.params.skip = 0
				this.commodity =[]
				this.getcommodity()
			},
			getcommodity(){
				this.request({
					url: this.$Url+'/shopping/shopping',
					data: this.params,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						this.commodity = result.data
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
		},
		onPageScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替
		if(this.scrollTop>e.scrollTop){
			this.isShow = true
		}else{
			this.isShow = false
		}
		this.scrollTop = e.scrollTop
		}
	}
</script>

<style scoped>
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
	.head{
		display: flex;
		flex-wrap: nowrap;
		margin: 5rpx;
	}
	.head_input{
		border: 1rpx solid #808080;
		padding: 5rpx;
		height: 70rpx;
		width: 450rpx;
	}
	.head_img{
		width: 70rpx;
		height: 70rpx;
		padding: 5rpx;
		
	}
	.head_button{
		padding: 5rpx;
		width: 120rpx;
		font-size: 30rpx;
	}
	
	.item{
		margin-top: 120rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx;
		border-bottom: 1rpx solid #ccc;
	}
	.item1{
		display: flex;
		width: 720rpx;
	}
	.item2{
		flex-wrap: wrap;
		width: 450rpx;
	}
	.item_img{
		
		width: 280rpx;
		height: 250rpx;
		border-radius: 10rpx;
	}
	.item_title{
		padding: 5rpx;
		font-size: 49rpx;
		color: #FFA500;
		// 隐藏多余字体
		
		text-overflow: ellipsis;
		overflow: hidden;
		/* white-space: nowrap; */
		height: 190rpx;
	}
	.item_price{
		text-align: left;
		color: #FF4500;
		height: 30rpx;
	}
	.hide{
		text-align: center;
		color: #3F536E;
		font-size: 35rpx;
	}
	p{
		/* -webkit-line-clamp: 3;
		word-wrap: break-word;
		  word-break: break-all;
		  overflow: hidden; */
		 /* width: 450rpx;
		  overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box;
		  	-webkit-box-orient: vertical;
		  	-webkit-line-clamp: 3; */
		  	
	}
</style>
