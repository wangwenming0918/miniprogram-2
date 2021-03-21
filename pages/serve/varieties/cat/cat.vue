<template>
	<view>
		<view>
			<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		</view>
		<view class="cat_body">
			<view v-for="(cat,index) in cats" :key="index">
				<view  class="cat" @click="jump(cat)">
					<view class="img">
						<image lazy-load="true" style="width: 100%;height: 100%;" 
							mode="scaleToFill"
							:src="cat.img"></image>
					</view>
					<view class="name">
						{{cat.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '../../../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		components:{uniSearchBar},
		data() {
			return {
				params: {
					limit: 10,
					skip: 0,
					search: ''
				},
				cats:[]
			}
		},
		mounted() {
			this.getcats()	
		},
		methods: {
			jump(cat){
				let data = {
				    item: cat
				};
				this.$emit('jumpcat',data);
			},
			search(res) {
				this.params.search = res.value
				this.params.skip = 0
				this.getcats()
			},
			getcats(){
				this.request({
						url: this.$Url+'/cat/cat',
						data: this.params,
						method: "POST"
				}).then(result=>{
						if(result.data.length>1){
							this.cats = result.data
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
			}
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
	  margin-top: 100rpx;
	  padding: 3%;
	  width: 94%;
	  z-index:999;
	}
	.cat_body{
		margin: 5rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.cat{
		width: 360rpx;
		margin: 10rpx 5rpx;
		flex-grow:1;
	}
	.img{
		padding: 5rpx 5rpx 0 5rpx;
		width: 350rpx;
		height: 250rpx;
	}
	.name{
		width: 350rpx;
		height: 50rpx;
		font-size: 35rpx;
		padding-left: 5rpx;
		text-align: center;
		background-color: #EEE9E9;
	}
	.cat_body::after{
			content: '';
			flex-grow: 9;
	}

</style>
