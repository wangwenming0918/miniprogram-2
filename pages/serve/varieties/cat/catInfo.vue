<template>
	<view>
		<!-- 轮播图模块 -->
		<view>
			<swiper  indicator-dots autoplay interval="2000" duration="500">
			    <swiper-item v-for="(img, index) in cat.carousels" :key="index">
			        <image :src="img.src"></image>
			    </swiper-item>
			</swiper>
		</view>
		<!-- 品种名 -->
		<view class="title">
			{{cat.name}}
		</view>
		<view class="parameter">
			<!-- 基本信息栏 -->
			<view class="parameter_title">
				基本信息栏>>
			</view>
			<view class="parameter_info">
				<view>祖籍：{{cat.baseInfo.original}}</view>
				<view>寿命：{{cat.baseInfo.life}}年</view>
				<view>性格：{{cat.baseInfo.nature}}</view>
				<view>易患病：{{cat.baseInfo.illness}}</view>
				<view>价格：{{cat.baseInfo.price}}元</view>
			</view>
			<!-- 品种简介 -->
			<view class="parameter_title">
				品种简介>>
			</view>
			<view>
				<text selectable>
					{{cat.varietyIntroduction}}
				</text>
			</view>
			<!-- 喂食要点 -->
			<view class="parameter_title">
				喂食要点>>
			</view>
			<view>
				<text selectable>
					{{cat.feedingPoints}}
				</text>
			</view>
			<!-- 养护知识 -->
			<view class="parameter_title">
				养护知识>>
			</view>
			<view>
				<text selectable>
					{{cat.maintenanceKnowledge}}
				</text>
			</view>
			<!-- 性格特点 -->
			<view class="parameter_title">
				性格特点>>
			</view>
			<view>
				<text selectable>
					{{cat.personalityCharacteristics}}
				</text>
			</view>
			<!-- 形态特征 -->
			<view class="parameter_title">
				形态特征>>
			</view>
			<view>
				<text selectable>
					{{cat.morphologicalCharacter}}
				</text>
			</view>
		</view>
		<!-- 返回顶部标识 -->
		<wppeng-to :scrollTop="scrollTop"></wppeng-to>
		<!-- 底部模块 -->
		<view class="back_top">
			<text>到底部了</text>
		</view>
	</view>
</template>

<script>
	import wppengTo from '../../../../components/wppeng-top/wppeng-top.vue'
	export default{
		components:{wppengTo},
		data(){
			return{
				id: '',
				scrollTop: 0,
				cat: {
					carousels:[
						{src:'/static/img/bosimao.jpg'},
						{src:'/static/images/dog_01.jpg'}
					],
					
				}
			}
		},
		//监听页面滚动
		onPageScroll(res){
		    this.scrollTop=res.scrollTop
		},
		onReachBottom(){
			uni.showToast({
				title:'没有数据了',
				duration: 1000,
				icon:"none"
			})
		},
		methods:{
			getcatinfo(){
				this.request({
						url: this.$Url+'/cat/catinfo',
						data: this.id,
						method: "POST"
				}).then(result=>{
						if(result.data.length>1){
							this.cat = result.data
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
		},
		onLoad(option) {
			this.id = option.catId
			this.getcatinfo();
		}
	}
</script>

<style scoped>
	.title{
		margin: 10rpx 0rpx 10rpx 10rpx;
		font-size: 50rpx;
		color: #9400D3;
	}
	.parameter_title{
		margin: 20rpx 0;
		/* width: 700rpx; */
		display: flex;
		padding: 10rpx;
		background-color: #FFD700;
		color: #0000CD;
		font-size: 45rpx;
	}
	.parameter_info{
		width: 700rpx;
		padding: 10rpx;
		margin-left: 10rpx;
		border: 1rpx solid #999999;
		color: #999999;
	}
	.back_top{
		margin-top: 15rpx;
		margin-bottom: 8rpx;
		color: #CDC9C9;
		text-align: center;
		height: 70rpx;
	}
</style>
