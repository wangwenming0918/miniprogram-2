<template>
	<view>
		<view class="reg">
			<navigator url="./register">
				<span>注册</span>
			</navigator>
		</view>
		<view class="title">
			<h3>欢迎来到宠都！</h3>
		</view>
		<view class="userAndPass">
			<view class="name">
				<input type="text" v-model="user.userName" placeholder="请输入账号" />
			</view>
			<view class="pass">
				<input type="text" password v-model="user.password" placeholder="请输入密码" />
			</view>
		</view>
		<view class="button">
			<!-- <button size="default" @click="login()" type="primary">登录</button> -->
			<button size="default" @click="login1()" type="primary">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				user:{
					userName: '',
					password: '',
				}
				
			}
		},
		onLoad() {
			// uni.getStorage({
			//     key: 'loginUser',
			//     success: (res) => {
			//         //console.log(res.data);
			// 		if(res.data!==undefined&&res.data!==null){
			// 			uni.reLaunch({
			// 				url:"./me"
			// 			})
			// 		}
			//     }
			// });
		},
		methods:{
			login1(){
				if(this.user.userName.trim()!==''&&this.user.password.trim()!==''){
				uni.setStorage({
					key: 'loginUser',
					data: this.user
				})
				uni.switchTab({
					url:"./me"
				})
				}else{
					uni.showToast({
					    title: '账户或密码不能为空',
					    duration: 2000,
						mask: 'true',
						icon: 'none'
					});
				}
			},
			login(){
				if(this.user.userName.trim()!==''&&this.user.password.trim()!==''){
					this.request({
						url: this.$Url+'/login/login',
						data: this.user,
						method: "POST"
					}).then(result=>{
						if(result.data.length>1){
							uni.showToast({
							    title: '登录成功',
							    duration: 2000,
								mask: 'true'
							});
							uni.setStorage({
								key: 'loginUser',
								data: result.data
							})
							uni.switchTab({
								url:"./me"
							})
						}else{
							uni.showToast({
							    title: '登录失败',
							    duration: 2000,
								mask: 'true',
								icon: 'none'
							});
						}
						
					}).catch(err =>{
						uni.showToast({
						    title: '登录失败',
						    duration: 2000,
							mask: 'true',
							icon: 'none'
						});
					})
				}else{
					uni.showToast({
					    title: '账户或密码不能为空',
					    duration: 2000,
						mask: 'true',
						icon: 'none'
					});
				}
				
			},
		}
	}
</script>

<style>
	.reg{
		text-align: right;
	}
	.title{
		margin-top: 50rpx;
		margin-bottom: 50rpx;
		text-align: center;
		align-content: center;
	}
	.userAndPass{
		margin-left: 20rpx;
		margin-bottom: 50rpx;
	}
	.name{
		margin-bottom: 40rpx;
		border-bottom: 1rpx solid #ccc;
	}
	.pass{
		border-bottom: 1rpx solid #ccc;
	}
	.button{
		margin: 20rpx;
	}
</style>
