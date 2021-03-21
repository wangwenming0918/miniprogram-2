<template>
	<view style="background-color: #F8F8FF;">
		<view style="margin: 10rpx;">
			<view v-for="(obj,index) in data" :key="index">
				<view class="text">
					<view class="text_title">{{obj.createTime}}</view>
					<view class="text1">
						<view>{{obj.title}}</view>
						<view class="text2">
							<view class="text_title">{{obj.surplusTime}}</view>
							<view class="text_title text_time">{{obj.remindTime}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 自定义提醒时间的按钮 -->
		<view>
			<uni-fab ref="fab" :pattern="pattern" 
			vertical="bottom"  @fabClick="fabClick" :popMenu="stast" />
		</view>
	</view>
</template>

<script>
	import uniFab from '../../../components/uni-fab/uni-fab.vue'
	export default {
		components: {
		    uniFab
		},
		data(){
			return{
				stast:false,
				pattern: {
					color: '#007AFF',
					backgroundColor: '#fff',
					buttonColor: '#EE7621'
				},
				userId: '',
				data:[{
					id:1,
					createTime:'2020年12月12日',
					title: '第一次提醒',
					desc:'暂时不描述了',
					surplusTime: '剩余1天2小时3分钟',
					remindTime:'2020年12月12日'
				},{
					id:0,
					createTime:'2020年12月12日',
					title: '第一次提醒',
					desc:'暂时不描述了',
					surplusTime: '剩余1天2小时3分钟',
					remindTime:'2020年12月12日'
				}]
			}
		},
		onLoad() {
			
			// this.loadData()
		},
		methods:{
			loadData(){
				this.request({
					url: this.$Url+'/memorandum/remindtime',
					data: this.userId,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						this.data =result.data
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
			fabClick(){
				uni.navigateTo({
					url:"./memorandum"
				})
			}
		}
	}
</script>

<style scoped>
	.text{
		padding: 20rpx;
		margin-bottom: 10rpx;
	}
	.text1{
		border: 1px solid #fff;
		background-color: #FFF;
		border-radius: 15rpx;
		padding: 20rpx;
	}
	.text2{
		display: flex;
		flex-wrap: nowrap;
		padding: 10rpx;
	}
	.text_title{
		font-size: 30rpx;
	}
	.text_time{
		margin-left: 50rpx;
	}
</style>
