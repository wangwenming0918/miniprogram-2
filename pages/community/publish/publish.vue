<template>
	<view>
		<view class="publish">
			<!-- 显示自己的头像和昵称 -->
			<view class="head">
				<image class="head_img" :src="user.headSrc"></image>
				<view class="head_name">{{user.name}}</view>
			</view>
			<!-- 输入标题 -->
			<view>
				<textarea class="text1" auto-height adjust-position v-model="publish.textTitle" placeholder="请输入标题" />
			</view>
			<!-- 输入发表内容 -->
			<view>
				<textarea class="text1" adjust-position confirm-type="done" v-model="publish.textContent" maxlength="-1" placeholder="请输入发表内容..." />
			</view>
			<!-- 添加图片模块 -->
			<view class="mid">
				<view class="file">
				<block v-for="(item,index) in publish.imagesList" :key="index" >
					<view class="load_img">
						<image mode="aspectFit" class="img" :src="item"></image>
					</view>
				</block>
				</view>
				<view style="margin-top: 20rpx;">
					<input class="input" 
					adjust-position
					disabled
					value="十"
						type="file" accept="image/jpg,image/jpeg,image/png,image/gif" 
						multiple="" @bindtap='uploader' @click="uploader" name="images"></input>
				</view>
			</view>
			<!-- 发表按钮 -->
			<view class="buttom">
				<button class="text_but" type="primary" @click="addpublish">发表</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{
					headSrc: '',
					name: ''
				},
				publish:{
					userId: '',
					textTitle: '',
					textContent: '',
					imagesList: [],
				}
			}
		},
		methods: {
			// 将发表的内容发送到后端数据
			addpublish(){
				if(this.publish.textContent !== '' && this.publish.textTitle !== ''){
					this.request({
						url: this.$Url+'/publish/publish',
						data: this.publish,
						method: "POST"
					}).then(result=>{
						if(result.data){
							uni.redirectTo({
								url: './mypublish'
							})
						}
					})
				}
			},
			uploader(){
				var that=this;
				let maxSize=1024*1024;
				let maxLength=9;
				let flag=true;
				wx.chooseImage({
					count: 6, //最多可以选择的图片总数
					sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						wx.showToast({
							title: '正在上传...',
							icon: 'loading',
							mask: true,
							duration: 500
						})
						for(let i=0;i<res.tempFiles.length;i++){
							if(res.tempFiles[i].size>maxSize){
								flag=false;
								wx.showModal({
									content: '图片太大，不允许上传',
									showCancel: false,
									success: function (res) {
										if (res.confirm) {
											console.log('用户点击确定')
										}
									}
								});
							}
						}
						if (res.tempFiles.length>maxLength){
							wx.showModal({
								content: '最多能上传'+maxLength+'张图片',
								showCancel:false,
								success:function(res){
									if(res.confirm){
										console.log('确定');
									}
						
								}
							})
						}
						if (flag == true && res.tempFiles.length <= maxLength){
							that.publish.imagesList = that.publish.imagesList.concat(res.tempFilePaths)
						}
						wx.uploadFile({
							url: 'https://shop.gxyourui.cn',
							filePath: res.tempFilePaths[0],
							name: 'images',
							header: {
								"Content-Type": "multipart/form-data",
								'Content-Type': 'application/json'
							},
							success:function(data){
								console.log(data);
							},
							fail:function(data){
								console.log(data);
							}
						})
						console.log(res);
					},
					fail:function(res){
						console.log(res);
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
					this.publish.userId =res.data.id
			    }
			});
		}
	}
</script>

<style scoped>
	.publish{
		padding: 10rpx;
	}
	.head_img{
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
		
	}
	.head_name{
		margin-left: 10rpx;
		// 隐藏多余字体
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.head{
		display: flex;
		flex-wrap: nowrap;
		padding: 5rpx;
		margin: 20rpx 10rpx;
		border-bottom: 1rpx solid #ccc;
	}
	
	.text1{
		border: 1rpx solid #0000FF;
		width: 700rpx;
		border-radius: 10rpx;
		margin: 10rpx;
	}
	.mid{
		margin: 10rpx;
		border: 1rpx solid #FFA500;
		border-radius: 10rpx;
		width: 700rpx;
	}
	.file{
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
	}
	.load_img{
		width: 320rpx;
		height: 320rpx;
		margin: 10rpx 10rpx 10rpx 15rpx;
		border: 2rpx solid #CDC9C9;
		border-radius: 10rpx;
		
	}
	.img{
		width: 100%;
		height: 100%;
		flex-grow: 1;
	}
	.input{
		width: 150rpx;
		height: 150rpx;
		border: 1rpx dotted #00FF00;
		margin: 10rpx;
		font-size: 100rpx;
		color: #8B8989;
		padding-left: 50rpx;
		border-radius: 20rpx;
	}
	.buttom{
		margin-left: 10rpx;
		width: 700rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
		
	}
	.text_but{
		
	}
</style>
