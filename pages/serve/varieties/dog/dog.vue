<template>
	<view>
		<view >
			<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>
		</view>
		<view class="dog_body">
			<view v-for="(dog,index) in dogs" :key="index">
				<view class="dog" @click="jump(dog)">
					<view class="img">
						<image lazy-load="true" style="width: 100%;height: 100%;" 
							mode="scaleToFill"
							:src="dog.img"></image>
					</view>
					<view class="name">
						{{dog.name}}
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
		props:{},
		data() {
			return {
				params: {
					limit: 10,
					skip: 0,
					search: ''
				},
				dogs:[]
			}
		},
		mounted() {
			this.getdogs()
		},
		methods: {
			
			jump(dog){
				let data = {
				    item: dog
				};
				this.$emit('jumpdog',data);
			},
			search(res) {
				this.params.search = res.value
				this.params.skip = 0
				this.getdogs()
			},
			input(res) {
				this.searchVal = res.value
			}
			,
			getdogs(){
				this.request({
						url: this.$Url+'/dog/dog',
						data: this.params,
						method: "POST"
				}).then(result=>{
						if(result.data.length>1){
							this.dogs = result.data
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
	
	.dog_body{
		margin: 5rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.dog{
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
	.dog_body::after{
			content: '';
			flex-grow: 9;
	}

</style>
