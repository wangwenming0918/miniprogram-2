<template>
	<view style="margin: 10rpx;">
		<!-- 基本信息与发表内容的显示 -->
		<view>
			<view class="head_title">{{communityinfo.title}}</view>
			<view class="head_mid">
				<image class="head_img" :src="communityinfo.headSrc"></image>
				<view class="head_name">{{communityinfo.name}}</view>
			</view>
			<view class="heda_time">发表时间：{{communityinfo.time | dateStr('YYYY年MM月DD日')}}</view>
			<view class="head_text">
			<text selectable>
				{{communityinfo.content}}
			</text>
			</view>
		</view>
		
		<!-- 评论模块 -->
		<view >
			<view class="but" @click="comment">评论</view>
		</view>
		<view v-show="isShow">
			<!-- 评论区 -->
			<view class="text_main">
				<view>
				<textarea rows="3" class="text1" 
				adjust-position @confirm="send" confirm-type="done"
				v-model="textValue" placeholder="请输入140字以内的评论内容..." />
				</view>
				<view style="margin-top: 20rpx;">
					<button class="text_but" type="default" @click="send">发表评论</button>
				</view>
			</view>
			
			<!-- 评论信息显示 -->
			<view class="text_main" v-for="(comment,index) in comments" :key="index">
				<view style="color: #007AFF;">{{comment.name}} 评论：</view>
				<p style="text-indent: 2em;">{{comment.content}}</p>
				<view style="text-align: right;">{{comment.time | dateStr('YYYY年MM月DD日')}}</view>
			</view>
		</view>
		<view class="kongbai"></view>
		
		<!-- 图片模块 -->
		<view class="buttom">
			<view class="buttom_img" @click="display = !display" >图片展示</view>
			<view v-show="display" v-for="(img, index) in communityinfo.imgs" :key="index">
				<image lazy-load="true" class="buttom_img2" mode="aspectFill" :src="img.src"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isShow: false,
				display: false,
				textValue: '',
				commentSend: {},
				comments:[
					{
						id: '',
						name: '',
						time: '',
						content: '',
						infoId: ''
					}
				],
				id: '',
				communityinfo: {
					id:'',
					title: '',
					name: '',
					headSrc: '',
					time: '',
					content: '',
					imgs:[]
				},
				nickName: ''
			}
		},
		onLoad(option) {
			if(option !== null) {
				this.id = option.id
			}
			this.getImages();
			uni.getStorage({
			    key: 'wxUserInfo',
			    success: (res) => {
					this.nickName =res.data.nickName
			    }
			});
		},
		onPullDownRefresh(){
			
			this.communityinfo.id = ''
			this.communityinfo.title = ''
			this.communityinfo.name = ''
			this.communityinfo.headSrc = ''
			this.communityinfo.time = ''
			this.communityinfo.content = ''
			this.communityinfo.imgs = []
			
			uni.showLoading({ title: '正在刷新', mask: true });
			this.getImages();
			uni.hideLoading();
			uni.stopPullDownRefresh();	
		},
		onReachBottom(){
			uni.showToast({
				title:'没有数据了',
				duration: 1000,
				icon:"none"
			})
		},
		onBackPress(e) {
			uni.switchTab({
				url: './home'
			});
			return true;
		},
		methods:{
			comment(){
				if(!this.isShow){
					this.getcomments();
				}
				this.isShow = !this.isShow
			},
			// 发表评论，将评论返回给后端保存
			send(){
				if(this.nickName !== ''){
					this.commentSend.name = this.nickName
					this.commentSend.time = Date.now()
					this.commentSend.content = this.textValue
					this.commentSend.infoId = this.id
					
					this.request({
						url: this.$Url+'/home/communityinfocommont',
						data: this.commentSend,
						method: "POST"
					}).then(result=>{
						//this.comments =this.comments.concat(this.commentSend)
						if(result.data){
							this.textValue = ''
							this.getcomments();
							uni.showToast({title:'发表成功',duration: 1000})
						}
					}).catch(err =>{
						uni.showToast({title: '获取数据失败',duration: 2000});
					})
					
				}
				else{
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
			//以本条发表的id,去后端查找对本条发表的评论数据，将返回数据保存到comments
			getcomments(){
				this.request({
					url: this.$Url+'/home/communityinfocommont',
					data: this.id,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						this.comments = result.data
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
			// 已id去后端查找数据，找到后返回数据保存到communityinfo中
			getImages(){
				if(this.id !== ''){
				this.request({
					url: this.$Url+'/home/communityinfo',
					data: this.id,
					method: "POST"
				}).then(result=>{
					if(result.data.length>1){
						this.communityinfo = result.data
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
	}
</script>

<style scoped>
	.head_title{
		display: flex;
		padding: 20rpx;
		font-size: 50rpx;
		color: #FFA500;
		border-bottom: 1rpx solid #ccc;
	}
	.head_mid{
		display: flex;
		flex-wrap: nowrap;
	}
	.head_img{
		width: 70rpx;
		height: 70rpx;
		border-radius: 35rpx;
		margin: 10rpx;
	}
	.head_name{
		font-size: 50rpx;
		padding: 13rpx;
	}
	.heda_time{
		display: flex;
		flex-direction: row-reverse;
		padding: 20rpx;
	}
	.head_tex{
		display: flex;
		justify-content: center;
		margin: 20rpx;
		color: #808080;
	}
	
	.but{
		display: flex;
		justify-content: center;
		padding-top: 4rpx;
		margin: 20rpx;
		width: 700rpx;
		height: 60rpx;
		border-radius: 10px;
		border: 2rpx solid #EE1289;
		background-color: #fff;
	}
	.text_main{
		margin: 20rpx;
		
	}
	.text1{
		border: 1rpx solid #8A2BE2;
		width: 700rpx;
		border-radius: 10rpx;
	}
	.text_but{
		width: 700rpx;
		height: 80rpx;
		font-size: 35rpx;
		background-color: #00BFFF;
		color: #fff;
	}
	
	.buttom{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.kongbai{
		width: 700rpx;
		height: 20rpx;
	}
	.buttom_img{
		display: flex;
		margin: 20rpx;
		border-radius: 10px;
		justify-content: center;
		border: 2rpx solid #EE1289;
		width: 700rpx;
		height: 60rpx;
		padding-top: 4rpx;
	}
	.buttom_img2{
		display: flex;
		padding: 30rpx;
		justify-content: center;
		width: 700rpx;
	}
</style>
